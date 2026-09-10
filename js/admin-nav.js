/**
 * BNC GraphMate — Admin Navigation Helper
 * Handles responsive sidebar drawer, backdrop, and toggle seamlessly across all admin pages.
 */
document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('adminSidebar') || document.querySelector('.admin-sidebar');
  if (!sidebar) return;

  // 1. Create or ensure backdrop element exists
  let backdrop = document.querySelector('.admin-sidebar-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'admin-sidebar-backdrop';
    document.body.appendChild(backdrop);
  }

  // 2. Ensure close button exists in sidebar-brand
  const brand = sidebar.querySelector('.sidebar-brand');
  if (brand && !brand.querySelector('.sidebar-close-btn')) {
    const closeBtn = document.createElement('button');
    closeBtn.className = 'sidebar-close-btn';
    closeBtn.setAttribute('aria-label', 'ปิดเมนู');
    closeBtn.innerHTML = '✕';
    closeBtn.addEventListener('click', closeSidebar);
    brand.appendChild(closeBtn);
  }

  // 3. Ensure toggle button exists in admin-topbar
  const topbar = document.querySelector('.admin-topbar');
  if (topbar && !topbar.querySelector('.sidebar-toggle-btn')) {
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'sidebar-toggle-btn';
    toggleBtn.setAttribute('aria-label', 'เปิดเมนู');
    toggleBtn.innerHTML = '<span style="font-size: 1.1rem; line-height: 1;">☰</span> <span style="font-size: 0.85rem; font-weight: 600;">เมนู</span>';
    toggleBtn.addEventListener('click', openSidebar);

    // Insert as the first element inside topbar
    if (topbar.firstChild) {
      topbar.insertBefore(toggleBtn, topbar.firstChild);
    } else {
      topbar.appendChild(toggleBtn);
    }
  }

  function openSidebar() {
    sidebar.classList.add('is-open');
    backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  // Close on backdrop click
  backdrop.addEventListener('click', closeSidebar);

  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('is-open')) {
      closeSidebar();
    }
  });

  // Close when clicking any nav link
  sidebar.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 860) {
        closeSidebar();
      }
    });
  });
});
