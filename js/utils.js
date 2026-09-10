// BNC GraphMate - Utility Functions
// No external dependencies required.

// ─── Formatting ───────────────────────────────────────────────────────────────

/**
 * Format a number as Thai Baht currency.
 * @param {number} amount
 * @returns {string} e.g. '฿1,234.00'
 */
function formatPrice(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) return '฿0.00';
  return '฿' + Number(amount).toLocaleString('th-TH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

/**
 * Format a date string or Date object as a short Thai date.
 * @param {string|Date} date
 * @returns {string} e.g. '10 ก.ย. 2569'
 */
function formatDate(date) {
  if (!date) return '-';
  return new Date(date).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Format a date string or Date object as a Thai date + time.
 * @param {string|Date} date
 * @returns {string} e.g. '10 ก.ย. 2569 เวลา 12:57 น.'
 */
function formatDateTime(date) {
  if (!date) return '-';
  const d = new Date(date);
  const datePart = d.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  const timePart = d.toLocaleTimeString('th-TH', {
    hour: '2-digit',
    minute: '2-digit'
  });
  return `${datePart} เวลา ${timePart} น.`;
}

// ─── Toast Notifications ──────────────────────────────────────────────────────

/**
 * Show a toast notification.
 * Auto-creates a #toast-container fixed to the bottom-right of the viewport.
 * @param {string} message
 * @param {'success'|'error'|'warning'|'info'} [type='info']
 * @param {number} [duration=3500] - Auto-dismiss delay in ms; 0 = manual dismiss only
 */
function showToast(message, type = 'info', duration = 3500) {
  // Inject keyframe animation once
  if (!document.getElementById('toast-style')) {
    const style = document.createElement('style');
    style.id = 'toast-style';
    style.textContent = `
      @keyframes slideInRight {
        from { transform: translateX(120%); opacity: 0; }
        to   { transform: translateX(0);    opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }

  // Ensure container
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    Object.assign(container.style, {
      position: 'fixed',
      bottom: '1.5rem',
      right: '1.5rem',
      zIndex: '9999',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      maxWidth: '320px',
      pointerEvents: 'none'
    });
    document.body.appendChild(container);
  }

  const icons  = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
  const colors = { success: '#28a745', error: '#dc3545', warning: '#e0a800', info: '#0d6efd' };

  const toast = document.createElement('div');
  Object.assign(toast.style, {
    background: colors[type] || colors.info,
    color: '#fff',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.9rem',
    cursor: 'pointer',
    pointerEvents: 'auto',
    animation: 'slideInRight 0.3s ease'
  });
  toast.innerHTML = `<span>${icons[type] || icons.info}</span><span>${message}</span>`;
  toast.addEventListener('click', () => toast.remove());
  container.appendChild(toast);

  if (duration > 0) setTimeout(() => toast.remove(), duration);
}

// ─── Modal Helpers ────────────────────────────────────────────────────────────

/**
 * Show a Bootstrap 5 modal by element ID.
 * Falls back to basic inline-style display if Bootstrap is not loaded.
 * @param {string} id - Modal element ID (without #)
 */
function showModal(id) {
  const el = document.getElementById(id);
  if (!el) { console.warn(`[Utils] showModal: #${id} not found`); return; }
  if (typeof bootstrap !== 'undefined') {
    bootstrap.Modal.getOrCreateInstance(el).show();
  } else {
    el.style.display = 'block';
    el.classList.add('show');
  }
}

/**
 * Hide a Bootstrap 5 modal by element ID.
 * @param {string} id - Modal element ID (without #)
 */
function hideModal(id) {
  const el = document.getElementById(id);
  if (!el) { console.warn(`[Utils] hideModal: #${id} not found`); return; }
  if (typeof bootstrap !== 'undefined') {
    const instance = bootstrap.Modal.getInstance(el);
    if (instance) instance.hide();
  } else {
    el.style.display = 'none';
    el.classList.remove('show');
  }
}

// ─── Loading Overlay ──────────────────────────────────────────────────────────

/**
 * Display a full-screen semi-transparent loading overlay.
 * Creates #loading-overlay if it doesn't exist.
 */
function showLoading() {
  let overlay = document.getElementById('loading-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'loading-overlay';
    Object.assign(overlay.style, {
      position: 'fixed',
      inset: '0',
      background: 'rgba(0,0,0,0.45)',
      zIndex: '10000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    });
    overlay.innerHTML = `
      <div style="background:#fff;border-radius:12px;padding:2rem 2.5rem;
                  display:flex;flex-direction:column;align-items:center;gap:1rem;">
        <div class="spinner-border text-primary" role="status"
             style="width:2.5rem;height:2.5rem;"></div>
        <span style="font-size:0.95rem;color:#555;">กำลังโหลด...</span>
      </div>`;
    document.body.appendChild(overlay);
  }
  overlay.style.display = 'flex';
}

/**
 * Hide the loading overlay created by showLoading().
 */
function hideLoading() {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) overlay.style.display = 'none';
}

// ─── Order Status Helpers ─────────────────────────────────────────────────────

/**
 * Return an emoji icon for a given order status key.
 * @param {string} status
 * @returns {string}
 */
function getStatusIcon(status) {
  const map = {
    pending:        '⏳',
    confirmed:      '✅',
    in_progress:    '🎨',
    waiting_review: '👀',
    completed:      '🎉',
    cancelled:      '❌',
    refunded:       '💸'
  };
  return map[status] || '❓';
}

/**
 * Return a Thai language label for a given order status key.
 * @param {string} status
 * @returns {string}
 */
function getStatusText(status) {
  const map = {
    pending:        'รอดำเนินการ',
    confirmed:      'ยืนยันแล้ว',
    in_progress:    'กำลังผลิต',
    waiting_review: 'รอตรวจสอบ',
    completed:      'สำเร็จแล้ว',
    cancelled:      'ยกเลิกแล้ว',
    refunded:       'คืนเงินแล้ว'
  };
  return map[status] || status;
}

/**
 * Return a Bootstrap badge utility class string for a given order status.
 * @param {string} status
 * @returns {string}
 */
function getStatusClass(status) {
  const map = {
    pending:        'bg-warning text-dark',
    confirmed:      'bg-info text-dark',
    in_progress:    'bg-primary',
    waiting_review: 'bg-secondary',
    completed:      'bg-success',
    cancelled:      'bg-danger',
    refunded:       'bg-dark'
  };
  return map[status] || 'bg-secondary';
}

// ─── Clipboard ────────────────────────────────────────────────────────────────

/**
 * Copy a string to the clipboard and show a success toast.
 * @param {string} text
 * @returns {Promise<boolean>} true if successful
 */
async function copyToClipboard(text) {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    } else {
      // Legacy fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      Object.assign(ta.style, { position: 'fixed', opacity: '0' });
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    showToast('คัดลอกแล้ว!', 'success', 1800);
    return true;
  } catch {
    showToast('ไม่สามารถคัดลอกได้', 'error');
    return false;
  }
}

// ─── Function Utilities ───────────────────────────────────────────────────────

/**
 * Return a debounced version of a function.
 * @param {function} fn
 * @param {number}   delay - Milliseconds to wait after last call
 * @returns {function}
 */
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// ─── Validation ───────────────────────────────────────────────────────────────

/**
 * Validate an email address with a basic regex.
 * @param {string} email
 * @returns {boolean}
 */
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
}

// ─── Member Code ──────────────────────────────────────────────────────────────

/**
 * Generate a random 6-digit numeric string for use as a member code.
 * @returns {string}
 */
function generateMemberCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// ─── File / Image Utilities ───────────────────────────────────────────────────

/**
 * Read a File object and return it as a Base64-encoded data URL.
 * @param {File} file
 * @returns {Promise<string>}
 */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload  = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Resize and compress an image using an off-screen canvas.
 * Use this before uploading to Supabase Storage to reduce bandwidth.
 *
 * @param {File}   file        - Source image file
 * @param {number} maxWidth    - Maximum output width in pixels
 * @param {number} [quality=0.8] - JPEG compression quality (0–1)
 * @returns {Promise<Blob>} Compressed JPEG blob
 */
function resizeImage(file, maxWidth, quality = 0.8) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      let width  = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width  = maxWidth;
      }

      const canvas = document.createElement('canvas');
      canvas.width  = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        blob => blob ? resolve(blob) : reject(new Error('Image compression failed')),
        'image/jpeg',
        quality
      );
    };

    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Failed to load image')); };
    img.src = url;
  });
}

