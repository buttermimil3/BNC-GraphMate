/**
 * BNC GraphMate — Shopping Cart Component (Cart Drawer & Multi-Item Checkout)
 * Enables customers to select multiple fonts or products and purchase them together in one order.
 */

(function () {
  let cartDrawer = null;
  let cartBackdrop = null;
  let cartFloatingBtn = null;
  let checkoutModal = null;

  function initCartUI() {
    if (document.getElementById('cartDrawer')) return;

    // 1. Floating Cart Button
    cartFloatingBtn = document.createElement('button');
    cartFloatingBtn.id = 'cartFloatingBtn';
    cartFloatingBtn.className = 'cart-floating-btn';
    cartFloatingBtn.setAttribute('aria-label', 'เปิดตะกร้าสินค้า');
    cartFloatingBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
        <path d="M3 6h18"/>
        <path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
      <span class="cart-floating-label">ตะกร้า</span>
      <span class="cart-badge" id="cartBadgeCount">0</span>
    `;
    cartFloatingBtn.addEventListener('click', openCartDrawer);
    document.body.appendChild(cartFloatingBtn);

    // 2. Backdrop
    cartBackdrop = document.createElement('div');
    cartBackdrop.id = 'cartBackdrop';
    cartBackdrop.className = 'cart-backdrop';
    cartBackdrop.addEventListener('click', closeCartDrawer);
    document.body.appendChild(cartBackdrop);

    // 3. Cart Drawer
    cartDrawer = document.createElement('aside');
    cartDrawer.id = 'cartDrawer';
    cartDrawer.className = 'cart-drawer';
    cartDrawer.innerHTML = `
      <div class="cart-drawer__header">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--pink-primary);">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
            <path d="M3 6h18"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <h3 style="font-family: 'Prompt', sans-serif; font-size: 1.15rem; font-weight: 700; margin: 0; color: var(--text-main);">
            ตะกร้าสินค้า (<span id="cartHeaderCount">0</span>)
          </h3>
        </div>
        <button class="cart-drawer__close" id="cartDrawerCloseBtn" aria-label="ปิดตะกร้า">✕</button>
      </div>

      <div class="cart-drawer__body" id="cartDrawerItems">
        <!-- Render items here -->
      </div>

      <div class="cart-drawer__footer" id="cartDrawerFooter">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1rem;">
          <span style="color: var(--text-muted); font-size: 0.95rem;">ยอดรวมทั้งหมด</span>
          <span style="font-family: 'Prompt', sans-serif; font-size: 1.5rem; font-weight: 700; color: var(--pink-deep);" id="cartTotalAmount">฿0</span>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <button class="btn btn-outline btn-sm" onclick="CartUI.clear()" style="width: 35%;">ล้างตะกร้า</button>
          <button class="btn btn-primary btn-sm btn-full" onclick="CartUI.openCheckout()">สั่งซื้อทั้งหมด ➔</button>
        </div>
      </div>
    `;
    document.body.appendChild(cartDrawer);
    document.getElementById('cartDrawerCloseBtn').addEventListener('click', closeCartDrawer);

    // 4. Checkout Modal
    createCheckoutModal();

    // 5. Update counts
    updateCartUI();

    // Listen to custom cart events
    window.addEventListener('cart-updated', updateCartUI);
  }

  function openCartDrawer() {
    renderCartItems();
    cartDrawer.classList.add('is-open');
    cartBackdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeCartDrawer() {
    cartDrawer.classList.remove('is-open');
    cartBackdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function updateCartUI() {
    if (typeof Store === 'undefined') return;
    const cart = Store.getCart();
    const badge = document.getElementById('cartBadgeCount');
    const headerCount = document.getElementById('cartHeaderCount');
    if (badge) badge.textContent = cart.length;
    if (headerCount) headerCount.textContent = cart.length;

    if (cartFloatingBtn) {
      if (cart.length > 0) {
        cartFloatingBtn.classList.add('has-items');
      } else {
        cartFloatingBtn.classList.remove('has-items');
      }
    }
  }

  function renderCartItems() {
    const cart = Store.getCart();
    const container = document.getElementById('cartDrawerItems');
    const footer = document.getElementById('cartDrawerFooter');
    const totalEl = document.getElementById('cartTotalAmount');

    if (!container) return;

    if (cart.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 3rem 1.5rem; color: var(--text-muted);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--border-medium); margin-bottom: 1rem;">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
            <path d="M3 6h18"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <h4 style="font-family: 'Prompt', sans-serif; font-size: 1.05rem; color: var(--text-main); margin-bottom: 0.35rem;">ยังไม่มีสินค้าในตะกร้า</h4>
          <p style="font-size: 0.88rem; margin: 0;">กดปุ่ม "ใส่ตะกร้า" ที่ฟอนต์หรือสินค้าที่ต้องการเพื่อสั่งซื้อรวมได้เลยค่ะ</p>
        </div>
      `;
      if (footer) footer.style.display = 'none';
      return;
    }

    if (footer) footer.style.display = 'block';

    let total = 0;
    container.innerHTML = cart.map(item => {
      const price = Number(item.price) || 0;
      total += price;
      return `
        <div class="cart-item">
          <div class="cart-item__info">
            <span class="badge" style="background: var(--bg-surface); color: var(--pink-deep); font-size: 0.72rem; font-weight: 600; margin-bottom: 0.25rem;">${item.category || item.type || 'ฟอนต์'}</span>
            <h4 class="cart-item__title">${item.name}</h4>
            <span class="cart-item__price">฿${price.toLocaleString()}</span>
          </div>
          <button class="cart-item__remove" onclick="CartUI.remove('${item.id}')" title="ลบรายการนี้" aria-label="ลบรายการ">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </svg>
          </button>
        </div>
      `;
    }).join('');

    if (totalEl) totalEl.textContent = '฿' + total.toLocaleString();
  }

  function createCheckoutModal() {
    checkoutModal = document.createElement('div');
    checkoutModal.id = 'cartCheckoutModal';
    checkoutModal.className = 'modal-backdrop';
    checkoutModal.style.display = 'none';
    checkoutModal.innerHTML = `
      <div class="modal-box" style="max-width: 580px; max-height: 90vh; overflow-y: auto; padding: 2rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-light); padding-bottom: 0.85rem;">
          <h3 style="font-family: 'Prompt', sans-serif; font-size: 1.25rem; font-weight: 700; margin: 0; color: var(--text-main);">
            สั่งซื้อสินค้าในตะกร้า
          </h3>
          <button onclick="CartUI.closeCheckout()" style="background: none; border: none; font-size: 1.2rem; cursor: pointer; color: var(--text-muted);">✕</button>
        </div>

        <!-- Order Summary -->
        <div style="background: var(--bg-secondary); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 1rem 1.25rem; margin-bottom: 1.5rem;">
          <div style="font-size: 0.85rem; font-weight: 600; color: var(--text-muted); margin-bottom: 0.5rem;">รายการสินค้าที่จะสั่งซื้อ:</div>
          <div id="checkoutItemsSummary" style="font-size: 0.92rem; line-height: 1.5; color: var(--text-main); margin-bottom: 0.75rem;"></div>
          <div style="display: flex; justify-content: space-between; align-items: baseline; border-top: 1px dashed var(--border-light); padding-top: 0.5rem;">
            <span style="font-weight: 600; color: var(--text-main);">ยอดชำระทั้งหมด:</span>
            <span id="checkoutGrandTotal" style="font-family: 'Prompt', sans-serif; font-size: 1.45rem; font-weight: 700; color: var(--pink-deep);">฿0</span>
          </div>
        </div>

        <!-- Payment Info -->
        <div style="background: var(--bg-surface); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.5rem; text-align: center;">
          <div style="font-weight: 600; color: var(--pink-deep); margin-bottom: 0.35rem;">สแกนโอนชำระเงินผ่าน QR Code</div>
          <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.85rem;" id="checkoutBankInfo"></div>
          <img id="checkoutQrImg" src="" alt="QR Code พร้อมเพย์" style="max-width: 190px; height: auto; border-radius: var(--radius-md); border: 1px solid var(--border-light); background: #fff; padding: 0.5rem; margin: 0 auto; display: block;">
        </div>

        <!-- Form -->
        <form id="multiCheckoutForm" onsubmit="CartUI.submitCheckout(event)">
          <div class="form-group" style="margin-bottom: 1rem;">
            <label class="form-label">ชื่อผู้สั่งซื้อ <span style="color: var(--pink-primary);">*</span></label>
            <input type="text" id="chkCustName" class="form-input" placeholder="ชื่อ-นามสกุล หรือชื่อเล่น" required>
          </div>

          <div class="form-group" style="margin-bottom: 1rem;">
            <label class="form-label">Gmail สำหรับรับสิทธิ์ไฟล์ Google Drive <span style="color: var(--pink-primary);">*</span></label>
            <input type="email" id="chkCustGmail" class="form-input" placeholder="example@gmail.com" required>
            <small style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-top: 0.25rem;">ระบบจะแชร์ไฟล์และดึงเมลล์นี้เข้า Google Drive ของคุณโดยอัตโนมัติ</small>
          </div>

          <div class="form-group" style="margin-bottom: 1rem;">
            <label class="form-label">LINE ID สำหรับรับการแจ้งเตือน</label>
            <input type="text" id="chkCustLine" class="form-input" placeholder="ไอดี LINE ของคุณ">
          </div>

          <div class="form-group" style="margin-bottom: 1.5rem;">
            <label class="form-label">แนบสลิปการโอนเงิน <span style="color: var(--pink-primary);">*</span></label>
            <input type="file" id="chkSlipInput" accept="image/*" class="form-input" required onchange="CartUI.previewSlip(event)">
            <div id="chkSlipPreviewBox" style="display: none; margin-top: 0.75rem; text-align: center;">
              <img id="chkSlipPreviewImg" src="" style="max-height: 180px; border-radius: var(--radius-sm); border: 1px solid var(--border-light);">
            </div>
          </div>

          <div style="display: flex; gap: 0.75rem; justify-content: flex-end;">
            <button type="button" class="btn btn-outline" onclick="CartUI.closeCheckout()">ยกเลิก</button>
            <button type="submit" class="btn btn-primary" id="btnSubmitMultiOrder">ยืนยันการโอนเงิน & ส่งออเดอร์ ➔</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(checkoutModal);
  }

  // Public API
  window.CartUI = {
    open: openCartDrawer,
    close: closeCartDrawer,
    add: function (item) {
      if (typeof Store === 'undefined') return;
      Store.addToCart(item);
      updateCartUI();
      openCartDrawer();
    },
    addById: function (id, type) {
      if (typeof Store === 'undefined') return;
      let item = null;
      if (type === 'FONT') {
        item = Store.getAllFonts().find(f => f.id === id);
        if (item) item.type = 'FONT';
      } else if (type === 'PRODUCT') {
        item = Store.getAllProducts().find(p => p.id === id);
        if (item) item.type = 'PRODUCT';
      } else {
        item = Store.getAllFonts().find(f => f.id === id) || Store.getAllProducts().find(p => p.id === id);
      }
      if (!item) {
        console.warn('Item not found for cart:', id, type);
        return;
      }
      Store.addToCart(item);
      updateCartUI();
      openCartDrawer();
    },
    addFont: function (id) {
      this.addById(id, 'FONT');
    },
    addProduct: function (id) {
      this.addById(id, 'PRODUCT');
    },
    remove: function (id) {
      if (typeof Store === 'undefined') return;
      Store.removeFromCart(id);
      updateCartUI();
      renderCartItems();
    },
    clear: function () {
      if (typeof Store === 'undefined') return;
      if (confirm('ต้องการล้างสินค้าในตะกร้าทั้งหมดหรือไม่?')) {
        Store.clearCart();
        updateCartUI();
        renderCartItems();
      }
    },
    openCheckout: function () {
      const cart = Store.getCart();
      if (cart.length === 0) return;

      const s = Store.getSettings();
      const summaryBox = document.getElementById('checkoutItemsSummary');
      const totalBox = document.getElementById('checkoutGrandTotal');
      const bankInfo = document.getElementById('checkoutBankInfo');
      const qrImg = document.getElementById('checkoutQrImg');

      let total = 0;
      summaryBox.innerHTML = cart.map(i => {
        const p = Number(i.price) || 0;
        total += p;
        return `• <strong>${i.name}</strong> (${i.category || i.type || 'ฟอนต์'}) — ฿${p.toLocaleString()}`;
      }).join('<br>');

      totalBox.textContent = '฿' + total.toLocaleString();

      if (s) {
        bankInfo.innerHTML = `${s.bankName || 'ธนาคารกสิกรไทย'} | เลขบัญชี: <strong>${s.bankAccount || '-'}</strong> (${s.bankAccountName || s.shopName})<br>หรือสแกน QR พร้อมเพย์ด้านล่าง`;
        qrImg.src = s.promptpayQrUrl || 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=0812345678';
      }

      closeCartDrawer();
      checkoutModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    },
    closeCheckout: function () {
      if (checkoutModal) {
        checkoutModal.style.display = 'none';
        document.body.style.overflow = '';
      }
    },
    previewSlip: function (e) {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function (evt) {
        document.getElementById('chkSlipPreviewImg').src = evt.target.result;
        document.getElementById('chkSlipPreviewBox').style.display = 'block';
      };
      reader.readAsDataURL(file);
    },
    submitCheckout: function (e) {
      e.preventDefault();
      const cart = Store.getCart();
      if (cart.length === 0) return;

      const btn = document.getElementById('btnSubmitMultiOrder');
      btn.disabled = true;
      btn.textContent = 'กำลังบันทึกออเดอร์...';

      const slipImg = document.getElementById('chkSlipPreviewImg').src || '';
      const custInfo = {
        customer_name: document.getElementById('chkCustName').value.trim(),
        gmail: document.getElementById('chkCustGmail').value.trim(),
        line_id: document.getElementById('chkCustLine').value.trim()
      };

      const payInfo = {
        slip_image_url: slipImg
      };

      const result = Store.checkoutMultiItems(cart, custInfo, payInfo);

      btn.disabled = false;
      btn.textContent = 'ยืนยันการโอนเงิน & ส่งออเดอร์ ➔';
      CartUI.closeCheckout();

      alert(`สั่งซื้อสำเร็จเรียบร้อยค่ะ!\nหมายเลขออเดอร์ของคุณคือ #${result.order.order_number}\nแอดมินจะตรวจสอบสลิปและดำเนินการดึงสิทธิ์ให้โดยเร็วค่ะ`);
      
      // If user is in fonts page or products page, redirect or reload
      if (window.location.pathname.includes('pages/')) {
        window.location.href = 'orders.html';
      } else {
        window.location.href = 'pages/orders.html';
      }
    }
  };

  document.addEventListener('DOMContentLoaded', initCartUI);
})();
