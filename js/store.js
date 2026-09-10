/**
 * BNC GraphMate — Unified Data Store & Free Slip Scanner
 * รองรับทั้ง Local Storage (ทำงานได้ทันที ไม่ต้องเซ็ต Server) 
 * และเชื่อมต่อ Google Sheets Web App (ฟรี 100% ไม่เสียค่าเซิร์ฟเวอร์)
 */

const Store = (function () {
  const STORAGE_KEY = 'BNC_GRAPHMATE_DATA_V1';

  // ข้อมูลเริ่มต้นสำหรับระบบจริง
  const defaultData = {
    settings: {
      shopName: 'BNC GraphMate ร้านป้าย & กราฟิก',
      tagline: 'ป้ายสวย ฟอนต์น่ารัก กราฟิกสำเร็จรูป สไตล์น่ารักขี้เล่น',
      logoText: '🎨 BNC GraphMate',
      themeColor: '#FF2D8A',
      contactPhone: '081-234-5678',
      contactLine: '@bncgraphmate',
      lineUrl: 'https://line.me/ti/p/~bncgraphmate', // ลิงก์ LINE ร้าน
      bankName: 'ธนาคารกสิกรไทย (KBank)',
      bankAccount: '123-4-56789-0',
      bankAccountName: 'ร้าน บีเอ็นซี กราฟเมท',
      promptpayQrUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=0812345678', // ตัวอย่าง QR
      googleSheetWebAppUrl: '', // ใส่ URL ของ Google Apps Script Web App
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
        delivery_type: 'MANUAL', // TYPE B: ร้านรับมาขาย ไม่มี Drive Link แอดมินดึงเมลล์เอง
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
        status: 'COMPLETED', // COMPLETED = ดึงเข้ากลุ่มเรียบร้อย
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
        delivery_type: 'MANUAL', // TYPE B Manual
        gmail: 'ploy.design@gmail.com',
        drive_id: '',
        status: 'WAITING_ADMIN', // รอดึงเมลล์ (รอแอดมินดำเนินการ)
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
        customer_id: 'cust-demo-1',
        customer_name: 'น้องพลอย',
        product_name: 'กลุ่ม VIP ป้าย & กราฟิกสุดคิ้วท์ 2026',
        rating: 5,
        message: 'คุ้มมากกก ไฟล์เยอะจุใจ แอดมินดึงเข้ากลุ่มไวมาก งานน่ารักตรงปกสุดๆ ค่ะ แนะนำเลย 💕',
        image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&auto=format&fit=crop&q=80',
        status: 'APPROVED',
        created_at: new Date(Date.now() - 1 * 86400000).toISOString()
      },
      {
        id: 'rev-2',
        customer_id: 'cust-2',
        customer_name: 'คุณมุก คาเฟ่',
        product_name: 'BNC ขนมปังเนยสด (Butter)',
        rating: 5,
        message: 'ฟอนต์น่ารักมากก เอาไปทำป้ายร้านกาแฟ ลูกค้าชมตลอดเลยว่าป้ายน่ารัก ตัวอักษรอ่านง่าย สระไม่ลอย เยี่ยมค่ะ',
        image_url: '',
        status: 'APPROVED',
        created_at: new Date(Date.now() - 3 * 86400000).toISOString()
      }
    ],
    portfolio: [
      {
        id: 'port-1',
        title: 'ป้ายไวนิลหน้าร้าน ขนมปังปิ้งเตาถ่าน',
        category: 'ป้าย',
        description: 'ออกแบบป้ายไวนิลสีชมพูพาสเทล พร้อมภาพการ์ตูนวาดมือ',
        image_url: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&auto=format&fit=crop&q=80',
        is_featured: true
      },
      {
        id: 'port-2',
        title: 'เซ็ตสติกเกอร์ฉลากสินค้า ชานมไข่มุก',
        category: 'กราฟิก',
        description: 'สติกเกอร์กันน้ำ ไดคัทวงกลม โลโก้การ์ตูนน้องหมี',
        image_url: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=600&auto=format&fit=crop&q=80',
        is_featured: true
      },
      {
        id: 'port-3',
        title: 'ป้ายตั้งโต๊ะ สแกนจ่ายเงิน QR Code',
        category: 'ป้าย',
        description: 'ป้ายอะคริลิก มินิมอลน่ารัก ตกแต่งขอบดอกไม้',
        image_url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
        is_featured: true
      },
      {
        id: 'port-4',
        title: 'ชุดฟอนต์ลายมือ เมนูเบเกอรี่โฮมเมด',
        category: 'ฟอนต์',
        description: 'ตัวอย่างการประยุกต์ใช้ฟอนต์ BNC บนเมนูจริง',
        image_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
        is_featured: false
      }
    ]
  };

  // โหลดข้อมูล
  function load() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return Object.assign({}, defaultData, parsed);
      }
    } catch (e) {
      console.warn('Load storage failed, using default', e);
    }
    return JSON.parse(JSON.stringify(defaultData));
  }

  // บันทึกข้อมูล
  function save(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      // ซิงก์ไป Google Sheets หากตั้งค่า Web App URL ไว้
      syncToGoogleSheets(data);
    } catch (e) {
      console.error('Save storage failed', e);
    }
  }

  // ซิงก์ไป Google Sheets Web App (ถ้ามี URL)
  function syncToGoogleSheets(data) {
    const url = data.settings && data.settings.googleSheetWebAppUrl;
    if (!url || !url.startsWith('https://script.google.com')) return;
    try {
      fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'SYNC_ALL', payload: data })
      }).catch(err => console.log('Google Sheets sync background note:', err));
    } catch (err) {}
  }

  // Helper สร้าง ID
  function uid(prefix = 'id') {
    return prefix + '-' + Math.random().toString(36).substr(2, 9);
  }

  function orderNum() {
    const data = load();
    const count = (data.orders ? data.orders.length : 0) + 1001;
    return 'ORD-' + String(count).padStart(6, '0');
  }

  return {
    get: load,
    set: save,
    uid: uid,
    orderNum: orderNum,

    resetToDefault: function () {
      save(defaultData);
      return defaultData;
    },

    getCustomers: function () {
      return load().customers || [];
    },
    getCustomerById: function (id) {
      return (load().customers || []).find(c => c.id === id) || null;
    },
    findCustomerByNameOrCode: function (query) {
      if (!query) return null;
      const q = query.trim().toLowerCase();
      const list = load().customers || [];
      return list.find(c =>
        (c.member_code && c.member_code.toLowerCase() === q) ||
        (c.name && c.name.toLowerCase().includes(q)) ||
        (c.phone && c.phone.replace(/[^0-9]/g, '') === q.replace(/[^0-9]/g, '')) ||
        (c.line_id && c.line_id.toLowerCase() === q)
      ) || null;
    },
    saveCustomer: function (cust) {
      const data = load();
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
      save(data);
      return cust;
    },

    getGroups: function () {
      return (load().groups || []).filter(g => g.status === 'ACTIVE');
    },
    getAllGroups: function () {
      return load().groups || [];
    },
    saveGroup: function (grp) {
      const data = load();
      if (!grp.id) {
        grp.id = uid('grp');
        grp.created_at = new Date().toISOString();
        data.groups.unshift(grp);
      } else {
        const idx = data.groups.findIndex(g => g.id === grp.id);
        if (idx !== -1) data.groups[idx] = Object.assign({}, data.groups[idx], grp);
        else data.groups.unshift(grp);
      }
      save(data);
      return grp;
    },
    deleteGroup: function (id) {
      const data = load();
      data.groups = data.groups.filter(g => g.id !== id);
      save(data);
    },

    getProducts: function (category) {
      let list = (load().products || []).filter(p => p.status === 'ACTIVE');
      if (category && category !== 'ALL') {
        list = list.filter(p => p.category === category);
      }
      return list;
    },
    getAllProducts: function () {
      return load().products || [];
    },
    saveProduct: function (prod) {
      const data = load();
      if (!prod.id) {
        prod.id = uid('prod');
        prod.created_at = new Date().toISOString();
        data.products.unshift(prod);
      } else {
        const idx = data.products.findIndex(p => p.id === prod.id);
        if (idx !== -1) data.products[idx] = Object.assign({}, data.products[idx], prod);
        else data.products.unshift(prod);
      }
      save(data);
      return prod;
    },
    deleteProduct: function (id) {
      const data = load();
      data.products = data.products.filter(p => p.id !== id);
      save(data);
    },

    getFonts: function (category) {
      let list = (load().fonts || []).filter(f => f.status === 'ACTIVE');
      if (category && category !== 'ALL') {
        list = list.filter(f => f.category === category);
      }
      return list;
    },
    getAllFonts: function () {
      return load().fonts || [];
    },
    saveFont: function (font) {
      const data = load();
      if (!font.id) {
        font.id = uid('font');
        font.created_at = new Date().toISOString();
        data.fonts.unshift(font);
      } else {
        const idx = data.fonts.findIndex(f => f.id === font.id);
        if (idx !== -1) data.fonts[idx] = Object.assign({}, data.fonts[idx], font);
        else data.fonts.unshift(font);
      }
      save(data);
      return font;
    },
    deleteFont: function (id) {
      const data = load();
      data.fonts = data.fonts.filter(f => f.id !== id);
      save(data);
    },

    createOrder: function (orderInfo, paymentInfo) {
      const data = load();
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
          drive_id: orderInfo.drive_folder_id || orderInfo.drive_file_id || '',
          status: deliveryType === 'GOOGLE_DRIVE' ? 'WAITING_EMAIL' : 'WAITING_ADMIN',
          completed_at: null
        });
      }

      data.orders.unshift(newOrder);
      data.payments.unshift(newPayment);
      save(data);

      return { order: newOrder, payment: newPayment };
    },

    getOrders: function () {
      return load().orders || [];
    },
    getOrderById: function (id) {
      return (load().orders || []).find(o => o.id === id || o.order_number === id) || null;
    },
    getPayments: function () {
      return load().payments || [];
    },
    getGroupAccessList: function () {
      return load().group_access || [];
    },
    getDriveAccessList: function () {
      return load().drive_access || [];
    },

    approvePayment: function (paymentId) {
      const data = load();
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
      save(data);
    },

    rejectPayment: function (paymentId, reason) {
      const data = load();
      const pay = data.payments.find(p => p.id === paymentId);
      if (!pay) return;
      pay.verification_status = 'REJECTED';
      pay.verification_notes = reason || 'สลิปไม่ถูกต้องหรือยอดเงินไม่ตรง';
      pay.verified_at = new Date().toISOString();

      const ord = data.orders.find(o => o.id === pay.order_id);
      if (ord) ord.status = 'REJECTED';
      save(data);
    },

    completeGroupAccess: function (accessId) {
      const data = load();
      const ga = data.group_access.find(g => g.id === accessId);
      if (ga) {
        ga.status = 'COMPLETED';
        ga.completed_at = new Date().toISOString();
        save(data);
      }
    },
    failGroupAccess: function (accessId, note) {
      const data = load();
      const ga = data.group_access.find(g => g.id === accessId);
      if (ga) {
        ga.status = 'FAILED';
        ga.notes = note || '';
        save(data);
      }
    },

    completeDriveAccess: function (accessId) {
      const data = load();
      const da = data.drive_access.find(d => d.id === accessId);
      if (da) {
        da.status = 'COMPLETED';
        da.completed_at = new Date().toISOString();
        save(data);
      }
    },

    updateOrderGmail: function (orderId, gmail) {
      const data = load();
      const ord = data.orders.find(o => o.id === orderId);
      if (ord) ord.gmail = gmail;
      const da = data.drive_access.find(d => d.order_id === orderId);
      if (da) {
        da.gmail = gmail;
        if (da.delivery_type === 'GOOGLE_DRIVE') {
          da.status = 'COMPLETED';
          da.completed_at = new Date().toISOString();
        } else {
          da.status = 'WAITING_ADMIN';
        }
      }
      save(data);
    },

    adjustCustomerPoints: function (customerId, amount, type, description) {
      const data = load();
      const cust = data.customers.find(c => c.id === customerId);
      if (!cust) return false;

      const amt = Number(amount);
      const prevPoints = cust.total_points || 0;
      let newPoints = prevPoints;

      if (type === 'EARN' || type === 'BONUS') {
        newPoints += amt;
      } else if (type === 'REDEEM') {
        newPoints = Math.max(0, prevPoints - amt);
      } else if (type === 'ADJUST') {
        newPoints = amt;
      }

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

      save(data);
      return cust;
    },

    getPointTransactionsByCustomer: function (customerId) {
      return (load().point_transactions || []).filter(p => p.customer_id === customerId);
    },

    getApprovedReviews: function () {
      return (load().reviews || []).filter(r => r.status === 'APPROVED');
    },
    getAllReviews: function () {
      return load().reviews || [];
    },
    addReview: function (rev) {
      const data = load();
      rev.id = uid('rev');
      rev.status = 'PENDING';
      rev.created_at = new Date().toISOString();
      data.reviews.unshift(rev);
      save(data);
      return rev;
    },
    updateReviewStatus: function (id, status) {
      const data = load();
      const rev = data.reviews.find(r => r.id === id);
      if (rev) {
        rev.status = status;
        save(data);
      }
    },
    deleteReview: function (id) {
      const data = load();
      data.reviews = data.reviews.filter(r => r.id !== id);
      save(data);
    },

    getPortfolio: function () {
      return load().portfolio || [];
    },

    getSettings: function () {
      return load().settings || defaultData.settings;
    },
    saveSettings: function (newSettings) {
      const data = load();
      data.settings = Object.assign({}, data.settings, newSettings);
      save(data);
      return data.settings;
    }
  };
})();

window.Store = Store;