// ─── Stars ────────────────────────────────────────────────────────────────────

/**
 * Render an HTML string of star icons for a numeric rating.
 * @param {number} rating - Value between 1 and max
 * @param {number} [max=5]
 * @returns {string} HTML string
 */
function renderStars(rating, max = 5) {
  let html = '';
  const filled = Math.round(rating);
  for (let i = 1; i <= max; i++) {
    html += i <= filled
      ? '<span style="color:#ffc107;font-size:1.1em;">★</span>'
      : '<span style="color:#ddd;font-size:1.1em;">★</span>';
  }
  return html;
}

// ─── Scroll / Device ──────────────────────────────────────────────────────────

/**
 * Smooth-scroll the page back to the top.
 */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Return true if the user is likely on a mobile device.
 * Checks both the user-agent string and the viewport width.
 * @returns {boolean}
 */
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
    .test(navigator.userAgent) || window.innerWidth < 768;
}

// ─── URL Query Params ─────────────────────────────────────────────────────────

/**
 * Parse all query parameters from the current page URL into a plain object.
 * @returns {object}
 */
function parseQueryParams() {
  const params = {};
  new URLSearchParams(window.location.search).forEach((value, key) => {
    params[key] = value;
  });
  return params;
}

/**
 * Set (or update) a query parameter in the address bar without reloading.
 * Pass null or an empty string as `value` to remove the parameter.
 * @param {string}        key
 * @param {string|number|null} value
 */
function setQueryParam(key, value) {
  const url = new URL(window.location.href);
  if (value === null || value === '') {
    url.searchParams.delete(key);
  } else {
    url.searchParams.set(key, value);
  }
  window.history.replaceState({}, '', url.toString());
}
