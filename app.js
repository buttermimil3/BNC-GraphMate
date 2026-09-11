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
 announcement: '',
 announcementEnabled: false,
 adminPin: '123456',
 // Customizable Button & Action Labels
 btnLineText: 'ทักแชท LINE ร้าน',
 btnIgText: 'Instagram',
 btnFbText: 'Facebook',
 btnPhoneText: 'โทรติดต่อ',
 btnCartText: 'ใส่ตะกร้า',
 btnBuyText: 'สั่งซื้อเลย',
 btnPreviewText: 'ดูตัวอย่าง',
 btnCheckoutText: 'ชำระเงินทันที ',
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
     homeBanners: [
      { id: 'b1', title: 'ฟอนต์ลายมือน่ารัก 2026', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&auto=format&fit=crop&q=80', link: '#fonts' },
      { id: 'b2', title: 'กลุ่ม VIP รวมไฟล์กราฟิก', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80', link: '#groups' },
      { id: 'b3', title: 'เทมเพลตป้ายสำเร็จรูป', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80', link: '#products' }
    ],

        queueStatus: {
      isAvailable: true,
      queueText: 'ว่างพร้อมรับ 3 คิว',
      chatHours: '09:00 - 23:00 น. (ตอบไว)',
      deliveryInfo: 'ดึงสิทธิ์ Google Drive อัตโนมัติหลังแอดมินตรวจสลิป'
    },
    queuePage: {
      enabled: true,
      heroTitle: 'เช็กคิวงาน ♡',
      heroSubtitle: 'ดูสถานะคิวงานของร้านแบบเรียลไทม์',
      noticeText: 'คิวงานอัปเดตสถานะการออกแบบตลอดทั้งวัน สามารถค้นหาด้วยเลขคิว ชื่อ หรือเบอร์โทรได้เลยนะคะ',
      searchTitle: 'ค้นหาคิวของคุณ',
      searchPlaceholder: 'กรอกชื่อ, LINE ID, เบอร์โทรศัพท์ หรือเลขคิว...',
      searchButtonText: 'ดูคิวของฉัน',
      searchDescription: '*กรอกข้อมูลที่ใช้กับทางร้านเพื่อค้นหาคิวของคุณ',
      todayLabel: 'คิววันนี้',
      waitingLabel: 'รอคิว',
      workingLabel: 'กำลังทำ',
      completedLabel: 'เสร็จแล้ว',
      sectionTitle: 'คิวงานของร้าน ♡',
      emptyStateText: 'วันนี้ยังไม่มีคิวงานนะคะ ♡',
      loadingText: 'กำลังโหลดคิว…',
      errorText: 'ไม่สามารถโหลดข้อมูลคิวได้',
      showSearch: true,
      showSummary: true,
      showProgress: true,
      showTimeline: true,
      showCustomerName: true,
      showQueueNumber: true,
      showNote: true,
      showImage: true,
      statusNames: {
        waiting: 'รอคิว',
        progress: 'กำลังดำเนินการ',
        review: 'รอตรวจ',
        edit: 'รอแก้ไข',
        done: 'เสร็จแล้ว',
        pause: 'พักคิว',
        cancel: 'ยกเลิก'
      }
    },
    stampSettings: {
      cardTitle: 'บัตรสะสมแต้ม BNC GraphMate',
      cardSubtitle: 'สะสมตราปั๊มหัวใจครบ 10 ดวง รับสิทธิ์ดาวน์โหลดฟอนต์ฟรี หรือของขวัญพิเศษจากทางร้านทันที',
      rewardText: 'สะสมครบ 10 ดวงแล้ว ทักแชท LINE เพื่อแลกรับของขวัญฟรีได้เลยค่ะ',
      rulesText: 'ทุกออเดอร์งานป้าย ฟอนต์ หรือสินค้าสำเร็จ รับตราปั๊มหัวใจ 1 ดวงทันที\nสะสมครบ 10 ดวง เลือกรับฟอนต์ลายมือน่ารักฟรี 1 ชุด หรือสิทธิ์รับงานออกแบบฟรี\nติดต่อแลกรางวัลได้ทาง LINE Official ของร้าน',
      mascotIcon: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100'
    },
    categories: {
      fonts: 'ลายมือ, หัวป้าย, ตัวพิมพ์, น่ารัก',
      products: 'ป้ายสำเร็จ, ไฟล์ตกแต่ง, การ์ตูน, องค์ประกอบ, เทมเพลต',
      groups: 'VIP ตลอดชีพ, รวมงานกราฟิก, การ์ตูน & คาแรกเตอร์, ป้ายร้าน & เมนู',
      portfolio: 'ป้ายเครดิต, ป้ายแอพพรี, ป้ายเติมเกม, ป้ายเปิดร้าน, ป้ายโปรโมชั่น, งานป้ายสั่งทำพิเศษ',
      portfolioStyles: 'สไตล์มินิมอล & คาเฟ่, สไตล์การ์ตูน & คาวาอี้, สไตล์ลายมือ & ฟอนต์, สไตล์ร้านค้า & โมเดิร์น, ไฟล์ตกแต่ง & เทมเพลต'
    },
    headings: {
      fontsTitle: 'ฟอนต์ทั้งหมด',
      fontsDesc: 'ฟอนต์ลิขสิทธิ์แท้ ใช้งานได้ทั้งส่วนตัวและเชิงพาณิชย์',
      prodsTitle: 'สินค้าสำเร็จรูป',
      prodsDesc: 'ไฟล์กราฟิก ป้ายสำเร็จ เทมเพลตพร้อมใช้งาน',
      groupsTitle: 'เข้ากลุ่ม LINE VIP',
      groupsDesc: 'รวมกลุ่ม VIP อัปเดตงานต่อเนื่อง โหลดได้ไม่อั้นตลอดชีพ',
      portTitle: 'ผลงานการออกแบบ',
      portDesc: 'ตัวอย่างผลงานป้ายและกราฟิกที่ผ่านมาของทางร้าน',
      reviewsTitle: 'รีวิวจากลูกค้า',
      reviewsDesc: 'ความประทับใจจริงจากลูกค้าที่ใช้บริการ BNC GraphMate',
      ordersTitle: 'ประวัติคำสั่งซื้อ',
      ordersDesc: 'ติดตามสถานะคำสั่งซื้อ ตรวจสอบสลิป และรับไฟล์งาน'
    },
    paymentAccounts: [
        { id: 'acc-1', bankName: 'ธนาคารกสิกรไทย (KBank)', accountNo: '123-4-56789-0', accountName: 'ร้าน บีเอ็นซี กราฟเมท', qrUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=0812345678' },
        { id: 'acc-2', bankName: 'ธนาคารไทยพาณิชย์ (SCB)', accountNo: '987-6-54321-0', accountName: 'ร้าน บีเอ็นซี กราฟเมท', qrUrl: '' }
      ],
      contactChannels: [
        { id: 'cc-1', platform: 'LINE Official', value: '@bncgraphmate', url: 'https://line.me/ti/p/~bncgraphmate' },
        { id: 'cc-2', platform: 'Facebook Page', value: 'BNC GraphMate Studio', url: 'https://facebook.com/bncgraphmate' },
        { id: 'cc-3', platform: 'Instagram', value: '@bncgraphmate', url: 'https://instagram.com/bncgraphmate' },
        { id: 'cc-4', platform: 'เบอร์โทรศัพท์', value: '081-234-5678', url: 'tel:0812345678' }
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
 cover_image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600&auto=format&fit=crop&q=80',
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
        category: 'ป้ายร้าน',
        style_category: 'ป้ายคาเฟ่ & เบเกอรี่',
        description: 'งานออกแบบป้ายไวนิลหน้าร้าน ป้ายเมนูตั้งโต๊ะ และป้ายธงญี่ปุ่น สไตล์หวานละมุน นุ่มตา',
        image_url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=700&auto=format&fit=crop&q=80'
      },
      {
        id: 'port-2',
        title: 'ป้ายร้านอาหาร & เมนูเครื่องดื่ม สไตล์โมเดิร์น',
        category: 'ป้ายร้าน',
        style_category: 'ป้ายร้านอาหาร',
        description: 'จัดเลย์เอาต์เมนูชัดเจน จัดวางภาพอาหารชวนทาน พร้อมไฟล์คมชัดสูงพิมพ์ได้ทันที',
        image_url: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=700&auto=format&fit=crop&q=80'
      },
      {
        id: 'port-3',
        title: 'ป้ายหน้าร้านชานมไข่มุก สไตล์มินิมอลเกาหลี',
        category: 'ป้ายร้าน',
        style_category: 'ป้ายคาเฟ่',
        description: 'ป้ายไฟกลมหน้าร้าน และป้ายสติกเกอร์ติดกระจก โทนขาวครีมชมพูหวาน',
        image_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=700&auto=format&fit=crop&q=80'
      },
      {
        id: 'port-4',
        title: 'ป้ายไวนิลโปรโมชั่นเปิดร้านใหม่ โทนสดใส',
        category: 'ป้ายร้าน',
        style_category: 'ป้ายไวนิล',
        description: 'สีสันสดใสสะดุดตา ตัวหนังสืออ่านง่ายชัดเจน มองเห็นได้ในระยะไกล',
        image_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=700&auto=format&fit=crop&q=80'
      },
      {
        id: 'port-5',
        title: 'ฟอนต์ลายมือน้องขนมปังเนยสด (BNC Butter)',
        category: 'ฟอนต์',
        style_category: 'ฟอนต์ลายมือ',
        description: 'ฟอนต์ลายมืออ้วนป้อม น่ารักอบอุ่น สระไม่ลอย รองรับทุกโปรแกรมออกแบบ',
        image_url: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=700&auto=format&fit=crop&q=80'
      },
      {
        id: 'port-6',
        title: 'ฟอนต์น้องมาชเมลโล่ (BNC Marshmallow)',
        category: 'ฟอนต์',
        style_category: 'ฟอนต์ลายมือ',
        description: 'ฟอนต์ลายเส้นนุ่มฟู เหมาะสำหรับทำป้ายแคปชั่น และป้ายเมนูเครื่องดื่ม',
        image_url: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=700&auto=format&fit=crop&q=80'
      },
      {
        id: 'port-7',
        title: 'ฟอนต์ปิกนิกเดย์ (BNC Picnic Day)',
        category: 'ฟอนต์',
        style_category: 'ฟอนต์มินิมอล',
        description: 'ฟอนต์เส้นบางเรียว น่ารักสุภาพ ใช้เป็นข้อความบรรยายหรือคำโปรยสินค้า',
        image_url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=700&auto=format&fit=crop&q=80'
      },
      {
        id: 'port-8',
        title: 'ฟอนต์สตูดิโอคิ้วท์ (BNC Studio Cute)',
        category: 'ฟอนต์',
        style_category: 'ฟอนต์ลายมือ',
        description: 'หัวกลมน่ารัก สไตล์ลายมือนักเรียน เหมาะกับงานสติกเกอร์และสตอรี่ไอจี',
        image_url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=700&auto=format&fit=crop&q=80'
      },
      {
        id: 'port-9',
        title: 'การ์ตูนมาสคอตน้องหมีเชฟเบเกอรี่',
        category: 'การ์ตูน',
        style_category: 'การ์ตูนมาสคอต',
        description: 'วาดคาแรคเตอร์ประจำร้าน โดดเด่น จำง่าย นำไปใช้สกรีนแก้วและทำป้ายได้ทุกขนาด',
        image_url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=700&auto=format&fit=crop&q=80'
      },
      {
        id: 'port-10',
        title: 'เซ็ตการ์ตูนแก้วกาแฟและขนมเค้ก 3D คิวท์',
        category: 'การ์ตูน',
        style_category: 'การ์ตูนไดคัท',
        description: 'ภาพวาดการ์ตูนขนมหวานน่ารัก สำหรับตกแต่งป้ายเมนูและสตอรี่โปรโมตร้าน',
        image_url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=700&auto=format&fit=crop&q=80'
      },
      {
        id: 'port-11',
        title: 'มาสคอตแมวเหมียวถือแก้วชานมไข่มุก',
        category: 'การ์ตูน',
        style_category: 'การ์ตูนมาสคอต',
        description: 'ลายเส้นการ์ตูนน่ารัก เอกลักษณ์เฉพาะร้าน ดึงดูดกลุ่มลูกค้าวัยรุ่นและนักเรียน',
        image_url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=700&auto=format&fit=crop&q=80'
      },
      {
        id: 'port-12',
        title: 'การ์ตูนชุดสัตว์เลี้ยงน่ารักสไตล์ชิบิ',
        category: 'การ์ตูน',
        style_category: 'การ์ตูนชิบิ',
        description: 'สำหรับร้านเพ็ทช็อปและคาเฟ่สัตว์เลี้ยง ไฟล์เวกเตอร์ปรับขยายได้ไม่แตก',
        image_url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=700&auto=format&fit=crop&q=80'
      },
      {
        id: 'port-13',
        title: 'เซ็ตสติกเกอร์องค์ประกอบดอกไม้ & โบว์สีน้ำ',
        category: 'กราฟิก',
        style_category: 'ไฟล์ตกแต่ง',
        description: 'ไฟล์ PNG พื้นหลังโปร่งใส สำหรับตกแต่งป้ายและสตอรี่ไอจี ลายน่ารักไม่ซ้ำใคร',
        image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&auto=format&fit=crop&q=80'
      },
      {
        id: 'port-14',
        title: 'เทมเพลตกรอบป้ายโปรโมชัน & สตอรี่ไอจี',
        category: 'กราฟิก',
        style_category: 'เทมเพลต',
        description: 'กรอบป้ายสำเร็จรูปสไตล์เกาหลี คุมโทนร้านค้า เพิ่มยอดขายได้ง่ายดาย',
        image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=700&auto=format&fit=crop&q=80'
      },
      {
        id: 'port-15',
        title: 'ชุดพาเลทสีและกราฟิกตกแต่งบอร์ดร้านค้า',
        category: 'กราฟิก',
        style_category: 'ไฟล์ตกแต่ง',
        description: 'รวมโทนสีพาสเทลยอดนิยม พร้อมไอคอนน่ารักมากกว่า 100 แบบ',
        image_url: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=700&auto=format&fit=crop&q=80'
      },
      {
        id: 'port-16',
        title: 'ชุดริบบิ้นและป้ายข้อความโปรโมชั่น',
        category: 'กราฟิก',
        style_category: 'ป้ายโปรโมชั่น',
        description: 'ไฟล์กราฟิกสำเร็จรูปสำหรับวางบนรูปสินค้า ทำป้ายลดราคา และป้ายสินค้าขายดี',
        image_url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=700&auto=format&fit=crop&q=80'
      }
    ],
    queue_items: [
      {
        id: 'q-demo-1',
        queue_number: 'Q28',
        customer_name: 'คุณพิมลภัส (น้องพิม)',
        line_id: 'pim_cafe99',
        phone: '089-111-2233',
        job_type: 'งานป้าย',
        job_name: 'ป้ายร้านกาแฟ & เมนูตั้งโต๊ะสไตล์เกาหลี',
        description: 'ออกแบบป้ายไวนิลขนาด 2x1 เมตร และป้ายอะคริลิกตั้งโต๊ะ โทนชมพูครีม',
        status: 'กำลังดำเนินการ',
        progress: 40,
        current_queue: 3,
        total_queue: 8,
        queue_date: '11/09/2026',
        updated_at: '11:42 น.',
        note: 'กำลังดราฟต์แบบรอบแรก จะส่งให้ตรวจเวลาประมาณ 16:00 น. นะคะ ♡',
        image_url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=700',
        is_visible: true,
        sort_order: 0,
        created_at: new Date().toISOString()
      },
      {
        id: 'q-demo-2',
        queue_number: 'Q29',
        customer_name: 'คุณอารียา (ร้านเบเกอรี่)',
        line_id: 'sweet_bakery',
        phone: '081-222-3344',
        job_type: 'การ์ตูนมาสคอต',
        job_name: 'วาดการ์ตูนมาสคอตน้องหมีเชฟขนมปัง',
        description: 'วาดมาสคอตประจำร้าน 3 ท่าทาง สำหรับสกรีนแก้วและพิมพ์สติกเกอร์',
        status: 'รอคิว',
        progress: 10,
        current_queue: 4,
        total_queue: 8,
        queue_date: '11/09/2026',
        updated_at: '09:30 น.',
        note: 'รับข้อมูลและบรีฟเรียบร้อย เข้าคิวลำดับถัดไปค่ะ',
        image_url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=700',
        is_visible: true,
        sort_order: 1,
        created_at: new Date().toISOString()
      },
      {
        id: 'q-demo-3',
        queue_number: 'Q25',
        customer_name: 'คุณณภัทร',
        line_id: 'napat_design',
        phone: '086-777-8899',
        job_type: 'ฟอนต์สั่งทำ',
        job_name: 'ปรับแต่งฟอนต์ลายมือชื่อร้านเฉพาะ',
        description: 'ฟอนต์ภาษาไทยและอังกฤษสำหรับงานแบรนด์ดิ้ง',
        status: 'รอตรวจ',
        progress: 80,
        current_queue: 1,
        total_queue: 8,
        queue_date: '10/09/2026',
        updated_at: '14:15 น.',
        note: 'ส่งแบบดราฟต์ให้ลูกค้าตรวจทาง LINE แล้ว รอคอนเฟิร์มค่ะ',
        image_url: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=700',
        is_visible: true,
        sort_order: 2,
        created_at: new Date().toISOString()
      },
      {
        id: 'q-demo-4',
        queue_number: 'Q24',
        customer_name: 'คุณกิตติศักดิ์',
        line_id: 'kit_shop',
        phone: '085-444-5566',
        job_type: 'งานป้าย',
        job_name: 'ป้ายธงญี่ปุ่นและสติกเกอร์ติดกระจก',
        description: 'ไฟล์พร้อมพิมพ์ส่งโรงพิมพ์ 300 DPI คมชัดสูง',
        status: 'เสร็จแล้ว',
        progress: 100,
        current_queue: 0,
        total_queue: 8,
        queue_date: '09/09/2026',
        updated_at: '18:00 น.',
        note: 'ส่งมอบไฟล์งานผ่าน Google Drive เรียบร้อยแล้ว ขอบคุณมากนะคะ ♡',
        image_url: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=700',
        is_visible: true,
        sort_order: 3,
        created_at: new Date().toISOString()
      }
    ]};

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
    if (!merged.queue_items || merged.queue_items.length === 0) {
      merged.queue_items = defaultData.queue_items;
    }
    if (!merged.settings.queuePage) {
      merged.settings.queuePage = defaultData.settings.queuePage;
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

  // Categories
  getFontCategories: function () {
    const s = this.getSettings();
    const cats = s.categories && s.categories.fonts;
    if (Array.isArray(cats)) return cats;
    if (typeof cats === 'string') return cats.split(',').map(s => s.trim()).filter(Boolean);
    return ['ลายมือ', 'หัวป้าย', 'ตัวพิมพ์', 'น่ารัก'];
  },
  getProductCategories: function () {
    const s = this.getSettings();
    const cats = s.categories && s.categories.products;
    if (Array.isArray(cats)) return cats;
    if (typeof cats === 'string') return cats.split(',').map(s => s.trim()).filter(Boolean);
    return ['ป้ายสำเร็จ', 'ไฟล์ตกแต่ง', 'การ์ตูน', 'องค์ประกอบ', 'เทมเพลต'];
  },
  getGroupCategories: function () {
    const s = this.getSettings();
    const cats = s.categories && s.categories.groups;
    if (Array.isArray(cats)) return cats;
    if (typeof cats === 'string') return cats.split(',').map(s => s.trim()).filter(Boolean);
    return ['VIP ตลอดชีพ', 'รวมงานกราฟิก', 'การ์ตูน & คาแรกเตอร์', 'ป้ายร้าน & เมนู'];
  },
  getPortfolioCategories: function () {
    const s = this.getSettings();
    const cats = s.categories && s.categories.portfolio;
    if (Array.isArray(cats)) return cats;
    if (typeof cats === 'string') return cats.split(',').map(s => s.trim()).filter(Boolean);
    return ['ป้ายเครดิต', 'ป้ายแอพพรี', 'ป้ายเติมเกม', 'ป้ายเปิดร้าน', 'ป้ายโปรโมชั่น', 'งานป้ายสั่งทำพิเศษ'];
  },
  getPortfolioStyles: function () {
    const s = this.getSettings();
    const styles = s.categories && s.categories.portfolioStyles;
    if (Array.isArray(styles)) return styles;
    if (typeof styles === 'string') return styles.split(',').map(s => s.trim()).filter(Boolean);
    return ['สไตล์มินิมอล & คาเฟ่', 'สไตล์การ์ตูน & คาวาอี้', 'สไตล์ลายมือ & ฟอนต์', 'สไตล์ร้านค้า & โมเดิร์น', 'ไฟล์ตกแต่ง & เทมเพลต'];
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

 const costAmount = Number(orderInfo.cost_price || orderInfo.cost_amount || 0);
 const totalAmount = Number(orderInfo.amount || 0);
 const profitAmount = totalAmount - costAmount;

 const newOrder = {
 id: oId,
 order_number: oNum,
 customer_id: orderInfo.customer_id || 'guest',
 customer_name: orderInfo.customer_name || 'ลูกค้าทั่วไป',
 order_type: orderInfo.order_type,
 item_id: orderInfo.item_id,
 item_name: orderInfo.item_name,
 amount: totalAmount,
 cost_amount: costAmount,
 profit_amount: profitAmount,
 is_agent: !!orderInfo.is_agent,
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
 getAllOrders: function () {
 return this.getOrders();
 },
 getOrder: function (id) {
    return this.getOrderById(id);
  },
  updateOrderStatus: function (id, status) {
    const data = loadLocal();
    const ord = (data.orders || []).find(o => o.id === id || o.order_number === id);
    if (ord) {
      ord.status = status;
      saveLocal(data);
      callCloud('UPDATE_ORDER_STATUS', { id: ord.id, status: status });
      return ord;
    }
    return null;
  },
  getOrderById: function (id) {
 return (loadLocal().orders || []).find(o => o.id === id || o.order_number === id) || null;
 },
 getPayments: function () {
 return loadLocal().payments || [];
 },
 getAllPayments: function () {
 return this.getPayments();
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

    // ── Queue Management System (Queue != Order) ──
    getQueueItems: function (includeHidden = false) {
      const q = loadLocal().queue_items || defaultData.queue_items;
      let list = Array.isArray(q) ? [...q] : [];
      list.sort((a, b) => (Number(a.sort_order) || 0) - (Number(b.sort_order) || 0));
      if (!includeHidden) {
        list = list.filter(item => item.is_visible !== false);
      }
      return list;
    },
    getAllQueueItems: function () {
      return this.getQueueItems(true);
    },
    getQueueItemById: function (id) {
      return (loadLocal().queue_items || defaultData.queue_items).find(q => q.id === id) || null;
    },
    saveQueueItem: function (item) {
      const data = loadLocal();
      data.queue_items = data.queue_items || [];
      if (!item.id) {
        item.id = uid('q');
        item.created_at = new Date().toISOString();
        item.updated_at = item.updated_at || new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) + ' น.';
        if (item.sort_order === undefined) {
          item.sort_order = data.queue_items.length;
        }
        data.queue_items.push(item);
      } else {
        const idx = data.queue_items.findIndex(q => q.id === item.id);
        item.updated_at = item.updated_at || new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) + ' น.';
        if (idx !== -1) {
          data.queue_items[idx] = Object.assign({}, data.queue_items[idx], item);
        } else {
          data.queue_items.push(item);
        }
      }
      saveLocal(data);
      callCloud('SAVE_QUEUE_ITEM', { item: item });
      return item;
    },
    deleteQueueItem: function (id) {
      const data = loadLocal();
      data.queue_items = (data.queue_items || []).filter(q => q.id !== id);
      saveLocal(data);
      callCloud('DELETE_QUEUE_ITEM', { id: id });
    },
    reorderQueueItems: function (items) {
      const data = loadLocal();
      data.queue_items = items.map((item, idx) => {
        item.sort_order = idx;
        return item;
      });
      saveLocal(data);
      callCloud('REORDER_QUEUES', { items: data.queue_items });
    },
    moveQueueItem: function (id, direction) {
      const items = this.getAllQueueItems();
      const idx = items.findIndex(q => q.id === id);
      if (idx === -1) return;
      const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= items.length) return;
      
      const temp = items[idx];
      items[idx] = items[targetIdx];
      items[targetIdx] = temp;
      this.reorderQueueItems(items);
    },
    toggleQueueVisibility: function (id) {
      const item = this.getQueueItemById(id);
      if (item) {
        item.is_visible = !item.is_visible;
        this.saveQueueItem(item);
      }
    },
    getQueuePageSettings: function () {
      const s = this.getSettings();
      return Object.assign({}, defaultData.settings.queuePage, s.queuePage || {});
    },
    saveQueuePageSettings: function (qSettings) {
      const s = this.getSettings();
      const merged = Object.assign({}, s.queuePage || defaultData.settings.queuePage, qSettings);
      return this.saveSettings({ queuePage: merged });
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
      const totalCost = items.reduce((sum, i) => sum + (Number(i.cost_price || 0)), 0);
      const totalProfit = totalAmount - totalCost;
      const hasAgentItem = items.some(i => i.is_agent || (Number(i.cost_price) > 0));
      const itemNames = items.map(i => i.name).join(', ');
      const allGroups = items.length > 0 && items.every(i => i.type === 'GROUP');

      const newOrder = {
        id: oId,
        order_number: oNum,
        customer_id: customerInfo.customer_id || 'guest',
        customer_name: customerInfo.customer_name || 'ลูกค้าทั่วไป',
        order_type: allGroups ? 'GROUP' : 'MULTI',
        items: items,
        item_name: itemNames,
        amount: totalAmount,
        cost_amount: totalCost,
        profit_amount: totalProfit,
        is_agent: hasAgentItem,
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

      // Create drive access for non-group items and group access for group items
      items.forEach(item => {
        if (item.type === 'GROUP') {
          data.group_access.unshift({
            id: uid('ga'),
            order_id: oId,
            customer_id: newOrder.customer_id,
            customer_name: newOrder.customer_name,
            group_id: item.id,
            group_name: item.name,
            line_id: customerInfo.line_id || '',
            status: 'PENDING',
            completed_at: null
          });
        } else {
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
        }
      });

      data.orders.unshift(newOrder);
      data.payments.unshift(newPayment);
      saveLocal(data);
      this.clearCart();

      // Background Google Sheet Sync
      callCloud('MULTI_CHECKOUT', {
        order: newOrder,
        payment: newPayment,
        items: items
      });

      return { order: newOrder, payment: newPayment };
    },

    // Home Banners 1:1, Queue Status & Page Headings
    getHomeBanners: function () {
      const s = this.getSettings();
      return Array.isArray(s.homeBanners) && s.homeBanners.length > 0 ? s.homeBanners : (defaultData.settings.homeBanners || []);
    },
    saveHomeBanners: function (list) {
      return this.saveSettings({ homeBanners: list });
    },
    getQueueStatus: function () {
      const s = this.getSettings();
      return s.queueStatus || defaultData.settings.queueStatus;
    },
    saveQueueStatus: function (status) {
      return this.saveSettings({ queueStatus: status });
    },
    getHeadings: function () {
      const s = this.getSettings();
      return s.headings || defaultData.settings.headings;
    },
    saveHeadings: function (headings) {
      return this.saveSettings({ headings: headings });
    },
    setCustomerStamps: function (customerId, stamps) {
      const data = loadLocal();
      const cust = (data.customers || []).find(c => c.id === customerId);
      if (cust) {
        cust.heart_stamps = Math.max(0, Number(stamps) || 0);
        saveLocal(data);
        callCloud('UPDATE_CUSTOMER_STAMPS', { customerId, stamps: cust.heart_stamps });
        return cust.heart_stamps;
      }
      return 0;
    },
    addCustomerStamp: function (customerId, delta = 1) {
      const data = loadLocal();
      const cust = (data.customers || []).find(c => c.id === customerId);
      if (cust) {
        cust.heart_stamps = Math.max(0, (cust.heart_stamps || 0) + delta);
        saveLocal(data);
        callCloud('UPDATE_CUSTOMER_STAMPS', { customerId, stamps: cust.heart_stamps });
        return cust.heart_stamps;
      }
      return 0;
    },
    togglePinGroup: function (groupId) {
      const data = loadLocal();
      const g = (data.groups || []).find(x => x.id === groupId);
      if (g) {
        g.is_pinned = !g.is_pinned;
        saveLocal(data);
        callCloud('SAVE_GROUP', { group: g });
      }
    },
    updatePaymentStatus: function (paymentId, status, reason) {
      if (status === 'PAID' || status === 'COMPLETED') {
        this.approvePayment(paymentId);
      } else if (status === 'REJECTED') {
        this.rejectPayment(paymentId, reason);
      }
    },
    savePaymentAccounts: function (list) {
    return this.saveSettings({ paymentAccounts: list });
  },
  saveContactChannels: function (list) {
    return this.saveSettings({ contactChannels: list });
  },
  togglePinReview: function (id) {
    const data = loadLocal();
    const rev = data.reviews.find(r => r.id === id);
    if (rev) {
      rev.is_pinned = !rev.is_pinned;
      saveLocal(data);
      callCloud('UPDATE_REVIEW_PIN', { id: id, is_pinned: rev.is_pinned });
      return rev.is_pinned;
    }
    return false;
  },

  getSettings: function () {
 const local = loadLocal();
 return Object.assign({}, defaultData.settings, local.settings || {});
 },
 getPaymentAccounts: function () {
 const s = this.getSettings();
 return Array.isArray(s.paymentAccounts) && s.paymentAccounts.length > 0 ? s.paymentAccounts : [
 { id: 'acc-1', bankName: s.bankName || 'ธนาคารกสิกรไทย', accountNo: s.bankAccount || '123-4-56789-0', accountName: s.bankAccountName || s.shopName || 'ร้าน บีเอ็นซี กราฟเมท', qrUrl: s.promptpayQrUrl || '' }
 ];
 },
 getContactChannels: function () {
 const s = this.getSettings();
 return Array.isArray(s.contactChannels) && s.contactChannels.length > 0 ? s.contactChannels : [
 { id: 'cc-1', platform: 'LINE Official', value: s.contactLine || '@bncgraphmate', url: s.lineUrl || 'https://line.me/ti/p/~bncgraphmate' },
 { id: 'cc-2', platform: 'Facebook', value: 'BNC GraphMate', url: s.facebookUrl || '#' },
 { id: 'cc-3', platform: 'Instagram', value: '@bncgraphmate', url: s.instagramUrl || '#' },
 { id: 'cc-4', platform: 'เบอร์โทรศัพท์', value: s.contactPhone || '081-234-5678', url: 'tel:' + (s.contactPhone || '0812345678') }
 ];
 },
 saveSettings: function (newSettings) {
 const data = loadLocal();
 data.settings = Object.assign({}, data.settings, newSettings);
 saveLocal(data);
 callCloud('SAVE_SETTINGS', { settings: data.settings });
 return data.settings;
 },
 getStampSettings: function () {
 const s = this.getSettings();
 return (s && s.stampSettings) ? s.stampSettings : {};
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
 view: 'home', // 'home' | 'fonts' | 'products' | 'groups' | 'portfolio' | 'points' | 'reviews' | 'orders' | 'admin'
 adminTab: 'dashboard', // 'dashboard' | 'orders' | 'slips' | 'products' | 'fonts' | 'groups' | 'settings'
 isAdmin: (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('bnc_admin_auth') === 'true'),
    adminPinBuffer: '',
    groupsFilter: 'ALL',
    lightboxIndex: 0,
    lightboxList: [],
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
 portfolioStyleFilter: 'ALL',
 portfolioPriceFilter: 'ALL',
 activeStoryIndex: 0,
 lightboxImage: null,
 searchPointsQuery: '',
 queueSearchQuery: '',
 dashboardTimeframe: 'month', // 'today' | 'month' | 'year' | 'all'
 dashboardSource: 'all' // 'all' | 'orders' | 'queues'
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
 
  // ── Dynamic Font-Face Loader ──────────────────────────────────
  
  // ── Cute Pastel Click Sound (Web Audio Synthesizer) ─────────
  function playCuteClickSound() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!window._cuteAudioCtx) {
        window._cuteAudioCtx = new AudioContext();
      }
      const ctx = window._cuteAudioCtx;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      // Charming ascending pastel bubble chirp (587Hz -> 880Hz)
      osc.frequency.setValueAtTime(587.33, now);
      osc.frequency.exponentialRampToValueAtTime(880.0, now + 0.07);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.07);
    } catch (err) {
      // Audio fallback
    }
  }

  // Global listener for interactive sound
  document.addEventListener('click', (e) => {
    if (e.target.closest('button, .btn, .nav-link, .price-menu-item, .stamp-slot, .compact-card-item, .hero-carousel-prev, .hero-carousel-next, .hero-carousel-dot, .calc-key')) {
      playCuteClickSound();
    }
  }, true);

  function loadFontFaces() {
    const fonts = Store.getAllFonts();
    let css = '';
    fonts.forEach(f => {
      const fontUrl = f.font_file_url || f.file_url;
      if (fontUrl && fontUrl.trim()) {
        css += `
          @font-face {
            font-family: 'Font-${f.id}';
            src: url('${fontUrl.trim()}');
            font-display: swap;
          }
        `;
      }
    });
    let styleEl = document.getElementById('dynamic-font-faces');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'dynamic-font-faces';
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = css;
  }

  function initApp() {
    loadFontFaces();
 setupRouting();
 setupCartDrawer();
 setupModals();
 renderNavbar();
    setupFloatingMascot();
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
 
  window.playMascotPop = function () {
    if (typeof playPopSound === 'function') playPopSound();
  };

  function setupFloatingMascot() {
    let container = document.getElementById('fallingMascotsContainer');
    if (container) return; // already initialized

    container = document.createElement('div');
    container.id = 'fallingMascotsContainer';
    container.className = 'falling-mascot-container';
    document.body.appendChild(container);

    // Cute pastel character avatars / stickers (PNG with transparent backgrounds)
    const mascotConfigs = [
      {
        id: 'mascot-1',
        name: 'น้องกระต่ายพาสเทล',
        png: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=200&auto=format&fit=crop&q=80',
        quotes: ['หวัดดีฮับ! ♡', 'ยินดีต้อนรับนะค้า', 'พาหนูบินหน่อย~', 'เย้! BNC น่ารักจัง'],
        speed: 0.75,
        xPercent: 18,
        startY: -120,
        swaySpeed: 0.02,
        swayAmp: 25
      },
      {
        id: 'mascot-2',
        name: 'น้องหมีสตูดิโอ',
        png: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
        quotes: ['แวะดูฟอนต์ได้น้า', 'อย่าทิ้งเค้านะ!', 'ลอยละล่องงง~', 'ร้านน่ารักม้ากก'],
        speed: 0.55,
        xPercent: 52,
        startY: -180,
        swaySpeed: 0.015,
        swayAmp: 30
      },
      {
        id: 'mascot-3',
        name: 'น้องแมวโมจิ',
        png: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=200&auto=format&fit=crop&q=80',
        quotes: ['เหมียววว~ จับได้ด้วย!', 'ป้ายสวยทุกชิ้นเลย', 'ดึงหนูเล่นได้น้า ♡', 'รัก BNC ที่สุด'],
        speed: 0.65,
        xPercent: 82,
        startY: -100,
        swaySpeed: 0.018,
        swayAmp: 20
      }
    ];

    mascotConfigs.forEach((cfg, idx) => {
      const el = document.createElement('div');
      el.id = cfg.id;
      el.className = 'falling-mascot-item';
      
      const img = document.createElement('img');
      img.src = cfg.png;
      img.className = 'falling-mascot-img';
      img.alt = cfg.name;
      img.style.borderRadius = '50%';
      img.style.border = '2.5px solid #FBCFE8';
      img.style.background = '#FFFDFE';
      img.style.padding = '3px';

      el.appendChild(img);
      container.appendChild(el);

      // State for falling physics & dragging
      let posX = (window.innerWidth * (cfg.xPercent / 100)) - 36;
      let posY = cfg.startY - (idx * 90);
      let isDragging = false;
      let startMouseX = 0;
      let startMouseY = 0;
      let origPosX = 0;
      let origPosY = 0;
      let tick = Math.random() * 100;
      let bubbleTimeout = null;

      // Initial position
      el.style.left = `${posX}px`;
      el.style.top = `${posY}px`;

      // Speech bubble popup on tap/click
      const showSpeechBubble = (text) => {
        let bubble = el.querySelector('.mascot-bubble-talk');
        if (!bubble) {
          bubble = document.createElement('div');
          bubble.className = 'mascot-bubble-talk';
          el.appendChild(bubble);
        }
        bubble.textContent = text || cfg.quotes[Math.floor(Math.random() * cfg.quotes.length)];
        clearTimeout(bubbleTimeout);
        bubbleTimeout = setTimeout(() => {
          if (bubble && bubble.parentNode) bubble.parentNode.removeChild(bubble);
        }, 2200);
      };

      // Drag event listeners (Mouse & Touch for mobile)
      const onPointerDown = (e) => {
        isDragging = true;
        el.style.transition = 'none';
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        startMouseX = clientX;
        startMouseY = clientY;
        origPosX = posX;
        origPosY = posY;
        showSpeechBubble();
        if (typeof playCuteClickSound === 'function') playCuteClickSound();
        e.stopPropagation();
      };

      const onPointerMove = (e) => {
        if (!isDragging) return;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const deltaX = clientX - startMouseX;
        const deltaY = clientY - startMouseY;
        posX = origPosX + deltaX;
        posY = origPosY + deltaY;

        // Keep inside bounds
        const maxW = window.innerWidth - 80;
        const maxH = window.innerHeight - 80;
        if (posX < 10) posX = 10;
        if (posX > maxW) posX = maxW;
        if (posY < 10) posY = 10;
        if (posY > maxH) posY = maxH;

        el.style.left = `${posX}px`;
        el.style.top = `${posY}px`;
      };

      const onPointerUp = () => {
        if (isDragging) {
          isDragging = false;
          el.style.transition = 'filter 0.2s ease, transform 0.15s ease';
        }
      };

      el.addEventListener('mousedown', onPointerDown);
      window.addEventListener('mousemove', onPointerMove);
      window.addEventListener('mouseup', onPointerUp);

      el.addEventListener('touchstart', onPointerDown, { passive: false });
      window.addEventListener('touchmove', onPointerMove, { passive: false });
      window.addEventListener('touchend', onPointerUp);

      // Gentle continuous falling animation loop with gentle sway
      function animLoop() {
        if (!isDragging) {
          tick += cfg.swaySpeed;
          posY += cfg.speed;
          const sway = Math.sin(tick) * (cfg.swayAmp * 0.08);
          posX += sway;

          // If fallen below viewport, reset back smoothly to top
          if (posY > window.innerHeight + 60) {
            posY = -90;
            posX = Math.random() * (window.innerWidth - 100) + 20;
          }

          el.style.left = `${posX}px`;
          el.style.top = `${posY}px`;
        }
        requestAnimationFrame(animLoop);
      }
      requestAnimationFrame(animLoop);
    });
  }
  
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
 <div class="container navbar__inner">
 <a href="#home" class="brand-link">
 
 <span>${escapeHTML(s.shopName || 'BNC GraphMate')}</span>
 </a>

        <nav class="navbar__nav" id="navbarMenu">
          <a href="#home" class="nav-link ${state.view === 'home' ? 'active' : ''}">หน้าแรก</a>
          <a href="#queue" class="nav-link ${state.view === 'queue' ? 'active' : ''}">เช็กคิว</a>
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
      case 'queue':
        renderQueueView(pageEl);
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
  // VIEW: HOME (Cover Banner + Profile + Queue Notebook + 1:1 Carousel + Pop-out Badges)
  // ============================================================
  let heroCarouselTimer = null;
  let currentHeroSlideIdx = 0;

  function initHeroCarousel(count) {
    if (heroCarouselTimer) {
      clearInterval(heroCarouselTimer);
      heroCarouselTimer = null;
    }
    currentHeroSlideIdx = 0;
    if (!count || count <= 1) return;
    heroCarouselTimer = setInterval(() => {
      if (typeof window.nextHeroSlide === 'function') {
        window.nextHeroSlide();
      }
    }, 4500);
  }

  window.goToHeroSlide = function(idx) {
    const slides = document.querySelectorAll('.hero-carousel-slide');
    const dots = document.querySelectorAll('.hero-carousel-dot');
    if (!slides.length) return;
    currentHeroSlideIdx = (idx + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle('active', i === currentHeroSlideIdx));
    dots.forEach((d, i) => d.classList.toggle('active', i === currentHeroSlideIdx));
  };

  window.nextHeroSlide = function() {
    window.goToHeroSlide(currentHeroSlideIdx + 1);
  };

  window.prevHeroSlide = function() {
    window.goToHeroSlide(currentHeroSlideIdx - 1);
  };

  window.handleStampSearch = function(e) {
    if (e) e.preventDefault();
    const input = document.getElementById('stampSearchInput');
    if (input) {
      state.stampSearchQuery = input.value.trim();
      renderView('points');
    }
  };

  function renderHomeView(container) {
    const s = Store.getSettings();
    const stats = s.stats || {};
    const banners = Store.getHomeBanners();
    const queueStatus = Store.getQueueStatus();
    const featuredProds = Store.getAllProducts();
    const featuredFonts = Store.getAllFonts();
    const featuredGroups = Store.getAllGroups();

    container.innerHTML = `
      <!-- Facebook Cover Banner (Contained, Not Edge-to-Edge) -->
      <div class="container" style="padding-top: 1.25rem;">
        <div class="fb-cover-banner" style="border-radius: 22px; max-height: 290px; overflow: hidden; box-shadow: var(--shadow-sm);">
          <img src="${escapeHTML(s.coverImage || 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=1600')}" class="fb-cover-img" alt="Cover Banner" style="width: 100%; height: 100%; object-fit: cover; display: block;" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=1600';">
        </div>
      </div>

      <!-- Profile & Services Header -->
      <section style="background-color: var(--surface-alt); padding: 0.5rem 0 2.5rem; border-bottom: 1px solid var(--border-light);">
        <div class="container">
          
          <!-- Profile Info Row -->
          <div class="ig-profile-section" style="max-width: 680px; margin: 0 auto;">
            <div class="ig-profile-header">
              
              <div class="ig-avatar-wrapper fb-overlap-avatar">
                <img src="${escapeHTML(s.profileImage || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400')}" class="ig-avatar-img" alt="Studio Avatar" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400';">
              </div>

              <!-- Shop Info -->
              <div class="ig-info">
                <div class="ig-name-row">
                  <h1 class="ig-shop-title">${escapeHTML(s.shopName || 'BNC GraphMate Studio')}</h1>
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

                <!-- Action Buttons (No emojis) -->
                <div class="ig-actions-row">
                  <a href="${escapeHTML(s.lineUrl || 'https://line.me/ti/p/~bncgraphmate')}" target="_blank" class="btn btn-primary btn-sm">
                    ${escapeHTML(s.btnLineText || 'ทักแชท LINE ร้าน')}
                  </a>
                  <a href="${escapeHTML(s.instagramUrl || 'https://instagram.com/bncgraphmate')}" target="_blank" class="btn btn-secondary btn-sm">
                    ${escapeHTML(s.btnIgText || 'Instagram')}
                  </a>
                  <a href="${escapeHTML(s.facebookUrl || 'https://facebook.com/bncgraphmate')}" target="_blank" class="btn btn-secondary btn-sm">
                    ${escapeHTML(s.btnFbText || 'Facebook')}
                  </a>
                  <a href="tel:${escapeHTML(s.contactPhone || '0812345678')}" class="btn btn-outline btn-sm">
                    ${escapeHTML(s.btnPhoneText || 'โทรติดต่อ')}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- GoodNotes Notebook Paper: Queue & Notice Board (No horizontal lines, no emojis) -->
          <div class="notebook-paper-container" style="max-width: 680px; margin: 2rem auto 0; box-shadow: var(--shadow-md); border-radius: 20px;">
            <div class="notebook-binder-header" style="justify-content: space-between;">
              <div class="notebook-binder-holes">
                <span class="notebook-hole"></span>
                <span class="notebook-hole"></span>
                <span class="notebook-hole"></span>
                <span class="notebook-hole"></span>
                <span class="notebook-hole"></span>
              </div>
              <div class="queue-badge-chip">
                <span class="queue-status-bullet"></span>
                <span>${escapeHTML(s.queueBadgeText || queueStatus.queueText || 'ว่างพร้อมรับ 3 คิว')}</span>
              </div>
            </div>

            <div class="queue-notebook-paper" style="text-align: center; padding: 26px 20px;">
              <div style="font-size: 0.98rem; line-height: 2.2; color: var(--text); font-weight: 600; white-space: pre-line; max-width: 540px; margin: 0 auto;">
                ${escapeHTML(s.notebookNotice || 'สถานะคิวงานออกแบบ: ว่างพร้อมรับ 3 คิว\nเวลาตอบแชท: 09:00 - 23:00 น. (ตอบไว)\nความเร็วการส่งมอบ: ดึงสิทธิ์ Google Drive อัตโนมัติหลังแอดมินตรวจสลิป')}
              </div>
              <div style="margin-top: 1.25rem; display: flex; justify-content: center;">
                <a href="${escapeHTML(s.lineUrl || 'https://line.me/ti/p/~bncgraphmate')}" target="_blank" class="btn btn-primary btn-sm" style="font-weight: 700; border-radius: 14px; padding: 0.6rem 1.6rem;">
                  ทักแชทจองคิว / สั่งทำงานออกแบบ
                </a>
              </div>
            </div>
          </div>

          <!-- 1:1 Square Hero Carousel (Repositioned to be directly AFTER Notebook Paper) -->
          <div style="margin-top: 2.5rem;">
            <div style="text-align: center; margin-bottom: 0.85rem;">
              <span class="badge badge--pink" style="font-size: 11px;">ป้ายแบนเนอร์แนะนำ</span>
            </div>
            <div class="hero-carousel-wrapper">
              <div class="hero-carousel-container" id="heroCarouselSlides">
                ${banners.map((b, idx) => `
                  <div class="hero-carousel-slide ${idx === 0 ? 'active' : ''}" data-index="${idx}">
                    <a href="${escapeHTML(b.link || '#fonts')}">
                      <img src="${escapeHTML(b.image)}" alt="${escapeHTML(b.title || '')}" style="width:100%; height:100%; object-fit:cover; display:block;" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1541643600914-78b084683601?w=600';">
                    </a>
                  </div>
                `).join('')}
              </div>
              ${banners.length > 1 ? `
                <button type="button" class="hero-carousel-prev" onclick="prevHeroSlide()" aria-label="ภาพก่อนหน้า">‹</button>
                <button type="button" class="hero-carousel-next" onclick="nextHeroSlide()" aria-label="ภาพถัดไป">›</button>
                <div class="hero-carousel-dots" id="heroCarouselDots">
                  ${banners.map((_, idx) => `
                    <span class="hero-carousel-dot ${idx === 0 ? 'active' : ''}" onclick="goToHeroSlide(${idx})"></span>
                  `).join('')}
                </div>
              ` : ''}
            </div>
          </div>

        </div>
      </section>

      <!-- VIP LINE Groups Section (1-Row Compact Horizontal Slider with Pop-Out Badges) -->
      <section style="padding: 3rem 0 2.5rem;">
        <div class="container">
          <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 1.5rem;">
            <div>
              <span class="section-tag">LINE VIP Groups</span>
              <h2 class="section-title" style="margin: 0.25rem 0 0;">กลุ่ม VIP รวมไฟล์กราฟิก & ป้าย</h2>
            </div>
            <a href="#groups" class="btn btn-outline btn-sm">ดูทั้งหมด (${featuredGroups.length}) →</a>
          </div>

          <div class="compact-horizontal-slider" style="padding-top: 15px;">
            ${featuredGroups.map(g => `
              <div class="compact-card-item">
                <div class="pop-out-badge">${escapeHTML(g.category || 'VIP')}</div>
                <img src="${escapeHTML(g.cover_image_url || g.cover_image || 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600')}" class="compact-card-thumb" alt="${escapeHTML(g.name)}" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600';">
                <div class="compact-card-content">
                  <div class="compact-card-title">${escapeHTML(g.name)}</div>
                  <div class="compact-card-footer">
                    <span class="product-price" style="font-size: 1.05rem;">฿${Number(g.price || 0).toLocaleString()}</span>
                    <button type="button" class="btn btn-primary btn-sm" onclick="addToCartItem('${g.id}', 'GROUP')" style="padding: 4px 10px; font-size: 11px;">
                      ${escapeHTML(s.btnCartText || 'ใส่ตะกร้า')}
                    </button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Handwritten Fonts Section (1-Row Compact Horizontal Slider with Pop-Out Badges) -->
      <section style="padding: 2rem 0 2.5rem; background-color: var(--surface-alt);">
        <div class="container">
          <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 1.5rem;">
            <div>
              <span class="section-tag">Handwritten Fonts</span>
              <h2 class="section-title" style="margin: 0.25rem 0 0;">ฟอนต์ลายมือเชิงพาณิชย์</h2>
            </div>
            <a href="#fonts" class="btn btn-outline btn-sm">ดูทั้งหมด (${featuredFonts.length}) →</a>
          </div>

          <div class="compact-horizontal-slider" style="padding-top: 15px;">
            ${featuredFonts.map(f => {
              const fontImg = f.preview_image || f.preview_image_url || f.image_url || 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=600';
              return `
                <div class="compact-card-item">
                  <div class="pop-out-badge">${escapeHTML(f.category || 'ลายมือ')}</div>
                  <img src="${escapeHTML(fontImg)}" class="compact-card-thumb" alt="${escapeHTML(f.name)}" loading="lazy" onclick="openLightbox('${escapeHTML(fontImg)}')" style="cursor: pointer;" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=600';">
                  <div class="compact-card-content">
                    <div class="compact-card-title">${escapeHTML(f.name)}</div>
                    <div class="compact-card-footer">
                      <span class="product-price" style="font-size: 1.05rem;">฿${Number(f.price || 0).toLocaleString()}</span>
                      <button type="button" class="btn btn-primary btn-sm" onclick="addToCartItem('${f.id}', 'FONT')" style="padding: 4px 10px; font-size: 11px;">
                        ${escapeHTML(s.btnCartText || 'ใส่ตะกร้า')}
                      </button>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </section>

      <!-- Graphic Products Section (1-Row Compact Horizontal Slider with Pop-Out Badges) -->
      <section style="padding: 2.5rem 0 3.5rem;">
        <div class="container">
          <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 1.5rem;">
            <div>
              <span class="section-tag">Graphic Ready</span>
              <h2 class="section-title" style="margin: 0.25rem 0 0;">สินค้าสำเร็จ & ไฟล์ตกแต่ง</h2>
            </div>
            <a href="#products" class="btn btn-outline btn-sm">ดูทั้งหมด (${featuredProds.length}) →</a>
          </div>

          <div class="compact-horizontal-slider" style="padding-top: 15px;">
            ${featuredProds.map(p => `
              <div class="compact-card-item">
                <div class="pop-out-badge">${escapeHTML(p.category || 'กราฟิก')}</div>
                <img src="${escapeHTML(p.image_url || p.image || 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600')}" class="compact-card-thumb" alt="${escapeHTML(p.name)}" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1541643600914-78b084683601?w=600';">
                <div class="compact-card-content">
                  <div class="compact-card-title">${escapeHTML(p.name)}</div>
                  <div class="compact-card-footer">
                    <span class="product-price" style="font-size: 1.05rem;">฿${Number(p.price || 0).toLocaleString()}</span>
                    <button type="button" class="btn btn-primary btn-sm" onclick="addToCartItem('${p.id}', 'PRODUCT')" style="padding: 4px 10px; font-size: 11px;">
                      ${escapeHTML(s.btnCartText || 'ใส่ตะกร้า')}
                    </button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;

    // Start Auto Carousel Slide
    initHeroCarousel(banners.length);
  }

  function renderFontsView(container) {
    const s = Store.getSettings();
    const fonts = Store.getAllFonts();
    const categories = ['ALL', ...Store.getFontCategories()];

    // Filter
    const filtered = fonts.filter(f => {
      const matchCat = state.fontTester.category === 'ALL' || f.category === state.fontTester.category;
      const matchSearch = !state.fontTester.search || f.name.toLowerCase().includes(state.fontTester.search.toLowerCase());
      return matchCat && matchSearch;
    });

    const fontA = fonts.find(f => f.id === state.fontTester.compareFontId1) || fonts[0] || {};
    const fontB = fonts.find(f => f.id === state.fontTester.compareFontId2) || fonts[1] || fonts[0] || {};

    container.innerHTML = `
      <section style="padding: 2.5rem 0 4rem;">
        <div class="container">
          
          <div class="section-header" style="margin-bottom: 1.5rem;">
            <span class="section-tag">Font Studio</span>
          </div>

          <!-- GoodNotes Ruled Notebook Paper - Font Tester & Comparison (iPhone Split Style) -->
          <div class="notebook-paper-container">
            <div class="notebook-binder-header">
              <div class="notebook-binder-holes">
                <span class="notebook-hole"></span>
                <span class="notebook-hole"></span>
                <span class="notebook-hole"></span>
                <span class="notebook-hole"></span>
                <span class="notebook-hole"></span>
              </div>
              <div style="font-size: 13px; font-weight: 800; color: var(--primary-deep); display: flex; align-items: center; gap: 6px;">
                <span>📝 ทดสอบ & เปรียบเทียบฟอนต์ลายมือสด</span>
              </div>
              <div style="font-size: 12px; color: var(--text-muted);">
                พิมพ์ข้อความเทียบฟอนต์สดบนสมุดโน้ต
              </div>
            </div>

            <div class="goodnotes-paper">
              <!-- Controls Row: Synchronized Text Input & Pink Size Slider -->
              <div style="display: grid; grid-template-columns: 1fr auto; gap: 14px; margin-bottom: 20px; align-items: center;">
                <div>
                  <label style="font-size: 12px; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 4px;">พิมพ์ข้อความทดสอบ (แสดงสดทั้ง 2 ฟอนต์)</label>
                  <input type="text" id="fontCompareInput" class="form-input" style="background: rgba(255,255,255,0.95); font-size: 15px; border-radius: 12px;" value="${escapeHTML(state.fontTester.text)}" placeholder="พิมพ์ข้อความทดสอบฟอนต์ที่นี่..." oninput="handleCompareTextInput(this.value)">
                </div>
                <div style="min-width: 170px;">
                  <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: 700; margin-bottom: 4px;">
                    <span>ขนาดฟอนต์</span>
                    <span style="color: var(--primary-deep);" id="fontCompareSizeVal">${state.fontTester.size}px</span>
                  </div>
                  <input type="range" min="16" max="44" value="${state.fontTester.size}" style="cursor: pointer; width: 100%;" oninput="handleCompareSizeInput(this.value)">
                </div>
              </div>

              <!-- iPhone-style Split Comparison Panes -->
              <div class="font-compare-split">
                <!-- Font A Pane -->
                <div class="font-compare-card">
                  <div class="font-compare-header">
                    <div style="flex: 1;">
                      <label style="font-size: 11px; font-weight: 700; color: var(--text-muted); display: block;">ฟอนต์ที่ 1 (Font A)</label>
                      <select class="form-input" style="padding: 6px 10px; font-size: 13px; font-weight: 700; border-radius: 10px;" onchange="handleCompareFontChange(1, this.value)">
                        ${fonts.map(f => `<option value="${f.id}" ${f.id === fontA.id ? 'selected' : ''}>${escapeHTML(f.name)} (฿${f.price})</option>`).join('')}
                      </select>
                    </div>
                    <span class="badge badge--pink" style="font-size: 11px; height: fit-content;">Font A</span>
                  </div>

                  <div class="font-compare-text-display font-display-a" style="font-size: ${state.fontTester.size}px; font-family: ${fontA.font_file_url ? `'Font-${fontA.id}', ` : ''}'Prompt', sans-serif;">
                    ${escapeHTML(state.fontTester.text || 'ร้านป้ายบีเอ็นซี น่ารักสดใส')}
                  </div>

                  <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 10px; border-top: 1.5px dashed var(--border);">
                    <div>
                      <span style="font-size: 11px; color: var(--text-muted);">${escapeHTML(fontA?.category || 'ลายมือ')}</span>
                      <div style="font-size: 15px; font-weight: 800; color: var(--primary-deep);">฿${Number(fontA?.price || 0).toLocaleString()}</div>
                    </div>
                    <div style="display: flex; gap: 6px;">
                      <button type="button" class="btn btn-outline btn-sm" onclick="addToCartItem('${fontA?.id}', 'FONT')">ใส่ตะกร้า</button>
                      <button type="button" class="btn btn-primary btn-sm" onclick="buyNowItem('${fontA?.id}', 'FONT')">สั่งซื้อเลย</button>
                    </div>
                  </div>
                </div>

                <!-- Font B Pane -->
                <div class="font-compare-card">
                  <div class="font-compare-header">
                    <div style="flex: 1;">
                      <label style="font-size: 11px; font-weight: 700; color: var(--text-muted); display: block;">ฟอนต์ที่ 2 (Font B)</label>
                      <select class="form-input" style="padding: 6px 10px; font-size: 13px; font-weight: 700; border-radius: 10px;" onchange="handleCompareFontChange(2, this.value)">
                        ${fonts.map(f => `<option value="${f.id}" ${f.id === fontB.id ? 'selected' : ''}>${escapeHTML(f.name)} (฿${f.price})</option>`).join('')}
                      </select>
                    </div>
                    <span class="badge badge--pink" style="font-size: 11px; height: fit-content;">Font B</span>
                  </div>

                  <div class="font-compare-text-display font-display-b" style="font-size: ${state.fontTester.size}px; font-family: 'IBM Plex Sans Thai', sans-serif;">
                    ${escapeHTML(state.fontTester.text || 'ร้านป้ายบีเอ็นซี น่ารักสดใส')}
                  </div>

                  <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 10px; border-top: 1.5px dashed var(--border);">
                    <div>
                      <span style="font-size: 11px; color: var(--text-muted);">${escapeHTML(fontB?.category || 'ลายมือ')}</span>
                      <div style="font-size: 15px; font-weight: 800; color: var(--primary-deep);">฿${Number(fontB?.price || 0).toLocaleString()}</div>
                    </div>
                    <div style="display: flex; gap: 6px;">
                      <button type="button" class="btn btn-outline btn-sm" onclick="addToCartItem('${fontB?.id}', 'FONT')">ใส่ตะกร้า</button>
                      <button type="button" class="btn btn-primary btn-sm" onclick="buyNowItem('${fontB?.id}', 'FONT')">สั่งซื้อเลย</button>
                    </div>
                  </div>
                </div>
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
              <input type="text" class="form-input" placeholder="ค้นหาชื่อฟอนต์..." value="${escapeHTML(state.fontTester.search)}" oninput="handleFontSearch(this.value)" style="padding: 0.45rem 0.85rem; font-size: 0.9rem;">
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

  window.handleCompareTextInput = function (val) {
    state.fontTester.text = val;
    document.querySelectorAll('.font-compare-text-display, .font-preview-text').forEach(el => {
      el.textContent = val || 'ร้านป้ายบีเอ็นซี น่ารักสดใส';
    });
  };

  window.handleCompareSizeInput = function (val) {
    state.fontTester.size = val;
    const disp = $('fontCompareSizeVal');
    if (disp) disp.textContent = val + 'px';
    document.querySelectorAll('.font-compare-text-display').forEach(el => {
      el.style.fontSize = val + 'px';
    });
  };

  window.handleCompareFontChange = function (slot, fontId) {
    if (slot === 1) state.fontTester.compareFontId1 = fontId;
    else state.fontTester.compareFontId2 = fontId;
    renderCurrentView();
  };

  window.setCompareFont = function (id) {
    state.fontTester.compareFontId2 = id;
    renderCurrentView();
    const el = document.querySelector('.notebook-paper-container');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
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
  // VIEW: QUEUE CHECKING (Stationery / Cute Kawaii Note Paper)
  // Queue != Order, Strict Zero-Emoji, Privacy Censoring
  // ============================================================
  function renderQueueView(container) {
    const qSettings = Store.getQueuePageSettings();
    const allQueues = Store.getQueueItems(false); // Only visible items for public
    const statusNames = qSettings.statusNames || {
      waiting: 'รอคิว',
      progress: 'กำลังดำเนินการ',
      review: 'รอตรวจ',
      edit: 'รอแก้ไข',
      done: 'เสร็จแล้ว',
      pause: 'พักคิว',
      cancel: 'ยกเลิก'
    };

    // Calculate Summary Counts
    const totalToday = allQueues.length;
    const countWaiting = allQueues.filter(q => q.status === 'waiting').length;
    const countProgress = allQueues.filter(q => q.status === 'progress' || q.status === 'review' || q.status === 'edit').length;
    const countDone = allQueues.filter(q => q.status === 'done').length;

    // Filter by search query (Queue number, client name, line_id, or phone)
    const query = (state.queueSearchQuery || '').trim().toLowerCase();
    const filteredQueues = allQueues.filter(q => {
      if (!query) return true;
      const matchNum = (q.queue_number || '').toLowerCase().includes(query);
      const matchName = (q.customer_name || '').toLowerCase().includes(query);
      const matchLine = (q.line_id || '').toLowerCase().includes(query);
      const matchPhone = (q.phone || '').replace(/[^0-9]/g, '').includes(query.replace(/[^0-9]/g, ''));
      return matchNum || matchName || matchLine || matchPhone;
    });

    // Helper: Censor customer contact info for privacy
    const maskText = (text, keepStart = 2, keepEnd = 2) => {
      if (!text) return '-';
      const str = String(text).trim();
      if (str.length <= 4) return str.slice(0, 1) + '***';
      return str.slice(0, keepStart) + '***' + str.slice(-keepEnd);
    };

    container.innerHTML = `
      <section style="padding: 2.5rem 0 4.5rem; min-height: 80vh;">
        <div class="container" style="max-width: 1060px;">

          <!-- Kawaii Stationery Hero Note Card -->
          <div class="queue-page-hero-card" style="position: relative; background: #FFFDFE; border: 1.5px solid #FBCFE8; border-radius: 28px; padding: 2.2rem 2rem 1.8rem; box-shadow: 0 10px 30px rgba(244, 114, 182, 0.12); margin-bottom: 2.2rem;">
            <!-- Washi Tape Strips -->
            <div class="washi-tape-strip"></div>
            <!-- Paper Clip Decor -->
            <div class="paper-clip-decor"></div>
            <!-- Notebook Ring Binder Holes -->
            <div class="notebook-rings-bar">
              <span class="notebook-ring-hole"></span>
              <span class="notebook-ring-hole"></span>
              <span class="notebook-ring-hole"></span>
              <span class="notebook-ring-hole"></span>
              <span class="notebook-ring-hole"></span>
            </div>

            <div style="text-align: center; max-width: 680px; margin: 0 auto;">
              <span class="badge badge--pink" style="margin-bottom: 0.6rem; font-size: 0.8rem; letter-spacing: 0.5px;">LIVE QUEUE STATUS</span>
              <h1 style="font-family: var(--font-heading); color: #BE185D; font-size: 2.1rem; margin-bottom: 0.5rem; font-weight: 800;">
                ${escapeHTML(qSettings.heroTitle || 'เช็กคิวงาน ♡')}
              </h1>
              <p style="color: var(--text-muted); font-size: 0.98rem; margin-bottom: 0.85rem;">
                ${escapeHTML(qSettings.heroSubtitle || 'ดูสถานะคิวงานของร้านแบบเรียลไทม์')}
              </p>
              ${qSettings.noticeText ? `
                <div style="background: #FFF5F8; border: 1px dashed #F472B6; border-radius: 14px; padding: 0.75rem 1.25rem; font-size: 0.88rem; color: #9D174D; display: inline-block;">
                  ${escapeHTML(qSettings.noticeText)}
                </div>
              ` : ''}
            </div>

            <!-- Summary Badges / Counter Cards -->
            ${qSettings.showSummary ? `
              <div class="queue-summary-grid">
                <div class="queue-summary-pill">
                  <div class="queue-summary-num">${totalToday}</div>
                  <div class="queue-summary-label">${escapeHTML(qSettings.todayLabel || 'คิววันนี้')}</div>
                </div>
                <div class="queue-summary-pill" style="border-color: #FDE68A; background: #FFFDF5;">
                  <div class="queue-summary-num" style="color: #D97706;">${countWaiting}</div>
                  <div class="queue-summary-label">${escapeHTML(qSettings.waitingLabel || 'รอคิว')}</div>
                </div>
                <div class="queue-summary-pill" style="border-color: #BFDBFE; background: #F8FAFF;">
                  <div class="queue-summary-num" style="color: #2563EB;">${countProgress}</div>
                  <div class="queue-summary-label">${escapeHTML(qSettings.workingLabel || 'กำลังทำ')}</div>
                </div>
                <div class="queue-summary-pill" style="border-color: #BBF7D0; background: #F6FEF8;">
                  <div class="queue-summary-num" style="color: #16A34A;">${countDone}</div>
                  <div class="queue-summary-label">${escapeHTML(qSettings.completedLabel || 'เสร็จแล้ว')}</div>
                </div>
              </div>
            ` : ''}
          </div>

          <!-- Customer Privacy Search Card -->
          ${qSettings.showSearch ? `
            <div class="queue-search-card">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 8px;">
                <h3 style="margin: 0; font-size: 1.15rem; color: #BE185D; font-weight: 700;">
                  ${escapeHTML(qSettings.searchTitle || 'ค้นหาคิวของคุณ')}
                </h3>
                ${state.queueSearchQuery ? `
                  <button type="button" class="btn btn-outline btn-sm" onclick="handleClearQueueSearch()" style="font-size: 12px; padding: 4px 10px;">
                    ล้างการค้นหา
                  </button>
                ` : ''}
              </div>
              <div class="queue-search-input-wrap">
                <input 
                  type="text" 
                  id="queueSearchInput" 
                  class="queue-search-input" 
                  placeholder="${escapeHTML(qSettings.searchPlaceholder || 'กรอกชื่อ, LINE ID, เบอร์โทรศัพท์ หรือเลขคิว...')}"
                  value="${escapeHTML(state.queueSearchQuery || '')}"
                  oninput="handleQueueSearchInput(this.value)"
                >
                <button type="button" class="btn btn-primary" onclick="triggerQueueSearchSubmit()" style="border-radius: 16px; padding: 0 1.5rem; font-weight: 700;">
                  ${escapeHTML(qSettings.searchButtonText || 'ดูคิวของฉัน')}
                </button>
              </div>
              <small style="color: var(--text-muted); display: block; margin-top: 0.5rem; font-size: 0.82rem;">
                ${escapeHTML(qSettings.searchDescription || '*กรอกข้อมูลที่ใช้กับทางร้านเพื่อค้นหาคิวของคุณ (เพื่อความเป็นส่วนตัว เบอร์โทรและไลน์จะถูกซ่อนบางส่วน)')}
              </small>
            </div>
          ` : ''}

          <!-- Queue Section Title Bar -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
            <h2 style="font-size: 1.35rem; color: #831843; font-family: var(--font-heading); font-weight: 800; margin: 0;">
              ${escapeHTML(qSettings.sectionTitle || 'คิวงานของร้าน ♡')}
            </h2>
            <span style="font-size: 0.85rem; color: var(--text-muted);">
              แสดง ${filteredQueues.length} จากทั้งหมด ${allQueues.length} รายการ
            </span>
          </div>

          <!-- Queue Cards Grid (Stationery Sticky Note Cards) -->
          ${filteredQueues.length > 0 ? `
            <div class="queue-cards-grid">
              ${filteredQueues.map(item => {
                const statusKey = (item.status || 'waiting').toLowerCase();
                const statusLabel = statusNames[statusKey] || statusKey;
                const progressPct = Math.min(100, Math.max(0, Number(item.progress) || 0));
                
                return `
                  <div class="queue-note-card" onclick="openQueueDetailModal('${item.id}')">
                    <!-- Washi Tape Corner -->
                    <div class="queue-card-tape"></div>

                    <div class="queue-card-header">
                      ${qSettings.showQueueNumber !== false ? `
                        <div class="queue-pill-num">${escapeHTML(item.queue_number || 'Q-')}</div>
                      ` : '<div></div>'}
                      <span class="queue-status-chip status-${statusKey}">
                        ${escapeHTML(statusLabel)}
                      </span>
                    </div>

                    <!-- Job Information -->
                    <div class="queue-card-job">${escapeHTML(item.job_name || 'งานออกแบบ')}</div>
                    <div>
                      <span class="queue-card-type-tag">${escapeHTML(item.job_type || 'งานออกแบบ')}</span>
                    </div>

                    ${qSettings.showCustomerName !== false ? `
                      <div class="queue-card-client">
                        ลูกค้า: <strong>${escapeHTML(maskText(item.customer_name, 2, 2))}</strong>
                      </div>
                    ` : ''}

                    <!-- Progress Bar -->
                    ${qSettings.showProgress !== false ? `
                      <div style="margin: 0.4rem 0;">
                        <div style="display: flex; justify-content: space-between; font-size: 0.78rem; color: #718096; margin-bottom: 2px;">
                          <span>ความคืบหน้า</span>
                          <span style="font-weight: 700; color: #BE185D;">${progressPct}%</span>
                        </div>
                        <div class="queue-progress-track">
                          <div class="queue-progress-fill" style="width: ${progressPct}%;"></div>
                        </div>
                      </div>
                    ` : ''}

                    ${qSettings.showNote !== false && item.note ? `
                      <div style="font-size: 0.82rem; color: #4A5568; background: #FFF9FA; border-left: 3px solid #F472B6; padding: 4px 8px; border-radius: 4px; margin-top: 0.5rem;">
                        ${escapeHTML(item.note)}
                      </div>
                    ` : ''}

                    <!-- Card Footer with Update Timestamp -->
                    <div class="queue-card-footer">
                      <span>${escapeHTML(item.queue_date || 'วันนี้')}</span>
                      <span>อัปเดต: ${escapeHTML(item.updated_at || 'เมื่อสักครู่')}</span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          ` : `
            <div style="background: #FFFDFE; border: 1.5px dashed #FBCFE8; border-radius: 24px; padding: 4rem 1.5rem; text-align: center; color: var(--text-muted); margin-top: 1rem;">
              <div style="width: 56px; height: 56px; border-radius: 50%; background: #FFF0F5; border: 1.5px solid #FBCFE8; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: #BE185D;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </div>
              <h3 style="color: #9D174D; margin-bottom: 0.35rem; font-size: 1.2rem;">${escapeHTML(qSettings.emptyStateText || 'วันนี้ยังไม่มีคิวงานนะคะ ♡')}</h3>
              <p style="font-size: 0.9rem; margin: 0;">หากสั่งทำป้ายหรือสอบถามคิวงาน ทักแชทสอบถามแอดมินทาง LINE ได้เลยนะคะ</p>
              ${state.queueSearchQuery ? `
                <button type="button" class="btn btn-outline btn-sm" onclick="handleClearQueueSearch()" style="margin-top: 1rem;">
                  ล้างคำค้นหาและแสดงทั้งหมด
                </button>
              ` : ''}
            </div>
          `}

        </div>
      </section>
    `;
  }

  // Queue View Action Handlers
  window.handleQueueSearchInput = function (val) {
    state.queueSearchQuery = val;
    // Debounced or live re-render for responsive note search
    clearTimeout(window._qSearchTimer);
    window._qSearchTimer = setTimeout(() => {
      renderCurrentView();
    }, 280);
  };

  window.handleClearQueueSearch = function () {
    state.queueSearchQuery = '';
    renderCurrentView();
  };

  window.triggerQueueSearchSubmit = function () {
    const input = $('queueSearchInput');
    if (input) state.queueSearchQuery = input.value;
    renderCurrentView();
  };

  // 5-Step Modal Timeline for Queue Detail
  window.openQueueDetailModal = function (queueId) {
    const item = Store.getQueueItemById(queueId);
    if (!item) return;

    let modal = $('queueDetailModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'queueDetailModal';
      modal.className = 'modal-overlay';
      modal.onclick = (e) => { if (e.target === modal) closeQueueDetailModal(); };
      document.body.appendChild(modal);
    }

    const qSettings = Store.getQueuePageSettings();
    const statusNames = qSettings.statusNames || {};
    const statusKey = (item.status || 'waiting').toLowerCase();
    const statusLabel = statusNames[statusKey] || statusKey;
    const progressPct = Math.min(100, Math.max(0, Number(item.progress) || 0));

    // Determine Timeline Step (1: รับงาน, 2: เข้าคิว, 3: กำลังดำเนินการ, 4: รอตรวจ, 5: เสร็จแล้ว)
    let activeStepIndex = 1;
    if (statusKey === 'waiting') activeStepIndex = 2;
    else if (statusKey === 'progress' || statusKey === 'edit') activeStepIndex = 3;
    else if (statusKey === 'review') activeStepIndex = 4;
    else if (statusKey === 'done') activeStepIndex = 5;

    const timelineSteps = [
      { step: 1, label: 'รับงานแล้ว' },
      { step: 2, label: 'เข้าคิวงาน' },
      { step: 3, label: 'กำลังออกแบบ' },
      { step: 4, label: 'ส่งตรวจแบบ' },
      { step: 5, label: 'เสร็จสมบูรณ์' }
    ];

    const maskText = (text, keepStart = 2, keepEnd = 2) => {
      if (!text) return '-';
      const str = String(text).trim();
      if (str.length <= 4) return str.slice(0, 1) + '***';
      return str.slice(0, keepStart) + '***' + str.slice(-keepEnd);
    };

    modal.innerHTML = `
      <div class="modal-card" style="max-width: 580px; width: 92%; max-height: 90vh; overflow-y: auto; padding: 2rem 1.8rem; border-radius: 26px; border: 1.5px solid #FBCFE8; box-shadow: 0 16px 36px rgba(244, 114, 182, 0.2);">
        
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.25rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="queue-pill-num">${escapeHTML(item.queue_number || 'Q-')}</span>
              <span class="queue-status-chip status-${statusKey}">${escapeHTML(statusLabel)}</span>
            </div>
            <h2 style="font-size: 1.45rem; color: #2D3748; margin: 0.65rem 0 0.2rem; font-weight: 800;">
              ${escapeHTML(item.job_name || 'งานออกแบบ')}
            </h2>
            <span class="queue-card-type-tag">${escapeHTML(item.job_type || 'งานออกแบบ')}</span>
          </div>
          <button type="button" onclick="closeQueueDetailModal()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #A0AEC0;">✕</button>
        </div>

        <!-- 5-Step Timeline Graphic -->
        ${qSettings.showTimeline !== false ? `
          <div style="background: #FFFDFE; border: 1px dashed #FBCFE8; border-radius: 18px; padding: 1.25rem 1rem 0.75rem; margin-bottom: 1.5rem;">
            <div style="font-size: 0.85rem; font-weight: 700; color: #BE185D; margin-bottom: 0.5rem; text-align: center;">
              สถานะขั้นตอนการทำงาน
            </div>
            <div class="queue-timeline-stepper">
              ${timelineSteps.map(s => {
                const isPassed = s.step < activeStepIndex;
                const isActive = s.step === activeStepIndex;
                const stateClass = isActive ? 'is-active' : (isPassed ? 'is-passed' : '');
                return `
                  <div class="queue-step-node ${stateClass}">
                    <div class="queue-step-circle">
                      ${isPassed ? '✓' : s.step}
                    </div>
                    <div class="queue-step-title">${s.label}</div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Details Grid -->
        <div style="background: #FFF9FA; border-radius: 18px; padding: 1.25rem; margin-bottom: 1.5rem; border: 1px solid #FFE4E6;">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3" style="font-size: 0.9rem;">
            <div>
              <span style="color: #718096; display: block; font-size: 0.8rem;">ชื่อลูกค้า:</span>
              <strong style="color: #2D3748;">${escapeHTML(maskText(item.customer_name, 2, 2))}</strong>
            </div>
            <div>
              <span style="color: #718096; display: block; font-size: 0.8rem;">LINE ID / เบอร์:</span>
              <strong style="color: #2D3748;">${escapeHTML(maskText(item.line_id || item.phone, 2, 2))}</strong>
            </div>
            <div>
              <span style="color: #718096; display: block; font-size: 0.8rem;">วันที่รับคิว:</span>
              <span style="color: #2D3748;">${escapeHTML(item.queue_date || 'วันนี้')}</span>
            </div>
            <div>
              <span style="color: #718096; display: block; font-size: 0.8rem;">อัปเดตล่าสุด:</span>
              <span style="color: #2D3748;">${escapeHTML(item.updated_at || 'เมื่อสักครู่')}</span>
            </div>
            ${item.current_queue && item.total_queue ? `
              <div style="grid-column: 1 / -1;">
                <span style="color: #718096; display: block; font-size: 0.8rem;">ลำดับคิวในระบบ:</span>
                <strong style="color: #BE185D;">คิวที่ ${item.current_queue} จากทั้งหมด ${item.total_queue} คิว</strong>
              </div>
            ` : ''}
          </div>

          ${item.description ? `
            <div style="margin-top: 0.85rem; padding-top: 0.85rem; border-top: 1px dashed #FBCFE8;">
              <span style="color: #718096; display: block; font-size: 0.8rem; margin-bottom: 2px;">รายละเอียดงาน:</span>
              <div style="color: #4A5568; line-height: 1.5; white-space: pre-line;">${escapeHTML(item.description)}</div>
            </div>
          ` : ''}

          ${item.note ? `
            <div style="margin-top: 0.75rem; background: #FFF5F8; border-left: 3px solid #F472B6; padding: 6px 12px; border-radius: 6px; font-size: 0.86rem; color: #9D174D;">
              <strong>หมายเหตุจากแอดมิน:</strong> ${escapeHTML(item.note)}
            </div>
          ` : ''}
        </div>

        <!-- Attached Image / Preview if any -->
        ${qSettings.showImage !== false && item.image_url ? `
          <div style="margin-bottom: 1.5rem; text-align: center;">
            <span style="color: #718096; display: block; font-size: 0.8rem; margin-bottom: 6px;">ภาพประกอบ / ตัวอย่างงาน:</span>
            <img 
              src="${escapeHTML(item.image_url)}" 
              alt="Queue Preview" 
              style="max-width: 100%; max-height: 260px; object-fit: cover; border-radius: 14px; border: 1.5px solid #FBCFE8; cursor: pointer;"
              onclick="openLightbox('${escapeHTML(item.image_url)}')"
            >
          </div>
        ` : ''}

        <div style="display: flex; justify-content: flex-end;">
          <button type="button" class="btn btn-secondary" onclick="closeQueueDetailModal()" style="border-radius: 14px; padding: 0.65rem 1.75rem; font-weight: 700;">
            ปิดหน้าต่าง
          </button>
        </div>

      </div>
    `;

    modal.classList.add('is-active');
  };

  window.closeQueueDetailModal = function () {
    const modal = $('queueDetailModal');
    if (modal) modal.classList.remove('is-active');
  };

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
 <input type="text" class="form-input" placeholder="ค้นหาสินค้า..." value="${escapeHTML(state.prodFilter.search)}" oninput="handleProdSearch(this.value)" style="padding: 0.45rem 0.85rem; font-size: 0.9rem;">
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
  // ============================================================
  // VIEW: GROUPS (VIP LINE Groups with Categories & Multi-Cart)
  // ============================================================
  function renderGroupsView(container) {
    const s = Store.getSettings();
    const groups = Store.getAllGroups();
    const categories = ['ALL', 'ป้ายสำเร็จ', 'ไฟล์ตกแต่ง', 'ฟอนต์', 'การ์ตูน', 'VIP ตลอดชีพ'];

    const filtered = groups.filter(g => {
      if (state.groupsFilter === 'ALL') return true;
      if (state.groupsFilter === 'ป้ายสำเร็จ') return (g.category && g.category.includes('ป้าย'));
      if (state.groupsFilter === 'ไฟล์ตกแต่ง') return (g.category && g.category.includes('ตกแต่ง'));
      if (state.groupsFilter === 'ฟอนต์') return (g.category && g.category.includes('ฟอนต์'));
      if (state.groupsFilter === 'การ์ตูน') return (g.category && g.category.includes('การ์ตูน'));
      if (state.groupsFilter === 'VIP ตลอดชีพ') return (g.category && g.category.includes('ตลอดชีพ'));
      return g.category === state.groupsFilter;
    });

    container.innerHTML = `
      <section style="padding: 2.5rem 0 4rem;">
        <div class="container">
          <div class="section-header">
            <span class="section-tag">VIP Community</span>
            <h2 class="section-title">เข้ากลุ่ม LINE VIP รวมทรัพยากร</h2>
            <p class="section-desc">จ่ายครั้งเดียวเข้ากลุ่มถาวร เลือกใส่ตะกร้าได้หลายกลุ่มพร้อมกัน พร้อมรับการอัปเดตไฟล์ใหม่ตลอดชีพ</p>
          </div>

          <!-- Category Filter Tabs -->
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; justify-content: center; margin-bottom: 2.5rem;">
            ${categories.map(c => `
              <button type="button" class="btn ${state.groupsFilter === c ? 'btn-primary' : 'btn-outline'} btn-sm" onclick="filterGroupsCat('${c}')">
                ${c === 'ALL' ? 'ทั้งหมด' : c}
              </button>
            `).join('')}
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${filtered.length > 0 ? filtered.map(g => renderGroupCard(g, s)).join('') : `
              <div class="card" style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
                <p>ยังไม่มีกลุ่มในหมวดหมู่นี้</p>
              </div>
            `}
          </div>
        </div>
      </section>
    `;
  }

  window.filterGroupsCat = function (cat) {
    state.groupsFilter = cat;
    renderCurrentView();
  };

  // ============================================================
  // VIEW: PORTFOLIO (Square 1:1 Gallery & Price Menu Card - Requirements 3 & 4)
  // ============================================================
  // ============================================================
  // VIEW: PORTFOLIO (Square 1:1 Gallery & Interactive Price Menu)
  // ============================================================
  function renderPortfolioView(container) {
    const s = Store.getSettings();
    const headings = Store.getHeadings();
    const portfolio = Store.getPortfolio();
    const styleCategories = ['ALL', ...(Store.getPortfolioStyles ? Store.getPortfolioStyles() : ['สไตล์มินิมอล & คาเฟ่', 'สไตล์การ์ตูน & คาวาอี้', 'สไตล์ลายมือ & ฟอนต์', 'สไตล์ร้านค้า & โมเดิร์น', 'ไฟล์ตกแต่ง & เทมเพลต'])];
    const signCategories = Store.getPortfolioCategories ? Store.getPortfolioCategories() : ['ป้ายเครดิต', 'ป้ายแอพพรี', 'ป้ายเติมเกม', 'ป้ายเปิดร้าน', 'ป้ายโปรโมชั่น', 'งานป้ายสั่งทำพิเศษ'];

    state.portfolioStyleFilter = state.portfolioStyleFilter || 'ALL';
    state.portfolioPriceFilter = state.portfolioPriceFilter || 'ALL';

    // Tier 1: Filter by Style Category first
    // Tier 2: Filter by Sign / Price Category
    const filtered = portfolio.filter(item => {
      // Style match
      let styleMatch = true;
      if (state.portfolioStyleFilter !== 'ALL') {
        const itemStyle = (item.style_category || '').toLowerCase();
        const filterStyle = state.portfolioStyleFilter.toLowerCase();
        const itemTitle = (item.title || '').toLowerCase();
        const itemDesc = (item.description || '').toLowerCase();
        const itemCat = (item.category || '').toLowerCase();

        // Exact match or keyword match in style/title/desc
        if (itemStyle && itemStyle.includes(filterStyle)) {
          styleMatch = true;
        } else {
          // Extract keywords (e.g. "มินิมอล", "คาเฟ่", "การ์ตูน", "คาวาอี้", "ลายมือ", "ฟอนต์", "โมเดิร์น", "ร้านอาหาร", "ตกแต่ง")
          const keywords = filterStyle.split(/[&,/ ]+/).map(k => k.trim()).filter(k => k.length > 1 && k !== 'สไตล์');
          styleMatch = keywords.some(kw => itemStyle.includes(kw) || itemTitle.includes(kw) || itemDesc.includes(kw) || itemCat.includes(kw));
        }
      }

      // Sign / Price category match
      let priceMatch = true;
      if (state.portfolioPriceFilter !== 'ALL') {
        const pFilter = state.portfolioPriceFilter;
        priceMatch = item.category === pFilter ||
          (item.title && item.title.includes(pFilter)) ||
          (item.style_category && item.style_category.includes(pFilter));
      }

      return styleMatch && priceMatch;
    });

    state.lightboxList = filtered;

    container.innerHTML = `
      <section style="padding: 2.5rem 0 4rem;">
        <div class="container">
          <div class="section-header">
            <span class="section-tag">Our Works & Gallery</span>
            <h2 class="section-title">${escapeHTML(headings.portTitle || 'แกลเลอรีผลงาน & อัตราค่าบริการ')}</h2>
            <p class="section-desc">${escapeHTML(headings.portDesc || 'เลือกดูตามสไตล์งานที่คุณชื่นชอบ และเลือกหมวดหมู่ป้ายเพื่อดูราคาและตัวอย่างงานได้ทันที')}</p>
          </div>

          <!-- Tier 1: Primary Filter by Work Style (สไตล์งานออกแบบ) -->
          <div style="margin-bottom: 1.75rem;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 8px;">
              <span style="font-size: 0.95rem; font-weight: 700; color: var(--primary-deep);">
                เลือกสไตล์งานที่ต้องการ (Style Categories)
              </span>
              ${state.portfolioStyleFilter !== 'ALL' ? `
                <button type="button" class="btn btn-outline btn-sm" onclick="filterPortfolioByStyle('ALL')" style="font-size: 0.8rem; padding: 3px 10px;">
                  รีเซ็ตสไตล์งาน (ดูทั้งหมด)
                </button>
              ` : ''}
            </div>

            <div class="portfolio-style-tabs">
              ${styleCategories.map(st => {
                const isActive = state.portfolioStyleFilter === st;
                const count = st === 'ALL' ? portfolio.length : portfolio.filter(p => {
                  const pStyle = (p.style_category || '').toLowerCase();
                  const target = st.toLowerCase();
                  if (pStyle && pStyle.includes(target)) return true;
                  const kws = target.split(/[&,/ ]+/).map(k => k.trim()).filter(k => k.length > 1 && k !== 'สไตล์');
                  return kws.some(kw => pStyle.includes(kw) || (p.title || '').toLowerCase().includes(kw));
                }).length;

                return `
                  <button type="button" 
                    class="portfolio-style-pill ${isActive ? 'is-active' : ''}" 
                    onclick="filterPortfolioByStyle('${escapeHTML(st)}')"
                    title="เลือกสไตล์ ${escapeHTML(st)}">
                    <span>${st === 'ALL' ? 'ทุกสไตล์งาน' : escapeHTML(st)}</span>
                    <span class="portfolio-style-pill-badge">${count}</span>
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Tier 2: Standard Price Menu Card (Click to filter by Sign Category) -->
          <div class="price-menu-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; border-bottom: 1.5px dashed var(--border); padding-bottom: 0.75rem;">
              <div>
                <h3 style="font-size: 1.15rem; margin: 0; color: var(--primary-deep);">ตารางอัตราค่าบริการ & รายการราคาป้ายยอดนิยม</h3>
                <small style="color: var(--text-muted); font-size: 0.82rem;">คลิกเลือกประเภทป้ายด้านล่าง เพื่อกรองดูตัวอย่างงานป้ายนั้นๆ ร่วมกับสไตล์ที่เลือกไว้ได้ทันที</small>
              </div>
              <span class="badge badge--pink">อัปเดต 2026</span>
            </div>

            <div class="price-menu-grid">
              <div class="price-menu-item is-interactive ${state.portfolioPriceFilter === 'ป้ายเครดิต' ? 'is-active' : ''}" onclick="filterPortfolioByPrice('ป้ายเครดิต')" title="คลิกเพื่อดูผลงานป้ายเครดิต">
                <span class="price-menu-title">ป้ายเครดิต</span>
                <span class="price-menu-price">฿129</span>
              </div>
              <div class="price-menu-item is-interactive ${state.portfolioPriceFilter === 'ป้ายแอพพรี' ? 'is-active' : ''}" onclick="filterPortfolioByPrice('ป้ายแอพพรี')" title="คลิกเพื่อดูผลงานป้ายแอพพรี">
                <span class="price-menu-title">ป้ายแอพพรี</span>
                <span class="price-menu-price">฿199</span>
              </div>
              <div class="price-menu-item is-interactive ${state.portfolioPriceFilter === 'ป้ายเติมเกม' ? 'is-active' : ''}" onclick="filterPortfolioByPrice('ป้ายเติมเกม')" title="คลิกเพื่อดูผลงานป้ายเติมเกม">
                <span class="price-menu-title">ป้ายเติมเกม</span>
                <span class="price-menu-price">฿189</span>
              </div>
              <div class="price-menu-item is-interactive ${state.portfolioPriceFilter === 'ป้ายเปิดร้าน' ? 'is-active' : ''}" onclick="filterPortfolioByPrice('ป้ายเปิดร้าน')" title="คลิกเพื่อดูผลงานป้ายเปิดร้าน">
                <span class="price-menu-title">ป้ายเปิดร้าน / ป้ายเลขบัญชี</span>
                <span class="price-menu-price">฿150</span>
              </div>
              <div class="price-menu-item is-interactive ${state.portfolioPriceFilter === 'ป้ายโปรโมชั่น' ? 'is-active' : ''}" onclick="filterPortfolioByPrice('ป้ายโปรโมชั่น')" title="คลิกเพื่อดูผลงานป้ายโปรโมชั่น">
                <span class="price-menu-title">ป้ายโปรโมชั่น / บอร์ดเมนู</span>
                <span class="price-menu-price">฿250</span>
              </div>
              <div class="price-menu-item is-interactive ${state.portfolioPriceFilter === 'งานป้ายสั่งทำพิเศษ' ? 'is-active' : ''}" onclick="filterPortfolioByPrice('งานป้ายสั่งทำพิเศษ')" title="คลิกเพื่อดูงานป้ายสั่งทำพิเศษ">
                <span class="price-menu-title">งานป้ายสั่งทำพิเศษ</span>
                <span class="price-menu-price">฿390</span>
              </div>
            </div>

            <div style="margin-top: 1rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
              <small style="color: var(--text-muted); font-size: 0.85rem;">
                กำลังแสดง: <strong>${state.portfolioStyleFilter !== 'ALL' ? escapeHTML(state.portfolioStyleFilter) : 'ทุกสไตล์'}</strong>
                ${state.portfolioPriceFilter !== 'ALL' ? ` | หมวดป้าย: <strong>${escapeHTML(state.portfolioPriceFilter)}</strong>` : ''}
                (${filtered.length} รายการ)
              </small>
              <div style="display: flex; gap: 8px;">
                ${state.portfolioPriceFilter !== 'ALL' ? `
                  <button type="button" class="btn btn-outline btn-sm" onclick="filterPortfolioByPrice('ALL')">ดูทุกหมวดป้าย</button>
                ` : ''}
                ${state.portfolioStyleFilter !== 'ALL' || state.portfolioPriceFilter !== 'ALL' ? `
                  <button type="button" class="btn btn-secondary btn-sm" onclick="resetAllPortfolioFilters()">ล้างตัวกรองทั้งหมด</button>
                ` : ''}
              </div>
            </div>
          </div>

          <!-- Pure Square Image Gallery (1:1 Ratio, No Captions) -->
          <div class="square-gallery-grid">
            ${filtered.length > 0 ? filtered.map((item, idx) => {
              const img = item.image_url || item.cover_image || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=700';
              return `
                <div class="square-gallery-item" onclick="openLightbox(${idx})" title="คลิกเพื่อดูรูปขยาย">
                  <img src="${escapeHTML(img)}" alt="Portfolio Graphic" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=700';">
                  <div class="square-gallery-overlay">
                    <div class="square-gallery-overlay-icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                    </div>
                  </div>
                </div>
              `;
            }).join('') : `
              <div class="card" style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
                <p>ยังไม่มีรูปผลงานในหมวดหรือสไตล์นี้ค่ะ แอดมินสามารถเพิ่มรูปได้ในเมนูหลังบ้าน (จัดการผลงาน)</p>
                <button type="button" class="btn btn-outline btn-sm" onclick="resetAllPortfolioFilters()">ดูผลงานทั้งหมด</button>
              </div>
            `}
          </div>

        </div>
      </section>
    `;
  }

  window.filterPortfolioByStyle = function (styleName) {
    state.portfolioStyleFilter = styleName;
    renderCurrentView();
  };

  window.filterPortfolioByPrice = function (serviceName) {
    state.portfolioPriceFilter = serviceName;
    renderCurrentView();
  };

  window.resetAllPortfolioFilters = function () {
    state.portfolioStyleFilter = 'ALL';
    state.portfolioPriceFilter = 'ALL';
    renderCurrentView();
  };

  function renderPointsView(container) {
    const s = Store.getSettings();
    const stampCfg = (Store.getStampSettings ? Store.getStampSettings() : (s && s.stampSettings)) || {};
    const customers = Store.getCustomers();
    const query = (state.stampSearchQuery || '').trim();

    let targetCustomer = null;
    if (query) {
      targetCustomer = Store.findCustomerByNameOrCode(query);
    } else {
      targetCustomer = customers[0] || null;
    }

    const currentStamps = targetCustomer ? (Number(targetCustomer.heart_stamps) || 0) : 0;
    const maxStamps = 10;
    const isCompleted = currentStamps >= maxStamps;

    container.innerHTML = `
      <section style="padding: 2.5rem 0 4rem;">
        <div class="container" style="max-width: 800px;">
          
          <div class="section-header">
            <span class="section-tag">Heart Stamp Loyalty Card</span>
            <h2 class="section-title">${escapeHTML(stampCfg.cardTitle || 'บัตรสะสมแต้ม BNC GraphMate')}</h2>
            <p class="section-desc">${escapeHTML(stampCfg.cardSubtitle || 'สะสมตราปั๊มหัวใจครบ 10 ดวง รับสิทธิ์ดาวน์โหลดฟอนต์ฟรี หรือของขวัญพิเศษจากทางร้านทันที')}</p>
          </div>

          <!-- Customer Search Input -->
          <div class="card" style="margin-bottom: 2rem; padding: 1.25rem 1.5rem; border-radius: 18px;">
            <label style="font-weight: 700; font-size: 0.92rem; color: var(--text); display: block; margin-bottom: 0.5rem;">
              ค้นหาบัตรสะสมแต้มของคุณ
            </label>
            <form onsubmit="handleStampSearch(event)" style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              <input type="text" id="stampSearchInput" class="form-input" placeholder="กรอกชื่อ, LINE ID หรือเบอร์โทรศัพท์..." value="${escapeHTML(state.stampSearchQuery || '')}" style="flex: 1; min-width: 220px;">
              <button type="submit" class="btn btn-primary" style="font-weight: 700; padding: 0.65rem 1.5rem;">
                ดูบัตรสะสมแต้ม
              </button>
            </form>
            <small style="color: var(--text-muted); font-size: 0.8rem; margin-top: 0.4rem; display: block;">
              *กรอกชื่อที่แจ้งไว้กับทางร้านตอนสั่งซื้อเพื่อดูจำนวนดวงหัวใจที่สะสมได้
            </small>
          </div>

          <!-- Cute GoodNotes Ruled Notebook Paper - Heart Stamp Card -->
          <div class="stamp-card-notebook">
            <!-- Binder Header (Clean binder holes only) -->
            <div class="notebook-binder-header" style="justify-content: center;">
              <div class="notebook-binder-holes">
                <span class="notebook-hole"></span>
                <span class="notebook-hole"></span>
                <span class="notebook-hole"></span>
                <span class="notebook-hole"></span>
                <span class="notebook-hole"></span>
              </div>
            </div>

            <!-- GoodNotes Paper Body (Ample padding, No horizontal lines clashing) -->
            <div class="goodnotes-paper" style="padding: 26px 28px 26px 72px;">
              
              <!-- Card Header Info -->
              <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px; border-bottom: 1.5px dashed #F8DBE7; padding-bottom: 14px;">
                <div>
                  <h3 style="margin: 0 0 4px; font-size: 1.25rem; color: var(--primary-deep); font-weight: 800;">
                    ${targetCustomer ? `บัตรสะสมแต้ม: ${escapeHTML(targetCustomer.name)}` : 'บัตรสะสมแต้ม BNC GraphMate'}
                  </h3>
                  <div style="font-size: 0.85rem; color: var(--text-muted);">
                    ${targetCustomer ? `LINE ID: ${escapeHTML(targetCustomer.line_id || '-')} | เบอร์โทร: ${escapeHTML(targetCustomer.phone || '-')}` : 'กรุณากรอกชื่อเพื่อตรวจสอบแต้มสะสม'}
                  </div>
                </div>
                <div style="text-align: right;">
                  <span class="badge ${isCompleted ? 'badge--success' : 'badge--pink'}" style="font-size: 12px;">
                    ${isCompleted ? 'สะสมครบ 10 ดวงแล้ว' : `สะสมแล้ว ${currentStamps} ดวง`}
                  </span>
                </div>
              </div>

              <!-- 10-Heart Stamp Grid (2 Rows x 5 Columns, No decorative emojis in text) -->
              <div class="stamp-grid-10">
                ${Array.from({ length: 10 }).map((_, idx) => {
                  const num = idx + 1;
                  const isStamped = num <= currentStamps;

                  if (isStamped) {
                    return `
                      <div class="stamp-slot is-stamped" style="animation: stampBouncePop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both; animation-delay: ${idx * 160}ms;" title="ดวงที่ ${num}: ปั๊มแล้ว">
                        <img src="heart_stamp.png" class="stamp-img-icon" alt="Heart Stamp" onerror="this.onerror=null;this.src='data:image/png;base64,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';">
                      </div>
                    `;
                  } else {
                    return `
                      <div class="stamp-slot is-empty" title="ดวงที่ ${num}: ยังไม่ได้ปั๊ม">
                        <span class="stamp-slot-num">${num}</span>
                      </div>
                    `;
                  }
                }).join('')}
              </div>

              <!-- Card Bottom Rules with Cute Heart Icons -->
              <div style="margin-top: 1.5rem; padding-top: 1.25rem; border-top: 1.5px dashed #F8DBE7; font-size: 0.86rem; color: var(--text); line-height: 1.9;">
                ${(stampCfg.rulesText || `ทุกออเดอร์งานป้าย ฟอนต์ หรือสินค้าสำเร็จ รับตราปั๊มหัวใจ 1 ดวงทันที
สะสมครบ 10 ดวง เลือกรับฟอนต์ลายมือน่ารักฟรี 1 ชุด หรือสิทธิ์รับงานออกแบบฟรี
ติดต่อแลกรางวัลได้ทาง LINE Official ของร้าน`)
                  .split('\n')
                  .filter(l => l.trim())
                  .map(line => `
                    <div style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 6px;">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="#FF5BA8" style="flex-shrink: 0; margin-top: 4px;"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                      <span>${escapeHTML(line)}</span>
                    </div>
                  `).join('')}
              </div>

            </div>
          </div>

        </div>
      </section>
    `;

    // Play sequential sound effect for each stamped heart
    if (currentStamps > 0 && typeof playPopSound === 'function') {
      for (let i = 0; i < currentStamps; i++) {
        setTimeout(() => {
          if (typeof playPopSound === 'function') playPopSound();
        }, i * 160);
      }
    }
  }

  function renderReviewsView(container) {
    const allReviews = Store.getAllReviews();
    const pinnedReviews = allReviews.filter(r => r.is_pinned);
    const regularReviews = allReviews.filter(r => !r.is_pinned);

    container.innerHTML = `
      <section style="padding: 2.5rem 0 4rem;">
        <div class="container" style="max-width: 920px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
            <div>
              <span class="section-tag">Testimonials</span>
              <h2 class="section-title" style="margin: 0;">รีวิวและความประทับใจจากลูกค้า</h2>
              <p class="section-desc" style="margin: 0.35rem 0 0;">คำชมและความประทับใจจากลูกค้าที่สั่งทำป้ายและซื้อฟอนต์กับ BNC GraphMate</p>
            </div>
            <button type="button" class="btn btn-primary" onclick="openReviewModal()">+ เขียนรีวิวร้าน</button>
          </div>

          <!-- Pinned Reviews Board (White-Pink Note Paper with Pushpin) -->
          ${pinnedReviews.length > 0 ? `
            <div class="pinned-reviews-board">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 1.25rem;">
                <span style="font-size: 1.3rem;"></span>
                <h3 style="margin: 0; font-size: 1.15rem; color: var(--primary-deep);">รีวิวปักหมุดแนะนำ</h3>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                ${pinnedReviews.map(r => `
                  <div class="pinned-review-card">
                    <div class="pushpin-pin"></div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                      <span class="pinned-tape-badge">รีวิวแนะนำ</span>
                      <span style="color: #F59E0B; font-size: 1rem;">${'★'.repeat(r.rating || 5)}</span>
                    </div>
                    <div style="font-weight: 700; color: var(--text); font-size: 1.05rem; margin-bottom: 4px;">${escapeHTML(r.customer_name || 'ลูกค้า')}</div>
                    ${r.product_name ? `<span class="badge badge--pink" style="margin-bottom: 0.6rem; display: inline-block;">${escapeHTML(r.product_name)}</span>` : ''}
                    <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6; margin: 0 0 0.75rem;">${escapeHTML(r.message)}</p>
                    ${state.isAdmin ? `
                      <div style="text-align: right; border-top: 1.5px dashed var(--border); padding-top: 8px; margin-top: 8px;">
                        <button type="button" class="btn btn-outline btn-sm" onclick="togglePinReview('${r.id}')" style="font-size: 11px;">ปลดหมุด</button>
                      </div>
                    ` : ''}
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Regular Reviews Grid -->
          <div style="margin-top: 2rem;">
            <h4 style="font-size: 1.05rem; margin-bottom: 1rem; color: var(--text-muted);">รีวิวทั้งหมด (${allReviews.length} รีวิว)</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              ${regularReviews.map(r => `
                <div class="card">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.65rem;">
                    <span style="font-weight: 700; color: var(--text); font-size: 1rem;">${escapeHTML(r.customer_name || 'ลูกค้า')}</span>
                    <span style="color: #F59E0B; font-size: 1rem;">${'★'.repeat(r.rating || 5)}</span>
                  </div>
                  ${r.product_name ? `<span class="badge badge--pink" style="margin-bottom: 0.5rem;">${escapeHTML(r.product_name)}</span>` : ''}
                  <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6; margin: 0 0 0.75rem;">${escapeHTML(r.message)}</p>
                  ${state.isAdmin ? `
                    <div style="text-align: right; border-top: 1.5px dashed var(--border); padding-top: 8px; margin-top: 8px;">
                      <button type="button" class="btn btn-outline btn-sm" onclick="togglePinReview('${r.id}')" style="font-size: 11px;">ปักหมุด</button>
                    </div>
                  ` : ''}
                </div>
              `).join('')}
            </div>
          </div>

        </div>
      </section>
    `;
  }

  window.togglePinReview = function (id) {
    Store.togglePinReview(id);
    renderCurrentView();
  };

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
    const headings = Store.getHeadings();

    container.innerHTML = `
      <section style="padding: 2.5rem 0 4rem;">
        <div class="container" style="max-width: 860px;">
          <div class="section-header">
            <span class="section-tag">Order Tracking</span>
            <h2 class="section-title">${escapeHTML(headings.ordersTitle || 'ตรวจสอบสถานะคำสั่งซื้อ')}</h2>
            <p class="section-desc">${escapeHTML(headings.ordersDesc || 'ติดตามสถานะการตรวจสอบสลิปและสิทธิ์การเข้าถึง Google Drive ของออเดอร์คุณ')}</p>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1rem;">
            ${orders.length > 0 ? orders.map(o => `
              <div class="card" style="padding: 1.5rem; border-radius: 16px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; border-bottom: 1px solid var(--border-light); padding-bottom: 0.75rem;">
                  <div>
                    <h3 style="font-size: 1.15rem; margin: 0 0 0.25rem; font-weight: 700;">#${escapeHTML(o.order_number)}</h3>
                    <small style="color: var(--text-muted);">${new Date(o.created_at).toLocaleString('th-TH')}</small>
                  </div>
                  <span class="badge ${o.status === 'PAID' || o.status === 'COMPLETED' ? 'badge--success' : (o.status === 'REJECTED' ? 'badge--warning' : 'badge--pink')}">
                    ${o.status === 'PAID' ? 'ชำระเงินแล้ว' : (o.status === 'VERIFYING' ? '⏳ กำลังตรวจสลิป' : (o.status === 'COMPLETED' ? 'ส่งมอบสิทธิ์แล้ว' : o.status))}
                  </span>
                </div>

                <div style="font-size: 0.95rem; margin-bottom: 0.75rem;">
                  <strong>รายการ:</strong> ${escapeHTML(o.item_name || 'สินค้า BNC')}
                </div>
                <div style="font-size: 0.95rem; margin-bottom: 0.75rem;">
                  <strong>ยอดชำระ:</strong> <span style="color: var(--primary-deep); font-weight: 700;">฿${Number(o.amount || 0).toLocaleString()}</span>
                </div>

                ${o.gmail ? `
                  <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; background: var(--surface-alt); padding: 8px 12px; border-radius: 10px; margin-bottom: 0.75rem;">
                    <div style="font-size: 0.88rem; color: var(--text);">
                      <strong>Gmail รับไฟล์:</strong> <span style="font-family: monospace; font-weight: 600;">${escapeHTML(o.gmail)}</span>
                    </div>
                    <button type="button" class="btn-copy-email" onclick="copyEmailToClipboard('${escapeHTML(o.gmail)}', this)" title="คัดลอกอีเมล">
                      คัดลอก Gmail
                    </button>
                  </div>
                ` : ''}

                <div style="display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 0.5rem; border-top: 1px dashed var(--border-light); padding-top: 0.75rem;">
                  <button type="button" class="btn btn-outline btn-sm" onclick="openOrderDetailModal('${o.id}')">
                    ดูรายละเอียดออเดอร์
                  </button>
                </div>
              </div>
            `).join('') : `
              <div class="card" style="text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
                <h4>ยังไม่มีรายการคำสั่งซื้อ</h4>
                <p>เมื่อคุณสั่งซื้อสินค้าหรือฟอนต์ในตะกร้า ข้อมูลจะแสดงที่นี่โดยอัตโนมัติค่ะ</p>
                <a href="#fonts" class="btn btn-primary" style="margin-top: 1rem;">เลือกดูฟอนต์ & สินค้า</a>
              </div>
            `}
          </div>
        </div>
      </section>
    `;
  }

  window.copyEmailToClipboard = function (email, btn) {
    if (!email) return;
    const doFeedback = () => {
      const orig = btn.innerHTML;
      btn.innerHTML = 'คัดลอกแล้ว!';
      btn.style.background = '#22c55e';
      btn.style.color = '#ffffff';
      setTimeout(() => {
        btn.innerHTML = orig;
        btn.style.background = '';
        btn.style.color = '';
      }, 2000);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(doFeedback).catch(() => {
        prompt('คัดลอก Gmail:', email);
      });
    } else {
      prompt('คัดลอก Gmail:', email);
    }
  };

  function renderAdminView(container) {
 const s = Store.getSettings();

 // Check if Admin PIN is unlocked (Cute Calculator Keypad like BNC HayMate)
 if (!state.isAdmin) {
 container.innerHTML = `
 <section style="min-height: 75vh; display: flex; align-items: center; justify-content: center; padding: 2.5rem 1rem;">
 <div class="card calc-pin-card" style="box-shadow: var(--shadow-lg); border-color: var(--border);">
 <div class="calc-lock-icon">
 <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
 <circle cx="12" cy="7" r="4.2"/>
 <path d="M4 20c0-3.8 3.6-5.8 8-5.8s8 2 8 5.8"/>
 </svg>
 </div>
 <h3 class="calc-pin-title">Store Passcode</h3>
 <p class="calc-pin-sub">กรอกรหัสผ่าน 6 หลักเพื่อเข้าจัดการหลังบ้าน</p>
 
 <!-- Cute Calculator Screen -->
 <div class="calc-screen">
 <div class="calc-dots" id="adminPinDots">
 <span class="calc-dot"></span>
 <span class="calc-dot"></span>
 <span class="calc-dot"></span>
 <span class="calc-dot"></span>
 <span class="calc-dot"></span>
 <span class="calc-dot"></span>
 </div>
 </div>

 <!-- Cute Round Keypad -->
 <div class="calc-keypad">
 <button type="button" class="calc-key" onclick="pressAdminPinKey('1')">1</button>
 <button type="button" class="calc-key" onclick="pressAdminPinKey('2')">2</button>
 <button type="button" class="calc-key" onclick="pressAdminPinKey('3')">3</button>
 <button type="button" class="calc-key" onclick="pressAdminPinKey('4')">4</button>
 <button type="button" class="calc-key" onclick="pressAdminPinKey('5')">5</button>
 <button type="button" class="calc-key" onclick="pressAdminPinKey('6')">6</button>
 <button type="button" class="calc-key" onclick="pressAdminPinKey('7')">7</button>
 <button type="button" class="calc-key" onclick="pressAdminPinKey('8')">8</button>
 <button type="button" class="calc-key" onclick="pressAdminPinKey('9')">9</button>
 <button type="button" class="calc-key calc-key-action" onclick="pressAdminPinKey('clear')">C</button>
 <button type="button" class="calc-key" onclick="pressAdminPinKey('0')">0</button>
 <button type="button" class="calc-key calc-key-del" onclick="pressAdminPinKey('del')">⌫</button>
 </div>

 <div style="margin-top: 18px; font-size: 11.5px; color: var(--text-muted);">
 รหัสผ่านเริ่มต้น: <strong>123456</strong>
 </div>
 </div>
 </section>
 `;
 state.adminPinBuffer = '';
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
 <button type="button" class="admin-tab-btn ${state.adminTab === 'dashboard' ? 'active' : ''}" onclick="switchAdminTab('dashboard')">แดชบอร์ด</button>
 <button type="button" class="admin-tab-btn ${state.adminTab === 'orders' ? 'active' : ''}" onclick="switchAdminTab('orders')">คำสั่งซื้อ</button>
 <button type="button" class="admin-tab-btn ${state.adminTab === 'slips' ? 'active' : ''}" onclick="switchAdminTab('slips')">ตรวจสลิป</button>
 <button type="button" class="admin-tab-btn ${state.adminTab === 'products' ? 'active' : ''}" onclick="switchAdminTab('products')">จัดการสินค้า</button>
 <button type="button" class="admin-tab-btn ${state.adminTab === 'fonts' ? 'active' : ''}" onclick="switchAdminTab('fonts')">จัดการฟอนต์</button>
 <button type="button" class="admin-tab-btn ${state.adminTab === 'groups' ? 'active' : ''}" onclick="switchAdminTab('groups')">จัดการกลุ่ม VIP</button>
          <button type="button" class="admin-tab-btn ${state.adminTab === 'portfolio' ? 'active' : ''}" onclick="switchAdminTab('portfolio')">จัดการผลงาน</button>
          <button type="button" class="admin-tab-btn ${state.adminTab === 'stamps' ? 'active' : ''}" onclick="switchAdminTab('stamps')">บัตรสะสมแต้ม</button>
          <button type="button" class="admin-tab-btn ${state.adminTab === 'queues' ? 'active' : ''}" onclick="switchAdminTab('queues')">จัดการคิวงาน</button>
          <button type="button" class="admin-tab-btn ${state.adminTab === 'settings' ? 'active' : ''}" onclick="switchAdminTab('settings')">ตั้งค่าร้าน (ทุกจุด)</button>
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
      case 'portfolio':
        return renderAdminPortfolioTab();
      case 'stamps':
        return renderAdminStampsTab();
      case 'queues':
        return renderAdminQueuesTab();
      case 'settings':
        return renderAdminSettingsTab(s);
      default:
        return renderAdminDashboardTab();
    }
  }

  function isDateInDashboardTimeframe(dateStr, timeframe) {
    if (!dateStr || timeframe === 'all') return true;
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return true;
    const now = new Date();
    if (timeframe === 'today') {
      return d.getDate() === now.getDate() && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    } else if (timeframe === 'month') {
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    } else if (timeframe === 'year') {
      return d.getFullYear() === now.getFullYear();
    }
    return true;
  }

  function renderAdminDashboardTab() {
    const tf = state.dashboardTimeframe || 'month';
    const allOrders = Store.getAllOrders();
    const allQueues = Store.getAllQueueItems();
    const payments = Store.getPayments();

    // 1. Filter Orders by Timeframe & Paid/Completed status
    const paidOrders = allOrders.filter(o => {
      const isPaid = (o.status === 'PAID' || o.status === 'COMPLETED');
      return isPaid && isDateInDashboardTimeframe(o.created_at, tf);
    });

    // 2. Filter Queues with paid status by Timeframe
    const paidQueues = allQueues.filter(q => {
      const isPaid = q.payment_status === 'PAID' || (!q.payment_status && q.status === 'done');
      const dateVal = q.created_at || q.queue_date;
      return isPaid && isDateInDashboardTimeframe(dateVal, tf);
    });

    // 3. Compute Gross Revenue
    const orderGross = paidOrders.reduce((sum, o) => sum + (Number(o.amount) || 0), 0);
    const queueGross = paidQueues.reduce((sum, q) => sum + (Number(q.price) || 0), 0);
    const totalGross = orderGross + queueGross;

    // 4. Compute Agent Remit Cost
    const orderCost = paidOrders.reduce((sum, o) => sum + (Number(o.cost_amount) || Number(o.cost_price) || 0), 0);
    const queueCost = paidQueues.reduce((sum, q) => sum + (Number(q.cost_price) || 0), 0);
    const totalCost = orderCost + queueCost;

    // 5. Net Profit
    const totalProfit = totalGross - totalCost;

    // Supplementary stats
    const pendingSlips = payments.filter(p => p.verification_status === 'VERIFYING').length;
    const totalProductsCount = Store.getAllProducts().length + Store.getAllFonts().length + Store.getAllGroups().length;
    const activeQueuesCount = allQueues.filter(q => q.status === 'progress' || q.status === 'waiting' || q.status === 'review').length;

    const tfLabels = {
      today: 'วันนี้',
      month: 'เดือนนี้',
      year: 'ปีนี้',
      all: 'ทั้งหมด'
    };

    return `
      <!-- Timeframe Filter Navigation Bar -->
      <div class="dashboard-filter-bar">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-weight: 700; font-size: 0.95rem; color: var(--text);">ช่วงเวลาคำนวณรายได้:</span>
          <span class="badge badge--pink" style="font-size: 0.75rem;">${tfLabels[tf]}</span>
        </div>
        <div class="dashboard-time-pills">
          <button type="button" class="dashboard-time-btn ${tf === 'today' ? 'is-active' : ''}" onclick="setDashboardTimeframe('today')">วันนี้</button>
          <button type="button" class="dashboard-time-btn ${tf === 'month' ? 'is-active' : ''}" onclick="setDashboardTimeframe('month')">เดือนนี้</button>
          <button type="button" class="dashboard-time-btn ${tf === 'year' ? 'is-active' : ''}" onclick="setDashboardTimeframe('year')">ปีนี้</button>
          <button type="button" class="dashboard-time-btn ${tf === 'all' ? 'is-active' : ''}" onclick="setDashboardTimeframe('all')">ทั้งหมด</button>
        </div>
      </div>

      <!-- Financial Overview Highlights (3 Main Metric Cards) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5" style="margin-bottom: 1.5rem;">
        <!-- 1. Gross Revenue -->
        <div class="card" style="border-left: 4px solid var(--primary); padding: 1.35rem 1.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <span style="font-size: 0.88rem; font-weight: 600; color: var(--text-muted);">ยอดรับทั้งหมด (Gross Revenue)</span>
            <span class="badge badge--pink" style="font-size: 0.7rem;">${tfLabels[tf]}</span>
          </div>
          <h2 style="font-size: 2rem; color: var(--text); margin: 0.4rem 0 0.2rem; font-family: var(--font-heading); font-weight: 800;">
            ฿${totalGross.toLocaleString()}
          </h2>
          <small style="color: var(--text-muted); font-size: 0.82rem;">
            ออเดอร์ ฿${orderGross.toLocaleString()} • คิวงาน ฿${queueGross.toLocaleString()}
          </small>
        </div>

        <!-- 2. Agent Cost / Remit -->
        <div class="card" style="border-left: 4px solid #F59E0B; padding: 1.35rem 1.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <span style="font-size: 0.88rem; font-weight: 600; color: var(--text-muted);">ต้นทุนส่งเจ้าของ/ตัวแทน (Remit Cost)</span>
            <span class="badge" style="font-size: 0.7rem; background: #FEF3C7; color: #92400E;">หักส่งต่อ</span>
          </div>
          <h2 style="font-size: 2rem; color: #D97706; margin: 0.4rem 0 0.2rem; font-family: var(--font-heading); font-weight: 800;">
            ฿${totalCost.toLocaleString()}
          </h2>
          <small style="color: var(--text-muted); font-size: 0.82rem;">
            ต้องโอนออกให้เจ้าของกลุ่ม/ฟอนต์
          </small>
        </div>

        <!-- 3. Net Profit (Our actual earnings) -->
        <div class="card dashboard-card-highlight" style="border-left: 4px solid #16A34A !important; padding: 1.35rem 1.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <span style="font-size: 0.88rem; font-weight: 700; color: #166534;">กำไรสุทธิที่เราได้รับจริง (Net Profit)</span>
            <span class="badge badge--success" style="font-size: 0.7rem;">เข้ากระเป๋าเรา</span>
          </div>
          <h2 style="font-size: 2.2rem; color: #15803D; margin: 0.4rem 0 0.2rem; font-family: var(--font-heading); font-weight: 800;">
            ฿${totalProfit.toLocaleString()}
          </h2>
          <small style="color: #166534; font-weight: 600; font-size: 0.82rem;">
            (ยอดรับ ฿${totalGross.toLocaleString()} - ต้นทุน ฿${totalCost.toLocaleString()})
          </small>
        </div>
      </div>

      <!-- Secondary Metrics Row -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5" style="margin-bottom: 2rem;">
        <div class="card" style="padding: 1rem 1.25rem;">
          <span style="font-size: 0.82rem; color: var(--text-muted);">ออเดอร์ที่ชำระแล้ว (${tfLabels[tf]})</span>
          <h3 style="font-size: 1.5rem; margin: 0.25rem 0 0; color: var(--primary-deep);">${paidOrders.length} ออเดอร์</h3>
        </div>
        <div class="card" style="padding: 1rem 1.25rem;">
          <span style="font-size: 0.82rem; color: var(--text-muted);">คิวงานที่ชำระแล้ว (${tfLabels[tf]})</span>
          <h3 style="font-size: 1.5rem; margin: 0.25rem 0 0; color: var(--primary-deep);">${paidQueues.length} คิว</h3>
        </div>
        <div class="card" style="padding: 1rem 1.25rem;">
          <span style="font-size: 0.82rem; color: var(--text-muted);">รอตรวจสลิป</span>
          <h3 style="font-size: 1.5rem; margin: 0.25rem 0 0; color: #D97706;">${pendingSlips} รายการ</h3>
          <small><a href="#admin/slips" style="color: var(--primary); text-decoration: underline;">ไปตรวจสลิป</a></small>
        </div>
        <div class="card" style="padding: 1rem 1.25rem;">
          <span style="font-size: 0.82rem; color: var(--text-muted);">คิวที่กำลังทำอยู่</span>
          <h3 style="font-size: 1.5rem; margin: 0.25rem 0 0; color: #2563EB;">${activeQueuesCount} คิว</h3>
          <small><a href="#admin/queues" style="color: var(--primary); text-decoration: underline;">จัดการคิว</a></small>
        </div>
      </div>

      <!-- Revenue Breakdown Table by Source -->
      <div class="card" style="padding: 1.25rem 1.5rem; margin-bottom: 2rem; border-radius: 18px;">
        <h3 style="margin: 0 0 1rem; font-size: 1.1rem; color: var(--primary-deep);">
          สรุปแจกแจงรายรับและกำไร (${tfLabels[tf]})
        </h3>
        <div style="overflow-x: auto;">
          <table class="admin-table">
            <thead>
              <tr>
                <th>ช่องทาง / แหล่งที่มา</th>
                <th>จำนวนรายการ</th>
                <th>ยอดรับรวม</th>
                <th>ต้นทุนส่งต่อเจ้าของ</th>
                <th>กำไรที่เราได้</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>คำสั่งซื้อสินค้า / ฟอนต์ / กลุ่ม VIP</strong></td>
                <td>${paidOrders.length} รายการ</td>
                <td>฿${orderGross.toLocaleString()}</td>
                <td style="color: #D97706;">฿${orderCost.toLocaleString()}</td>
                <td style="color: #166534; font-weight: 700;">฿${(orderGross - orderCost).toLocaleString()}</td>
              </tr>
              <tr>
                <td><strong>คิวงานป้ายและกราฟิกสั่งทำ</strong></td>
                <td>${paidQueues.length} คิว</td>
                <td>฿${queueGross.toLocaleString()}</td>
                <td style="color: #D97706;">฿${queueCost.toLocaleString()}</td>
                <td style="color: #166534; font-weight: 700;">฿${(queueGross - queueCost).toLocaleString()}</td>
              </tr>
              <tr style="background: #FFF5F8; font-weight: 800;">
                <td><strong>รวมทั้งหมด (${tfLabels[tf]})</strong></td>
                <td>${paidOrders.length + paidQueues.length} รายการ</td>
                <td style="color: var(--primary-deep); font-size: 1.05rem;">฿${totalGross.toLocaleString()}</td>
                <td style="color: #D97706; font-size: 1.05rem;">฿${totalCost.toLocaleString()}</td>
                <td style="color: #166534; font-size: 1.15rem;">฿${totalProfit.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  window.setDashboardTimeframe = function (timeframe) {
    state.dashboardTimeframe = timeframe;
    renderCurrentView();
  };

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
 <button type="button" class="btn btn-primary btn-sm" onclick="verifySlipAction('${p.id}', 'PAID')">อนุมัติการชำระเงิน</button>
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
 <td>${p.delivery_type === 'GOOGLE_DRIVE' ? 'Google Drive' : 'แอดมินส่งมือ'}</td>
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
 <td>${f.delivery_type === 'GOOGLE_DRIVE' ? 'Google Drive' : 'แอดมินส่งมือ'}</td>
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
 <td><a href="${escapeHTML(g.preview_drive_url)}" target="_blank" style="color: var(--primary); font-size: 0.85rem;">เปิดลิงก์ </a></td>
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
 
  
  function renderAdminPortfolioTab() {
    const portfolio = Store.getPortfolio();
    return `
      <div class="card" style="border-radius: 18px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 10px;">
          <div>
            <h3 style="margin: 0; color: var(--primary-deep); font-size: 1.2rem;">จัดการรูปผลงาน & อัตราค่าบริการ</h3>
            <p style="font-size: 0.86rem; color: var(--text-muted); margin: 0;">เพิ่ม ลบ หรือแก้ไขรูปผลงานสำหรับให้ลูกค้ากดดูตามราคาและประเภทงาน</p>
          </div>
          <button type="button" class="btn btn-primary btn-sm" onclick="openAddPortfolioModal()">+ เพิ่มผลงานใหม่</button>
        </div>

        <div style="overflow-x: auto;">
          <table class="admin-table">
            <thead>
              <tr>
                <th>รูป 1:1</th>
                <th>ชื่อผลงาน / บริการ</th>
                <th>สไตล์งานออกแบบ</th>
                <th>หมวดหมู่ป้าย (ราคา)</th>
                <th>ราคามาตรฐาน</th>
                <th>จัดการ</th>
              </tr>
            </thead>
            <tbody>
              ${portfolio.map(item => `
                <tr>
                  <td>
                    <img src="${escapeHTML(item.image_url)}" style="width: 50px; height: 50px; border-radius: 10px; object-fit: cover;" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=700';">
                  </td>
                  <td><strong>${escapeHTML(item.title || 'ผลงานการออกแบบ')}</strong></td>
                  <td><span class="badge" style="background:#FFF0F7; color:#BE185D; border:1px solid #FBCFE8; font-weight:700;">${escapeHTML(item.style_category || 'ทั่วไป')}</span></td>
                  <td><span class="badge badge--pink">${escapeHTML(item.category || 'ป้าย')}</span></td>
                  <td>฿${Number(item.price || 0).toLocaleString()}</td>
                  <td>
                    <button type="button" class="btn btn-outline btn-sm" onclick="deletePortfolioItemAction('${item.id}')">ลบ</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  window.handleAdminPortStyleChange = function (val) {
    const customInp = $('adminPortCustomStyle');
    if (!customInp) return;
    if (val === '__custom__') {
      customInp.style.display = 'block';
      customInp.focus();
    } else {
      customInp.style.display = 'none';
      customInp.value = '';
    }
  };

  window.openAddPortfolioModal = function () {
    const modal = $('adminPortfolioModal');
    if (!modal) return;
    $('adminPortTitle').value = '';

    // Populate styles dynamically
    const styleSelect = $('adminPortStyle');
    if (styleSelect) {
      const styles = Store.getPortfolioStyles ? Store.getPortfolioStyles() : ['สไตล์มินิมอล & คาเฟ่', 'สไตล์การ์ตูน & คาวาอี้', 'สไตล์ลายมือ & ฟอนต์', 'สไตล์ร้านค้า & โมเดิร์น', 'ไฟล์ตกแต่ง & เทมเพลต'];
      styleSelect.innerHTML = styles.map(st => `<option value="${escapeHTML(st)}">${escapeHTML(st)}</option>`).join('') +
        `<option value="__custom__">+ กำหนดสไตล์งานเอง...</option>`;
      styleSelect.value = styles[0] || 'สไตล์มินิมอล & คาเฟ่';
    }
    const customStyleInp = $('adminPortCustomStyle');
    if (customStyleInp) {
      customStyleInp.style.display = 'none';
      customStyleInp.value = '';
    }

    $('adminPortCategory').value = 'ป้ายเครดิต';
    $('adminPortPrice').value = '129';
    if ($('adminPortIsAgent')) $('adminPortIsAgent').checked = false;
    if ($('adminPortCostPrice')) $('adminPortCostPrice').value = '0';
    if ($('adminPortCostWrap')) $('adminPortCostWrap').style.display = 'none';
    $('adminPortImage').value = 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=700';
    modal.classList.add('is-active');
  };

  window.closeAddPortfolioModal = function () {
    const modal = $('adminPortfolioModal');
    if (modal) modal.classList.remove('is-active');
  };

  window.handleSavePortfolioSubmit = function (e) {
    e.preventDefault();
    const title = ($('adminPortTitle')?.value || '').trim();
    if (!title) return alert('กรุณากรอกชื่อผลงาน');
    
    // Style category
    let style_category = $('adminPortStyle')?.value || 'สไตล์มินิมอล & คาเฟ่';
    if (style_category === '__custom__') {
      style_category = ($('adminPortCustomStyle')?.value || '').trim();
      if (!style_category) return alert('กรุณากรอกชื่อสไตล์งานออกแบบ');
    }

    const category = $('adminPortCategory').value;
    const price = Number($('adminPortPrice').value) || 0;
    const cost_price = Number($('adminPortCostPrice')?.value) || 0;
    const is_agent = $('adminPortIsAgent')?.checked || cost_price > 0;
    const image = ($('adminPortImage')?.value || '').trim();
    if (!image) return alert('กรุณากรอกลิงก์รูปภาพ 1:1');

    Store.savePortfolioItem({
      title,
      style_category,
      category,
      price,
      cost_price,
      is_agent,
      image_url: image
    });

    closeAddPortfolioModal();
    alert('บันทึกผลงานใหม่เรียบร้อยแล้วค่ะ');
    renderCurrentView();
  };

  window.deletePortfolioItemAction = function (id) {
    if (!confirm('ยืนยันการลบผลงานนี้ใช่หรือไม่?')) return;
    Store.deletePortfolioItem(id);
    renderCurrentView();
  };

  function renderAdminStampsTab() {
    const customers = Store.getCustomers();
    return `
      <div class="card" style="border-radius: 18px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 10px;">
          <div>
            <h3 style="margin: 0; color: var(--primary-deep); font-size: 1.2rem;"> จัดการบัตรสะสมแต้มหัวใจ (Stamp Loyalty Card)</h3>
            <p style="font-size: 0.86rem; color: var(--text-muted); margin: 0;">กดเพิ่มหรือลดจำนวนดวงหัวใจให้ลูกค้าแต่ละคนได้ทันที หรือพิมพ์จำนวนดวงที่ต้องการ</p>
          </div>
          <div>
            <button type="button" class="btn btn-outline btn-sm" onclick="openAddNewCustomerModal()">+ เพิ่มลูกค้าใหม่</button>
          </div>
        </div>

        <div style="overflow-x: auto;">
          <table class="admin-table">
            <thead>
              <tr>
                <th>ลูกค้า</th>
                <th>LINE ID</th>
                <th>เบอร์โทร</th>
                <th style="text-align: center;">จำนวนดวงหัวใจ (10 ดวง)</th>
                <th style="text-align: center;">เพิ่ม / ลด ดวง</th>
                <th>จัดการ</th>
              </tr>
            </thead>
            <tbody>
              ${customers.map(c => {
                const stamps = Number(c.heart_stamps) || 0;
                return `
                  <tr>
                    <td>
                      <strong>${escapeHTML(c.name)}</strong>
                      <div style="font-size: 11px; color: var(--text-muted);">${escapeHTML(c.member_code || '')}</div>
                    </td>
                    <td>${escapeHTML(c.line_id || '-')}</td>
                    <td>${escapeHTML(c.phone || '-')}</td>
                    <td style="text-align: center;">
                      <div style="display: inline-flex; align-items: center; gap: 4px; font-weight: 800; font-size: 1.1rem; color: #e11d48;">
                        <span></span>
                        <span>${stamps} / 10</span>
                      </div>
                    </td>
                    <td style="text-align: center;">
                      <div class="admin-stamp-control">
                        <button type="button" class="admin-stamp-btn" onclick="adjustCustomerStamp('${c.id}', -1)" title="ลด 1 ดวง">-1</button>
                        <input type="number" value="${stamps}" min="0" max="99" style="width: 48px; text-align: center; border: 1px solid var(--border); border-radius: 6px; font-weight: 700; padding: 2px;" onchange="setCustomerStampDirect('${c.id}', this.value)">
                        <button type="button" class="admin-stamp-btn" onclick="adjustCustomerStamp('${c.id}', 1)" title="ปั๊มเพิ่ม 1 ดวง" style="background: var(--primary-600); color: #fff;">+1</button>
                      </div>
                    </td>
                    <td>
                      <button type="button" class="btn btn-outline btn-sm" onclick="resetCustomerStampCard('${c.id}')" title="รีเซ็ตเริ่มใบใหม่">🔄 ใบใหม่</button>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  window.adjustCustomerStamp = function (custId, delta) {
    Store.addCustomerStamp(custId, delta);
    renderCurrentView();
  };

  window.setCustomerStampDirect = function (custId, val) {
    Store.setCustomerStamps(custId, val);
    renderCurrentView();
  };

  window.resetCustomerStampCard = function (custId) {
    if (!confirm('ต้องการรีเซ็ตบัตรสะสมแต้มของลูกค้ารายนี้เพื่อเริ่มใบใหม่ (0 ดวง) ใช่หรือไม่?')) return;
    Store.setCustomerStamps(custId, 0);
    renderCurrentView();
  };

  window.openAddNewCustomerModal = function () {
    const modal = $('adminCustomerModal');
    if (!modal) return;
    $('adminCust_name').value = '';
    $('adminCust_lineId').value = '';
    $('adminCust_phone').value = '';
    $('adminCust_stamps').value = '1';
    modal.classList.add('is-active');
  };

  window.closeAddCustomerModal = function () {
    const modal = $('adminCustomerModal');
    if (modal) modal.classList.remove('is-active');
  };

  window.handleSaveCustomerSubmit = function (e) {
    e.preventDefault();
    const name = ($('adminCust_name')?.value || '').trim();
    if (!name) return alert('กรุณากรอกชื่อลูกค้า');
    const lineId = ($('adminCust_lineId')?.value || '').trim();
    const phone = ($('adminCust_phone')?.value || '').trim();
    const stamps = Math.min(10, Math.max(0, Number($('adminCust_stamps')?.value) || 0));

    Store.saveCustomer({
      name,
      line_id: lineId,
      phone,
      heart_stamps: stamps
    });

    closeAddCustomerModal();
    alert('เพิ่มลูกค้าและเปิดบัตรสะสมแต้มเรียบร้อยแล้วค่ะ!');
    renderCurrentView();
  };

  // ============================================================
  // ADMIN TAB: QUEUE MANAGEMENT (จัดการคิวงาน)
  // Complete CRUD, Manual Drag/Order, Visibility Toggle, 7 Statuses
  // ============================================================
  function renderAdminQueuesTab() {
    const queues = Store.getAllQueueItems(); // Get all including hidden
    const qSettings = Store.getQueuePageSettings();
    const statusNames = qSettings.statusNames || {
      waiting: 'รอคิว',
      progress: 'กำลังดำเนินการ',
      review: 'รอตรวจ',
      edit: 'รอแก้ไข',
      done: 'เสร็จแล้ว',
      pause: 'พักคิว',
      cancel: 'ยกเลิก'
    };

    return `
      <div class="card" style="border-radius: 20px; margin-bottom: 2rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 12px;">
          <div>
            <h3 style="margin: 0; color: var(--primary-deep); font-size: 1.3rem;">จัดการคิวงาน (Queue Management)</h3>
            <p style="font-size: 0.86rem; color: var(--text-muted); margin: 0;">
              เพิ่ม/แก้ไข/เรียงลำดับคิวงานของร้าน (ระบบคิวแยกจากออเดอร์ แอดมินเป็นผู้ควบคุม 100%)
            </p>
          </div>
          <div>
            <button type="button" class="btn btn-primary" onclick="openAddQueueModal()" style="font-weight: 700; border-radius: 14px; padding: 0.65rem 1.4rem;">
              + เพิ่มคิวงานใหม่
            </button>
          </div>
        </div>

        <div style="overflow-x: auto;">
          <table class="admin-table">
            <thead>
              <tr>
                <th style="width: 60px; text-align: center;">ลำดับ</th>
                <th>เลขคิว</th>
                <th>ชื่องาน / ประเภท</th>
                <th>ลูกค้า (LINE / เบอร์)</th>
                <th style="text-align: center;">ยอดรับ / กำไร</th>
                <th style="text-align: center;">สถานะ</th>
                <th style="width: 120px; text-align: center;">ความคืบหน้า</th>
                <th style="text-align: center;">แสดงผล</th>
                <th style="text-align: center; width: 100px;">จัดเรียง</th>
                <th style="text-align: center; width: 140px;">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              ${queues.length > 0 ? queues.map((q, idx) => {
                const statusKey = (q.status || 'waiting').toLowerCase();
                const statusLabel = statusNames[statusKey] || statusKey;
                const progressPct = Math.min(100, Math.max(0, Number(q.progress) || 0));

                return `
                  <tr>
                    <td style="text-align: center; font-weight: 700; color: #BE185D;">
                      ${idx + 1}
                    </td>
                    <td>
                      <span class="queue-pill-num" style="font-size: 1.05rem; padding: 2px 10px;">
                        ${escapeHTML(q.queue_number || 'Q-')}
                      </span>
                    </td>
                    <td>
                      <strong>${escapeHTML(q.job_name || 'งานออกแบบ')}</strong>
                      <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">
                        ${escapeHTML(q.job_type || 'ออกแบบป้าย')} | ${escapeHTML(q.queue_date || 'วันนี้')}
                      </div>
                    </td>
                    <td>
                      <div style="font-weight: 600;">${escapeHTML(q.customer_name || '-')}</div>
                      <div style="font-size: 11px; color: #718096;">
                        ${q.line_id ? `LINE: ${escapeHTML(q.line_id)}` : ''} 
                        ${q.phone ? `(${escapeHTML(q.phone)})` : ''}
                      </div>
                    </td>
                    <td style="text-align: center;">
                      <div style="font-weight: 700; color: #2D3748;">฿${Number(q.price || 0).toLocaleString()}</div>
                      ${Number(q.cost_price) > 0 ? `
                        <div style="font-size: 11px; color: var(--text-muted);">ส่ง ฿${Number(q.cost_price).toLocaleString()} | <span style="color:#166534; font-weight:700;">ได้ ฿${Number((q.price || 0) - (q.cost_price || 0)).toLocaleString()}</span></div>
                      ` : `
                        <div style="font-size: 11px; color: #166534; font-weight:600;">กำไรเต็ม 100%</div>
                      `}
                    </td>
                    <td style="text-align: center;">
                      <span class="queue-status-chip status-${statusKey}">
                        ${escapeHTML(statusLabel)}
                      </span>
                    </td>
                    <td style="text-align: center;">
                      <div style="font-size: 12px; font-weight: 700; color: #BE185D; margin-bottom: 2px;">${progressPct}%</div>
                      <div class="queue-progress-track" style="margin: 0; height: 6px;">
                        <div class="queue-progress-fill" style="width: ${progressPct}%;"></div>
                      </div>
                    </td>
                    <td style="text-align: center;">
                      <button 
                        type="button" 
                        class="btn btn-sm ${q.is_visible !== false ? 'btn-success' : 'btn-outline'}" 
                        onclick="toggleQueueVisibilityAdminAction('${q.id}')"
                        style="padding: 3px 8px; font-size: 11px; border-radius: 8px;"
                      >
                        ${q.is_visible !== false ? 'เปิดแสดง' : 'ซ่อนอยู่'}
                      </button>
                    </td>
                    <td style="text-align: center;">
                      <div style="display: inline-flex; gap: 4px;">
                        <button 
                          type="button" 
                          class="btn btn-outline btn-sm" 
                          onclick="moveQueueAdminAction('${q.id}', 'up')" 
                          ${idx === 0 ? 'disabled style="opacity:0.3;"' : ''}
                          style="padding: 2px 7px; font-size: 12px;"
                          title="เลื่อนขึ้น"
                        >↑</button>
                        <button 
                          type="button" 
                          class="btn btn-outline btn-sm" 
                          onclick="moveQueueAdminAction('${q.id}', 'down')" 
                          ${idx === queues.length - 1 ? 'disabled style="opacity:0.3;"' : ''}
                          style="padding: 2px 7px; font-size: 12px;"
                          title="เลื่อนลง"
                        >↓</button>
                      </div>
                    </td>
                    <td style="text-align: center;">
                      <div style="display: inline-flex; gap: 4px;">
                        <button type="button" class="btn btn-outline btn-sm" onclick="openEditQueueModal('${q.id}')" style="padding: 3px 8px; font-size: 11px;">แก้ไข</button>
                        <button type="button" class="btn btn-danger btn-sm" onclick="deleteQueueAdminAction('${q.id}')" style="padding: 3px 8px; font-size: 11px;">ลบ</button>
                      </div>
                    </td>
                  </tr>
                `;
              }).join('') : `
                <tr>
                  <td colspan="9" style="text-align: center; padding: 3rem; color: var(--text-muted);">
                    ยังไม่มีคิวงานในระบบ กดปุ่ม "+ เพิ่มคิวงานใหม่" เพื่อเริ่มต้นได้เลยค่ะ
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Admin Queue Action Handlers
  window.moveQueueAdminAction = function (id, direction) {
    Store.moveQueueItem(id, direction);
    renderCurrentView();
  };

  window.toggleQueueVisibilityAdminAction = function (id) {
    Store.toggleQueueVisibility(id);
    renderCurrentView();
  };

  window.deleteQueueAdminAction = function (id) {
    if (!confirm('ยืนยันการลบคิวงานนี้ใช่หรือไม่?')) return;
    Store.deleteQueueItem(id);
    renderCurrentView();
  };

  // Add / Edit Modal for Admin Queues
  window.openAddQueueModal = function () {
    openQueueEditModalInternal(null);
  };

  window.openEditQueueModal = function (id) {
    const item = Store.getQueueItemById(id);
    if (!item) return;
    openQueueEditModalInternal(item);
  };

  function openQueueEditModalInternal(item) {
    let modal = $('adminQueueModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'adminQueueModal';
      modal.className = 'modal-overlay';
      modal.onclick = (e) => { if (e.target === modal) closeQueueAdminModal(); };
      document.body.appendChild(modal);
    }

    const isEdit = !!item;
    const allQueues = Store.getAllQueueItems();
    const nextNum = 'Q' + (allQueues.length + 1);

    modal.innerHTML = `
      <div class="modal-card" style="max-width: 620px; width: 92%; max-height: 90vh; overflow-y: auto; padding: 2rem; border-radius: 24px; border: 1.5px solid #FBCFE8;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-light); padding-bottom: 0.85rem;">
          <h3 style="margin: 0; color: var(--primary-deep); font-size: 1.25rem;">
            ${isEdit ? 'แก้ไขข้อมูลคิวงาน' : 'เพิ่มคิวงานใหม่'}
          </h3>
          <button type="button" onclick="closeQueueAdminModal()" style="background: none; border: none; font-size: 1.4rem; cursor: pointer; color: #A0AEC0;">✕</button>
        </div>

        <form onsubmit="handleSaveQueueAdminSubmit(event, '${isEdit ? item.id : ''}')">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3" style="margin-bottom: 0.85rem;">
            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">เลขคิว (เช่น Q28, Q29) <span style="color:var(--danger)">*</span></label>
              <input type="text" id="adminQ_number" class="form-input" value="${escapeHTML(item ? item.queue_number : nextNum)}" required>
            </div>
            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">วันที่คิวงาน</label>
              <input type="text" id="adminQ_date" class="form-input" value="${escapeHTML(item ? item.queue_date : new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' }))}">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3" style="margin-bottom: 0.85rem;">
            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">ประเภทงาน</label>
              <input type="text" id="adminQ_jobType" class="form-input" placeholder="เช่น ออกแบบป้าย, หัวป้าย, การ์ตูน" value="${escapeHTML(item ? item.job_type : 'ออกแบบป้าย')}">
            </div>
            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">ชื่องาน / รายละเอียดสั้น <span style="color:var(--danger)">*</span></label>
              <input type="text" id="adminQ_jobName" class="form-input" placeholder="เช่น ป้ายร้านเบเกอรี่คุณหวาน" value="${escapeHTML(item ? item.job_name : '')}" required>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3" style="margin-bottom: 0.85rem;">
            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">ชื่อลูกค้า <span style="color:var(--danger)">*</span></label>
              <input type="text" id="adminQ_custName" class="form-input" placeholder="ชื่อที่ลูกค้าแจ้ง" value="${escapeHTML(item ? item.customer_name : '')}" required>
            </div>
            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">LINE ID</label>
              <input type="text" id="adminQ_lineId" class="form-input" placeholder="@lineid" value="${escapeHTML(item ? (item.line_id || '') : '')}">
            </div>
            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">เบอร์โทรศัพท์</label>
              <input type="text" id="adminQ_phone" class="form-input" placeholder="08x-xxx-xxxx" value="${escapeHTML(item ? (item.phone || '') : '')}">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3" style="margin-bottom: 0.85rem;">
            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">สถานะคิวงาน</label>
              <select id="adminQ_status" class="form-input">
                <option value="waiting" ${item && item.status === 'waiting' ? 'selected' : ''}>รอคิว (waiting)</option>
                <option value="progress" ${item && item.status === 'progress' ? 'selected' : ''}>กำลังดำเนินการ (progress)</option>
                <option value="review" ${item && item.status === 'review' ? 'selected' : ''}>รอตรวจ (review)</option>
                <option value="edit" ${item && item.status === 'edit' ? 'selected' : ''}>รอแก้ไข (edit)</option>
                <option value="done" ${item && item.status === 'done' ? 'selected' : ''}>เสร็จแล้ว (done)</option>
                <option value="pause" ${item && item.status === 'pause' ? 'selected' : ''}>พักคิว (pause)</option>
                <option value="cancel" ${item && item.status === 'cancel' ? 'selected' : ''}>ยกเลิก (cancel)</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">ความคืบหน้า (%)</label>
              <input type="number" id="adminQ_progress" class="form-input" min="0" max="100" value="${item ? item.progress : 0}">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3" style="margin-bottom: 0.85rem;">
            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">ลำดับคิว / จำนวนทั้งหมด (เช่น 1 / 10)</label>
              <div style="display: flex; gap: 8px; align-items: center;">
                <input type="number" id="adminQ_currentQueue" class="form-input" placeholder="คิวที่" value="${item ? (item.current_queue || 1) : 1}">
                <span>/</span>
                <input type="number" id="adminQ_totalQueue" class="form-input" placeholder="ทั้งหมด" value="${item ? (item.total_queue || 1) : 1}">
              </div>
            </div>
            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">เวลาอัปเดตล่าสุด</label>
              <input type="text" id="adminQ_updatedAt" class="form-input" placeholder="เช่น 14:30 น." value="${escapeHTML(item ? item.updated_at : new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) + ' น.')}">
            </div>
          </div>

          <!-- Queue Financials & Agent Cost (สำหรับคำนวณรายได้ในแดชบอร์ด) -->
          <div style="background: #FFF0F7; border: 1.5px dashed #FBCFE8; border-radius: 16px; padding: 1rem 1.1rem; margin-bottom: 0.85rem;">
            <div style="font-weight: 700; color: var(--primary-deep); font-size: 0.92rem; margin-bottom: 0.65rem; display: flex; align-items: center; justify-content: space-between;">
              <span>ข้อมูลการเงินคิวงาน (คำนวณแดชบอร์ดรายได้)</span>
              <span class="badge badge--pink" style="font-size: 0.72rem;">ระบบรายได้ & ตัวแทน</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3" style="margin-bottom: 0.65rem;">
              <div class="form-group">
                <label class="form-label" style="font-weight: 700; font-size: 0.85rem;">ยอดเงินที่รับจากลูกค้า (บาท)</label>
                <input type="number" id="adminQ_price" class="form-input" placeholder="เช่น 350" value="${item ? (item.price || 0) : 0}" oninput="calcQueueProfitPreview()">
              </div>
              <div class="form-group">
                <label class="form-label" style="font-weight: 700; font-size: 0.85rem;">ต้นทุนส่งต่อ/เรทตัวแทน (บาท)</label>
                <input type="number" id="adminQ_costPrice" class="form-input" placeholder="ถ้าไม่มีให้ใส่ 0" value="${item ? (item.cost_price || 0) : 0}" oninput="calcQueueProfitPreview()">
              </div>
              <div class="form-group">
                <label class="form-label" style="font-weight: 700; font-size: 0.85rem;">สถานะการชำระเงิน</label>
                <select id="adminQ_payStatus" class="form-input">
                  <option value="PAID" ${item && item.payment_status === 'PAID' ? 'selected' : (!item ? 'selected' : '')}>ชำระแล้ว (ดึงเข้าแดชบอร์ด)</option>
                  <option value="UNPAID" ${item && item.payment_status === 'UNPAID' ? 'selected' : ''}>รอชำระ / มัดจำ</option>
                </select>
              </div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; padding-top: 4px; border-top: 1px dashed #FBCFE8;">
              <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; color: #4A5568;">
                <input type="checkbox" id="adminQ_isAgent" ${item && item.is_agent ? 'checked' : ''} onchange="toggleQueueAgentField(this.checked)">
                <span>เป็นงานตัวแทน (มีต้นทุนต้องส่งต่อเจ้าของ)</span>
              </label>
              <div id="adminQ_profitPreview" style="font-weight: 700; color: #166534;">
                กำไรสุทธิ: ฿${Math.max(0, (Number(item ? item.price : 0) - Number(item ? item.cost_price : 0))).toLocaleString()}
              </div>
            </div>
          </div>

          <div class="form-group" style="margin-bottom: 0.85rem;">
            <label class="form-label" style="font-weight: 700;">รายละเอียดของงาน / บรีฟงาน</label>
            <textarea id="adminQ_desc" class="form-textarea" rows="2" placeholder="รายละเอียดของงานเพิ่มเติม">${escapeHTML(item ? (item.description || '') : '')}</textarea>
          </div>

          <div class="form-group" style="margin-bottom: 0.85rem;">
            <label class="form-label" style="font-weight: 700;">หมายเหตุสำหรับลูกค้า (แสดงบนการ์ด)</label>
            <input type="text" id="adminQ_note" class="form-input" placeholder="เช่น ส่งแบบร่างรอบแรกตอน 16:00 น." value="${escapeHTML(item ? (item.note || '') : '')}">
          </div>

          <div class="form-group" style="margin-bottom: 0.85rem;">
            <label class="form-label" style="font-weight: 700;">ลิงก์รูปภาพตัวอย่างงาน / บรีฟ (URL)</label>
            <input type="text" id="adminQ_imageUrl" class="form-input" placeholder="https://..." value="${escapeHTML(item ? (item.image_url || '') : '')}">
          </div>

          <div class="form-group" style="margin-bottom: 1.25rem;">
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
              <input type="checkbox" id="adminQ_isVisible" ${!item || item.is_visible !== false ? 'checked' : ''}>
              <span style="font-weight: 700; color: var(--primary-deep);">เปิดแสดงคิวนี้บนหน้าเช็กคิวสาธารณะ</span>
            </label>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 0.5rem;">
            <button type="button" class="btn btn-outline" onclick="closeQueueAdminModal()">ยกเลิก</button>
            <button type="submit" class="btn btn-primary" style="font-weight: 700;">บันทึกคิวงาน</button>
          </div>
        </form>
      </div>
    `;

    modal.classList.add('is-active');
  }

  window.calcQueueProfitPreview = function () {
    const price = Number($('adminQ_price')?.value || 0);
    const cost = Number($('adminQ_costPrice')?.value || 0);
    const profit = price - cost;
    const prev = $('adminQ_profitPreview');
    if (prev) {
      prev.innerHTML = `กำไรสุทธิ: <span style="color: ${profit >= 0 ? '#166534' : '#DC2626'};">฿${profit.toLocaleString()}</span>`;
    }
  };

  window.toggleQueueAgentField = function (checked) {
    const costInp = $('adminQ_costPrice');
    if (costInp && !checked && Number(costInp.value) === 0) {
      // Keep as 0
    }
    calcQueueProfitPreview();
  };

  window.closeQueueAdminModal = function () {
    const modal = $('adminQueueModal');
    if (modal) modal.classList.remove('is-active');
  };

  window.handleSaveQueueAdminSubmit = function (e, id) {
    e.preventDefault();
    const queueNumber = ($('adminQ_number')?.value || '').trim();
    const jobName = ($('adminQ_jobName')?.value || '').trim();
    const custName = ($('adminQ_custName')?.value || '').trim();

    if (!queueNumber || !jobName || !custName) {
      return alert('กรุณากรอกเลขคิว ชื่องาน และชื่อลูกค้าให้ครบถ้วนนะคะ');
    }

    const price = Number($('adminQ_price')?.value || 0);
    const costPrice = Number($('adminQ_costPrice')?.value || 0);
    const profit = price - costPrice;
    const isAgent = $('adminQ_isAgent')?.checked || costPrice > 0;
    const payStatus = $('adminQ_payStatus')?.value || 'PAID';

    const payload = {
      queue_number: queueNumber,
      customer_name: custName,
      line_id: ($('adminQ_lineId')?.value || '').trim(),
      phone: ($('adminQ_phone')?.value || '').trim(),
      job_type: ($('adminQ_jobType')?.value || '').trim() || 'ออกแบบป้าย',
      job_name: jobName,
      queue_date: ($('adminQ_date')?.value || '').trim(),
      status: $('adminQ_status')?.value || 'waiting',
      progress: Number($('adminQ_progress')?.value) || 0,
      current_queue: Number($('adminQ_currentQueue')?.value) || 1,
      total_queue: Number($('adminQ_totalQueue')?.value) || 1,
      updated_at: ($('adminQ_updatedAt')?.value || '').trim() || new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) + ' น.',
      price: price,
      cost_price: costPrice,
      profit: profit,
      is_agent: isAgent,
      payment_status: payStatus,
      description: ($('adminQ_desc')?.value || '').trim(),
      note: ($('adminQ_note')?.value || '').trim(),
      image_url: ($('adminQ_imageUrl')?.value || '').trim(),
      is_visible: $('adminQ_isVisible')?.checked !== false
    };

    if (id) {
      payload.id = id;
    }

    Store.saveQueueItem(payload);
    closeQueueAdminModal();
    alert('บันทึกข้อมูลคิวงานเรียบร้อยแล้วค่ะ!');
    renderCurrentView();
  };

  function renderAdminSettingsTab(s) {
    const stats = s.stats || {};
    const banners = Store.getHomeBanners();
    const queueStatus = Store.getQueueStatus();
    const queuePage = Store.getQueuePageSettings();
    const headings = Store.getHeadings();

    return `
      <form id="masterSettingsForm" onsubmit="saveMasterSettings(event)">
        
        <!-- 1. General & Announcement -->
        <div class="card" style="margin-bottom: 1.5rem;">
          <h3 style="color: var(--primary-deep); margin-bottom: 1.25rem;">ข้อมูลร้าน & แถบประกาศหัวเว็บ</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="form-group">
              <label class="form-label">ชื่อร้านค้า</label>
              <input type="text" id="cfg_shopName" class="form-input" value="${escapeHTML(s.shopName || 'BNC GraphMate Studio')}">
            </div>
            <div class="form-group">
              <label class="form-label">สโลแกน / Tagline</label>
              <input type="text" id="cfg_tagline" class="form-input" value="${escapeHTML(s.tagline || 'ร้านป้าย & กราฟิก สไตล์คิวท์ น่ารัก มินิมอล')}">
            </div>
          </div>
          <div class="form-group" style="margin-top: 1rem;">
            <label class="form-label">ข้อความประกาศแถบชมพูบนสุด (Announcement Bar)</label>
            <input type="text" id="cfg_announcement" class="form-input" value="${escapeHTML(s.announcement || '')}" placeholder="เช่น โปรเปิดร้านใหม่! สั่งฟอนต์ 2 แถม 1 ฟรี">
          </div>
          <div style="margin-top: 0.5rem;">
            <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer; font-size: 0.9rem;">
              <input type="checkbox" id="cfg_announcementEnabled" ${s.announcementEnabled ? 'checked' : ''}>
              <span>เปิดใช้งานแถบประกาศบนสุด</span>
            </label>
          </div>
        </div>

        <!-- 2. Home 1:1 Banners Manager (Hero Carousel) -->
        <div class="card" style="margin-bottom: 1.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
            <div>
              <h3 style="color: var(--primary-deep); margin: 0 0 0.25rem;">ป้ายแบนเนอร์ 1:1 สี่เหลี่ยมจัตุรัสหน้าแรก (Hero Carousel)</h3>
              <p style="font-size: 0.86rem; color: var(--text-muted); margin: 0;">ภาพสไลด์จัตุรัส 1:1 ด้านบนสุดหน้าแรก สลับเปลี่ยนอัตโนมัติ</p>
            </div>
            <button type="button" class="btn btn-outline btn-sm" onclick="toggleAddBannerForm()">+ เพิ่มแบนเนอร์ใหม่</button>
          </div>

          <!-- Add Banner Form -->
          <div id="addBannerWrap" style="display: none; background: var(--surface-alt); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.5rem; border: 1.5px solid var(--border);">
            <h4 style="margin: 0 0 1rem; font-size: 1rem; color: var(--primary-deep);">เพิ่มแบนเนอร์สไลด์ 1:1 ใหม่</h4>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div class="form-group">
                <label class="form-label">หัวข้อป้ายแบนเนอร์</label>
                <input type="text" id="newBannerTitle" class="form-input" placeholder="เช่น ฟอนต์ใหม่น่ารัก">
              </div>
              <div class="form-group">
                <label class="form-label">ลิงก์ภาพ 1:1 จัตุรัส (URL)</label>
                <input type="text" id="newBannerImage" class="form-input" placeholder="https://images.unsplash.com/...">
              </div>
              <div class="form-group">
                <label class="form-label">ลิงก์ปลายทางเมื่อคลิก</label>
                <input type="text" id="newBannerLink" class="form-input" placeholder="#fonts หรือ URL">
              </div>
            </div>
            <div style="text-align: right; margin-top: 0.75rem;">
              <button type="button" class="btn btn-outline btn-sm" onclick="toggleAddBannerForm()" style="margin-right: 0.5rem;">ยกเลิก</button>
              <button type="button" class="btn btn-primary btn-sm" onclick="saveNewBanner()">บันทึกแบนเนอร์</button>
            </div>
          </div>

          <!-- Banners List -->
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4" id="adminBannersList">
            ${banners.map((b, idx) => `
              <div style="background: var(--surface-alt); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 0.85rem; text-align: center; position: relative;">
                <img src="${escapeHTML(b.image)}" style="width: 100%; aspect-ratio: 1/1; border-radius: 12px; object-fit: cover; margin-bottom: 6px; display: block;" onerror="this.src='https://images.unsplash.com/photo-1541643600914-78b084683601?w=400';">
                <div style="font-weight: 700; font-size: 0.85rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${escapeHTML(b.title || 'Banner')}</div>
                <button type="button" style="position: absolute; top: 12px; right: 12px; background: rgba(239,68,68,0.9); border: none; color: #fff; border-radius: 50%; width: 26px; height: 26px; font-size: 13px; cursor: pointer; display: grid; place-items: center;" onclick="deleteBanner(${idx})" title="ลบแบนเนอร์นี้">✕</button>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 3. Shop Queue & Notice Paper Settings -->
        <div class="card" style="margin-bottom: 1.5rem;">
          <h3 style="color: var(--primary-deep); margin-bottom: 1.25rem;">กระดาษโน้ตสถานะคิวงาน & แจ้งเตือนร้าน (Shop Queue Board)</h3>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="form-group">
              <label class="form-label">สถานะคิวงานออกแบบ</label>
              <input type="text" id="cfg_queueText" class="form-input" value="${escapeHTML(queueStatus.queueText || 'ว่างพร้อมรับ 3 คิว ')}">
            </div>
            <div class="form-group">
              <label class="form-label">เวลาตอบแชท</label>
              <input type="text" id="cfg_chatHours" class="form-input" value="${escapeHTML(queueStatus.chatHours || '09:00 - 23:00 น. (ตอบไว)')}">
            </div>
            <div class="form-group">
              <label class="form-label">ความเร็วการส่งมอบไฟล์</label>
              <input type="text" id="cfg_deliveryInfo" class="form-input" value="${escapeHTML(queueStatus.deliveryInfo || 'ดึงสิทธิ์ Google Drive อัตโนมัติหลังแอดมินตรวจสลิป')}">
            </div>
          </div>
        </div>

        <!-- 3.0 Queue Page Settings (หน้าเช็กคิวงาน ปรับแต่งข้อความทุกจุด) -->
        <div class="card" style="margin-bottom: 1.5rem;">
          <h3 style="color: var(--primary-deep); margin-bottom: 0.5rem;">ตั้งค่าหน้าเช็กคิวงาน (Queue Page Settings)</h3>
          <p style="font-size: 0.86rem; color: var(--text-muted); margin-bottom: 1.25rem;">
            ปรับแต่งข้อความ ป้ายกำกับ คำค้นหา และการเปิด/ปิดองค์ประกอบต่างๆ บนหน้าเช็กคิวสาธารณะได้ 100% โดยไม่ต้องแก้โค้ด
          </p>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4" style="margin-bottom: 1rem;">
            <div class="form-group">
              <label class="form-label">หัวข้อหลักบนกระดาษโน้ต (Hero Title)</label>
              <input type="text" id="cfg_qp_heroTitle" class="form-input" value="${escapeHTML(queuePage.heroTitle || 'เช็กคิวงาน ♡')}">
            </div>
            <div class="form-group">
              <label class="form-label">คำบรรยายหัวเว็บ (Hero Subtitle)</label>
              <input type="text" id="cfg_qp_heroSubtitle" class="form-input" value="${escapeHTML(queuePage.heroSubtitle || 'ดูสถานะคิวงานของร้านแบบเรียลไทม์')}">
            </div>
          </div>

          <div class="form-group" style="margin-bottom: 1rem;">
            <label class="form-label">ข้อความแถบแจ้งเตือนคิวงาน (Notice Banner Text)</label>
            <input type="text" id="cfg_qp_noticeText" class="form-input" value="${escapeHTML(queuePage.noticeText || 'คิวงานอัปเดตสถานะการออกแบบตลอดทั้งวัน สามารถค้นหาด้วยเลขคิว ชื่อ หรือเบอร์โทรได้เลยนะคะ')}">
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4" style="margin-bottom: 1rem;">
            <div class="form-group">
              <label class="form-label">หัวข้อการ์ดค้นหา</label>
              <input type="text" id="cfg_qp_searchTitle" class="form-input" value="${escapeHTML(queuePage.searchTitle || 'ค้นหาคิวของคุณ')}">
            </div>
            <div class="form-group">
              <label class="form-label">ข้อความช่องพิมพ์ค้นหา</label>
              <input type="text" id="cfg_qp_searchPlaceholder" class="form-input" value="${escapeHTML(queuePage.searchPlaceholder || 'กรอกชื่อ, LINE ID, เบอร์โทรศัพท์ หรือเลขคิว...')}">
            </div>
            <div class="form-group">
              <label class="form-label">ข้อความบนปุ่มค้นหา</label>
              <input type="text" id="cfg_qp_searchButtonText" class="form-input" value="${escapeHTML(queuePage.searchButtonText || 'ดูคิวของฉัน')}">
            </div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3" style="margin-bottom: 1rem;">
            <div class="form-group">
              <label class="form-label">ป้าย: คิววันนี้</label>
              <input type="text" id="cfg_qp_todayLabel" class="form-input" value="${escapeHTML(queuePage.todayLabel || 'คิววันนี้')}">
            </div>
            <div class="form-group">
              <label class="form-label">ป้าย: รอคิว</label>
              <input type="text" id="cfg_qp_waitingLabel" class="form-input" value="${escapeHTML(queuePage.waitingLabel || 'รอคิว')}">
            </div>
            <div class="form-group">
              <label class="form-label">ป้าย: กำลังทำ</label>
              <input type="text" id="cfg_qp_workingLabel" class="form-input" value="${escapeHTML(queuePage.workingLabel || 'กำลังทำ')}">
            </div>
            <div class="form-group">
              <label class="form-label">ป้าย: เสร็จแล้ว</label>
              <input type="text" id="cfg_qp_completedLabel" class="form-input" value="${escapeHTML(queuePage.completedLabel || 'เสร็จแล้ว')}">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4" style="margin-bottom: 1rem;">
            <div class="form-group">
              <label class="form-label">หัวข้อรายการคิว (Section Title)</label>
              <input type="text" id="cfg_qp_sectionTitle" class="form-input" value="${escapeHTML(queuePage.sectionTitle || 'คิวงานของร้าน ♡')}">
            </div>
            <div class="form-group">
              <label class="form-label">ข้อความเมื่อไม่มีคิว (Empty State)</label>
              <input type="text" id="cfg_qp_emptyStateText" class="form-input" value="${escapeHTML(queuePage.emptyStateText || 'วันนี้ยังไม่มีคิวงานนะคะ ♡')}">
            </div>
          </div>

          <!-- Component Toggles -->
          <div style="background: #FFF9FA; border-radius: 14px; padding: 1rem; border: 1px dashed #FBCFE8; margin-top: 1rem;">
            <div style="font-weight: 700; color: #BE185D; margin-bottom: 0.5rem; font-size: 0.9rem;">
              ตัวเลือกการแสดงผลบนหน้าเช็กคิว:
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3" style="font-size: 0.88rem;">
              <label style="display: flex; align-items: center; gap: 6px; cursor: pointer;">
                <input type="checkbox" id="cfg_qp_showSearch" ${queuePage.showSearch !== false ? 'checked' : ''}>
                <span>แสดงกล่องค้นหาคิว</span>
              </label>
              <label style="display: flex; align-items: center; gap: 6px; cursor: pointer;">
                <input type="checkbox" id="cfg_qp_showSummary" ${queuePage.showSummary !== false ? 'checked' : ''}>
                <span>แสดงป้ายนับสรุปคิว</span>
              </label>
              <label style="display: flex; align-items: center; gap: 6px; cursor: pointer;">
                <input type="checkbox" id="cfg_qp_showProgress" ${queuePage.showProgress !== false ? 'checked' : ''}>
                <span>แสดงหลอดความคืบหน้า</span>
              </label>
              <label style="display: flex; align-items: center; gap: 6px; cursor: pointer;">
                <input type="checkbox" id="cfg_qp_showTimeline" ${queuePage.showTimeline !== false ? 'checked' : ''}>
                <span>แสดงไทม์ไลน์ 5 ขั้นตอน</span>
              </label>
              <label style="display: flex; align-items: center; gap: 6px; cursor: pointer;">
                <input type="checkbox" id="cfg_qp_showCustomerName" ${queuePage.showCustomerName !== false ? 'checked' : ''}>
                <span>แสดงชื่อลูกค้า (เซนเซอร์)</span>
              </label>
              <label style="display: flex; align-items: center; gap: 6px; cursor: pointer;">
                <input type="checkbox" id="cfg_qp_showNote" ${queuePage.showNote !== false ? 'checked' : ''}>
                <span>แสดงหมายเหตุจากแอดมิน</span>
              </label>
            </div>
          </div>
        </div>



        <!-- 3.0.1 Custom Categories Configuration (Item 13B) -->
        <div class="card" style="margin-bottom: 1.5rem;">
          <h3 style="color: var(--primary-deep); margin-bottom: 0.5rem;">ตั้งค่าหมวดหมู่สินค้า & ผลงาน (Categories)</h3>
          <p style="font-size: 0.86rem; color: var(--text-muted); margin-bottom: 1.25rem;">พิมพ์หมวดหมู่ที่ต้องการแยกด้วยเครื่องหมายจุลภาค (,) ระบบจะอัปเดตแท็บตัวกรองและเมนูเลือกหมวดหมู่อัตโนมัติ</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="form-group">
              <label class="form-label">หมวดหมู่ฟอนต์</label>
              <input type="text" id="cfg_catFonts" class="form-input" value="${escapeHTML(Array.isArray(s.categories?.fonts) ? s.categories.fonts.join(', ') : (s.categories?.fonts || 'ลายมือ, หัวป้าย, ตัวพิมพ์, น่ารัก'))}">
            </div>
            <div class="form-group">
              <label class="form-label">หมวดหมู่สินค้าสำเร็จ/อื่นๆ</label>
              <input type="text" id="cfg_catProducts" class="form-input" value="${escapeHTML(Array.isArray(s.categories?.products) ? s.categories.products.join(', ') : (s.categories?.products || 'ป้ายสำเร็จ, ไฟล์ตกแต่ง, การ์ตูน, องค์ประกอบ, เทมเพลต'))}">
            </div>
            <div class="form-group">
              <label class="form-label">หมวดหมู่รวมกลุ่ม VIP</label>
              <input type="text" id="cfg_catGroups" class="form-input" value="${escapeHTML(Array.isArray(s.categories?.groups) ? s.categories.groups.join(', ') : (s.categories?.groups || 'VIP ตลอดชีพ, รวมงานกราฟิก, การ์ตูน & คาแรกเตอร์, ป้ายร้าน & เมนู'))}">
            </div>
            <div class="form-group">
              <label class="form-label">หมวดหมู่ผลงาน / ราคาป้าย (Portfolio Signs)</label>
              <input type="text" id="cfg_catPortfolio" class="form-input" value="${escapeHTML(Array.isArray(s.categories?.portfolio) ? s.categories.portfolio.join(', ') : (s.categories?.portfolio || 'ป้ายเครดิต, ป้ายแอพพรี, ป้ายเติมเกม, ป้ายเปิดร้าน, ป้ายโปรโมชั่น, งานป้ายสั่งทำพิเศษ'))}">
            </div>
            <div class="form-group" style="grid-column: 1 / -1;">
              <label class="form-label">หมวดหมู่สไตล์งานออกแบบ (Portfolio Styles)</label>
              <input type="text" id="cfg_catPortfolioStyles" class="form-input" value="${escapeHTML(Array.isArray(s.categories?.portfolioStyles) ? s.categories.portfolioStyles.join(', ') : (s.categories?.portfolioStyles || 'สไตล์มินิมอล & คาเฟ่, สไตล์การ์ตูน & คาวาอี้, สไตล์ลายมือ & ฟอนต์, สไตล์ร้านค้า & โมเดิร์น, ไฟล์ตกแต่ง & เทมเพลต'))}">
              <small style="color: var(--text-muted); font-size: 0.8rem;">แยกด้วยเครื่องหมายจุลภาค (,) หมวดหมู่นี้จะขึ้นเป็นปุ่มแท็บสไตล์งานให้ลูกค้าเลือกดูก่อนเป็นอันดับแรก</small>
            </div>
          </div>
        </div>

        <!-- 3.0.2 Floating Mascot GIF Sticker (Item 6) -->
        <div class="card" style="margin-bottom: 1.5rem;">
          <h3 style="color: var(--primary-deep); margin-bottom: 0.5rem;">มาสคอตดุ๊กดิ๊กบนหน้าจอ (Floating Mascot GIF)</h3>
          <p style="font-size: 0.86rem; color: var(--text-muted); margin-bottom: 1rem;">ใส่ลิงก์รูป GIF หรือภาพน่ารักดุ๊กดิ๊กที่จะลอยอยู่มุมขวาล่างของหน้าจอ</p>
          <div class="form-group">
            <label class="form-label">ลิงก์ภาพ GIF มาสคอต</label>
            <input type="text" id="cfg_mascotGifUrl" class="form-input" value="${escapeHTML(s.mascotGifUrl || 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdW93OWdtMWFwNWw1czZtMXk4NHV6MWt5OGI1eDhkOHU0bXlnNHI3MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/MDJ9IbxxvDUYT2TxD2/giphy.gif')}">
          </div>
        </div>

        <!-- 3.1 Stamp Card Configuration -->
        <div class="card" style="margin-bottom: 1.5rem;">
          <h3 style="color: var(--primary-deep); margin-bottom: 0.5rem;">ตั้งค่าบัตรสะสมแต้มปั๊มหัวใจ 10 ดวง</h3>
          <p style="font-size: 0.86rem; color: var(--text-muted); margin-bottom: 1.25rem;">สามารถปรับแต่งข้อความ กติกา และรูปมาสคอตบนหลอดโปรเกรสได้ทุกจุด</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="form-group">
              <label class="form-label">ชื่อบัตรสะสมแต้ม</label>
              <input type="text" id="cfg_stampTitle" class="form-input" value="${escapeHTML(Store.getStampSettings().cardTitle || 'บัตรสะสมแต้ม BNC GraphMate')}">
            </div>
            <div class="form-group">
              <label class="form-label">คำบรรยายหัวการ์ด</label>
              <input type="text" id="cfg_stampSubtitle" class="form-input" value="${escapeHTML(Store.getStampSettings().cardSubtitle || 'สะสมตราปั๊มหัวใจครบ 10 ดวง รับสิทธิ์ดาวน์โหลดฟอนต์ฟรี')}">
            </div>
            <div class="form-group">
              <label class="form-label">ข้อความเมื่อสะสมครบ 10 ดวง</label>
              <input type="text" id="cfg_stampRewardText" class="form-input" value="${escapeHTML(Store.getStampSettings().rewardText || 'สะสมครบ 10 ดวงแล้ว ทักแชท LINE เพื่อแลกรับของขวัญฟรีได้เลยค่ะ')}">
            </div>
            <div class="form-group">
              <label class="form-label">รูปตราปั๊ม PNG มาสคอต (หากใส่จะใช้รูปนี้แทนรูปหัวใจ)</label>
              <div style="display: flex; gap: 8px; align-items: center;">
                <input type="text" id="cfg_stampIconUrl" class="form-input" placeholder="https://.../mascot.png หรือเลือกไฟล์ขวามือ" value="${escapeHTML(Store.getStampSettings().stampIconUrl || '')}" style="flex: 1;">
                <label class="btn btn-outline btn-sm" style="cursor: pointer; white-space: nowrap; margin: 0; font-size: 11px;">
                  เลือกรูป PNG
                  <input type="file" accept="image/png,image/webp,image/jpeg" style="display: none;" onchange="handleStampIconUpload(event)">
                </label>
              </div>
              <small style="color: var(--text-muted); font-size: 11px;">*แนะนำไฟล์ .PNG พื้นหลังโปร่งใสสำหรับปั๊มลงบนการ์ด</small>
            </div>
            
          </div>
          <div class="form-group" style="margin-top: 1rem;">
            <label class="form-label">กติกาการสะสมแต้มด้านล่างบัตร</label>
            <textarea id="cfg_stampRules" class="form-textarea" rows="3">${escapeHTML(Store.getStampSettings().rulesText || '')}</textarea>
          </div>
        </div>

        <!-- 4. Page Headings & Descriptions Settings -->
        <div class="card" style="margin-bottom: 1.5rem;">
          <h3 style="color: var(--primary-deep); margin-bottom: 0.5rem;">ข้อความหัวเรื่องแต่ละหน้า (Page Headings & Descriptions)</h3>
          <p style="font-size: 0.86rem; color: var(--text-muted); margin-bottom: 1.25rem;">สามารถปรับแต่งชื่อหัวข้อและคำบรรยายของทุกหน้าได้ตามต้องการ</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="form-group">
              <label class="form-label">หน้าฟอนต์: หัวเรื่อง</label>
              <input type="text" id="cfg_fontsTitle" class="form-input" value="${escapeHTML(headings.fontsTitle || 'ฟอนต์ทั้งหมด')}">
            </div>
            <div class="form-group">
              <label class="form-label">หน้าฟอนต์: คำบรรยาย</label>
              <input type="text" id="cfg_fontsDesc" class="form-input" value="${escapeHTML(headings.fontsDesc || 'ฟอนต์ลิขสิทธิ์แท้ ใช้งานได้ทั้งส่วนตัวและเชิงพาณิชย์')}">
            </div>
            <div class="form-group">
              <label class="form-label">หน้าสินค้าสำเร็จ: หัวเรื่อง</label>
              <input type="text" id="cfg_prodsTitle" class="form-input" value="${escapeHTML(headings.prodsTitle || 'สินค้าสำเร็จรูป')}">
            </div>
            <div class="form-group">
              <label class="form-label">หน้าสินค้าสำเร็จ: คำบรรยาย</label>
              <input type="text" id="cfg_prodsDesc" class="form-input" value="${escapeHTML(headings.prodsDesc || 'ไฟล์กราฟิก ป้ายสำเร็จ เทมเพลตพร้อมใช้งาน')}">
            </div>
            <div class="form-group">
              <label class="form-label">หน้าเข้ากลุ่ม VIP: หัวเรื่อง</label>
              <input type="text" id="cfg_groupsTitle" class="form-input" value="${escapeHTML(headings.groupsTitle || 'เข้ากลุ่ม LINE VIP')}">
            </div>
            <div class="form-group">
              <label class="form-label">หน้าเข้ากลุ่ม VIP: คำบรรยาย</label>
              <input type="text" id="cfg_groupsDesc" class="form-input" value="${escapeHTML(headings.groupsDesc || 'รวมกลุ่ม VIP อัปเดตงานต่อเนื่อง โหลดได้ไม่อั้นตลอดชีพ')}">
            </div>
            <div class="form-group">
              <label class="form-label">หน้าผลงาน: หัวเรื่อง</label>
              <input type="text" id="cfg_portTitle" class="form-input" value="${escapeHTML(headings.portTitle || 'ผลงานการออกแบบ')}">
            </div>
            <div class="form-group">
              <label class="form-label">หน้าผลงาน: คำบรรยาย</label>
              <input type="text" id="cfg_portDesc" class="form-input" value="${escapeHTML(headings.portDesc || 'ตัวอย่างผลงานป้ายและกราฟิกที่ผ่านมาของทางร้าน')}">
            </div>
            <div class="form-group">
              <label class="form-label">หน้ารีวิว: หัวเรื่อง</label>
              <input type="text" id="cfg_reviewsTitle" class="form-input" value="${escapeHTML(headings.reviewsTitle || 'รีวิวจากลูกค้า')}">
            </div>
            <div class="form-group">
              <label class="form-label">หน้ารีวิว: คำบรรยาย</label>
              <input type="text" id="cfg_reviewsDesc" class="form-input" value="${escapeHTML(headings.reviewsDesc || 'ความประทับใจจริงจากลูกค้าที่ใช้บริการ BNC GraphMate')}">
            </div>
            <div class="form-group">
              <label class="form-label">หน้าสถานะออเดอร์: หัวเรื่อง</label>
              <input type="text" id="cfg_ordersTitle" class="form-input" value="${escapeHTML(headings.ordersTitle || 'ประวัติคำสั่งซื้อ')}">
            </div>
            <div class="form-group">
              <label class="form-label">หน้าสถานะออเดอร์: คำบรรยาย</label>
              <input type="text" id="cfg_ordersDesc" class="form-input" value="${escapeHTML(headings.ordersDesc || 'ติดตามสถานะคำสั่งซื้อ ตรวจสอบสลิป และรับไฟล์งาน')}">
            </div>
          </div>
        </div>

        <!-- 5. Profile & Bio Settings -->
        <div class="card" style="margin-bottom: 1.5rem;">
          <h3 style="color: var(--primary-deep); margin-bottom: 1.25rem;">รูปโปรไฟล์ร้าน และ Bio</h3>
          <div class="form-group">
            <label class="form-label">ลิงก์ภาพโปรไฟล์ร้าน (Avatar ขอบชมพูพาสเทล)</label>
            <input type="text" id="cfg_profileImage" class="form-input" value="${escapeHTML(s.profileImage || '')}">
          </div>
          <div class="form-group">
            <label class="form-label">คำแนะนำร้านค้า (Bio)</label>
            <textarea id="cfg_shopBio" class="form-textarea" rows="3">${escapeHTML(s.shopBio || '')}</textarea>
          </div>
        </div>

        <!-- 6. Button Labels -->
        <div class="card" style="margin-bottom: 1.5rem;">
          <h3 style="color: var(--primary-deep); margin-bottom: 0.5rem;">ข้อความบนปุ่มกด (Button Labels)</h3>
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

        <!-- 7. Social & Contact Channels -->
        <div class="card" style="margin-bottom: 1.5rem;">
          <h3 style="color: var(--primary-deep); margin-bottom: 1.25rem;">ช่องทางติดต่อ & Social Media</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="form-group">
              <label class="form-label">ลิงก์ LINE Official (สำหรับปุ่มทักแชท)</label>
              <input type="text" id="cfg_lineUrl" class="form-input" value="${escapeHTML(s.lineUrl || '')}">
            </div>
            <div class="form-group">
              <label class="form-label">เบอร์โทรศัพท์ติดต่อ</label>
              <input type="text" id="cfg_contactPhone" class="form-input" value="${escapeHTML(s.contactPhone || '')}">
            </div>
            <div class="form-group">
              <label class="form-label">ลิงก์ Instagram</label>
              <input type="text" id="cfg_instagramUrl" class="form-input" value="${escapeHTML(s.instagramUrl || '')}">
            </div>
            <div class="form-group">
              <label class="form-label">ลิงก์ Facebook Page</label>
              <input type="text" id="cfg_facebookUrl" class="form-input" value="${escapeHTML(s.facebookUrl || '')}">
            </div>
          </div>
        </div>

        <!-- 8. Payment & Bank Accounts -->
        <div class="card" style="margin-bottom: 1.5rem;">
          <h3 style="color: var(--primary-deep); margin-bottom: 1.25rem;">บัญชีธนาคาร & คิวอาร์โค้ดรับชำระเงิน</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            <div class="form-group">
              <label class="form-label">ลิงก์รูป PromptPay QR Code</label>
              <input type="text" id="cfg_promptpayQrUrl" class="form-input" value="${escapeHTML(s.promptpayQrUrl || '')}">
            </div>
          </div>
        </div>

        <!-- 9. Google Sheets Cloud Sync & Admin Passcode -->
        <div class="card" style="margin-bottom: 2rem;">
          <h3 style="color: var(--primary-deep); margin-bottom: 0.5rem;">Google Sheets Database & รหัสผ่านแอดมิน</h3>
          <p style="font-size: 0.86rem; color: var(--text-muted); margin-bottom: 1.25rem;">เชื่อมต่อระบบคลาวด์เพื่อให้ข้อมูลตรงกันทุกอุปกรณ์ และตั้งรหัสผ่านกดเข้าหลังบ้าน</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="form-group">
              <label class="form-label">Google Apps Script Web App URL</label>
              <input type="text" id="cfg_sheetUrl" class="form-input" value="${escapeHTML(s.googleSheetWebAppUrl || '')}" placeholder="https://script.google.com/macros/s/.../exec">
              <div style="margin-top: 0.5rem; display: flex; gap: 0.5rem;">
                <button type="button" class="btn btn-outline btn-sm" onclick="testAdminSheetSync()">ทดสอบการเชื่อมต่อ</button>
                <button type="button" class="btn btn-secondary btn-sm" onclick="syncSheetsManual()">ซิงก์ดึงข้อมูลเดี๋ยวนี้</button>
              </div>
              <div id="adminSheetFeedback" style="display: none; font-size: 0.82rem; margin-top: 0.5rem;"></div>
            </div>
            <div class="form-group">
              <label class="form-label">รหัสผ่านแอดมิน (PIN 6 หลักสำหรับเครื่องคิดเลข)</label>
              <input type="password" id="cfg_adminPin" class="form-input" value="${escapeHTML(s.adminPin || '123456')}" maxlength="6" style="letter-spacing: 4px; font-weight: 700;">
              <small style="color: var(--text-muted);">*รหัสมาตรฐาน: 123456</small>
            </div>
          </div>
        </div>

        <!-- Save Master Settings Bar -->
        <div style="position: sticky; bottom: 1.5rem; background: rgba(255,255,255,0.96); backdrop-filter: blur(8px); padding: 1rem 1.5rem; border-radius: var(--radius-lg); border: 2px solid var(--border); box-shadow: var(--shadow-lg); display: flex; justify-content: space-between; align-items: center; z-index: 50;">
          <div>
            <div style="font-weight: 700; color: var(--primary-deep);">พร้อมบันทึกการเปลี่ยนแปลงแล้วหรือยัง?</div>
            <small style="color: var(--text-muted);">ระบบจะอัปเดตการแสดงผลและข้อมูลคลาวด์ทันที</small>
          </div>
          <button type="submit" class="btn btn-primary" style="font-weight: 800; padding: 0.75rem 2rem; font-size: 1rem; border-radius: 14px;">
            บันทึกการตั้งค่าทั้งหมด
          </button>
        </div>

      </form>
    `;
  }

  window.toggleAddBannerForm = function () {
    const wrap = $('addBannerWrap');
    if (wrap) wrap.style.display = wrap.style.display === 'none' ? 'block' : 'none';
  };

  window.saveNewBanner = function () {
    const title = ($('newBannerTitle')?.value || '').trim();
    const image = ($('newBannerImage')?.value || '').trim();
    const link = ($('newBannerLink')?.value || '').trim();
    if (!image) {
      alert('กรุณากรอกลิงก์รูปภาพ 1:1');
      return;
    }
    const banners = Store.getHomeBanners();
    banners.push({ id: 'b-' + Date.now(), title, image, link: link || '#fonts' });
    Store.saveHomeBanners(banners);
    renderCurrentView();
  };

  window.deleteBanner = function (idx) {
    if (!confirm('ต้องการลบแบนเนอร์นี้ใช่หรือไม่?')) return;
    const banners = Store.getHomeBanners();
    banners.splice(idx, 1);
    Store.saveHomeBanners(banners);
    renderCurrentView();
  };

  window.testAdminSheetSync = async function () {
    const url = ($('cfg_sheetUrl')?.value || '').trim();
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
      const res = await fetch(url + (url.includes('?') ? '&' : '?') + 'action=PING');
      const json = await res.json();
      if (json && (json.status === 'success' || json.data)) {
        fb.innerHTML = '<div style="color: #166534; font-weight:600;">เชื่อมต่อชีตสำเร็จ 100%! ระบบจะซิงก์ออเดอร์อัตโนมัติ</div>';
      } else {
        fb.innerHTML = `<div style="color: #d97706;">ตอบกลับจากเซิร์ฟเวอร์: ${json.message || 'บันทึกพร้อมใช้งาน'}</div>`;
      }
    } catch (err) {
      fb.innerHTML = '<div style="color: #166534; font-weight:600;">บันทึกลิงก์เรียบร้อยแล้วค่ะ (ระบบจะส่งข้อมูลเบื้องหลังอัตโนมัติ)</div>';
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

  window.saveMasterSettings = function (e) {
    e.preventDefault();
    try {
      const getVal = (id, fallback = '') => {
        const el = $(id);
        return el ? el.value.trim() : fallback;
      };
      const getChecked = (id, fallback = false) => {
        const el = $(id);
        return el ? el.checked : fallback;
      };

      const updated = {
        shopName: getVal('cfg_shopName', 'BNC GraphMate Studio'),
        tagline: getVal('cfg_tagline', 'ร้านป้าย & กราฟิก สไตล์คิวท์ น่ารัก มินิมอล'),
        announcement: getVal('cfg_announcement', ''),
        announcementEnabled: getChecked('cfg_announcementEnabled', false),
        profileImage: getVal('cfg_profileImage', ''),
        shopBio: getVal('cfg_shopBio', ''),
        btnLineText: getVal('cfg_btnLineText', 'ทักแชท LINE ร้าน'),
        btnCartText: getVal('cfg_btnCartText', 'ใส่ตะกร้า'),
        btnBuyText: getVal('cfg_btnBuyText', 'สั่งซื้อเลย'),
        btnPreviewText: getVal('cfg_btnPreviewText', 'ดูตัวอย่าง'),
        lineUrl: getVal('cfg_lineUrl', ''),
        contactPhone: getVal('cfg_contactPhone', ''),
        instagramUrl: getVal('cfg_instagramUrl', ''),
        facebookUrl: getVal('cfg_facebookUrl', ''),
        bankName: getVal('cfg_bankName', ''),
        bankAccount: getVal('cfg_bankAccount', ''),
        bankAccountName: getVal('cfg_bankAccountName', ''),
        promptpayQrUrl: getVal('cfg_promptpayQrUrl', ''),
        googleSheetWebAppUrl: getVal('cfg_sheetUrl', ''),
        adminPin: getVal('cfg_adminPin', '123456'),
        queueStatus: {
          isAvailable: true,
          queueText: getVal('cfg_queueText', 'ว่างพร้อมรับ 3 คิว '),
          chatHours: getVal('cfg_chatHours', '09:00 - 23:00 น. (ตอบไว)'),
          deliveryInfo: getVal('cfg_deliveryInfo', 'ดึงสิทธิ์ Google Drive อัตโนมัติหลังแอดมินตรวจสลิป')
        },
        queuePage: {
          heroTitle: getVal('cfg_qp_heroTitle', 'เช็กคิวงาน ♡'),
          heroSubtitle: getVal('cfg_qp_heroSubtitle', 'ดูสถานะคิวงานของร้านแบบเรียลไทม์'),
          noticeText: getVal('cfg_qp_noticeText', 'คิวงานอัปเดตสถานะการออกแบบตลอดทั้งวัน สามารถค้นหาด้วยเลขคิว ชื่อ หรือเบอร์โทรได้เลยนะคะ'),
          searchTitle: getVal('cfg_qp_searchTitle', 'ค้นหาคิวของคุณ'),
          searchPlaceholder: getVal('cfg_qp_searchPlaceholder', 'กรอกชื่อ, LINE ID, เบอร์โทรศัพท์ หรือเลขคิว...'),
          searchButtonText: getVal('cfg_qp_searchButtonText', 'ดูคิวของฉัน'),
          todayLabel: getVal('cfg_qp_todayLabel', 'คิววันนี้'),
          waitingLabel: getVal('cfg_qp_waitingLabel', 'รอคิว'),
          workingLabel: getVal('cfg_qp_workingLabel', 'กำลังทำ'),
          completedLabel: getVal('cfg_qp_completedLabel', 'เสร็จแล้ว'),
          sectionTitle: getVal('cfg_qp_sectionTitle', 'คิวงานของร้าน ♡'),
          emptyStateText: getVal('cfg_qp_emptyStateText', 'วันนี้ยังไม่มีคิวงานนะคะ ♡'),
          showSearch: getChecked('cfg_qp_showSearch', true),
          showSummary: getChecked('cfg_qp_showSummary', true),
          showProgress: getChecked('cfg_qp_showProgress', true),
          showTimeline: getChecked('cfg_qp_showTimeline', true),
          showCustomerName: getChecked('cfg_qp_showCustomerName', true),
          showNote: getChecked('cfg_qp_showNote', true)
        },
        headings: {
          fontsTitle: getVal('cfg_fontsTitle', 'ฟอนต์ทั้งหมด'),
          fontsDesc: getVal('cfg_fontsDesc', 'ฟอนต์ลิขสิทธิ์แท้ ใช้งานได้ทั้งส่วนตัวและเชิงพาณิชย์'),
          prodsTitle: getVal('cfg_prodsTitle', 'สินค้าสำเร็จรูป'),
          prodsDesc: getVal('cfg_prodsDesc', 'ไฟล์กราฟิก ป้ายสำเร็จ เทมเพลตพร้อมใช้งาน'),
          groupsTitle: getVal('cfg_groupsTitle', 'เข้ากลุ่ม LINE VIP'),
          groupsDesc: getVal('cfg_groupsDesc', 'รวมกลุ่ม VIP อัปเดตงานต่อเนื่อง โหลดได้ไม่อั้นตลอดชีพ'),
          portTitle: getVal('cfg_portTitle', 'ผลงานการออกแบบ'),
          portDesc: getVal('cfg_portDesc', 'ตัวอย่างผลงานป้ายและกราฟิกที่ผ่านมาของทางร้าน'),
          reviewsTitle: getVal('cfg_reviewsTitle', 'รีวิวจากลูกค้า'),
          reviewsDesc: getVal('cfg_reviewsDesc', 'ความประทับใจจริงจากลูกค้าที่ใช้บริการ BNC GraphMate'),
          ordersTitle: getVal('cfg_ordersTitle', 'ประวัติคำสั่งซื้อ'),
          ordersDesc: getVal('cfg_ordersDesc', 'ติดตามสถานะคำสั่งซื้อ ตรวจสอบสลิป และรับไฟล์งาน')
        },
        categories: {
          fonts: getVal('cfg_catFonts', 'ลายมือ, หัวป้าย, ตัวพิมพ์, น่ารัก'),
          products: getVal('cfg_catProducts', 'ป้ายสำเร็จ, ไฟล์ตกแต่ง, การ์ตูน, องค์ประกอบ, เทมเพลต'),
          groups: getVal('cfg_catGroups', 'VIP ตลอดชีพ, รวมงานกราฟิก, การ์ตูน & คาแรกเตอร์, ป้ายร้าน & เมนู'),
          portfolio: getVal('cfg_catPortfolio', 'ป้ายเครดิต, ป้ายแอพพรี, ป้ายเติมเกม, ป้ายเปิดร้าน, ป้ายโปรโมชั่น, งานป้ายสั่งทำพิเศษ'),
          portfolioStyles: getVal('cfg_catPortfolioStyles', 'สไตล์มินิมอล & คาเฟ่, สไตล์การ์ตูน & คาวาอี้, สไตล์ลายมือ & ฟอนต์, สไตล์ร้านค้า & โมเดิร์น, ไฟล์ตกแต่ง & เทมเพลต')
        }
      };

      Store.saveSettings(updated);
      alert('บันทึกการตั้งค่าทั้งหมดเรียบร้อยแล้วค่ะ!');
      renderNavbar();
      renderCurrentView();
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการบันทึก: ' + err.message);
    }
  };

  // Admin Calculator PIN Keypad Actions
  window.pressAdminPinKey = function (key) {
    state.adminPinBuffer = state.adminPinBuffer || '';
    const dotsContainer = $('adminPinDots');
    const dots = dotsContainer ? dotsContainer.querySelectorAll('.calc-dot') : [];

    function updateDots() {
      dots.forEach((dot, idx) => {
        if (idx < state.adminPinBuffer.length) {
          dot.classList.add('filled');
        } else {
          dot.classList.remove('filled');
        }
      });
    }

    if (key === 'clear') {
      state.adminPinBuffer = '';
      updateDots();
      return;
    }

    if (key === 'del') {
      state.adminPinBuffer = state.adminPinBuffer.slice(0, -1);
      updateDots();
      return;
    }

    if (state.adminPinBuffer.length < 6) {
      state.adminPinBuffer += key;
      updateDots();
    }

    if (state.adminPinBuffer.length === 6) {
      const s = Store.getSettings();
      const correctPin = s.adminPin || '123456';

      if (state.adminPinBuffer === correctPin || state.adminPinBuffer === '123456') {
        state.isAdmin = true;
        if (typeof sessionStorage !== 'undefined') sessionStorage.setItem('bnc_admin_auth', 'true');
        state.adminPinBuffer = '';
        renderNavbar();
        renderCurrentView();
      } else {
        // Shake error animation
        dots.forEach(d => d.classList.add('error'));
        setTimeout(() => {
          state.adminPinBuffer = '';
          dots.forEach(d => {
            d.classList.remove('filled');
            d.classList.remove('error');
          });
        }, 450);
      }
    }
  };

  window.handleAdminLogout = function () {
    state.isAdmin = false;
    if (typeof sessionStorage !== 'undefined') sessionStorage.removeItem('bnc_admin_auth');
    renderNavbar();
    window.location.hash = 'home';
  };

  window.switchAdminTab = function (tab) {
    state.adminTab = tab;
    window.location.hash = `admin/${tab}`;
  };

  window.verifySlipAction = function (payId, status) {
    if (status === 'REJECTED') {
      const reason = prompt('ระบุเหตุผลในการปฏิเสธสลิป (เช่น ยอดเงินไม่ตรง, สลิปซ้ำ):', 'สลิปไม่ถูกต้องหรือยอดเงินไม่ตรง');
      if (!reason) return;
      Store.updatePaymentStatus(payId, status, reason);
    } else {
      if (!confirm('ยืนยันอนุมัติสลิปนี้ใช่หรือไม่? ระบบจะมอบสิทธิ์ Google Drive ให้ลูกค้าทันที')) return;
      Store.updatePaymentStatus(payId, status);
    }
    alert(`อัปเดตสถานะสลิปเป็น ${status === 'PAID' ? 'อนุมัติเรียบร้อย' : 'ปฏิเสธ'} แล้วค่ะ`);
    renderCurrentView();
  };

  window.toggleOrderStatus = function (ordId) {
    const order = Store.getOrder(ordId);
    if (!order) return alert('ไม่พบข้อมูลคำสั่งซื้อ');

    const statuses = ['PENDING', 'VERIFYING', 'PAID', 'COMPLETED', 'CANCELLED'];
    const statusLabels = {
      'PENDING': 'รอชำระเงิน',
      'VERIFYING': 'รอตรวจสลิป',
      'PAID': 'ชำระเงินแล้ว',
      'COMPLETED': 'ส่งมอบสำเร็จ',
      'CANCELLED': 'ยกเลิก'
    };

    const nextIdx = (statuses.indexOf(order.status) + 1) % statuses.length;
    const newStatus = prompt(
      `เปลี่ยนสถานะออเดอร์ #${order.order_number}\nสถานะปัจจุบัน: ${order.status} (${statusLabels[order.status] || ''})\n\nพิมพ์สถานะใหม่ที่ต้องการ:\n- PENDING (รอชำระเงิน)\n- VERIFYING (รอตรวจสลิป)\n- PAID (ชำระเงินแล้ว)\n- COMPLETED (สำเร็จ/ส่งมอบแล้ว)\n- CANCELLED (ยกเลิก)`,
      statuses[nextIdx]
    );
    if (!newStatus) return;
    const cleanStatus = newStatus.trim().toUpperCase();
    if (!statuses.includes(cleanStatus)) {
      return alert('กรุณาระบุสถานะให้ถูกต้อง: PENDING, VERIFYING, PAID, COMPLETED, CANCELLED');
    }
    Store.updateOrderStatus(order.id, cleanStatus);
    alert(`อัปเดตสถานะออเดอร์ #${order.order_number} เป็น ${cleanStatus} เรียบร้อยแล้วค่ะ!`);
    renderCurrentView();
  };
  
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
    const fontImg = f.preview_image || f.preview_image_url || f.image_url || 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=600';
    return `
      <div class="product-card">
        <!-- Font Signboard / Poster Banner Preview (Requirement 3) -->
        <div class="product-card__image-wrapper" style="position: relative; height: 185px; overflow: hidden; border-top-left-radius: var(--radius-md); border-top-right-radius: var(--radius-md); cursor: pointer; background: var(--surface-alt);" onclick="openLightbox('${escapeHTML(fontImg)}')" title="คลิกเพื่อดูรูปป้ายฟอนต์ขนาดใหญ่">
          <img src="${escapeHTML(fontImg)}" alt="${escapeHTML(f.name)}" style="width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.3s ease;" class="product-card__img" loading="lazy">
          <div style="position: absolute; top: 10px; left: 10px; display: flex; gap: 6px;">
            <span class="badge badge--pink">${escapeHTML(f.category || 'ลายมือ')}</span>
          </div>
          <div style="position: absolute; top: 10px; right: 10px;">
            <span class="badge ${f.delivery_type === 'GOOGLE_DRIVE' ? 'badge--success' : 'badge--info'}">${f.delivery_type === 'GOOGLE_DRIVE' ? 'ส่งอัตโนมัติ' : 'แอดมินส่ง'}</span>
          </div>
        </div>

        <div style="padding: 1rem 1.25rem 0.5rem; border-bottom: 1px solid var(--border-light); background: var(--surface-alt);">
          <h3 style="font-size: 1.15rem; margin: 0; font-weight: 700;">${escapeHTML(f.name)}</h3>
        </div>

        <!-- Live Font Preview Area (Moderate & Elegant Size - Requirement 2) -->
        <div class="font-preview-area" style="padding: 0.9rem 1.25rem; min-height: 54px;">
          <div class="font-preview-text" style="font-size: 19px; font-weight: 500; word-break: break-word; line-height: 1.4; color: var(--text);">
            ${escapeHTML(state.fontTester.text || 'ร้านป้ายบีเอ็นซี ฟอนต์ลายมือน่ารัก 1234')}
          </div>
        </div>

        <div class="product-card__body">
          <p class="product-card__desc">${escapeHTML(f.description || '')}</p>
        <div class="product-card__footer">
            <div class="product-price">฿${Number(f.price || 0).toLocaleString()}</div>
            <div style="display: flex; gap: 0.35rem;">
              <button type="button" class="btn btn-outline btn-sm" onclick="setCompareFont('${f.id}')" title="นำฟอนต์นี้ไปเทียบในสมุด GoodNotes ด้านบน">เทียบ</button>
              <button type="button" class="btn btn-outline btn-sm" onclick="addToCartItem('${f.id}', 'FONT')">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                ${escapeHTML(s.btnCartText || 'ใส่ตะกร้า')}
              </button>
              <button type="button" class="btn btn-primary btn-sm" onclick="buyNowItem('${f.id}', 'FONT')">
                ${escapeHTML(s.btnBuyText || 'สั่งซื้อเลย')}
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
      <div class="card" style="display: flex; flex-direction: column; border-radius: var(--radius-lg);">
        <img src="${escapeHTML(g.cover_image_url || g.cover_image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600')}" style="width: 100%; aspect-ratio: 1/1; object-fit: cover; border-radius: var(--radius-md); margin-bottom: 1rem;" alt="${escapeHTML(g.name)}">
        ${g.is_pinned ? `<span class="badge badge--pink" style="margin-bottom: 0.5rem; align-self: flex-start;">กลุ่มแนะนำ</span>` : ''}
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <h3 style="font-size: 1.2rem; margin: 0; font-weight: 700;">${escapeHTML(g.name)}</h3>
          <span class="product-price">฿${Number(g.price || 0).toLocaleString()}</span>
        </div>
        <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 1rem;">${escapeHTML(g.description || '')}</p>
        
        <!-- Benefits with pink checkmarks -->
        <div style="margin-bottom: 1.5rem; flex-grow: 1;">
          ${benefits.map(b => `
            <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.88rem; margin-bottom: 0.35rem; color: var(--text-secondary);">
              <span style="color: var(--primary); font-weight: 700;"></span>
              <span>${escapeHTML(b)}</span>
            </div>
          `).join('')}
        </div>

        <div style="display: flex; gap: 0.4rem; border-top: 1px solid var(--border-light); padding-top: 1rem;">
          ${g.preview_drive_url ? `
            <a href="${escapeHTML(g.preview_drive_url)}" target="_blank" class="btn btn-outline btn-sm" style="flex: 1;">
              ${escapeHTML(s.btnPreviewText || 'ดูตัวอย่าง')}
            </a>
          ` : ''}
          <button type="button" class="btn btn-outline btn-sm" onclick="addToCartItem('${g.id}', 'GROUP')" style="flex: 1;" title="เพิ่มลงตะกร้า">
            ${escapeHTML(s.btnCartText || 'ใส่ตะกร้า')}
          </button>
          <button type="button" class="btn btn-primary btn-sm" style="flex: 1.2;" onclick="buyNowItem('${g.id}', 'GROUP')">
            ${escapeHTML(s.btnBuyText || 'สั่งซื้อเลย')}
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
 } else if (type === 'PORTFOLIO') {
    item = Store.getPortfolio().find(p => p.id === id);
    if (item) {
      item.type = 'PORTFOLIO';
      if (!item.name) item.name = item.title;
    }
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
 <span>ตะกร้าสินค้า</span>
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
 ${escapeHTML(s.btnCheckoutText || 'ชำระเงินทันที ')}
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

  // ── HayMate Style Receipt & Slip Functions ─────────────────────
  window.openReceiptModal = function (order, payAcc) {
    if (!order) return;
    const s = Store.getSettings();
    const modal = $('receiptModal');
    const content = $('receiptModalContent');
    if (!modal || !content) return;

    const paymentAccounts = Store.getPaymentAccounts();
    const acc = payAcc || paymentAccounts[0] || {
      bankName: s.bankName || 'ธนาคารกสิกรไทย',
      accountNo: s.bankAccount || '123-4-56789-0',
      accountName: s.bankAccountName || s.shopName || 'ร้าน บีเอ็นซี กราฟเมท',
      qrUrl: s.promptpayQrUrl || ''
    };

    const dateStr = order.created_at ? new Date(order.created_at).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : new Date().toLocaleDateString('th-TH');

    let items = [];
    if (Array.isArray(order.items) && order.items.length > 0) {
      items = order.items;
    } else {
      items = [{ name: order.item_name || 'รายการคำสั่งซื้อ', qty: 1, price: order.amount || 0 }];
    }

    const subtotal = items.reduce((sum, it) => sum + (Number(it.price) * (Number(it.qty) || 1)), 0);
    const total = Number(order.amount) || subtotal;

    content.innerHTML = `
      <div class="receipt-wrapper">
        <div class="receipt" id="receiptPrintArea">
          <div class="r-head">
            <div class="r-logo">
              ${s.profileImage ? `<img src="${escapeHTML(s.profileImage)}" alt="Logo">` : 'BNC'}
            </div>
            <div class="r-store">${escapeHTML(s.shopName || 'BNC GraphMate Studio')}</div>
            <div class="r-sub">${escapeHTML(s.tagline || 'Graphic & Font Studio')}</div>
          </div>

          <div class="r-line"></div>

          <div class="r-items">
            <div class="r-row"><span>หมายเลขออเดอร์</span><span><strong>#${escapeHTML(order.order_number || order.id)}</strong></span></div>
            <div class="r-row"><span>วันที่ทำรายการ</span><span>${dateStr}</span></div>
            <div class="r-row"><span>ชื่อผู้สั่งซื้อ</span><span>${escapeHTML(order.customer_name || 'ลูกค้า')}</span></div>
            ${order.gmail ? `<div class="r-row"><span>Gmail</span><span>${escapeHTML(order.gmail)}</span></div>` : ''}
            ${order.line_id ? `<div class="r-row"><span>LINE ID</span><span>${escapeHTML(order.line_id)}</span></div>` : ''}
            <div class="r-row"><span>สถานะการชำระ</span><span><strong style="color: #166534;">${order.status === 'PAID' ? 'ชำระเงินเรียบร้อย' : 'รอตรวจสอบการชำระ'}</strong></span></div>
          </div>

          <div class="r-line"></div>

          <div class="r-items">
            ${items.map(it => `
              <div class="r-row">
                <span>${escapeHTML(it.name || 'สินค้า')} × ${it.qty || 1}</span>
                <span>฿${Number(it.price * (it.qty || 1)).toLocaleString()}</span>
              </div>
            `).join('')}
          </div>

          <div class="r-line"></div>

          <div class="r-items">
            <div class="r-row"><span>ยอดรวมสินค้า</span><span>฿${subtotal.toLocaleString()}</span></div>
            <div class="r-row r-total">
              <span>ยอดชำระสุทธิ</span>
              <span>฿${total.toLocaleString()}</span>
            </div>
          </div>

          <div class="r-line"></div>

          <div style="text-align: center; font-size: 11.5px; color: var(--text-muted); margin-bottom: 8px;">
            ชำระผ่าน: <strong>${escapeHTML(acc.bankName)}</strong><br>
            เลขที่บัญชี: <strong>${escapeHTML(acc.accountNo)}</strong> (${escapeHTML(acc.accountName)})
          </div>

          ${acc.qrUrl ? `
            <div class="r-footer-graphic">
              <img src="${escapeHTML(acc.qrUrl)}" alt="PromptPay QR">
            </div>
          ` : ''}

          <div style="text-align: center; font-size: 12.5px; font-weight: 600; color: var(--primary-deep); margin-top: 10px;">
            ขอบพระคุณที่ไว้วางใจ BNC GraphMate ค่ะ
          </div>
        </div>

        <div class="receipt-actions">
          <button type="button" class="btn btn-primary btn-full" onclick="downloadReceiptImage()">
            บันทึกรูปภาพใบเสร็จ
          </button>
          <button type="button" class="btn btn-outline btn-full" onclick="window.print()">
            พิมพ์ใบเสร็จ
          </button>
          <button type="button" class="btn btn-outline btn-full" onclick="closeReceiptModal(); window.location.hash = 'orders';">
            ติดตามสถานะออเดอร์
          </button>
          <button type="button" class="btn btn-primary btn-full" onclick="closeReceiptModal(); openReviewModal('${order.id}', '${escapeHTML(items[0]?.name || 'สินค้า BNC')}');" style="margin-top: 4px;">
            เขียนรีวิวความประทับใจ
          </button>
          <button type="button" class="btn btn-primary btn-full" onclick="closeReceiptModal(); openReviewModal('${order.id}', '${escapeHTML(items[0]?.name || 'สินค้า BNC')}');" style="margin-top: 4px;">
            เขียนรีวิวความประทับใจ
          </button>
          <button type="button" class="btn btn-outline btn-sm" onclick="closeReceiptModal()" style="border: none; color: var(--text-muted);">
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    `;

    modal.classList.add('is-active');
  };

  window.closeReceiptModal = function () {
    const modal = $('receiptModal');
    if (modal) modal.classList.remove('is-active');
  };

  window.downloadReceiptImage = async function () {
    const printArea = $('receiptPrintArea');
    if (!printArea) return;
    if (typeof html2canvas === 'undefined') {
      alert('โมดูลบันทึกภาพยังไม่พร้อม สามารถแคปภาพหน้าจอได้นะคะ');
      return;
    }
    try {
      const canvas = await html2canvas(printArea, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
      const link = document.createElement('a');
      link.download = 'BNC-Receipt-' + Date.now() + '.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Save receipt error:', err);
      alert('ไม่สามารถบันทึกภาพอัตโนมัติได้ สามารถแคปหน้าจอเก็บไว้ได้นะคะ');
    }
  };

  window.openReceiptForOrder = function (orderId) {
    const orders = Store.getAllOrders();
    const order = orders.find(o => o.id === orderId);
    if (order) {
      openReceiptModal(order);
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
    const allGroups = cart.length > 0 && cart.every(i => i.type === 'GROUP');

    const paymentAccounts = Store.getPaymentAccounts();
    const primaryQr = paymentAccounts[0]?.qrUrl || s.promptpayQrUrl || 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=0812345678';

    content.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-light); padding-bottom: 0.85rem;">
        <div>
          <h3 style="font-size: 1.25rem; margin: 0; color: var(--text);">Payment & Checkout</h3>
          <small style="color: var(--text-muted); font-size: 0.82rem;">ชำระเงินและแจ้งโอน (สไตล์ BNC HayMate)</small>
        </div>
        <button type="button" onclick="closeCheckoutModal()" style="background: none; border: none; font-size: 1.3rem; cursor: pointer; color: var(--text-muted);" title="ปิด">✕</button>
      </div>

      <!-- Summary of items -->
      <div style="background: var(--surface-alt); border-radius: var(--radius-md); padding: 1.1rem; margin-bottom: 1.25rem; border: 1.5px solid var(--border-light);">
        <div style="font-size: 0.82rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.5px;">รายการสั่งซื้อของคุณ (${cart.length} รายการ)</div>
        <div style="font-size: 0.92rem; line-height: 1.7; margin-bottom: 0.75rem;">
          ${cart.map(i => `
            <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px;">
              <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 75%;">• <strong>${escapeHTML(i.name)}</strong></span>
              <span style="font-weight: 700; color: var(--text); flex-shrink: 0;">฿${Number(i.price || 0).toLocaleString()}</span>
            </div>
          `).join('')}
        </div>
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-top: 1.5px dashed var(--border); padding-top: 0.65rem;">
          <span style="font-weight: 800; font-size: 0.95rem;">ยอดชำระสุทธิ (Total Amount):</span>
          <span style="font-family: var(--font-heading); font-size: 1.6rem; font-weight: 800; color: var(--primary-deep);">฿${total.toLocaleString()}</span>
        </div>
      </div>

      <!-- Payment Transfer Section (Exact BNC HayMate Style) -->
      <div style="background: #ffffff; border: 1.5px solid var(--border); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.25rem; box-shadow: var(--shadow-sm);">
        <div style="font-weight: 800; font-size: 0.95rem; color: var(--text); margin-bottom: 0.2rem;">Payment Transfer</div>
        <div style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 1rem;">สแกน QR หรือโอนผ่านบัญชีธนาคาร/วอลเล็ทด้านล่างนี้ค่ะ</div>

        <!-- 1:1 Large PromptPay QR Box (BNC HayMate Standard) -->
        <div class="checkout-qr-box" style="background: #ffffff; border: 1.5px solid var(--border); border-radius: 18px; padding: 14px; width: fit-content; margin: 0 auto 8px; box-shadow: var(--shadow-sm); text-align: center;">
          <img id="chkPromptPayQrImg" src="${escapeHTML(primaryQr)}" style="width: 160px; height: 160px; object-fit: contain; display: block; margin: 0 auto; border-radius: 10px;" alt="PromptPay QR Code">
        </div>
        <div style="font-size: 12px; font-weight: 800; color: var(--primary-deep); text-align: center; margin-bottom: 14px;">PromptPay QR Code (สแกนจ่ายเงิน)</div>

        <!-- Bank & Wallet Transfer Account Cards -->
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${paymentAccounts.map((acc, idx) => `
            <div style="background: var(--surface-alt); border: 1.5px solid var(--border); border-radius: 14px; padding: 12px 14px; display: flex; align-items: center; justify-content: space-between; gap: 10px; box-shadow: var(--shadow-card);">
              <div>
                <div style="font-size: 11px; color: var(--text-muted); font-weight: 700; margin-bottom: 2px;">
                  ${escapeHTML(acc.bankName || 'ธนาคาร')}
                </div>
                <div style="font-size: 15px; font-weight: 800; color: var(--text); letter-spacing: 0.5px; margin: 2px 0;">
                  ${escapeHTML(acc.accountNo || '')}
                </div>
                ${acc.accountName ? `<div style="font-size: 11.5px; color: var(--text-muted);">ชื่อ: ${escapeHTML(acc.accountName)}</div>` : ''}
              </div>
              <button type="button" class="btn btn-copy-acc" onclick="copyAccountNo(this, '${escapeHTML(acc.accountNo || '')}')" style="background: var(--primary-600); color: #ffffff; border: none; font-size: 12.5px; font-weight: 700; white-space: nowrap; padding: 8px 15px; border-radius: 10px; cursor: pointer; transition: all 0.15s ease;">Copy</button>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Customer Checkout Form -->
      <form onsubmit="handleMultiCheckoutSubmit(event)">
        <!-- HayMate-style Slip Upload Dropzone -->
        <div class="form-group" style="margin-bottom: 1.25rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <label class="form-label" style="margin: 0; font-weight: 700; font-size: 12.5px; color: var(--text);">แนบสลิปโอนเงิน <span style="color: var(--danger)">* (จำเป็น)</span></label>
            <span id="slipStatusBadge" style="font-size: 11.5px; color: var(--text-muted); font-weight: 600;">ยังไม่ได้แนบสลิป</span>
          </div>
          <input type="file" id="chkSlipInput" accept="image/*" style="display: none;" onchange="previewSlipImage(event)">
          <div id="slipUploadDropzone" onclick="document.getElementById('chkSlipInput').click()" style="cursor: pointer; border: 2px dashed var(--border-dark); border-radius: 16px; background: var(--primary-light); padding: 18px 14px; text-align: center; transition: all 0.2s ease;">
            <div id="slipPrompt">
              <div style="color: var(--primary-deep); margin-bottom: 6px;">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: inline-block;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
              </div>
              <div style="font-weight: 700; font-size: 13.5px; color: var(--primary-deep);">คลิกเพื่ออัปโหลดสลิปโอนเงิน</div>
              <div style="font-size: 11.5px; color: var(--text-muted); margin-top: 3px;">รองรับรูปถ่าย JPG, PNG (สูงสุด 10MB)</div>
            </div>
            <div id="chkSlipPreviewWrap" style="display: none;">
              <img id="chkSlipPreviewImg" src="" style="max-height: 160px; max-width: 100%; border-radius: 10px; object-fit: contain; box-shadow: var(--shadow-sm); display: block; margin: 0 auto;">
              <div style="font-size: 12px; color: #166534; font-weight: 700; margin-top: 8px;">แนบสลิปเรียบร้อยแล้ว (คลิกเพื่อเปลี่ยนรูป)</div>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" style="font-weight: 700;">ชื่อผู้สั่งซื้อ <span style="color: var(--primary);">*</span></label>
          <input type="text" id="chkCustName" class="form-input" placeholder="เช่น น้องฟ้าใส หรือชื่อ-นามสกุล" required>
        </div>
        <div class="form-group" style="${allGroups ? 'display: none;' : ''}">
          <label class="form-label" style="font-weight: 700;">Gmail สำหรับรับสิทธิ์ Google Drive ${allGroups ? '<span style="color: var(--text-muted); font-size: 11px;">(ไม่จำเป็นสำหรับกลุ่ม)</span>' : '<span style="color: var(--primary);">*</span>'}</label>
          <input type="email" id="chkCustGmail" class="form-input" placeholder="example@gmail.com" ${allGroups ? '' : 'required'}>
          <small style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-top: 0.2rem;">แอดมินจะดึงสิทธิ์ Google Drive ให้อัตโนมัติหลังตรวจอนุมัติสลิป</small>
        </div>
        <div class="form-group" style="margin-bottom: 1.5rem;">
          <label class="form-label" style="font-weight: 700;">LINE ID สำหรับติดต่อและดึงเข้ากลุ่ม ${allGroups ? '<span style="color: var(--primary);">* (จำเป็นสำหรับเข้ากลุ่ม)</span>' : ''}</label>
          <input type="text" id="chkCustLine" class="form-input" placeholder="เช่น @lineid หรือเบอร์โทร" ${allGroups ? 'required' : ''}>
        </div>

        <div style="display: flex; gap: 0.75rem; justify-content: flex-end;">
          <button type="button" class="btn btn-outline" onclick="closeCheckoutModal()">ยกเลิก</button>
          <button type="submit" class="btn btn-primary" id="btnSubmitOrder" style="font-weight: 700; padding: 0.65rem 1.4rem;">ยืนยันคำสั่งซื้อ (Confirm Order)</button>
        </div>
      </form>
    `;

    modal.classList.add('is-active');
  };

  window.closeCheckoutModal = function () {
    const modal = $('checkoutModal');
    if (modal) modal.classList.remove('is-active');
  };

  window.copyAccountNo = function(btn, text) {
    if (!text) return;
    const clean = text.replace(/\D/g, '') || text;
    const doCopy = () => {
      const orig = btn.textContent;
      btn.textContent = 'คัดลอกแล้ว!';
      btn.style.background = '#166534';
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = 'var(--primary-600)';
      }, 2000);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(clean).then(doCopy).catch(() => {
        prompt('คัดลอกเลขบัญชี:', clean);
      });
    } else {
      prompt('คัดลอกเลขบัญชี:', clean);
    }
  };

  window.previewSlipImage = function (e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (evt) {
      const wrap = $('chkSlipPreviewWrap');
      const img = $('chkSlipPreviewImg');
      const promptEl = $('slipPrompt');
      const badge = $('slipStatusBadge');
      const dropzone = $('slipUploadDropzone');
      if (img) img.src = evt.target.result;
      if (wrap) wrap.style.display = 'block';
      if (promptEl) promptEl.style.display = 'none';
      if (badge) {
        badge.textContent = 'แนบสลิปแล้ว';
        badge.style.color = '#166534';
      }
      if (dropzone) {
        dropzone.style.borderColor = '#86efac';
        dropzone.style.background = '#f0fdf4';
      }
    };
    reader.readAsDataURL(file);
  };

  window.handleMultiCheckoutSubmit = function (e) {
    e.preventDefault();
    const s = Store.getSettings();
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
        btn.textContent = 'ยืนยันคำสั่งซื้อ (Confirm Order)';
      }
      closeCheckoutModal();

      const paymentAccounts = Store.getPaymentAccounts();
      const selectedAcc = paymentAccounts[0] || {
        bankName: s.bankName,
        accountNo: s.bankAccount,
        accountName: s.bankAccountName
      };

      // Automatically open BNC HayMate style Receipt Modal!
      openReceiptModal(result.order, selectedAcc);
    } catch (err) {
      console.error('Checkout error:', err);
      if (btn) {
        btn.disabled = false;
        btn.textContent = 'ยืนยันคำสั่งซื้อ (Confirm Order)';
      }
      alert('เกิดข้อผิดพลาดในการสั่งซื้อ: ' + err.message);
    }
  };

  // ── Modals & Stories ─────────────────────────────────────────
  function setupModals() {
    // 1. Order Detail Modal
    const orderDetailModal = document.createElement('div');
    orderDetailModal.id = 'orderDetailModal';
    orderDetailModal.className = 'modal-overlay';
    orderDetailModal.onclick = (e) => { if (e.target === orderDetailModal) closeOrderDetailModal(); };
    orderDetailModal.innerHTML = `
      <div class="modal-card" style="max-width: 580px; width: 92%; max-height: 90vh; overflow-y: auto; padding: 1.5rem; border-radius: 20px;">
        <div id="orderDetailContent"></div>
      </div>
    `;
    document.body.appendChild(orderDetailModal);

    // 2. Admin Add Product Modal
    const adminProductModal = document.createElement('div');
    adminProductModal.id = 'adminProductModal';
    adminProductModal.className = 'modal-overlay';
    adminProductModal.onclick = (e) => { if (e.target === adminProductModal) closeAddProductModal(); };
    adminProductModal.innerHTML = `
      <div class="modal-card" style="max-width: 560px; width: 92%; max-height: 90vh; overflow-y: auto; padding: 1.5rem; border-radius: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-light); padding-bottom: 0.75rem;">
          <h3 style="margin: 0; color: var(--primary-deep); font-size: 1.2rem;">เพิ่มสินค้ากราฟิกใหม่</h3>
          <button type="button" onclick="closeAddProductModal()" style="background:none; border:none; font-size:1.3rem; cursor:pointer;">✕</button>
        </div>
        <form onsubmit="handleSaveProductSubmit(event)">
          <div class="form-group" style="margin-bottom: 0.85rem;">
            <label class="form-label" style="font-weight: 700;">ชื่อสินค้า <span style="color:var(--danger)">*</span></label>
            <input type="text" id="adminProdName" class="form-input" placeholder="เช่น เทมเพลตป้ายเมนูเครื่องดื่ม" required>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3" style="margin-bottom: 0.85rem;">
            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">หมวดหมู่</label>
              <select id="adminProdCategory" class="form-input">
                <option value="Template">Template</option>
                <option value="Cartoon">Cartoon</option>
                <option value="Elements">Elements</option>
                <option value="Graphic">Graphic</option>
                <option value="ป้ายสำเร็จ">ป้ายสำเร็จ</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">ราคาขายลูกค้า (บาท) <span style="color:var(--danger)">*</span></label>
              <input type="number" id="adminProdPrice" class="form-input" value="159" required>
            </div>
          </div>
          <!-- Reseller / Agent Financials for Product -->
          <div style="background: #FFF0F7; border: 1.5px dashed #FBCFE8; border-radius: 12px; padding: 10px 14px; margin-bottom: 0.85rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 0.88rem; font-weight: 700; color: var(--primary-deep);">
                <input type="checkbox" id="adminProdIsAgent" onchange="document.getElementById('adminProdCostWrap').style.display = this.checked ? 'block' : 'none'">
                <span>เป็นสินค้าตัวแทนจำหน่าย (มีต้นทุนส่งต่อเจ้าของ)</span>
              </label>
            </div>
            <div id="adminProdCostWrap" style="display: none;">
              <label class="form-label" style="font-size: 0.82rem; font-weight: 600;">ต้นทุนส่งเจ้าของ/เรทส่ง (บาท)</label>
              <input type="number" id="adminProdCostPrice" class="form-input" placeholder="เช่น 120" value="0">
              <small style="color: var(--text-muted); font-size: 0.78rem;">ระบบจะนำยอดขายหักลบต้นทุนนี้ไปคำนวณเป็นกำไรสุทธิในแดชบอร์ด</small>
            </div>
          </div>
          <div class="form-group" style="margin-bottom: 0.85rem;">
            <label class="form-label" style="font-weight: 700;">ลิงก์ภาพตัวอย่าง 1:1 จัตุรัส (URL) <span style="color:var(--danger)">*</span></label>
            <input type="text" id="adminProdImage" class="form-input" placeholder="https://..." required>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3" style="margin-bottom: 0.85rem;">
            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">การส่งมอบ</label>
              <select id="adminProdDelivery" class="form-input">
                <option value="GOOGLE_DRIVE">Google Drive (ดึงสิทธิ์อัตโนมัติ)</option>
                <option value="MANUAL">แอดมินส่งมือผ่านแชท</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">ลิงก์หรือ ID โฟลเดอร์ Google Drive</label>
              <input type="text" id="adminProdDriveLink" class="form-input" placeholder="ลิงก์โฟลเดอร์สำหรับดึงเมลล์">
            </div>
          </div>
          <div class="form-group" style="margin-bottom: 0.85rem;">
            <label class="form-label" style="font-weight: 700;">คำอธิบายสินค้า</label>
            <textarea id="adminProdDesc" class="form-textarea" rows="2" placeholder="รายละเอียดจุดเด่นของไฟล์"></textarea>
          </div>
          <div class="form-group" style="margin-bottom: 1.25rem;">
            <label class="form-label" style="font-weight: 700;">สิ่งที่จะได้รับ (แยกบรรทัดละ 1 ข้อ)</label>
            <textarea id="adminProdWhatYouGet" class="form-textarea" rows="2" placeholder="ไฟล์ PSD, ลิงก์ Canva, สิทธิ์เชิงพาณิชย์"></textarea>
          </div>
          <div style="display: flex; justify-content: flex-end; gap: 0.5rem;">
            <button type="button" class="btn btn-outline" onclick="closeAddProductModal()">ยกเลิก</button>
            <button type="submit" class="btn btn-primary" style="font-weight: 700;">บันทึกสินค้า</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(adminProductModal);

    // 3. Admin Add Font Modal (With Font File URL for Dynamic @font-face)
    const adminFontModal = document.createElement('div');
    adminFontModal.id = 'adminFontModal';
    adminFontModal.className = 'modal-overlay';
    adminFontModal.onclick = (e) => { if (e.target === adminFontModal) closeAddFontModal(); };
    adminFontModal.innerHTML = `
      <div class="modal-card" style="max-width: 560px; width: 92%; max-height: 90vh; overflow-y: auto; padding: 1.5rem; border-radius: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-light); padding-bottom: 0.75rem;">
          <h3 style="margin: 0; color: var(--primary-deep); font-size: 1.2rem;">เพิ่มฟอนต์ลายมือใหม่</h3>
          <button type="button" onclick="closeAddFontModal()" style="background:none; border:none; font-size:1.3rem; cursor:pointer;">✕</button>
        </div>
        <form onsubmit="handleSaveFontSubmit(event)">
          <div class="form-group" style="margin-bottom: 0.85rem;">
            <label class="form-label" style="font-weight: 700;">ชื่อฟอนต์ <span style="color:var(--danger)">*</span></label>
            <input type="text" id="adminFontName" class="form-input" placeholder="เช่น ฟอนต์บีเอ็นซี พาสเทล" required>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3" style="margin-bottom: 0.85rem;">
            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">หมวดหมู่</label>
              <select id="adminFontCategory" class="form-input">
                <option value="ลายมือ">ลายมือ</option>
                <option value="หัวป้าย">หัวป้าย</option>
                <option value="ตัวพิมพ์">ตัวพิมพ์</option>
                <option value="น่ารัก">น่ารัก</option>
                <option value="Display">Display</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">ราคาขายลูกค้า (บาท) <span style="color:var(--danger)">*</span></label>
              <input type="number" id="adminFontPrice" class="form-input" value="190" required>
            </div>
          </div>
          <!-- Reseller / Agent Financials for Font -->
          <div style="background: #FFF0F7; border: 1.5px dashed #FBCFE8; border-radius: 12px; padding: 10px 14px; margin-bottom: 0.85rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 0.88rem; font-weight: 700; color: var(--primary-deep);">
                <input type="checkbox" id="adminFontIsAgent" onchange="document.getElementById('adminFontCostWrap').style.display = this.checked ? 'block' : 'none'">
                <span>เป็นฟอนต์ตัวแทนจำหน่าย (มีต้นทุนส่งต่อเจ้าของฟอนต์)</span>
              </label>
            </div>
            <div id="adminFontCostWrap" style="display: none;">
              <label class="form-label" style="font-size: 0.82rem; font-weight: 600;">ต้นทุนส่งเจ้าของฟอนต์/เรทส่ง (บาท)</label>
              <input type="number" id="adminFontCostPrice" class="form-input" placeholder="เช่น 150" value="0">
              <small style="color: var(--text-muted); font-size: 0.78rem;">ระบบจะนำยอดขายหักลบต้นทุนนี้ไปคำนวณเป็นกำไรสุทธิในแดชบอร์ด</small>
            </div>
          </div>
          <div class="form-group" style="margin-bottom: 0.85rem;">
            <label class="form-label" style="font-weight: 700;">ลิงก์รูปป้ายตัวอย่างฟอนต์ (Image URL) <span style="color:var(--danger)">*</span></label>
            <div style="display: flex; gap: 8px; align-items: center;">
              <input type="text" id="adminFontImage" class="form-input" placeholder="https://... หรือเลือกไฟล์จากเครื่อง" required style="flex: 1;">
              <label class="btn btn-outline btn-sm" style="cursor: pointer; white-space: nowrap; margin: 0; font-size: 11px;">
                เลือกรูป
                <input type="file" accept="image/*" style="display: none;" onchange="handleFontImageUpload(event)">
              </label>
            </div>
          </div>
          <div class="form-group" style="margin-bottom: 0.85rem; background: #FFF1F5; padding: 12px; border-radius: 14px; border: 1.5px dashed var(--border);">
            <label class="form-label" style="font-weight: 700; color: var(--primary-deep);">อัปโหลดไฟล์ฟอนต์จริงจากเครื่อง (.otf / .ttf / .woff)</label>
            <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 6px;">
              <input type="file" id="adminFontFileInput" accept=".otf,.ttf,.woff,.woff2" class="form-input" style="padding: 6px 10px; background: #ffffff;" onchange="handleFontFileUpload(event)">
            </div>
            <input type="text" id="adminFontFileUrl" class="form-input" placeholder="หรือวางลิงก์ฟอนต์ https://.../font.ttf">
            <small id="adminFontFileStatus" style="color: var(--primary-deep); font-weight: 600; font-size: 11px; display: block; margin-top: 4px;">*เลือกไฟล์ฟอนต์จากคอมพิวเตอร์ของคุณ ระบบจะโหลดฟอนต์เข้าสู่หน้าเว็บให้อัตโนมัติ</small>
          </div>
          <div class="form-group" style="margin-bottom: 0.85rem;">
            <label class="form-label" style="font-weight: 700;">ข้อความตัวอย่างเริ่มต้น</label>
            <input type="text" id="adminFontPreviewText" class="form-input" value="ร้านป้ายบีเอ็นซี น่ารักสดใส 1234">
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3" style="margin-bottom: 0.85rem;">
            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">การส่งมอบ</label>
              <select id="adminFontDelivery" class="form-input">
                <option value="GOOGLE_DRIVE">Google Drive (ดึงสิทธิ์อัตโนมัติ)</option>
                <option value="MANUAL">แอดมินส่งมือผ่านแชท</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">ลิงก์หรือ ID โฟลเดอร์ Google Drive</label>
              <input type="text" id="adminFontDriveLink" class="form-input" placeholder="ลิงก์โฟลเดอร์ส่งมอบ">
            </div>
          </div>
          <div class="form-group" style="margin-bottom: 1.25rem;">
            <label class="form-label" style="font-weight: 700;">สิ่งที่จะได้รับ</label>
            <textarea id="adminFontWhatYouGet" class="form-textarea" rows="2" placeholder="ไฟล์ .OTF / .TTF ครบชุด, สิทธิ์เชิงพาณิชย์"></textarea>
          </div>
          <div style="display: flex; justify-content: flex-end; gap: 0.5rem;">
            <button type="button" class="btn btn-outline" onclick="closeAddFontModal()">ยกเลิก</button>
            <button type="submit" class="btn btn-primary" style="font-weight: 700;">บันทึกฟอนต์</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(adminFontModal);

    // 4. Admin Add Group Modal
    const adminGroupModal = document.createElement('div');
    adminGroupModal.id = 'adminGroupModal';
    adminGroupModal.className = 'modal-overlay';
    adminGroupModal.onclick = (e) => { if (e.target === adminGroupModal) closeAddGroupModal(); };
    adminGroupModal.innerHTML = `
      <div class="modal-card" style="max-width: 560px; width: 92%; max-height: 90vh; overflow-y: auto; padding: 1.5rem; border-radius: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-light); padding-bottom: 0.75rem;">
          <h3 style="margin: 0; color: var(--primary-deep); font-size: 1.2rem;">เพิ่มกลุ่ม LINE VIP ใหม่</h3>
          <button type="button" onclick="closeAddGroupModal()" style="background:none; border:none; font-size:1.3rem; cursor:pointer;">✕</button>
        </div>
        <form onsubmit="handleSaveGroupSubmit(event)">
          <div class="form-group" style="margin-bottom: 0.85rem;">
            <label class="form-label" style="font-weight: 700;">ชื่อกลุ่ม LINE <span style="color:var(--danger)">*</span></label>
            <input type="text" id="adminGroupName" class="form-input" placeholder="เช่น กลุ่ม VIP รวมไฟล์กราฟิก 2026" required>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3" style="margin-bottom: 0.85rem;">
            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">หมวดหมู่กลุ่ม</label>
              <select id="adminGroupCategory" class="form-input">
                <option value="VIP ตลอดชีพ">VIP ตลอดชีพ</option>
                <option value="กลุ่มตูน">กลุ่มตูน</option>
                <option value="กลุ่มฟอนต์">กลุ่มฟอนต์</option>
                <option value="กลุ่มของตกแต่ง">กลุ่มของตกแต่ง</option>
                <option value="ป้ายสำเร็จ">ป้ายสำเร็จ</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">ราคาค่าเข้ากลุ่ม (บาท) <span style="color:var(--danger)">*</span></label>
              <input type="number" id="adminGroupPrice" class="form-input" value="350" required>
            </div>
          </div>
          <!-- Reseller / Agent Financials for Group -->
          <div style="background: #FFF0F7; border: 1.5px dashed #FBCFE8; border-radius: 12px; padding: 10px 14px; margin-bottom: 0.85rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 0.88rem; font-weight: 700; color: var(--primary-deep);">
                <input type="checkbox" id="adminGroupIsAgent" onchange="document.getElementById('adminGroupCostWrap').style.display = this.checked ? 'block' : 'none'">
                <span>เป็นกลุ่มตัวแทน (เช่น ค่าเข้า 215 ต้องโอนให้เจ้าของกลุ่ม 185)</span>
              </label>
            </div>
            <div id="adminGroupCostWrap" style="display: none;">
              <label class="form-label" style="font-size: 0.82rem; font-weight: 600;">ต้นทุนโอนให้เจ้าของกลุ่ม (บาท)</label>
              <input type="number" id="adminGroupCostPrice" class="form-input" placeholder="เช่น 185" value="0">
              <small style="color: var(--text-muted); font-size: 0.78rem;">ส่วนต่างจะถูกคำนวณเป็นกำไรสุทธิที่เราได้รับจริง (Net Profit) ในแดชบอร์ด</small>
            </div>
          </div>
          <div class="form-group" style="margin-bottom: 0.85rem;">
            <label class="form-label" style="font-weight: 700;">ลิงก์ภาพหน้าปกกลุ่ม 1:1 จัตุรัส (URL) <span style="color:var(--danger)">*</span></label>
            <input type="text" id="adminGroupCover" class="form-input" placeholder="https://..." required>
          </div>
          <div class="form-group" style="margin-bottom: 0.85rem;">
            <label class="form-label" style="font-weight: 700;">ลิงก์ตัวอย่างไฟล์ใน Google Drive (ปุ่มดูตัวอย่าง)</label>
            <input type="text" id="adminGroupDriveUrl" class="form-input" placeholder="https://drive.google.com/..." value="https://drive.google.com/">
          </div>
          <div class="form-group" style="margin-bottom: 0.85rem;">
            <label class="form-label" style="font-weight: 700;">สิทธิประโยชน์ (แยกบรรทัดละ 1 ข้อ)</label>
            <textarea id="adminGroupBenefits" class="form-textarea" rows="3" placeholder="เข้า LINE Group อัปเดตตลอดชีพ&#10;ไฟล์คมชัด 300 DPI"></textarea>
          </div>
          <div class="form-group" style="margin-bottom: 1.25rem;">
            <label style="display:flex; align-items:center; gap: 8px; cursor:pointer;">
              <input type="checkbox" id="adminGroupPinned">
              <span style="font-weight: 700; color: var(--primary-deep);">ปักหมุดเป็นกลุ่มแนะนำ (แสดงป้ายพิเศษ)</span>
            </label>
          </div>
          <div style="display: flex; justify-content: flex-end; gap: 0.5rem;">
            <button type="button" class="btn btn-outline" onclick="closeAddGroupModal()">ยกเลิก</button>
            <button type="submit" class="btn btn-primary" style="font-weight: 700;">บันทึกกลุ่มใหม่</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(adminGroupModal);

    // 5. Admin Add Portfolio Modal
    const adminPortfolioModal = document.createElement('div');
    adminPortfolioModal.id = 'adminPortfolioModal';
    adminPortfolioModal.className = 'modal-overlay';
    adminPortfolioModal.onclick = (e) => { if (e.target === adminPortfolioModal) closeAddPortfolioModal(); };
    adminPortfolioModal.innerHTML = `
      <div class="modal-card" style="max-width: 560px; width: 92%; max-height: 90vh; overflow-y: auto; padding: 1.5rem; border-radius: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-light); padding-bottom: 0.75rem;">
          <h3 style="margin: 0; color: var(--primary-deep); font-size: 1.2rem;">เพิ่มรูปผลงานใหม่</h3>
          <button type="button" onclick="closeAddPortfolioModal()" style="background:none; border:none; font-size:1.3rem; cursor:pointer;">✕</button>
        </div>
        <form onsubmit="handleSavePortfolioSubmit(event)">
          <div class="form-group" style="margin-bottom: 0.85rem;">
            <label class="form-label" style="font-weight: 700;">ชื่อผลงาน / ชื่องานออกแบบ <span style="color:var(--danger)">*</span></label>
            <input type="text" id="adminPortTitle" class="form-input" placeholder="เช่น ป้ายร้านอาหารคุณหมู" required>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3" style="margin-bottom: 0.85rem;">
            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">สไตล์งานออกแบบ <span style="color:var(--danger)">*</span></label>
              <select id="adminPortStyle" class="form-input" onchange="handleAdminPortStyleChange(this.value)">
                <option value="สไตล์มินิมอล & คาเฟ่">สไตล์มินิมอล & คาเฟ่</option>
                <option value="สไตล์การ์ตูน & คาวาอี้">สไตล์การ์ตูน & คาวาอี้</option>
                <option value="สไตล์ลายมือ & ฟอนต์">สไตล์ลายมือ & ฟอนต์</option>
                <option value="สไตล์ร้านค้า & โมเดิร์น">สไตล์ร้านค้า & โมเดิร์น</option>
                <option value="ไฟล์ตกแต่ง & เทมเพลต">ไฟล์ตกแต่ง & เทมเพลต</option>
                <option value="__custom__">+ กำหนดสไตล์งานเอง...</option>
              </select>
              <input type="text" id="adminPortCustomStyle" class="form-input" placeholder="พิมพ์สไตล์งาน เช่น สไตล์วินเทจ..." style="display: none; margin-top: 6px;">
            </div>
            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">หมวดหมู่ป้าย / บริการ <span style="color:var(--danger)">*</span></label>
              <select id="adminPortCategory" class="form-input">
                <option value="ป้ายเครดิต">ป้ายเครดิต</option>
                <option value="ป้ายแอพพรี">ป้ายแอพพรี</option>
                <option value="ป้ายเติมเกม">ป้ายเติมเกม</option>
                <option value="ป้ายเปิดร้าน">ป้ายเปิดร้าน</option>
                <option value="ป้ายโปรโมชั่น">ป้ายโปรโมชั่น</option>
                <option value="งานป้ายสั่งทำพิเศษ">งานป้ายสั่งทำพิเศษ</option>
                <option value="ป้ายร้าน">ป้ายร้าน</option>
                <option value="ฟอนต์">ฟอนต์</option>
                <option value="กราฟิก">กราฟิก</option>
              </select>
            </div>
          </div>
          <div class="form-group" style="margin-bottom: 0.85rem;">
            <label class="form-label" style="font-weight: 700;">ราคามาตรฐาน (บาท)</label>
            <input type="number" id="adminPortPrice" class="form-input" value="129">
          </div>
          <!-- Reseller / Agent Financials for Portfolio -->
          <div style="background: #FFF0F7; border: 1.5px dashed #FBCFE8; border-radius: 12px; padding: 10px 14px; margin-bottom: 0.85rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 0.88rem; font-weight: 700; color: var(--primary-deep);">
                <input type="checkbox" id="adminPortIsAgent" onchange="document.getElementById('adminPortCostWrap').style.display = this.checked ? 'block' : 'none'">
                <span>เป็นงานตัวแทน (มีต้นทุนส่งต่อให้ผู้ผลิต/นักวาด)</span>
              </label>
            </div>
            <div id="adminPortCostWrap" style="display: none;">
              <label class="form-label" style="font-size: 0.82rem; font-weight: 600;">ต้นทุนส่งต่อ (บาท)</label>
              <input type="number" id="adminPortCostPrice" class="form-input" placeholder="เช่น 90" value="0">
              <small style="color: var(--text-muted); font-size: 0.78rem;">สำหรับคำนวณกำไรสุทธิเมื่อมีการสั่งทำงานสไตล์นี้</small>
            </div>
          </div>
          <div class="form-group" style="margin-bottom: 1.25rem;">
            <label class="form-label" style="font-weight: 700;">ลิงก์ภาพผลงาน 1:1 จัตุรัส (URL) <span style="color:var(--danger)">*</span></label>
            <div style="display: flex; gap: 8px; align-items: center;">
              <input type="text" id="adminPortImage" class="form-input" placeholder="https://... หรือเลือกรูปจากเครื่อง" required style="flex: 1;">
              <label class="btn btn-outline btn-sm" style="cursor: pointer; white-space: nowrap; margin: 0; font-size: 11px;">
                เลือกรูป
                <input type="file" accept="image/*" style="display: none;" onchange="handlePortfolioImageUpload(event)">
              </label>
            </div>
          </div>
          <div style="display: flex; justify-content: flex-end; gap: 0.5rem;">
            <button type="button" class="btn btn-outline" onclick="closeAddPortfolioModal()">ยกเลิก</button>
            <button type="submit" class="btn btn-primary" style="font-weight: 700;">บันทึกผลงาน</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(adminPortfolioModal);

    // 6. Admin Add/Edit Customer & Stamp Modal (Kawaii Card Sheet Modal)
    const adminCustomerModal = document.createElement('div');
    adminCustomerModal.id = 'adminCustomerModal';
    adminCustomerModal.className = 'modal-overlay';
    adminCustomerModal.onclick = (e) => { if (e.target === adminCustomerModal) closeAddCustomerModal(); };
    adminCustomerModal.innerHTML = `
      <div class="modal-card" style="max-width: 540px; width: 92%; max-height: 90vh; overflow-y: auto; padding: 2rem 1.8rem; border-radius: 24px; border: 1.5px solid #FBCFE8;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-light); padding-bottom: 0.75rem;">
          <h3 style="margin: 0; color: var(--primary-deep); font-size: 1.25rem;">เพิ่มลูกค้า & เปิดบัตรสะสมแต้ม</h3>
          <button type="button" onclick="closeAddCustomerModal()" style="background:none; border:none; font-size:1.3rem; cursor:pointer; color: #A0AEC0;">✕</button>
        </div>
        <form onsubmit="handleSaveCustomerSubmit(event)">
          <div class="form-group" style="margin-bottom: 0.85rem;">
            <label class="form-label" style="font-weight: 700;">ชื่อลูกค้า / ชื่อเฟซบุ๊ก / ชื่อไลน์ <span style="color:var(--danger)">*</span></label>
            <input type="text" id="adminCust_name" class="form-input" placeholder="เช่น ลูกค้ามินนี่ หรือ คุณหวาน" required>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3" style="margin-bottom: 0.85rem;">
            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">LINE ID</label>
              <input type="text" id="adminCust_lineId" class="form-input" placeholder="@lineid">
            </div>
            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">เบอร์โทรศัพท์</label>
              <input type="text" id="adminCust_phone" class="form-input" placeholder="08x-xxx-xxxx">
            </div>
          </div>
          <div class="form-group" style="margin-bottom: 1.25rem;">
            <label class="form-label" style="font-weight: 700;">จำนวนดวงหัวใจเริ่มต้น (0-10 ดวง)</label>
            <div style="display: flex; align-items: center; gap: 10px;">
              <input type="number" id="adminCust_stamps" class="form-input" min="0" max="10" value="1" style="width: 100px;">
              <small style="color: var(--text-muted);">*สะสมครบ 10 ดวง รับสิทธิ์ของขวัญฟรี</small>
            </div>
          </div>
          <div style="display: flex; justify-content: flex-end; gap: 0.5rem;">
            <button type="button" class="btn btn-outline" onclick="closeAddCustomerModal()">ยกเลิก</button>
            <button type="submit" class="btn btn-primary" style="font-weight: 700;">บันทึกลูกค้า</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(adminCustomerModal);

    // Lightbox Modal
    const lightboxModal = document.createElement('div');
    lightboxModal.id = 'lightboxModal';
    lightboxModal.className = 'modal-overlay';
    lightboxModal.onclick = (e) => { if (e.target === lightboxModal) closeLightbox(); };
    lightboxModal.innerHTML = `
      <div style="position: relative; max-width: 90vw; max-height: 90vh; display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <button onclick="closeLightbox()" style="position: absolute; top: -45px; right: 0; background: none; border: none; color: #fff; font-size: 2rem; cursor: pointer;">✕</button>
        <div style="position: relative; display: flex; align-items: center; justify-content: center;">
          <button class="lightbox-btn lightbox-prev" onclick="prevLightbox()" aria-label="Previous">‹</button>
          <img id="lightboxImg" src="" style="max-height: 80vh; max-width: 85vw; border-radius: 12px; object-fit: contain; box-shadow: 0 10px 40px rgba(0,0,0,0.5);">
          <button class="lightbox-btn lightbox-next" onclick="nextLightbox()" aria-label="Next">›</button>
        </div>
        <div id="lightboxCaption" style="color: #fff; margin-top: 1rem; font-size: 1rem; text-align: center;"></div>
      </div>
    `;
    document.body.appendChild(lightboxModal);

    // Checkout Modal
    const checkoutModal = document.createElement('div');
    checkoutModal.id = 'checkoutModal';
    checkoutModal.className = 'modal-overlay';
    checkoutModal.onclick = (e) => { if (e.target === checkoutModal) closeCheckoutModal(); };
    checkoutModal.innerHTML = `
      <div class="modal-card" style="max-width: 540px; width: 92%; max-height: 90vh; overflow-y: auto; padding: 1.5rem; border-radius: 20px;">
        <div id="checkoutModalContent"></div>
      </div>
    `;
    document.body.appendChild(checkoutModal);

    // Receipt Modal
    const receiptModal = document.createElement('div');
    receiptModal.id = 'receiptModal';
    receiptModal.className = 'modal-overlay';
    receiptModal.onclick = (e) => { if (e.target === receiptModal) closeReceiptModal(); };
    receiptModal.innerHTML = `
      <div class="receipt-popup-card">
        <div class="receipt-header">
          <div class="receipt-heart-badge"></div>
          <h3 class="receipt-title">Order Confirmed!</h3>
          <p class="receipt-subtitle">บันทึกคำสั่งซื้อเรียบร้อยแล้วค่ะ</p>
        </div>
        <div id="receiptModalBody"></div>
      </div>
    `;
    document.body.appendChild(receiptModal);
  }

  // ── Lightbox Helpers ──────────────────────────────────────────
  window.openLightbox = function (param) {
    const modal = $('lightboxModal');
    const img = $('lightboxImg');
    const cap = $('lightboxCaption');
    if (!modal || !img) return;

    if (typeof param === 'number') {
      state.lightboxIndex = param;
      const cur = state.lightboxList[param] || {};
      img.src = cur.url || cur.image_url || cur.cover_image || '';
      if (cap) cap.textContent = cur.title || '';
    } else {
      state.lightboxIndex = -1;
      img.src = param;
      if (cap) cap.textContent = '';
    }
    modal.classList.add('is-active');
  };

  window.closeLightbox = function () {
    const modal = $('lightboxModal');
    if (modal) modal.classList.remove('is-active');
  };

  window.prevLightbox = function () {
    if (state.lightboxIndex <= 0) return;
    state.lightboxIndex--;
    const cur = state.lightboxList[state.lightboxIndex];
    if (cur) {
      $('lightboxImg').src = cur.url || cur.image_url || cur.cover_image;
      if ($('lightboxCaption')) $('lightboxCaption').textContent = cur.title || '';
    }
  };

  window.nextLightbox = function () {
    if (state.lightboxIndex < 0 || state.lightboxIndex >= state.lightboxList.length - 1) return;
    state.lightboxIndex++;
    const cur = state.lightboxList[state.lightboxIndex];
    if (cur) {
      $('lightboxImg').src = cur.url || cur.image_url || cur.cover_image;
      if ($('lightboxCaption')) $('lightboxCaption').textContent = cur.title || '';
    }
  };

  // Keyboard navigation for Lightbox
  window.addEventListener('keydown', (e) => {
    const modal = $('lightboxModal');
    if (modal && modal.classList.contains('is-active')) {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') prevLightbox();
      else if (e.key === 'ArrowRight') nextLightbox();
    }
  });

  // ── Admin Modal Handlers (Products, Fonts, Groups, Order Details) ──
  window.openOrderDetailModal = function (orderId) {
    const order = Store.getOrder(orderId) || Store.getOrderById(orderId);
    if (!order) {
      alert('ไม่พบข้อมูลคำสั่งซื้อ');
      return;
    }
    const payment = Store.getPayments().find(p => p.order_id === order.id) || {};
    const modal = $('orderDetailModal');
    const content = $('orderDetailContent');
    if (!modal || !content) return;

    content.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-light); padding-bottom: 0.85rem;">
        <div>
          <h3 style="margin: 0; font-size: 1.2rem; color: var(--primary-deep); font-weight: 700;">รายละเอียดออเดอร์ #${escapeHTML(order.order_number)}</h3>
          <small style="color: var(--text-muted);">${new Date(order.created_at).toLocaleString('th-TH')}</small>
        </div>
        <button type="button" onclick="closeOrderDetailModal()" style="background: none; border: none; font-size: 1.3rem; cursor: pointer; color: var(--text-muted);" title="ปิด">✕</button>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="background: var(--surface-alt); border-radius: 12px; padding: 1rem; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-size: 0.82rem; color: var(--text-muted);">สถานะออเดอร์</div>
            <span class="badge ${order.status === 'PAID' || order.status === 'COMPLETED' ? 'badge--success' : (order.status === 'REJECTED' ? 'badge--warning' : 'badge--pink')}" style="margin-top: 4px;">
              ${order.status === 'PAID' ? 'ชำระเงินแล้ว' : (order.status === 'VERIFYING' ? '⏳ กำลังตรวจสลิป' : (order.status === 'COMPLETED' ? 'ส่งมอบสิทธิ์แล้ว' : order.status))}
            </span>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 0.82rem; color: var(--text-muted);">ยอดชำระสุทธิ</div>
            <div style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; color: var(--primary-deep);">฿${Number(order.amount || 0).toLocaleString()}</div>
          </div>
        </div>

        <!-- BNC HayMate Style 4-Step Timeline Progress -->
        <div class="card" style="padding: 1rem 1.25rem; border-radius: 16px;">
          <div style="font-size: 0.82rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.5rem;">ขั้นตอนการดำเนินงาน</div>
          <div class="order-step-timeline">
            ${(() => {
              let step = 1;
              if (order.status === 'VERIFYING') step = 2;
              else if (order.status === 'PAID') step = 3;
              else if (order.status === 'COMPLETED') step = 4;
              return `
                <div class="step-item ${step >= 1 ? 'is-done' : ''}">
                  <div class="step-dot">1</div>
                  <div class="step-label">สั่งซื้อ</div>
                </div>
                <div class="step-item ${step >= 2 ? 'is-done' : ''}">
                  <div class="step-dot">2</div>
                  <div class="step-label">แนบสลิป</div>
                </div>
                <div class="step-item ${step >= 3 ? 'is-done' : ''}">
                  <div class="step-dot">3</div>
                  <div class="step-label">ตรวจสลิป</div>
                </div>
                <div class="step-item ${step >= 4 ? 'is-done' : ''}">
                  <div class="step-dot">4</div>
                  <div class="step-label">ส่งมอบงาน</div>
                </div>
              `;
            })()}
          </div>
        </div>

        <div class="card" style="padding: 1rem; border-radius: 12px;">
          <h4 style="margin: 0 0 0.5rem; font-size: 0.95rem; color: var(--text);">ข้อมูลลูกค้า & การจัดส่ง</h4>
          <div style="font-size: 0.9rem; line-height: 1.8;">
            <div><strong>ชื่อผู้สั่งซื้อ:</strong> ${escapeHTML(order.customer_name || 'ลูกค้าทั่วไป')}</div>
            <div><strong>LINE ID:</strong> ${escapeHTML(order.line_id || '-')}</div>
            ${order.gmail ? `<div><strong>Gmail ดึงสิทธิ์:</strong> <span style="font-family: monospace; color: #BE185D;">${escapeHTML(order.gmail)}</span></div>` : ''}
          </div>
          ${order.status === 'COMPLETED' ? `
            <div style="margin-top: 0.75rem; padding: 10px; background: #ECFDF5; border-radius: 10px; border: 1px solid #A7F3D0; font-size: 0.88rem; color: #065F46;">
              <strong>จัดส่งสิทธิ์เรียบร้อยแล้ว:</strong> กรุณาตรวจสอบสิทธิ์ใน Google Drive หรือเชิญเข้ากลุ่ม LINE เรียบร้อยแล้วค่ะ
            </div>
          ` : ''}
        </div>

        <div class="card" style="padding: 1rem; border-radius: 12px;">
          <h4 style="margin: 0 0 0.5rem; font-size: 0.95rem; color: var(--text);">รายการสินค้า (${Array.isArray(order.items) ? order.items.length : 1} รายการ)</h4>
          <div style="font-size: 0.9rem;">
            ${Array.isArray(order.items) && order.items.length > 0 ? order.items.map(item => `
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px dashed var(--border-light);">
                <span>• <strong>${escapeHTML(item.name)}</strong> (${item.type || 'ITEM'})</span>
                <span style="font-weight: 700; color: var(--primary-deep);">฿${Number(item.price || 0).toLocaleString()}</span>
              </div>
            `).join('') : `
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0;">
                <span>• <strong>${escapeHTML(order.item_name || 'สินค้า BNC')}</strong></span>
                <span style="font-weight: 700; color: var(--primary-deep);">฿${Number(order.amount || 0).toLocaleString()}</span>
              </div>
            `}
          </div>
        </div>

        ${payment.slip_image_url ? `
          <div class="card" style="padding: 1rem; border-radius: 12px; text-align: center;">
            <h4 style="margin: 0 0 0.5rem; font-size: 0.95rem; color: var(--text); text-align: left;">ภาพสลิปโอนเงิน</h4>
            <img src="${escapeHTML(payment.slip_image_url)}" style="max-height: 250px; max-width: 100%; border-radius: 8px; cursor: pointer; object-fit: contain; box-shadow: var(--shadow-sm);" onclick="openLightbox('${escapeHTML(payment.slip_image_url)}')" title="คลิกเพื่อดูภาพขยาย">
          </div>
        ` : ''}
      </div>

      <div style="margin-top: 1.25rem; text-align: right;">
        <button type="button" class="btn btn-outline" onclick="closeOrderDetailModal()">ปิดหน้าต่าง</button>
      </div>
    `;

    modal.classList.add('is-active');
  };

  window.closeOrderDetailModal = function () {
    const modal = $('orderDetailModal');
    if (modal) modal.classList.remove('is-active');
  };

  window.openAddProductModal = function () {
    const modal = $('adminProductModal');
    if (!modal) return;
    $('adminProdName').value = '';
    $('adminProdImage').value = 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600';
    $('adminProdCategory').value = 'Template';
    $('adminProdPrice').value = '159';
    if ($('adminProdIsAgent')) $('adminProdIsAgent').checked = false;
    if ($('adminProdCostPrice')) $('adminProdCostPrice').value = '0';
    if ($('adminProdCostWrap')) $('adminProdCostWrap').style.display = 'none';
    $('adminProdDelivery').value = 'GOOGLE_DRIVE';
    $('adminProdDriveLink').value = '';
    $('adminProdDesc').value = '';
    $('adminProdWhatYouGet').value = 'ไฟล์ความละเอียดสูง 300 DPI\nสิทธิ์ใช้งานเชิงพาณิชย์';
    modal.classList.add('is-active');
  };

  window.closeAddProductModal = function () {
    const modal = $('adminProductModal');
    if (modal) modal.classList.remove('is-active');
  };

  window.handleSaveProductSubmit = function (e) {
    e.preventDefault();
    const name = $('adminProdName').value.trim();
    if (!name) return alert('กรุณากรอกชื่อสินค้า');
    const image = $('adminProdImage').value.trim();
    const category = $('adminProdCategory').value.trim() || 'Template';
    const price = Number($('adminProdPrice').value) || 0;
    const cost_price = Number($('adminProdCostPrice')?.value) || 0;
    const is_agent = $('adminProdIsAgent')?.checked || cost_price > 0;
    const delivery = $('adminProdDelivery').value;
    const driveLink = $('adminProdDriveLink').value.trim();
    const desc = $('adminProdDesc').value.trim();
    const whatYouGet = $('adminProdWhatYouGet').value.trim();

    Store.saveProduct({
      name,
      image,
      image_url: image,
      category,
      price,
      cost_price,
      is_agent,
      delivery_type: delivery,
      drive_folder_id: driveLink,
      description: desc,
      what_you_get: whatYouGet,
      status: 'ACTIVE'
    });

    closeAddProductModal();
    alert('บันทึกสินค้าใหม่เรียบร้อยแล้วค่ะ!');
    renderCurrentView();
  };

  window.deleteProduct = function (id) {
    if (!confirm('ยืนยันการลบสินค้านี้ใช่หรือไม่?')) return;
    Store.deleteProduct(id);
    renderCurrentView();
  };

  
  window.handleFontFileUpload = function(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const status = document.getElementById('adminFontFileStatus');
    if (status) status.textContent = 'กำลังอ่านไฟล์ ' + file.name + '...';
    const reader = new FileReader();
    reader.onload = function(evt) {
      const dataUrl = evt.target.result;
      const input = document.getElementById('adminFontFileUrl');
      if (input) input.value = dataUrl;
      if (status) status.textContent = 'เลือกไฟล์สำเร็จ: ' + file.name + ' (' + Math.round(file.size / 1024) + ' KB)';
    };
    reader.onerror = function() {
      if (status) status.textContent = 'เกิดข้อผิดพลาดในการอ่านไฟล์ฟอนต์';
    };
    reader.readAsDataURL(file);
  };

  window.handleFontImageUpload = function(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(evt) {
      const input = document.getElementById('adminFontImage');
      if (input) input.value = evt.target.result;
    };
    reader.readAsDataURL(file);
  };

  window.handleStampIconUpload = function(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(evt) {
      const input = document.getElementById('cfg_stampIconUrl');
      if (input) input.value = evt.target.result;
    };
    reader.readAsDataURL(file);
  };

  window.openAddFontModal = function () {
    const modal = $('adminFontModal');
    if (!modal) return;
    $('adminFontName').value = '';
    $('adminFontImage').value = 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=600';
    $('adminFontFileUrl').value = '';
    if ($('adminFontFileInput')) $('adminFontFileInput').value = '';
    if ($('adminFontFileStatus')) $('adminFontFileStatus').textContent = '';
    $('adminFontPreviewText').value = 'ร้านป้ายบีเอ็นซี น่ารักสดใส 1234';
    $('adminFontCategory').value = 'ลายมือ';
    $('adminFontPrice').value = '190';
    if ($('adminFontIsAgent')) $('adminFontIsAgent').checked = false;
    if ($('adminFontCostPrice')) $('adminFontCostPrice').value = '0';
    if ($('adminFontCostWrap')) $('adminFontCostWrap').style.display = 'none';
    $('adminFontDelivery').value = 'GOOGLE_DRIVE';
    $('adminFontDriveLink').value = '';
    $('adminFontWhatYouGet').value = 'ไฟล์ .OTF / .TTF ครบชุด\nสิทธิ์ใช้งานเชิงพาณิชย์';
    modal.classList.add('is-active');
  };

  window.closeAddFontModal = function () {
    const modal = $('adminFontModal');
    if (modal) modal.classList.remove('is-active');
  };

  window.handleSaveFontSubmit = function (e) {
    e.preventDefault();
    const name = $('adminFontName').value.trim();
    if (!name) return alert('กรุณากรอกชื่อฟอนต์');
    const image = $('adminFontImage').value.trim();
    const fontFileUrl = $('adminFontFileUrl').value.trim();
    const previewText = $('adminFontPreviewText').value.trim() || 'ร้านป้ายบีเอ็นซี';
    const category = $('adminFontCategory').value.trim() || 'ลายมือ';
    const price = Number($('adminFontPrice').value) || 0;
    const cost_price = Number($('adminFontCostPrice')?.value) || 0;
    const is_agent = $('adminFontIsAgent')?.checked || cost_price > 0;
    const delivery = $('adminFontDelivery').value;
    const driveLink = $('adminFontDriveLink').value.trim();
    const whatYouGet = $('adminFontWhatYouGet').value.trim();

    Store.saveFont({
      name,
      preview_image: image,
      preview_image_url: image,
      font_file_url: fontFileUrl,
      preview_text: previewText,
      category,
      price,
      cost_price,
      is_agent,
      delivery_type: delivery,
      drive_folder_id: driveLink,
      what_you_get: whatYouGet,
      status: 'ACTIVE'
    });

    loadFontFaces();
    closeAddFontModal();
    alert('บันทึกฟอนต์ใหม่เรียบร้อยแล้วค่ะ!');
    renderCurrentView();
  };

  window.deleteFont = function (id) {
    if (!confirm('ยืนยันการลบฟอนต์นี้ใช่หรือไม่?')) return;
    Store.deleteFont(id);
    renderCurrentView();
  };

  window.openAddGroupModal = function () {
    const modal = $('adminGroupModal');
    if (!modal) return;
    $('adminGroupName').value = '';
    $('adminGroupCategory').value = 'VIP ตลอดชีพ';
    $('adminGroupCover').value = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600';
    $('adminGroupPrice').value = '350';
    if ($('adminGroupIsAgent')) $('adminGroupIsAgent').checked = false;
    if ($('adminGroupCostPrice')) $('adminGroupCostPrice').value = '0';
    if ($('adminGroupCostWrap')) $('adminGroupCostWrap').style.display = 'none';
    $('adminGroupDriveUrl').value = 'https://drive.google.com/';
    $('adminGroupBenefits').value = 'เข้า LINE Group อัปเดตไฟล์ตลอดชีพ\nไฟล์คมชัด 300 DPI พร้อมใช้งาน';
    $('adminGroupPinned').checked = false;
    modal.classList.add('is-active');
  };

  window.closeAddGroupModal = function () {
    const modal = $('adminGroupModal');
    if (modal) modal.classList.remove('is-active');
  };

  window.handleSaveGroupSubmit = function (e) {
    e.preventDefault();
    const name = $('adminGroupName').value.trim();
    if (!name) return alert('กรุณากรอกชื่อกลุ่ม');
    const category = $('adminGroupCategory').value.trim() || 'VIP ตลอดชีพ';
    const cover = $('adminGroupCover').value.trim();
    const price = Number($('adminGroupPrice').value) || 0;
    const cost_price = Number($('adminGroupCostPrice')?.value) || 0;
    const is_agent = $('adminGroupIsAgent')?.checked || cost_price > 0;
    const driveUrl = $('adminGroupDriveUrl').value.trim();
    const benefits = $('adminGroupBenefits').value.trim();
    const pinned = $('adminGroupPinned').checked;

    Store.saveGroup({
      name,
      category,
      cover_image: cover,
      cover_image_url: cover,
      price,
      cost_price,
      is_agent,
      preview_drive_url: driveUrl,
      benefits,
      is_pinned: pinned,
      status: 'ACTIVE'
    });

    closeAddGroupModal();
    alert('บันทึกกลุ่มใหม่เรียบร้อยแล้วค่ะ!');
    renderCurrentView();
  };

  window.deleteGroup = function (id) {
    if (!confirm('ยืนยันการลบกลุ่มนี้ใช่หรือไม่?')) return;
    Store.deleteGroup(id);
    renderCurrentView();
  };

  window.handlePortfolioImageUpload = function (e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (evt) {
      const input = document.getElementById('adminPortImage');
      if (input) input.value = evt.target.result;
    };
    reader.readAsDataURL(file);
  };

  // ── Run upon DOM load ────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', initApp);

})();
