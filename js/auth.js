// BNC GraphMate - Authentication Module
// Depends on: config.js (supabaseClient, APP_CONFIG)

const Auth = (() => {

  // ─── Internal State ────────────────────────────────────────────────────────
  let _currentUser = null;
  let _currentCustomer = null;

  // ─── Session / Auth Guard ──────────────────────────────────────────────────

  /**
   * Check if a user is logged in.
   * If not, redirect to login page (unless already there).
   * @param {string} [redirectUrl='/login.html'] - Where to redirect if unauthenticated.
   * @returns {Promise<object|null>} The Supabase user object, or null.
   */
  async function checkAuth(redirectUrl = '/login.html') {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (!session) {
      const currentPath = window.location.pathname;
      const isLoginPage = currentPath.endsWith('login.html') || currentPath.endsWith('register.html');
      if (!isLoginPage) {
        window.location.href = redirectUrl;
      }
      return null;
    }
    _currentUser = session.user;
    return session.user;
  }

  /**
   * Check if the currently logged-in user has the 'admin' role.
   * Redirects to home if not admin.
   * @returns {Promise<boolean>}
   */
  async function checkAdmin() {
    const user = await checkAuth();
    if (!user) return false;

    const customer = await getCurrentCustomer();
    if (!customer || customer.role !== 'admin') {
      window.location.href = '/index.html';
      return false;
    }
    return true;
  }

  // ─── Core Auth Actions ─────────────────────────────────────────────────────

  /**
   * Sign in with email and password.
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{user: object|null, error: object|null}>}
   */
  async function login(email, password) {
    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if (error) return { user: null, error };
    _currentUser = data.user;
    return { user: data.user, error: null };
  }

  /**
   * Register a new user and create a matching customer record.
   * @param {string} email
   * @param {string} password
   * @param {string} name       - Full name
   * @param {string} [phone=''] - Phone number
   * @returns {Promise<{user: object|null, error: object|null}>}
   */
  async function register(email, password, name, phone = '') {
    const { data, error } = await supabaseClient.auth.signUp({ email, password });
    if (error) return { user: null, error };

    const user = data.user;

    // Create customer record in the `customers` table
    const memberCode = typeof generateMemberCode === 'function'
      ? generateMemberCode()
      : _generateCode();

    const { error: insertError } = await supabaseClient
      .from('customers')
      .insert([{
        id: user.id,
        email,
        name,
        phone,
        member_code: memberCode,
        role: 'customer',
        points: 0,
        created_at: new Date().toISOString()
      }]);

    if (insertError) {
      console.error('[Auth] Failed to create customer record:', insertError);
      return { user: null, error: insertError };
    }

    _currentUser = user;
    return { user, error: null };
  }

  /**
   * Sign out the current user and clear local state.
   * @returns {Promise<{error: object|null}>}
   */
  async function logout() {
    const { error } = await supabaseClient.auth.signOut();
    _currentUser = null;
    _currentCustomer = null;
    if (!error) {
      window.location.href = '/index.html';
    }
    return { error };
  }

  // ─── User / Profile Accessors ──────────────────────────────────────────────

  /**
   * Get the currently authenticated Supabase user object.
   * Fetches from the session if not yet cached.
   * @returns {Promise<object|null>}
   */
  async function getCurrentUser() {
    if (_currentUser) return _currentUser;
    const { data: { user } } = await supabaseClient.auth.getUser();
    _currentUser = user;
    return user;
  }

  /**
   * Get the customer profile row from the `customers` table for the current user.
   * Result is cached for the lifetime of the page.
   * @returns {Promise<object|null>}
   */
  async function getCurrentCustomer() {
    if (_currentCustomer) return _currentCustomer;

    const user = await getCurrentUser();
    if (!user) return null;

    const { data, error } = await supabaseClient
      .from('customers')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('[Auth] Failed to fetch customer profile:', error);
      return null;
    }

    _currentCustomer = data;
    return data;
  }

  /**
   * Invalidate the cached customer profile (useful after profile updates).
   */
  function clearCustomerCache() {
    _currentCustomer = null;
  }

  // ─── Auth State Listener ───────────────────────────────────────────────────

  /**
   * Subscribe to Supabase auth state changes.
   * @param {function(event: string, session: object|null): void} callback
   * @returns {object} Supabase subscription object (call .unsubscribe() to clean up)
   */
  function onAuthStateChange(callback) {
    const { data: subscription } = supabaseClient.auth.onAuthStateChange((event, session) => {
      _currentUser = session?.user ?? null;
      if (!session) _currentCustomer = null;
      callback(event, session);
    });
    return subscription;
  }

  // ─── UI Helpers ────────────────────────────────────────────────────────────

  /**
   * Update navbar elements to reflect the current user's login state.
   * Expects elements with data attributes:
   *   data-auth="guest"  → shown when logged out
   *   data-auth="user"   → shown when logged in
   *   data-auth="admin"  → shown only for admins
   *   [data-user-name]   → text filled with customer name
   *   [data-user-points] → text filled with customer points
   *   [data-user-code]   → text filled with member code
   */
  async function updateCurrentUserNav() {
    const customer = await getCurrentCustomer();

    const guestEls  = document.querySelectorAll('[data-auth="guest"]');
    const userEls   = document.querySelectorAll('[data-auth="user"]');
    const adminEls  = document.querySelectorAll('[data-auth="admin"]');

    if (customer) {
      guestEls.forEach(el => el.classList.add('d-none'));
      userEls.forEach(el  => el.classList.remove('d-none'));
      adminEls.forEach(el => {
        customer.role === 'admin'
          ? el.classList.remove('d-none')
          : el.classList.add('d-none');
      });

      document.querySelectorAll('[data-user-name]').forEach(el => {
        el.textContent = customer.name || customer.email;
      });
      document.querySelectorAll('[data-user-points]').forEach(el => {
        el.textContent = (customer.points || 0).toLocaleString('th-TH');
      });
      document.querySelectorAll('[data-user-code]').forEach(el => {
        el.textContent = customer.member_code || '-';
      });
    } else {
      guestEls.forEach(el  => el.classList.remove('d-none'));
      userEls.forEach(el   => el.classList.add('d-none'));
      adminEls.forEach(el  => el.classList.add('d-none'));
    }
  }

  /**
   * Show elements that should only appear when logged in, hide the rest.
   * Convenience wrapper around updateCurrentUserNav().
   */
  async function showAuthElements() {
    await updateCurrentUserNav();
  }

  /**
   * Hide all auth-dependent UI elements (e.g., call on logout).
   */
  function hideAuthElements() {
    document.querySelectorAll('[data-auth="user"], [data-auth="admin"]')
      .forEach(el => el.classList.add('d-none'));
    document.querySelectorAll('[data-auth="guest"]')
      .forEach(el => el.classList.remove('d-none'));
  }

  // ─── Private Helpers ───────────────────────────────────────────────────────

  /** Fallback member code generator if utils.js is not loaded yet. */
  function _generateCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // ─── Public API ────────────────────────────────────────────────────────────
  return {
    checkAuth,
    checkAdmin,
    login,
    register,
    logout,
    getCurrentUser,
    getCurrentCustomer,
    clearCustomerCache,
    onAuthStateChange,
    updateCurrentUserNav,
    showAuthElements,
    hideAuthElements
  };

})();
