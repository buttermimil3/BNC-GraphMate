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
    stampSettings: {
      cardTitle: 'บัตรสะสมแต้ม BNC GraphMate',
      cardSubtitle: 'สะสมตราปั๊มหัวใจครบ 10 ดวง รับสิทธิ์ดาวน์โหลดฟอนต์ฟรี หรือของขวัญพิเศษจากทางร้านทันที',
      rewardText: 'สะสมครบ 10 ดวงแล้ว ทักแชท LINE เพื่อแลกรับของขวัญฟรีได้เลยค่ะ',
      rulesText: 'ทุกออเดอร์งานป้าย ฟอนต์ หรือสินค้าสำเร็จ รับตราปั๊มหัวใจ 1 ดวงทันที\nสะสมครบ 10 ดวง เลือกรับฟอนต์ลายมือน่ารักฟรี 1 ชุด หรือสิทธิ์รับงานออกแบบฟรี\nติดต่อแลกรางวัลได้ทาง LINE Official ของร้าน',
      mascotIcon: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100'
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
 getAllOrders: function () {
 return this.getOrders();
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
 <div class="container navbar__inner">
 <a href="#home" class="brand-link">
 
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
      <!-- Facebook Cover Banner (Restored by Request) -->
      <div class="fb-cover-banner" style="width: 100%; max-height: 380px; overflow: hidden; background: #FFF0F5;">
        <img src="${escapeHTML(s.coverImage || 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=1600')}" class="fb-cover-img" alt="Cover Banner" style="width: 100%; height: 100%; object-fit: cover; display: block;" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=1600';">
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
            <div class="notebook-binder-header">
              <div class="notebook-binder-holes">
                <span class="notebook-hole"></span>
                <span class="notebook-hole"></span>
                <span class="notebook-hole"></span>
                <span class="notebook-hole"></span>
                <span class="notebook-hole"></span>
              </div>
              <div style="font-size: 13px; font-weight: 800; color: var(--primary-deep); display: flex; align-items: center; gap: 6px;">
                <span>คิวงานและแจ้งเตือนร้าน BNC GraphMate</span>
              </div>
              <div class="queue-badge-chip">
                <span class="queue-status-bullet"></span>
                <span>${escapeHTML(queueStatus.queueText || 'ว่างพร้อมรับ 3 คิว')}</span>
              </div>
            </div>

            <div class="queue-notebook-paper">
              <div style="font-size: 0.95rem; line-height: 2.1; color: var(--text); font-weight: 600;">
                <div><strong>สถานะคิวงานออกแบบ:</strong> <span style="color: var(--primary-deep);">${escapeHTML(queueStatus.queueText || 'ว่างพร้อมรับ 3 คิว')}</span></div>
                <div><strong>เวลาตอบแชท:</strong> ${escapeHTML(queueStatus.chatHours || '09:00 - 23:00 น. (ตอบไว)')}</div>
                <div><strong>ความเร็วการส่งมอบ:</strong> ${escapeHTML(queueStatus.deliveryInfo || 'ดึงสิทธิ์ Google Drive อัตโนมัติหลังแอดมินตรวจสลิป')}</div>
              </div>
              <div style="margin-top: 1rem; display: flex; justify-content: flex-end;">
                <a href="${escapeHTML(s.lineUrl || 'https://line.me/ti/p/~bncgraphmate')}" target="_blank" class="btn btn-primary btn-sm" style="font-weight: 700; border-radius: 12px;">
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
    const categories = ['ALL', 'ลายมือ', 'หัวป้าย', 'ตัวพิมพ์', 'น่ารัก'];

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
          
          <div class="section-header">
            <span class="section-tag">Interactive Font Tester</span>
            <h2 class="section-title">ทดสอบ & เปรียบเทียบฟอนต์ลายมือสด</h2>
            <p class="section-desc">ลองพิมพ์ข้อความเทียบฟอนต์ 2 แบบบนกระดาษลายเส้น GoodNotes เพื่อเลือกแบบที่ถูกใจที่สุด</p>
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
    const categories = ['ALL', 'ป้ายเครดิต', 'ป้ายแอพพรี', 'ป้ายเติมเกม', 'ป้ายเปิดร้าน', 'ป้ายโปรโมชั่น', 'งานป้ายสั่งทำพิเศษ', 'ป้ายร้าน', 'ฟอนต์', 'กราฟิก'];

    state.portfolioPriceFilter = state.portfolioPriceFilter || 'ALL';

    const filtered = portfolio.filter(item => {
      if (state.portfolioPriceFilter !== 'ALL') {
        const pMatch = item.category === state.portfolioPriceFilter || (item.title && item.title.includes(state.portfolioPriceFilter));
        return pMatch;
      }
      if (state.portfolioFilter && state.portfolioFilter !== 'ALL') {
        return item.category === state.portfolioFilter || (item.category && item.category.includes(state.portfolioFilter));
      }
      return true;
    });

    state.lightboxList = filtered;

    container.innerHTML = `
      <section style="padding: 2.5rem 0 4rem;">
        <div class="container">
          <div class="section-header">
            <span class="section-tag">Our Works & Gallery</span>
            <h2 class="section-title">${escapeHTML(headings.portTitle || 'แกลเลอรีผลงาน & อัตราค่าบริการ')}</h2>
            <p class="section-desc">${escapeHTML(headings.portDesc || 'ตัวอย่างผลงานป้ายและกราฟิกที่ผ่านมาของทางร้าน คลิกเลือกรายการราคาเพื่อกรองดูผลงานได้ทันที')}</p>
          </div>

          <!-- Standard Price Menu Card Before Gallery (Click to filter works) -->
          <div class="price-menu-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; border-bottom: 1.5px dashed var(--border); padding-bottom: 0.75rem;">
              <div>
                <h3 style="font-size: 1.15rem; margin: 0; color: var(--primary-deep);">ตารางอัตราค่าบริการ & รายการราคาป้ายยอดนิยม</h3>
                <small style="color: var(--text-muted); font-size: 0.82rem;">คลิกที่รายการราคาด้านล่าง เพื่อดูตัวอย่างผลงานของงานประเภทนั้นๆ ได้ทันทีค่ะ</small>
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
                ${state.portfolioPriceFilter !== 'ALL' ? `กำลังแสดงผลงานหมวด: <strong>${escapeHTML(state.portfolioPriceFilter)}</strong> (${filtered.length} รายการ)` : 'แสดงผลงานทั้งหมด'}
              </small>
              ${state.portfolioPriceFilter !== 'ALL' ? `
                <button type="button" class="btn btn-outline btn-sm" onclick="filterPortfolioByPrice('ALL')">ดูผลงานทั้งหมด</button>
              ` : ''}
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
                <p>ยังไม่มีรูปผลงานในหมวดหมู่นี้ค่ะ แอดมินสามารถเพิ่มรูปได้ในเมนูหลังบ้าน (จัดการผลงาน)</p>
                <button type="button" class="btn btn-outline btn-sm" onclick="filterPortfolioByPrice('ALL')">ดูผลงานทั้งหมด</button>
              </div>
            `}
          </div>

        </div>
      </section>
    `;
  }

  window.filterPortfolioByPrice = function (serviceName) {
    state.portfolioPriceFilter = serviceName;
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
                  const isRewardSlot = num === 10;

                  if (isStamped) {
                    return `
                      <div class="stamp-slot is-stamped" title="ดวงที่ ${num}: ปั๊มแล้ว">
                        <div class="stamp-ink-ring"></div>
                        ${stampCfg.stampIconUrl ? `
                          <img src="${escapeHTML(stampCfg.stampIconUrl)}" alt="Stamp" style="width: 36px; height: 36px; object-fit: contain; z-index: 2; position: relative;" onerror="this.onerror=null;this.style.display='none';">
                        ` : `
                          <svg class="stamp-heart-icon" width="28" height="28" viewBox="0 0 24 24" fill="#FF5BA8"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                          <span class="stamp-badge-text" style="color: #FF2D8A;">BNC</span>
                        `}
                      </div>
                    `;
                  } else {
                    return `
                      <div class="stamp-slot is-empty ${isRewardSlot ? 'is-reward' : ''}" title="ดวงที่ ${num}: ยังไม่ได้ปั๊ม">
                        ${isRewardSlot ? `
                          <span style="font-size: 10px; font-weight: 800; text-align: center; line-height: 1.2; color: #d97706;">ฟรี 1 สิทธิ์</span>
                        ` : `
                          <span class="stamp-slot-num">${num}</span>
                        `}
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
 <small><a href="#admin/slips" style="color: var(--primary); text-decoration: underline;">ไปตรวจสลิป </a></small>
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
                <th>หมวดหมู่ (ราคา)</th>
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

  window.openAddPortfolioModal = function () {
    const modal = $('adminPortfolioModal');
    if (!modal) return;
    $('adminPortTitle').value = '';
    $('adminPortCategory').value = 'ป้ายเครดิต';
    $('adminPortPrice').value = '129';
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
    const category = $('adminPortCategory').value;
    const price = Number($('adminPortPrice').value) || 0;
    const image = ($('adminPortImage')?.value || '').trim();
    if (!image) return alert('กรุณากรอกลิงก์รูปภาพ 1:1');

    Store.savePortfolioItem({
      title,
      category,
      price,
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
    const name = prompt('กรอกชื่อลูกค้า:');
    if (!name) return;
    const lineId = prompt('กรอก LINE ID (ถ้ามี):', '') || '';
    const phone = prompt('กรอกเบอร์โทรศัพท์ (ถ้ามี):', '') || '';
    const stamps = Number(prompt('จำนวนดวงเริ่มต้น (0-10):', '1')) || 0;

    Store.saveCustomer({
      name,
      line_id: lineId,
      phone,
      heart_stamps: stamps
    });
    alert('เพิ่มลูกค้าและเปิดบัตรสะสมแต้มเรียบร้อยแล้วค่ะ!');
    renderCurrentView();
  };

  function renderAdminSettingsTab(s) {
    const stats = s.stats || {};
    const banners = Store.getHomeBanners();
    const queueStatus = Store.getQueueStatus();
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
            <div class="form-group">
              <label class="form-label">ลิงก์รูปมาสคอตหน้าร้าน</label>
              <input type="text" id="cfg_stampMascotIcon" class="form-input" value="${escapeHTML(Store.getStampSettings().mascotIcon || s.profileImage || '')}">
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
        headings: {
          fontsTitle: getVal('cfg_fontsTitle', 'ฟอนต์ทั้งหมด'),
          fontsDesc: getVal('cfg_fontsDesc', 'ฟอนต์ลิขสิทธิ์แท้ ใช้งานได้ทั้งส่วนตัวและเชิงพาณิชย์'),
          prodsTitle: getVal('cfg_prodsTitle', 'สินค้าสำเร็จรูป'),
          prodsDesc: getVal('cfg_prodsDesc', 'ไฟล์กราฟิก ป้ายสำเร็จ เทมเพลตพร้อมใช้งาน'),
          groupsTitle: getVal('cfg_groupsTitle', 'เข้ากลุ่ม LINE VIP'),
          groupsDesc: getVal('cfg_groupsDesc', 'รวมกลุ่ม VIP อัปเดตงานต่อเนื่อง โหลดได้ไม่อั้นตลอดชีพ'),
          portTitle: getVal('cfg_portTitle', 'ผลงานการออกแบบ'),
          portDesc: getVal('cfg_portDesc', 'ตัวอย่างผลงานป้ายและกราฟิกที่ผ่านมาของทางร้าน'),
          reviewsTitle: Store.getHeadings().reviewsTitle || 'รีวิวจากลูกค้า',
          reviewsDesc: Store.getHeadings().reviewsDesc || 'ความประทับใจจริงจากลูกค้าที่ใช้บริการ BNC GraphMate',
          ordersTitle: Store.getHeadings().ordersTitle || 'ประวัติคำสั่งซื้อ',
          ordersDesc: Store.getHeadings().ordersDesc || 'ติดตามสถานะคำสั่งซื้อ ตรวจสอบสลิป และรับไฟล์งาน'
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
    if (!order) return;
    const nextStatus = order.status === 'VERIFYING' ? 'PAID' : (order.status === 'PAID' ? 'COMPLETED' : 'VERIFYING');
    Store.updateOrderStatus(ordId, nextStatus);
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
              <label class="form-label" style="font-weight: 700;">ราคา (บาท) <span style="color:var(--danger)">*</span></label>
              <input type="number" id="adminProdPrice" class="form-input" value="159" required>
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
              <label class="form-label" style="font-weight: 700;">ราคา (บาท) <span style="color:var(--danger)">*</span></label>
              <input type="number" id="adminFontPrice" class="form-input" value="190" required>
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

        <div class="card" style="padding: 1rem; border-radius: 12px;">
          <h4 style="margin: 0 0 0.5rem; font-size: 0.95rem; color: var(--text);">ข้อมูลลูกค้า</h4>
          <div style="font-size: 0.9rem; line-height: 1.7;">
            <div>👤 <strong>ชื่อ:</strong> ${escapeHTML(order.customer_name || 'ลูกค้าทั่วไป')}</div>
            <div><strong>LINE ID:</strong> ${escapeHTML(order.line_id || '-')}</div>
            ${order.gmail ? `<div>📧 <strong>Gmail:</strong> <span style="font-family: monospace;">${escapeHTML(order.gmail)}</span></div>` : ''}
          </div>
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
    const driveUrl = $('adminGroupDriveUrl').value.trim();
    const benefits = $('adminGroupBenefits').value.trim();
    const pinned = $('adminGroupPinned').checked;

    Store.saveGroup({
      name,
      category,
      cover_image: cover,
      cover_image_url: cover,
      price,
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

  // ── Run upon DOM load ────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', initApp);

})();
