// BNC GraphMate - API Module
// Depends on: config.js (supabaseClient, APP_CONFIG), auth.js (Auth)

const API = (() => {

  // ─── Storage bucket names ──────────────────────────────────────────────────
  const BUCKETS = {
    slips: 'payment-slips',
    products: 'product-images',
    portfolio: 'portfolio-images',
    fonts: 'font-previews'
  };

  // ─── Internal Helper ───────────────────────────────────────────────────────

  /** Log and re-throw a Supabase error with context. */
  function _throw(context, error) {
    console.error(`[API] ${context}:`, error);
    throw error;
  }

  /** Generate a unique order number like ORD-20260910-4A2F */
  function _generateOrderNumber() {
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `ORD-${date}-${rand}`;
  }

  // ─── Shop Settings ─────────────────────────────────────────────────────────

  /**
   * Fetch all shop settings as a key→value map.
   * Table: `settings` (columns: key, value)
   * @returns {Promise<object>} e.g. { shop_name: 'BNC GraphMate', ... }
   */
  async function getSettings() {
    const { data, error } = await supabaseClient
      .from('settings')
      .select('key, value');
    if (error) _throw('getSettings', error);
    return data.reduce((acc, row) => ({ ...acc, [row.key]: row.value }), {});
  }

  // ─── Products ──────────────────────────────────────────────────────────────

  /**
   * Fetch active products, optionally filtered by category.
   * @param {string} [category] - Category slug to filter by.
   * @returns {Promise<object[]>}
   */
  async function getProducts(category) {
    let query = supabaseClient
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (category) query = query.eq('category', category);

    const { data, error } = await query;
    if (error) _throw('getProducts', error);
    return data;
  }

  /**
   * Fetch a single product by its ID.
   * @param {string|number} id
   * @returns {Promise<object>}
   */
  async function getProduct(id) {
    const { data, error } = await supabaseClient
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    if (error) _throw('getProduct', error);
    return data;
  }

  // ─── Fonts ─────────────────────────────────────────────────────────────────

  /**
   * Fetch active fonts, optionally filtered by category.
   * @param {string} [category] - e.g. 'thai', 'english', 'decorative'
   * @returns {Promise<object[]>}
   */
  async function getFonts(category) {
    let query = supabaseClient
      .from('fonts')
      .select('*')
      .eq('is_active', true)
      .order('name', { ascending: true });

    if (category) query = query.eq('category', category);

    const { data, error } = await query;
    if (error) _throw('getFonts', error);
    return data;
  }

  /**
   * Fetch a single font by its ID.
   * @param {string|number} id
   * @returns {Promise<object>}
   */
  async function getFont(id) {
    const { data, error } = await supabaseClient
      .from('fonts')
      .select('*')
      .eq('id', id)
      .single();
    if (error) _throw('getFont', error);
    return data;
  }

  // ─── Groups / Packages ────────────────────────────────────────────────────

  /**
   * Fetch all active product groups (bundles / package deals).
   * Includes nested group_items rows.
   * @returns {Promise<object[]>}
   */
  async function getGroups() {
    const { data, error } = await supabaseClient
      .from('groups')
      .select('*, group_items(*)')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });
    if (error) _throw('getGroups', error);
    return data;
  }

  /**
   * Fetch a single group with its items.
   * @param {string|number} id
   * @returns {Promise<object>}
   */
  async function getGroup(id) {
    const { data, error } = await supabaseClient
      .from('groups')
      .select('*, group_items(*)')
      .eq('id', id)
      .single();
    if (error) _throw('getGroup', error);
    return data;
  }

  // ─── Portfolio ─────────────────────────────────────────────────────────────

  /**
   * Fetch all portfolio items ordered newest-first.
   * @returns {Promise<object[]>}
   */
  async function getPortfolio() {
    const { data, error } = await supabaseClient
      .from('portfolio')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) _throw('getPortfolio', error);
    return data;
  }

  // ─── Reviews ──────────────────────────────────────────────────────────────

  /**
   * Fetch approved (public) reviews, including the reviewer's name.
   * @returns {Promise<object[]>}
   */
  async function getApprovedReviews() {
    const { data, error } = await supabaseClient
      .from('reviews')
      .select('*, customers(name)')
      .eq('status', 'approved')
      .order('created_at', { ascending: false });
    if (error) _throw('getApprovedReviews', error);
    return data;
  }

  /**
   * Submit a new review for an order.
   * @param {object} data
   * @param {string|number} data.order_id
   * @param {number}        data.rating   - 1–5
   * @param {string}        data.comment
   * @param {string[]}      [data.images] - Array of image URLs
   * @returns {Promise<object>} The inserted review row.
   */
  async function createReview(data) {
    const user = await Auth.getCurrentUser();
    if (!user) throw new Error('กรุณาเข้าสู่ระบบก่อนรีวิว');

    const { data: inserted, error } = await supabaseClient
      .from('reviews')
      .insert([{
        customer_id: user.id,
        order_id: data.order_id,
        rating: data.rating,
        comment: data.comment,
        images: data.images || [],
        status: 'pending',
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) _throw('createReview', error);
    return inserted;
  }

  /**
   * Fetch all reviews written by the currently logged-in customer.
   * @returns {Promise<object[]>}
   */
  async function getMyReviews() {
    const user = await Auth.getCurrentUser();
    if (!user) return [];

    const { data, error } = await supabaseClient
      .from('reviews')
      .select('*, orders(order_number)')
      .eq('customer_id', user.id)
      .order('created_at', { ascending: false });

    if (error) _throw('getMyReviews', error);
    return data;
  }

  // ─── Orders ───────────────────────────────────────────────────────────────

  /**
   * Fetch all orders for the currently logged-in customer.
   * Includes order items and associated payments.
   * @returns {Promise<object[]>}
   */
  async function getMyOrders() {
    const user = await Auth.getCurrentUser();
    if (!user) return [];

    const { data, error } = await supabaseClient
      .from('orders')
      .select('*, order_items(*), payments(*)')
      .eq('customer_id', user.id)
      .order('created_at', { ascending: false });

    if (error) _throw('getMyOrders', error);
    return data;
  }

  /**
   * Fetch a single order with full detail (items, payments, customer snapshot).
   * @param {string|number} id
   * @returns {Promise<object>}
   */
  async function getOrder(id) {
    const { data, error } = await supabaseClient
      .from('orders')
      .select('*, order_items(*), payments(*), customers(name, email, phone)')
      .eq('id', id)
      .single();
    if (error) _throw('getOrder', error);
    return data;
  }

  /**
   * Create a new order (and its line items) for the current user.
   * @param {object}   orderData
   * @param {object[]} orderData.items              - Line items
   * @param {number}   orderData.total_amount
   * @param {string}   [orderData.note]
   * @param {string}   [orderData.coupon_code]
   * @param {number}   [orderData.discount=0]
   * @param {number}   [orderData.points_used=0]
   * @returns {Promise<object>} The created order row.
   */
  async function createOrder(orderData) {
    const user = await Auth.getCurrentUser();
    if (!user) throw new Error('กรุณาเข้าสู่ระบบก่อนสั่งซื้อ');

    const { data: order, error: orderError } = await supabaseClient
      .from('orders')
      .insert([{
        customer_id:  user.id,
        order_number: _generateOrderNumber(),
        status:       'pending',
        total_amount: orderData.total_amount,
        discount:     orderData.discount     || 0,
        points_used:  orderData.points_used  || 0,
        note:         orderData.note         || '',
        coupon_code:  orderData.coupon_code  || null,
        created_at:   new Date().toISOString()
      }])
      .select()
      .single();

    if (orderError) _throw('createOrder (order)', orderError);

    if (orderData.items && orderData.items.length > 0) {
      const items = orderData.items.map(item => ({
        order_id:     order.id,
        product_id:   item.product_id   || null,
        product_name: item.product_name,
        quantity:     item.quantity,
        unit_price:   item.unit_price,
        subtotal:     item.quantity * item.unit_price,
        options:      item.options      || {}
      }));

      const { error: itemsError } = await supabaseClient
        .from('order_items')
        .insert(items);

      if (itemsError) _throw('createOrder (items)', itemsError);
    }

    return order;
  }

  /**
   * Update the status field of an order.
   * @param {string|number} id
   * @param {string} status - 'pending' | 'confirmed' | 'in_progress' | 'waiting_review' | 'completed' | 'cancelled' | 'refunded'
   * @returns {Promise<object>} The updated order row.
   */
  async function updateOrderStatus(id, status) {
    const { data, error } = await supabaseClient
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) _throw('updateOrderStatus', error);
    return data;
  }

  // ─── Payments ─────────────────────────────────────────────────────────────

  /**
   * Create a payment record linked to an order.
   * @param {object}        data
   * @param {string|number} data.order_id
   * @param {number}        data.amount
   * @param {string}        data.method    - 'bank_transfer' | 'promptpay'
   * @param {string}        [data.slip_url]
   * @returns {Promise<object>} The inserted payment row.
   */
  async function createPayment(data) {
    const { data: payment, error } = await supabaseClient
      .from('payments')
      .insert([{
        order_id:   data.order_id,
        amount:     data.amount,
        method:     data.method,
        slip_url:   data.slip_url || null,
        status:     'pending',
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) _throw('createPayment', error);
    return payment;
  }

  /**
   * Upload a payment slip image to Supabase Storage and return its public URL.
   * @param {File}          file    - Slip image file (JPEG/PNG recommended)
   * @param {string|number} orderId - Used to construct a unique storage path
   * @returns {Promise<string>} Public URL of the uploaded slip
   */
  async function uploadSlip(file, orderId) {
    const ext  = file.name.split('.').pop();
    const path = `slips/${orderId}_${Date.now()}.${ext}`;

    const { error: uploadError } = await supabaseClient.storage
      .from(BUCKETS.slips)
      .upload(path, file, { cacheControl: '3600', upsert: false });

    if (uploadError) _throw('uploadSlip', uploadError);

    const { data } = supabaseClient.storage
      .from(BUCKETS.slips)
      .getPublicUrl(path);

    return data.publicUrl;
  }

  // ─── Points ───────────────────────────────────────────────────────────────

  /**
   * Get the current point balance for the logged-in customer.
   * @returns {Promise<number>}
   */
  async function getMyPoints() {
    const customer = await Auth.getCurrentCustomer();
    return customer?.points || 0;
  }

  /**
   * Fetch the full point transaction history for the logged-in customer.
   * Table: `point_transactions` (customer_id, points, type, note, created_at)
   * @returns {Promise<object[]>}
   */
  async function getPointHistory() {
    const user = await Auth.getCurrentUser();
    if (!user) return [];

    const { data, error } = await supabaseClient
      .from('point_transactions')
      .select('*')
      .eq('customer_id', user.id)
      .order('created_at', { ascending: false });

    if (error) _throw('getPointHistory', error);
    return data;
  }

  /**
   * Search customers by name (partial match, case-insensitive).
   * Intended for staff use when looking up points by customer name.
   * @param {string} name
   * @returns {Promise<object[]>}
   */
  async function searchCustomerByName(name) {
    const { data, error } = await supabaseClient
      .from('customers')
      .select('id, name, email, phone, member_code, points')
      .ilike('name', `%${name}%`)
      .limit(20);

    if (error) _throw('searchCustomerByName', error);
    return data;
  }

  // ─── Public API ────────────────────────────────────────────────────────────
  return {
    // Settings
    getSettings,
    // Products
    getProducts,
    getProduct,
    // Fonts
    getFonts,
    getFont,
    // Groups
    getGroups,
    getGroup,
    // Portfolio
    getPortfolio,
    // Reviews
    getApprovedReviews,
    createReview,
    getMyReviews,
    // Orders
    getMyOrders,
    getOrder,
    createOrder,
    updateOrderStatus,
    // Payments
    createPayment,
    uploadSlip,
    // Points
    getMyPoints,
    getPointHistory,
    searchCustomerByName,
    // Constants
    BUCKETS
  };

})();
