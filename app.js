/**
 * BNC GraphMate — Unified Data Store (Google Sheets Cloud Database + Vercel Fast Cache)
 * ทำให้ข้อมูลตรงกันทุกเครื่อง 100% (ทั้งมือถือลูกค้า และคอมพิวเตอร์แอดมิน)
 */

const Store = (function () {
  const STORAGE_KEY = 'BNC_GRAPHMATE_DATA_V1';

  // ข้อมูลเริ่มต้นสำหรับระบบเมื่อเปิดใช้งานครั้งแรก
  const defaultData = {
    settings: {
      shopName: 'BNC GraphMate Studio',
      tagline: 'ร้านป้าย & กราฟิก สไตล์คิวท์ น่ารัก มินิมอล',
      logoText: 'BNC GraphMate',
      themeColor: '#FF6B97',
      contactPhone: '081-234-5678',
      contactLine: '@bncgraphmate',
      lineUrl: 'https://line.me/ti/p/~bncgraphmate',
      instagramUrl: 'https://instagram.com/bncgraphmate',
      facebookUrl: 'https://facebook.com/bncgraphmate',
      tiktokUrl: 'https://tiktok.com/@bncgraphmate',
      bankName: 'ธนาคารกสิกรไทย (KBank)',
      bankAccount: '123-4-56789-0',
      bankAccountName: 'ร้าน บีเอ็นซี กราฟเมท',
      promptpayQrUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=0812345678',
      googleSheetWebAppUrl: '',
      pointsPerHundredBaht: 10,
      announcement: 'ยินดีต้อนรับสู่ BNC GraphMate Studio อัปเดตผลงานและฟอนต์ใหม่ทุกสัปดาห์',
      announcementEnabled: true,
      adminPin: '123456',
      // Customizable Button & Action Labels
      btnLineText: 'ทักแชท LINE ร้าน',
      btnIgText: 'Instagram',
      btnFbText: 'Facebook',
      btnPhoneText: 'โทรติดต่อ',
      btnCartText: 'ใส่ตะกร้า',
      btnBuyText: 'สั่งซื้อเลย',
      btnPreviewText: 'ดูตัวอย่าง',
      btnCheckoutText: 'ชำระเงินทันที ➔',
      coverImage: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=1600&auto=format&fit=crop&q=80',
      profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
      shopBio: 'สตูดิโอออกแบบป้ายร้าน งานฟอนต์ลายมือ สติกเกอร์ และทรัพยากรกราฟิกพร้อมใช้\nตอบแชทไว ส่งงานเร็ว ไฟล์คมชัด 300 DPI ใช้งานเชิงพาณิชย์ได้',
      stats: {
        portfolioCount: '250+',
        fontCount: '48',
        memberCount: '1.2k',
        portfolioLabel: 'ผลงาน',
        fontLabel: 'ฟอนต์',
        memberLabel: 'สมาชิก'
      },
      pointsBarIcon: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
      highlights: [
        { id: 'hl-1', title: 'รีวิวร้าน', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=300&auto=format&fit=crop&q=80', link: '#reviews' },
        { id: 'hl-2', title: 'ฟอนต์ใหม่', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&auto=format&fit=crop&q=80', link: '#fonts' },
        { id: 'hl-3', title: 'เข้ากลุ่ม VIP', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&auto=format&fit=crop&q=80', link: '#groups' },
        { id: 'hl-4', title: 'สินค้าสำเร็จ', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&auto=format&fit=crop&q=80', link: '#products' },
        { id: 'hl-5', title: 'ดูผลงาน', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=300&auto=format&fit=crop&q=80', link: '#portfolio' },
        { id: 'hl-6', title: 'สะสมแต้ม', image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&auto=format&fit=crop&q=80', link: '#points' }
      ]
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
        category: 'VIP ตลอดชีพ',
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
        category: 'การ์ตูน & คาแรกเตอร์',
        description: 'เน้นงานการ์ตูนเด็ก คาแรคเตอร์น่ารัก สำหรับทำป้ายร้านอาหาร ขนม เบเกอรี่',
        cover_image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80',
        price: 250,
        preview_drive_url: 'https://drive.google.com/',
        benefits: 'การ์ตูนวาดมือความละเอียดสูง 300 DPI\nพาเลทสีและเทมเพลตแต่งร้าน\nใช้งานได้ทั้งส่วนตัวและเชิงพาณิชย์',
        status: 'ACTIVE',
        created_at: new Date(Date.now() - 10 * 86400000).toISOString()
      },
      {
        id: 'grp-3',
        name: 'กลุ่มป้ายสำเร็จ & ไฟล์ไดคัท 300 DPI',
        category: 'ไฟล์ตกแต่ง & ป้าย',
        description: 'ไฟล์กราฟิกความละเอียดสูงสำหรับงานพิมพ์ป้ายโดยเฉพาะ',
        cover_image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&auto=format&fit=crop&q=80',
        price: 290,
        preview_drive_url: 'https://drive.google.com/',
        benefits: 'ไฟล์ป้ายพร้อมสกรีน/พิมพ์ไวนิล\nแก้ไขข้อความและราคาได้ง่าย\nอัปเดตไฟล์เทศกาลตลอดทั้งปี',
        status: 'ACTIVE',
        created_at: new Date(Date.now() - 5 * 86400000).toISOString()
      },
      {
        id: 'grp-4',
        name: 'กลุ่มฟอนต์ลายมือเชิงพาณิชย์ Font Club',
        category: 'ฟอนต์',
        description: 'รวมฟอนต์น่ารัก ลิขสิทธิ์แท้ ใช้ทำป้าย โฆษณา และสินค้าได้ไม่จำกัด',
        cover_image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
        price: 350,
        preview_drive_url: 'https://drive.google.com/',
        benefits: 'ดาวน์โหลดไฟล์ฟอนต์ OTF/TTF ติดตั้งได้ทันที\nใช้ได้ทั้ง iOS, Android, Windows, Mac\nมีใบรับรองสิทธิ์การใช้งานเชิงพาณิชย์',
        status: 'ACTIVE',
        created_at: new Date(Date.now() - 2 * 86400000).toISOString()
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
        preview_text: 'ยินดีต้อนรับ สั่งซื้อสินค้าได้ที่นี่เลยนะคะ',
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
        description: 'แต้มต้อนรับสมาชิก BNC GraphMate',
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
        message: 'คุ้มค่ามาก ไฟล์เยอะจุใจ แอดมินดึงเข้ากลุ่มไวมาก งานน่ารักตรงปก แนะนำเลยค่ะ',
        image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&auto=format&fit=crop&q=80',
        status: 'APPROVED',
        created_at: new Date(Date.now() - 1 * 86400000).toISOString()
      }
    ],
    portfolio: [
      {
        id: 'port-1',
        title: 'เซ็ตป้ายร้านคาเฟ่ & ขนมหวาน โทนพาสเทล',
        style_category: 'ป้ายคาเฟ่ & เบเกอรี่',
        price: '390',
        description: 'งานออกแบบป้ายไวนิลหน้าร้าน ป้ายเมนูตั้งโต๊ะ และป้ายธงญี่ปุ่น สไตล์หวานละมุน นุ่มตา',
        cover_image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=700&auto=format&fit=crop&q=80',
        images: [
          'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1000&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1000&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000&auto=format&fit=crop&q=80'
        ]
      },
      {
        id: 'port-2',
        title: 'ป้ายร้านอาหาร & เมนูเครื่องดื่ม สไตล์โมเดิร์น',
        style_category: 'ป้ายร้านอาหาร',
        price: '450',
        description: 'จัดเลย์เอาต์เมนูชัดเจน จัดวางภาพอาหารชวนทาน พร้อมไฟล์คมชัดสูงพิมพ์ได้ทันที',
        cover_image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=700&auto=format&fit=crop&q=80',
        images: [
          'https://images.unsplash.com/photo-1541643600914-78b084683601?w=1000&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=1000&auto=format&fit=crop&q=80'
        ]
      },
      {
        id: 'port-3',
        title: 'การ์ตูนมาสคอต & สติกเกอร์ฉลากสินค้า',
        style_category: 'การ์ตูน & โลโก้',
        price: '590',
        description: 'วาดคาแรคเตอร์ประจำร้าน โดดเด่น จำง่าย นำไปใช้สกรีนแก้วและทำป้ายได้ทุกขนาด',
        cover_image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=700&auto=format&fit=crop&q=80',
        images: [
          'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1000&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80'
        ]
      }
    ]
  };

  // ดึงข้อมูลจาก Local Cache ทันที (เพื่อให้เว็บโหลดเร็ว 0.01 วินาที)
  function loadLocal() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const merged = Object.assign({}, defaultData, parsed);
        merged.settings = Object.assign({}, defaultData.settings, parsed.settings || {});
        if (!merged.portfolio || merged.portfolio.length === 0) {
          merged.portfolio = defaultData.portfolio;
        }
        if (!merged.groups || merged.groups.length < 3) {
          merged.groups = defaultData.groups;
        }
        if (merged.settings) {
          if (!merged.settings.profileImage || merged.settings.profileImage.includes('photo-1534528741775-53994a69daeb')) {
            merged.settings.profileImage = defaultData.settings.profileImage;
          }
          if (!merged.settings.pointsBarIcon || merged.settings.pointsBarIcon.includes('photo-1534528741775-53994a69daeb')) {
            merged.settings.pointsBarIcon = defaultData.settings.pointsBarIcon;
          }
        }
        return merged;
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

    // Portfolio
    getPortfolio: function () {
      const p = loadLocal().portfolio;
      return (p && p.length > 0) ? p : defaultData.portfolio;
    },
    savePortfolioItem: function (item) {
      const data = loadLocal();
      data.portfolio = data.portfolio || [];
      if (!item.id) {
        item.id = uid('port');
        item.created_at = new Date().toISOString();
        data.portfolio.unshift(item);
      } else {
        const idx = data.portfolio.findIndex(p => p.id === item.id);
        if (idx !== -1) data.portfolio[idx] = Object.assign({}, data.portfolio[idx], item);
        else data.portfolio.unshift(item);
      }
      saveLocal(data);
      callCloud('SAVE_PORTFOLIO', { item: item });
      return item;
    },
    deletePortfolioItem: function (id) {
      const data = loadLocal();
      data.portfolio = (data.portfolio || []).filter(p => p.id !== id);
      saveLocal(data);
      callCloud('DELETE_PORTFOLIO', { id: id });
    },

    // Cart System (Multi-item order for Fonts & Products)
    getCart: function () {
      try {
        const c = localStorage.getItem('BNC_CART_V1');
        return c ? JSON.parse(c) : [];
      } catch (e) {
        return [];
      }
    },
    saveCart: function (cartItems) {
      try {
        localStorage.setItem('BNC_CART_V1', JSON.stringify(cartItems));
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('cart-updated', { detail: { cart: cartItems } }));
        }
      } catch (e) {}
    },
    addToCart: function (item) {
      const cart = this.getCart();
      const exists = cart.find(i => i.id === item.id);
      if (!exists) {
        cart.push(item);
        this.saveCart(cart);
      }
      return cart;
    },
    removeFromCart: function (itemId) {
      let cart = this.getCart();
      cart = cart.filter(i => i.id !== itemId);
      this.saveCart(cart);
      return cart;
    },
    clearCart: function () {
      this.saveCart([]);
    },
    checkoutMultiItems: function (items, customerInfo, paymentInfo) {
      const data = loadLocal();
      const oId = uid('ord');
      const oNum = orderNum();
      const totalAmount = items.reduce((sum, i) => sum + (Number(i.price) || 0), 0);
      const itemNames = items.map(i => i.name).join(', ');

      const newOrder = {
        id: oId,
        order_number: oNum,
        customer_id: customerInfo.customer_id || 'guest',
        customer_name: customerInfo.customer_name || 'ลูกค้าทั่วไป',
        order_type: 'MULTI',
        items: items,
        item_name: itemNames,
        amount: totalAmount,
        status: 'VERIFYING',
        line_id: customerInfo.line_id || '',
        gmail: customerInfo.gmail || '',
        notes: customerInfo.notes || '',
        created_at: new Date().toISOString()
      };

      const pId = uid('pay');
      const newPayment = {
        id: pId,
        order_id: oId,
        amount: totalAmount,
        slip_image_url: paymentInfo.slip_image_url || '',
        verification_status: 'VERIFYING',
        qr_ref: paymentInfo.qr_ref || '',
        qr_trans_ref: paymentInfo.qr_trans_ref || '',
        qr_date: paymentInfo.qr_date || '',
        verified_at: null
      };

      // Create drive access for each item
      items.forEach(item => {
        data.drive_access.unshift({
          id: uid('da'),
          order_id: oId,
          customer_id: newOrder.customer_id,
          customer_name: newOrder.customer_name,
          item_id: item.id,
          item_name: item.name,
          item_type: item.type || 'FONT',
          delivery_type: item.delivery_type || 'MANUAL',
          gmail: customerInfo.gmail || '',
          drive_id: item.drive_folder_id || '',
          status: (item.delivery_type === 'GOOGLE_DRIVE') ? 'WAITING_EMAIL' : 'WAITING_ADMIN',
          completed_at: null
        });
      });

      data.orders.unshift(newOrder);
      data.payments.unshift(newPayment);
      saveLocal(data);
      this.clearCart();

      callCloud('CREATE_ORDER', { orderInfo: newOrder, paymentInfo: newPayment });
      return { order: newOrder, payment: newPayment };
    },

    // Settings
    getSettings: function () {
      const local = loadLocal();
      return Object.assign({}, defaultData.settings, local.settings || {});
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


/**
 * BNC GraphMate — Unified Application Controller (SPA Architecture)
 * Inspired by BNC HayMate's clean, reliable, single-file architecture
 * 100% Configurable, Zero Fake Buttons, Zero 404s on Vercel
 */

(function () {
  'use strict';

  // Application State
  const state = {
    view: 'home',             // 'home' | 'fonts' | 'products' | 'groups' | 'portfolio' | 'points' | 'reviews' | 'orders' | 'admin'
    adminTab: 'dashboard',    // 'dashboard' | 'orders' | 'slips' | 'products' | 'fonts' | 'groups' | 'settings'
    isAdmin: false,
    fontTester: {
      text: 'ร้านป้ายบีเอ็นซี ฟอนต์ลายมือน่ารัก 1234',
      size: 38,
      category: 'ALL',
      search: '',
      compare: []
    },
    prodFilter: {
      category: 'ALL',
      search: ''
    },
    portfolioFilter: 'ALL',
    activeStoryIndex: 0,
    lightboxImage: null,
    searchPointsQuery: ''
  };

  // Helper DOM selectors
  const $ = id => document.getElementById(id);
  const escapeHTML = str => {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  // ── Application Initialization ────────────────────────────────
  function initApp() {
    setupRouting();
    setupCartDrawer();
    setupModals();
    renderNavbar();
    renderCurrentView();

    // Listen to store updates (sync from Google Sheets)
    window.addEventListener('storage', () => {
      renderCurrentView();
      updateCartBadge();
    });

    // Initial background sync from Google Sheets if configured
    if (typeof Store !== 'undefined' && Store.syncFromCloud) {
      Store.syncFromCloud(() => {
        renderCurrentView();
      });
    }
  }

  // ── Router Setup (Hash Navigation) ───────────────────────────
  function setupRouting() {
    window.addEventListener('hashchange', handleHash);
    handleHash();
  }

  function handleHash() {
    const hash = window.location.hash.replace('#', '') || 'home';
    const parts = hash.split('/');
    const view = parts[0] || 'home';

    if (view === 'admin') {
      state.view = 'admin';
      state.adminTab = parts[1] || 'dashboard';
    } else {
      state.view = view;
    }

    renderNavbar();
    renderCurrentView();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  window.navigate = function (view, subTab) {
    if (subTab) {
      window.location.hash = `${view}/${subTab}`;
    } else {
      window.location.hash = view;
    }
  };

  // ── Navbar Renderer ──────────────────────────────────────────
  function renderNavbar() {
    const s = Store.getSettings();
    const navEl = $('mainNavbar');
    if (!navEl) return;

    navEl.innerHTML = `
      ${s.announcementEnabled && s.announcement ? `
        <div class="announcement-bar">
          <span>📢</span>
          <span>${escapeHTML(s.announcement)}</span>
        </div>
      ` : ''}
      <div class="container navbar__inner">
        <a href="#home" class="brand-link">
          <span>🎨</span>
          <span>${escapeHTML(s.shopName || 'BNC GraphMate')}</span>
        </a>

        <nav class="navbar__nav" id="navbarMenu">
          <a href="#home" class="nav-link ${state.view === 'home' ? 'active' : ''}">หน้าแรก</a>
          <a href="#fonts" class="nav-link ${state.view === 'fonts' ? 'active' : ''}">ฟอนต์</a>
          <a href="#products" class="nav-link ${state.view === 'products' ? 'active' : ''}">สินค้าสำเร็จ</a>
          <a href="#groups" class="nav-link ${state.view === 'groups' ? 'active' : ''}">เข้ากลุ่ม VIP</a>
          <a href="#portfolio" class="nav-link ${state.view === 'portfolio' ? 'active' : ''}">ผลงาน</a>
          <a href="#points" class="nav-link ${state.view === 'points' ? 'active' : ''}">สะสมแต้ม</a>
          <a href="#reviews" class="nav-link ${state.view === 'reviews' ? 'active' : ''}">รีวิว</a>
          <a href="#orders" class="nav-link ${state.view === 'orders' ? 'active' : ''}">สถานะออเดอร์</a>
          
          <a href="#admin" class="nav-admin-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
            ${state.isAdmin ? 'แอดมิน (ออนไลน์)' : 'หลังบ้าน'}
          </a>
        </nav>

        <button class="hamburger-btn" onclick="toggleMobileNav()" aria-label="เปิดเมนู">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
      </div>
    `;
  }

  window.toggleMobileNav = function () {
    const menu = $('navbarMenu');
    if (menu) menu.classList.toggle('is-open');
  };

  // ── Master View Switcher ─────────────────────────────────────
  function renderCurrentView() {
    const pageEl = $('pageContent');
    if (!pageEl) return;

    switch (state.view) {
      case 'home':
        renderHomeView(pageEl);
        break;
      case 'fonts':
        renderFontsView(pageEl);
        break;
      case 'products':
        renderProductsView(pageEl);
        break;
      case 'groups':
        renderGroupsView(pageEl);
        break;
      case 'portfolio':
        renderPortfolioView(pageEl);
        break;
      case 'points':
        renderPointsView(pageEl);
        break;
      case 'reviews':
        renderReviewsView(pageEl);
        break;
      case 'orders':
        renderOrdersView(pageEl);
        break;
      case 'admin':
        renderAdminView(pageEl);
        break;
      default:
        renderHomeView(pageEl);
    }

    updateCartBadge();
  }

  // ============================================================
  // VIEW: HOME (Facebook Cover + Instagram Profile Layout)
  // ============================================================
  function renderHomeView(container) {
    const s = Store.getSettings();
    const stats = s.stats || {};
    const highlights = Array.isArray(s.highlights) ? s.highlights : [];
    const featuredProds = Store.getAllProducts().slice(0, 4);
    const featuredFonts = Store.getAllFonts().slice(0, 3);
    const featuredGroups = Store.getAllGroups().slice(0, 2);

    container.innerHTML = `
      <!-- Profile Header -->
      <section style="background-color: var(--surface-alt); padding: 1.5rem 0 2.5rem; border-bottom: 1px solid var(--border-light);">
        <div class="container">
          
          <!-- Facebook-style Cover Banner -->
          <div class="fb-cover-banner">
            <img src="${escapeHTML(s.coverImage || 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=1600')}" class="fb-cover-img" alt="Cover Banner">
          </div>

          <!-- Profile Info Row -->
          <div class="ig-profile-section">
            <div class="ig-profile-header">
              
              <!-- Avatar Circle (Clean White Border, No Aura) -->
              <div class="ig-avatar-wrapper" onclick="openStoryModal(0)" style="cursor: pointer;" title="คลิกเพื่อดูสตอรี่ไฮไลท์">
                <img src="${escapeHTML(s.profileImage || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400')}" class="ig-avatar-img" alt="Studio Avatar">
              </div>

              <!-- Shop Info (Safely positioned on clean surface below cover) -->
              <div class="ig-info">
                <div class="ig-name-row">
                  <h1 class="ig-shop-title">${escapeHTML(s.shopName || 'BNC GraphMate Studio')}</h1>
                  <span style="color: var(--primary); display: inline-flex;" title="Official Studio">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                  </span>
                  <span class="badge badge--pink">${escapeHTML(s.tagline || 'Graphic & Font Studio')}</span>
                </div>

                <!-- Stats Pills -->
                <div class="ig-stats-row">
                  <div class="ig-stat-item"><strong>${escapeHTML(stats.portfolioCount || '250+')}</strong> ${escapeHTML(stats.portfolioLabel || 'ผลงาน')}</div>
                  <div class="ig-stat-item"><strong>${escapeHTML(stats.fontCount || '48')}</strong> ${escapeHTML(stats.fontLabel || 'ฟอนต์')}</div>
                  <div class="ig-stat-item"><strong>${escapeHTML(stats.memberCount || '1.2k')}</strong> ${escapeHTML(stats.memberLabel || 'สมาชิก')}</div>
                </div>

                <!-- Bio -->
                <p class="ig-bio-text">${escapeHTML(s.shopBio || 'สตูดิโอออกแบบป้ายร้าน งานฟอนต์ลายมือ สติกเกอร์ และทรัพยากรกราฟิกพร้อมใช้')}</p>

                <!-- Customizable Action Buttons -->
                <div class="ig-actions-row">
                  <a href="${escapeHTML(s.lineUrl || 'https://line.me/ti/p/~bncgraphmate')}" target="_blank" class="btn btn-primary btn-sm">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    ${escapeHTML(s.btnLineText || 'ทักแชท LINE ร้าน')}
                  </a>
                  <a href="${escapeHTML(s.instagramUrl || 'https://instagram.com/bncgraphmate')}" target="_blank" class="btn btn-secondary btn-sm">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                    ${escapeHTML(s.btnIgText || 'Instagram')}
                  </a>
                  <a href="${escapeHTML(s.facebookUrl || 'https://facebook.com/bncgraphmate')}" target="_blank" class="btn btn-secondary btn-sm">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                    ${escapeHTML(s.btnFbText || 'Facebook')}
                  </a>
                  <a href="tel:${escapeHTML(s.contactPhone || '0812345678')}" class="btn btn-outline btn-sm">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    ${escapeHTML(s.btnPhoneText || 'โทรติดต่อ')}
                  </a>
                </div>
              </div>
            </div>

            <!-- Story Highlights Bar -->
            ${highlights.length > 0 ? `
              <div style="border-top: 1px solid var(--border-light); margin-top: 1.75rem; padding-top: 1rem;">
                <div style="font-size: 0.82rem; font-weight: 600; color: var(--text-muted); margin-bottom: 0.65rem; text-transform: uppercase; letter-spacing: 0.04em;">
                  ไฮไลท์เรื่องราว & บริการ
                </div>
                <div class="story-highlights-bar">
                  ${highlights.map((h, idx) => `
                    <div class="story-highlight-item" onclick="openStoryModal(${idx})">
                      <div class="story-ring">
                        <img src="${escapeHTML(h.image || h.img || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=300')}" class="story-inner-img" alt="${escapeHTML(h.title)}">
                      </div>
                      <span class="story-label">${escapeHTML(h.title)}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

          </div>
        </div>
      </section>

      <!-- VIP LINE Groups Section -->
      <section style="padding: 3.5rem 0;">
        <div class="container">
          <div class="section-header">
            <span class="section-tag">LINE VIP Groups</span>
            <h2 class="section-title">กลุ่ม VIP รวมไฟล์กราฟิก & ป้าย</h2>
            <p class="section-desc">สมัครครั้งเดียวเข้ากลุ่มถาวร อัปเดตไฟล์ป้าย การ์ตูน และฟอนต์ใหม่สม่ำเสมอ แอดมินดูแลดึงเข้ากลุ่มเองค่ะ</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${featuredGroups.map(g => renderGroupCard(g, s)).join('')}
          </div>
          
          <div style="text-align: center; margin-top: 2rem;">
            <a href="#groups" class="btn btn-outline">ดูกลุ่ม LINE ทั้งหมด ➔</a>
          </div>
        </div>
      </section>

      <!-- Featured Fonts Section -->
      <section style="padding: 3.5rem 0; background-color: var(--surface-alt);">
        <div class="container">
          <div class="section-header">
            <span class="section-tag">Popular Fonts</span>
            <h2 class="section-title">ฟอนต์ลายมือยอดนิยม</h2>
            <p class="section-desc">ฟอนต์ลิขสิทธิ์แท้ ใช้งานเชิงพาณิชย์ได้ รองรับทั้งภาษาไทยและอังกฤษ</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            ${featuredFonts.map(f => renderFontCard(f, s)).join('')}
          </div>

          <div style="text-align: center; margin-top: 2rem;">
            <a href="#fonts" class="btn btn-primary">ทดสอบและดูฟอนต์ทั้งหมด ➔</a>
          </div>
        </div>
      </section>

      <!-- Featured Digital Products -->
      <section style="padding: 3.5rem 0;">
        <div class="container">
          <div class="section-header">
            <span class="section-tag">Digital Assets</span>
            <h2 class="section-title">สินค้ากราฟิกสำเร็จรูป</h2>
            <p class="section-desc">ไฟล์ป้ายสำเร็จ ไฟล์ตกแต่งสติกเกอร์ คมชัด 300 DPI พร้อมใช้งาน</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            ${featuredProds.map(p => renderProductCard(p, s)).join('')}
          </div>

          <div style="text-align: center; margin-top: 2rem;">
            <a href="#products" class="btn btn-outline">ดูสินค้าทั้งหมด ➔</a>
          </div>
        </div>
      </section>
    `;
  }

  // ============================================================
  // VIEW: FONTS (Live Tester + Compare + Add to Cart)
  // ============================================================
  function renderFontsView(container) {
    const s = Store.getSettings();
    const fonts = Store.getAllFonts();
    const categories = ['ALL', 'ลายมือ', 'หัวป้าย', 'ตัวพิมพ์', 'น่ารัก'];

    // Filter
    const filtered = fonts.filter(f => {
      const matchCat = state.fontTester.category === 'ALL' || f.category === state.fontTester.category;
      const matchSearch = !state.fontTester.search || f.name.toLowerCase().includes(state.fontTester.search.toLowerCase());
      return matchCat && matchSearch;
    });

    container.innerHTML = `
      <section style="padding: 2.5rem 0 4rem;">
        <div class="container">
          
          <div class="section-header">
            <span class="section-tag">Interactive Font Tester</span>
            <h2 class="section-title">ทดสอบฟอนต์ลายมือสด</h2>
            <p class="section-desc">พิมพ์ข้อความและปรับขนาดตัวอักษรเพื่อดูตัวอย่างจริงก่อนตัดสินใจสั่งซื้อ</p>
          </div>

          <!-- Font Tester Control Box -->
          <div class="font-tester-box">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4" style="align-items: center;">
              <div style="grid-column: span 2;">
                <label class="form-label">พิมพ์ข้อความทดสอบที่นี่</label>
                <input type="text" id="fontTesterInput" class="form-input" value="${escapeHTML(state.fontTester.text)}" placeholder="พิมพ์ข้อความทดสอบ..." oninput="handleTesterTextInput(this.value)">
              </div>
              <div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
                  <label class="form-label" style="margin: 0;">ขนาดตัวอักษร</label>
                  <span style="font-weight: 700; color: var(--primary-deep);" id="fontSizeDisplay">${state.fontTester.size}px</span>
                </div>
                <input type="range" min="18" max="80" value="${state.fontTester.size}" class="form-input" style="padding: 0.2rem; cursor: pointer;" oninput="handleTesterSizeInput(this.value)">
              </div>
            </div>
          </div>

          <!-- Category Filters & Search -->
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 2rem;">
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              ${categories.map(c => `
                <button type="button" class="btn ${state.fontTester.category === c ? 'btn-primary' : 'btn-outline'} btn-sm" onclick="filterFontCat('${c}')">
                  ${c === 'ALL' ? 'ทั้งหมด' : c}
                </button>
              `).join('')}
            </div>
            <div style="min-width: 240px;">
              <input type="text" class="form-input" placeholder="🔍 ค้นหาชื่อฟอนต์..." value="${escapeHTML(state.fontTester.search)}" oninput="handleFontSearch(this.value)" style="padding: 0.45rem 0.85rem; font-size: 0.9rem;">
            </div>
          </div>

          <!-- Fonts Grid -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            ${filtered.length > 0 ? filtered.map(f => renderFontCard(f, s)).join('') : `
              <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
                <h4>ไม่พบฟอนต์ที่ค้นหา</h4>
                <p>ลองเปลี่ยนคำค้นหาหรือเลือกหมวดหมู่อื่นดูนะคะ</p>
              </div>
            `}
          </div>

        </div>
      </section>
    `;
  }

  window.handleTesterTextInput = function (val) {
    state.fontTester.text = val;
    document.querySelectorAll('.font-preview-text').forEach(el => {
      el.textContent = val || 'ร้านป้ายบีเอ็นซี น่ารักสดใส';
    });
  };

  window.handleTesterSizeInput = function (val) {
    state.fontTester.size = val;
    const disp = $('fontSizeDisplay');
    if (disp) disp.textContent = val + 'px';
    document.querySelectorAll('.font-preview-text').forEach(el => {
      el.style.fontSize = val + 'px';
    });
  };

  window.filterFontCat = function (cat) {
    state.fontTester.category = cat;
    renderCurrentView();
  };

  window.handleFontSearch = function (q) {
    state.fontTester.search = q;
    renderCurrentView();
  };

  // ============================================================
  // VIEW: PRODUCTS (Digital Assets Catalog + Add to Cart)
  // ============================================================
  function renderProductsView(container) {
    const s = Store.getSettings();
    const prods = Store.getAllProducts();
    const categories = ['ALL', 'ป้ายสำเร็จ', 'ไฟล์ตกแต่ง', 'Cartoon', 'Elements', 'Template', 'Graphic'];

    const filtered = prods.filter(p => {
      const matchCat = state.prodFilter.category === 'ALL' || p.category === state.prodFilter.category;
      const matchSearch = !state.prodFilter.search || p.name.toLowerCase().includes(state.prodFilter.search.toLowerCase());
      return matchCat && matchSearch;
    });

    container.innerHTML = `
      <section style="padding: 2.5rem 0 4rem;">
        <div class="container">
          <div class="section-header">
            <span class="section-tag">Digital Catalog</span>
            <h2 class="section-title">สินค้ากราฟิกสำเร็จรูป</h2>
            <p class="section-desc">ไฟล์คุณภาพสูง คมชัด 300 DPI ส่งมอบผ่าน Google Drive ทันทีหลังยืนยันการชำระเงิน</p>
          </div>

          <!-- Category Filters & Search -->
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 2rem;">
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              ${categories.map(c => `
                <button type="button" class="btn ${state.prodFilter.category === c ? 'btn-primary' : 'btn-outline'} btn-sm" onclick="filterProdCat('${c}')">
                  ${c === 'ALL' ? 'ทั้งหมด' : c}
                </button>
              `).join('')}
            </div>
            <div style="min-width: 240px;">
              <input type="text" class="form-input" placeholder="🔍 ค้นหาสินค้า..." value="${escapeHTML(state.prodFilter.search)}" oninput="handleProdSearch(this.value)" style="padding: 0.45rem 0.85rem; font-size: 0.9rem;">
            </div>
          </div>

          <!-- Products Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            ${filtered.length > 0 ? filtered.map(p => renderProductCard(p, s)).join('') : `
              <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
                <h4>ไม่พบสินค้าที่ค้นหา</h4>
                <p>ลองเปลี่ยนคำค้นหาหรือเลือกหมวดหมู่อื่นดูนะคะ</p>
              </div>
            `}
          </div>
        </div>
      </section>
    `;
  }

  window.filterProdCat = function (cat) {
    state.prodFilter.category = cat;
    renderCurrentView();
  };

  window.handleProdSearch = function (q) {
    state.prodFilter.search = q;
    renderCurrentView();
  };

  // ============================================================
  // VIEW: GROUPS (VIP LINE Groups)
  // ============================================================
  function renderGroupsView(container) {
    const s = Store.getSettings();
    const groups = Store.getAllGroups();

    container.innerHTML = `
      <section style="padding: 2.5rem 0 4rem;">
        <div class="container">
          <div class="section-header">
            <span class="section-tag">VIP Community</span>
            <h2 class="section-title">เข้ากลุ่ม LINE VIP รวมทรัพยากร</h2>
            <p class="section-desc">จ่ายครั้งเดียวเข้ากลุ่มถาวร พร้อมรับการอัปเดตไฟล์ใหม่ตลอดอายุสมาชิก</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${groups.map(g => renderGroupCard(g, s)).join('')}
          </div>
        </div>
      </section>
    `;
  }

  // ============================================================
  // VIEW: PORTFOLIO (Gallery with Lightbox)
  // ============================================================
  function renderPortfolioView(container) {
    const portfolio = Store.getPortfolio();
    const categories = ['ALL', 'ป้ายร้าน', 'ฟอนต์', 'กราฟิก', 'การ์ตูน'];

    const filtered = portfolio.filter(item => {
      return state.portfolioFilter === 'ALL' || item.category === state.portfolioFilter;
    });

    container.innerHTML = `
      <section style="padding: 2.5rem 0 4rem;">
        <div class="container">
          <div class="section-header">
            <span class="section-tag">Our Works</span>
            <h2 class="section-title">แกลเลอรีผลงานที่ผ่านมา</h2>
            <p class="section-desc">ตัวอย่างผลงานออกแบบป้าย ฟอนต์ และกราฟิกจริงที่ลูกค้าไว้วางใจ</p>
          </div>

          <!-- Category Filter -->
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; justify-content: center; margin-bottom: 2.5rem;">
            ${categories.map(c => `
              <button type="button" class="btn ${state.portfolioFilter === c ? 'btn-primary' : 'btn-outline'} btn-sm" onclick="filterPortfolioCat('${c}')">
                ${c === 'ALL' ? 'ทั้งหมด' : c}
              </button>
            `).join('')}
          </div>

          <!-- Portfolio Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            ${filtered.map(item => `
              <div class="card" style="padding: 0; overflow: hidden; cursor: pointer;" onclick="openLightbox('${escapeHTML(item.image_url)}')">
                <img src="${escapeHTML(item.image_url)}" style="width: 100%; height: 260px; object-fit: cover; display: block;" alt="${escapeHTML(item.title)}">
                <div style="padding: 1rem 1.25rem;">
                  <span class="badge badge--pink" style="margin-bottom: 0.35rem;">${escapeHTML(item.category || 'ผลงาน')}</span>
                  <h4 style="font-size: 1.05rem; margin: 0;">${escapeHTML(item.title)}</h4>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  window.filterPortfolioCat = function (cat) {
    state.portfolioFilter = cat;
    renderCurrentView();
  };

  window.openLightbox = function (imgUrl) {
    state.lightboxImage = imgUrl;
    const modal = $('lightboxModal');
    const imgEl = $('lightboxImg');
    if (modal && imgEl) {
      imgEl.src = imgUrl;
      modal.classList.add('is-active');
    }
  };

  // ============================================================
  // VIEW: POINTS (Member Points Lookup & Tier Progress)
  // ============================================================
  function renderPointsView(container) {
    let customer = null;
    if (state.searchPointsQuery) {
      const customers = Store.getCustomers();
      customer = customers.find(c =>
        (c.name && c.name.toLowerCase().includes(state.searchPointsQuery.toLowerCase())) ||
        (c.member_code && c.member_code.toLowerCase().includes(state.searchPointsQuery.toLowerCase())) ||
        (c.line_id && c.line_id.toLowerCase().includes(state.searchPointsQuery.toLowerCase()))
      );
    }

    container.innerHTML = `
      <section style="padding: 2.5rem 0 4rem;">
        <div class="container" style="max-width: 760px;">
          <div class="section-header">
            <span class="section-tag">Rewards & Member Club</span>
            <h2 class="section-title">ตรวจสอบคะแนนสะสม BNC Club</h2>
            <p class="section-desc">กรอกชื่อ หรือรหัสสมาชิก เพื่อเช็กแต้มสะสมและสิทธิประโยชน์ VIP ของคุณ</p>
          </div>

          <!-- Search Card -->
          <div class="card" style="margin-bottom: 2rem; text-align: center; padding: 2rem;">
            <div style="display: flex; gap: 0.5rem; max-width: 500px; margin: 0 auto 0.5rem;">
              <input type="text" id="pointsSearchInput" class="form-input" placeholder="กรอกชื่อ หรือรหัสสมาชิก เช่น BNC-8899" value="${escapeHTML(state.searchPointsQuery)}">
              <button type="button" class="btn btn-primary" onclick="searchPoints()">ค้นหา</button>
            </div>
            <small style="color: var(--text-muted);">*ชื่อที่ใช้สั่งซื้อหรือรหัสสมาชิกที่ได้รับจากร้านค้า</small>
          </div>

          <!-- Results -->
          ${customer ? `
            <div class="card" style="margin-bottom: 2rem; border-color: var(--primary-soft);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <div>
                  <h3 style="margin: 0 0 0.25rem;">คุณ ${escapeHTML(customer.name)}</h3>
                  <span class="badge badge--pink">รหัส: ${escapeHTML(customer.member_code)}</span>
                </div>
                <div style="text-align: right;">
                  <span style="font-size: 0.82rem; color: var(--text-muted); display: block;">คะแนนสะสมทั้งหมด</span>
                  <span style="font-family: var(--font-heading); font-size: 2rem; font-weight: 700; color: var(--primary-deep);">${customer.total_points || 0} แต้ม</span>
                </div>
              </div>

              <!-- Tier Progress -->
              <div style="background: var(--surface-alt); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1.25rem;">
                <div style="display: flex; justify-content: space-between; font-size: 0.88rem; font-weight: 600; margin-bottom: 0.4rem;">
                  <span>ระดับปัจจุบัน: <strong style="color: var(--primary);">${escapeHTML(customer.member_level || 'BRONZE')}</strong></span>
                  <span>เป้าหมายขั้นถัดไป: 1,000 แต้ม (GOLD)</span>
                </div>
                <div style="height: 10px; background: #ffffff; border-radius: 999px; overflow: hidden; border: 1px solid var(--border-light);">
                  <div style="width: ${Math.min(100, ((customer.total_points || 0) / 1000) * 100)}%; height: 100%; background: var(--primary);"></div>
                </div>
              </div>
            </div>
          ` : (state.searchPointsQuery ? `
            <div class="card" style="text-align: center; padding: 2.5rem; color: var(--text-muted);">
              <h4>ไม่พบข้อมูลสมาชิก "${escapeHTML(state.searchPointsQuery)}"</h4>
              <p>กรุณาตรวจสอบการสะกดชื่อ หรือทักแชทสอบถามแอดมินทาง LINE ได้นะคะ</p>
            </div>
          ` : '')}

          <!-- Member Levels Info -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="card" style="text-align: center; padding: 1.25rem;">
              <span style="font-size: 1.8rem; display: block; margin-bottom: 0.25rem;">🥉</span>
              <h4 style="margin-bottom: 0.25rem;">BRONZE</h4>
              <small style="color: var(--text-muted);">0 - 499 แต้ม</small>
              <p style="font-size: 0.82rem; margin-top: 0.5rem;">รับส่วนลด 5% ทุกคำสั่งซื้อ</p>
            </div>
            <div class="card" style="text-align: center; padding: 1.25rem; border-color: var(--primary-soft);">
              <span style="font-size: 1.8rem; display: block; margin-bottom: 0.25rem;">🥈</span>
              <h4 style="margin-bottom: 0.25rem; color: var(--primary-deep);">SILVER</h4>
              <small style="color: var(--text-muted);">500 - 999 แต้ม</small>
              <p style="font-size: 0.82rem; margin-top: 0.5rem;">รับส่วนลด 10% + ของแถมพิเศษ</p>
            </div>
            <div class="card" style="text-align: center; padding: 1.25rem;">
              <span style="font-size: 1.8rem; display: block; margin-bottom: 0.25rem;">🥇</span>
              <h4 style="margin-bottom: 0.25rem;">GOLD VIP</h4>
              <small style="color: var(--text-muted);">1,000+ แต้ม</small>
              <p style="font-size: 0.82rem; margin-top: 0.5rem;">รับส่วนลด 15% + สิทธิ์เข้ากลุ่มลับ</p>
            </div>
          </div>

        </div>
      </section>
    `;
  }

  window.searchPoints = function () {
    const input = $('pointsSearchInput');
    if (input) {
      state.searchPointsQuery = input.value.trim();
      renderCurrentView();
    }
  };

  // ============================================================
  // VIEW: REVIEWS (Customer Reviews & Submit Modal)
  // ============================================================
  function renderReviewsView(container) {
    const reviews = Store.getReviews();

    container.innerHTML = `
      <section style="padding: 2.5rem 0 4rem;">
        <div class="container" style="max-width: 860px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
            <div>
              <span class="section-tag">Testimonials</span>
              <h2 class="section-title" style="margin: 0;">รีวิวและความประทับใจจากลูกค้า</h2>
            </div>
            <button type="button" class="btn btn-primary" onclick="openReviewModal()">+ เขียนรีวิวร้าน</button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${reviews.map(r => `
              <div class="card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.65rem;">
                  <span style="font-weight: 700; color: var(--text);">${escapeHTML(r.customer_name || 'ลูกค้า')}</span>
                  <span style="color: #F59E0B; font-size: 1rem;">${'★'.repeat(r.rating || 5)}</span>
                </div>
                ${r.product_name ? `<span class="badge badge--pink" style="margin-bottom: 0.5rem;">${escapeHTML(r.product_name)}</span>` : ''}
                <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6; margin: 0;">${escapeHTML(r.message)}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  window.openReviewModal = function () {
    const modal = $('reviewModal');
    if (modal) modal.classList.add('is-active');
  };

  window.closeReviewModal = function () {
    const modal = $('reviewModal');
    if (modal) modal.classList.remove('is-active');
  };

  // ============================================================
  // VIEW: ORDERS (Customer Order Status Tracking)
  // ============================================================
  function renderOrdersView(container) {
    const orders = Store.getAllOrders();

    container.innerHTML = `
      <section style="padding: 2.5rem 0 4rem;">
        <div class="container" style="max-width: 860px;">
          <div class="section-header">
            <span class="section-tag">Order Tracking</span>
            <h2 class="section-title">ตรวจสอบสถานะคำสั่งซื้อ</h2>
            <p class="section-desc">ติดตามสถานะการตรวจสอบสลิปและสิทธิ์การเข้าถึง Google Drive ของออเดอร์คุณ</p>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1rem;">
            ${orders.length > 0 ? orders.map(o => `
              <div class="card" style="padding: 1.5rem;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; border-bottom: 1px solid var(--border-light); padding-bottom: 0.75rem;">
                  <div>
                    <h3 style="font-size: 1.15rem; margin: 0 0 0.25rem;">#${escapeHTML(o.order_number)}</h3>
                    <small style="color: var(--text-muted);">${new Date(o.created_at).toLocaleString('th-TH')}</small>
                  </div>
                  <span class="badge ${o.status === 'PAID' || o.status === 'COMPLETED' ? 'badge--success' : (o.status === 'REJECTED' ? 'badge--warning' : 'badge--pink')}">
                    ${o.status === 'PAID' ? 'ชำระเงินแล้ว' : (o.status === 'VERIFYING' ? 'กำลังตรวจสลิป' : (o.status === 'COMPLETED' ? 'ส่งมอบสิทธิ์แล้ว' : o.status))}
                  </span>
                </div>

                <div style="font-size: 0.95rem; margin-bottom: 0.75rem;">
                  <strong>รายการ:</strong> ${escapeHTML(o.item_name || 'สินค้า BNC')}
                </div>
                <div style="font-size: 0.95rem; margin-bottom: 0.75rem;">
                  <strong>ยอดชำระ:</strong> <span style="color: var(--primary-deep); font-weight: 700;">฿${Number(o.amount || 0).toLocaleString()}</span>
                </div>
                ${o.gmail ? `
                  <div style="font-size: 0.88rem; color: var(--text-muted);">
                    <strong>Gmail รับไฟล์:</strong> ${escapeHTML(o.gmail)}
                  </div>
                ` : ''}
              </div>
            `).join('') : `
              <div class="card" style="text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
                <h4>ยังไม่มีรายการคำสั่งซื้อ</h4>
                <p>เมื่อคุณสั่งซื้อสินค้าหรือฟอนต์ในตะกร้า ข้อมูลจะแสดงที่นี่โดยอัตโนมัติค่ะ</p>
                <a href="#fonts" class="btn btn-primary" style="margin-top: 1rem;">เลือกดูฟอนต์ & สินค้า ➔</a>
              </div>
            `}
          </div>
        </div>
      </section>
    `;
  }

  // ============================================================
  // VIEW: ADMIN DASHBOARD & MASTER SETTINGS (100% Configurable)
  // ============================================================
  function renderAdminView(container) {
    const s = Store.getSettings();

    // Check if Admin PIN is unlocked
    if (!state.isAdmin) {
      container.innerHTML = `
        <section style="min-height: 70vh; display: flex; align-items: center; justify-content: center; padding: 2rem 1rem;">
          <div class="card" style="max-width: 380px; width: 100%; text-align: center; padding: 2.5rem 2rem;">
            <span style="font-size: 3rem; display: block; margin-bottom: 0.5rem;">🔐</span>
            <h2 style="font-size: 1.4rem; margin-bottom: 0.5rem;">เข้าสู่ระบบผู้ดูแลร้าน</h2>
            <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 1.5rem;">กรุณากรอกรหัส PIN 6 หลักเพื่อเข้าถึงระบบจัดการหลังบ้าน</p>
            
            <form onsubmit="handleAdminLogin(event)">
              <div class="form-group" style="margin-bottom: 1.25rem;">
                <input type="password" id="adminPinInput" class="form-input" placeholder="PIN 6 หลัก (ค่าเริ่มต้น: 123456)" maxlength="6" style="text-align: center; font-size: 1.3rem; letter-spacing: 0.3em;" required autofocus>
              </div>
              <button type="submit" class="btn btn-primary btn-full">เข้าสู่ระบบหลังบ้าน ➔</button>
            </form>
          </div>
        </section>
      `;
      return;
    }

    // Admin Authenticated -> Render Dashboard & Tabs
    container.innerHTML = `
      <section style="padding: 2rem 0 4rem;">
        <div class="container">
          
          <!-- Admin Header Bar -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
            <div>
              <span class="badge badge--pink" style="margin-bottom: 0.35rem;">Admin Studio</span>
              <h1 style="font-size: 1.5rem; margin: 0;">ระบบจัดการร้านค้า BNC Admin</h1>
            </div>
            <div style="display: flex; gap: 0.5rem;">
              <button type="button" class="btn btn-outline btn-sm" onclick="syncSheetsManual()">ซิงก์ Google Sheet</button>
              <button type="button" class="btn btn-outline btn-sm" onclick="handleAdminLogout()">ออกจากระบบ</button>
            </div>
          </div>

          <!-- Admin Tabs -->
          <div class="admin-nav-tabs">
            <button type="button" class="admin-tab-btn ${state.adminTab === 'dashboard' ? 'active' : ''}" onclick="switchAdminTab('dashboard')">📊 แดชบอร์ด</button>
            <button type="button" class="admin-tab-btn ${state.adminTab === 'orders' ? 'active' : ''}" onclick="switchAdminTab('orders')">📦 คำสั่งซื้อ</button>
            <button type="button" class="admin-tab-btn ${state.adminTab === 'slips' ? 'active' : ''}" onclick="switchAdminTab('slips')">🧳 ตรวจสลิป</button>
            <button type="button" class="admin-tab-btn ${state.adminTab === 'products' ? 'active' : ''}" onclick="switchAdminTab('products')">🛍️ จัดการสินค้า</button>
            <button type="button" class="admin-tab-btn ${state.adminTab === 'fonts' ? 'active' : ''}" onclick="switchAdminTab('fonts')">🔤 จัดการฟอนต์</button>
            <button type="button" class="admin-tab-btn ${state.adminTab === 'groups' ? 'active' : ''}" onclick="switchAdminTab('groups')">👥 จัดการกลุ่ม VIP</button>
            <button type="button" class="admin-tab-btn ${state.adminTab === 'settings' ? 'active' : ''}" onclick="switchAdminTab('settings')">⚙️ ตั้งค่าร้าน (ทุกจุด)</button>
          </div>

          <!-- Tab Content Container -->
          <div id="adminTabContent">
            ${renderAdminTabContent(state.adminTab, s)}
          </div>

        </div>
      </section>
    `;
  }

  function renderAdminTabContent(tab, s) {
    switch (tab) {
      case 'dashboard':
        return renderAdminDashboardTab();
      case 'orders':
        return renderAdminOrdersTab();
      case 'slips':
        return renderAdminSlipsTab();
      case 'products':
        return renderAdminProductsTab();
      case 'fonts':
        return renderAdminFontsTab();
      case 'groups':
        return renderAdminGroupsTab();
      case 'settings':
        return renderAdminSettingsTab(s);
      default:
        return renderAdminDashboardTab();
    }
  }

  function renderAdminDashboardTab() {
    const orders = Store.getAllOrders();
    const payments = Store.getPayments();
    const totalRev = orders.filter(o => o.status === 'PAID' || o.status === 'COMPLETED').reduce((sum, o) => sum + (Number(o.amount) || 0), 0);
    const pendingSlips = payments.filter(p => p.verification_status === 'VERIFYING').length;

    return `
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5" style="margin-bottom: 2rem;">
        <div class="card">
          <span style="font-size: 0.85rem; color: var(--text-muted);">ยอดขายรวม</span>
          <h2 style="font-size: 1.8rem; color: var(--primary-deep); margin: 0.35rem 0;">฿${totalRev.toLocaleString()}</h2>
          <small style="color: #166534;">คำสั่งซื้อที่ชำระแล้ว</small>
        </div>
        <div class="card">
          <span style="font-size: 0.85rem; color: var(--text-muted);">คำสั่งซื้อทั้งหมด</span>
          <h2 style="font-size: 1.8rem; margin: 0.35rem 0;">${orders.length} ออเดอร์</h2>
          <small style="color: var(--text-muted);">ในระบบคลาวด์</small>
        </div>
        <div class="card">
          <span style="font-size: 0.85rem; color: var(--text-muted);">รอตรวจสลิป</span>
          <h2 style="font-size: 1.8rem; color: #d97706; margin: 0.35rem 0;">${pendingSlips} รายการ</h2>
          <small><a href="#admin/slips" style="color: var(--primary); text-decoration: underline;">ไปตรวจสลิป ➔</a></small>
        </div>
        <div class="card">
          <span style="font-size: 0.85rem; color: var(--text-muted);">สินค้า & ฟอนต์</span>
          <h2 style="font-size: 1.8rem; margin: 0.35rem 0;">${Store.getAllProducts().length + Store.getAllFonts().length} รายการ</h2>
          <small style="color: var(--text-muted);">พร้อมจำหน่าย</small>
        </div>
      </div>
    `;
  }

  function renderAdminOrdersTab() {
    const orders = Store.getAllOrders();
    return `
      <div class="card" style="padding: 0; overflow-x: auto;">
        <table class="admin-table">
          <thead>
            <tr>
              <th>#ออเดอร์</th>
              <th>ลูกค้า</th>
              <th>รายการ</th>
              <th>ยอดเงิน</th>
              <th>Gmail</th>
              <th>สถานะ</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            ${orders.length > 0 ? orders.map(o => `
              <tr>
                <td><strong>#${escapeHTML(o.order_number)}</strong></td>
                <td>${escapeHTML(o.customer_name || 'ลูกค้า')}</td>
                <td>${escapeHTML(o.item_name || 'สินค้า')}</td>
                <td>฿${Number(o.amount || 0).toLocaleString()}</td>
                <td>${escapeHTML(o.gmail || '-')}</td>
                <td><span class="badge ${o.status === 'PAID' ? 'badge--success' : 'badge--pink'}">${o.status}</span></td>
                <td>
                  <button type="button" class="btn btn-outline btn-sm" onclick="toggleOrderStatus('${o.id}')">เปลี่ยนสถานะ</button>
                </td>
              </tr>
            `).join('') : `
              <tr><td colspan="7" style="text-align:center; padding: 2rem;">ยังไม่มีคำสั่งซื้อ</td></tr>
            `}
          </tbody>
        </table>
      </div>
    `;
  }

  function renderAdminSlipsTab() {
    const payments = Store.getPayments();
    const orders = Store.getAllOrders();

    return `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${payments.length > 0 ? payments.map(p => {
          const ord = orders.find(o => o.id === p.order_id);
          return `
            <div class="card">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                <h4>ออเดอร์ #${ord ? escapeHTML(ord.order_number) : p.order_id}</h4>
                <span class="badge ${p.verification_status === 'PAID' ? 'badge--success' : 'badge--warning'}">${p.verification_status}</span>
              </div>
              <div style="font-size: 0.92rem; margin-bottom: 0.5rem;">
                <strong>ยอดโอน:</strong> ฿${Number(p.amount || 0).toLocaleString()}
              </div>
              ${p.slip_image_url ? `
                <div style="text-align: center; margin: 1rem 0;">
                  <img src="${escapeHTML(p.slip_image_url)}" style="max-height: 240px; border-radius: 8px; border: 1px solid var(--border-light); cursor: pointer;" onclick="openLightbox('${escapeHTML(p.slip_image_url)}')">
                </div>
              ` : '<p style="color: var(--text-muted); font-size: 0.88rem;">ไม่มีภาพสลิปแนบ (ลูกค้าแจ้งโอนทางแชท)</p>'}
              <div style="display: flex; gap: 0.5rem; justify-content: flex-end; margin-top: 1rem;">
                <button type="button" class="btn btn-primary btn-sm" onclick="verifySlipAction('${p.id}', 'PAID')">✅ อนุมัติการชำระเงิน</button>
                <button type="button" class="btn btn-outline btn-sm" onclick="verifySlipAction('${p.id}', 'REJECTED')">ปฏิเสธ</button>
              </div>
            </div>
          `;
        }).join('') : '<div class="card" style="grid-column: 1/-1; text-align: center; padding: 3rem;">ไม่มีสลิปที่รอตรวจสอบ</div>'}
      </div>
    `;
  }

  function renderAdminProductsTab() {
    const prods = Store.getAllProducts();
    return `
      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
          <h3 style="margin: 0;">รายการสินค้ากราฟิก (${prods.length})</h3>
          <button type="button" class="btn btn-primary btn-sm" onclick="openAddProductModal()">+ เพิ่มสินค้าใหม่</button>
        </div>
        <div style="overflow-x: auto;">
          <table class="admin-table">
            <thead>
              <tr><th>รูป</th><th>ชื่อสินค้า</th><th>หมวดหมู่</th><th>ราคา</th><th>การจัดส่ง</th><th>จัดการ</th></tr>
            </thead>
            <tbody>
              ${prods.map(p => `
                <tr>
                  <td><img src="${escapeHTML(p.image_url)}" style="width: 40px; height: 40px; border-radius: 6px; object-fit: cover;"></td>
                  <td><strong>${escapeHTML(p.name)}</strong></td>
                  <td><span class="badge badge--pink">${escapeHTML(p.category)}</span></td>
                  <td>฿${Number(p.price).toLocaleString()}</td>
                  <td>${p.delivery_type === 'GOOGLE_DRIVE' ? '⚡ Google Drive' : 'แอดมินส่งมือ'}</td>
                  <td>
                    <button type="button" class="btn btn-outline btn-sm" onclick="deleteProduct('${p.id}')">ลบ</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderAdminFontsTab() {
    const fonts = Store.getAllFonts();
    return `
      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
          <h3 style="margin: 0;">รายการฟอนต์ลายมือ (${fonts.length})</h3>
          <button type="button" class="btn btn-primary btn-sm" onclick="openAddFontModal()">+ เพิ่มฟอนต์ใหม่</button>
        </div>
        <div style="overflow-x: auto;">
          <table class="admin-table">
            <thead>
              <tr><th>ชื่อฟอนต์</th><th>หมวดหมู่</th><th>ราคา</th><th>การจัดส่ง</th><th>จัดการ</th></tr>
            </thead>
            <tbody>
              ${fonts.map(f => `
                <tr>
                  <td><strong>${escapeHTML(f.name)}</strong></td>
                  <td><span class="badge badge--pink">${escapeHTML(f.category)}</span></td>
                  <td>฿${Number(f.price).toLocaleString()}</td>
                  <td>${f.delivery_type === 'GOOGLE_DRIVE' ? '⚡ Google Drive' : 'แอดมินส่งมือ'}</td>
                  <td>
                    <button type="button" class="btn btn-outline btn-sm" onclick="deleteFont('${f.id}')">ลบ</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderAdminGroupsTab() {
    const groups = Store.getAllGroups();
    return `
      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
          <h3 style="margin: 0;">รายการกลุ่ม LINE VIP (${groups.length})</h3>
          <button type="button" class="btn btn-primary btn-sm" onclick="openAddGroupModal()">+ เพิ่มกลุ่มใหม่</button>
        </div>
        <div style="overflow-x: auto;">
          <table class="admin-table">
            <thead>
              <tr><th>ปก</th><th>ชื่อกลุ่ม</th><th>ราคา</th><th>ลิงก์ตัวอย่าง Drive</th><th>จัดการ</th></tr>
            </thead>
            <tbody>
              ${groups.map(g => `
                <tr>
                  <td><img src="${escapeHTML(g.cover_image_url)}" style="width: 50px; height: 35px; border-radius: 4px; object-fit: cover;"></td>
                  <td><strong>${escapeHTML(g.name)}</strong></td>
                  <td>฿${Number(g.price).toLocaleString()}</td>
                  <td><a href="${escapeHTML(g.preview_drive_url)}" target="_blank" style="color: var(--primary); font-size: 0.85rem;">เปิดลิงก์ ↗</a></td>
                  <td>
                    <button type="button" class="btn btn-outline btn-sm" onclick="deleteGroup('${g.id}')">ลบ</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // ── Master Admin Settings Tab (100% Configurable) ─────────────
  function renderAdminSettingsTab(s) {
    const stats = s.stats || {};
    const highlights = Array.isArray(s.highlights) ? s.highlights : [];

    return `
      <form id="masterSettingsForm" onsubmit="saveMasterSettings(event)">
        
        <!-- 1. General & Header Settings -->
        <div class="card" style="margin-bottom: 1.5rem;">
          <h3 style="color: var(--primary-deep); margin-bottom: 1.25rem;">ข้อมูลร้าน & แถบประกาศหัวเว็บ</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="form-group">
              <label class="form-label">ชื่อร้านค้า</label>
              <input type="text" id="cfg_shopName" class="form-input" value="${escapeHTML(s.shopName || '')}" required>
            </div>
            <div class="form-group">
              <label class="form-label">สโลแกน / คำโปรย</label>
              <input type="text" id="cfg_tagline" class="form-input" value="${escapeHTML(s.tagline || '')}">
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">ข้อความแถบประกาศด้านบน (Ticker)</label>
            <input type="text" id="cfg_announcement" class="form-input" value="${escapeHTML(s.announcement || '')}">
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <input type="checkbox" id="cfg_announcementEnabled" ${s.announcementEnabled ? 'checked' : ''} style="accent-color: var(--primary); width: 18px; height: 18px;">
            <label for="cfg_announcementEnabled" style="font-weight: 600; font-size: 0.9rem; cursor: pointer;">เปิดแสดงแถบประกาศ</label>
          </div>
        </div>

        <!-- 2. Profile Cover, Avatar & Bio (NO AURA) -->
        <div class="card" style="margin-bottom: 1.5rem;">
          <h3 style="color: var(--primary-deep); margin-bottom: 1.25rem;">รูปภาพหน้าปก, โปรไฟล์ และ Bio</h3>
          <div class="form-group">
            <label class="form-label">ลิงก์ภาพหน้าปก (Facebook Cover Style)</label>
            <input type="text" id="cfg_coverImage" class="form-input" value="${escapeHTML(s.coverImage || '')}">
            <small style="color: var(--text-muted);">*แนะนำภาพแนวนอน อัตราส่วน 16:6</small>
          </div>
          <div class="form-group">
            <label class="form-label">ลิงก์ภาพโปรไฟล์ร้าน (Avatar ขอบขาวเรียบ ไม่มีออร่า)</label>
            <input type="text" id="cfg_profileImage" class="form-input" value="${escapeHTML(s.profileImage || '')}">
          </div>
          <div class="form-group">
            <label class="form-label">คำแนะนำร้านค้า (Bio)</label>
            <textarea id="cfg_shopBio" class="form-textarea" rows="3">${escapeHTML(s.shopBio || '')}</textarea>
          </div>
        </div>

        <!-- 3. Customizable Button Labels (แก้ได้ยันตัวหนังสือบนปุ่ม) -->
        <div class="card" style="margin-bottom: 1.5rem;">
          <h3 style="color: var(--primary-deep); margin-bottom: 0.5rem;">ข้อความบนปุ่มกดทุกจุด (Button Labels)</h3>
          <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 1.25rem;">สามารถเปลี่ยนคำที่แสดงบนปุ่มต่างๆ ทั้งเว็บได้ตามต้องการ</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div class="form-group">
              <label class="form-label">ปุ่มทักแชท LINE</label>
              <input type="text" id="cfg_btnLineText" class="form-input" value="${escapeHTML(s.btnLineText || 'ทักแชท LINE ร้าน')}">
            </div>
            <div class="form-group">
              <label class="form-label">ปุ่มใส่ตะกร้า</label>
              <input type="text" id="cfg_btnCartText" class="form-input" value="${escapeHTML(s.btnCartText || 'ใส่ตะกร้า')}">
            </div>
            <div class="form-group">
              <label class="form-label">ปุ่มสั่งซื้อ</label>
              <input type="text" id="cfg_btnBuyText" class="form-input" value="${escapeHTML(s.btnBuyText || 'สั่งซื้อเลย')}">
            </div>
            <div class="form-group">
              <label class="form-label">ปุ่มดูตัวอย่าง</label>
              <input type="text" id="cfg_btnPreviewText" class="form-input" value="${escapeHTML(s.btnPreviewText || 'ดูตัวอย่าง')}">
            </div>
          </div>
        </div>

        <!-- 4. Stats Pills (ตัวเลขและข้อความสถิติ) -->
        <div class="card" style="margin-bottom: 1.5rem;">
          <h3 style="color: var(--primary-deep); margin-bottom: 1.25rem;">ตัวเลขและข้อความสถิติหน้าแรก</h3>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="form-group">
              <label class="form-label">สถิติ 1 (ตัวเลข & คำอธิบาย)</label>
              <div style="display: flex; gap: 0.5rem;">
                <input type="text" id="cfg_statPortCount" class="form-input" value="${escapeHTML(stats.portfolioCount || '250+')}" style="width: 45%;">
                <input type="text" id="cfg_statPortLabel" class="form-input" value="${escapeHTML(stats.portfolioLabel || 'ผลงาน')}">
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">สถิติ 2 (ตัวเลข & คำอธิบาย)</label>
              <div style="display: flex; gap: 0.5rem;">
                <input type="text" id="cfg_statFontCount" class="form-input" value="${escapeHTML(stats.fontCount || '48')}" style="width: 45%;">
                <input type="text" id="cfg_statFontLabel" class="form-input" value="${escapeHTML(stats.fontLabel || 'ฟอนต์')}">
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">สถิติ 3 (ตัวเลข & คำอธิบาย)</label>
              <div style="display: flex; gap: 0.5rem;">
                <input type="text" id="cfg_statMemberCount" class="form-input" value="${escapeHTML(stats.memberCount || '1.2k')}" style="width: 45%;">
                <input type="text" id="cfg_statMemberLabel" class="form-input" value="${escapeHTML(stats.memberLabel || 'สมาชิก')}">
              </div>
            </div>
          </div>
        </div>

        <!-- 5. Social & Contact Links -->
        <div class="card" style="margin-bottom: 1.5rem;">
          <h3 style="color: var(--primary-deep); margin-bottom: 1.25rem;">ลิงก์ช่องทางติดต่อ Social Links</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="form-group">
              <label class="form-label">ลิงก์ LINE Official</label>
              <input type="text" id="cfg_lineUrl" class="form-input" value="${escapeHTML(s.lineUrl || '')}">
            </div>
            <div class="form-group">
              <label class="form-label">เบอร์โทรศัพท์</label>
              <input type="text" id="cfg_contactPhone" class="form-input" value="${escapeHTML(s.contactPhone || '')}">
            </div>
            <div class="form-group">
              <label class="form-label">Instagram Link</label>
              <input type="text" id="cfg_instagramUrl" class="form-input" value="${escapeHTML(s.instagramUrl || '')}">
            </div>
            <div class="form-group">
              <label class="form-label">Facebook Link</label>
              <input type="text" id="cfg_facebookUrl" class="form-input" value="${escapeHTML(s.facebookUrl || '')}">
            </div>
          </div>
        </div>

        <!-- 6. Payment & QR Code -->
        <div class="card" style="margin-bottom: 1.5rem;">
          <h3 style="color: var(--primary-deep); margin-bottom: 1.25rem;">ข้อมูลบัญชีชำระเงิน & QR พร้อมเพย์</h3>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="form-group">
              <label class="form-label">ชื่อธนาคาร</label>
              <input type="text" id="cfg_bankName" class="form-input" value="${escapeHTML(s.bankName || '')}">
            </div>
            <div class="form-group">
              <label class="form-label">เลขที่บัญชี</label>
              <input type="text" id="cfg_bankAccount" class="form-input" value="${escapeHTML(s.bankAccount || '')}">
            </div>
            <div class="form-group">
              <label class="form-label">ชื่อบัญชี</label>
              <input type="text" id="cfg_bankAccountName" class="form-input" value="${escapeHTML(s.bankAccountName || '')}">
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">ลิงก์ภาพ QR Code ชำระเงิน (PromptPay)</label>
            <input type="text" id="cfg_promptpayQrUrl" class="form-input" value="${escapeHTML(s.promptpayQrUrl || '')}">
          </div>
        </div>

        <!-- 7. Google Sheets Sync & Web App -->
        <div class="card" style="margin-bottom: 1.5rem; border: 1.5px solid #10B981;">
          <h3 style="color: #166534; margin-bottom: 0.5rem;">ฐานข้อมูล Google Sheets (ฟรี 100%)</h3>
          <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 1rem;">ใส่ Google Apps Script Web App URL เพื่อซิงก์ออเดอร์และข้อมูลตรงกันทุกเครื่อง</p>
          <div class="form-group">
            <label class="form-label">Web App URL หรือ ลิงก์ Google Sheets</label>
            <div style="display: flex; gap: 0.5rem;">
              <input type="text" id="cfg_sheetUrl" class="form-input" value="${escapeHTML(s.googleSheetWebAppUrl || '')}" placeholder="https://script.google.com/macros/s/.../exec">
              <button type="button" class="btn btn-outline" style="border-color: #10B981; color: #166534; white-space: nowrap;" onclick="testAdminSheetSync()">ทดสอบการเชื่อมต่อ</button>
            </div>
            <div id="adminSheetFeedback" style="margin-top: 0.5rem; font-size: 0.88rem; display: none;"></div>
          </div>
        </div>

        <!-- 8. Admin PIN -->
        <div class="card" style="margin-bottom: 2rem;">
          <h3 style="color: var(--primary-deep); margin-bottom: 1rem;">รหัสความปลอดภัย Admin PIN</h3>
          <div class="form-group" style="max-width: 280px;">
            <label class="form-label">รหัสผ่านเข้าหลังบ้าน (6 หลัก)</label>
            <input type="password" id="cfg_adminPin" class="form-input" value="${escapeHTML(s.adminPin || '123456')}" maxlength="6" style="letter-spacing: 0.2em; text-align: center; font-size: 1.2rem;">
          </div>
        </div>

        <!-- Submit Button -->
        <div style="text-align: right; margin-bottom: 3rem;">
          <button type="submit" class="btn btn-primary btn-lg">บันทึกการตั้งค่าทั้งหมด ➔</button>
        </div>

      </form>
    `;
  }

  // Admin Actions
  window.handleAdminLogin = function (e) {
    e.preventDefault();
    const pin = $('adminPinInput').value.trim();
    const s = Store.getSettings();
    const correctPin = s.adminPin || '123456';

    if (pin === correctPin) {
      state.isAdmin = true;
      renderCurrentView();
    } else {
      alert('รหัส PIN ไม่ถูกต้องค่ะ (ค่าเริ่มต้นคือ 123456)');
    }
  };

  window.handleAdminLogout = function () {
    state.isAdmin = false;
    window.location.hash = 'home';
  };

  window.switchAdminTab = function (tab) {
    state.adminTab = tab;
    window.location.hash = `admin/${tab}`;
  };

  window.saveMasterSettings = function (e) {
    e.preventDefault();
    try {
      const updated = {
        shopName: $('cfg_shopName').value.trim(),
        tagline: $('cfg_tagline').value.trim(),
        announcement: $('cfg_announcement').value.trim(),
        announcementEnabled: $('cfg_announcementEnabled').checked,
        coverImage: $('cfg_coverImage').value.trim(),
        profileImage: $('cfg_profileImage').value.trim(),
        shopBio: $('cfg_shopBio').value.trim(),
        btnLineText: $('cfg_btnLineText').value.trim(),
        btnCartText: $('cfg_btnCartText').value.trim(),
        btnBuyText: $('cfg_btnBuyText').value.trim(),
        btnPreviewText: $('cfg_btnPreviewText').value.trim(),
        stats: {
          portfolioCount: $('cfg_statPortCount').value.trim(),
          portfolioLabel: $('cfg_statPortLabel').value.trim(),
          fontCount: $('cfg_statFontCount').value.trim(),
          fontLabel: $('cfg_statFontLabel').value.trim(),
          memberCount: $('cfg_statMemberCount').value.trim(),
          memberLabel: $('cfg_statMemberLabel').value.trim()
        },
        lineUrl: $('cfg_lineUrl').value.trim(),
        contactPhone: $('cfg_contactPhone').value.trim(),
        instagramUrl: $('cfg_instagramUrl').value.trim(),
        facebookUrl: $('cfg_facebookUrl').value.trim(),
        bankName: $('cfg_bankName').value.trim(),
        bankAccount: $('cfg_bankAccount').value.trim(),
        bankAccountName: $('cfg_bankAccountName').value.trim(),
        promptpayQrUrl: $('cfg_promptpayQrUrl').value.trim(),
        googleSheetWebAppUrl: $('cfg_sheetUrl').value.trim(),
        adminPin: $('cfg_adminPin').value.trim()
      };

      Store.saveSettings(updated);
      alert('บันทึกการตั้งค่าทั้งหมดเรียบร้อยแล้วค่ะ');
      renderNavbar();
      renderCurrentView();
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการบันทึก: ' + err.message);
    }
  };

  window.testAdminSheetSync = async function () {
    const url = $('cfg_sheetUrl').value.trim();
    const fb = $('adminSheetFeedback');
    if (!fb) return;
    fb.style.display = 'block';

    if (!url) {
      fb.innerHTML = '<span style="color: #dc2626;">กรุณากรอก URL ก่อนนะคะ</span>';
      return;
    }

    if (url.includes('docs.google.com/spreadsheets')) {
      fb.innerHTML = '<div style="color: #166534; font-weight:600;">ตรวจพบลิงก์ชีต บันทึกและเปิดใช้งานได้ทันทีค่ะ</div>';
      return;
    }

    fb.innerHTML = '<span style="color: #2563eb;">กำลังทดสอบการเชื่อมต่อ...</span>';
    try {
      const res = await fetch(url + (url.includes('?') ? '&' : '?') + 'action=GET_ALL');
      const json = await res.json();
      if (json && (json.status === 'success' || json.data)) {
        fb.innerHTML = '<div style="color: #166534; font-weight:600;">เชื่อมต่อชีตสำเร็จ 100%! ระบบจะซิงก์ออเดอร์อัตโนมัติ</div>';
      } else {
        fb.innerHTML = `<div style="color: #d97706;">ตอบกลับจากเซิร์ฟเวอร์: ${json.message || 'บันทึกพร้อมใช้งาน'}</div>`;
      }
    } catch (err) {
      fb.innerHTML = '<div style="color: #9d174d;">บันทึกลิงก์เรียบร้อยแล้วค่ะ (ระบบจะส่งข้อมูลเบื้องหลังผ่าน POST อัตโนมัติ)</div>';
    }
  };

  window.syncSheetsManual = async function () {
    if (Store.syncFromCloud) {
      await Store.syncFromCloud(() => {
        alert('ซิงก์ข้อมูลจาก Google Sheets เรียบร้อยแล้วค่ะ');
        renderCurrentView();
      });
    }
  };

  window.verifySlipAction = function (payId, status) {
    Store.updatePaymentStatus(payId, status);
    alert(`อัปเดตสถานะเป็น ${status} เรียบร้อยแล้วค่ะ`);
    renderCurrentView();
  };

  window.toggleOrderStatus = function (ordId) {
    const order = Store.getOrder(ordId);
    if (!order) return;
    const nextStatus = order.status === 'VERIFYING' ? 'PAID' : (order.status === 'PAID' ? 'COMPLETED' : 'VERIFYING');
    Store.updateOrderStatus(ordId, nextStatus);
    renderCurrentView();
  };

  // ============================================================
  // CARD RENDERERS (Clean Pastel Components)
  // ============================================================
  function renderProductCard(p, s) {
    return `
      <div class="product-card">
        <img src="${escapeHTML(p.image_url || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500')}" class="product-card__thumb" alt="${escapeHTML(p.name)}">
        <div class="product-card__body">
          <span class="badge badge--pink" style="margin-bottom: 0.35rem; align-self: flex-start;">${escapeHTML(p.category || 'กราฟิก')}</span>
          <h4 class="product-card__title">${escapeHTML(p.name)}</h4>
          <p class="product-card__desc">${escapeHTML(p.description || '')}</p>
          <div class="product-card__footer">
            <div class="product-price">฿${Number(p.price || 0).toLocaleString()}</div>
            <div style="display: flex; gap: 0.35rem;">
              <button type="button" class="btn btn-outline btn-sm" onclick="addToCartItem('${p.id}', 'PRODUCT')" title="เพิ่มลงตะกร้า">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                ${escapeHTML(s.btnCartText || 'ใส่ตะกร้า')}
              </button>
              <button type="button" class="btn btn-primary btn-sm" onclick="buyNowItem('${p.id}', 'PRODUCT')">
                ${escapeHTML(s.btnBuyText || 'ซื้อ')}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderFontCard(f, s) {
    return `
      <div class="product-card">
        <div style="padding: 1.25rem 1.25rem 0.5rem; border-bottom: 1px solid var(--border-light); background: var(--surface-alt);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <span class="badge badge--pink">${escapeHTML(f.category || 'ลายมือ')}</span>
            <span class="badge ${f.delivery_type === 'GOOGLE_DRIVE' ? 'badge--success' : 'badge--info'}">${f.delivery_type === 'GOOGLE_DRIVE' ? '⚡ ส่งอัตโนมัติ' : 'แอดมินส่ง'}</span>
          </div>
          <h3 style="font-size: 1.2rem; margin: 0;">${escapeHTML(f.name)}</h3>
        </div>

        <!-- Live Font Preview Area -->
        <div class="font-preview-area">
          <div class="font-preview-text" style="font-size: ${state.fontTester.size}px; font-weight: 500; word-break: break-word;">
            ${escapeHTML(state.fontTester.text || 'ร้านป้ายบีเอ็นซี น่ารักสดใส')}
          </div>
        </div>

        <div class="product-card__body">
          <p class="product-card__desc">${escapeHTML(f.description || '')}</p>
          <div class="product-card__footer">
            <div class="product-price">฿${Number(f.price || 0).toLocaleString()}</div>
            <div style="display: flex; gap: 0.35rem;">
              <button type="button" class="btn btn-outline btn-sm" onclick="addToCartItem('${f.id}', 'FONT')">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                ${escapeHTML(s.btnCartText || 'ใส่ตะกร้า')}
              </button>
              <button type="button" class="btn btn-primary btn-sm" onclick="buyNowItem('${f.id}', 'FONT')">
                ${escapeHTML(s.btnBuyText || 'ซื้อ')}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderGroupCard(g, s) {
    const benefits = (g.benefits || '').split('\n').filter(Boolean);
    return `
      <div class="card" style="display: flex; flex-direction: column;">
        <img src="${escapeHTML(g.cover_image_url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600')}" style="width: 100%; height: 200px; object-fit: cover; border-radius: var(--radius-md); margin-bottom: 1rem;" alt="${escapeHTML(g.name)}">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <h3 style="font-size: 1.25rem; margin: 0;">${escapeHTML(g.name)}</h3>
          <span class="product-price">฿${Number(g.price || 0).toLocaleString()}</span>
        </div>
        <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1rem;">${escapeHTML(g.description || '')}</p>
        
        <!-- Benefits with pink checkboxes -->
        <div style="margin-bottom: 1.5rem; flex-grow: 1;">
          ${benefits.map(b => `
            <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.88rem; margin-bottom: 0.35rem; color: var(--text-secondary);">
              <span style="color: var(--primary); font-weight: 700;">✓</span>
              <span>${escapeHTML(b)}</span>
            </div>
          `).join('')}
        </div>

        <div style="display: flex; gap: 0.5rem; border-top: 1px solid var(--border-light); padding-top: 1rem;">
          ${g.preview_drive_url ? `
            <a href="${escapeHTML(g.preview_drive_url)}" target="_blank" class="btn btn-outline btn-sm" style="flex: 1;">
              ${escapeHTML(s.btnPreviewText || 'ดูตัวอย่าง')} ↗
            </a>
          ` : ''}
          <button type="button" class="btn btn-primary btn-sm" style="flex: 1.2;" onclick="buyNowItem('${g.id}', 'GROUP')">
            สมัครเข้ากลุ่ม ➔
          </button>
        </div>
      </div>
    `;
  }

  // ============================================================
  // SHOPPING CART & CHECKOUT (Zero Mock Buttons, 100% Real)
  // ============================================================
  window.addToCartItem = function (id, type) {
    let item = null;
    if (type === 'FONT') {
      item = Store.getAllFonts().find(f => f.id === id);
      if (item) item.type = 'FONT';
    } else if (type === 'PRODUCT') {
      item = Store.getAllProducts().find(p => p.id === id);
      if (item) item.type = 'PRODUCT';
    } else if (type === 'GROUP') {
      item = Store.getAllGroups().find(g => g.id === id);
      if (item) item.type = 'GROUP';
    }

    if (!item) return;
    Store.addToCart(item);
    updateCartBadge();
    openCartDrawer();
  };

  window.buyNowItem = function (id, type) {
    addToCartItem(id, type);
    openCheckoutModal();
  };

  function setupCartDrawer() {
    // Backdrop
    let backdrop = $('cartBackdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'cartBackdrop';
      backdrop.className = 'cart-backdrop';
      backdrop.onclick = closeCartDrawer;
      document.body.appendChild(backdrop);
    }

    // Drawer container
    let drawer = $('cartDrawer');
    if (!drawer) {
      drawer = document.createElement('aside');
      drawer.id = 'cartDrawer';
      drawer.className = 'cart-drawer';
      document.body.appendChild(drawer);
    }

    // Floating Button
    let floatBtn = $('cartFloatingBtn');
    if (!floatBtn) {
      floatBtn = document.createElement('button');
      floatBtn.id = 'cartFloatingBtn';
      floatBtn.className = 'cart-floating-btn';
      floatBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        <span>ตะกร้า</span>
        <span class="cart-badge" id="cartBadgeCount">0</span>
      `;
      floatBtn.onclick = openCartDrawer;
      document.body.appendChild(floatBtn);
    }
  }

  function updateCartBadge() {
    const cart = Store.getCart();
    const countEl = $('cartBadgeCount');
    if (countEl) countEl.textContent = cart.length;
  }

  window.openCartDrawer = function () {
    const cart = Store.getCart();
    const drawer = $('cartDrawer');
    const backdrop = $('cartBackdrop');
    const s = Store.getSettings();
    if (!drawer || !backdrop) return;

    let total = 0;
    drawer.innerHTML = `
      <div class="cart-drawer__head">
        <h3 style="font-size: 1.15rem; margin: 0; display: flex; align-items: center; gap: 0.4rem;">
          <span>🛍️ ตะกร้าสินค้า</span>
          <span class="badge badge--pink">${cart.length}</span>
        </h3>
        <button type="button" onclick="closeCartDrawer()" style="background:none; border:none; font-size: 1.3rem; cursor: pointer; color: var(--text-muted);">✕</button>
      </div>

      <div class="cart-drawer__body">
        ${cart.length > 0 ? cart.map(item => {
          const price = Number(item.price) || 0;
          total += price;
          return `
            <div class="cart-item-row">
              <div>
                <span class="badge badge--pink" style="font-size: 0.7rem; margin-bottom: 0.2rem;">${escapeHTML(item.category || item.type || 'สินค้า')}</span>
                <h4 style="font-size: 0.95rem; margin: 0 0 0.25rem;">${escapeHTML(item.name)}</h4>
                <span style="font-weight: 700; color: var(--primary-deep); font-size: 0.95rem;">฿${price.toLocaleString()}</span>
              </div>
              <button type="button" onclick="removeCartItem('${item.id}')" style="background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 1.1rem;" title="ลบ">✕</button>
            </div>
          `;
        }).join('') : `
          <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
            <h4>ตะกร้าว่างเปล่า</h4>
            <p style="font-size: 0.88rem;">เลือกสินค้าหรือฟอนต์ที่ต้องการใส่ตะกร้าได้เลยค่ะ</p>
          </div>
        `}
      </div>

      ${cart.length > 0 ? `
        <div class="cart-drawer__foot">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1rem;">
            <span style="color: var(--text-muted);">ยอดรวมทั้งสิ้น</span>
            <span style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 700; color: var(--primary-deep);">฿${total.toLocaleString()}</span>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <button type="button" class="btn btn-outline btn-sm" onclick="clearCartAll()" style="width: 35%;">ล้างตะกร้า</button>
            <button type="button" class="btn btn-primary btn-sm btn-full" onclick="openCheckoutModal()">
              ${escapeHTML(s.btnCheckoutText || 'ชำระเงินทันที ➔')}
            </button>
          </div>
        </div>
      ` : ''}
    `;

    drawer.classList.add('is-open');
    backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  window.closeCartDrawer = function () {
    const drawer = $('cartDrawer');
    const backdrop = $('cartBackdrop');
    if (drawer) drawer.classList.remove('is-open');
    if (backdrop) backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  window.removeCartItem = function (id) {
    Store.removeFromCart(id);
    updateCartBadge();
    openCartDrawer();
  };

  window.clearCartAll = function () {
    if (confirm('ต้องการล้างสินค้าในตะกร้าทั้งหมดหรือไม่?')) {
      Store.clearCart();
      updateCartBadge();
      openCartDrawer();
    }
  };

  // ── Checkout Modal ───────────────────────────────────────────
  window.openCheckoutModal = function () {
    closeCartDrawer();
    const cart = Store.getCart();
    if (cart.length === 0) {
      alert('กรุณาเลือกสินค้าใส่ตะกร้าก่อนนะคะ');
      return;
    }

    const s = Store.getSettings();
    const modal = $('checkoutModal');
    const content = $('checkoutModalContent');
    if (!modal || !content) return;

    let total = 0;
    cart.forEach(i => total += (Number(i.price) || 0));

    content.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-light); padding-bottom: 0.85rem;">
        <h3 style="font-size: 1.25rem; margin: 0; color: var(--text);">ชำระเงิน & สั่งซื้อสินค้า</h3>
        <button type="button" onclick="closeCheckoutModal()" style="background: none; border: none; font-size: 1.3rem; cursor: pointer; color: var(--text-muted);">✕</button>
      </div>

      <!-- Summary -->
      <div style="background: var(--surface-alt); border-radius: var(--radius-md); padding: 1rem; margin-bottom: 1.25rem; border: 1px solid var(--border-light);">
        <div style="font-size: 0.85rem; font-weight: 600; color: var(--text-muted); margin-bottom: 0.4rem;">รายการสินค้าที่จะสั่งซื้อ:</div>
        <div style="font-size: 0.9rem; line-height: 1.6; margin-bottom: 0.65rem;">
          ${cart.map(i => `• <strong>${escapeHTML(i.name)}</strong> — ฿${Number(i.price || 0).toLocaleString()}`).join('<br>')}
        </div>
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-top: 1px dashed var(--border); padding-top: 0.5rem;">
          <span style="font-weight: 700;">ยอดชำระทั้งหมด:</span>
          <span style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 700; color: var(--primary-deep);">฿${total.toLocaleString()}</span>
        </div>
      </div>

      <!-- Payment QR & Bank -->
      <div style="background: #ffffff; border: 1px solid var(--border); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.5rem; text-align: center;">
        <div style="font-weight: 700; color: var(--primary-deep); margin-bottom: 0.25rem;">สแกน QR Code พร้อมเพย์เพื่อชำระเงิน</div>
        <small style="color: var(--text-muted); display: block; margin-bottom: 0.75rem;">
          ${escapeHTML(s.bankName || 'ธนาคารกสิกรไทย')} | บัญชี: <strong>${escapeHTML(s.bankAccount || '123-4-56789-0')}</strong> (${escapeHTML(s.bankAccountName || s.shopName)})
        </small>
        <img src="${escapeHTML(s.promptpayQrUrl || 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=0812345678')}" style="max-width: 180px; border-radius: 8px; border: 1px solid var(--border-light); padding: 0.4rem; display: block; margin: 0 auto;" alt="PromptPay QR">
      </div>

      <!-- Form -->
      <form onsubmit="handleMultiCheckoutSubmit(event)">
        <div class="form-group">
          <label class="form-label">ชื่อผู้สั่งซื้อ <span style="color: var(--primary);">*</span></label>
          <input type="text" id="chkCustName" class="form-input" placeholder="ชื่อ-นามสกุล หรือชื่อเล่น" required>
        </div>
        <div class="form-group">
          <label class="form-label">Gmail สำหรับรับสิทธิ์ Google Drive <span style="color: var(--primary);">*</span></label>
          <input type="email" id="chkCustGmail" class="form-input" placeholder="example@gmail.com" required>
          <small style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-top: 0.2rem;">ระบบจะแชร์และดึงเมลล์นี้เข้าโฟลเดอร์ Google Drive ทันที</small>
        </div>
        <div class="form-group">
          <label class="form-label">LINE ID สำหรับแจ้งเตือน</label>
          <input type="text" id="chkCustLine" class="form-input" placeholder="ไอดีไลน์ของคุณ">
        </div>
        <div class="form-group" style="margin-bottom: 1.5rem;">
          <label class="form-label">แนบสลิปการโอนเงิน (ถ้ามี)</label>
          <input type="file" id="chkSlipInput" accept="image/*" class="form-input" onchange="previewSlipImage(event)">
          <small style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-top: 0.2rem;">แนบสลิปที่นี่ หรือแจ้งโอนทาง LINE ร้านภายหลังได้ค่ะ</small>
          <div id="chkSlipPreviewWrap" style="display: none; text-align: center; margin-top: 0.5rem;">
            <img id="chkSlipPreviewImg" src="" style="max-height: 180px; border-radius: 6px; border: 1px solid var(--border);">
          </div>
        </div>

        <div style="display: flex; gap: 0.75rem; justify-content: flex-end;">
          <button type="button" class="btn btn-outline" onclick="closeCheckoutModal()">ยกเลิก</button>
          <button type="submit" class="btn btn-primary" id="btnSubmitOrder">ยืนยันการชำระเงิน & ส่งคำสั่งซื้อ ➔</button>
        </div>
      </form>
    `;

    modal.classList.add('is-active');
  };

  window.closeCheckoutModal = function () {
    const modal = $('checkoutModal');
    if (modal) modal.classList.remove('is-active');
  };

  window.previewSlipImage = function (e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (evt) {
      const wrap = $('chkSlipPreviewWrap');
      const img = $('chkSlipPreviewImg');
      if (wrap && img) {
        img.src = evt.target.result;
        wrap.style.display = 'block';
      }
    };
    reader.readAsDataURL(file);
  };

  window.handleMultiCheckoutSubmit = function (e) {
    e.preventDefault();
    const cart = Store.getCart();
    if (cart.length === 0) return;

    const btn = $('btnSubmitOrder');
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'กำลังบันทึกคำสั่งซื้อ...';
    }

    try {
      const slipImg = $('chkSlipPreviewImg') ? $('chkSlipPreviewImg').src : '';
      const custInfo = {
        customer_name: $('chkCustName').value.trim(),
        gmail: $('chkCustGmail').value.trim(),
        line_id: $('chkCustLine').value.trim()
      };
      const payInfo = {
        slip_image_url: slipImg
      };

      const result = Store.checkoutMultiItems(cart, custInfo, payInfo);

      if (btn) {
        btn.disabled = false;
        btn.textContent = 'ยืนยันการชำระเงิน & ส่งคำสั่งซื้อ ➔';
      }
      closeCheckoutModal();

      alert(`สั่งซื้อสำเร็จเรียบร้อยค่ะ!\nหมายเลขออเดอร์ของคุณคือ #${result.order.order_number}\nแอดมินจะตรวจสอบสลิปและดำเนินการส่งมอบสิทธิ์ให้อย่างรวดเร็วค่ะ`);
      window.location.hash = 'orders';
    } catch (err) {
      alert('เกิดข้อผิดพลาด: ' + err.message);
      if (btn) {
        btn.disabled = false;
        btn.textContent = 'ยืนยันการชำระเงิน & ส่งคำสั่งซื้อ ➔';
      }
    }
  };

  // ── Modals & Stories ─────────────────────────────────────────
  function setupModals() {
    // Story Modal
    const storyModal = document.createElement('div');
    storyModal.id = 'storyViewerModal';
    storyModal.className = 'modal-overlay';
    storyModal.innerHTML = `
      <div style="position: relative; max-width: 420px; width: 100%; height: 85vh; max-height: 720px; background: #000; border-radius: 20px; overflow: hidden; display: flex; flex-direction: column;">
        <button onclick="closeStoryModal()" style="position: absolute; top: 16px; right: 16px; z-index: 10; background: rgba(0,0,0,0.5); color: #fff; border: none; width: 36px; height: 36px; border-radius: 50%; font-size: 1.2rem; cursor: pointer;">✕</button>
        <div id="storyProgressBars" style="display: flex; gap: 4px; padding: 12px; position: absolute; top: 0; left: 0; right: 0; z-index: 5;"></div>
        <img id="storyViewerImg" src="" style="width: 100%; height: 100%; object-fit: cover;">
        <div id="storyViewerCaption" style="position: absolute; bottom: 0; left: 0; right: 0; padding: 2rem 1.5rem 1.5rem; background: linear-gradient(transparent, rgba(0,0,0,0.85)); color: #fff;">
          <h3 id="storyViewerTitle" style="color: #fff; margin: 0 0 0.25rem;"></h3>
          <p id="storyViewerDay" style="font-size: 0.85rem; color: #ddd; margin: 0;"></p>
        </div>
      </div>
    `;
    document.body.appendChild(storyModal);

    // Lightbox Modal
    const lightboxModal = document.createElement('div');
    lightboxModal.id = 'lightboxModal';
    lightboxModal.className = 'modal-overlay';
    lightboxModal.onclick = (e) => { if (e.target === lightboxModal) lightboxModal.classList.remove('is-active'); };
    lightboxModal.innerHTML = `
      <div style="position: relative; max-width: 90vw; max-height: 90vh;">
        <button onclick="document.getElementById('lightboxModal').classList.remove('is-active')" style="position: absolute; top: -45px; right: 0; background: none; border: none; color: #fff; font-size: 2rem; cursor: pointer;">✕</button>
        <img id="lightboxImg" src="" style="max-width: 100%; max-height: 85vh; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.5); display: block;">
      </div>
    `;
    document.body.appendChild(lightboxModal);

    // Checkout Modal
    const checkoutModal = document.createElement('div');
    checkoutModal.id = 'checkoutModal';
    checkoutModal.className = 'modal-overlay';
    checkoutModal.innerHTML = `<div class="modal-box" id="checkoutModalContent"></div>`;
    document.body.appendChild(checkoutModal);

    // Review Modal
    const reviewModal = document.createElement('div');
    reviewModal.id = 'reviewModal';
    reviewModal.className = 'modal-overlay';
    reviewModal.innerHTML = `
      <div class="modal-box">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <h3 style="margin: 0;">เขียนรีวิวให้ร้านค้า</h3>
          <button onclick="closeReviewModal()" style="background: none; border: none; font-size: 1.3rem; cursor: pointer;">✕</button>
        </div>
        <form onsubmit="submitCustomerReview(event)">
          <div class="form-group">
            <label class="form-label">ชื่อของคุณ</label>
            <input type="text" id="revCustName" class="form-input" placeholder="ชื่อหรือชื่อเล่น" required>
          </div>
          <div class="form-group">
            <label class="form-label">ให้คะแนน (ดาว)</label>
            <select id="revRating" class="form-select">
              <option value="5">★★★★★ (5 ดาว - ประทับใจมาก)</option>
              <option value="4">★★★★☆ (4 ดาว - ดีมาก)</option>
              <option value="3">★★★☆☆ (3 ดาว - ปานกลาง)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">ข้อความรีวิว</label>
            <textarea id="revMsg" class="form-textarea" rows="4" placeholder="บอกความประทับใจเกี่ยวกับผลงานหรือบริการ..." required></textarea>
          </div>
          <div style="text-align: right;">
            <button type="submit" class="btn btn-primary">ส่งรีวิว ➔</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(reviewModal);
  }

  window.openStoryModal = function (index) {
    const s = Store.getSettings();
    const highlights = s.highlights || [];
    if (highlights.length === 0) return;

    state.activeStoryIndex = index;
    const story = highlights[index] || highlights[0];
    const modal = $('storyViewerModal');
    const img = $('storyViewerImg');
    const title = $('storyViewerTitle');
    const day = $('storyViewerDay');

    if (modal && img && title && day) {
      img.src = story.image || story.img || '';
      title.textContent = story.title || '';
      day.textContent = story.day || story.date || 'วันนี้';
      modal.classList.add('is-active');
    }
  };

  window.closeStoryModal = function () {
    const modal = $('storyViewerModal');
    if (modal) modal.classList.remove('is-active');
  };

  window.submitCustomerReview = function (e) {
    e.preventDefault();
    const name = $('revCustName').value.trim();
    const rating = Number($('revRating').value) || 5;
    const msg = $('revMsg').value.trim();

    Store.createReview({
      customer_name: name,
      rating: rating,
      message: msg,
      status: 'APPROVED'
    });

    closeReviewModal();
    alert('ขอบคุณสำหรับรีวิวนะคะ! รีวิวของคุณถูกบันทึกเรียบร้อยค่ะ');
    renderCurrentView();
  };

  // ── Run upon DOM load ────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', initApp);

})();
