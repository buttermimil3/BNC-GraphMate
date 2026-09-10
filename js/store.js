/**
 * BNC GraphMate — Unified Data Store (Google Sheets Cloud Database + Vercel Fast Cache)
 * ทำให้ข้อมูลตรงกันทุกเครื่อง 100% (ทั้งมือถือลูกค้า และคอมพิวเตอร์แอดมิน)
 */

const Store = (function () {
  const STORAGE_KEY = 'BNC_GRAPHMATE_DATA_V1';

  // ข้อมูลเริ่มต้นสำหรับระบบเมื่อเปิดใช้งานครั้งแรก
  const defaultData = {
    settings: {
      shopName: 'BNC GraphMate ร้านป้าย & กราฟิก',
      tagline: 'ป้ายสวย ฟอนต์น่ารัก กราฟิกสำเร็จรูป สไตล์น่ารักขี้เล่น',
      logoText: '🎨 BNC GraphMate',
      themeColor: '#FF2D8A',
      contactPhone: '081-234-5678',
      contactLine: '@bncgraphmate',
      lineUrl: 'https://line.me/ti/p/~bncgraphmate',
      bankName: 'ธนาคารกสิกรไทย (KBank)',
      bankAccount: '123-4-56789-0',
      bankAccountName: 'ร้าน บีเอ็นซี กราฟเมท',
      promptpayQrUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=0812345678',
      googleSheetWebAppUrl: '', // URL จาก Google Apps Script Web App
      pointsPerHundredBaht: 10,
      announcement: 'ยินดีต้อนรับสู่ BNC GraphMate! มีฟอนต์ใหม่และกลุ่มทรัพยากรป้ายอัปเดตทุกสัปดาห์ 🌸'
    },
    customers: [
      {
        id: 'cust-demo-1',
        name: 'ลูกค้าตัวอย่าง (น้องพลอย)',
        member_code: 'BNC-8899',
        line_id: 'ploy_cute99',
        email: 'ploy.design@gmail.com',
        phone: '089-999-8888',
        total_points: 750,
        member_level: 'SILVER',
        created_at: new Date(Date.now() - 30 * 86400000).toISOString()
      }
    ],
    groups: [
      {
        id: 'grp-1',
        name: 'กลุ่ม VIP ป้าย & กราฟิกสุดคิ้วท์ 2026',
        description: 'รวมไฟล์ป้ายสำเร็จ ไฟล์ตกแต่ง การ์ตูนไดคัท ฟอนต์ และอัปเดตไฟล์ใหม่ตลอดชีพ',
        cover_image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
        price: 390,
        preview_drive_url: 'https://drive.google.com/',
        benefits: 'เข้า LINE Group อัปเดตไฟล์ตลอดชีพ\nไฟล์ PNG/PSD พร้อมใช้กว่า 1,000+ ชิ้น\nฟอนต์ลายมือน่ารักใช้เชิงพาณิชย์ได้\nปรึกษาเทคนิคงานออกแบบกับแอดมินได้ตลอด',
        status: 'ACTIVE',
        created_at: new Date(Date.now() - 15 * 86400000).toISOString()
      },
      {
        id: 'grp-2',
        name: 'กลุ่มคาแรกเตอร์การ์ตูน & บอร์ดตกแต่ง',
        description: 'เน้นงานการ์ตูนเด็ก คาแรคเตอร์น่ารัก สำหรับทำป้ายร้านอาหาร ขนม เบเกอรี่',
        cover_image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80',
        price: 250,
        preview_drive_url: 'https://drive.google.com/',
        benefits: 'การ์ตูนวาดมือความละเอียดสูง 300 DPI\nพาเลทสีและเทมเพลตแต่งร้าน\nใช้งานได้ทั้งส่วนตัวและเชิงพาณิชย์',
        status: 'ACTIVE',
        created_at: new Date(Date.now() - 10 * 86400000).toISOString()
      }
    ],
    products: [
      {
        id: 'prod-1',
        name: 'ชุดเทมเพลตป้ายเมนูเครื่องดื่ม พาสเทล',
        category: 'Template',
        description: 'ป้ายเมนูเครื่องดื่ม ชา กาแฟ นมสด แก้ไขข้อความและราคาได้ง่ายใน Canva/Photoshop',
        price: 159,
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&auto=format&fit=crop&q=80',
        delivery_type: 'GOOGLE_DRIVE',
        drive_folder_id: '1aBcDeFgHiJkLmNoPqRsTuVwXyZ_Folder',
        drive_file_id: '',
        what_you_get: 'ไฟล์ PSD แยกเลเยอร์\nลิงก์เทมเพลต Canva แก้ไขได้ทันที\nฟอนต์ฟรีที่ใช้ในงาน\nคู่มือการแก้ไขง่ายๆ',
        status: 'ACTIVE',
        created_at: new Date(Date.now() - 12 * 86400000).toISOString()
      },
      {
        id: 'prod-2',
        name: 'เซ็ตสติกเกอร์การ์ตูนดุ๊กดิ๊ก 100 ชิ้น',
        category: 'Cartoon',
        description: 'ไฟล์ภาพ PNG พื้นหลังโปร่งใส สำหรับตกแต่งป้ายและสตอรี่ไอจี ลายน่ารักไม่ซ้ำใคร',
        price: 99,
        image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
        delivery_type: 'MANUAL',
        drive_folder_id: '',
        drive_file_id: '',
        what_you_get: '100 ไฟล์ PNG โปร่งใส คมชัดสูง\nพาเลทโค้ดสีที่เข้าชุดกัน\nสิทธิ์ใช้งานเชิงพาณิชย์สำหรับทำป้าย',
        status: 'ACTIVE',
        created_at: new Date(Date.now() - 8 * 86400000).toISOString()
      },
      {
        id: 'prod-3',
        name: 'Elements ดอกไม้และโบว์สไตล์คาวาอี้',
        category: 'Elements',
        description: 'ชุดองค์ประกอบกราฟิก ลายเส้นดินสอและสีน้ำ น่ารักขี้เล่น',
        price: 120,
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
        delivery_type: 'GOOGLE_DRIVE',
        drive_folder_id: '1Flower_Kawaii_Elements_DriveID',
        drive_file_id: '',
        what_you_get: 'PNG + SVG เวกเตอร์ปรับขยายได้ไม่แตก\nชุดกรอบป้าย 10 แบบ',
        status: 'ACTIVE',
        created_at: new Date(Date.now() - 5 * 86400000).toISOString()
      }
    ],
    fonts: [
      {
        id: 'font-1',
        name: 'BNC ขนมปังเนยสด (Butter)',
        category: 'ลายมือ',
        description: 'ฟอนต์ลายมือน่ารัก หัวกลม อ้วนป้อม ขี้เล่น อ่านง่าย เหมาะกับป้ายเมนูและป้ายหน้าร้าน',
        price: 199,
        preview_text: 'ขนมปังปิ้งเนยสด ชาไทยหวานน้อย อร่อยมาก!',
        preview_image: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=600&auto=format&fit=crop&q=80',
        delivery_type: 'GOOGLE_DRIVE',
        drive_folder_id: '1Font_Butter_DriveFolderId',
        drive_file_id: '',
        what_you_get: 'ไฟล์ .OTF / .TTF รองรับ Windows, Mac, iPad\nสระและวรรณยุกต์ไม่ลอย\nสิทธิ์ใช้งานเชิงพาณิชย์ 1 ผู้ใช้',
        status: 'ACTIVE',
        created_at: new Date(Date.now() - 14 * 86400000).toISOString()
      },
      {
        id: 'font-2',
        name: 'ฟอนต์น้องมาชเมลโล่ (Marshmallow)',
        category: 'ตัวพิมพ์',
        description: 'ฟอนต์ตัวพิมพ์เส้นหนา นุ่มฟู สไตล์เกาหลี ญี่ปุ่น ใช้ทำหัวข้อป้ายสะดุดตามาก (ตัวแทนจัดส่ง)',
        price: 180,
        preview_text: 'ยินดีต้อนรับ สั่งซื้อสินค้าได้ที่นี่เลยนะคะ 🌸',
        preview_image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
        delivery_type: 'MANUAL',
        drive_folder_id: '',
        drive_file_id: '',
        what_you_get: 'ไฟล์ .OTF / .TTF ครบชุด\nส่งสิทธิ์ผ่านตัวแทนโดยแอดมินนำ Gmail ไปดึงสิทธิ์ให้',
        status: 'ACTIVE',
        created_at: new Date(Date.now() - 7 * 86400000).toISOString()
      },
      {
        id: 'font-3',
        name: 'BNC ปิกนิกเดย์ (Picnic Day)',
        category: 'ลายมือ',
        description: 'ฟอนต์ลายมือผอมเพรียว หวานละมุน เหมาะกับป้ายสินค้า คาเฟ่ และข้อความบรรยาย',
        price: 150,
        preview_text: 'Coffee, Tea and Sweet Bakery Everyday',
        preview_image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&auto=format&fit=crop&q=80',
        delivery_type: 'GOOGLE_DRIVE',
        drive_folder_id: '1Font_PicnicDay_FolderID',
        drive_file_id: '',
        what_you_get: 'ไฟล์ .OTF / .TTF / .WOFF สำหรับเว็บ\nลิขสิทธิ์เชิงพาณิชย์ตลอดชีพ',
        status: 'ACTIVE',
        created_at: new Date(Date.now() - 3 * 86400000).toISOString()
      }
    ],
    orders: [
      {
        id: 'ord-1001',
        order_number: 'ORD-001001',
        customer_id: 'cust-demo-1',
        customer_name: 'ลูกค้าตัวอย่าง (น้องพลอย)',
        order_type: 'GROUP',
        item_id: 'grp-1',
        item_name: 'กลุ่ม VIP ป้าย & กราฟิกสุดคิ้วท์ 2026',
        amount: 390,
        status: 'PAID',
        line_id: 'ploy_cute99',
        gmail: 'ploy.design@gmail.com',
        created_at: new Date(Date.now() - 2 * 86400000).toISOString()
      },
      {
        id: 'ord-1002',
        order_number: 'ORD-001002',
        customer_id: 'cust-demo-1',
        customer_name: 'ลูกค้าตัวอย่าง (น้องพลอย)',
        order_type: 'FONT',
        item_id: 'font-2',
        item_name: 'ฟอนต์น้องมาชเมลโล่ (Marshmallow)',
        amount: 180,
        status: 'PAID',
        line_id: 'ploy_cute99',
        gmail: 'ploy.design@gmail.com',
        created_at: new Date(Date.now() - 1 * 86400000).toISOString()
      }
    ],
    payments: [
      {
        id: 'pay-1001',
        order_id: 'ord-1001',
        amount: 390,
        slip_image_url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&auto=format&fit=crop&q=80',
        verification_status: 'PAID',
        qr_ref: '00460006000001010301402251234567890',
        qr_trans_ref: '202609081234567890',
        qr_date: '2026-09-08 14:32',
        verified_at: new Date(Date.now() - 2 * 86400000).toISOString()
      },
      {
        id: 'pay-1002',
        order_id: 'ord-1002',
        amount: 180,
        slip_image_url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&auto=format&fit=crop&q=80',
        verification_status: 'PAID',
        qr_ref: '00460006000001010301402259876543210',
        qr_trans_ref: '202609091620112233',
        qr_date: '2026-09-09 16:20',
        verified_at: new Date(Date.now() - 1 * 86400000).toISOString()
      }
    ],
    group_access: [
      {
        id: 'ga-1',
        order_id: 'ord-1001',
        customer_id: 'cust-demo-1',
        customer_name: 'ลูกค้าตัวอย่าง (น้องพลอย)',
        group_id: 'grp-1',
        group_name: 'กลุ่ม VIP ป้าย & กราฟิกสุดคิ้วท์ 2026',
        line_id: 'ploy_cute99',
        status: 'COMPLETED',
        completed_at: new Date(Date.now() - 1 * 86400000).toISOString()
      }
    ],
    drive_access: [
      {
        id: 'da-1',
        order_id: 'ord-1002',
        customer_id: 'cust-demo-1',
        customer_name: 'ลูกค้าตัวอย่าง (น้องพลอย)',
        item_id: 'font-2',
        item_name: 'ฟอนต์น้องมาชเมลโล่ (Marshmallow)',
        item_type: 'FONT',
        delivery_type: 'MANUAL',
        gmail: 'ploy.design@gmail.com',
        drive_id: '',
        status: 'WAITING_ADMIN',
        completed_at: null
      }
    ],
    point_transactions: [
      {
        id: 'pt-1',
        customer_id: 'cust-demo-1',
        amount: 500,
        type: 'BONUS',
        description: 'แต้มต้อนรับสมัครสมาชิก BNC GraphMate 🌸',
        created_at: new Date(Date.now() - 30 * 86400000).toISOString()
      },
      {
        id: 'pt-2',
        customer_id: 'cust-demo-1',
        amount: 250,
        type: 'EARN',
        description: 'แต้มจากการสั่งซื้อกลุ่ม VIP (Order #ORD-001001)',
        order_id: 'ord-1001',
        created_at: new Date(Date.now() - 2 * 86400000).toISOString()
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        customer_name: 'น้องพลอย',
        product_name: 'กลุ่ม VIP ป้าย & กราฟิกสุดคิ้วท์ 2026',
        rating: 5,
        message: 'คุ้มมากกก ไฟล์เยอะจุใจ แอดมินดึงเข้ากลุ่มไวมาก งานน่ารักตรงปกสุดๆ ค่ะ แนะนำเลย 💕',
        image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&auto=format&fit=crop&q=80',
        status: 'APPROVED',
        created_at: new Date(Date.now() - 1 * 86400000).toISOString()
      }
    ],
    portfolio: [
      {
        id: 'port-1',
        title: 'ป้ายไวนิลหน้าร้าน ขนมปังปิ้งเตาถ่าน',
        category: 'ป้าย',
        description: 'ออกแบบป้ายไวนิลสีชมพูพาสเทล พร้อมภาพการ์ตูนวาดมือ',
        image_url: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&auto=format&fit=crop&q=80'
      }
    ]
  };

  // ดึงข้อมูลจาก Local Cache ทันที (เพื่อให้เว็บโหลดเร็ว 0.01 วินาที)
  function loadLocal() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return Object.assign({}, defaultData, parsed);
      }
    } catch (e) {
      console.warn('Load local cache failed', e);
    }
    return JSON.parse(JSON.stringify(defaultData));
  }

  function saveLocal(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Save local cache failed', e);
    }
  }

  function getCloudUrl() {
    const data = loadLocal();
    return (data.settings && data.settings.googleSheetWebAppUrl) ? data.settings.googleSheetWebAppUrl.trim() : '';
  }

  // ส่งคำสั่งไปยัง Google Sheet Web App เบื้องหลัง (CORS friendly ด้วย text/plain)
  async function callCloud(action, payload = {}) {
    const url = getCloudUrl();
    if (!url || !url.startsWith('https://script.google.com')) return null;

    try {
      payload.action = action;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      return json;
    } catch (err) {
      console.log('Cloud call background sync info:', err);
      return null;
    }
  }

  // ซิงก์ข้อมูลทั้งหมดจาก Google Sheet ลง Local Cache (ทำให้เห็นตรงกันทุกเครื่อง)
  async function syncFromCloud(onUpdatedCallback) {
    const url = getCloudUrl();
    if (!url || !url.startsWith('https://script.google.com')) return;

    try {
      const res = await fetch(url + (url.includes('?') ? '&' : '?') + 'action=GET_ALL', {
        method: 'GET'
      });
      const result = await res.json();
      if (result && result.status === 'success' && result.data) {
        const local = loadLocal();
        const merged = Object.assign({}, local, result.data);
        // รักษาสิทธิ์และ URL ไว้
        if (local.settings && local.settings.googleSheetWebAppUrl) {
          merged.settings = merged.settings || {};
          merged.settings.googleSheetWebAppUrl = local.settings.googleSheetWebAppUrl;
        }
        saveLocal(merged);
        if (typeof onUpdatedCallback === 'function') {
          onUpdatedCallback(merged);
        }
      }
    } catch (err) {
      console.log('Cloud sync GET info:', err);
    }
  }

  // Helper ID
  function uid(prefix = 'id') {
    return prefix + '-' + Math.random().toString(36).substr(2, 9);
  }

  function orderNum() {
    const data = loadLocal();
    const count = (data.orders ? data.orders.length : 0) + 1001;
    return 'ORD-' + String(count).padStart(6, '0');
  }

  // Start background auto-sync immediately
  syncFromCloud();

  return {
    get: loadLocal,
    set: saveLocal,
    syncFromCloud: syncFromCloud,
    callCloud: callCloud,
    uid: uid,
    orderNum: orderNum,

    // Customers
    getCustomers: function () {
      return loadLocal().customers || [];
    },
    getCustomerById: function (id) {
      return (loadLocal().customers || []).find(c => c.id === id) || null;
    },
    findCustomerByNameOrCode: function (query) {
      if (!query) return null;
      const q = query.trim().toLowerCase();
      const list = loadLocal().customers || [];
      return list.find(c =>
        (c.member_code && c.member_code.toLowerCase() === q) ||
        (c.name && c.name.toLowerCase().includes(q)) ||
        (c.phone && c.phone.replace(/[^0-9]/g, '') === q.replace(/[^0-9]/g, '')) ||
        (c.line_id && c.line_id.toLowerCase() === q)
      ) || null;
    },
    saveCustomer: function (cust) {
      const data = loadLocal();
      if (!cust.id) {
        cust.id = uid('cust');
        cust.created_at = new Date().toISOString();
        cust.member_code = 'BNC-' + Math.floor(1000 + Math.random() * 9000);
        cust.total_points = cust.total_points || 0;
        cust.member_level = 'BRONZE';
        data.customers.push(cust);
      } else {
        const idx = data.customers.findIndex(c => c.id === cust.id);
        if (idx !== -1) data.customers[idx] = Object.assign({}, data.customers[idx], cust);
        else data.customers.push(cust);
      }
      saveLocal(data);
      callCloud('SAVE_CUSTOMER', { customer: cust });
      return cust;
    },

    // Groups
    getGroups: function () {
      return (loadLocal().groups || []).filter(g => g.status === 'ACTIVE');
    },
    getAllGroups: function () {
      return loadLocal().groups || [];
    },
    saveGroup: function (grp) {
      const data = loadLocal();
      if (!grp.id) {
        grp.id = uid('grp');
        grp.created_at = new Date().toISOString();
        data.groups.unshift(grp);
      } else {
        const idx = data.groups.findIndex(g => g.id === grp.id);
        if (idx !== -1) data.groups[idx] = Object.assign({}, data.groups[idx], grp);
        else data.groups.unshift(grp);
      }
      saveLocal(data);
      callCloud('SAVE_GROUP', { item: grp });
      return grp;
    },
    deleteGroup: function (id) {
      const data = loadLocal();
      data.groups = data.groups.filter(g => g.id !== id);
      saveLocal(data);
      callCloud('DELETE_GROUP', { id: id });
    },

    // Products
    getProducts: function (category) {
      let list = (loadLocal().products || []).filter(p => p.status === 'ACTIVE');
      if (category && category !== 'ALL') {
        list = list.filter(p => p.category === category);
      }
      return list;
    },
    getAllProducts: function () {
      return loadLocal().products || [];
    },
    saveProduct: function (prod) {
      const data = loadLocal();
      if (!prod.id) {
        prod.id = uid('prod');
        prod.created_at = new Date().toISOString();
        data.products.unshift(prod);
      } else {
        const idx = data.products.findIndex(p => p.id === prod.id);
        if (idx !== -1) data.products[idx] = Object.assign({}, data.products[idx], prod);
        else data.products.unshift(prod);
      }
      saveLocal(data);
      callCloud('SAVE_PRODUCT', { item: prod });
      return prod;
    },
    deleteProduct: function (id) {
      const data = loadLocal();
      data.products = data.products.filter(p => p.id !== id);
      saveLocal(data);
      callCloud('DELETE_PRODUCT', { id: id });
    },

    // Fonts
    getFonts: function (category) {
      let list = (loadLocal().fonts || []).filter(f => f.status === 'ACTIVE');
      if (category && category !== 'ALL') {
        list = list.filter(f => f.category === category);
      }
      return list;
    },
    getAllFonts: function () {
      return loadLocal().fonts || [];
    },
    saveFont: function (font) {
      const data = loadLocal();
      if (!font.id) {
        font.id = uid('font');
        font.created_at = new Date().toISOString();
        data.fonts.unshift(font);
      } else {
        const idx = data.fonts.findIndex(f => f.id === font.id);
        if (idx !== -1) data.fonts[idx] = Object.assign({}, data.fonts[idx], font);
        else data.fonts.unshift(font);
      }
      saveLocal(data);
      callCloud('SAVE_FONT', { item: font });
      return font;
    },
    deleteFont: function (id) {
      const data = loadLocal();
      data.fonts = data.fonts.filter(f => f.id !== id);
      saveLocal(data);
      callCloud('DELETE_FONT', { id: id });
    },

    // Create Order & Payment
    createOrder: function (orderInfo, paymentInfo) {
      const data = loadLocal();
      const oId = uid('ord');
      const oNum = orderNum();

      const newOrder = {
        id: oId,
        order_number: oNum,
        customer_id: orderInfo.customer_id || 'guest',
        customer_name: orderInfo.customer_name || 'ลูกค้าทั่วไป',
        order_type: orderInfo.order_type,
        item_id: orderInfo.item_id,
        item_name: orderInfo.item_name,
        amount: Number(orderInfo.amount),
        status: 'VERIFYING',
        line_id: orderInfo.line_id || '',
        gmail: orderInfo.gmail || '',
        notes: orderInfo.notes || '',
        created_at: new Date().toISOString()
      };

      const pId = uid('pay');
      const newPayment = {
        id: pId,
        order_id: oId,
        amount: Number(orderInfo.amount),
        slip_image_url: paymentInfo.slip_image_url || '',
        verification_status: 'VERIFYING',
        qr_ref: paymentInfo.qr_ref || '',
        qr_trans_ref: paymentInfo.qr_trans_ref || '',
        qr_date: paymentInfo.qr_date || '',
        verified_at: null
      };

      if (orderInfo.order_type === 'GROUP') {
        const gaId = uid('ga');
        data.group_access.unshift({
          id: gaId,
          order_id: oId,
          customer_id: newOrder.customer_id,
          customer_name: newOrder.customer_name,
          group_id: orderInfo.item_id,
          group_name: orderInfo.item_name,
          line_id: orderInfo.line_id,
          status: 'PENDING',
          completed_at: null
        });
      }

      if (orderInfo.order_type === 'PRODUCT' || orderInfo.order_type === 'FONT') {
        const daId = uid('da');
        const deliveryType = orderInfo.delivery_type || 'MANUAL';
        data.drive_access.unshift({
          id: daId,
          order_id: oId,
          customer_id: newOrder.customer_id,
          customer_name: newOrder.customer_name,
          item_id: orderInfo.item_id,
          item_name: orderInfo.item_name,
          item_type: orderInfo.order_type,
          delivery_type: deliveryType,
          gmail: orderInfo.gmail || '',
          drive_id: orderInfo.drive_folder_id || '',
          status: (deliveryType === 'GOOGLE_DRIVE') ? 'WAITING_EMAIL' : 'WAITING_ADMIN',
          completed_at: null
        });
      }

      data.orders.unshift(newOrder);
      data.payments.unshift(newPayment);
      saveLocal(data);

      // ส่งเข้า Google Sheet ทันที!
      callCloud('CREATE_ORDER', { orderInfo: orderInfo, paymentInfo: paymentInfo });

      return { order: newOrder, payment: newPayment };
    },

    getOrders: function () {
      return loadLocal().orders || [];
    },
    getOrderById: function (id) {
      return (loadLocal().orders || []).find(o => o.id === id || o.order_number === id) || null;
    },
    getPayments: function () {
      return loadLocal().payments || [];
    },
    getGroupAccessList: function () {
      return loadLocal().group_access || [];
    },
    getDriveAccessList: function () {
      return loadLocal().drive_access || [];
    },

    // Approve Payment
    approvePayment: function (paymentId) {
      const data = loadLocal();
      const pay = data.payments.find(p => p.id === paymentId);
      if (!pay) return;
      pay.verification_status = 'PAID';
      pay.verified_at = new Date().toISOString();

      const ord = data.orders.find(o => o.id === pay.order_id);
      if (ord) {
        ord.status = 'PAID';

        const points = Math.floor(ord.amount / 10);
        if (points > 0 && ord.customer_id) {
          const cust = data.customers.find(c => c.id === ord.customer_id);
          if (cust) {
            cust.total_points = (cust.total_points || 0) + points;
            if (cust.total_points >= 3000) cust.member_level = 'DIAMOND';
            else if (cust.total_points >= 1000) cust.member_level = 'GOLD';
            else if (cust.total_points >= 500) cust.member_level = 'SILVER';
            else cust.member_level = 'BRONZE';

            data.point_transactions.unshift({
              id: uid('pt'),
              customer_id: cust.id,
              amount: points,
              type: 'EARN',
              description: `ได้รับคะแนนจากคำสั่งซื้อ #${ord.order_number}`,
              order_id: ord.id,
              created_at: new Date().toISOString()
            });
          }
        }

        const da = data.drive_access.find(d => d.order_id === ord.id);
        if (da && da.delivery_type === 'GOOGLE_DRIVE' && da.gmail) {
          da.status = 'COMPLETED';
          da.completed_at = new Date().toISOString();
        }
      }
      saveLocal(data);
      callCloud('APPROVE_PAYMENT', { paymentId: paymentId });
    },

    rejectPayment: function (paymentId, reason) {
      const data = loadLocal();
      const pay = data.payments.find(p => p.id === paymentId);
      if (!pay) return;
      pay.verification_status = 'REJECTED';
      pay.verification_notes = reason || 'สลิปไม่ถูกต้องหรือยอดเงินไม่ตรง';
      pay.verified_at = new Date().toISOString();

      const ord = data.orders.find(o => o.id === pay.order_id);
      if (ord) ord.status = 'REJECTED';
      saveLocal(data);
      callCloud('REJECT_PAYMENT', { paymentId: paymentId, reason: reason });
    },

    // Group Access: "ดึงเข้ากลุ่มเรียบร้อย"
    completeGroupAccess: function (accessId) {
      const data = loadLocal();
      const ga = data.group_access.find(g => g.id === accessId);
      if (ga) {
        ga.status = 'COMPLETED';
        ga.completed_at = new Date().toISOString();
        saveLocal(data);
        callCloud('COMPLETE_GROUP_ACCESS', { accessId: accessId });
      }
    },
    failGroupAccess: function (accessId, note) {
      const data = loadLocal();
      const ga = data.group_access.find(g => g.id === accessId);
      if (ga) {
        ga.status = 'FAILED';
        ga.notes = note || '';
        saveLocal(data);
        callCloud('FAIL_GROUP_ACCESS', { accessId: accessId, note: note });
      }
    },

    // Drive Access: "ดึงเมลล์เรียบร้อย" (Manual Font / Manual Product)
    completeDriveAccess: function (accessId) {
      const data = loadLocal();
      const da = data.drive_access.find(d => d.id === accessId);
      if (da) {
        da.status = 'COMPLETED';
        da.completed_at = new Date().toISOString();
        saveLocal(data);
        callCloud('COMPLETE_DRIVE_ACCESS', { accessId: accessId });
      }
    },

    // Points
    adjustCustomerPoints: function (customerId, amount, type, description) {
      const data = loadLocal();
      const cust = data.customers.find(c => c.id === customerId);
      if (!cust) return false;

      const amt = Number(amount);
      const prevPoints = cust.total_points || 0;
      let newPoints = prevPoints;

      if (type === 'EARN' || type === 'BONUS') newPoints += amt;
      else if (type === 'REDEEM') newPoints = Math.max(0, prevPoints - amt);
      else if (type === 'ADJUST') newPoints = amt;

      cust.total_points = newPoints;
      if (newPoints >= 3000) cust.member_level = 'DIAMOND';
      else if (newPoints >= 1000) cust.member_level = 'GOLD';
      else if (newPoints >= 500) cust.member_level = 'SILVER';
      else cust.member_level = 'BRONZE';

      data.point_transactions.unshift({
        id: uid('pt'),
        customer_id: cust.id,
        amount: amt,
        type: type,
        description: description || 'ปรับคะแนนโดยแอดมิน',
        created_at: new Date().toISOString()
      });

      saveLocal(data);
      callCloud('ADJUST_POINTS', { customerId: customerId, amount: amt, type: type, description: description });
      return cust;
    },

    getPointTransactionsByCustomer: function (customerId) {
      return (loadLocal().point_transactions || []).filter(p => p.customer_id === customerId);
    },

    // Reviews
    getApprovedReviews: function () {
      return (loadLocal().reviews || []).filter(r => r.status === 'APPROVED');
    },
    getAllReviews: function () {
      return loadLocal().reviews || [];
    },
    addReview: function (rev) {
      const data = loadLocal();
      rev.id = uid('rev');
      rev.status = 'PENDING';
      rev.created_at = new Date().toISOString();
      data.reviews.unshift(rev);
      saveLocal(data);
      callCloud('ADD_REVIEW', { review: rev });
      return rev;
    },
    updateReviewStatus: function (id, status) {
      const data = loadLocal();
      const rev = data.reviews.find(r => r.id === id);
      if (rev) {
        rev.status = status;
        saveLocal(data);
        callCloud('UPDATE_REVIEW_STATUS', { id: id, status: status });
      }
    },
    deleteReview: function (id) {
      const data = loadLocal();
      data.reviews = data.reviews.filter(r => r.id !== id);
      saveLocal(data);
      callCloud('DELETE_REVIEW', { id: id });
    },

    getPortfolio: function () {
      return loadLocal().portfolio || [];
    },

    // Settings
    getSettings: function () {
      return loadLocal().settings || defaultData.settings;
    },
    saveSettings: function (newSettings) {
      const data = loadLocal();
      data.settings = Object.assign({}, data.settings, newSettings);
      saveLocal(data);
      callCloud('SAVE_SETTINGS', { settings: data.settings });
      return data.settings;
    }
  };
})();

window.Store = Store;
