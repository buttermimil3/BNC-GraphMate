/**
 * BNC GraphMate — Unified Data Store (Supabase Cloud Database + Vercel Fast Cache)
 * ข้อมูลตรงกันทุกเครื่อง 100% (ทั้งมือถือลูกค้า และคอมพิวเตอร์แอดมิน)
 */

// ============================================================
// SUPABASE CLOUD DATABASE CONFIGURATION
// ผู้ดูแลระบบสามารถใส่ Project URL และ Anon Key ของ Supabase ที่นี่
// ============================================================
const SUPABASE_CONFIG = {
  url: 'https://vmtmmtfjhujdijbiwawa.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtdG1tdGZqaHVqZGlqYml3YXdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkyOTIyMjMsImV4cCI6MjEwNDg2ODIyM30.26oysoMBoUzxd98gkInd4zXv7hkya4cTdAkw87G_Esk'
};

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
 footerBrand: 'BNC GraphMate Studio',
 footerCopy: 'สตูดิโอออกแบบป้ายร้าน งานฟอนต์ลายมือ สติกเกอร์ และทรัพยากรกราฟิกสำเร็จรูป สไตล์คิวท์ น่ารัก มินิมอล',
 footerCopyright: '© 2026 BNC GraphMate. All Rights Reserved. Powered by Cloud Sync & Vercel.',
 portfolioContactUrl: '',
 homeReviewIds: ['rev-1'],
 stats: {
 portfolioCount: '250+',
 fontCount: '48',
 memberCount: '1.2k',
 portfolioLabel: 'ผลงาน',
 fontLabel: 'ฟอนต์',
 memberLabel: 'สมาชิก'
 },
 pointsBarIcon: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    mascotSettings: {
      enabled: true,
      mascot1: {
        name: 'น้องกระต่ายพาสเทล',
        png: 'https://api.iconify.design/fluent-emoji-flat:rabbit.svg',
        quote: 'หวัดดีฮับ!'
      },
      mascot2: {
        name: 'น้องหมีสตูดิโอ',
        png: 'https://api.iconify.design/fluent-emoji-flat:bear.svg',
        quote: 'แวะดูฟอนต์ได้น้า'
      },
      mascot3: {
        name: 'น้องแมวโมจิ',
        png: 'https://api.iconify.design/fluent-emoji-flat:cat-face.svg',
        quote: 'เหมียววว~ จับได้ด้วย!'
      }
    },
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
      heroTitle: 'เช็กคิวงาน',
      heroSubtitle: 'ดูสถานะคิวงานของร้านแบบเรียลไทม์',
      noticeText: 'คิวงานอัปเดตสถานะการออกแบบตลอดทั้งวัน สามารถค้นหาด้วยเลขคิว ชื่อ หรือเบอร์โทรได้เลยนะคะ',
      searchTitle: 'ค้นหาคิวของคุณ',
      searchPlaceholder: 'กรอกชื่อ, LINE ID, เบอร์โทรศัพท์ หรือเลขคิว...',
      searchButtonText: 'ดูคิวของฉัน',
      searchDescription: '*กรอกข้อมูลที่ใช้กับทางร้านเพื่อค้นหาคิวของคุณ',
      monthLabel: 'คิวเดือนนี้',
      waitingLabel: 'รอคิว',
      workingLabel: 'กำลังทำ',
      completionLabel: 'ความสำเร็จในเดือนนี้',
      sectionTitle: 'คิวงานของร้าน',
      emptyStateText: 'ยังไม่มีคิวงานนะคะ',
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
      },
      mascotStages: {
        pct0: 'https://api.iconify.design/fluent-emoji-flat:cat-face.svg',
        pct25: 'https://api.iconify.design/fluent-emoji-flat:rabbit.svg',
        pct50: 'https://api.iconify.design/fluent-emoji-flat:bear.svg',
        pct75: 'https://api.iconify.design/fluent-emoji-flat:panda.svg',
        pct100: 'https://api.iconify.design/fluent-emoji-flat:party-popper.svg'
      }
    },
    stampSettings: {
      cardTitle: 'บัตรสะสมแต้ม BNC GraphMate',
      cardSubtitle: 'สะสมตราปั๊มครบตามจำนวน รับสิทธิ์ดาวน์โหลดฟอนต์ฟรี หรือของขวัญพิเศษจากทางร้านทันที',
      maxStamps: 10,
      rewardText: 'สะสมครบตามจำนวนแล้ว ทักแชท LINE เพื่อแลกรับของขวัญฟรีได้เลยค่ะ',
      rulesText: 'ทุกออเดอร์งานป้าย ฟอนต์ หรือสินค้าสำเร็จ รับตราปั๊ม 1 ดวงทันที\nสะสมครบกำหนด เลือกรับฟอนต์ลายมือน่ารักฟรี 1 ชุด หรือสิทธิ์รับงานออกแบบฟรี\nติดต่อแลกรางวัลได้ทาง LINE Official ของร้าน',
      mascotIcon: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      stampIconUrl: '',
      rewards: [
        { id: 'rw-1', title: 'ชุดฟอนต์ลายมือน่ารัก 1 ชุด', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400', points: '10 แต้ม' },
        { id: 'rw-2', title: 'ส่วนลดงานออกแบบป้าย 100฿', image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400', points: '10 แต้ม' },
        { id: 'rw-3', title: 'ฟรี! ป้ายเปิด-ปิดร้าน สไตล์มินิมอล', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=400', points: '10 แต้ม' },
        { id: 'rw-4', title: 'แพ็กสติกเกอร์ตกแต่งป้าย 1 เซ็ต', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400', points: '10 แต้ม' }
      ]
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
      portTitle: 'My Gallery',
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
        is_pinned: true,
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
        note: 'กำลังดราฟต์แบบรอบแรก จะส่งให้ตรวจเวลาประมาณ 16:00 น. นะคะ',
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
        note: 'ส่งมอบไฟล์งานผ่าน Google Drive เรียบร้อยแล้ว ขอบคุณมากนะคะ',
        image_url: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=700',
        is_visible: true,
        sort_order: 3,
        created_at: new Date().toISOString()
      }
    ]};

  // ฟังก์ชันแปลงลิงก์ Google Drive ทุกรูปแบบให้เป็น Direct Image URL ที่เบราว์เซอร์แสดงผลได้ 100%
  function formatDriveImageUrl(url) {
    if (!url) return '';
    url = String(url).trim();
    if (url.startsWith('data:')) return url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) return url;
    try {
      const match1 = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
      if (match1 && match1[1]) return 'https://drive.google.com/thumbnail?id=' + match1[1] + '&sz=w1000';
      const match2 = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
      if (match2 && match2[1]) return 'https://drive.google.com/thumbnail?id=' + match2[1] + '&sz=w1000';
      const match3 = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (match3 && match3[1]) return 'https://drive.google.com/thumbnail?id=' + match3[1] + '&sz=w1000';
    } catch (e) {
      console.warn('formatDriveImageUrl error:', e);
    }
    return url;
  }

  // แปลงลิงก์ Google Drive สำหรับไฟล์ฟอนต์ให้ดาวน์โหลดแบบ Direct Stream สำหรับ @font-face
  function formatDriveFontUrl(url) {
    if (!url || typeof url !== 'string') return '';
    const trimmed = url.trim();
    if (trimmed.startsWith('data:')) return trimmed;
    if (!trimmed.includes('drive.google.com') && !trimmed.includes('docs.google.com') && !trimmed.includes('googleusercontent.com')) {
      return trimmed;
    }
    try {
      let fileId = '';
      const match1 = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
      const match2 = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
      const match3 = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (match1 && match1[1]) fileId = match1[1];
      else if (match2 && match2[1]) fileId = match2[1];
      else if (match3 && match3[1]) fileId = match3[1];

      if (fileId) {
        return 'https://drive.google.com/uc?export=download&id=' + fileId;
      }
    } catch (e) {}
    return trimmed;
  }

  // ค้นหาฟอนต์ลายมือภาษาไทยที่ตรงกับหมวดหมู่หรือชื่อฟอนต์
  function getFallbackFont(font) {
    if (!font) return "'Mali', cursive, sans-serif";
    const id = String(font.id || '');
    const name = String(font.name || '').toLowerCase();
    const cat = String(font.category || '');

    if (id === 'font-1' || name.includes('เนย') || name.includes('butter')) {
      return "'Mali', cursive, sans-serif";
    }
    if (id === 'font-2' || name.includes('มาช') || name.includes('marshmallow')) {
      return "'Itim', cursive, sans-serif";
    }
    if (id === 'font-3' || name.includes('ปิกนิก') || name.includes('picnic')) {
      return "'Sriracha', cursive, sans-serif";
    }

    if (cat === 'ตัวพิมพ์' || cat === 'หัวป้าย') return "'Mitr', sans-serif";
    if (cat === 'Display') return "'Mitr', 'Prompt', sans-serif";
    if (cat === 'ลายมือ') return "'Mali', cursive, sans-serif";

    const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const fallbacks = [
      "'Mali', cursive, sans-serif",
      "'Itim', cursive, sans-serif",
      "'Sriracha', cursive, sans-serif",
      "'Mitr', sans-serif"
    ];
    return fallbacks[hash % fallbacks.length];
  }

  function getFontFamily(font) {
    if (!font) return "'Prompt', sans-serif";
    const customUrl = font.font_file_url || font.file_url;
    if (customUrl && String(customUrl).trim()) {
      return "'Font-" + font.id + "', " + getFallbackFont(font);
    }
    return getFallbackFont(font);
  }

  // ── IndexedDB Storage Engine (รองรับไฟล์รูป GIF ดุ๊กดิ๊ก และรูปภาพขนาดใหญ่ได้ไม่จำกัด) ──
  const IDB_NAME = 'BNC_GRAPHMATE_STORE_DB';
  const IDB_STORE_NAME = 'store_data';

  function openIDB() {
    return new Promise((resolve) => {
      if (typeof window === 'undefined' || !window.indexedDB) return resolve(null);
      try {
        const req = window.indexedDB.open(IDB_NAME, 1);
        req.onupgradeneeded = (e) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains(IDB_STORE_NAME)) {
            db.createObjectStore(IDB_STORE_NAME);
          }
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => resolve(null);
      } catch (err) {
        resolve(null);
      }
    });
  }

  async function idbSaveStore(data) {
    try {
      const db = await openIDB();
      if (!db) return;
      const tx = db.transaction(IDB_STORE_NAME, 'readwrite');
      tx.objectStore(IDB_STORE_NAME).put(data, 'main_data');
    } catch (err) {
      console.warn('idbSaveStore error:', err);
    }
  }

  async function idbLoadStore() {
    try {
      const db = await openIDB();
      if (!db) return null;
      return new Promise((resolve) => {
        const tx = db.transaction(IDB_STORE_NAME, 'readonly');
        const req = tx.objectStore(IDB_STORE_NAME).get('main_data');
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => resolve(null);
      });
    } catch (err) {
      return null;
    }
  }

  let _memoryStoreData = null;

  // Hydrate from IndexedDB on startup (loads full GIF animations and images)
  if (typeof window !== 'undefined' && window.indexedDB) {
    idbLoadStore().then(idbData => {
      if (idbData && idbData.settings) {
        _memoryStoreData = idbData;
        if (typeof setupFloatingMascot === 'function') setupFloatingMascot();
      }
    }).catch(() => {});
  }

  // ดึงข้อมูลจาก Local Cache ทันที (เพื่อให้เว็บโหลดเร็ว 0.01 วินาที)
  function loadLocal() {
    if (_memoryStoreData) {
      return _memoryStoreData;
    }
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        const merged = Object.assign({}, defaultData, parsed);
        merged.settings = Object.assign({}, defaultData.settings, parsed.settings || {});

        // Deep merge mascotSettings so mascot2 & mascot3 are never lost
        const defM = defaultData.settings.mascotSettings || {};
        const parM = parsed.settings?.mascotSettings || {};
        merged.settings.mascotSettings = {
          enabled: parM.enabled !== undefined ? parM.enabled : defM.enabled,
          mascot1: Object.assign({}, defM.mascot1 || {}, parM.mascot1 || {}),
          mascot2: Object.assign({}, defM.mascot2 || {}, parM.mascot2 || {}),
          mascot3: Object.assign({}, defM.mascot3 || {}, parM.mascot3 || {})
        };

        if (!merged.settings.stampSettings) merged.settings.stampSettings = defaultData.settings.stampSettings;
        if (!merged.settings.homeBanners || merged.settings.homeBanners.length === 0) merged.settings.homeBanners = defaultData.settings.homeBanners;
        if (!merged.queue_items || merged.queue_items.length === 0) merged.queue_items = defaultData.queue_items;
        if (!merged.settings.queuePage) merged.settings.queuePage = defaultData.settings.queuePage;
        if (!merged.groups) merged.groups = defaultData.groups;
        
        if (merged.settings) {
          if (merged.settings.profileImage) merged.settings.profileImage = formatDriveImageUrl(merged.settings.profileImage);
          if (merged.settings.coverImage) merged.settings.coverImage = formatDriveImageUrl(merged.settings.coverImage);
          if (merged.settings.pointsBarIcon) merged.settings.pointsBarIcon = formatDriveImageUrl(merged.settings.pointsBarIcon);
          if (Array.isArray(merged.settings.homeBanners)) {
            merged.settings.homeBanners.forEach(b => { if (b && b.image) b.image = formatDriveImageUrl(b.image); });
          }
          if (!merged.settings.profileImage) merged.settings.profileImage = defaultData.settings.profileImage;
        }
        if (Array.isArray(merged.products)) {
          merged.products.forEach(p => {
            if (p) {
              if (p.image) p.image = formatDriveImageUrl(p.image);
              if (p.image_url) p.image_url = formatDriveImageUrl(p.image_url);
            }
          });
        }
        if (Array.isArray(merged.fonts)) {
          merged.fonts.forEach(f => {
            if (f) {
              if (f.preview_image) f.preview_image = formatDriveImageUrl(f.preview_image);
              if (f.preview_image_url) f.preview_image_url = formatDriveImageUrl(f.preview_image_url);
              if (f.image_url) f.image_url = formatDriveImageUrl(f.image_url);
            }
          });
        }
        if (Array.isArray(merged.groups)) {
          merged.groups.forEach(g => {
            if (g) {
              if (g.cover_image) g.cover_image = formatDriveImageUrl(g.cover_image);
              if (g.cover_image_url) g.cover_image_url = formatDriveImageUrl(g.cover_image_url);
            }
          });
        }
        if (Array.isArray(merged.portfolio)) {
          merged.portfolio.forEach(item => {
            if (item && item.image_url) item.image_url = formatDriveImageUrl(item.image_url);
          });
        }
        if (Array.isArray(merged.reviews)) {
          merged.reviews.forEach(r => {
            if (r) {
              if (r.image_url) r.image_url = formatDriveImageUrl(r.image_url);
              if (Array.isArray(r.images)) {
                r.images = r.images.map(img => formatDriveImageUrl(img));
              }
            }
          });
        }
        _memoryStoreData = merged;
        return merged;
      }
    } catch (e) {
      console.warn('Load local cache failed', e);
    }
    const fallback = JSON.parse(JSON.stringify(defaultData));
    _memoryStoreData = fallback;
    return fallback;
  }

  function saveLocal(data) {
    _memoryStoreData = data;
    // Always persist full data (including large GIF animations) to IndexedDB
    idbSaveStore(data);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('LocalStorage save failed (likely quota exceeded for large images), falling back to slim cache:', e);
      try {
        const slim = JSON.parse(JSON.stringify(data, (key, value) => {
          if (typeof value === 'string' && value.startsWith('data:') && value.length > 50000) {
            return value.slice(0, 100);
          }
          return value;
        }));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(slim));
      } catch (err2) {
        console.warn('LocalStorage slim save also failed, relying on in-memory and IndexedDB:', err2);
      }
    }
  }

  // ============================================================
  // Supabase Client Initialization (Singleton)
  // ============================================================
  let _supabaseClient = null;

  function getSupabase() {
    if (_supabaseClient) return _supabaseClient;
    const cfgUrl = (typeof SUPABASE_CONFIG !== 'undefined' && SUPABASE_CONFIG.url) ? SUPABASE_CONFIG.url.trim() : '';
    const cfgKey = (typeof SUPABASE_CONFIG !== 'undefined' && SUPABASE_CONFIG.anonKey) ? SUPABASE_CONFIG.anonKey.trim() : '';

    if (cfgUrl && cfgKey && !cfgUrl.includes('YOUR_PROJECT_ID') && window.supabase && window.supabase.createClient) {
      try {
        _supabaseClient = window.supabase.createClient(cfgUrl, cfgKey);
        return _supabaseClient;
      } catch (err) {
        console.warn('Supabase createClient error:', err);
      }
    }
    return null;
  }

  function getCloudUrl() {
    return (typeof SUPABASE_CONFIG !== 'undefined' && SUPABASE_CONFIG.url) ? SUPABASE_CONFIG.url.trim() : '';
  }

  // ============================================================
  // callCloud: ส่งคำสั่ง CRUD ตรงเข้าสู่ Supabase 100%
  // ============================================================
  async function callCloud(action, payload = {}) {
    const sb = getSupabase();
    if (!sb) {
      // Supabase ยังไม่ได้ระบุใน SUPABASE_CONFIG ข้อมูลยังคงใช้งานได้ผ่าน LocalStorage
      return null;
    }

    try {
      switch (action) {
        case 'SAVE_CUSTOMER': {
          const cust = payload.customer || payload.item;
          if (!cust) return null;
          const row = {
            id: String(cust.id),
            name: cust.name || '',
            member_code: cust.member_code || '',
            line_id: cust.line_id || '',
            email: cust.email || '',
            phone: cust.phone || '',
            total_points: Number(cust.total_points) || 0,
            member_level: cust.member_level || 'BRONZE',
            heart_stamps: Number(cust.heart_stamps !== undefined ? cust.heart_stamps : cust.stamps) || 0,
            created_at: cust.created_at || new Date().toISOString()
          };
          const { error } = await sb.from('customers').upsert(row);
          if (error) console.error('Supabase error SAVE_CUSTOMER:', error);
          return { success: !error };
        }

        case 'SAVE_GROUP': {
          const grp = payload.item || payload.group;
          if (!grp) return null;
          const row = {
            id: String(grp.id),
            name: grp.name || '',
            category: grp.category || '',
            description: grp.description || '',
            cover_image: grp.cover_image || grp.cover_image_url || '',
            cover_image_url: grp.cover_image_url || grp.cover_image || '',
            price: Number(grp.price) || 0,
            preview_drive_url: grp.preview_drive_url || '',
            benefits: grp.benefits || '',
            status: grp.status || 'ACTIVE',
            created_at: grp.created_at || new Date().toISOString()
          };
          const { error } = await sb.from('groups').upsert(row);
          if (error) console.error('Supabase error SAVE_GROUP:', error);
          return { success: !error };
        }

        case 'DELETE_GROUP': {
          const { error } = await sb.from('groups').delete().eq('id', String(payload.id));
          if (error) console.error('Supabase error DELETE_GROUP:', error);
          return { success: !error };
        }

        case 'SAVE_PRODUCT': {
          const prod = payload.item || payload.product;
          if (!prod) return null;
          const row = {
            id: String(prod.id),
            name: prod.name || '',
            category: prod.category || '',
            description: prod.description || '',
            price: Number(prod.price) || 0,
            image: prod.image || prod.image_url || '',
            image_url: prod.image_url || prod.image || '',
            delivery_type: prod.delivery_type || 'MANUAL',
            drive_folder_id: prod.drive_folder_id || '',
            drive_file_id: prod.drive_file_id || '',
            status: prod.status || 'ACTIVE',
            what_you_get: prod.what_you_get || '',
            created_at: prod.created_at || new Date().toISOString()
          };
          const { error } = await sb.from('products').upsert(row);
          if (error) console.error('Supabase error SAVE_PRODUCT:', error);
          return { success: !error };
        }

        case 'DELETE_PRODUCT': {
          const { error } = await sb.from('products').delete().eq('id', String(payload.id));
          if (error) console.error('Supabase error DELETE_PRODUCT:', error);
          return { success: !error };
        }

        case 'SAVE_FONT': {
          const font = payload.item || payload.font;
          if (!font) return null;
          const row = {
            id: String(font.id),
            name: font.name || '',
            category: font.category || '',
            description: font.description || '',
            price: Number(font.price) || 0,
            preview_text: font.preview_text || '',
            preview_image: font.preview_image || font.preview_image_url || font.image_url || '',
            preview_image_url: font.preview_image_url || font.preview_image || font.image_url || '',
            image_url: font.image_url || font.preview_image_url || font.preview_image || '',
            font_file_url: font.font_file_url || font.file_url || '',
            delivery_type: font.delivery_type || 'MANUAL',
            drive_folder_id: font.drive_folder_id || '',
            drive_file_id: font.drive_file_id || '',
            status: font.status || 'ACTIVE',
            what_you_get: font.what_you_get || '',
            created_at: font.created_at || new Date().toISOString()
          };
          const { error } = await sb.from('fonts').upsert(row);
          if (error) console.error('Supabase error SAVE_FONT:', error);
          return { success: !error };
        }

        case 'DELETE_FONT': {
          const { error } = await sb.from('fonts').delete().eq('id', String(payload.id));
          if (error) console.error('Supabase error DELETE_FONT:', error);
          return { success: !error };
        }

        case 'CREATE_ORDER':
        case 'MULTI_CHECKOUT': {
          const order = payload.order || payload.orderInfo;
          const payment = payload.payment || payload.paymentInfo;
          const items = payload.items || (order && order.items) || [];
          if (order) {
            const orderRow = {
              id: String(order.id),
              order_number: order.order_number || '',
              customer_id: order.customer_id || 'guest',
              customer_name: order.customer_name || 'ลูกค้าทั่วไป',
              order_type: order.order_type || 'PRODUCT',
              item_id: order.item_id || '',
              item_name: order.item_name || '',
              amount: Number(order.amount) || 0,
              status: order.status || 'VERIFYING',
              line_id: order.line_id || '',
              gmail: order.gmail || '',
              notes: order.notes || '',
              items: items,
              items_json: JSON.stringify(items),
              created_at: order.created_at || new Date().toISOString()
            };
            await sb.from('orders').upsert(orderRow);
          }
          if (payment) {
            const payRow = {
              id: String(payment.id),
              order_id: payment.order_id || (order && order.id) || '',
              amount: Number(payment.amount) || (order && Number(order.amount)) || 0,
              slip_image_url: payment.slip_image_url || '',
              verification_status: payment.verification_status || 'VERIFYING',
              qr_ref: payment.qr_ref || '',
              qr_trans_ref: payment.qr_trans_ref || '',
              qr_date: payment.qr_date || '',
              verified_at: payment.verified_at || null,
              verification_notes: payment.verification_notes || '',
              created_at: payment.created_at || new Date().toISOString()
            };
            await sb.from('payments').upsert(payRow);
          }
          if (Array.isArray(items) && items.length > 0 && order) {
            for (const it of items) {
              if (it.type === 'GROUP') {
                await sb.from('group_access').upsert({
                  id: 'ga-' + uid(),
                  order_id: order.id,
                  customer_id: order.customer_id || 'guest',
                  customer_name: order.customer_name || 'ลูกค้าทั่วไป',
                  group_id: it.id,
                  group_name: it.name,
                  line_id: order.line_id || '',
                  status: 'PENDING',
                  created_at: new Date().toISOString()
                });
              } else {
                const delivery = it.delivery_type || 'MANUAL';
                await sb.from('drive_access').upsert({
                  id: 'da-' + uid(),
                  order_id: order.id,
                  customer_id: order.customer_id || 'guest',
                  customer_name: order.customer_name || 'ลูกค้าทั่วไป',
                  item_id: it.id,
                  item_name: it.name,
                  item_type: it.type || 'PRODUCT',
                  delivery_type: delivery,
                  gmail: order.gmail || '',
                  drive_id: it.drive_folder_id || it.drive_id || '',
                  status: (delivery === 'GOOGLE_DRIVE') ? 'WAITING_VERIFY' : 'WAITING_ADMIN',
                  created_at: new Date().toISOString()
                });
              }
            }
          }
          return { success: true };
        }

        case 'UPDATE_ORDER_STATUS': {
          await sb.from('orders').update({ status: payload.status }).eq('id', String(payload.id));
          return { success: true };
        }

        case 'APPROVE_PAYMENT': {
          const now = new Date().toISOString();
          await sb.from('payments').update({ verification_status: 'PAID', verified_at: now }).eq('id', String(payload.paymentId));
          const data = loadLocal();
          const pay = (data.payments || []).find(p => p.id === payload.paymentId);
          if (pay && pay.order_id) {
            await sb.from('orders').update({ status: 'PAID' }).eq('id', String(pay.order_id));
            await sb.from('drive_access').update({ status: 'COMPLETED', completed_at: now }).eq('order_id', String(pay.order_id));
          }
          return { success: true };
        }

        case 'REJECT_PAYMENT': {
          const now = new Date().toISOString();
          await sb.from('payments').update({ verification_status: 'REJECTED', verified_at: now, verification_notes: payload.reason || '' }).eq('id', String(payload.paymentId));
          const data = loadLocal();
          const pay = (data.payments || []).find(p => p.id === payload.paymentId);
          if (pay && pay.order_id) {
            await sb.from('orders').update({ status: 'REJECTED' }).eq('id', String(pay.order_id));
          }
          return { success: true };
        }

        case 'COMPLETE_GROUP_ACCESS': {
          await sb.from('group_access').update({ status: 'COMPLETED', completed_at: new Date().toISOString() }).eq('id', String(payload.accessId));
          return { success: true };
        }

        case 'FAIL_GROUP_ACCESS': {
          await sb.from('group_access').update({ status: 'FAILED', notes: payload.note || '' }).eq('id', String(payload.accessId));
          return { success: true };
        }

        case 'COMPLETE_DRIVE_ACCESS': {
          await sb.from('drive_access').update({ status: 'COMPLETED', completed_at: new Date().toISOString() }).eq('id', String(payload.accessId));
          return { success: true };
        }

        case 'ADJUST_POINTS': {
          const pt = {
            id: 'pt-' + uid(),
            customer_id: String(payload.customerId),
            amount: Number(payload.amount) || 0,
            type: payload.type || 'ADJUST',
            description: payload.description || 'ปรับคะแนนโดยแอดมิน',
            created_at: new Date().toISOString()
          };
          await sb.from('point_transactions').upsert(pt);
          const data = loadLocal();
          const cust = (data.customers || []).find(c => c.id === payload.customerId);
          if (cust) {
            await sb.from('customers').update({ total_points: cust.total_points, member_level: cust.member_level }).eq('id', String(payload.customerId));
          }
          return { success: true };
        }

        case 'UPDATE_CUSTOMER_STAMPS': {
          const stVal = (payload.stamps !== undefined) ? payload.stamps : payload.heart_stamps;
          await sb.from('customers').update({ heart_stamps: Number(stVal) || 0 }).eq('id', String(payload.customerId));
          return { success: true };
        }

        case 'ADD_REVIEW': {
          const rev = payload.review;
          if (!rev) return null;
          const row = {
            id: String(rev.id),
            customer_id: rev.customer_id || '',
            customer_name: rev.customer_name || 'ลูกค้าทั่วไป',
            order_id: rev.order_id || '',
            product_name: rev.product_name || '',
            rating: Number(rev.rating) || 5,
            message: rev.message || '',
            image_url: rev.image_url || '',
            images: rev.images || [],
            status: rev.status || 'APPROVED',
            is_pinned: !!rev.is_pinned,
            created_at: rev.created_at || new Date().toISOString()
          };
          await sb.from('reviews').upsert(row);
          return { success: true };
        }

        case 'UPDATE_REVIEW_STATUS': {
          await sb.from('reviews').update({ status: payload.status }).eq('id', String(payload.id));
          return { success: true };
        }

        case 'UPDATE_REVIEW_PIN': {
          await sb.from('reviews').update({ is_pinned: !!payload.is_pinned }).eq('id', String(payload.id));
          return { success: true };
        }

        case 'DELETE_REVIEW': {
          await sb.from('reviews').delete().eq('id', String(payload.id));
          return { success: true };
        }

        case 'SAVE_PORTFOLIO': {
          const item = payload.item;
          if (!item) return null;
          const basicRow = {
            id: String(item.id),
            title: item.title || '',
            category: item.category || '',
            style_category: item.style_category || '',
            description: item.description || '',
            image_url: item.image_url || '',
            sort_order: Number(item.sort_order) || 0,
            is_featured: !!item.is_featured,
            created_at: item.created_at || new Date().toISOString()
          };
          const richRow = Object.assign({}, basicRow, {
            price: Number(item.price) || 129,
            images: Array.isArray(item.images) ? item.images : (item.image_url ? [item.image_url] : [])
          });
          let res = await sb.from('portfolio').upsert(richRow);
          if (res && res.error) {
            console.warn('Supabase SAVE_PORTFOLIO rich upsert failed, retrying with base schema:', res.error);
            res = await sb.from('portfolio').upsert(basicRow);
          }
          if (res && res.error) {
            console.error('Supabase SAVE_PORTFOLIO failed:', res.error);
            return { success: false, error: res.error.message };
          }
          return { success: true };
        }

        case 'DELETE_PORTFOLIO': {
          const { error } = await sb.from('portfolio').delete().eq('id', String(payload.id));
          if (error) {
            console.error('Supabase DELETE_PORTFOLIO failed:', error);
            return { success: false, error: error.message };
          }
          return { success: true };
        }

        case 'SAVE_SETTINGS': {
          const s = payload.settings;
          if (!s) return null;
          const row = {
            id: 1,
            shop_name: s.shopName || 'BNC GraphMate Studio',
            tagline: s.tagline || '',
            logo_text: s.logoText || '',
            theme_color: s.themeColor || '#FF6B97',
            contact_phone: s.contactPhone || '',
            contact_line: s.contactLine || '',
            line_url: s.lineUrl || '',
            instagram_url: s.instagramUrl || '',
            facebook_url: s.facebookUrl || '',
            tiktok_url: s.tiktokUrl || '',
            bank_name: s.bankName || '',
            bank_account: s.bankAccount || '',
            bank_account_name: s.bankAccountName || '',
            promptpay_qr_url: s.promptpayQrUrl || '',
            points_per_hundred_baht: Number(s.pointsPerHundredBaht) || 10,
            announcement: s.announcement || '',
            announcement_enabled: !!s.announcementEnabled,
            admin_pin: s.adminPin || '123456',
            btn_line_text: s.btnLineText || '',
            btn_ig_text: s.btnIgText || '',
            btn_fb_text: s.btnFbText || '',
            btn_phone_text: s.btnPhoneText || '',
            btn_cart_text: s.btnCartText || '',
            btn_buy_text: s.btnBuyText || '',
            btn_preview_text: s.btnPreviewText || '',
            btn_checkout_text: s.btnCheckoutText || '',
            cover_image: s.coverImage || '',
            profile_image: s.profileImage || '',
            shop_bio: s.shopBio || '',
            stats: s.stats || {},
            points_bar_icon: s.pointsBarIcon || '',
            mascot_settings: s.mascotSettings || {},
            home_banners: s.homeBanners || [],
            queue_status: s.queueStatus || {},
            queue_page: s.queuePage || {},
            payment_accounts: s.paymentAccounts || [],
            contact_channels: s.contactChannels || [],
            stamp_settings: s.stampSettings || {},
            headings: s.headings || {},
            notebook_notice: s.notebookNotice || '',
            queue_badge_text: s.queueBadgeText || '',
            footer_brand: s.footerBrand || '',
            footer_copy: s.footerCopy || '',
            footer_copyright: s.footerCopyright || '',
            raw_data: s,
            updated_at: new Date().toISOString()
          };
          const { error } = await sb.from('settings').upsert(row);
          if (error) {
            console.error('Supabase error SAVE_SETTINGS:', error);
            return { success: false, error: error.message };
          }
          return { success: true };
        }

        case 'SAVE_QUEUE_ITEM': {
          const q = payload.item;
          if (!q) return null;
          const row = {
            id: String(q.id),
            queue_number: q.queue_number || '',
            customer_name: q.customer_name || '',
            line_id: q.line_id || '',
            phone: q.phone || '',
            job_type: q.job_type || 'ออกแบบป้าย',
            job_name: q.job_name || '',
            description: q.description || '',
            status: q.status || 'รอคิว',
            progress: Number(q.progress) || 0,
            current_queue: Number(q.current_queue) || 1,
            total_queue: Number(q.total_queue) || 1,
            queue_date: q.queue_date || '',
            updated_at: q.updated_at || '',
            note: q.note || '',
            image_url: q.image_url || '',
            is_pinned: !!q.is_pinned,
            is_visible: q.is_visible !== false,
            sort_order: Number(q.sort_order) || 0,
            created_at: q.created_at || new Date().toISOString()
          };
          await sb.from('queue_items').upsert(row);
          return { success: true };
        }

        case 'DELETE_QUEUE_ITEM': {
          await sb.from('queue_items').delete().eq('id', String(payload.id));
          return { success: true };
        }

        case 'REORDER_QUEUES': {
          const items = payload.items || [];
          for (let idx = 0; idx < items.length; idx++) {
            if (items[idx] && items[idx].id) {
              await sb.from('queue_items').update({ sort_order: idx }).eq('id', String(items[idx].id));
            }
          }
          return { success: true };
        }

        case 'SAVE_CALENDAR_TASK': {
          const task = payload.task;
          if (!task) return null;
          const row = {
            id: String(task.id),
            date: task.date || '',
            title: task.title || '',
            type: task.type || '',
            status: task.status || '',
            completed: !!task.completed,
            queue_id: task.queue_id || '',
            created_at: task.created_at || new Date().toISOString()
          };
          await sb.from('calendar_tasks').upsert(row);
          return { success: true };
        }

        case 'DELETE_CALENDAR_TASK': {
          await sb.from('calendar_tasks').delete().eq('id', String(payload.id));
          return { success: true };
        }

        case 'SYNC_ALL': {
          const p = payload.payload;
          if (!p) return null;
          if (p.settings) await callCloud('SAVE_SETTINGS', { settings: p.settings });
          const tables = [
            { key: 'groups', action: 'SAVE_GROUP' },
            { key: 'products', action: 'SAVE_PRODUCT' },
            { key: 'fonts', action: 'SAVE_FONT' },
            { key: 'customers', action: 'SAVE_CUSTOMER' },
            { key: 'portfolio', action: 'SAVE_PORTFOLIO' },
            { key: 'queue_items', action: 'SAVE_QUEUE_ITEM' },
            { key: 'reviews', action: 'ADD_REVIEW' },
            { key: 'calendar_tasks', action: 'SAVE_CALENDAR_TASK' }
          ];
          for (const tbl of tables) {
            const list = p[tbl.key];
            if (Array.isArray(list) && list.length > 0) {
              for (const item of list) {
                await callCloud(tbl.action, { item: item, [tbl.key.slice(0, -1)]: item });
              }
            }
          }
          return { success: true };
        }

        default:
          console.warn('Unknown Supabase cloud action:', action);
          return null;
      }
    } catch (err) {
      console.error('callCloud Supabase error:', err);
      return null;
    }
  }

  // ============================================================
  // syncFromCloud: ซิงก์ข้อมูลทั้งหมดจาก Supabase ลง Local Cache
  // ============================================================
  async function syncFromCloud(onUpdatedCallback) {
    const sb = getSupabase();
    if (!sb) {
      if (typeof onUpdatedCallback === 'function') {
        onUpdatedCallback(false, 'ยังไม่ได้กำหนดค่า Supabase (SUPABASE_CONFIG) ใน app.js');
      }
      return false;
    }

    try {
      const [
        resSettings,
        resProducts,
        resFonts,
        resGroups,
        resPortfolio,
        resReviews,
        resQueue,
        resCustomers,
        resOrders,
        resPayments,
        resGroupAccess,
        resDriveAccess,
        resPointTransactions,
        resCalendarTasks
      ] = await Promise.all([
        sb.from('settings').select('*').limit(1),
        sb.from('products').select('*'),
        sb.from('fonts').select('*'),
        sb.from('groups').select('*'),
        sb.from('portfolio').select('*').order('sort_order', { ascending: true }),
        sb.from('reviews').select('*').order('created_at', { ascending: false }),
        sb.from('queue_items').select('*').order('sort_order', { ascending: true }),
        sb.from('customers').select('*'),
        sb.from('orders').select('*').order('created_at', { ascending: false }),
        sb.from('payments').select('*'),
        sb.from('group_access').select('*'),
        sb.from('drive_access').select('*'),
        sb.from('point_transactions').select('*'),
        sb.from('calendar_tasks').select('*')
      ]);

      const local = loadLocal();
      const merged = Object.assign({}, local);

      // Safe merge settings
      if (resSettings.data && resSettings.data.length > 0) {
        const sRow = resSettings.data[0];
        const sObj = sRow.raw_data || {};
        merged.settings = Object.assign({}, local.settings || {}, sObj, {
          shopName: sRow.shop_name || sObj.shopName || local.settings.shopName,
          tagline: sRow.tagline || sObj.tagline || local.settings.tagline,
          logoText: sRow.logo_text || sObj.logoText || local.settings.logoText,
          themeColor: sRow.theme_color || sObj.themeColor || local.settings.themeColor,
          contactPhone: sRow.contact_phone || sObj.contactPhone || local.settings.contactPhone,
          contactLine: sRow.contact_line || sObj.contactLine || local.settings.contactLine,
          lineUrl: sRow.line_url || sObj.lineUrl || local.settings.lineUrl,
          bankName: sRow.bank_name || sObj.bankName || local.settings.bankName,
          bankAccount: sRow.bank_account || sObj.bankAccount || local.settings.bankAccount,
          bankAccountName: sRow.bank_account_name || sObj.bankAccountName || local.settings.bankAccountName,
          promptpayQrUrl: sRow.promptpay_qr_url || sObj.promptpayQrUrl || local.settings.promptpayQrUrl,
          pointsPerHundredBaht: sRow.points_per_hundred_baht || sObj.pointsPerHundredBaht || local.settings.pointsPerHundredBaht,
          adminPin: sRow.admin_pin || sObj.adminPin || local.settings.adminPin || '123456',
          stats: sRow.stats || sObj.stats || local.settings.stats,
          mascotSettings: (() => {
            const cloudM = sRow.mascot_settings || sObj.mascotSettings || {};
            const locM = (local.settings && local.settings.mascotSettings) ? local.settings.mascotSettings : {};
            const defM = defaultData.settings.mascotSettings || {};
            return {
              enabled: cloudM.enabled !== undefined ? cloudM.enabled : (locM.enabled !== undefined ? locM.enabled : defM.enabled),
              mascot1: Object.assign({}, defM.mascot1 || {}, locM.mascot1 || {}, cloudM.mascot1 || {}),
              mascot2: Object.assign({}, defM.mascot2 || {}, locM.mascot2 || {}, cloudM.mascot2 || {}),
              mascot3: Object.assign({}, defM.mascot3 || {}, locM.mascot3 || {}, cloudM.mascot3 || {})
            };
          })(),
          homeBanners: sRow.home_banners || sObj.homeBanners || local.settings.homeBanners,
          queueStatus: sRow.queue_status || sObj.queueStatus || local.settings.queueStatus,
          queuePage: sRow.queue_page || sObj.queuePage || local.settings.queuePage,
          paymentAccounts: sRow.payment_accounts || sObj.paymentAccounts || local.settings.paymentAccounts,
          contactChannels: sRow.contact_channels || sObj.contactChannels || local.settings.contactChannels,
          stampSettings: sRow.stamp_settings || sObj.stampSettings || local.settings.stampSettings,
          headings: sRow.headings || sObj.headings || local.settings.headings,
          footerBrand: sRow.footer_brand || sObj.footerBrand || local.settings.footerBrand,
          footerCopy: sRow.footer_copy || sObj.footerCopy || local.settings.footerCopy,
          footerCopyright: sRow.footer_copyright || sObj.footerCopyright || local.settings.footerCopyright,
          portfolioContactUrl: sObj.portfolioContactUrl || local.settings.portfolioContactUrl || '',
          homeReviewIds: sObj.homeReviewIds || local.settings.homeReviewIds || ['rev-1']
        });
      }

      // Arrays
      if (Array.isArray(resProducts.data) && resProducts.data.length > 0) merged.products = resProducts.data;
      if (Array.isArray(resFonts.data) && resFonts.data.length > 0) merged.fonts = resFonts.data;
      if (Array.isArray(resGroups.data) && resGroups.data.length > 0) merged.groups = resGroups.data;
      if (Array.isArray(resPortfolio.data) && resPortfolio.data.length > 0) {
        merged.portfolio = resPortfolio.data.map(cloudItem => {
          const localItem = (local.portfolio || []).find(p => p && p.id === cloudItem.id);
          return Object.assign({}, localItem || {}, cloudItem, {
            price: cloudItem.price !== undefined ? cloudItem.price : (localItem?.price || 129),
            images: Array.isArray(cloudItem.images) && cloudItem.images.length > 0 ? cloudItem.images : (localItem?.images || (cloudItem.image_url ? [cloudItem.image_url] : []))
          });
        });
      }
      if (Array.isArray(resReviews.data) && resReviews.data.length > 0) merged.reviews = resReviews.data;
      if (Array.isArray(resQueue.data) && resQueue.data.length > 0) merged.queue_items = resQueue.data;
      if (Array.isArray(resCustomers.data) && resCustomers.data.length > 0) merged.customers = resCustomers.data;
      if (Array.isArray(resGroupAccess.data) && resGroupAccess.data.length > 0) merged.group_access = resGroupAccess.data;
      if (Array.isArray(resDriveAccess.data) && resDriveAccess.data.length > 0) merged.drive_access = resDriveAccess.data;
      if (Array.isArray(resPointTransactions.data) && resPointTransactions.data.length > 0) merged.point_transactions = resPointTransactions.data;
      if (Array.isArray(resCalendarTasks.data) && resCalendarTasks.data.length > 0) merged.calendar_tasks = resCalendarTasks.data;

      // Merge orders/payments: keep local records that cloud doesn't have yet
      if (Array.isArray(resOrders.data) && resOrders.data.length > 0) {
        const incomingIds = new Set(resOrders.data.map(x => x && x.id).filter(Boolean));
        const localOnly = Array.isArray(local.orders) ? local.orders.filter(x => x && x.id && !incomingIds.has(x.id)) : [];
        merged.orders = [...localOnly, ...resOrders.data];
      }
      if (Array.isArray(resPayments.data) && resPayments.data.length > 0) {
        const incomingIds = new Set(resPayments.data.map(x => x && x.id).filter(Boolean));
        const localOnly = Array.isArray(local.payments) ? local.payments.filter(x => x && x.id && !incomingIds.has(x.id)) : [];
        merged.payments = [...localOnly, ...resPayments.data];
      }

      // Direct image formatting
      if (Array.isArray(merged.products)) {
        merged.products.forEach(p => {
          if (p) {
            if (p.image) p.image = formatDriveImageUrl(p.image);
            if (p.image_url) p.image_url = formatDriveImageUrl(p.image_url);
          }
        });
      }
      if (Array.isArray(merged.fonts)) {
        merged.fonts.forEach(f => {
          if (f) {
            if (f.preview_image) f.preview_image = formatDriveImageUrl(f.preview_image);
            if (f.preview_image_url) f.preview_image_url = formatDriveImageUrl(f.preview_image_url);
            if (f.image_url) f.image_url = formatDriveImageUrl(f.image_url);
          }
        });
      }
      if (Array.isArray(merged.groups)) {
        merged.groups.forEach(g => {
          if (g) {
            if (g.cover_image) g.cover_image = formatDriveImageUrl(g.cover_image);
            if (g.cover_image_url) g.cover_image_url = formatDriveImageUrl(g.cover_image_url);
          }
        });
      }
      if (Array.isArray(merged.portfolio)) {
        merged.portfolio.forEach(item => {
          if (item && item.image_url) item.image_url = formatDriveImageUrl(item.image_url);
        });
      }
      if (Array.isArray(merged.reviews)) {
        merged.reviews.forEach(r => {
          if (r) {
            if (r.image_url) r.image_url = formatDriveImageUrl(r.image_url);
            if (Array.isArray(r.images)) {
              r.images = r.images.map(img => formatDriveImageUrl(img));
            }
          }
        });
      }

      saveLocal(merged);

      // หากฐานข้อมูล Supabase ยังว่างอยู่ ให้นำเข้าข้อมูลเริ่มต้นทันทีอัตโนมัติ
      if ((!resProducts.data || resProducts.data.length === 0) && merged.products && merged.products.length > 0) {
        console.log('Seeding initial data into Supabase Cloud...');
        callCloud('SYNC_ALL', { payload: merged });
      }

      if (typeof onUpdatedCallback === 'function') {
        onUpdatedCallback(true, merged);
      }
      return true;
    } catch (err) {
      console.warn('Supabase sync error:', err);
      if (typeof onUpdatedCallback === 'function') {
        onUpdatedCallback(false, err.message);
      }
      return false;
    }
  }

  // ============================================================
  // Supabase Realtime Listener
  // ============================================================
  let _realtimeSubscribed = false;
  function initRealtimeSync() {
    const sb = getSupabase();
    if (!sb || _realtimeSubscribed) return;
    try {
      sb.channel('bnc_store_realtime')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'queue_items' }, () => {
          syncFromCloud(() => {
            if (typeof state !== 'undefined' && (state.view === 'queue' || state.view === 'admin')) {
              renderCurrentView();
            }
          });
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
          syncFromCloud(() => {
            if (typeof state !== 'undefined' && (state.view === 'orders' || state.view === 'admin')) {
              renderCurrentView();
            }
          });
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'payments' }, () => {
          syncFromCloud(() => {
            if (typeof state !== 'undefined' && (state.view === 'orders' || state.view === 'admin')) {
              renderCurrentView();
            }
          });
        })
        .subscribe();
      _realtimeSubscribed = true;
    } catch (e) {
      console.warn('Realtime subscription warning:', e);
    }
  }

  // Helper ID
  function uid(prefix = 'id') {
    return prefix + '-' + Math.random().toString(36).substr(2, 9);
  }

  function orderNum() {
    return 'BNC-' + Math.floor(100000 + Math.random() * 900000);
  }

  return {
    STORAGE_KEY: STORAGE_KEY,
    defaultData: defaultData,
    formatDriveImageUrl: formatDriveImageUrl,
    formatDriveFontUrl: formatDriveFontUrl,
    getFallbackFont: getFallbackFont,
    getFontFamily: getFontFamily,
    loadLocal: loadLocal,
    saveLocal: saveLocal,
    getSupabase: getSupabase,
    getCloudUrl: getCloudUrl,
    syncFromCloud: syncFromCloud,
    callCloud: callCloud,
    syncAllToCloud: function () { return callCloud('SYNC_ALL', { payload: loadLocal() }); },
    initRealtimeSync: initRealtimeSync,
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
 deleteCustomer: function (id) {
 const data = loadLocal();
 data.customers = (data.customers || []).filter(c => c.id !== id);
 saveLocal(data);
 callCloud('DELETE_CUSTOMER', { id: id });
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
    const list = (p && p.length > 0) ? p : defaultData.portfolio;
    return list.map(item => {
      if (!item.price || Number(item.price) <= 0) {
        item.price = item.category === 'ฟอนต์' ? 149 : (item.category === 'การ์ตูน' ? 179 : 129);
      }
      return item;
    });
  },
  savePortfolioItem: async function (item) {
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
    const cloudRes = await callCloud('SAVE_PORTFOLIO', { item: item });
    return { item, cloudRes };
  },
  deletePortfolioItem: async function (id) {
    const data = loadLocal();
    data.portfolio = (data.portfolio || []).filter(p => p.id !== id);
    saveLocal(data);
    const cloudRes = await callCloud('DELETE_PORTFOLIO', { id: id });
    return { success: true, cloudRes };
  },

  // Portfolio like counts (real counts stored per item, start at 0)
  getPortfolioLikes: function (itemId) {
    const data = loadLocal();
    const likeCounts = data.portfolioLikeCounts || {};
    return Number(likeCounts[itemId] || 0);
  },
  addPortfolioLike: function (itemId, delta) {
    const data = loadLocal();
    data.portfolioLikeCounts = data.portfolioLikeCounts || {};
    const current = Number(data.portfolioLikeCounts[itemId] || 0);
    data.portfolioLikeCounts[itemId] = Math.max(0, current + delta);
    saveLocal(data);
  },

  // Pricing table for mini price display in gallery
  getPricingTable: function () {
    const data = loadLocal();
    if (Array.isArray(data.pricingTable) && data.pricingTable.length > 0) return data.pricingTable;
    const s = this.getSettings();
    if (Array.isArray(s.pricingTable) && s.pricingTable.length > 0) return s.pricingTable;
    return [
      { label: 'ป้ายเครดิต', price: 129 },
      { label: 'ป้ายแอพพรี', price: 149 },
      { label: 'ป้ายเติมเกม', price: 149 },
      { label: 'ป้ายโปรโมชั่น', price: 169 },
      { label: 'ป้ายเปิดร้าน', price: 189 },
      { label: 'งานสั่งทำพิเศษ', price: 199 }
    ];
  },
  savePricingTable: async function (rows) {
    const data = loadLocal();
    data.pricingTable = rows;
    if (!data.settings) data.settings = {};
    data.settings.pricingTable = rows;
    saveLocal(data);
    const cloudRes = await callCloud('SAVE_SETTINGS', { settings: Object.assign({}, data.settings, { pricingTable: rows }) });
    return cloudRes;
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
        items_json: items,
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

      // Cloud Google Sheet Sync (ensure slip string is within bounds)
      const cloudPayment = Object.assign({}, newPayment);
      if (cloudPayment.slip_image_url && cloudPayment.slip_image_url.length > 45000) {
        cloudPayment.slip_image_url = cloudPayment.slip_image_url.slice(0, 45000);
      }

      callCloud('MULTI_CHECKOUT', {
        order: newOrder,
        payment: cloudPayment,
        items: items
      }).then(res => {
        console.log('Google Sheets MULTI_CHECKOUT response:', res);
      }).catch(err => {
        console.warn('Google Sheets MULTI_CHECKOUT sync error:', err);
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
  toggleHomeReview: function (id) {
    const s = this.getSettings() || {};
    let ids = Array.isArray(s.homeReviewIds) ? [...s.homeReviewIds] : ['rev-1'];
    if (ids.includes(id)) {
      ids = ids.filter(x => x !== id);
    } else {
      ids.push(id);
    }
    return this.saveSettings({ homeReviewIds: ids });
  },

  getStampSettings: function () {
    const s = this.getSettings();
    return (s && s.stampSettings) ? s.stampSettings : (defaultData.settings.stampSettings || {});
  },
  getOrder: function (id) {
    return this.getOrderById(id);
  },
  updateOrderStatus: function (orderId, status) {
    const data = loadLocal();
    const order = (data.orders || []).find(o => o.id === orderId || o.order_number === orderId);
    if (order) {
      order.status = status;
      saveLocal(data);
      callCloud('UPDATE_ORDER_STATUS', { id: order.id, status: status });
    }
  },
  getPortfolioCategories: function () {
    const cats = this.getSettings().categories?.portfolio;
    if (Array.isArray(cats)) return cats;
    if (typeof cats === 'string') return cats.split(',').map(s => s.trim()).filter(Boolean);
    return ['ป้ายเครดิต', 'ป้ายแอพพรี', 'ป้ายเติมเกม', 'ป้ายเปิดร้าน', 'ป้ายโปรโมชั่น', 'งานป้ายสั่งทำพิเศษ'];
  },
  getPortfolioStyles: function () {
    const cats = this.getSettings().categories?.portfolioStyles;
    if (Array.isArray(cats)) return cats;
    if (typeof cats === 'string') return cats.split(',').map(s => s.trim()).filter(Boolean);
    return ['สไตล์มินิมอล & คาเฟ่', 'สไตล์การ์ตูน & คาวาอี้', 'สไตล์ลายมือ & ฟอนต์', 'สไตล์ร้านค้า & โมเดิร์น', 'ไฟล์ตกแต่ง & เทมเพลต'];
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
    saveSettings: async function (newSettings) {
      const data = loadLocal();
      data.settings = Object.assign({}, data.settings, newSettings);
      saveLocal(data);
      const cloudRes = await callCloud('SAVE_SETTINGS', { settings: data.settings });
      return { settings: data.settings, cloudRes };
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

    // ── Calendar Tasks System ──
    getCalendarTasks: function () {
      return loadLocal().calendar_tasks || [];
    },
    saveCalendarTask: function (task) {
      const data = loadLocal();
      data.calendar_tasks = data.calendar_tasks || [];
      if (!task.id) {
        task.id = uid('ct');
        task.created_at = new Date().toISOString();
        data.calendar_tasks.push(task);
      } else {
        const idx = data.calendar_tasks.findIndex(t => t.id === task.id);
        if (idx !== -1) data.calendar_tasks[idx] = Object.assign({}, data.calendar_tasks[idx], task);
        else data.calendar_tasks.push(task);
      }
      saveLocal(data);
      callCloud('SAVE_CALENDAR_TASK', { task: task });
      return task;
    },
    deleteCalendarTask: function (id) {
      const data = loadLocal();
      data.calendar_tasks = (data.calendar_tasks || []).filter(t => t.id !== id);
      saveLocal(data);
      callCloud('DELETE_CALENDAR_TASK', { id: id });
    },
    toggleCalendarTask: function (id) {
      const data = loadLocal();
      data.calendar_tasks = data.calendar_tasks || [];
      const t = data.calendar_tasks.find(x => x.id === id);
      if (t) {
        t.completed = !t.completed;
        saveLocal(data);
        callCloud('SAVE_CALENDAR_TASK', { task: t });
      }
    },
    getFontCategories: function () {
      const cats = this.getSettings().categories?.fonts;
      if (Array.isArray(cats)) return cats;
      if (typeof cats === 'string') return cats.split(',').map(s => s.trim()).filter(Boolean);
      return ['ลายมือ', 'หัวป้าย', 'ตัวพิมพ์', 'น่ารัก'];
    },
    getProductCategories: function () {
      const cats = this.getSettings().categories?.products;
      if (Array.isArray(cats)) return cats;
      if (typeof cats === 'string') return cats.split(',').map(s => s.trim()).filter(Boolean);
      return ['ป้ายสำเร็จ', 'ไฟล์ตกแต่ง', 'การ์ตูน', 'องค์ประกอบ', 'เทมเพลต'];
    },
    getGroupCategories: function () {
      const cats = this.getSettings().categories?.groups;
      if (Array.isArray(cats)) return cats;
      if (typeof cats === 'string') return cats.split(',').map(s => s.trim()).filter(Boolean);
      return ['VIP ตลอดชีพ', 'รวมงานกราฟิก', 'การ์ตูน & คาแรกเตอร์', 'ป้ายร้าน & เมนู'];
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
    syncAllToCloud: async function () {
      const data = loadLocal();
      return await callCloud('SYNC_ALL', { payload: data });
    }
  };
})();

window.Store = Store;


// Helper: Get Queue Mascot Image based on percentage
function getQueueMascotForProgress(pct, qSettings) {
  const p = Math.min(100, Math.max(0, Number(pct) || 0));
  const stages = (qSettings && qSettings.mascotStages) ? qSettings.mascotStages : {
    pct0: 'https://api.iconify.design/fluent-emoji-flat:cat-face.svg',
    pct25: 'https://api.iconify.design/fluent-emoji-flat:rabbit.svg',
    pct50: 'https://api.iconify.design/fluent-emoji-flat:bear.svg',
    pct75: 'https://api.iconify.design/fluent-emoji-flat:panda.svg',
    pct100: 'https://api.iconify.design/fluent-emoji-flat:party-popper.svg'
  };

  if (p >= 100) return stages.pct100 || stages.pct75;
  if (p >= 75) return stages.pct75 || stages.pct50;
  if (p >= 50) return stages.pct50 || stages.pct25;
  if (p >= 25) return stages.pct25 || stages.pct0;
  return stages.pct0 || 'https://api.iconify.design/fluent-emoji-flat:cat-face.svg';
}
window.getQueueMascotForProgress = getQueueMascotForProgress;

/**
 * BNC GraphMate — Unified Application Controller (SPA Architecture)
 * Inspired by BNC HayMate's clean, reliable, single-file architecture
 * 100% Configurable, Zero Fake Buttons, Zero 404s on Vercel
 */

(function () {
  'use strict';

  const formatDriveFontUrl = window.formatDriveFontUrl || function(u) { return u; };
  const getFallbackFont = window.getFallbackFont || function() { return "'Prompt', sans-serif"; };
  const getFontFamily = window.getFontFamily || function() { return "'Prompt', sans-serif"; };
  const getQueueMascotForProgress = window.getQueueMascotForProgress;

  // Application State
  const state = {
 view: 'home', // 'home' | 'fonts' | 'products' | 'groups' | 'portfolio' | 'points' | 'reviews' | 'orders' | 'admin'
 adminTab: 'dashboard', // 'dashboard' | 'orders' | 'slips' | 'products' | 'fonts' | 'groups' | 'settings'
 isAdmin: (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('bnc_admin_auth') === 'true'),
    adminUser: (typeof localStorage !== 'undefined' && localStorage.getItem('bnc_tenant_session')) ? JSON.parse(localStorage.getItem('bnc_tenant_session')) : null,
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
 portfolioAccordions: { gallerySettings: false, portfolioItems: true, pricingTable: false },
 queueAccordions: { queueSettings: false, queueList: true },
    stampAccordions: { stampSettings: false, customerList: true },
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

  const formatDriveImageUrl = url => {
    if (!url || typeof url !== 'string') return '';
    const trimmed = url.trim();
    if (!trimmed.includes('drive.google.com') && !trimmed.includes('docs.google.com')) {
      return trimmed;
    }
    let fileId = '';
    const match1 = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    const match2 = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    const match3 = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match1 && match1[1]) fileId = match1[1];
    else if (match2 && match2[1]) fileId = match2[1];
    else if (match3 && match3[1]) fileId = match3[1];

    if (fileId) {
      return `https://lh3.googleusercontent.com/d/${fileId}`;
    }
    return trimmed;
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

  // ── Sweet Ascending Musical Stamp Pop Sound (Web Audio Synthesizer) ──
  function playCuteStampPopSound(step = 0) {
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

      // Pentatonic sweet scale progression for consecutive stamps (C5, D5, E5, G5, A5, C6...)
      const scale = [523.25, 587.33, 659.25, 783.99, 880.00, 987.77, 1046.50, 1174.66, 1318.51, 1567.98];
      const baseFreq = scale[step % scale.length] || 523.25;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(baseFreq * 0.85, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.25, now + 0.04);
      osc.frequency.exponentialRampToValueAtTime(baseFreq, now + 0.12);

      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.16);
    } catch (err) {
      // Audio fallback
    }
  }

  // Universal alias so any mascot / popup caller works
  window.playCuteClickSound = playCuteClickSound;
  window.playCuteStampPopSound = playCuteStampPopSound;
  window.playPopSound = playCuteStampPopSound;

  // Global listener for interactive sound
  document.addEventListener('click', (e) => {
    if (e.target.closest('button, .btn, .nav-link, .nav-circle-btn, .brand-link, .price-menu-item, .stamp-slot, .compact-card-item, .hero-carousel-prev, .hero-carousel-next, .hero-carousel-dot, .calc-key')) {
      playCuteClickSound();
    }
  }, true);

  function loadFontFaces() {
    const fonts = Store.getAllFonts ? Store.getAllFonts() : [];
    let css = '';
    fonts.forEach(f => {
      const rawUrl = f.font_file_url || f.file_url;
      if (rawUrl && rawUrl.trim()) {
        const fontUrl = formatDriveFontUrl(rawUrl);
        let formatStr = '';
        if (fontUrl.startsWith('data:font/ttf') || fontUrl.startsWith('data:application/x-font-ttf') || fontUrl.endsWith('.ttf')) {
          formatStr = " format('truetype')";
        } else if (fontUrl.startsWith('data:font/otf') || fontUrl.startsWith('data:application/x-font-opentype') || fontUrl.endsWith('.otf')) {
          formatStr = " format('opentype')";
        } else if (fontUrl.startsWith('data:font/woff2') || fontUrl.endsWith('.woff2')) {
          formatStr = " format('woff2')";
        } else if (fontUrl.startsWith('data:font/woff') || fontUrl.endsWith('.woff')) {
          formatStr = " format('woff')";
        }
        css += `
          @font-face {
            font-family: 'Font-${f.id}';
            src: url('${fontUrl}')${formatStr};
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

  function updateFooterDisplay() {
    try {
      const s = Store.getSettings();
      const brandEl = document.querySelector('.footer-brand');
      const copyEl = document.querySelector('.footer-copy');
      const crEl = document.querySelector('.footer-copyright');
      if (brandEl) brandEl.textContent = s.footerBrand || s.shopName || 'BNC GraphMate Studio';
      if (copyEl) copyEl.textContent = s.footerCopy || 'สตูดิโอออกแบบป้ายร้าน งานฟอนต์ลายมือ สติกเกอร์ และทรัพยากรกราฟิกสำเร็จรูป สไตล์คิวท์ น่ารัก มินิมอล';
      if (crEl) crEl.textContent = s.footerCopyright || '© 2026 BNC GraphMate. All Rights Reserved. Powered by Cloud Sync & Vercel.';
    } catch (e) {
      console.warn('updateFooterDisplay error:', e);
    }
  }

  function initApp() {
    loadFontFaces();
    setupRouting();
    setupCartDrawer();
    setupModals();
    renderNavbar();
    setupFloatingMascot();
    updateFooterDisplay();
    renderCurrentView();

    // Listen to store updates (sync from Google Sheets)
    window.addEventListener('storage', () => {
      renderCurrentView();
      updateCartBadge();
      updateFooterDisplay();
    });

    // Initial background sync from Google Sheets if configured
    if (typeof Store !== 'undefined' && Store.syncFromCloud) {
      Store.syncFromCloud((isOk) => {
        if (isOk) {
          renderNavbar();
          setupFloatingMascot();
          updateFooterDisplay();
          renderCurrentView();
        }
      });
      if (Store.initRealtimeSync) {
        Store.initRealtimeSync();
      }

      // Auto-restore Supabase Auth session for Tenant / Admin
      if (Store.getSupabase) {
        const sb = Store.getSupabase();
        if (sb && sb.auth) {
          sb.auth.getSession().then(({ data }) => {
            if (data && data.session && data.session.user) {
              const u = data.session.user;
              state.isAdmin = true;
              state.adminUser = {
                id: u.id,
                email: u.email,
                shop_name: u.user_metadata?.shop_name || 'BNC GraphMate Studio',
                tenant_id: u.user_metadata?.tenant_id || u.id,
                role: u.user_metadata?.role || 'admin'
              };
              if (typeof sessionStorage !== 'undefined') sessionStorage.setItem('bnc_admin_auth', 'true');
              if (typeof localStorage !== 'undefined') localStorage.setItem('bnc_tenant_session', JSON.stringify(state.adminUser));
              renderNavbar();
            }
          }).catch(() => {});
        }
      }
    }
  }

 // ── Router Setup (Hash Navigation) ───────────────────────────
 
  window.playMascotPop = function () {
    if (typeof playPopSound === 'function') playPopSound();
  };

  function setupFloatingMascot() {
    let container = document.getElementById('fallingMascotsContainer');
    const settings = Store.getSettings ? Store.getSettings() : {};
    const mascotCfg = settings.mascotSettings || {
      enabled: true,
      mascot1: { name: 'น้องกระต่ายพาสเทล', png: 'https://api.iconify.design/fluent-emoji-flat:rabbit.svg', quote: 'หวัดดีฮับ!' },
      mascot2: { name: 'น้องหมีสตูดิโอ', png: 'https://api.iconify.design/fluent-emoji-flat:bear.svg', quote: 'แวะดูฟอนต์ได้น้า' },
      mascot3: { name: 'น้องแมวโมจิ', png: 'https://api.iconify.design/fluent-emoji-flat:cat-face.svg', quote: 'เหมียววว~ จับได้ด้วย!' }
    };

    // If disabled by admin, remove container if present and return
    if (mascotCfg.enabled === false) {
      if (container) container.remove();
      return;
    }

    if (container) {
      container.innerHTML = '';
    } else {
      container = document.createElement('div');
      container.id = 'fallingMascotsContainer';
      container.className = 'falling-mascot-container';
      document.body.appendChild(container);
    }

    // Cute pastel characters (supports GIF, PNG, SVG)
    const m1 = mascotCfg.mascot1 || {};
    const m2 = mascotCfg.mascot2 || {};
    const m3 = mascotCfg.mascot3 || {};

    const mascotConfigs = [
      {
        id: 'mascot-1',
        name: m1.name || 'น้องกระต่ายพาสเทล',
        png: formatDriveImageUrl(m1.png) || m1.png || 'https://api.iconify.design/fluent-emoji-flat:rabbit.svg',
        fallbackPng: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f430.png',
        quotes: [m1.quote || 'หวัดดีฮับ!']
      },
      {
        id: 'mascot-2',
        name: m2.name || 'น้องหมีสตูดิโอ',
        png: formatDriveImageUrl(m2.png) || m2.png || 'https://api.iconify.design/fluent-emoji-flat:bear.svg',
        fallbackPng: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f43b.png',
        quotes: [m2.quote || 'แวะดูฟอนต์ได้น้า']
      },
      {
        id: 'mascot-3',
        name: m3.name || 'น้องแมวโมจิ',
        png: formatDriveImageUrl(m3.png) || m3.png || 'https://api.iconify.design/fluent-emoji-flat:cat-face.svg',
        fallbackPng: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f431.png',
        quotes: [m3.quote || 'เหมียววว~ จับได้ด้วย!']
      }
    ];

    // Exactly 1 floating mascot element on screen
    let currentIdx = 0;
    let clickCount = 0;
    const el = document.createElement('div');
    el.id = 'singleFloatingMascot';
    el.className = 'falling-mascot-item';
    el.style.userSelect = 'none';
    el.style.webkitUserSelect = 'none';

    const img = document.createElement('img');
    img.className = 'falling-mascot-img';
    img.alt = mascotConfigs[0].name;
    img.src = mascotConfigs[0].png;
    img.setAttribute('draggable', 'false');
    img.style.userSelect = 'none';
    img.onerror = () => {
      const cur = mascotConfigs[currentIdx];
      if (cur && cur.fallbackPng && img.src !== cur.fallbackPng && !img.src.startsWith('data:')) {
        img.src = cur.fallbackPng;
      }
    };

    el.appendChild(img);
    container.appendChild(el);

    // Initial position & physics state
    let posX = Math.max(30, (window.innerWidth * 0.75) - 40);
    let posY = 120;
    let isDragging = false;
    let hasMoved = false;
    let pointerStartTime = 0;
    let startMouseX = 0;
    let startMouseY = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let origPosX = 0;
    let origPosY = 0;
    let tick = Math.random() * 100;
    let bubbleTimeout = null;

    el.style.left = `${posX}px`;
    el.style.top = `${posY}px`;

    // Speech bubble popup on tap/click
    const showSpeechBubble = () => {
      let bubble = el.querySelector('.mascot-bubble-talk');
      if (!bubble) {
        bubble = document.createElement('div');
        bubble.className = 'mascot-bubble-talk';
        el.appendChild(bubble);
      }
      const cur = mascotConfigs[currentIdx];
      const textToShow = (cur.quotes && cur.quotes.length > 0) ? cur.quotes[0] : (cur.name || 'สวัสดีฮับ!');
      bubble.textContent = textToShow;
      clearTimeout(bubbleTimeout);
      bubbleTimeout = setTimeout(() => {
        if (bubble && bubble.parentNode) bubble.parentNode.removeChild(bubble);
      }, 3000);
    };

    // Function to update mascot character (cycles Mascot 1 -> Mascot 2 -> Mascot 3 -> Mascot 1)
    const updateMascotAppearance = () => {
      const cur = mascotConfigs[currentIdx];
      img.src = cur.png;
      img.alt = cur.name;
      img.onerror = () => {
        if (cur.fallbackPng && img.src !== cur.fallbackPng && !img.src.startsWith('data:')) {
          img.src = cur.fallbackPng;
        }
      };
      // Cute pop animation
      el.style.transform = 'scale(1.25)';
      setTimeout(() => {
        if (!isDragging) el.style.transform = 'scale(1)';
      }, 200);
      showSpeechBubble();
      if (typeof playCuteClickSound === 'function') playCuteClickSound();
    };

    // Automatically say hello on Mascot 1 after 1.5s on page load
    setTimeout(() => {
      if (clickCount === 0 && !isDragging) {
        showSpeechBubble();
      }
    }, 1500);

    // Global switcher for admin test preview buttons
    window._switchMascotByIndex = (targetIdx) => {
      const p1 = document.getElementById('cfg_mascot1_png')?.value;
      const q1 = document.getElementById('cfg_mascot1_quote')?.value;
      const n1 = document.getElementById('cfg_mascot1_name')?.value;
      const p2 = document.getElementById('cfg_mascot2_png')?.value;
      const q2 = document.getElementById('cfg_mascot2_quote')?.value;
      const n2 = document.getElementById('cfg_mascot2_name')?.value;
      const p3 = document.getElementById('cfg_mascot3_png')?.value;
      const q3 = document.getElementById('cfg_mascot3_quote')?.value;
      const n3 = document.getElementById('cfg_mascot3_name')?.value;

      if (mascotConfigs[0]) {
        if (p1) mascotConfigs[0].png = formatDriveImageUrl(p1) || p1;
        if (q1) mascotConfigs[0].quotes = [q1];
        if (n1) mascotConfigs[0].name = n1;
      }
      if (mascotConfigs[1]) {
        if (p2) mascotConfigs[1].png = formatDriveImageUrl(p2) || p2;
        if (q2) mascotConfigs[1].quotes = [q2];
        if (n2) mascotConfigs[1].name = n2;
      }
      if (mascotConfigs[2]) {
        if (p3) mascotConfigs[2].png = formatDriveImageUrl(p3) || p3;
        if (q3) mascotConfigs[2].quotes = [q3];
        if (n3) mascotConfigs[2].name = n3;
      }

      currentIdx = ((targetIdx % mascotConfigs.length) + mascotConfigs.length) % mascotConfigs.length;
      clickCount = currentIdx + 1;
      updateMascotAppearance();
    };

    // Handle Tap/Click on Mascot
    const handleMascotTap = () => {
      clickCount++;
      // Click 1 = Mascot 1 (bounce & quote)
      // Click 2 = Mascot 2 (switch & quote)
      // Click 3 = Mascot 3 (switch & quote)
      // Click 4 = Mascot 1 (repeat)
      currentIdx = (clickCount - 1) % mascotConfigs.length;
      updateMascotAppearance();
    };

    // Pointer events for Drag and Hold (Mouse & Touch)
    const onPointerDown = (e) => {
      isDragging = true;
      hasMoved = false;
      pointerStartTime = Date.now();
      el.style.transition = 'none';
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      startMouseX = clientX;
      startMouseY = clientY;
      lastMouseX = clientX;
      lastMouseY = clientY;
      origPosX = posX;
      origPosY = posY;
      e.stopPropagation();
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      lastMouseX = clientX;
      lastMouseY = clientY;
      const deltaX = clientX - startMouseX;
      const deltaY = clientY - startMouseY;

      // Higher threshold to distinguish drag from finger tap jitter
      if (Math.hypot(deltaX, deltaY) > 16) {
        hasMoved = true;
      }

      posX = origPosX + deltaX;
      posY = origPosY + deltaY;

      // Keep within screen bounds
      const maxW = window.innerWidth - 85;
      const maxH = window.innerHeight - 85;
      if (posX < 10) posX = 10;
      if (posX > maxW) posX = maxW;
      if (posY < 10) posY = 10;
      if (posY > maxH) posY = maxH;

      el.style.left = `${posX}px`;
      el.style.top = `${posY}px`;
      if (e.cancelable && e.touches) e.preventDefault();
    };

    const onPointerUp = () => {
      if (!isDragging) return;
      isDragging = false;
      el.style.transition = 'transform 0.15s ease';
      el.style.transform = 'scale(1)';

      const duration = Date.now() - pointerStartTime;
      const moveDist = Math.hypot(lastMouseX - startMouseX, lastMouseY - startMouseY);

      // If user tapped/clicked without dragging
      if (!hasMoved || (moveDist < 16 && duration < 400)) {
        handleMascotTap();
      }
    };

    el.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    el.addEventListener('touchstart', onPointerDown, { passive: false });
    window.addEventListener('touchmove', onPointerMove, { passive: false });
    window.addEventListener('touchend', onPointerUp);

    // Gentle floating animation loop (gentle bobbing up & down, slow descent if near top)
    function animLoop() {
      if (!isDragging) {
        tick += 0.022;
        // Gentle bobbing up and down + subtle sway
        const bob = Math.sin(tick) * 0.45;
        const sway = Math.cos(tick * 0.8) * 0.35;
        posY += bob;
        posX += sway;

        const maxW = window.innerWidth - 85;
        const maxH = window.innerHeight - 85;
        if (posX < 10) posX = 10;
        if (posX > maxW) posX = maxW;
        if (posY < 10) posY = 10;
        if (posY > maxH) posY = maxH;

        el.style.left = `${posX}px`;
        el.style.top = `${posY}px`;
      }
      requestAnimationFrame(animLoop);
    }
    requestAnimationFrame(animLoop);
  }

  window.switchFloatingMascot = function (targetIdx) {
    if (typeof window._switchMascotByIndex === 'function') {
      window._switchMascotByIndex(targetIdx);
    }
  };
  
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
          <a href="#groups" class="nav-link ${state.view === 'groups' ? 'active' : ''}">เข้ากลุ่ม</a>
          <a href="#portfolio" class="nav-link ${state.view === 'portfolio' ? 'active' : ''}">ผลงาน</a>
          <a href="#points" class="nav-link ${state.view === 'points' ? 'active' : ''}">สะสมแต้ม</a>
          <a href="#reviews" class="nav-link ${state.view === 'reviews' ? 'active' : ''}">รีวิว</a>
          <a href="#orders" class="nav-link ${state.view === 'orders' ? 'active' : ''}">สถานะออเดอร์</a>
          
          <a href="#admin" class="nav-admin-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
            ${state.isAdmin ? 'แอดมิน (ออนไลน์)' : 'หลังบ้าน'}
          </a>
        </nav>

        <div class="navbar-end-actions">
          <a href="#home" class="nav-circle-btn" aria-label="หน้าแรก" title="หน้าแรก" onclick="if(typeof playCuteClickSound==='function')playCuteClickSound(); toggleMobileNav(false);">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B26E86" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9.5L12 3l9 6.5V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.5z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </a>
          <button class="hamburger-btn nav-circle-btn" onclick="toggleMobileNav()" aria-label="เปิดเมนู" title="เมนู">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B26E86" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="4" y1="12" x2="20" y2="12"/>
              <line x1="4" y1="6" x2="20" y2="6"/>
              <line x1="4" y1="18" x2="20" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
    `;
  }

  window.toggleMobileNav = function (forceState) {
    const menu = $('navbarMenu');
    if (!menu) return;
    if (typeof forceState === 'boolean') {
      menu.classList.toggle('is-open', forceState);
    } else {
      menu.classList.toggle('is-open');
    }
  };

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    const menu = $('navbarMenu');
    const actions = e.target.closest('.navbar-end-actions');
    if (menu && menu.classList.contains('is-open') && !menu.contains(e.target) && !actions) {
      menu.classList.remove('is-open');
    }
  });

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

  function getContactChannelIcon(platform, url) {
    const p = (platform || '').toLowerCase();
    const u = (url || '').toLowerCase();

    // LINE
    if (p.includes('line') || p.includes('ไลน์') || u.includes('line.me')) {
      return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.477.254l2.508 3.407V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>`;
    }
    // Facebook
    if (p.includes('facebook') || p.includes('fb') || p.includes('เฟส') || u.includes('facebook.com') || u.includes('fb.me')) {
      return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`;
    }
    // Instagram
    if (p.includes('instagram') || p.includes('ig') || p.includes('ไอจี') || u.includes('instagram.com')) {
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>`;
    }
    // Phone / Tel
    if (p.includes('tel') || p.includes('phone') || p.includes('โทร') || p.includes('เบอร์') || p.includes('call') || u.startsWith('tel:')) {
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`;
    }
    // TikTok
    if (p.includes('tiktok') || p.includes('ติ๊กตอก') || u.includes('tiktok.com')) {
      return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>`;
    }
    // Twitter / X
    if (p.includes('twitter') || p === 'x' || p.includes('ทวิต') || u.includes('twitter.com') || u.includes('x.com')) {
      return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`;
    }
    // YouTube
    if (p.includes('youtube') || p.includes('yt') || p.includes('ยูทูป') || u.includes('youtube.com')) {
      return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`;
    }
    // Shopee / Lazada / Shop
    if (p.includes('shopee') || p.includes('lazada') || p.includes('shop') || p.includes('store') || p.includes('ร้าน') || p.includes('ช้อป') || u.includes('shopee') || u.includes('lazada')) {
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>`;
    }
    // Email / Mail
    if (p.includes('mail') || p.includes('เมล') || p.includes('email') || u.startsWith('mailto:')) {
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`;
    }
    // Website / Web / Link
    if (p.includes('web') || p.includes('site') || p.includes('link') || p.includes('เว็บ')) {
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"></path></svg>`;
    }
    // Default chat bubble with dots
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><circle cx="9" cy="10" r="1"></circle><circle cx="12" cy="10" r="1"></circle><circle cx="15" cy="10" r="1"></circle></svg>`;
  }

  function renderHomeView(container) {
    const s = Store.getSettings();
    const stats = s.stats || {};
    const banners = Store.getHomeBanners();
    const queueStatus = Store.getQueueStatus();
    const featuredProds = Store.getAllProducts();
    const featuredFonts = Store.getAllFonts();
    const featuredGroups = Store.getAllGroups();
    const featuredPortfolio = Store.getPortfolio();

    container.innerHTML = `
      <!-- Facebook Style Cover & Profile Section (1920x1080 / 16:9 Cover Banner) -->
      <section class="fb-profile-section">
        <div class="container">
          <!-- Facebook Cover Banner (16:9 ratio, 1920x1080 Full HD) -->
          <div class="fb-cover-banner">
            <img src="${escapeHTML(formatDriveImageUrl(s.coverImage) || 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=1600')}" class="fb-cover-img" alt="Cover Banner" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=1600';">
          </div>

          <!-- Facebook Profile Main Row (Avatar Overlapping Cover + Details) -->
          <div class="fb-profile-card">
            <div class="fb-avatar-box">
              <img src="${escapeHTML(formatDriveImageUrl(s.profileImage) || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400')}" class="fb-avatar-img" alt="Studio Avatar" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400';">
            </div>

            <div class="fb-profile-details">
              <div class="fb-name-row">
                <h1 class="fb-shop-title">${escapeHTML(s.shopName || 'BNC GraphMate Studio')}</h1>
                <span class="badge badge--pink">${escapeHTML(s.tagline || 'ร้านป้าย & กราฟิก สไตล์คิวท์ น่ารัก มินิมอล')}</span>
              </div>

              <!-- Stats Pills -->
              <div class="fb-stats-row">
                <div class="ig-stat-item"><strong>${escapeHTML(stats.portfolioCount || '250+')}</strong> ${escapeHTML(stats.portfolioLabel || 'ผลงาน')}</div>
                <div class="ig-stat-item"><strong>${escapeHTML(stats.fontCount || '48')}</strong> ${escapeHTML(stats.fontLabel || 'ฟอนต์')}</div>
                <div class="ig-stat-item"><strong>${escapeHTML(stats.memberCount || '1.2k')}</strong> ${escapeHTML(stats.memberLabel || 'สมาชิก')}</div>
              </div>

              <!-- Bio -->
              <p class="fb-bio-text">${escapeHTML(s.shopBio || 'สตูดิโอออกแบบป้ายร้าน งานฟอนต์ลายมือ สติกเกอร์ และทรัพยากรกราฟิกพร้อมใช้ ตอบแชทไว ส่งงานเร็ว ไฟล์คมชัด 300 DPI ใช้งานเชิงพาณิชย์ได้')}</p>

              <!-- Contact us: Circular Icon Buttons (White Background, Dusty Pink Icons) -->
              <div class="fb-contact-block">
                <span class="fb-contact-title">Contact us</span>
                <div class="fb-contact-icons">
                  ${Store.getContactChannels().map(ch => {
                    const isTel = (ch.url || '').startsWith('tel:');
                    const isMail = (ch.url || '').startsWith('mailto:');
                    const target = (isTel || isMail) ? '' : 'target="_blank" rel="noopener noreferrer"';
                    const iconSvg = getContactChannelIcon(ch.platform, ch.url);
                    const label = ch.platform || 'ติดต่อ';
                    const val = ch.value ? ` (${ch.value})` : '';
                    return `
                      <a href="${escapeHTML(ch.url || '#')}" ${target} class="fb-contact-btn" title="${escapeHTML(label + val)}" aria-label="${escapeHTML(label)}">
                        ${iconSvg}
                      </a>
                    `;
                  }).join('')}
                </div>
              </div>

              <!-- Flowing Reviews Marquee (Continuous Ticker Under Contact) -->
              ${(() => {
                const allRev = Store.getAllReviews() || [];
                const selIds = Array.isArray(s.homeReviewIds) ? s.homeReviewIds : ['rev-1'];
                let revList = allRev.filter(r => selIds.includes(r.id));
                if (revList.length === 0) revList = allRev.slice(0, 8);
                if (revList.length === 0) return '';
                let loopList = [...revList];
                while (loopList.length < 16) {
                  loopList = loopList.concat(revList);
                }
                const renderCard = (r) => {
                  const hasProof = !!(r.proof_image || r.proof_image_url || r.image_url);
                  return `
                  <div class="review-ticker-bubble" onclick="viewReviewDetailModal('${r.id}')" title="คลิกเพื่อดูรีวิวและหลักฐานการซื้อขาย">
                    <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 4px;">
                      <div style="display: flex; align-items: center; gap: 6px; overflow: hidden;">
                        <span class="ticker-avatar">${escapeHTML((r.customer_name || 'U').trim().charAt(0))}</span>
                        <span style="font-weight: 700; font-size: 0.88rem; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${escapeHTML(r.customer_name || 'ลูกค้า')}</span>
                      </div>
                      <span style="color: #F59E0B; font-size: 0.82rem; letter-spacing: 1px; flex-shrink: 0;">${'★'.repeat(r.rating || 5)}</span>
                    </div>
                    <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px; margin-bottom: 3px;">
                      ${r.product_name ? `<span style="font-size: 0.76rem; color: var(--primary-deep); font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${escapeHTML(r.product_name)}</span>` : '<span></span>'}
                      ${hasProof ? `<span style="font-size: 0.68rem; color: #B24368; background: #FFF0F5; border: 1px solid #FFB6CE; padding: 1px 7px; border-radius: 999px; font-weight: 600; flex-shrink: 0;">มีหลักฐาน</span>` : ''}
                    </div>
                    <p style="font-size: 0.82rem; color: var(--text-secondary); margin: 0; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                      ${escapeHTML(r.message || '')}
                    </p>
                  </div>
                `;};
                return `
                  <div class="home-reviews-marquee-container">
                    <div class="reviews-marquee-track">
                      <div class="reviews-marquee-group">
                        ${loopList.map(r => renderCard(r)).join('')}
                      </div>
                      <div class="reviews-marquee-group" aria-hidden="true">
                        ${loopList.map(r => renderCard(r)).join('')}
                      </div>
                    </div>
                  </div>
                `;
              })()}

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
              <div style="margin-top: 1.25rem; display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
                <a href="#queue" class="btn btn-outline btn-sm" style="font-weight: 700; border-radius: 14px; padding: 0.6rem 1.4rem; background: #FFFFFF; border: 1.5px solid #FFDFE9; color: #71515B;">
                  เช็คสถานะคิว
                </a>
                <a href="#points" class="btn btn-outline btn-sm" style="font-weight: 700; border-radius: 14px; padding: 0.6rem 1.4rem; background: #FFFFFF; border: 1.5px solid #FFDFE9; color: #71515B;">
                  สะสมแต้ม
                </a>
                <a href="${escapeHTML(s.queueBookingUrl || s.lineUrl || 'https://line.me/ti/p/~bncgraphmate')}" target="${(s.queueBookingUrl || '').startsWith('#') ? '_self' : '_blank'}" class="btn btn-primary btn-sm" style="font-weight: 700; border-radius: 14px; padding: 0.6rem 1.4rem;">
                  สอบถาม | จองคิว
                </a>
              </div>
            </div>
          </div>

          <!-- 1:1 Square Hero Carousel (Repositioned to be directly AFTER Notebook Paper) -->
          <div style="margin-top: 2.5rem;">
            <div class="hero-carousel-wrapper">
              <div class="hero-carousel-container" id="heroCarouselSlides">
                ${banners.map((b, idx) => `
                  <div class="hero-carousel-slide ${idx === 0 ? 'active' : ''}" data-index="${idx}">
                    <a href="${escapeHTML(b.link || '#fonts')}">
                      <img src="${escapeHTML(formatDriveImageUrl(b.image))}" alt="${escapeHTML(b.title || '')}" style="width:100%; height:100%; object-fit:cover; display:block;" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1541643600914-78b084683601?w=600';">
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

      <!-- Our Works & Gallery Section (Directly under Hero Carousel) -->
      <section style="padding: 2.5rem 0 2rem;">
        <div class="container">
          <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 1.5rem;">
            <div>
              <h2 class="section-title" style="margin: 0;">Our Works & Gallery</h2>
            </div>
            <a href="#portfolio" class="btn btn-outline btn-sm">ดูทั้งหมด (${featuredPortfolio.length}) →</a>
          </div>

          <div class="compact-horizontal-slider" style="padding-top: 15px;">
            ${featuredPortfolio.map(p => {
              const pImg = formatDriveImageUrl(p.image_url || p.image || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=700');
              return `
              <div class="compact-card-item">
                <div class="pop-out-badge">${escapeHTML(p.style_category || p.category || 'ผลงาน')}</div>
                <img src="${escapeHTML(pImg)}" class="compact-card-thumb" alt="${escapeHTML(p.title || p.name || '')}" loading="lazy" onclick="openLightbox('${escapeHTML(pImg)}')" style="cursor: pointer;" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=700';">
                <div class="compact-card-content">
                  <div class="compact-card-title">${escapeHTML(p.title || p.name || 'งานออกแบบ')}</div>
                  <div class="compact-card-footer">
                    <span class="product-price" style="font-size: 1.05rem;">฿${Number(p.price || 0).toLocaleString()}</span>
                    <a href="${escapeHTML(s.portfolioContactUrl || s.lineUrl || '#contact-us')}" target="${(s.portfolioContactUrl || s.lineUrl || '').startsWith('#') ? '_self' : '_blank'}" class="btn btn-primary btn-sm" style="padding: 5px 12px; font-size: 11px; text-decoration: none; font-weight: 700;">
                      สนใจสั่งงาน
                    </a>
                  </div>
                </div>
              </div>
            `;}).join('')}
          </div>
        </div>
      </section>

      <!-- Groups Section (1-Row Compact Horizontal Slider with Pop-Out Badges) -->
      <section style="padding: 2.5rem 0 2rem; background-color: var(--surface-alt);">
        <div class="container">
          <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 1.5rem;">
            <div>
              <h2 class="section-title" style="margin: 0;">Groups</h2>
            </div>
            <a href="#groups" class="btn btn-outline btn-sm">ดูทั้งหมด (${featuredGroups.length}) →</a>
          </div>

          <div class="compact-horizontal-slider" style="padding-top: 15px;">
            ${featuredGroups.map(g => {
              const grpImg = formatDriveImageUrl(g.cover_image_url || g.cover_image || 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600');
              return `
              <div class="compact-card-item">
                <div class="pop-out-badge">${escapeHTML(g.category || 'VIP')}</div>
                <img src="${escapeHTML(grpImg)}" class="compact-card-thumb" alt="${escapeHTML(g.name)}" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600';">
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
            `;}).join('')}
          </div>
        </div>
      </section>

      <!-- Fonts Section (1-Row Compact Horizontal Slider with Pop-Out Badges) -->
      <section style="padding: 2.5rem 0 2rem;">
        <div class="container">
          <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 1.5rem;">
            <div>
              <h2 class="section-title" style="margin: 0;">Fonts</h2>
            </div>
            <a href="#fonts" class="btn btn-outline btn-sm">ดูทั้งหมด (${featuredFonts.length}) →</a>
          </div>

          <div class="compact-horizontal-slider" style="padding-top: 15px;">
            ${featuredFonts.map(f => {
              const fontImg = formatDriveImageUrl(f.preview_image || f.preview_image_url || f.image_url || 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=600');
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

      <!-- Digital Product Section (1-Row Compact Horizontal Slider with Pop-Out Badges) -->
      <section style="padding: 2.5rem 0 3.5rem; background-color: var(--surface-alt);">
        <div class="container">
          <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 1.5rem;">
            <div>
              <h2 class="section-title" style="margin: 0;">Digital Product</h2>
            </div>
            <a href="#products" class="btn btn-outline btn-sm">ดูทั้งหมด (${featuredProds.length}) →</a>
          </div>

          <div class="compact-horizontal-slider" style="padding-top: 15px;">
            ${featuredProds.map(p => {
              const prodImg = formatDriveImageUrl(p.image_url || p.image || 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600');
              return `
              <div class="compact-card-item">
                <div class="pop-out-badge">${escapeHTML(p.category || 'กราฟิก')}</div>
                <img src="${escapeHTML(prodImg)}" class="compact-card-thumb" alt="${escapeHTML(p.name)}" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1541643600914-78b084683601?w=600';">
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
            `;}).join('')}
          </div>
        </div>
      </section>
    `;

    // Start Auto Carousel Slide
    initHeroCarousel(banners.length);
  }

  function renderFontsView(container) {
    loadFontFaces();
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
                <span>ทดสอบและเปรียบเทียบฟอนต์ลายมือสด</span>
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

                  <div class="font-compare-text-display font-display-a" data-font-id="${fontA?.id || ''}" style="font-size: ${state.fontTester.size}px; font-family: ${getFontFamily(fontA)};">
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

                  <div class="font-compare-text-display font-display-b" data-font-id="${fontB?.id || ''}" style="font-size: ${state.fontTester.size}px; font-family: ${getFontFamily(fontB)};">
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
  
  
  // ── High-Precision Date Matching for Queue & Calendar ──
  const thaiMonthsList = [
    { names: ['ก.ย.', 'ก.ย', 'กันยายน', 'กย'], m: 9 },
    { names: ['ม.ค.', 'ม.ค', 'มกราคม', 'มค'], m: 1 },
    { names: ['ก.พ.', 'ก.พ', 'กุมภาพันธ์', 'กพ'], m: 2 },
    { names: ['มี.ค.', 'มี.ค', 'มีนาคม', 'มีค'], m: 3 },
    { names: ['เม.ย.', 'เม.ย', 'เมษายน', 'เมย'], m: 4 },
    { names: ['พ.ค.', 'พ.ค', 'พฤษภาคม', 'พค'], m: 5 },
    { names: ['มิ.ย.', 'มิ.ย', 'มิถุนายน', 'มิย'], m: 6 },
    { names: ['ก.ค.', 'ก.ค', 'กรกฎาคม', 'กค'], m: 7 },
    { names: ['ส.ค.', 'ส.ค', 'สิงหาคม', 'สค'], m: 8 },
    { names: ['ต.ค.', 'ต.ค', 'ตุลาคม', 'ตค'], m: 10 },
    { names: ['พ.ย.', 'พ.ย', 'พฤศจิกายน', 'พย'], m: 11 },
    { names: ['ธ.ค.', 'ธ.ค', 'ธันวาคม', 'ธค'], m: 12 }
  ];

  function normalizeYear(y) {
    if (y === null || y === undefined || y === '') return null;
    y = parseInt(y, 10);
    if (isNaN(y)) return null;
    if (y > 2400) return y - 543; // Full BE year e.g. 2569 -> 2026
    if (y > 1900 && y < 2200) return y; // Full CE year e.g. 2026
    if (y >= 50 && y <= 99) return 1957 + y; // 2-digit BE year e.g. 69 -> 2026
    if (y < 50) return 2000 + y; // 2-digit CE year e.g. 26 -> 2026
    return y;
  }

  function findThaiMonth(str) {
    const s = str.toLowerCase().replace(/\s+/g, '');
    for (const item of thaiMonthsList) {
      for (const name of item.names) {
        if (s.includes(name)) return { month: item.m, matchedName: name };
      }
    }
    return null;
  }

  function parseQueueDate(dateStr) {
    if (!dateStr) return null;
    const s = String(dateStr).trim().toLowerCase();

    // 1. วันนี้ / today
    if (s === 'วันนี้' || s === 'today') {
      const now = new Date();
      return { day: now.getDate(), month: now.getMonth() + 1, year: now.getFullYear() };
    }

    // 2. พรุ่งนี้ / tomorrow
    if (s === 'พรุ่งนี้' || s === 'tomorrow') {
      const d = new Date(Date.now() + 86400000);
      return { day: d.getDate(), month: d.getMonth() + 1, year: d.getFullYear() };
    }

    // 3. ISO/YMD: 2026-09-12 or 2026/09/12
    const ymd = s.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/);
    if (ymd) {
      return { year: normalizeYear(ymd[1]), month: parseInt(ymd[2], 10), day: parseInt(ymd[3], 10) };
    }

    // 4. DMY digits: 12/09/2026, 12/9/2569, 12-9-69
    const dmy = s.match(/^(\d{1,2})[\/\-\.](\d{1,2})(?:[\/\-\.](\d{2,4}))?$/);
    if (dmy) {
      return { day: parseInt(dmy[1], 10), month: parseInt(dmy[2], 10), year: normalizeYear(dmy[3]) };
    }

    // 5. Thai Month Name in string: e.g. '12 ก.ย. 69', '12 ก.ย. 2569', 'วันที่ 12 ก.ย.', '12 กันยายน'
    const thaiInfo = findThaiMonth(s);
    if (thaiInfo) {
      const dayMatch = s.match(/(?:วันที่\s*)?(\d{1,2})\s*(?:st|nd|rd|th)?/);
      if (dayMatch) {
        const d = parseInt(dayMatch[1], 10);
        let y = null;
        const yearMatch = s.match(/(?:(?:ม\.?ค|ก\.?พ|มี\.?ค|เม\.?ย|พ\.?ค|มิ\.?ย|ก\.?ค|ส\.?ค|ก\.?ย|ต\.?ค|พ\.?ย|ธ\.?ค|มกราคม|กุมภาพันธ์|มีนาคม|เมษายน|พฤษภาคม|มิถุนายน|กรกฎาคม|สิงหาคม|กันยายน|ตุลาคม|พฤศจิกายน|ธันวาคม)\.?(?:\s+|\/|\-|\.))(\d{2,4})/);
        if (yearMatch) {
          y = normalizeYear(yearMatch[1]);
        }
        return { day: d, month: thaiInfo.month, year: y };
      }
    }

    // 6. Day only: '12', 'วันที่ 12'
    const dayOnly = s.match(/^(?:วันที่\s*)?(\d{1,2})(?:st|nd|rd|th)?$/);
    if (dayOnly) {
      return { day: parseInt(dayOnly[1], 10), month: null, year: null };
    }

    return null;
  }

  function isQueueDateMatching(dateStr, targetYear, targetMonth, targetDay) {
    const parsed = parseQueueDate(dateStr);
    if (!parsed) return false;

    if (parsed.day !== targetDay) return false;
    if (parsed.month !== null && parsed.month !== targetMonth) return false;
    if (parsed.year !== null && parsed.year !== targetYear) return false;

    return true;
  }

  function isQueueDateToday(dateStr) {
    if (!dateStr) return false;
    const now = new Date();
    return isQueueDateMatching(dateStr, now.getFullYear(), now.getMonth() + 1, now.getDate());
  }

  function getStageLabelByProgress(pct) {
    const p = Math.min(100, Math.max(0, Number(pct) || 0));
    if (p >= 100) return 'ส่งงานเรียบร้อย';
    if (p >= 75) return 'กำลังเช็ค';
    if (p >= 50) return 'กำลังทำ';
    if (p >= 25) return 'รับบรีฟ';
    return 'รอคิว';
  }

  // Helper: Normalize status key from either English or Thai
  function normalizeQueueStatus(status) {
    if (!status) return 'waiting';
    const s = String(status).trim().toLowerCase();
    if (s === 'progress' || s === 'กำลังดำเนินการ' || s === 'กำลังทำ') return 'progress';
    if (s === 'review' || s === 'รอตรวจ') return 'review';
    if (s === 'edit' || s === 'รอแก้ไข') return 'edit';
    if (s === 'done' || s === 'เสร็จแล้ว') return 'done';
    if (s === 'pause' || s === 'พักคิว') return 'pause';
    if (s === 'cancel' || s === 'ยกเลิก') return 'cancel';
    return 'waiting';
  }
  window.normalizeQueueStatus = normalizeQueueStatus;

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
    const countWaiting = allQueues.filter(q => normalizeQueueStatus(q.status) === 'waiting').length;
    const countProgress = allQueues.filter(q => {
      const k = normalizeQueueStatus(q.status);
      return k === 'progress' || k === 'review' || k === 'edit';
    }).length;
    const countDone = allQueues.filter(q => normalizeQueueStatus(q.status) === 'done').length;

    // Filter by search query (Queue number, client name, line_id, or phone)
    const query = (state.queueSearchQuery || '').trim().toLowerCase();
    const filteredQueues = allQueues.filter(q => {
      if (!query) return true;
      const cleanQ = query.replace(/^#/, '');
      const matchNum = (q.queue_number || '').toLowerCase().includes(cleanQ);
      const matchName = (q.customer_name || '').toLowerCase().includes(query);
      const matchLine = (q.line_id || '').toLowerCase().includes(query);
      const matchContact = (q.contact || '').toLowerCase().includes(query);
      const matchJob = (q.job_name || '').toLowerCase().includes(query);
      const matchNote = (q.note || '').toLowerCase().includes(query);
      
      const qDigits = query.replace(/[^0-9]/g, '');
      const phoneDigits = (q.phone || q.contact || '').replace(/[^0-9]/g, '');
      const matchPhone = (qDigits.length >= 2 && phoneDigits.includes(qDigits));

      return matchNum || matchName || matchLine || matchContact || matchJob || matchNote || matchPhone;
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
              <h1 style="font-family: var(--font-heading); color: #71515B; font-size: 2.1rem; margin-bottom: 0.5rem; font-weight: 700;">
                ${escapeHTML(qSettings.heroTitle || 'เช็กคิวงาน')}
              </h1>
              <p style="color: var(--text-muted); font-size: 0.98rem; margin-bottom: 0.85rem;">
                ${escapeHTML(qSettings.heroSubtitle || 'ดูสถานะคิวงานของร้านแบบเรียลไทม์')}
              </p>
              ${qSettings.noticeText ? `
                <div style="background: #FFF5F8; border: 1.5px solid #FFDFE9; border-radius: 14px; padding: 0.75rem 1.25rem; font-size: 0.88rem; color: #71515B; display: inline-block;">
                  ${escapeHTML(qSettings.noticeText)}
                </div>
              ` : ''}
            </div>

            <!-- Summary Stats: คิวเดือนนี้ | รอคิว | คิววันนี้ (พร้อมหัวใจติ๊กถูก) | ความสำเร็จในเดือนนี้ -->
            ${qSettings.showSummary ? (() => {
              const monthPct = totalToday > 0 ? Math.round((countDone / totalToday) * 100) : 0;
              const todayQueuesList = allQueues.filter(item => {
                const sk = normalizeQueueStatus(item.status);
                const isToday = isQueueDateToday(item.queue_date);
                return item.is_pinned === true || isToday || sk === 'progress' || sk === 'review' || sk === 'edit';
              });
              const todayCount = todayQueuesList.length;
              const todayAllDone = todayCount > 0 && todayQueuesList.every(item => {
                const sk = normalizeQueueStatus(item.status);
                const p = Number(item.progress) || 0;
                return sk === 'done' || p >= 100;
              });

              return `
                <div class="queue-month-candy-card" style="padding: 1.25rem 1.5rem; background: #FFFFFF; border: 1.5px solid #FFDFE9; border-radius: 20px; box-shadow: 0 4px 12px rgba(113,81,91,0.04); margin-top: 1.25rem;">
                  <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
                    <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
                      <div>
                        <span style="font-size: 0.82rem; color: #71515B; font-weight: 600; display: block;">${escapeHTML(qSettings.monthLabel || qSettings.todayLabel || 'คิวเดือนนี้')}</span>
                        <strong style="font-size: 1.45rem; color: #71515B; font-family: var(--font-heading); font-weight: 800;">${totalToday} <span style="font-size: 0.88rem; font-weight: 600;">คิว</span></strong>
                      </div>
                      <div style="width: 1px; height: 32px; background: #FFDFE9;"></div>
                      <div>
                        <span style="font-size: 0.82rem; color: #71515B; font-weight: 600; display: block;">${escapeHTML(qSettings.waitingLabel || 'รอคิว')}</span>
                        <strong style="font-size: 1.45rem; color: #71515B; font-family: var(--font-heading); font-weight: 800;">${countWaiting} <span style="font-size: 0.88rem; font-weight: 600;">คิว</span></strong>
                      </div>
                      <div style="width: 1px; height: 32px; background: #FFDFE9;"></div>
                      <div>
                        <span style="font-size: 0.82rem; color: #71515B; font-weight: 600; display: block;">คิววันนี้</span>
                        <div style="display: flex; align-items: center; gap: 6px;">
                          <strong style="font-size: 1.45rem; color: #71515B; font-family: var(--font-heading); font-weight: 800;">${todayCount} <span style="font-size: 0.88rem; font-weight: 600;">คิว</span></strong>
                          ${todayAllDone ? `
                            <span title="เสร็จครบทุกคิวแล้วในวันนี้" style="display: inline-flex; align-items: center; gap: 3px; background: #FFF0F5; border: 1.5px solid #FBCFE8; color: #E11D48; font-size: 0.78rem; font-weight: 700; padding: 2px 8px; border-radius: 999px;">
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="#E11D48" stroke="#E11D48" stroke-width="1.5"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                              <span>✓ เสร็จครบ</span>
                            </span>
                          ` : `
                            <span title="มีคิวงานกำลังดำเนินการ" style="display: inline-flex; align-items: center; gap: 3px; background: #FFF9FC; border: 1px solid #FFDFE9; color: #71515B; font-size: 0.78rem; font-weight: 600; padding: 2px 6px; border-radius: 999px;">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E05A88" stroke-width="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                            </span>
                          `}
                        </div>
                      </div>
                    </div>
                    <div style="text-align: right;">
                      <span style="font-size: 0.82rem; color: #71515B; font-weight: 600; display: block;">${escapeHTML(qSettings.completionLabel || 'ความสำเร็จในเดือนนี้')}</span>
                      <strong style="font-size: 1.5rem; color: #71515B; font-family: var(--font-heading); font-weight: 800;">${monthPct}%</strong>
                    </div>
                  </div>
                </div>
              `;
            })() : ''}
          </div>

          <!-- Customer Privacy Search Card -->
          ${qSettings.showSearch ? `
            <div class="queue-search-card">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 8px;">
                <h3 style="margin: 0; font-size: 1.15rem; color: #71515B; font-weight: 700;">
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
                  onkeydown="if (event.key === 'Enter') { triggerQueueSearchSubmit(); }"
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

          <!-- Queue Section Bar (Title removed per request) -->
          <div style="display: flex; justify-content: flex-end; align-items: center; margin-bottom: 1.25rem;">
            <span style="font-size: 0.85rem; color: #71515B;">
              แสดง ${filteredQueues.length} จากทั้งหมด ${allQueues.length} รายการ
            </span>
          </div>

          <!-- Queue List: Active Day Queue (Post-it) & Waiting Queues (Rounded Long Bar) -->
          ${filteredQueues.length > 0 ? (() => {
            // Includes pinned queues, matching today's date, or active stages
            const activeQueues = filteredQueues.filter(item => {
              const sk = normalizeQueueStatus(item.status);
              const isToday = isQueueDateToday(item.queue_date);
              return item.is_pinned === true || isToday || sk === 'progress' || sk === 'review' || sk === 'edit';
            });
            const otherQueues = filteredQueues.filter(item => !activeQueues.includes(item));

            return `
              <div style="margin-bottom: 2.2rem;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 1rem;">
                  <span style="font-size: 1.15rem; font-weight: 800; color: #71515B; font-family: var(--font-heading);">
                    Today's Queue (${activeQueues.length})
                  </span>
                </div>
                <div class="queue-cards-grid">
                  ${activeQueues.length === 0 ? `
                    <div class="queue-postit-card" style="text-align: center; padding: 2.2rem 1.5rem; justify-content: center; min-height: 180px;">
                      <div class="queue-postit-pin"></div>
                      <div style="font-size: 1.05rem; font-weight: 700; color: #71515B; margin-bottom: 0.35rem; font-family: var(--font-heading);">
                        วันนี้ยังไม่มีคิวที่กำลังออกแบบ
                      </div>
                      <p style="font-size: 0.86rem; color: var(--text-muted); margin: 0; line-height: 1.5;">
                        แอดมินจะเริ่มรันคิวถัดไปตามลำดับ หรือเช็คคิวงานทั้งหมดได้ที่แถบด้านล่างนะคะ
                      </p>
                    </div>
                  ` : ''}
                    ${activeQueues.map(item => {
                      const statusKey = normalizeQueueStatus(item.status);
                      const statusLabel = statusNames[statusKey] || item.status || statusKey;
                      const progressPct = Math.min(100, Math.max(0, Number(item.progress) || 0));
                      const mascotUrl = getQueueMascotForProgress(progressPct, qSettings);

                      return `
                        <div class="queue-postit-card" onclick="openQueueDetailModal('${item.id}')">
                          <!-- Sticky Note Top Tape -->
                          <div class="queue-postit-pin"></div>

                          <div class="queue-card-header">
                            ${qSettings.showQueueNumber !== false ? `
                              <div class="queue-pill-num">
                                ${escapeHTML(item.queue_number || 'Q-')}
                                <span class="queue-postit-active-badge">คิววันนี้</span>
                              </div>
                            ` : '<div></div>'}
                            <span class="queue-status-chip status-${statusKey}">
                              ${escapeHTML(getStageLabelByProgress(progressPct))}
                            </span>
                          </div>

                          <!-- Job Information -->
                          <div class="queue-card-job">${escapeHTML(item.job_name || 'งานออกแบบ')}</div>
                          <div>
                            <span class="queue-card-type-tag">${escapeHTML(item.job_type || 'งานออกแบบ')}</span>
                          </div>

                          ${qSettings.showCustomerName !== false ? `
                            <div class="queue-card-client">
                              ลูกค้า: <strong>${escapeHTML(item.customer_name || 'ลูกค้า')}</strong>
                            </div>
                          ` : ''}

                          <!-- Progress Bar with Mascot Tip -->
                          ${qSettings.showProgress !== false ? `
                            <div style="margin: 0.6rem 0 0.4rem;">
                              <div style="display: flex; justify-content: space-between; font-size: 0.78rem; color: #718096; margin-bottom: 4px;">
                                <span>ความคืบหน้า</span>
                                <span style="font-weight: 700; color: #71515B;">${progressPct}%</span>
                              </div>
                              <div class="queue-mascot-progress-wrap">
                                <div class="queue-mascot-progress-track">
                                  <div class="queue-mascot-progress-fill" style="width: ${progressPct}%;">
                                    <div class="queue-mascot-progress-tip" title="${progressPct}%">
                                      <img src="${escapeHTML(mascotUrl)}" alt="Mascot">
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ` : ''}

                          ${qSettings.showNote !== false && item.note ? `
                            <div style="font-size: 0.82rem; color: #4A5568; background: #ffffff; border: 1.5px solid #FFDFE9; padding: 6px 10px; border-radius: 8px; margin-top: 0.5rem; color: #71515B;">
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
              </div>

              ${otherQueues.length > 0 ? `
                <div>
                  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 0.75rem;">
                    <span style="font-size: 1.15rem; font-weight: 800; color: #71515B; font-family: var(--font-heading);">
                      Queue List (${otherQueues.length})
                    </span>
                  </div>
                  <div class="queue-long-bar-list">
                    ${otherQueues.map(item => {
                      const statusKey = normalizeQueueStatus(item.status);
                      const statusLabel = statusNames[statusKey] || item.status || statusKey;
                      const progressPct = Math.min(100, Math.max(0, Number(item.progress) || 0));
                      const mascotUrl = getQueueMascotForProgress(progressPct, qSettings);

                      return `
                        <div class="queue-long-bar" onclick="openQueueDetailModal('${item.id}')">
                          <!-- Left: Queue Number & Client/Job -->
                          <div class="queue-long-bar-left">
                            ${qSettings.showQueueNumber !== false ? `
                              <div class="queue-pill-num" style="font-size: 1.1rem; padding: 2px 10px;">
                                ${escapeHTML(item.queue_number || 'Q-')}
                              </div>
                            ` : ''}
                            <div style="min-width: 0;">
                              <div class="queue-card-job" style="font-size: 0.95rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                                ${escapeHTML(item.job_name || 'งานออกแบบ')}
                              </div>
                              ${qSettings.showCustomerName !== false ? `
                                <div style="font-size: 0.78rem; color: #718096;">
                                  ลูกค้า: <strong>${escapeHTML(item.customer_name || 'ลูกค้า')}</strong>
                                </div>
                              ` : ''}
                            </div>
                          </div>

                          <!-- Middle: Progress Bar with Mascot Tip -->
                          <div class="queue-long-bar-mid">
                            ${qSettings.showProgress !== false ? `
                              <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #718096; margin-bottom: 2px;">
                                <span>ความคืบหน้า</span>
                                <span style="font-weight: 700; color: #71515B;">${progressPct}%</span>
                              </div>
                              <div class="queue-mascot-progress-wrap">
                                <div class="queue-mascot-progress-track">
                                  <div class="queue-mascot-progress-fill" style="width: ${progressPct}%;">
                                    <div class="queue-mascot-progress-tip" title="${progressPct}%">
                                      <img src="${escapeHTML(mascotUrl)}" alt="Mascot">
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ` : ''}
                          </div>

                          <!-- Right: Status Badge & Date -->
                          <div class="queue-long-bar-right">
                            <span class="queue-status-chip status-${statusKey}">
                              ${escapeHTML(getStageLabelByProgress(progressPct))}
                            </span>
                            <span style="font-size: 0.78rem; color: #A0AEC0; white-space: nowrap;">
                              ${escapeHTML(item.queue_date || 'วันนี้')}
                            </span>
                          </div>
                        </div>
                      `;
                    }).join('')}
                  </div>
                </div>
              ` : ''}
            `;
          })() : `
            <div style="background: #FFFDFE; border: 1.5px solid #FFDFE9; border-radius: 24px; padding: 4rem 1.5rem; text-align: center; color: var(--text-muted); margin-top: 1rem;">
              <div style="width: 56px; height: 56px; border-radius: 50%; background: #FFF5F8; border: 1.5px solid #FBCFE8; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: #9D174D;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </div>
              <h3 style="color: #9D174D; margin-bottom: 0.35rem; font-size: 1.2rem;">${escapeHTML(qSettings.emptyStateText || 'วันนี้ยังไม่มีคิวงานนะคะ')}</h3>
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
    clearTimeout(window._qSearchTimer);
    window._qSearchTimer = setTimeout(() => {
      renderCurrentView();
      // Keep focus on input after live filter
      const el = $('queueSearchInput');
      if (el) {
        el.focus();
        const len = el.value.length;
        el.setSelectionRange(len, len);
      }
    }, 200);
  };

  window.handleClearQueueSearch = function () {
    state.queueSearchQuery = '';
    renderCurrentView();
  };

  window.triggerQueueSearchSubmit = function () {
    const input = $('queueSearchInput');
    if (input) state.queueSearchQuery = input.value.trim();
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
    const progressPct = Math.min(100, Math.max(0, Number(item.progress) || 0));
    const stageLabel = getStageLabelByProgress(progressPct);

    // 5 Stages based on percentage:
    // 1: 0% = รอคิว, 2: 25% = รับบรีฟ, 3: 50% = กำลังทำ, 4: 75% = กำลังเช็ค, 5: 100% = ส่งงานเรียบร้อย
    let activeStepIndex = 1;
    if (progressPct >= 100) activeStepIndex = 5;
    else if (progressPct >= 75) activeStepIndex = 4;
    else if (progressPct >= 50) activeStepIndex = 3;
    else if (progressPct >= 25) activeStepIndex = 2;
    else activeStepIndex = 1;

    const timelineSteps = [
      { step: 1, label: 'รอคิว', pct: '0%' },
      { step: 2, label: 'รับบรีฟ', pct: '25%' },
      { step: 3, label: 'กำลังทำ', pct: '50%' },
      { step: 4, label: 'กำลังเช็ค', pct: '75%' },
      { step: 5, label: 'ส่งงานเรียบร้อย', pct: '100%' }
    ];

    const maskText = (text, keepStart = 2, keepEnd = 2) => {
      if (!text) return '-';
      const str = String(text).trim();
      if (str.length <= 4) return str.slice(0, 1) + '***';
      return str.slice(0, keepStart) + '***' + str.slice(-keepEnd);
    };

    modal.innerHTML = `
      <div class="modal-card" style="max-width: 560px; width: 92%; max-height: 90vh; overflow-y: auto; padding: 2rem 1.8rem; border-radius: 26px; border: 1.5px solid #FFDFE9; background: #FFFFFF; box-shadow: 0 16px 36px rgba(244, 114, 182, 0.15);">
        
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.25rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="queue-pill-num">${escapeHTML(item.queue_number || 'Q-')}</span>
              <span class="queue-status-chip">
                ${escapeHTML(stageLabel)}
              </span>
            </div>
            <h2 style="font-size: 1.4rem; color: #38282D; margin: 0.65rem 0 0.2rem; font-weight: 800; font-family: var(--font-heading);">
              ${escapeHTML(item.job_name || 'งานออกแบบ')}
            </h2>
            <span class="queue-card-type-tag" style="color: #71515B; font-weight: 600;">${escapeHTML(item.job_type || 'งานออกแบบ')}</span>
          </div>
          <button type="button" onclick="closeQueueDetailModal()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #71515B; padding: 4px 8px;">✕</button>
        </div>

        <!-- 5-Step Timeline Graphic: Work Status -->
        ${qSettings.showTimeline !== false ? `
          <div style="background: #FFF9FC; border: 1.5px solid #FFDFE9; border-radius: 18px; padding: 1.25rem 1rem 0.85rem; margin-bottom: 1.35rem;">
            <div style="font-size: 0.9rem; font-weight: 800; color: #71515B; margin-bottom: 0.75rem; text-align: center; letter-spacing: 0.5px;">
              Work Status
            </div>
            <div class="queue-timeline-stepper">
              ${timelineSteps.map(s => {
                const isPassed = s.step < activeStepIndex;
                const isActive = s.step === activeStepIndex;
                const stateClass = isActive ? 'is-active' : (isPassed ? 'is-passed' : '');
                return `
                  <div class="queue-step-node ${stateClass}">
                    <div class="queue-step-circle" style="font-weight: 700;">
                      ${isPassed ? '✓' : s.step}
                    </div>
                    <div class="queue-step-title" style="color: #71515B; font-weight: ${isActive ? '700' : '500'}; font-size: 0.78rem;">${s.label}</div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Details Grid -->
        <div style="background: #FFF9FC; border-radius: 18px; padding: 1.25rem; margin-bottom: 1.25rem; border: 1.5px solid #FFDFE9;">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3" style="font-size: 0.9rem;">
            <div>
              <span style="color: #71515B; display: block; font-size: 0.8rem; font-weight: 600;">ชื่อลูกค้า:</span>
              <strong style="color: #38282D; font-size: 0.95rem;">${escapeHTML(item.customer_name || 'ลูกค้า')}</strong>
            </div>
            <div>
              <span style="color: #71515B; display: block; font-size: 0.8rem; font-weight: 600;">ช่องทางติดต่อ:</span>
              <strong style="color: #38282D; font-size: 0.95rem;">${escapeHTML(maskText(item.contact || item.line_id || item.phone, 2, 2))}</strong>
            </div>
            <div>
              <span style="color: #71515B; display: block; font-size: 0.8rem; font-weight: 600;">วันที่รับคิว:</span>
              <span style="color: #38282D;">${escapeHTML(item.queue_date || 'วันนี้')}</span>
            </div>
            <div>
              <span style="color: #71515B; display: block; font-size: 0.8rem; font-weight: 600;">อัปเดตล่าสุด:</span>
              <span style="color: #38282D;">${escapeHTML(item.updated_at || 'เมื่อสักครู่')}</span>
            </div>
          </div>

          ${item.description ? `
            <div style="margin-top: 0.85rem; padding-top: 0.85rem; border-top: 1px dashed #FFDFE9;">
              <span style="color: #71515B; display: block; font-size: 0.8rem; font-weight: 600; margin-bottom: 3px;">รายละเอียดงาน:</span>
              <div style="color: #38282D; line-height: 1.5; white-space: pre-line;">${escapeHTML(item.description)}</div>
            </div>
          ` : ''}

          ${item.note ? `
            <div style="margin-top: 0.85rem; background: #FFFFFF; border: 1.5px solid #FFDFE9; padding: 10px 14px; border-radius: 12px; font-size: 0.88rem; color: #71515B; box-shadow: 0 2px 6px rgba(113,81,91,0.03);">
              <strong style="color: #E05A88;">หมายเหตุ:</strong> ${escapeHTML(item.note)}
            </div>
          ` : ''}
        </div>

        <div style="display: flex; justify-content: flex-end;">
          <button type="button" class="btn btn-secondary" onclick="closeQueueDetailModal()" style="border-radius: 14px; padding: 0.65rem 1.75rem; font-weight: 700; background: #FFFFFF; border: 1.5px solid #FFDFE9; color: #71515B;">
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
          <!-- Kawaii Washi Note Header -->
          <div class="page-washi-header">
            <div class="washi-tape-strip"></div>
            <div>
              <span class="section-tag">Digital Catalog</span>
            </div>
            <h2 class="page-washi-title">สินค้ากราฟิกสำเร็จรูป</h2>
            <p class="page-washi-desc">ไฟล์คุณภาพสูง คมชัด 300 DPI ส่งมอบผ่าน Google Drive ทันทีหลังยืนยันการชำระเงิน</p>
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
          <!-- Kawaii Washi Note Header -->
          <div class="page-washi-header">
            <div class="washi-tape-strip"></div>
            <div>
              <span class="section-tag">VIP Community</span>
            </div>
            <h2 class="page-washi-title">เข้ากลุ่ม LINE VIP รวมทรัพยากร</h2>
            <p class="page-washi-desc">จ่ายครั้งเดียวเข้ากลุ่มถาวร เลือกใส่ตะกร้าได้หลายกลุ่มพร้อมกัน พร้อมรับการอัปเดตไฟล์ใหม่ตลอดชีพ</p>
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
      <section style="padding: 2rem 0 4.5rem;">
        <div class="container" style="max-width: 1120px;">

          <div class="gallery-ig-container">

            <!-- Left Column: Sticky Profile & Contact Card on iPad/Desktop -->
            <aside class="gallery-ig-sidebar" style="position: relative;">
              <!-- Washi Tape Decor (Pops out above card) -->
              <div class="washi-tape-strip"></div>

              <!-- Shop Status Badge (Top Right Corner of Card) -->
              <div class="ig-profile-status" style="position: absolute; top: 14px; right: 14px; margin: 0; background: ${(s.shopStatus === 'CLOSED' || s.shopStatus === 'ปิดร้าน') ? '#FFF1F2' : '#ECFDF5'}; border-color: ${(s.shopStatus === 'CLOSED' || s.shopStatus === 'ปิดร้าน') ? '#FECDD3' : '#A7F3D0'}; color: ${(s.shopStatus === 'CLOSED' || s.shopStatus === 'ปิดร้าน') ? '#BE123C' : '#047857'}; z-index: 10;">
                <span class="ig-status-dot" style="background: ${(s.shopStatus === 'CLOSED' || s.shopStatus === 'ปิดร้าน') ? '#EF4444' : '#10B981'};"></span>
                <span>${escapeHTML(s.shopStatusText || ((s.shopStatus === 'CLOSED' || s.shopStatus === 'ปิดร้าน') ? 'ปิดร้าน' : 'เปิดร้าน'))}</span>
              </div>

              <!-- Profile Avatar -->
              <div class="ig-profile-avatar-wrap">
                <img src="${escapeHTML(formatDriveImageUrl(s.profileImage) || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400')}" alt="Shop Profile" class="ig-profile-avatar" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400';">
              </div>

              <h2 class="ig-profile-name">${escapeHTML(s.shopName || 'BNC GraphMate Studio')}</h2>
              <div class="ig-profile-tagline">${escapeHTML(s.tagline || 'ร้านป้าย & กราฟิก สไตล์คิวท์ น่ารัก มินิมอล')}</div>

              <p style="font-size: 0.84rem; color: var(--text-muted); line-height: 1.5; margin: 0.75rem 0 1rem;">
                ${escapeHTML(s.shopBio || 'สตูดิโอออกแบบป้ายร้าน งานฟอนต์ลายมือ สติกเกอร์ และทรัพยากรกราฟิกพร้อมใช้')}
              </p>

              <!-- Contact us Section -->
              <div class="ig-contact-section">
                <div class="ig-contact-title">Contact us</div>
                <div class="ig-contact-buttons">
                  ${Store.getContactChannels().map(ch => {
                    const isTel = (ch.url || '').startsWith('tel:');
                    const isMail = (ch.url || '').startsWith('mailto:');
                    const target = (isTel || isMail) ? '' : 'target="_blank" rel="noopener noreferrer"';
                    const iconSvg = getContactChannelIcon(ch.platform, ch.url);
                    const label = ch.platform || 'ติดต่อ';
                    return `
                      <a href="${escapeHTML(ch.url || '#')}" ${target} class="fb-contact-btn" title="${escapeHTML(label)}" aria-label="${escapeHTML(label)}">
                        ${iconSvg}
                      </a>
                    `;
                  }).join('')}
                </div>
              </div>

              <!-- Direct Action Button -->
              <div style="margin-top: 1.25rem;">
                <a href="${escapeHTML(s.portfolioContactUrl || s.lineUrl || '#contact-us')}" target="${(s.portfolioContactUrl || s.lineUrl || '').startsWith('#') ? '_self' : '_blank'}" class="btn btn-primary" style="width: 100%; border-radius: 999px; font-weight: 800; padding: 0.7rem 1rem; font-size: 0.95rem; box-shadow: none !important; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 8px;">
                  <span>สนใจสั่งงาน (ติดต่อร้าน)</span>
                </a>
              </div>

              <!-- Quick Style Filter inside Sidebar -->
              <div style="margin-top: 1.5rem; border-top: 1.5px dashed var(--border); padding-top: 1rem; text-align: left;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.65rem;">
                  <span style="font-size: 0.85rem; font-weight: 700; color: #71515B;">เลือกสไตล์งาน</span>
                  ${state.portfolioStyleFilter !== 'ALL' ? `
                    <button type="button" class="btn btn-link btn-sm" onclick="filterPortfolioByStyle('ALL')" style="font-size: 0.75rem; color: var(--primary); padding: 0; text-decoration: underline;">
                      ดูทั้งหมด
                    </button>
                  ` : ''}
                </div>
                <!-- Scrollable pills container -->
                <div class="ig-pills-scroller" id="portStylePills" onwheel="if(event.deltaY!==0){event.preventDefault();this.scrollLeft+=event.deltaY;}">
                  ${styleCategories.map(st => {
                    const isActive = state.portfolioStyleFilter === st;
                    return `
                      <button type="button"
                        class="btn btn-sm ${isActive ? 'btn-primary' : 'btn-outline'}"
                        onclick="filterPortfolioByStyle('${escapeHTML(st)}')"
                        style="font-size: 0.78rem; padding: 4px 14px; border-radius: 999px; white-space: nowrap; flex-shrink: 0; ${isActive ? 'box-shadow: none !important;' : 'border-color: #FFDFE9; color: #71515B; background: #ffffff;'}">
                        ${st === 'ALL' ? 'ทุกสไตล์' : escapeHTML(st)}
                      </button>
                    `;
                  }).join('')}
                </div>
              </div>

              <!-- Pricing Mini-Table -->
              <div style="margin-top: 1.25rem; border-top: 1.5px dashed var(--border); padding-top: 1rem;">
                <div style="font-size: 0.85rem; font-weight: 700; color: #71515B; margin-bottom: 0.5rem;">ราคาเริ่มต้น</div>
                <table style="width: 100%; border-collapse: collapse; font-size: 0.78rem;">
                  <thead>
                    <tr style="background: #FFF0F5;">
                      <th style="padding: 5px 8px; text-align: left; color: #B26E86; font-weight: 700; border-radius: 6px 0 0 6px;">ประเภทงาน</th>
                      <th style="padding: 5px 8px; text-align: right; color: #B26E86; font-weight: 700; border-radius: 0 6px 6px 0; white-space: nowrap;">ราคา</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${(function() {
                      const pricingRows = Store.getPricingTable ? Store.getPricingTable() : [
                        { label: 'ป้ายเครดิต', price: 129 },
                        { label: 'ป้ายแอพพรี', price: 149 },
                        { label: 'ป้ายเติมเกม', price: 149 },
                        { label: 'งานสั่งทำพิเศษ', price: 199 }
                      ];
                      return pricingRows.slice(0, 4).map((row, ri) => `
                        <tr style="border-bottom: 1px solid #FFF0F5; ${ri % 2 === 1 ? 'background: #FFFBFD;' : ''}">
                          <td style="padding: 5px 8px; color: #71515B;">${escapeHTML(row.label)}</td>
                          <td style="padding: 5px 8px; text-align: right; color: #B24368; font-weight: 700;">฿${Number(row.price).toLocaleString()}+</td>
                        </tr>
                      `).join('');
                    })()}
                  </tbody>
                </table>
                <button type="button" onclick="openPricingDetailModal()" style="margin-top: 0.5rem; width: 100%; padding: 6px; border-radius: 999px; border: 1.5px solid #FFDFE9; background: #FFF7F9; color: #B26E86; font-size: 0.78rem; font-weight: 700; cursor: pointer;">
                  ดูราคาเพิ่มเติม
                </button>
              </div>
            </aside>

            <!-- Right Column: Instagram-style Vertical Feed Stream -->
            <main class="gallery-ig-feed">
              <!-- Feed Top Bar -->
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem; padding: 0 4px; flex-wrap: wrap; gap: 6px;">
                <div>
                  <h1 style="font-size: 1.25rem; color: #71515B; font-family: var(--font-heading); margin: 0; font-weight: 700;">
                    ${escapeHTML((!headings.portTitle || headings.portTitle.trim() === 'ผลงานการออกแบบ' || headings.portTitle.trim() === 'แกลเลอรีผลงานออกแบบ') ? 'My Gallery' : headings.portTitle)}
                  </h1>
                  <small style="color: var(--text-muted); font-size: 0.82rem;">
                    แสดง: <strong>${state.portfolioStyleFilter === 'ALL' ? 'ทุกสไตล์' : escapeHTML(state.portfolioStyleFilter)}</strong> (${filtered.length} ผลงาน)
                  </small>
                </div>
              </div>

              <!-- Feed Post Cards -->
              ${filtered.length > 0 ? filtered.map((item, idx) => {
                // Multi-image support: images array OR single image_url
                const rawImages = Array.isArray(item.images) && item.images.length > 0
                  ? item.images
                  : [item.image_url || item.cover_image || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=700'];
                const imgs = rawImages.map(u => formatDriveImageUrl(u));
                const firstImg = imgs[0];
                const hasMultiple = imgs.length > 1;

                // Real like count from Store (starts at 0)
                const realLikes = Store.getPortfolioLikes ? Store.getPortfolioLikes(item.id) : 0;
                const likesKey = 'BNC_PORTFOLIO_LIKES';
                let likesMap = {};
                try { likesMap = JSON.parse(localStorage.getItem(likesKey) || '{}'); } catch(e) {}
                const isLiked = !!likesMap[item.id];
                const totalLikes = realLikes + (isLiked ? 1 : 0);

                // Post date/time
                const postDate = item.created_at ? new Date(item.created_at) : null;
                const dateStr = postDate ? postDate.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: '2-digit' }) + ' \xB7 ' + postDate.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) : '';

                // Item Price (guaranteed valid price)
                const itemPrice = (item.price !== undefined && item.price !== null && Number(item.price) > 0)
                  ? Number(item.price)
                  : 129;

                return `
                  <article class="ig-post-card" id="ig-post-${escapeHTML(item.id)}">
                    <!-- Post Header -->
                    <div class="ig-post-header">
                      <div class="ig-post-author">
                        <img src="${escapeHTML(formatDriveImageUrl(s.profileImage) || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400')}" class="ig-post-author-img" alt="Author" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400';">
                        <div>
                          <div class="ig-post-author-name">${escapeHTML(s.shopName || 'BNC GraphMate Studio')}</div>
                          <div class="ig-post-author-sub">${dateStr || 'งานออกแบบกราฟิก 300 DPI'}</div>
                        </div>
                      </div>
                      <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                        <span class="ig-post-category-badge">${escapeHTML(item.style_category || item.category || 'งานออกแบบ')}</span>
                      </div>
                    </div>

                    <!-- Artwork Images (single or multi-image carousel) -->
                    ${hasMultiple ? `
                      <div class="ig-post-multi-images" id="gallery-${escapeHTML(item.id)}">
                        ${imgs.map((imgUrl, imgIdx) => `
                          <div class="ig-multi-img-slide" style="${imgIdx === 0 ? '' : 'display:none;'}">
                            <img src="${escapeHTML(imgUrl)}" alt="${escapeHTML(item.title)} ภาพ ${imgIdx + 1}" class="ig-post-image" loading="${imgIdx === 0 ? 'eager' : 'lazy'}" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=700';" ondblclick="togglePortfolioLike('${escapeHTML(item.id)}');">
                          </div>
                        `).join('')}
                        <div class="ig-multi-dots">
                          ${imgs.map((_, imgIdx) => `<span class="ig-multi-dot ${imgIdx === 0 ? 'active' : ''}" onclick="switchPostImage('${escapeHTML(item.id)}', ${imgIdx})"></span>`).join('')}
                        </div>
                        <div class="ig-multi-count-badge">${imgs.length} ภาพ</div>
                        ${imgs.length > 1 ? `
                          <button class="ig-multi-arrow ig-multi-prev" onclick="switchPostImagePrev('${escapeHTML(item.id)}', ${imgs.length})">&#8249;</button>
                          <button class="ig-multi-arrow ig-multi-next" onclick="switchPostImageNext('${escapeHTML(item.id)}', ${imgs.length})">&#8250;</button>
                        ` : ''}
                      </div>
                    ` : `
                      <div class="ig-post-image-wrap" onclick="openLightbox(${idx})" ondblclick="event.stopPropagation(); togglePortfolioLike('${escapeHTML(item.id)}');" title="คลิกเพื่อดูรูปขยาย หรือดับเบิ้ลคลิกเพื่อกดใจ">
                        <img src="${escapeHTML(firstImg)}" alt="${escapeHTML(item.title)}" class="ig-post-image" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=700';">
                      </div>
                    `}

                    <!-- Post Action Bar (Heart, Message/Contact, View Fullscreen) -->
                    <div class="ig-post-actions">
                      <div class="ig-actions-left">
                        <!-- Heart / Like Button (กดใจ) -->
                        <button type="button" 
                          id="like-btn-${escapeHTML(item.id)}" 
                          class="ig-action-btn ${isLiked ? 'is-liked' : ''}" 
                          onclick="togglePortfolioLike('${escapeHTML(item.id)}')" 
                          title="กดใจผลงานนี้" 
                          aria-label="ถูกใจ">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                          </svg>
                        </button>

                        <!-- Message / Contact Button (กดภาพเมสเสทเพื่อติดต่อสั่งงาน) -->
                        <button type="button" 
                          class="ig-action-btn" 
                          onclick="openWorkInquiryModal('${escapeHTML(item.id)}')" 
                          title="ทักแชท / สนใจสั่งงานชิ้นนี้" 
                          aria-label="ติดต่อสั่งงาน">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                          </svg>
                        </button>

                        <!-- View / Lightbox Button -->
                        <button type="button" 
                          class="ig-action-btn" 
                          onclick="openLightbox(${idx})" 
                          title="ดูภาพขนาดใหญ่" 
                          aria-label="ดูภาพขนาดใหญ่">
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"/>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                            <line x1="11" y1="8" x2="11" y2="14"/>
                            <line x1="8" y1="11" x2="14" y2="11"/>
                          </svg>
                        </button>
                      </div>

                      <!-- Fast Order CTA inside action bar -->
                      <button type="button" class="ig-post-order-btn" onclick="openWorkInquiryModal('${escapeHTML(item.id)}')">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                        <span>สนใจสั่งงาน</span>
                      </button>
                    </div>

                    <!-- Post Details / Caption -->
                    <div class="ig-post-body">
                      <div class="ig-post-likes">
                        ถูกใจ <span id="like-count-${escapeHTML(item.id)}">${totalLikes}</span> คน
                      </div>
                      <div style="font-size: 0.95rem; color: #B24368; font-weight: 800; margin: 4px 0 2px;">
                        ราคาเริ่มต้น ฿${itemPrice.toLocaleString()}
                      </div>
                      <div class="ig-post-caption">
                        <strong>${escapeHTML(s.shopName || 'BNC GraphMate')}</strong>
                        <span>${escapeHTML(item.title)}</span>
                      </div>
                      ${item.description ? `
                        <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 4px 0 6px; line-height: 1.45;">
                          ${escapeHTML(item.description)}
                        </p>
                      ` : ''}
                      ${(function() {
                        const cleanTag = str => (str || '').replace(/[^\p{L}\p{N}]/gu, '');
                        const tagShop = cleanTag(s.shopName || 'BNCGraphMate');
                        const tagCat = cleanTag(item.category || item.style_category || '');
                        const tagTitle = cleanTag(item.title || '');
                        const tags = [];
                        if (tagShop) tags.push('#' + tagShop);
                        if (tagCat) tags.push('#' + tagCat);
                        if (tagTitle) tags.push('#' + tagTitle);
                        if (tags.length === 0) return '';
                        return `<div style="font-size: 0.8rem; color: #B26E86; font-weight: 600; margin-top: 4px; word-break: break-word;">${tags.join(' ')}</div>`;
                      })()}
                    </div>
                  </article>
                `;
              }).join('') : `
                <div style="text-align: center; padding: 3rem 1.5rem; background: #ffffff; border: 1.5px solid #FFDFE9; border-radius: 24px;">
                  <p style="color: var(--text-muted); margin-bottom: 1rem;">ไม่พบผลงานในสไตล์ที่เลือก</p>
                  <button type="button" class="btn btn-secondary btn-sm" onclick="filterPortfolioByStyle('ALL')">ดูทุกสไตล์งาน</button>
                </div>
              `}
            </main>

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

  function formatCustomerContacts(cust) {
    if (!cust) return '-';
    if (Array.isArray(cust.contacts) && cust.contacts.length > 0) {
      const valid = cust.contacts.filter(c => c && (c.value || '').trim());
      if (valid.length > 0) {
        return valid.map(c => `${c.type || 'ติดต่อ'}: ${c.value}`).join(' | ');
      }
    }
    const parts = [];
    if (cust.line_id) parts.push(`LINE: ${cust.line_id}`);
    if (cust.phone) parts.push(`เบอร์โทร: ${cust.phone}`);
    if (cust.facebook) parts.push(`FB: ${cust.facebook}`);
    if (cust.instagram) parts.push(`IG: ${cust.instagram}`);
    return parts.length > 0 ? parts.join(' | ') : '-';
  }

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
    const maxStamps = Math.max(1, Number(stampCfg.maxStamps) || 10);
    const isCompleted = currentStamps >= maxStamps;

    container.innerHTML = `
      <section style="padding: 2.5rem 0 4rem;">
        <div class="container" style="max-width: 820px;">
          
          <!-- Kawaii Washi Note Header (Matching BNC GraphMate Tone) -->
          <div class="page-washi-header" style="margin-bottom: 2rem;">
            <div class="washi-tape-strip"></div>
            <h2 class="page-washi-title" style="color: var(--primary-deep); font-weight: 800;">${escapeHTML(stampCfg.cardTitle || 'บัตรสะสมแต้ม BNC GraphMate')}</h2>
            <p class="page-washi-desc">${escapeHTML(stampCfg.cardSubtitle || 'สะสมตราปั๊มครบตามจำนวน รับสิทธิ์ดาวน์โหลดฟอนต์ฟรี หรือของขวัญพิเศษจากทางร้านทันที')}</p>
          </div>

          <!-- Customer Search Input -->
          <div class="card" style="margin-bottom: 2rem; padding: 1.25rem 1.5rem; border-radius: 18px; border: 1.5px solid #FFDFE9;">
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
              *กรอกชื่อหรือช่องทางการติดต่อที่แจ้งไว้กับทางร้านตอนสั่งซื้อเพื่อดูจำนวนแต้มที่สะสมได้
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
            <div class="goodnotes-paper">
              
              <!-- Card Header Info -->
              <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px; border-bottom: 1.5px dashed #F8DBE7; padding-bottom: 14px;">
                <div>
                  <h3 style="margin: 0 0 4px; font-size: 1.25rem; color: var(--primary-deep); font-weight: 800;">
                    ${targetCustomer ? `บัตรสะสมแต้ม: ${escapeHTML(targetCustomer.name)}` : escapeHTML(stampCfg.cardTitle || 'บัตรสะสมแต้ม BNC GraphMate')}
                  </h3>
                  <div style="font-size: 0.85rem; color: var(--text-muted);">
                    ${targetCustomer ? `ช่องทางการติดต่อ: ${escapeHTML(formatCustomerContacts(targetCustomer))}` : 'กรุณากรอกชื่อเพื่อตรวจสอบแต้มสะสม'}
                  </div>
                </div>
                <div style="text-align: right;">
                  <span class="badge ${isCompleted ? 'badge--success' : 'badge--pink'}" style="font-size: 12px; font-weight: 700;">
                    ${isCompleted ? `สะสมครบ ${maxStamps} แต้มแล้ว` : `สะสมแล้ว ${currentStamps}/${maxStamps} แต้ม`}
                  </span>
                </div>
              </div>

              <!-- Stamp Grid (Dynamic Rows x Columns, Classic Postage Stamp with Perforated Scalloped Teeth) -->
              <div class="stamp-grid-10">
                ${Array.from({ length: maxStamps }).map((_, idx) => {
                  const num = idx + 1;
                  const isStamped = num <= currentStamps;
                  const customStampImg = stampCfg.stampIconUrl || stampCfg.mascotIcon;
                  const stampSvgFrame = `
                    <svg class="postage-stamp-svg-border" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path d="M 0 0 L 2.94 0 A 4.2 4.2 0 0 0 11.34 0 L 14.29 0 L 17.23 0 A 4.2 4.2 0 0 0 25.63 0 L 28.57 0 L 31.51 0 A 4.2 4.2 0 0 0 39.91 0 L 42.86 0 L 45.80 0 A 4.2 4.2 0 0 0 54.20 0 L 57.14 0 L 60.09 0 A 4.2 4.2 0 0 0 68.49 0 L 71.43 0 L 74.37 0 A 4.2 4.2 0 0 0 82.77 0 L 85.71 0 L 88.66 0 A 4.2 4.2 0 0 0 97.06 0 L 100.00 0 L 100 2.94 A 4.2 4.2 0 0 0 100 11.34 L 100 14.29 L 100 17.23 A 4.2 4.2 0 0 0 100 25.63 L 100 28.57 L 100 31.51 A 4.2 4.2 0 0 0 100 39.91 L 100 42.86 L 100 45.80 A 4.2 4.2 0 0 0 100 54.20 L 100 57.14 L 100 60.09 A 4.2 4.2 0 0 0 100 68.49 L 100 71.43 L 100 74.37 A 4.2 4.2 0 0 0 100 82.77 L 100 85.71 L 100 88.66 A 4.2 4.2 0 0 0 100 97.06 L 100 100.00 L 97.06 100 A 4.2 4.2 0 0 0 88.66 100 L 85.71 100 L 82.77 100 A 4.2 4.2 0 0 0 74.37 100 L 71.43 100 L 68.49 100 A 4.2 4.2 0 0 0 60.09 100 L 57.14 100 L 54.20 100 A 4.2 4.2 0 0 0 45.80 100 L 42.86 100 L 39.91 100 A 4.2 4.2 0 0 0 31.51 100 L 28.57 100 L 25.63 100 A 4.2 4.2 0 0 0 17.23 100 L 14.29 100 L 11.34 100 A 4.2 4.2 0 0 0 2.94 100 L 0.00 100 L 0 97.06 A 4.2 4.2 0 0 0 0 88.66 L 0 85.71 L 0 82.77 A 4.2 4.2 0 0 0 0 74.37 L 0 71.43 L 0 68.49 A 4.2 4.2 0 0 0 0 60.09 L 0 57.14 L 0 54.20 A 4.2 4.2 0 0 0 0 45.80 L 0 42.86 L 0 39.91 A 4.2 4.2 0 0 0 0 31.51 L 0 28.57 L 0 25.63 A 4.2 4.2 0 0 0 0 17.23 L 0 14.29 L 0 11.34 A 4.2 4.2 0 0 0 0 2.94 L 0 0.00 Z" fill="#FFFFFF" stroke="#FBCFE8" stroke-width="0.8" />
                    </svg>
                  `;

                  // Distinct, fun hand-stamped tilt angles and jitter
                  const slotTilts = [-6, 5, -4, 6, -5, 5.5, -6, 4.5, -5, 6, -4.5, 5, -6, 4];
                  const stampedTilts = [-8.5, 7.5, -6, 8, -7, 8.5, -8, 6.5, -7.5, 8.5, -6.5, 7.5, -8, 7];
                  const tilt = isStamped ? stampedTilts[idx % stampedTilts.length] : slotTilts[idx % slotTilts.length];
                  const offX = (((idx * 7) % 7) - 3);
                  const offY = (((idx * 11) % 7) - 3);

                  if (isStamped) {
                    return `
                      <div class="stamp-slot is-stamped" style="transform: rotate(${tilt}deg) translate(${offX}px, ${offY}px);" title="แต้มที่ ${num}: ปั๊มแล้ว">
                        ${stampSvgFrame}
                        <div class="stamp-slot-inner" style="animation: stampBouncePop 0.38s cubic-bezier(0.34, 1.56, 0.64, 1) both; animation-delay: ${idx * 110}ms;">
                          ${customStampImg ? `
                            <img src="${escapeHTML(formatDriveImageUrl(customStampImg))}" alt="Stamp" class="stamp-slot-art-img" onerror="this.outerHTML='<svg class=\\'stamp-note-icon\\' viewBox=\\'0 0 24 24\\' width=\\'42\\' height=\\'42\\' fill=\\'none\\' stroke=\\'%23FF6B97\\' stroke-width=\\'2.5\\' stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\'><path d=\\'M9 18V5l12-2v13\\'/><circle cx=\\'6\\' cy=\\'18\\' r=\\'3.2\\' fill=\\'%23FFB7CE\\'/><circle cx=\\'18\\' cy=\\'16\\' r=\\'3.2\\' fill=\\'%23FFB7CE\\'/></svg>';">
                          ` : `
                            <svg class="stamp-note-icon" viewBox="0 0 24 24" width="42" height="42" fill="none" stroke="#FF6B97" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                              <path d="M9 18V5l12-2v13" stroke="#71515B" stroke-width="2"/>
                              <circle cx="6" cy="18" r="3.2" fill="#FFB7CE" stroke="#71515B" stroke-width="1.5"/>
                              <circle cx="18" cy="16" r="3.2" fill="#FFB7CE" stroke="#71515B" stroke-width="1.5"/>
                            </svg>
                          `}
                        </div>
                      </div>
                    `;
                  } else {
                    return `
                      <div class="stamp-slot is-empty" style="transform: rotate(${tilt}deg) translate(${offX}px, ${offY}px);" title="แต้มที่ ${num}: ยังไม่ได้ปั๊ม">
                        ${stampSvgFrame}
                        <div class="stamp-slot-inner">
                          <span class="stamp-slot-num">${num}</span>
                        </div>
                      </div>
                    `;
                  }
                }).join('')}
              </div>

              <!-- Card Bottom Rules with Cute Music Note Bullet -->
              <div style="margin-top: 1.5rem; padding-top: 1.25rem; border-top: 1.5px dashed #FFDFE9; font-size: 0.86rem; color: var(--text); line-height: 1.9;">
                ${(stampCfg.rulesText || `ทุกออเดอร์งานป้าย ฟอนต์ หรือสินค้าสำเร็จ รับตราปั๊ม 1 ดวงทันที
สะสมครบกำหนด เลือกรับฟอนต์ลายมือน่ารักฟรี 1 ชุด หรือสิทธิ์รับงานออกแบบฟรี
ติดต่อแลกรางวัลได้ทาง LINE Official ของร้าน`)
                  .split('\n')
                  .filter(l => l.trim())
                  .map(line => `
                    <div style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 6px;">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C68EA0" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0; margin-top: 4px;"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3" fill="#FFB7CE"/><circle cx="18" cy="16" r="3" fill="#FFB7CE"/></svg>
                      <span>${escapeHTML(line)}</span>
                    </div>
                  `).join('')}
              </div>

            </div>
          </div>

          <!-- Flowing Reward Showcase (ตัวอย่างของรางวัลสะสมแต้ม) -->
          ${(() => {
            const rawRewards = (Array.isArray(stampCfg.rewards) && stampCfg.rewards.length > 0)
              ? stampCfg.rewards
              : [
                  { id: 'rw-1', title: 'ชุดฟอนต์ลายมือน่ารัก 1 ชุด', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400', points: `${maxStamps} แต้ม` },
                  { id: 'rw-2', title: 'ส่วนลดงานออกแบบป้าย 100฿', image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400', points: `${maxStamps} แต้ม` },
                  { id: 'rw-3', title: 'ฟรี! ป้ายเปิด-ปิดร้าน สไตล์มินิมอล', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=400', points: `${maxStamps} แต้ม` },
                  { id: 'rw-4', title: 'แพ็กสติกเกอร์ตกแต่งป้าย 1 เซ็ต', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400', points: `${maxStamps} แต้ม` }
                ];
            
            let loopList = [...rawRewards];
            while (loopList.length < 8) {
              loopList = loopList.concat(rawRewards);
            }

            // Order: 1. ภาพ (Image), 2. คำ (Title), 3. แต้ม (Badge - White BG, Deep font color)
            const renderRewardCard = r => `
              <div class="stamp-reward-card" title="${escapeHTML(r.title)}">
                <div class="stamp-reward-img-box">
                  <img src="${escapeHTML(formatDriveImageUrl(r.image) || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400')}" class="stamp-reward-img" alt="Reward" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400';">
                </div>
                <div class="stamp-reward-title">${escapeHTML(r.title)}</div>
                <span class="stamp-reward-points-badge">${escapeHTML(r.points || `${maxStamps} แต้ม`)}</span>
              </div>
            `;

            return `
              <div style="margin-top: 2.25rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; padding: 0 4px; flex-wrap: wrap; gap: 6px;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 50%; background: #FFB7CE; border: 1px solid #E2A3B7; color: #FFFFFF; box-shadow: 0 2px 5px rgba(226,163,183,0.35);">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="1"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    </span>
                    <h4 style="margin: 0; font-size: 1.08rem; color: var(--primary-deep); font-weight: 700;">ตัวอย่างของรางวัลสะสมแต้ม</h4>
                  </div>
                  <span style="font-size: 0.82rem; color: var(--text-muted);">${escapeHTML(stampCfg.rewardText || `สะสมครบ ${maxStamps} แต้ม แลกรับของขวัญได้ทันที`)}</span>
                </div>
                <div class="stamp-reward-marquee-container">
                  <div class="stamp-reward-marquee-track">
                    <div class="stamp-reward-marquee-group">
                      ${loopList.map(renderRewardCard).join('')}
                    </div>
                    <div class="stamp-reward-marquee-group" aria-hidden="true">
                      ${loopList.map(renderRewardCard).join('')}
                    </div>
                  </div>
                </div>
              </div>
            `;
          })()}

        </div>
      </section>
    `;


    // Play sweet sequential musical sound effect for each stamped heart
    if (currentStamps > 0 && typeof playCuteStampPopSound === 'function') {
      for (let i = 0; i < currentStamps; i++) {
        setTimeout(() => {
          if (typeof playCuteStampPopSound === 'function') playCuteStampPopSound(i);
        }, i * 160);
      }
    }
  }

  function renderReviewsView(container) {
    const s = Store.getSettings();
    const homeIds = Array.isArray(s.homeReviewIds) ? s.homeReviewIds : ['rev-1'];
    const allReviews = Store.getAllReviews();
    const pinnedReviews = allReviews.filter(r => r.is_pinned);
    const regularReviews = allReviews.filter(r => !r.is_pinned);

    container.innerHTML = `
      <section style="padding: 2.5rem 0 4rem;">
        <div class="container" style="max-width: 920px;">
          <!-- Kawaii Washi Note Header -->
          <div class="page-washi-header">
            <div class="washi-tape-strip"></div>
            <div>
              <span class="section-tag">Testimonials</span>
            </div>
            <h2 class="page-washi-title">รีวิวและความประทับใจจากลูกค้า</h2>
            <p class="page-washi-desc">คำชมและความประทับใจจากลูกค้าที่สั่งทำป้ายและซื้อฟอนต์กับ BNC GraphMate</p>
            <div style="margin-top: 1rem; display: flex; justify-content: center;">
              <button type="button" class="btn btn-primary" onclick="openReviewModal()" style="font-weight: 700; border-radius: 999px; padding: 0.55rem 1.8rem; font-size: 0.92rem; box-shadow: none !important;">
                + เขียนรีวิวร้าน
              </button>
            </div>
          </div>

          <!-- Pinned Reviews Board (White-Pink Note Paper with Pushpin) -->
          ${pinnedReviews.length > 0 ? `
            <div class="pinned-reviews-board">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 1.25rem;">
                <span style="font-size: 1.3rem;"></span>
                <h3 style="margin: 0; font-size: 1.15rem; color: var(--primary-deep);">รีวิวปักหมุดแนะนำ</h3>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                ${pinnedReviews.map(r => {
                  const isHome = homeIds.includes(r.id);
                  const hasProof = !!(r.proof_image || r.proof_image_url || r.image_url);
                  return `
                  <div class="pinned-review-card" style="cursor: pointer;" onclick="if (!event.target.closest('button')) viewReviewDetailModal('${r.id}')" title="คลิกเพื่อดูรีวิวและหลักฐาน">
                    <div class="pushpin-pin"></div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                      <span class="pinned-tape-badge">รีวิวแนะนำ</span>
                      <span style="color: #F59E0B; font-size: 1rem;">${'★'.repeat(r.rating || 5)}</span>
                    </div>
                    <div style="font-weight: 700; color: var(--text); font-size: 1.05rem; margin-bottom: 4px;">${escapeHTML(r.customer_name || 'ลูกค้า')}</div>
                    ${r.product_name ? `<span class="badge badge--pink" style="margin-bottom: 0.6rem; display: inline-block;">${escapeHTML(r.product_name)}</span>` : ''}
                    <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6; margin: 0 0 0.75rem;">${escapeHTML(r.message)}</p>
                    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1.5px dashed var(--border); padding-top: 8px; margin-top: 8px; flex-wrap: wrap; gap: 6px;">
                      <div>
                        ${hasProof ? `
                          <button type="button" class="btn btn-outline btn-sm" onclick="viewReviewDetailModal('${r.id}')" style="font-size: 11px; padding: 2px 8px; color: #B24368; border-color: #FFB6CE; background: #FFF0F5;">
                            ดูหลักฐานการซื้อขาย
                          </button>
                        ` : ''}
                      </div>
                      ${state.isAdmin ? `
                        <div style="display: flex; gap: 6px;">
                          <button type="button" class="btn btn-sm ${isHome ? 'btn-primary' : 'btn-outline'}" onclick="toggleHomeReview('${r.id}')" style="font-size: 11px; padding: 2px 8px;">
                            ${isHome ? 'แสดงหน้าโฮม' : 'โชว์หน้าโฮม'}
                          </button>
                          <button type="button" class="btn btn-outline btn-sm" onclick="togglePinReview('${r.id}')" style="font-size: 11px; padding: 2px 8px;">ปลดหมุด</button>
                        </div>
                      ` : ''}
                    </div>
                  </div>
                `;}).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Regular Reviews Grid -->
          <div style="margin-top: 2rem;">
            <h4 style="font-size: 1.05rem; margin-bottom: 1rem; color: var(--text-muted);">รีวิวทั้งหมด (${allReviews.length} รีวิว)</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              ${regularReviews.map(r => {
                const isHome = homeIds.includes(r.id);
                const hasProof = !!(r.proof_image || r.proof_image_url || r.image_url);
                return `
                <div class="card" style="cursor: pointer;" onclick="if (!event.target.closest('button')) viewReviewDetailModal('${r.id}')" title="คลิกเพื่อดูรีวิวและหลักฐาน">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.65rem;">
                    <span style="font-weight: 700; color: var(--text); font-size: 1rem;">${escapeHTML(r.customer_name || 'ลูกค้า')}</span>
                    <span style="color: #F59E0B; font-size: 1rem;">${'★'.repeat(r.rating || 5)}</span>
                  </div>
                  ${r.product_name ? `<span class="badge badge--pink" style="margin-bottom: 0.5rem;">${escapeHTML(r.product_name)}</span>` : ''}
                  <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6; margin: 0 0 0.75rem;">${escapeHTML(r.message)}</p>
                  <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1.5px dashed var(--border); padding-top: 8px; margin-top: 8px; flex-wrap: wrap; gap: 6px;">
                    <div>
                      ${hasProof ? `
                        <button type="button" class="btn btn-outline btn-sm" onclick="viewReviewDetailModal('${r.id}')" style="font-size: 11px; padding: 2px 8px; color: #B24368; border-color: #FFB6CE; background: #FFF0F5;">
                          ดูหลักฐานการซื้อขาย
                        </button>
                      ` : ''}
                    </div>
                    ${state.isAdmin ? `
                      <div style="display: flex; gap: 6px;">
                        <button type="button" class="btn btn-sm ${isHome ? 'btn-primary' : 'btn-outline'}" onclick="toggleHomeReview('${r.id}')" style="font-size: 11px; padding: 2px 8px;">
                          ${isHome ? 'แสดงหน้าโฮม' : 'โชว์หน้าโฮม'}
                        </button>
                        <button type="button" class="btn btn-outline btn-sm" onclick="togglePinReview('${r.id}')" style="font-size: 11px; padding: 2px 8px;">ปักหมุด</button>
                      </div>
                    ` : ''}
                  </div>
                </div>
              `;}).join('')}
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

  window.toggleHomeReview = function (id) {
    Store.toggleHomeReview(id);
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

          <div style="text-align: center; margin-top: 1.5rem;">
            <button type="button" id="btnRefreshOrders" class="btn btn-outline btn-sm" onclick="refreshOrdersView(this)" style="gap: 6px;">
              รีเฟรชออเดอร์
            </button>
          </div>
        </div>
      </section>
    `;

    // Auto-sync from cloud every time orders page is opened
    Store.syncFromCloud((isOk) => {
      if (isOk && state.view === 'orders') {
        renderCurrentView();
      }
    });
  }

  window.refreshOrdersView = function(btn) {
    if (btn) { btn.textContent = 'กำลังโหลด...'; btn.disabled = true; }
    Store.syncFromCloud((isOk) => {
      if (state.view === 'orders') renderCurrentView();
      if (btn) { btn.textContent = 'รีเฟรชออเดอร์'; btn.disabled = false; }
    });
  };

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

  window.copyTextToClipboard = function (text, btn) {
    if (!text) return;
    const doFeedback = () => {
      if (!btn) return;
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
      navigator.clipboard.writeText(text).then(doFeedback).catch(() => { prompt('คัดลอก:', text); });
    } else {
      prompt('คัดลอก:', text);
      doFeedback();
    }
  };

  function renderAdminView(container) {
 const s = Store.getSettings();

  // Check if Admin is Authenticated
  if (!state.isAdmin) {
    container.innerHTML = `
      <section style="min-height: 80vh; display: flex; align-items: center; justify-content: center; padding: 2.5rem 1rem;">
        <div class="card" style="box-shadow: var(--shadow-lg); border-color: var(--border); max-width: 420px; width: 100%; padding: 2.25rem 1.75rem; border-radius: 24px; background: var(--card);">
          
          <div style="text-align: center; margin-bottom: 1.75rem;">
            <div style="width: 58px; height: 58px; border-radius: 18px; background: var(--primary-light); color: var(--primary-deep); display: inline-flex; align-items: center; justify-content: center; margin-bottom: 0.85rem; border: 1.5px solid var(--border); box-shadow: var(--shadow-sm);">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <h2 style="font-size: 1.4rem; font-weight: 800; margin: 0 0 0.35rem; color: var(--text); font-family: var(--font-heading);">
              เข้าสู่ระบบหลังบ้าน
            </h2>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">
              กรอกอีเมลและรหัสผ่านเพื่อเข้าสู่ระบบจัดการร้านค้า
            </p>
          </div>

          <form onsubmit="handleAdminLogin(event)">
            <div class="form-group" style="margin-bottom: 1.1rem;">
              <label class="form-label" style="font-weight: 600; font-size: 0.85rem;">อีเมลผู้ดูแลร้าน (Email)</label>
              <input type="email" id="authEmail" class="form-input" placeholder="admin@bnc.com" required autocomplete="email">
            </div>

            <div class="form-group" style="margin-bottom: 1.35rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                <label class="form-label" style="margin: 0; font-weight: 600; font-size: 0.85rem;">รหัสผ่าน (Password)</label>
                <span style="font-size: 0.78rem; color: var(--primary); cursor: pointer; font-weight: 600;" onclick="togglePasswordVisibility('authPassword')">ดูรหัส</span>
              </div>
              <input type="password" id="authPassword" class="form-input" placeholder="••••••••" required minlength="6" autocomplete="current-password">
            </div>

            <div id="authErrorMessage" style="display: none; padding: 0.65rem 0.85rem; border-radius: 10px; background: #fee2e2; color: #b91c1c; font-size: 0.82rem; margin-bottom: 1rem; border: 1px solid #fca5a5;"></div>

            <button type="submit" id="authSubmitBtn" class="btn btn-primary" style="width: 100%; border-radius: 14px; font-weight: 700; padding: 0.85rem; font-size: 0.95rem; box-shadow: var(--shadow-sm);">
              เข้าสู่ระบบ
            </button>
          </form>

          <div style="margin-top: 1.5rem; text-align: center; font-size: 0.8rem; color: var(--text-muted); line-height: 1.4;">
            บัญชีทดสอบเริ่มต้น: <code>admin@bnc.com</code> / รหัสผ่าน: <code>123456</code>
          </div>

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
  <span class="badge badge--pink" style="margin-bottom: 0.35rem;">
    Admin Studio
  </span>
  <h1 style="font-size: 1.5rem; margin: 0;">ระบบจัดการร้านค้า</h1>
  <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 0.2rem;">
    ผู้ดูแล: <strong>${state.adminUser?.email || 'admin@bnc.com'}</strong>
  </div>
  </div>
  <div style="display: flex; gap: 0.5rem; align-items: center;">
  <button type="button" class="btn btn-outline btn-sm" onclick="syncCloudManual()">รีเฟรช Cloud</button>
  <button type="button" class="btn btn-outline btn-sm" style="color: #dc2626; border-color: #fca5a5;" onclick="handleAdminLogout()">ออกจากระบบ</button>
  </div>
  </div></div>
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
    const pricingRows = Store.getPricingTable ? Store.getPricingTable() : [];
    const s = Store.getSettings();
    const headings = s.headings || {};
    const rawHeading = (headings.portTitle || '').trim();
    const galleryHeading = (!rawHeading || rawHeading === 'ผลงานการออกแบบ' || rawHeading === 'แกลเลอรีผลงานออกแบบ') ? 'My Gallery' : rawHeading;
    const isOpen = (s.shopStatus !== 'CLOSED' && s.shopStatus !== 'ปิดร้าน');

    if (!state.portfolioAccordions) {
      state.portfolioAccordions = { gallerySettings: false, portfolioItems: true, pricingTable: false };
    }
    const isGalleryOpen = !!state.portfolioAccordions.gallerySettings;
    const isItemsOpen = !!state.portfolioAccordions.portfolioItems;
    const isPricingOpen = !!state.portfolioAccordions.pricingTable;

    return `
      <!-- 1. Gallery & Profile Settings Card -->
      <div class="card" style="border-radius: 18px; margin-bottom: 1.25rem; border: 1.5px solid #FFDFE9; background: #FFFBFD; overflow: hidden; padding: 0;">
        <div id="accordion-header-gallerySettings" onclick="togglePortfolioAccordion('gallerySettings')" style="display: flex; justify-content: space-between; align-items: center; padding: 1.1rem 1.25rem; cursor: pointer; background: #FFF7F9; border-bottom: ${isGalleryOpen ? '1px solid #FFDFE9' : 'none'}; user-select: none; transition: background 0.2s;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 10px; background: #FFE4EE; color: #B26E86; font-size: 0.95rem; font-weight: 800;">1</span>
            <div>
              <h3 style="margin: 0; color: var(--primary-deep); font-size: 1.15rem; font-weight: 700;">ตั้งค่าหน้าผลงาน &amp; โปรไฟล์ร้าน</h3>
              <p style="font-size: 0.82rem; color: var(--text-muted); margin: 2px 0 0 0;">จัดการหัวข้อ สโลแกน แนะนำร้าน รูปโปรไฟล์ หมวดหมู่ และสถานะเปิด/ปิดร้าน</p>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <button type="button" class="btn btn-primary btn-sm" onclick="event.stopPropagation(); saveGallerySettingsAdmin();" style="box-shadow: none !important; font-size: 0.8rem; padding: 5px 12px;">
              บันทึกการตั้งค่า
            </button>
            <span id="accordion-badge-gallerySettings" class="badge" style="background: ${isGalleryOpen ? '#FFE4EE' : '#FFF0F5'}; color: #B26E86; font-size: 0.78rem; font-weight: 700; border: 1px solid #FFDFE9; padding: 4px 10px; border-radius: 999px;">
              ${isGalleryOpen ? 'ย่อเก็บ' : 'คลิกเพื่อขยาย'}
            </span>
            <span id="accordion-arrow-gallerySettings" style="display: inline-block; transition: transform 0.25s ease; transform: ${isGalleryOpen ? 'rotate(180deg)' : 'rotate(0deg)'}; color: #B26E86; font-weight: 700; font-size: 0.85rem;">
              ▼
            </span>
          </div>
        </div>

        <div id="accordion-body-gallerySettings" style="display: ${isGalleryOpen ? 'block' : 'none'}; padding: 1.25rem;">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
            <!-- Heading -->
            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">หัวข้อหน้าผลงาน (Heading)</label>
              <input type="text" id="adminGalleryHeading" class="form-input" value="${escapeHTML(galleryHeading)}" placeholder="เช่น My Gallery">
            </div>

            <!-- Shop Status (เปิดร้าน / ปิดร้าน) -->
            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">สถานะร้าน (Status)</label>
              <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 6px;">
                <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 0.9rem; font-weight: 700; color: #047857;">
                  <input type="radio" name="adminShopStatus" value="OPEN" ${isOpen ? 'checked' : ''} onchange="document.getElementById('adminShopStatusCustom').value='เปิดร้าน'">
                  <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #10B981;"></span>
                  <span>เปิดร้าน</span>
                </label>
                <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 0.9rem; font-weight: 700; color: #BE123C;">
                  <input type="radio" name="adminShopStatus" value="CLOSED" ${!isOpen ? 'checked' : ''} onchange="document.getElementById('adminShopStatusCustom').value='ปิดร้าน'">
                  <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #EF4444;"></span>
                  <span>ปิดร้าน</span>
                </label>
              </div>
              <input type="text" id="adminShopStatusCustom" class="form-input" placeholder="ข้อความสถานะ (เช่น เปิดร้าน หรือ ปิดร้าน)" value="${escapeHTML(s.shopStatusText || (isOpen ? 'เปิดร้าน' : 'ปิดร้าน'))}">
            </div>

            <!-- Shop Name -->
            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">ชื่อร้าน (Shop Name)</label>
              <input type="text" id="adminGalleryShopName" class="form-input" value="${escapeHTML(s.shopName || 'BNC GraphMate Studio')}" placeholder="เช่น BNC GraphMate Studio">
            </div>

            <!-- Tagline -->
            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">สโลแกนร้าน (Tagline)</label>
              <input type="text" id="adminGalleryTagline" class="form-input" value="${escapeHTML(s.tagline || 'ร้านป้าย & กราฟิก สไตล์คิวท์ น่ารัก มินิมอล')}" placeholder="สโลแกนใต้ชื่อร้าน">
            </div>
          </div>

          <!-- Bio -->
          <div class="form-group" style="margin-bottom: 1rem;">
            <label class="form-label" style="font-weight: 700;">ข้อความแนะนำร้าน (Bio)</label>
            <textarea id="adminGalleryBio" class="form-textarea" rows="2" placeholder="ข้อความแนะนำร้านในหน้าผลงาน">${escapeHTML(s.shopBio || 'สตูดิโอออกแบบป้ายร้าน งานฟอนต์ลายมือ สติกเกอร์ และทรัพยากรกราฟิกพร้อมใช้')}</textarea>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
            <!-- Profile Image -->
            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">ภาพโปรไฟล์ (Profile Image)</label>
              <div style="display: flex; gap: 8px; align-items: center;">
                <img id="adminGalleryProfilePreview" src="${escapeHTML(formatDriveImageUrl(s.profileImage) || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400')}" style="width: 42px; height: 42px; border-radius: 50%; object-fit: cover; border: 2px solid #FFDFE9; flex-shrink: 0;" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400';">
                <input type="text" id="adminGalleryProfileImage" class="form-input" value="${escapeHTML(s.profileImage || '')}" placeholder="วางลิงก์รูปภาพ (URL)" style="flex: 1;" oninput="document.getElementById('adminGalleryProfilePreview').src = this.value;">
                <label class="btn btn-outline btn-sm" style="flex-shrink: 0; margin: 0; padding: 6px 12px; cursor: pointer; white-space: nowrap; border-color: #FFDFE9; color: #71515B; background: #FFF7F9;">
                  เลือกรูป
                  <input type="file" accept="image/*" style="display:none;" onchange="handleGalleryProfileImageUpload(event)">
                </label>
              </div>
            </div>

            <!-- Contact / Order Button URL -->
            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">ลิงก์ปุ่ม &quot;สนใจสั่งงาน (ติดต่อร้าน)&quot;</label>
              <input type="text" id="adminGalleryContactUrl" class="form-input" value="${escapeHTML(s.portfolioContactUrl || s.lineUrl || '')}" placeholder="เช่น https://line.me/ti/p/~... หรือ #contact-us">
            </div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-bottom: 1.25rem;">
            <!-- Portfolio Categories -->
            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">หมวดหมู่ป้าย / ราคา (Portfolio Categories)</label>
              <input type="text" id="adminGalleryCategories" class="form-input" value="${escapeHTML(Array.isArray(s.categories?.portfolio) ? s.categories.portfolio.join(', ') : (s.categories?.portfolio || 'ป้ายเครดิต, ป้ายแอพพรี, ป้ายเติมเกม, ป้ายเปิดร้าน, ป้ายโปรโมชั่น, งานป้ายสั่งทำพิเศษ'))}">
              <small style="color: var(--text-muted); font-size: 0.78rem;">แยกแต่ละหมวดหมู่ด้วยเครื่องหมายจุลภาค (,)</small>
            </div>

            <!-- Portfolio Styles (Filter Tabs) -->
            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">หมวดหมู่สไตล์งานออกแบบ (Filter Pills Tabs)</label>
              <input type="text" id="adminGalleryStyles" class="form-input" value="${escapeHTML(Array.isArray(s.categories?.portfolioStyles) ? s.categories.portfolioStyles.join(', ') : (s.categories?.portfolioStyles || 'สไตล์มินิมอล & คาเฟ่, สไตล์การ์ตูน & คาวาอี้, สไตล์ลายมือ & ฟอนต์, สไตล์ร้านค้า & โมเดิร์น, ไฟล์ตกแต่ง & เทมเพลต'))}">
              <small style="color: var(--text-muted); font-size: 0.78rem;">แยกด้วยเครื่องหมายจุลภาค (,) รายการนี้จะขึ้นเป็นปุ่มให้ลูกค้ากดเลือกสไตล์ในหน้าผลงาน</small>
            </div>
          </div>

          <button type="button" class="btn btn-primary btn-sm" onclick="saveGallerySettingsAdmin()" style="box-shadow: none !important;">
            บันทึกการตั้งค่าหน้าผลงาน
          </button>
        </div>
      </div>

      <!-- 2. Portfolio Card Grid -->
      <div class="card" style="border-radius: 18px; margin-bottom: 1.25rem; border: 1.5px solid #FFDFE9; background: #FFFBFD; overflow: hidden; padding: 0;">
        <div id="accordion-header-portfolioItems" onclick="togglePortfolioAccordion('portfolioItems')" style="display: flex; justify-content: space-between; align-items: center; padding: 1.1rem 1.25rem; cursor: pointer; background: #FFF7F9; border-bottom: ${isItemsOpen ? '1px solid #FFDFE9' : 'none'}; user-select: none; transition: background 0.2s;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 10px; background: #FFE4EE; color: #B26E86; font-size: 0.95rem; font-weight: 800;">2</span>
            <div>
              <h3 style="margin: 0; color: var(--primary-deep); font-size: 1.15rem; font-weight: 700;">จัดการรูปผลงาน</h3>
              <p style="font-size: 0.82rem; color: var(--text-muted); margin: 2px 0 0 0;">${portfolio.length} ผลงาน — เพิ่มผลงานใหม่ แก้ไขรูปภาพ ราคา หรือลบผลงาน</p>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <button type="button" class="btn btn-primary btn-sm" onclick="event.stopPropagation(); openAddPortfolioModal();" style="box-shadow: none !important; font-size: 0.8rem; padding: 5px 12px;">+ เพิ่มผลงานใหม่</button>
            <span id="accordion-badge-portfolioItems" class="badge" style="background: ${isItemsOpen ? '#FFE4EE' : '#FFF0F5'}; color: #B26E86; font-size: 0.78rem; font-weight: 700; border: 1px solid #FFDFE9; padding: 4px 10px; border-radius: 999px;">
              ${isItemsOpen ? 'ย่อเก็บ' : 'คลิกเพื่อขยาย'}
            </span>
            <span id="accordion-arrow-portfolioItems" style="display: inline-block; transition: transform 0.25s ease; transform: ${isItemsOpen ? 'rotate(180deg)' : 'rotate(0deg)'}; color: #B26E86; font-weight: 700; font-size: 0.85rem;">
              ▼
            </span>
          </div>
        </div>

        <div id="accordion-body-portfolioItems" style="display: ${isItemsOpen ? 'block' : 'none'}; padding: 1.25rem;">
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px;">
            ${portfolio.length === 0 ? `<div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-muted);">ยังไม่มีผลงาน กดปุ่มเพิ่มผลงานใหม่</div>` : ''}
            ${portfolio.map(item => {
              const thumbImg = Array.isArray(item.images) && item.images.length > 0
                ? item.images[0]
                : (item.image_url || '');
              const imgCount = Array.isArray(item.images) ? item.images.length : (item.image_url ? 1 : 0);
              const likes = Store.getPortfolioLikes ? Store.getPortfolioLikes(item.id) : 0;
              const dateStr = item.created_at ? new Date(item.created_at).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: '2-digit' }) : '';
              return `
                <div style="background: #FFFBFD; border: 1.5px solid #FFDFE9; border-radius: 14px; overflow: hidden; position: relative;">
                  <div style="position: relative; aspect-ratio: 1; background: #FFF0F5; overflow: hidden;">
                    <img src="${escapeHTML(thumbImg)}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400';">
                    ${imgCount > 1 ? `<div style="position: absolute; top: 6px; right: 6px; background: rgba(0,0,0,0.55); color: #fff; font-size: 0.7rem; font-weight: 700; padding: 2px 7px; border-radius: 999px;">${imgCount} ภาพ</div>` : ''}
                  </div>
                  <div style="padding: 10px 12px;">
                    <div style="font-weight: 700; font-size: 0.88rem; color: #71515B; margin-bottom: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${escapeHTML(item.title || '')}">${escapeHTML(item.title || 'My Gallery')}</div>
                    <div style="display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 6px;">
                      <span class="badge" style="background:#FFF0F7; color:#9D174D; border:1px solid #FBCFE8; font-size: 0.72rem;">${escapeHTML(item.style_category || 'ทั่วไป')}</span>
                      <span class="badge badge--pink" style="font-size: 0.72rem;">${escapeHTML(item.category || 'ป้าย')}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                      <span style="font-size: 0.8rem; color: #B24368; font-weight: 700;">฿${Number(item.price || 129).toLocaleString()}</span>
                      <span style="font-size: 0.73rem; color: var(--text-muted);">${dateStr}</span>
                    </div>
                    <div style="display: flex; gap: 6px;">
                      <button type="button" class="btn btn-outline btn-sm" onclick="openEditPortfolioModal('${item.id}')" style="flex: 1; font-size: 0.8rem; padding: 4px 8px;">แก้ไข</button>
                      <button type="button" class="btn btn-outline btn-sm" onclick="deletePortfolioItemAction('${item.id}')" style="color:#E11D48; border-color:#FECDD3; font-size: 0.8rem; padding: 4px 8px;">ลบ</button>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>

      <!-- 3. Pricing Table Editor -->
      <div class="card" style="border-radius: 18px; border: 1.5px solid #FFDFE9; background: #FFFBFD; overflow: hidden; padding: 0;">
        <div id="accordion-header-pricingTable" onclick="togglePortfolioAccordion('pricingTable')" style="display: flex; justify-content: space-between; align-items: center; padding: 1.1rem 1.25rem; cursor: pointer; background: #FFF7F9; border-bottom: ${isPricingOpen ? '1px solid #FFDFE9' : 'none'}; user-select: none; transition: background 0.2s;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 10px; background: #FFE4EE; color: #B26E86; font-size: 0.95rem; font-weight: 800;">3</span>
            <div>
              <h3 style="margin: 0; color: var(--primary-deep); font-size: 1.15rem; font-weight: 700;">ตั้งค่าตารางราคา</h3>
              <p style="font-size: 0.82rem; color: var(--text-muted); margin: 2px 0 0 0;">แสดงใน Sidebar หรือกล่องดูราคาในหน้าผลงาน My Gallery (${pricingRows.length} รายการ)</p>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <button type="button" class="btn btn-outline btn-sm" onclick="event.stopPropagation(); if(!state.portfolioAccordions?.pricingTable) togglePortfolioAccordion('pricingTable'); addPricingRow();" style="border-color: #FFDFE9; color: #71515B; font-size: 0.8rem; padding: 5px 10px;">+ เพิ่มรายการ</button>
            <span id="accordion-badge-pricingTable" class="badge" style="background: ${isPricingOpen ? '#FFE4EE' : '#FFF0F5'}; color: #B26E86; font-size: 0.78rem; font-weight: 700; border: 1px solid #FFDFE9; padding: 4px 10px; border-radius: 999px;">
              ${isPricingOpen ? 'ย่อเก็บ' : 'คลิกเพื่อขยาย'}
            </span>
            <span id="accordion-arrow-pricingTable" style="display: inline-block; transition: transform 0.25s ease; transform: ${isPricingOpen ? 'rotate(180deg)' : 'rotate(0deg)'}; color: #B26E86; font-weight: 700; font-size: 0.85rem;">
              ▼
            </span>
          </div>
        </div>

        <div id="accordion-body-pricingTable" style="display: ${isPricingOpen ? 'block' : 'none'}; padding: 1.25rem;">
          <div id="pricingRowsContainer">
            ${pricingRows.map((row, ri) => `
              <div class="pricing-admin-row" id="pricing-row-${ri}" style="display: flex; gap: 8px; align-items: center; margin-bottom: 8px;">
                <input type="text" value="${escapeHTML(row.label)}" placeholder="ชื่อบริการ" class="form-input" style="flex: 1; font-size: 0.85rem; padding: 6px 10px;" onchange="updatePricingRow(${ri}, 'label', this.value)">
                <input type="number" value="${Number(row.price)}" placeholder="ราคา" class="form-input" style="width: 90px; font-size: 0.85rem; padding: 6px 10px;" onchange="updatePricingRow(${ri}, 'price', Number(this.value))">
                <button type="button" onclick="deletePricingRow(${ri})" style="background: none; border: none; color: #E11D48; cursor: pointer; font-size: 1rem; padding: 4px;">x</button>
              </div>
            `).join('')}
          </div>
          <button type="button" class="btn btn-primary btn-sm" onclick="savePricingTableAdmin()" style="margin-top: 0.75rem; box-shadow: none !important;">บันทึกตารางราคา</button>
        </div>
      </div>
    `;
  }

  // Accordion Toggle Function
  window.togglePortfolioAccordion = function (key) {
    if (!state.portfolioAccordions) {
      state.portfolioAccordions = { gallerySettings: false, portfolioItems: true, pricingTable: false };
    }
    state.portfolioAccordions[key] = !state.portfolioAccordions[key];
    const isOpen = state.portfolioAccordions[key];
    const body = document.getElementById('accordion-body-' + key);
    const arrow = document.getElementById('accordion-arrow-' + key);
    const badge = document.getElementById('accordion-badge-' + key);
    const header = document.getElementById('accordion-header-' + key);
    if (body) body.style.display = isOpen ? 'block' : 'none';
    if (arrow) arrow.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
    if (badge) {
      badge.textContent = isOpen ? 'ย่อเก็บ' : 'คลิกเพื่อขยาย';
      badge.style.background = isOpen ? '#FFE4EE' : '#FFF0F5';
    }
    if (header) {
      header.style.borderBottom = isOpen ? '1px solid #FFDFE9' : 'none';
    }
  };

  // Pricing table editor helpers
  let _pricingRowsCache = null;
  window.addPricingRow = function () {
    const rows = Store.getPricingTable ? Store.getPricingTable() : [];
    rows.push({ label: '', price: 0 });
    const container = document.getElementById('pricingRowsContainer');
    if (!container) return;
    const ri = rows.length - 1;
    const div = document.createElement('div');
    div.className = 'pricing-admin-row';
    div.id = `pricing-row-${ri}`;
    div.style.cssText = 'display: flex; gap: 8px; align-items: center; margin-bottom: 8px;';
    div.innerHTML = `
      <input type="text" value="" placeholder="ชื่อบริการ" class="form-input" style="flex: 1; font-size: 0.85rem; padding: 6px 10px;" onchange="updatePricingRow(${ri}, 'label', this.value)">
      <input type="number" value="0" placeholder="ราคา" class="form-input" style="width: 90px; font-size: 0.85rem; padding: 6px 10px;" onchange="updatePricingRow(${ri}, 'price', Number(this.value))">
      <button type="button" onclick="deletePricingRow(${ri})" style="background: none; border: none; color: #E11D48; cursor: pointer; font-size: 1rem; padding: 4px;">x</button>
    `;
    container.appendChild(div);
  };

  window.updatePricingRow = function (ri, field, value) {
    // Value kept in DOM inputs and collected on savePricingTableAdmin
  };

  window.deletePricingRow = function (ri) {
    const div = document.getElementById(`pricing-row-${ri}`);
    if (div) div.remove();
  };

  window.savePricingTableAdmin = async function () {
    const rows = [];
    document.querySelectorAll('.pricing-admin-row').forEach(div => {
      const inputs = div.querySelectorAll('input');
      if (inputs.length >= 2) {
        const label = inputs[0].value.trim();
        const price = Number(inputs[1].value) || 0;
        if (label) rows.push({ label, price });
      }
    });
    const result = await Store.savePricingTable(rows);
    const isCloud = !!getSupabase();
    if (isCloud && result?.success === false) {
      alert('บันทึกในเครื่องแล้ว แต่การเชื่อมต่อไปยัง Supabase มีปัญหา: ' + (result.error || 'โปรดตรวจสอบสัญญาณอินเทอร์เน็ต'));
    } else {
      alert('บันทึกตารางราคาเรียบร้อยแล้วค่ะ ' + (isCloud ? '(บันทึกลงระบบคลาวด์ Supabase แล้ว)' : ''));
    }
  };

  window.handleGalleryProfileImageUpload = function (e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => {
      const inp = $('adminGalleryProfileImage');
      if (inp) inp.value = evt.target.result;
      const preview = $('adminGalleryProfilePreview');
      if (preview) preview.src = evt.target.result;
    };
    reader.readAsDataURL(file);
  };

  window.saveGallerySettingsAdmin = async function () {
    const heading = ($('adminGalleryHeading')?.value || '').trim() || 'My Gallery';
    const shopStatus = document.querySelector('input[name="adminShopStatus"]:checked')?.value || 'OPEN';
    const shopStatusCustom = ($('adminShopStatusCustom')?.value || '').trim();
    const shopName = ($('adminGalleryShopName')?.value || '').trim();
    const tagline = ($('adminGalleryTagline')?.value || '').trim();
    const bio = ($('adminGalleryBio')?.value || '').trim();
    const profileImage = ($('adminGalleryProfileImage')?.value || '').trim();
    const contactUrl = ($('adminGalleryContactUrl')?.value || '').trim();
    const catPortRaw = ($('adminGalleryCategories')?.value || '').trim();
    const catStylesRaw = ($('adminGalleryStyles')?.value || '').trim();

    const currentSettings = Store.getSettings();
    const headings = Object.assign({}, currentSettings.headings || {}, { portTitle: heading });
    const categories = Object.assign({}, currentSettings.categories || {}, {
      portfolio: catPortRaw.split(',').map(s => s.trim()).filter(Boolean),
      portfolioStyles: catStylesRaw.split(',').map(s => s.trim()).filter(Boolean)
    });

    const updatePayload = {
      headings,
      categories,
      shopStatus,
      shopStatusText: shopStatusCustom || (shopStatus === 'CLOSED' ? 'ปิดร้าน' : 'เปิดร้าน'),
      portfolioContactUrl: contactUrl
    };
    if (shopName) updatePayload.shopName = shopName;
    if (tagline !== undefined) updatePayload.tagline = tagline;
    if (bio !== undefined) updatePayload.shopBio = bio;
    if (profileImage) updatePayload.profileImage = profileImage;

    const result = await Store.saveSettings(updatePayload);
    const isCloud = !!getSupabase();
    if (isCloud && result?.cloudRes?.success === false) {
      alert('บันทึกในเครื่องแล้ว แต่การเชื่อมต่อไปยัง Supabase มีปัญหา: ' + (result.cloudRes.error || 'โปรดตรวจสอบสัญญาณอินเทอร์เน็ต'));
    } else {
      alert('บันทึกการตั้งค่าหน้าผลงานเรียบร้อยแล้วค่ะ ' + (isCloud ? '(บันทึกลงระบบคลาวด์ Supabase แล้ว)' : ''));
    }
    renderCurrentView();
  };

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
    state.editingPortfolioId = null;
    const modal = $('adminPortfolioModal');
    if (!modal) return;
    const titleEl = modal.querySelector('h3');
    if (titleEl) titleEl.textContent = 'เพิ่มรูปผลงานใหม่';
    $('adminPortTitle').value = '';

    const styleSelect = $('adminPortStyle');
    if (styleSelect) {
      const styles = Store.getPortfolioStyles ? Store.getPortfolioStyles() : ['สไตล์มินิมอล & คาเฟ่', 'สไตล์การ์ตูน & คาวาอี้', 'สไตล์ลายมือ & ฟอนต์', 'สไตล์ร้านค้า & โมเดิร์น', 'ไฟล์ตกแต่ง & เทมเพลต'];
      styleSelect.innerHTML = styles.map(st => `<option value="${escapeHTML(st)}">${escapeHTML(st)}</option>`).join('') +
        `<option value="__custom__">+ กำหนดสไตล์งานเอง...</option>`;
      styleSelect.value = styles[0] || 'สไตล์มินิมอล & คาเฟ่';
    }
    const customStyleInp = $('adminPortCustomStyle');
    if (customStyleInp) { customStyleInp.style.display = 'none'; customStyleInp.value = ''; }

    const catSelect = $('adminPortCategory');
    if (catSelect) {
      const cats = Store.getPortfolioCategories ? Store.getPortfolioCategories() : ['ป้ายเครดิต', 'ป้ายแอพพรี', 'ป้ายเติมเกม', 'ป้ายเปิดร้าน', 'ป้ายโปรโมชั่น', 'งานป้ายสั่งทำพิเศษ'];
      catSelect.innerHTML = cats.map(c => `<option value="${escapeHTML(c)}">${escapeHTML(c)}</option>`).join('');
      catSelect.value = cats[0] || 'ป้ายเครดิต';
    }
    $('adminPortPrice').value = '129';
    // Clear dynamic image rows and add one blank row
    const imgList = document.getElementById('portImgList');
    if (imgList) { imgList.innerHTML = ''; addPortImgRow(); }
    modal.classList.add('is-active');
  };

  window.closeAddPortfolioModal = function () {
    const modal = $('adminPortfolioModal');
    if (modal) modal.classList.remove('is-active');
  };

  window.handleSavePortfolioSubmit = async function (e) {
    e.preventDefault();
    const title = ($('adminPortTitle')?.value || '').trim();
    if (!title) return alert('กรุณากรอกชื่อผลงาน');

    let style_category = $('adminPortStyle')?.value || 'สไตล์มินิมอล & คาเฟ่';
    if (style_category === '__custom__') {
      style_category = ($('adminPortCustomStyle')?.value || '').trim();
      if (!style_category) return alert('กรุณากรอกชื่อสไตล์งานออกแบบ');
    }

    const category = $('adminPortCategory').value;
    const price = Number($('adminPortPrice').value) || 0;

    // Multi-image: collect from dynamic rows
    const images = getPortImgUrls();
    if (images.length === 0) return alert('กรุณาใส่ลิงก์รูปภาพอย่างน้อย 1 รูป');
    const image_url = images[0];

    const portPayload = {
      title,
      style_category,
      category,
      price,
      image_url,
      images
    };
    if (state.editingPortfolioId) portPayload.id = state.editingPortfolioId;
    const result = await Store.savePortfolioItem(portPayload);
    state.editingPortfolioId = null;

    closeAddPortfolioModal();
    const isCloud = !!getSupabase();
    if (isCloud && result?.cloudRes?.success === false) {
      alert('บันทึกในเครื่องแล้ว แต่การเชื่อมต่อไปยัง Supabase มีปัญหา: ' + (result.cloudRes.error || ''));
    } else {
      alert('บันทึกผลงานเรียบร้อยแล้วค่ะ ' + (isCloud ? '(บันทึกลงระบบคลาวด์ Supabase แล้ว)' : ''));
    }
    renderCurrentView();
  };

  window.deletePortfolioItemAction = async function (id) {
    if (!confirm('ยืนยันการลบผลงานนี้ใช่หรือไม่?')) return;
    const result = await Store.deletePortfolioItem(id);
    const isCloud = !!getSupabase();
    if (isCloud && result?.cloudRes?.success === false) {
      alert('ลบในเครื่องแล้ว แต่การเชื่อมต่อไปยัง Supabase มีปัญหา: ' + (result.cloudRes.error || ''));
    }
    renderCurrentView();
  };

  function renderAdminStampsTab() {
    const customers = Store.getCustomers();
    const stampCfg = Store.getStampSettings() || {};
    const maxStamps = Math.max(1, Number(stampCfg.maxStamps) || 10);
    const rewards = Array.isArray(stampCfg.rewards) ? stampCfg.rewards : [];

    if (!state.stampAccordions) {
      state.stampAccordions = { stampSettings: false, customerList: true };
    }
    const isSettingsOpen = !!state.stampAccordions.stampSettings;
    const isListOpen = !!state.stampAccordions.customerList;

    return `
      <!-- 1. Stamp Card & Rewards Settings Card -->
      <div class="card" style="border-radius: 18px; margin-bottom: 1.25rem; border: 1.5px solid #FFDFE9; background: #FFFBFD; overflow: hidden; padding: 0;">
        <div id="stamp-accordion-header-stampSettings" onclick="toggleStampAccordion('stampSettings')" style="display: flex; justify-content: space-between; align-items: center; padding: 1.1rem 1.25rem; cursor: pointer; background: #FFF7F9; border-bottom: ${isSettingsOpen ? '1px solid #FFDFE9' : 'none'}; user-select: none; transition: background 0.2s;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 10px; background: #FFE4EE; color: #B26E86; font-size: 0.95rem; font-weight: 800;">1</span>
            <div>
              <h3 style="margin: 0; color: var(--primary-deep); font-size: 1.15rem; font-weight: 700;">ตั้งค่าบัตรสะสมแต้ม &amp; กติกา &amp; ของรางวัล</h3>
              <p style="font-size: 0.82rem; color: var(--text-muted); margin: 2px 0 0 0;">กำหนดหัวข้อ จำนวนแต้ม ตราปั๊มแสตมป์ กติกา และรายการของรางวัลไหลใต้บัตร</p>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <button type="button" class="btn btn-primary btn-sm" onclick="event.stopPropagation(); saveStampSettingsAdmin();" style="box-shadow: none !important; font-size: 0.8rem; padding: 5px 12px;">
              บันทึกการตั้งค่า
            </button>
            <span id="stamp-accordion-badge-stampSettings" class="badge" style="background: ${isSettingsOpen ? '#FFE4EE' : '#FFF0F5'}; color: #B26E86; font-size: 0.78rem; font-weight: 700; border: 1px solid #FFDFE9; padding: 4px 10px; border-radius: 999px;">
              ${isSettingsOpen ? 'ย่อเก็บ' : 'คลิกเพื่อขยาย'}
            </span>
            <span id="stamp-accordion-arrow-stampSettings" style="display: inline-block; transition: transform 0.25s ease; transform: ${isSettingsOpen ? 'rotate(180deg)' : 'rotate(0deg)'}; color: #B26E86; font-weight: 700; font-size: 0.85rem;">
              ▼
            </span>
          </div>
        </div>

        <div id="stamp-accordion-body-stampSettings" style="display: ${isSettingsOpen ? 'block' : 'none'}; padding: 1.25rem;">
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">ชื่อบัตรสะสมแต้ม (Card Title)</label>
              <input type="text" id="adminStampTitle" class="form-input" value="${escapeHTML(stampCfg.cardTitle || 'บัตรสะสมแต้ม BNC GraphMate')}">
            </div>
            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">คำบรรยายหัวการ์ด (Card Subtitle)</label>
              <input type="text" id="adminStampSubtitle" class="form-input" value="${escapeHTML(stampCfg.cardSubtitle || 'สะสมตราปั๊มครบตามจำนวน รับสิทธิ์ดาวน์โหลดฟอนต์ฟรี หรือของขวัญพิเศษจากทางร้านทันที')}">
            </div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
            <div class="form-group">
              <label class="form-label" style="font-weight: 700; color: #9D174D;">จำนวนแต้มสะสมต่อ 1 ใบ (Max Stamps)</label>
              <input type="number" id="adminStampMaxStamps" class="form-input" min="1" max="99" value="${maxStamps}" placeholder="เช่น 10 (สามารถเพิ่มได้เอง)">
              <small style="color: var(--text-muted); font-size: 0.8rem;">*สามารถกำหนดแต้มได้ตามต้องการ เช่น 5, 8, 10, 12, 15 หรือ 20 แต้ม</small>
            </div>
            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">ข้อความเมื่อสะสมครบกำหนด</label>
              <input type="text" id="adminStampRewardText" class="form-input" value="${escapeHTML(stampCfg.rewardText || 'สะสมครบตามจำนวนแล้ว ทักแชท LINE เพื่อแลกรับของขวัญฟรีได้เลยค่ะ')}">
            </div>
          </div>

          <!-- Stamp Icon & Live Preview Row -->
          <div style="background: #FFF0F5; border: 1.5px solid #FFDFE9; border-radius: 16px; padding: 16px; margin-bottom: 1.25rem;">
            <div style="display: flex; flex-wrap: wrap; gap: 20px; align-items: center;">
              <div style="flex: 1; min-width: 260px;">
                <label class="form-label" style="font-weight: 700; color: var(--primary-deep); margin-bottom: 0.4rem;">
                  รูปภาพตราปั๊มแสตมป์ (Stamp Icon Artwork)
                </label>
                <div style="display: flex; gap: 8px; align-items: center;">
                  <input type="text" id="adminStampIconUrl" class="form-input" placeholder="ใส่ลิงก์รูปภาพ หรือเลือกไฟล์ PNG..." value="${escapeHTML(stampCfg.stampIconUrl || '')}" oninput="adminUpdateStampPreview()" style="flex: 1; font-size: 0.88rem;">
                  <label class="btn btn-outline btn-sm" style="cursor: pointer; white-space: nowrap; margin: 0; font-size: 0.82rem; padding: 6px 12px;">
                    เลือกรูป PNG
                    <input type="file" accept="image/png,image/webp,image/jpeg,image/svg+xml" style="display: none;" onchange="handleStampIconUpload(event)">
                  </label>
                </div>
                <small style="color: var(--text-muted); font-size: 0.8rem; margin-top: 4px; display: block;">
                  *หากเว้นว่าง ระบบจะใช้สัญลักษณ์ตราประทับหัวใจพาสเทลน่ารักอัตโนมัติ
                </small>
              </div>

              <!-- Live Preview Box -->
              <div style="display: flex; flex-direction: column; align-items: center; text-align: center;">
                <span style="font-size: 0.78rem; font-weight: 700; color: #B26E86; margin-bottom: 6px;">ตัวอย่างตราปั๊มเมื่อแปะจริง</span>
                <div id="adminStampPreviewBox" style="width: 72px; height: 72px; position: relative; display: flex; align-items: center; justify-content: center; transform: rotate(-6deg); filter: drop-shadow(0 4px 8px rgba(178,67,104,0.18));">
                  <svg class="postage-stamp-svg-border" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M 0 0 L 2.94 0 A 4.2 4.2 0 0 0 11.34 0 L 14.29 0 L 17.23 0 A 4.2 4.2 0 0 0 25.63 0 L 28.57 0 L 31.51 0 A 4.2 4.2 0 0 0 39.91 0 L 42.86 0 L 45.80 0 A 4.2 4.2 0 0 0 54.20 0 L 57.14 0 L 60.09 0 A 4.2 4.2 0 0 0 68.49 0 L 71.43 0 L 74.37 0 A 4.2 4.2 0 0 0 82.77 0 L 85.71 0 L 88.66 0 A 4.2 4.2 0 0 0 97.06 0 L 100.00 0 L 100 2.94 A 4.2 4.2 0 0 0 100 11.34 L 100 14.29 L 100 17.23 A 4.2 4.2 0 0 0 100 25.63 L 100 28.57 L 100 31.51 A 4.2 4.2 0 0 0 100 39.91 L 100 42.86 L 100 45.80 A 4.2 4.2 0 0 0 100 54.20 L 100 57.14 L 100 60.09 A 4.2 4.2 0 0 0 100 68.49 L 100 71.43 L 100 74.37 A 4.2 4.2 0 0 0 100 82.77 L 100 85.71 L 100 88.66 A 4.2 4.2 0 0 0 100 97.06 L 100 100.00 L 97.06 100 A 4.2 4.2 0 0 0 88.66 100 L 85.71 100 L 82.77 100 A 4.2 4.2 0 0 0 74.37 100 L 71.43 100 L 68.49 100 A 4.2 4.2 0 0 0 60.09 100 L 57.14 100 L 54.20 100 A 4.2 4.2 0 0 0 45.80 100 L 42.86 100 L 39.91 100 A 4.2 4.2 0 0 0 31.51 100 L 28.57 100 L 25.63 100 A 4.2 4.2 0 0 0 17.23 100 L 14.29 100 L 11.34 100 A 4.2 4.2 0 0 0 2.94 100 L 0.00 100 L 0 97.06 A 4.2 4.2 0 0 0 0 88.66 L 0 85.71 L 0 82.77 A 4.2 4.2 0 0 0 0 74.37 L 0 71.43 L 0 68.49 A 4.2 4.2 0 0 0 0 60.09 L 0 57.14 L 0 54.20 A 4.2 4.2 0 0 0 0 45.80 L 0 42.86 L 0 39.91 A 4.2 4.2 0 0 0 0 31.51 L 0 28.57 L 0 25.63 A 4.2 4.2 0 0 0 0 17.23 L 0 14.29 L 0 11.34 A 4.2 4.2 0 0 0 0 2.94 L 0 0.00 Z" fill="#FFFFFF" stroke="#FBCFE8" stroke-width="0.8" />
                  </svg>
                  <div class="stamp-slot-inner" style="width: 84%; height: 84%;">
                    ${stampCfg.stampIconUrl ? `
                      <img id="adminStampPreviewImg" src="${escapeHTML(formatDriveImageUrl(stampCfg.stampIconUrl))}" alt="Stamp" style="width:90%; height:90%; object-fit:contain;">
                    ` : `
                      <svg class="stamp-note-icon" viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="#FF6B97" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M9 18V5l12-2v13" stroke="#71515B" stroke-width="2"/>
                        <circle cx="6" cy="18" r="3.2" fill="#FFB7CE" stroke="#71515B" stroke-width="1.5"/>
                        <circle cx="18" cy="16" r="3.2" fill="#FFB7CE" stroke="#71515B" stroke-width="1.5"/>
                      </svg>
                    `}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="form-group" style="margin-bottom: 1.25rem;">
            <label class="form-label" style="font-weight: 700;">กติกาการสะสมแต้มด้านล่างบัตร</label>
            <textarea id="adminStampRules" class="form-textarea" rows="3" placeholder="พิมพ์กติกาการสะสมแต้ม เช่น ทุกออเดอร์รับ 1 ดวง...">${escapeHTML(stampCfg.rulesText || '')}</textarea>
          </div>

          <!-- Reward Showcase Manager -->
          <div style="background: #FFFFFF; border: 1.5px solid #FFDFE9; border-radius: 16px; padding: 16px; margin-bottom: 1.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 8px;">
              <div>
                <h4 style="margin: 0; color: var(--primary-deep); font-size: 1rem; font-weight: 700;">
                  จัดการตัวอย่างของรางวัล (Reward Showcase Flow)
                </h4>
                <p style="margin: 2px 0 0 0; font-size: 0.8rem; color: var(--text-muted);">
                  รูปภาพในกรอบขาวพร้อมข้อความ เรียงไหลใต้การ์ดสะสมแต้ม
                </p>
              </div>
            </div>

            <!-- List of existing rewards -->
            <div id="adminRewardShowcaseList" style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 1.25rem;">
              ${rewards.map((rw, idx) => `
                <div style="background: #FFF7FA; border: 1.5px solid #FFDFE9; border-radius: 14px; padding: 10px; width: 140px; display: flex; flex-direction: column; align-items: center; position: relative;">
                  <button type="button" onclick="deleteRewardShowcaseItem(${idx})" style="position: absolute; top: -6px; right: -6px; background: #e11d48; color: #fff; border: none; border-radius: 50%; width: 20px; height: 20px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center;" title="ลบรางวัลนี้">✕</button>
                  <img src="${escapeHTML(formatDriveImageUrl(rw.image) || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200')}" style="width: 100%; aspect-ratio: 1/1; object-fit: cover; border-radius: 8px; border: 1px solid #FFDFE9;" onerror="this.src='https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200';">
                  <div style="font-size: 0.8rem; font-weight: 700; color: var(--text); margin-top: 6px; text-align: center; line-height: 1.25; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">${escapeHTML(rw.title)}</div>
                  <span style="font-size: 0.72rem; font-weight: 700; color: var(--primary-deep); background: #FFFFFF; border: 1px solid #FFDFE9; padding: 2px 10px; border-radius: 999px; margin-top: 5px; box-shadow: 0 2px 4px rgba(251,113,133,0.06);">${escapeHTML(rw.points || `${maxStamps} แต้ม`)}</span>
                </div>
              `).join('')}
            </div>

            <!-- Form to add new reward -->
            <div style="background: #FFF7F9; border: 1px dashed #FFDFE9; border-radius: 12px; padding: 12px;">
              <span style="font-size: 0.85rem; font-weight: 700; color: var(--primary-deep); display: block; margin-bottom: 8px;">+ เพิ่มตัวอย่างของรางวัลใหม่</span>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 8px; margin-bottom: 8px;">
                <input type="text" id="adminNewRewardTitle" class="form-input" style="font-size: 0.85rem;" placeholder="ชื่อของรางวัล (เช่น ชุดฟอนต์ 1 ชุด)">
                <input type="text" id="adminNewRewardPoints" class="form-input" style="font-size: 0.85rem;" placeholder="แต้มที่ใช้ (เช่น 10 แต้ม)" value="${maxStamps} แต้ม">
                <div style="display: flex; gap: 6px;">
                  <input type="text" id="adminNewRewardImage" class="form-input" style="font-size: 0.85rem; flex: 1;" placeholder="ลิงก์รูปภาพรางวัล 1:1">
                  <label class="btn btn-outline btn-sm" style="cursor: pointer; white-space: nowrap; margin: 0; font-size: 0.8rem; padding: 4px 8px;">
                    เลือกรูป
                    <input type="file" accept="image/*" style="display: none;" onchange="handleImageFileInput(event, 'adminNewRewardImage')">
                  </label>
                </div>
              </div>
              <button type="button" class="btn btn-outline btn-sm" onclick="addRewardShowcaseItem()" style="font-weight: 700; font-size: 0.82rem; border-color: #FFB7CE; color: #B24368;">
                + เพิ่มเข้าแถบรางวัล
              </button>
            </div>
          </div>

          <!-- Bottom Save Button -->
          <div style="display: flex; justify-content: flex-end; margin-top: 1rem;">
            <button type="button" class="btn btn-primary" onclick="saveStampSettingsAdmin()" style="font-weight: 800; padding: 0.65rem 1.8rem;">
              บันทึกการตั้งค่าบัตรสะสมแต้ม
            </button>
          </div>

        </div>
      </div>

      <!-- 2. Customer List & Stamp Adjustments Card -->
      <div class="card" style="border-radius: 18px; border: 1.5px solid #FFDFE9; background: #FFFBFD; overflow: hidden; padding: 0;">
        <div id="stamp-accordion-header-customerList" onclick="toggleStampAccordion('customerList')" style="display: flex; justify-content: space-between; align-items: center; padding: 1.1rem 1.25rem; cursor: pointer; background: #FFF7F9; border-bottom: ${isListOpen ? '1px solid #FFDFE9' : 'none'}; user-select: none; transition: background 0.2s;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 10px; background: #FFE4EE; color: #B26E86; font-size: 0.95rem; font-weight: 800;">2</span>
            <div>
              <h3 style="margin: 0; color: var(--primary-deep); font-size: 1.15rem; font-weight: 700;">จัดการรายการบัตรสะสมแต้ม &amp; ลูกค้า</h3>
              <p style="font-size: 0.82rem; color: var(--text-muted); margin: 2px 0 0 0;">ดูรายชื่อ เพิ่มลดแต้ม รีเซ็ตบัตรใหม่ หรือเปิดบัตรสะสมแต้มให้ลูกค้า</p>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <button type="button" class="btn btn-primary btn-sm" onclick="event.stopPropagation(); openAddNewCustomerModal();" style="box-shadow: none !important; font-size: 0.8rem; padding: 5px 12px;">
              + เพิ่มลูกค้า &amp; เปิดบัตร
            </button>
            <span id="stamp-accordion-badge-customerList" class="badge" style="background: ${isListOpen ? '#FFE4EE' : '#FFF0F5'}; color: #B26E86; font-size: 0.78rem; font-weight: 700; border: 1px solid #FFDFE9; padding: 4px 10px; border-radius: 999px;">
              ${isListOpen ? 'ย่อเก็บ' : 'คลิกเพื่อขยาย'}
            </span>
            <span id="stamp-accordion-arrow-customerList" style="display: inline-block; transition: transform 0.25s ease; transform: ${isListOpen ? 'rotate(180deg)' : 'rotate(0deg)'}; color: #B26E86; font-weight: 700; font-size: 0.85rem;">
              ▼
            </span>
          </div>
        </div>

        <div id="stamp-accordion-body-customerList" style="display: ${isListOpen ? 'block' : 'none'}; padding: 1.25rem;">
          
          <div style="overflow-x: auto;">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>ลูกค้า</th>
                  <th>ช่องทางการติดต่อ</th>
                  <th style="text-align: center;">จำนวนแต้ม</th>
                  <th style="text-align: center;">เพิ่ม / ลด แต้ม</th>
                  <th>จัดการ</th>
                </tr>
              </thead>
              <tbody>
                ${customers.length === 0 ? `
                  <tr>
                    <td colspan="5" style="text-align: center; padding: 2rem; color: var(--text-muted);">
                      ยังไม่มีข้อมูลลูกค้าในระบบ กดปุ่ม "+ เพิ่มลูกค้า & เปิดบัตร" เพื่อเริ่มต้นได้เลยค่ะ
                    </td>
                  </tr>
                ` : customers.map(c => {
                  const stamps = Number(c.heart_stamps) || 0;
                  // Format contacts as pills
                  let contactHtml = '';
                  if (Array.isArray(c.contacts) && c.contacts.length > 0) {
                    contactHtml = c.contacts.filter(ct => ct && ct.value).map(ct => `
                      <span class="contact-pill"><small>${escapeHTML(ct.type)}:</small> ${escapeHTML(ct.value)}</span>
                    `).join(' ');
                  } else {
                    const fallbackParts = [];
                    if (c.line_id) fallbackParts.push(`<span class="contact-pill"><small>LINE:</small> ${escapeHTML(c.line_id)}</span>`);
                    if (c.phone) fallbackParts.push(`<span class="contact-pill"><small>เบอร์โทร:</small> ${escapeHTML(c.phone)}</span>`);
                    contactHtml = fallbackParts.length > 0 ? fallbackParts.join(' ') : '<span style="color:var(--text-muted);">-</span>';
                  }

                  return `
                    <tr>
                      <td>
                        <strong>${escapeHTML(c.name)}</strong>
                        <div style="font-size: 11px; color: var(--text-muted);">${escapeHTML(c.member_code || '')}</div>
                      </td>
                      <td>
                        <div style="display: flex; flex-wrap: wrap; gap: 4px; max-width: 260px;">
                          ${contactHtml}
                        </div>
                      </td>
                      <td style="text-align: center;">
                        <div style="display: inline-flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1rem; color: var(--text-secondary);">
                          <span>${stamps} / ${maxStamps}</span>
                        </div>
                      </td>
                      <td style="text-align: center;">
                        <div class="admin-stamp-control">
                          <button type="button" class="admin-stamp-btn" onclick="adjustCustomerStamp('${c.id}', -1)" title="ลด 1 แต้ม">-1</button>
                          <input type="number" value="${stamps}" min="0" max="99" style="width: 48px; text-align: center; border: 1px solid var(--border); border-radius: 6px; font-weight: 700; padding: 2px;" onchange="setCustomerStampDirect('${c.id}', this.value)">
                          <button type="button" class="admin-stamp-btn" onclick="adjustCustomerStamp('${c.id}', 1)" title="ปั๊มเพิ่ม 1 แต้ม" style="background: var(--primary-600); color: #fff;">+1</button>
                        </div>
                      </td>
                      <td>
                        <div style="display: flex; gap: 6px; align-items: center;">
                          <button type="button" class="btn btn-outline btn-sm" onclick="resetCustomerStampCard('${c.id}')" title="รีเซ็ตเริ่มใบใหม่">ใบใหม่</button>
                          <button type="button" class="btn btn-outline btn-sm" onclick="deleteCustomerAdmin('${c.id}')" style="color: #dc2626; border-color: #fca5a5; padding: 2px 7px; font-size: 11px;" title="ลบลูกค้า">✕</button>
                        </div>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    `;
  }

  // Stamp Accordion Toggle
  window.toggleStampAccordion = function (key) {
    if (!state.stampAccordions) {
      state.stampAccordions = { stampSettings: false, customerList: true };
    }
    state.stampAccordions[key] = !state.stampAccordions[key];
    const isOpen = state.stampAccordions[key];
    const body = document.getElementById('stamp-accordion-body-' + key);
    const arrow = document.getElementById('stamp-accordion-arrow-' + key);
    const badge = document.getElementById('stamp-accordion-badge-' + key);
    const header = document.getElementById('stamp-accordion-header-' + key);
    if (body) body.style.display = isOpen ? 'block' : 'none';
    if (arrow) arrow.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
    if (badge) {
      badge.textContent = isOpen ? 'ย่อเก็บ' : 'คลิกเพื่อขยาย';
      badge.style.background = isOpen ? '#FFE4EE' : '#FFF0F5';
    }
    if (header) {
      header.style.borderBottom = isOpen ? '1px solid #FFDFE9' : 'none';
    }
  };

  // Stamp Live Preview Updater
  window.adminUpdateStampPreview = function () {
    const box = $('adminStampPreviewBox');
    const input = $('adminStampIconUrl');
    if (!box || !input) return;
    const url = input.value.trim();
    const inner = box.querySelector('.stamp-slot-inner');
    if (!inner) return;
    if (url) {
      inner.innerHTML = `<img id="adminStampPreviewImg" src="${escapeHTML(formatDriveImageUrl(url))}" alt="Stamp" style="width:90%; height:90%; object-fit:contain;" onerror="this.outerHTML='<span style=\\'font-size:10px; color:#e11d48;\\'>รูปไม่ติด</span>';">`;
    } else {
      inner.innerHTML = `
        <svg class="stamp-note-icon" viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="#FF6B97" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 18V5l12-2v13" stroke="#71515B" stroke-width="2"/>
          <circle cx="6" cy="18" r="3.2" fill="#FFB7CE" stroke="#71515B" stroke-width="1.5"/>
          <circle cx="18" cy="16" r="3.2" fill="#FFB7CE" stroke="#71515B" stroke-width="1.5"/>
        </svg>
      `;
    }
  };

  window.handleStampIconUpload = function (e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (evt) {
      const url = evt.target.result;
      const input = $('adminStampIconUrl');
      if (input) input.value = url;
      adminUpdateStampPreview();
    };
    reader.readAsDataURL(file);
  };

  // Reward Showcase Items
  window.addRewardShowcaseItem = function () {
    const title = ($('adminNewRewardTitle')?.value || '').trim();
    const points = ($('adminNewRewardPoints')?.value || '').trim();
    const image = ($('adminNewRewardImage')?.value || '').trim();
    if (!title) return alert('กรุณากรอกชื่อของรางวัล');
    if (!image) return alert('กรุณาระบุลิงก์หรือเลือกรูปภาพของรางวัล');

    const cfg = Store.getStampSettings() || {};
    const rewards = Array.isArray(cfg.rewards) ? [...cfg.rewards] : [];
    rewards.push({
      id: 'rw-' + Date.now(),
      title: title,
      points: points || `${cfg.maxStamps || 10} แต้ม`,
      image: image
    });
    cfg.rewards = rewards;
    Store.saveSettings({ stampSettings: cfg });
    renderCurrentView();
  };

  window.deleteRewardShowcaseItem = function (idx) {
    if (!confirm('ต้องการลบตัวอย่างรางวัลนี้ใช่หรือไม่?')) return;
    const cfg = Store.getStampSettings() || {};
    const rewards = Array.isArray(cfg.rewards) ? [...cfg.rewards] : [];
    rewards.splice(idx, 1);
    cfg.rewards = rewards;
    Store.saveSettings({ stampSettings: cfg });
    renderCurrentView();
  };

  window.saveStampSettingsAdmin = async function () {
    const cardTitle = ($('adminStampTitle')?.value || '').trim();
    const cardSubtitle = ($('adminStampSubtitle')?.value || '').trim();
    const maxStamps = Math.max(1, Number($('adminStampMaxStamps')?.value) || 10);
    const rewardText = ($('adminStampRewardText')?.value || '').trim();
    const stampIconUrl = ($('adminStampIconUrl')?.value || '').trim();
    const rulesText = ($('adminStampRules')?.value || '').trim();

    const curCfg = Store.getStampSettings() || {};
    const updated = Object.assign({}, curCfg, {
      cardTitle: cardTitle || 'บัตรสะสมแต้ม BNC GraphMate',
      cardSubtitle: cardSubtitle || 'สะสมตราปั๊มครบตามจำนวน รับสิทธิ์ดาวน์โหลดฟอนต์ฟรี หรือของขวัญพิเศษจากทางร้านทันที',
      maxStamps: maxStamps,
      rewardText: rewardText || 'สะสมครบตามจำนวนแล้ว ทักแชท LINE เพื่อแลกรับของขวัญฟรีได้เลยค่ะ',
      stampIconUrl: stampIconUrl,
      rulesText: rulesText
    });

    const res = await Store.saveSettings({ stampSettings: updated });
    if (res && res.cloudRes && res.cloudRes.error) {
      alert('บันทึกข้อมูลในเครื่องเรียบร้อยแล้ว แต่พบข้อผิดพลาดบน Supabase: ' + res.cloudRes.error);
    } else {
      alert('บันทึกการตั้งค่าบัตรสะสมแต้มขึ้น Supabase Cloud เรียบร้อยแล้วค่ะ!');
    }
    renderCurrentView();
  };

  window.adjustCustomerStamp = function (custId, delta) {
    Store.addCustomerStamp(custId, delta);
    renderCurrentView();
  };

  window.setCustomerStampDirect = function (custId, val) {
    Store.setCustomerStamps(custId, val);
    renderCurrentView();
  };

  window.resetCustomerStampCard = function (custId) {
    if (!confirm('ต้องการรีเซ็ตบัตรสะสมแต้มของลูกค้ารายนี้เพื่อเริ่มใบใหม่ (0 แต้ม) ใช่หรือไม่?')) return;
    Store.setCustomerStamps(custId, 0);
    renderCurrentView();
  };

  window.deleteCustomerAdmin = function (custId) {
    if (!confirm('ต้องการลบข้อมูลลูกค้ารายนี้ใช่หรือไม่?')) return;
    Store.deleteCustomer(custId);
    renderCurrentView();
  };

  window.addCustContactRow = function (type = 'LINE', val = '') {
    const list = $('adminCust_contacts_list');
    if (!list) return;
    const row = document.createElement('div');
    row.className = 'admin-cust-contact-row';
    row.style = 'display: flex; gap: 8px; align-items: center;';
    row.innerHTML = `
      <select class="form-select cust-contact-type" style="width: 120px; font-size: 0.85rem; padding: 6px 10px;">
        <option value="LINE" ${type === 'LINE' ? 'selected' : ''}>LINE</option>
        <option value="เบอร์โทร" ${type === 'เบอร์โทร' ? 'selected' : ''}>เบอร์โทร</option>
        <option value="Facebook" ${type === 'Facebook' ? 'selected' : ''}>Facebook</option>
        <option value="Instagram" ${type === 'Instagram' ? 'selected' : ''}>Instagram</option>
        <option value="TikTok" ${type === 'TikTok' ? 'selected' : ''}>TikTok</option>
        <option value="อื่นๆ" ${type === 'อื่นๆ' ? 'selected' : ''}>อื่นๆ</option>
      </select>
      <input type="text" class="form-input cust-contact-val" placeholder="เช่น @lineid หรือ 08x-xxx-xxxx" value="${escapeHTML(val)}" style="flex: 1; font-size: 0.85rem; padding: 6px 12px;">
      <button type="button" class="btn btn-outline btn-sm" onclick="removeCustContactRow(this)" style="color: #dc2626; border-color: #fca5a5; padding: 3px 8px; font-size: 11px;" title="ลบช่องทางนี้">✕</button>
    `;
    list.appendChild(row);
  };

  window.removeCustContactRow = function (btn) {
    const row = btn.closest('.admin-cust-contact-row');
    if (row) row.remove();
  };

  window.openAddNewCustomerModal = function () {
    const modal = $('adminCustomerModal');
    if (!modal) return;
    const nameEl = $('adminCust_name');
    if (nameEl) nameEl.value = '';
    const stampsEl = $('adminCust_stamps');
    if (stampsEl) stampsEl.value = '1';

    // Clear and populate default contacts rows
    const list = $('adminCust_contacts_list');
    if (list) {
      list.innerHTML = '';
      addCustContactRow('LINE', '');
      addCustContactRow('เบอร์โทร', '');
    }
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

    // Extract dynamic contact channels
    const contactRows = document.querySelectorAll('#adminCust_contacts_list .admin-cust-contact-row');
    const contacts = [];
    let lineId = '';
    let phone = '';

    contactRows.forEach(row => {
      const type = (row.querySelector('.cust-contact-type')?.value || 'LINE').trim();
      const val = (row.querySelector('.cust-contact-val')?.value || '').trim();
      if (val) {
        contacts.push({ type, value: val });
        if (type.toUpperCase() === 'LINE' && !lineId) lineId = val;
        if ((type === 'เบอร์โทร' || type.toLowerCase() === 'phone') && !phone) phone = val;
      }
    });

    const stamps = Math.max(0, Number($('adminCust_stamps')?.value) || 0);

    Store.saveCustomer({
      name,
      contacts: contacts,
      line_id: lineId,
      phone: phone,
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
    const s = Store.getSettings() || {};
    const qSettings = Store.getQueuePageSettings();
    const queuePage = qSettings;
    const queueStatus = s.queueStatus || {};
    const statusNames = qSettings.statusNames || {
      waiting: 'รอคิว',
      progress: 'กำลังดำเนินการ',
      review: 'รอตรวจ',
      edit: 'รอแก้ไข',
      done: 'เสร็จแล้ว',
      pause: 'พักคิว',
      cancel: 'ยกเลิก'
    };

    if (!state.queueAccordions) {
      state.queueAccordions = { queueSettings: false, queueList: true };
    }
    const isSettingsOpen = !!state.queueAccordions.queueSettings;
    const isListOpen = !!state.queueAccordions.queueList;

    return `
      <!-- 1. Queue Page & Shop Board Settings Card -->
      <div class="card" style="border-radius: 18px; margin-bottom: 1.25rem; border: 1.5px solid #FFDFE9; background: #FFFBFD; overflow: hidden; padding: 0;">
        <div id="queue-accordion-header-queueSettings" onclick="toggleQueueAccordion('queueSettings')" style="display: flex; justify-content: space-between; align-items: center; padding: 1.1rem 1.25rem; cursor: pointer; background: #FFF7F9; border-bottom: ${isSettingsOpen ? '1px solid #FFDFE9' : 'none'}; user-select: none; transition: background 0.2s;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 10px; background: #FFE4EE; color: #B26E86; font-size: 0.95rem; font-weight: 800;">1</span>
            <div>
              <h3 style="margin: 0; color: var(--primary-deep); font-size: 1.15rem; font-weight: 700;">ตั้งค่าหน้าเช็กคิวงาน &amp; บอร์ดสถานะร้าน</h3>
              <p style="font-size: 0.82rem; color: var(--text-muted); margin: 2px 0 0 0;">จัดการหัวข้อ คำบรรยาย ข้อความแจ้งเตือน โน้ตสถานะคิว ป้าย Badge และมาสคอตปลายหลอด</p>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <button type="button" class="btn btn-primary btn-sm" onclick="event.stopPropagation(); saveQueueSettingsAdmin();" style="box-shadow: none !important; font-size: 0.8rem; padding: 5px 12px;">
              บันทึกการตั้งค่า
            </button>
            <span id="queue-accordion-badge-queueSettings" class="badge" style="background: ${isSettingsOpen ? '#FFE4EE' : '#FFF0F5'}; color: #B26E86; font-size: 0.78rem; font-weight: 700; border: 1px solid #FFDFE9; padding: 4px 10px; border-radius: 999px;">
              ${isSettingsOpen ? 'ย่อเก็บ' : 'คลิกเพื่อขยาย'}
            </span>
            <span id="queue-accordion-arrow-queueSettings" style="display: inline-block; transition: transform 0.25s ease; transform: ${isSettingsOpen ? 'rotate(180deg)' : 'rotate(0deg)'}; color: #B26E86; font-weight: 700; font-size: 0.85rem;">
              ▼
            </span>
          </div>
        </div>

        <div id="queue-accordion-body-queueSettings" style="display: ${isSettingsOpen ? 'block' : 'none'}; padding: 1.25rem;">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">หัวข้อหลักบนหน้าเช็กคิว (Hero Title)</label>
              <input type="text" id="adminQpHeroTitle" class="form-input" value="${escapeHTML(queuePage.heroTitle || 'เช็กคิวงาน')}">
            </div>
            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">คำบรรยายหัวเว็บ (Hero Subtitle)</label>
              <input type="text" id="adminQpHeroSubtitle" class="form-input" value="${escapeHTML(queuePage.heroSubtitle || 'ดูสถานะคิวงานของร้านแบบเรียลไทม์')}">
            </div>
          </div>

          <div class="form-group" style="margin-bottom: 1rem;">
            <label class="form-label" style="font-weight: 700;">ข้อความแถบแจ้งเตือนคิวงาน (Notice Banner Text)</label>
            <input type="text" id="adminQpNoticeText" class="form-input" value="${escapeHTML(queuePage.noticeText || 'คิวงานอัปเดตสถานะการออกแบบตลอดทั้งวัน สามารถค้นหาด้วยเลขคิว ชื่อ หรือเบอร์โทรได้เลยนะคะ')}">
          </div>

          <div class="form-group" style="margin-bottom: 1rem;">
            <label class="form-label" style="font-weight: 700;">ข้อความบนกระดาษโน้ตสถานะคิวงาน (Shop Queue Board)</label>
            <textarea id="adminNotebookNotice" class="form-textarea" rows="3" placeholder="พิมพ์ข้อความสถานะร้าน เวลาทำการ หรือแจ้งเตือนตามต้องการ...">${escapeHTML(s.notebookNotice || 'สถานะคิวงานออกแบบ: ว่างพร้อมรับ 3 คิว\nเวลาตอบแชท: 09:00 - 23:00 น. (ตอบไว)\nความเร็วการส่งมอบ: ดึงสิทธิ์ Google Drive อัตโนมัติหลังแอดมินตรวจสลิป')}</textarea>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-bottom: 1.25rem;">
            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">ป้ายข้อความมุมขวาบนการ์ด (Badge Text)</label>
              <input type="text" id="adminQueueBadgeText" class="form-input" value="${escapeHTML(s.queueBadgeText || (queueStatus && queueStatus.queueText) || 'ว่างพร้อมรับ 3 คิว')}">
            </div>
            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">ลิงก์ปุ่ม สอบถาม | จองคิว (Booking URL)</label>
              <input type="text" id="adminQueueBookingUrl" class="form-input" placeholder="https://line.me/ti/p/~... หรือ #queue" value="${escapeHTML(s.queueBookingUrl || s.lineUrl || 'https://line.me/ti/p/~bncgraphmate')}">
            </div>
          </div>

          <!-- Mascot Stages at Progress Tip -->
          <div style="background: #FFFFFF; border-radius: 16px; padding: 1.25rem; border: 1.5px solid var(--border); margin-bottom: 1.25rem;">
            <div style="margin-bottom: 1rem;">
              <h4 style="margin: 0 0 4px; font-size: 0.98rem; color: #9D174D; font-weight: 800;">
                มาสคอตปลายหลอดคิวงานตามเปอร์เซ็นต์ (Mascot Stages at Tip)
              </h4>
              <p style="font-size: 0.82rem; color: var(--text-muted); margin: 0;">
                เปลี่ยนรูปมาสคอตปลายหลอดความคืบหน้าตามเปอร์เซ็นต์ (0%, 25%, 50%, 75%, 100%)
              </p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
              ${[
                { key: 'pct0', label: '0% (รอเริ่ม)', def: 'https://api.iconify.design/fluent-emoji-flat:cat-face.svg' },
                { key: 'pct25', label: '25% (เริ่มแบบ)', def: 'https://api.iconify.design/fluent-emoji-flat:rabbit.svg' },
                { key: 'pct50', label: '50% (ครึ่งทาง)', def: 'https://api.iconify.design/fluent-emoji-flat:bear.svg' },
                { key: 'pct75', label: '75% (ใกล้เสร็จ)', def: 'https://api.iconify.design/fluent-emoji-flat:panda.svg' },
                { key: 'pct100', label: '100% (เสร็จแล้ว)', def: 'https://api.iconify.design/fluent-emoji-flat:party-popper.svg' }
              ].map(st => {
                const curVal = (queuePage.mascotStages && queuePage.mascotStages[st.key]) ? queuePage.mascotStages[st.key] : st.def;
                return `
                  <div style="background: var(--surface-alt); border: 1px solid var(--border); border-radius: 12px; padding: 10px; display: flex; flex-direction: column; align-items: center; text-align: center;">
                    <div style="width: 42px; height: 42px; border-radius: 50%; background: #fff; border: 1.5px solid #F472B6; display: flex; align-items: center; justify-content: center; margin-bottom: 6px; overflow: hidden;">
                      <img id="admin_prev_mascot_${st.key}" src="${escapeHTML(curVal)}" style="width: 28px; height: 28px; object-fit: contain;">
                    </div>
                    <span style="font-size: 0.78rem; font-weight: 800; color: #9D174D; margin-bottom: 6px;">${st.label}</span>
                    <input type="text" id="admin_q_mascot_${st.key}" class="form-input" style="font-size: 11px; padding: 4px 6px; margin-bottom: 6px;" value="${escapeHTML(curVal)}" placeholder="URL" oninput="const p=$('admin_prev_mascot_${st.key}'); if(p) p.src=this.value;">
                    <label class="btn btn-outline btn-sm" style="cursor: pointer; font-size: 10px; padding: 2px 8px; width: 100%;">
                      เลือกรูป
                      <input type="file" accept="image/*" style="display: none;" onchange="handleImageFileInput(event, 'admin_q_mascot_${st.key}', 'admin_prev_mascot_${st.key}')">
                    </label>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <button type="button" class="btn btn-primary btn-sm" onclick="saveQueueSettingsAdmin()" style="box-shadow: none !important;">
            บันทึกการตั้งค่าหน้าเช็กคิวงาน
          </button>
        </div>
      </div>

      <!-- 2. Queue List & Calendar Management Card -->
      <div class="card" style="border-radius: 18px; margin-bottom: 1.25rem; border: 1.5px solid #FFDFE9; background: #FFFBFD; overflow: hidden; padding: 0;">
        <div id="queue-accordion-header-queueList" onclick="toggleQueueAccordion('queueList')" style="display: flex; justify-content: space-between; align-items: center; padding: 1.1rem 1.25rem; cursor: pointer; background: #FFF7F9; border-bottom: ${isListOpen ? '1px solid #FFDFE9' : 'none'}; user-select: none; transition: background 0.2s;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 10px; background: #FFE4EE; color: #B26E86; font-size: 0.95rem; font-weight: 800;">2</span>
            <div>
              <h3 style="margin: 0; color: var(--primary-deep); font-size: 1.15rem; font-weight: 700;">จัดการรายการคิวงาน &amp; ตารางชีวิต</h3>
              <p style="font-size: 0.82rem; color: var(--text-muted); margin: 2px 0 0 0;">${queues.length} รายการ — ดูภาพรวมคิวงาน วางแผนงานประจำวัน และปฏิทิน</p>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="display: inline-flex; background: #FFF0F5; padding: 3px; border-radius: 12px; border: 1.5px solid #FFDFE9;" onclick="event.stopPropagation();">
              <button 
                type="button" 
                class="btn btn-sm" 
                onclick="switchAdminQueueView('table')"
                style="padding: 4px 12px; font-size: 11px; border-radius: 9px; font-weight: 700; ${state.adminQueueView !== 'calendar' ? 'background: #FFFFFF; color: #71515B; box-shadow: 0 2px 6px rgba(113,81,91,0.08);' : 'background: transparent; color: #A0AEC0; border: none;'}"
              >
                ตารางรายการ
              </button>
              <button 
                type="button" 
                class="btn btn-sm" 
                onclick="switchAdminQueueView('calendar')"
                style="padding: 4px 12px; font-size: 11px; border-radius: 9px; font-weight: 700; ${state.adminQueueView === 'calendar' ? 'background: #FFFFFF; color: #71515B; box-shadow: 0 2px 6px rgba(113,81,91,0.08);' : 'background: transparent; color: #A0AEC0; border: none;'}"
              >
                ปฏิทินตารางงาน
              </button>
            </div>
            <button type="button" class="btn btn-primary btn-sm" onclick="event.stopPropagation(); openAddQueueModal();" style="box-shadow: none !important; font-size: 0.8rem; padding: 5px 12px;">
              + เพิ่มคิวงานใหม่
            </button>
            <span id="queue-accordion-badge-queueList" class="badge" style="background: ${isListOpen ? '#FFE4EE' : '#FFF0F5'}; color: #B26E86; font-size: 0.78rem; font-weight: 700; border: 1px solid #FFDFE9; padding: 4px 10px; border-radius: 999px;">
              ${isListOpen ? 'ย่อเก็บ' : 'คลิกเพื่อขยาย'}
            </span>
            <span id="queue-accordion-arrow-queueList" style="display: inline-block; transition: transform 0.25s ease; transform: ${isListOpen ? 'rotate(180deg)' : 'rotate(0deg)'}; color: #B26E86; font-weight: 700; font-size: 0.85rem;">
              ▼
            </span>
          </div>
        </div>

        <div id="queue-accordion-body-queueList" style="display: ${isListOpen ? 'block' : 'none'}; padding: 1.25rem;">
          ${state.adminQueueView === 'calendar' ? renderAdminQueueCalendarView(queues) : `
          <div style="overflow-x: auto;">
            <table class="admin-table">
              <thead>
                <tr>
                  <th style="width: 50px; text-align: center;">ลำดับ</th>
                  <th>เลขคิว</th>
                  <th>ชื่องาน / ประเภท</th>
                  <th>ลูกค้า / ช่องทางติดต่อ</th>
                  <th style="text-align: center; width: 80px;">พินคิว</th>
                  <th style="text-align: center; width: 150px;">สถานะงาน (คลิกเปลี่ยน)</th>
                  <th style="text-align: center; width: 90px;">ความคืบหน้า</th>
                  <th style="text-align: center; width: 80px;">แสดงผล</th>
                  <th style="text-align: center; width: 85px;">จัดเรียง</th>
                  <th style="text-align: center; width: 130px;">จัดการ</th>
                </tr>
              </thead>
              <tbody>
                ${queues.length > 0 ? queues.map((q, idx) => {
                  const statusKey = (q.status || 'waiting').toLowerCase();
                  const statusLabel = statusNames[statusKey] || statusKey;
                  const progressPct = Math.min(100, Math.max(0, Number(q.progress) || 0));

                  return `
                    <tr>
                      <td style="text-align: center; font-weight: 700; color: #71515B;">
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
                        <div style="font-weight: 600; color: var(--text);">${escapeHTML(q.customer_name || '-')}</div>
                        <div style="font-size: 11px; color: #71515B; margin-top: 1px;">
                          ${escapeHTML(q.contact || q.line_id || q.phone || '-')}
                        </div>
                      </td>
                      <td style="text-align: center;">
                        <button 
                          type="button" 
                          class="btn btn-sm" 
                          onclick="toggleQueuePinAdminAction('${q.id}')"
                          title="${q.is_pinned ? 'ปลดพินคิวนี้' : 'พินคิวนี้ไว้บน Today\'s Queue'}"
                          style="padding: 3px 8px; font-size: 11px; border-radius: 8px; font-weight: 700; ${q.is_pinned ? 'background: #FFF0F5; color: #E05A88; border: 1.5px solid #FBCFE8;' : 'background: #FFFFFF; color: #71515B; border: 1px solid #E2E8F0;'}"
                        >
                          ${q.is_pinned ? 'พินแล้ว' : 'พินคิว'}
                        </button>
                      </td>
                      <td style="text-align: center;">
                        <button 
                          type="button" 
                          class="btn btn-sm" 
                          onclick="cycleQueueStageAdminAction('${q.id}')"
                          title="คลิกเพื่อเลื่อนสถานะและเปอร์เซ็นต์ (0% รอคิว -> 25% รับบรีฟ -> 50% กำลังทำ -> 75% กำลังเช็ค -> 100% ส่งงานเรียบร้อย)"
                          style="background: #FFFFFF; border: 1.5px solid #FFDFE9; color: #71515B; font-weight: 700; padding: 4px 10px; border-radius: 999px; cursor: pointer; white-space: nowrap; font-size: 11px;"
                        >
                          ${escapeHTML(getStageLabelByProgress(progressPct))} (${progressPct}%)
                        </button>
                      </td>
                      <td style="text-align: center;">
                        <span class="badge" style="font-size: 11px; padding: 2px 8px; background: #FFF0F5; color: #71515B; font-weight: 700;">
                          ${progressPct}%
                        </span>
                      </td>
                      <td style="text-align: center;">
                        <button 
                          type="button" 
                          class="btn btn-sm" 
                          onclick="toggleQueueVisibilityAdminAction('${q.id}')"
                          style="padding: 2px 6px; font-size: 11px; border: 1px solid var(--border); ${q.is_visible !== false ? 'color: #059669; background: #ECFDF5;' : 'color: #9CA3AF; background: #F3F4F6;'}"
                        >
                          ${q.is_visible !== false ? 'แสดง' : 'ซ่อน'}
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
                    <td colspan="10" style="text-align: center; padding: 3rem; color: var(--text-muted);">
                      ยังไม่มีคิวงานในระบบ กดปุ่ม "+ เพิ่มคิวงานใหม่" เพื่อเริ่มต้นได้เลยค่ะ
                    </td>
                  </tr>
                `}
              </tbody>
            </table>
          </div>
          `}
        </div>
      </div>
    `;
  }

  // Queue Accordion Toggle
  window.toggleQueueAccordion = function (key) {
    if (!state.queueAccordions) {
      state.queueAccordions = { queueSettings: false, queueList: true };
    }
    state.queueAccordions[key] = !state.queueAccordions[key];
    const isOpen = state.queueAccordions[key];
    const body = document.getElementById('queue-accordion-body-' + key);
    const arrow = document.getElementById('queue-accordion-arrow-' + key);
    const badge = document.getElementById('queue-accordion-badge-' + key);
    const header = document.getElementById('queue-accordion-header-' + key);
    if (body) body.style.display = isOpen ? 'block' : 'none';
    if (arrow) arrow.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
    if (badge) {
      badge.textContent = isOpen ? 'ย่อเก็บ' : 'คลิกเพื่อขยาย';
      badge.style.background = isOpen ? '#FFE4EE' : '#FFF0F5';
    }
    if (header) {
      header.style.borderBottom = isOpen ? '1px solid #FFDFE9' : 'none';
    }
  };

  window.saveQueueSettingsAdmin = async function () {
    const heroTitle = ($('adminQpHeroTitle')?.value || '').trim();
    const heroSubtitle = ($('adminQpHeroSubtitle')?.value || '').trim();
    const noticeText = ($('adminQpNoticeText')?.value || '').trim();
    const notebookNotice = ($('adminNotebookNotice')?.value || '').trim();
    const queueBadgeText = ($('adminQueueBadgeText')?.value || '').trim();
    const queueBookingUrl = ($('adminQueueBookingUrl')?.value || '').trim();

    const mascotStages = {
      pct0: ($('admin_q_mascot_pct0')?.value || '').trim() || 'https://api.iconify.design/fluent-emoji-flat:cat-face.svg',
      pct25: ($('admin_q_mascot_pct25')?.value || '').trim() || 'https://api.iconify.design/fluent-emoji-flat:rabbit.svg',
      pct50: ($('admin_q_mascot_pct50')?.value || '').trim() || 'https://api.iconify.design/fluent-emoji-flat:bear.svg',
      pct75: ($('admin_q_mascot_pct75')?.value || '').trim() || 'https://api.iconify.design/fluent-emoji-flat:panda.svg',
      pct100: ($('admin_q_mascot_pct100')?.value || '').trim() || 'https://api.iconify.design/fluent-emoji-flat:party-popper.svg'
    };

    const currentSettings = Store.getSettings() || {};
    const curQp = currentSettings.queuePage || {};
    const newQueuePage = Object.assign({}, curQp, {
      heroTitle: heroTitle || curQp.heroTitle || 'เช็กคิวงาน',
      heroSubtitle: heroSubtitle || curQp.heroSubtitle || 'ดูสถานะคิวงานของร้านแบบเรียลไทม์',
      noticeText: noticeText,
      mascotStages: mascotStages
    });

    const updatePayload = {
      queuePage: newQueuePage,
      notebookNotice: notebookNotice,
      queueBadgeText: queueBadgeText,
      queueBookingUrl: queueBookingUrl,
      queueStatus: {
        isAvailable: true,
        queueText: queueBadgeText || 'ว่างพร้อมรับ 3 คิว',
        chatHours: '',
        deliveryInfo: ''
      }
    };

    const result = await Store.saveSettings(updatePayload);
    const isCloud = !!getSupabase();
    if (isCloud && result?.cloudRes?.success === false) {
      alert('บันทึกในเครื่องแล้ว แต่การเชื่อมต่อไปยัง Supabase มีปัญหา: ' + (result.cloudRes.error || ''));
    } else {
      alert('บันทึกการตั้งค่าหน้าเช็กคิวงานเรียบร้อยแล้วค่ะ ' + (isCloud ? '(บันทึกลงระบบคลาวด์ Supabase แล้ว)' : ''));
    }
    renderCurrentView();
  };

  // Admin Queue Action Handlers
  
  
  window.calcQueueProfitPreview = function () {
    const price = Number(document.getElementById('adminQ_price')?.value || 0);
    const isAgent = document.getElementById('adminQ_isAgent')?.checked || false;
    const cost = isAgent ? Number(document.getElementById('adminQ_costPrice')?.value || 0) : 0;
    const profit = Math.max(0, price - cost);
    const preview = document.getElementById('adminQ_profitPreview');
    if (preview) {
      preview.innerHTML = 'กำไรสุทธิ: ฿' + profit.toLocaleString();
    }
  };

  window.cycleQueueStageAdminAction = function (id) {
    const item = Store.getQueueItemById(id);
    if (!item) return;
    const curPct = Math.min(100, Math.max(0, Number(item.progress) || 0));
    
    // 5 stages cycle: 0% รอคิว -> 25% รับบรีฟ -> 50% กำลังทำ -> 75% กำลังเช็ค -> 100% ส่งงานเรียบร้อย -> 0%
    let nextPct = 0;
    let nextStatus = 'waiting';
    if (curPct < 25) {
      nextPct = 25;
      nextStatus = 'progress';
    } else if (curPct < 50) {
      nextPct = 50;
      nextStatus = 'progress';
    } else if (curPct < 75) {
      nextPct = 75;
      nextStatus = 'review';
    } else if (curPct < 100) {
      nextPct = 100;
      nextStatus = 'done';
    } else {
      nextPct = 0;
      nextStatus = 'waiting';
    }

    item.progress = nextPct;
    item.status = nextStatus;
    item.updated_at = new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) + ' น.';
    Store.saveQueueItem(item);
    renderCurrentView();
  };

  window.toggleQueuePinAdminAction = function (id) {
    const item = Store.getQueueItemById(id);
    if (!item) return;
    item.is_pinned = !item.is_pinned;
    Store.saveQueueItem(item);
    renderCurrentView();
  };

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
    const progressPct = Math.min(100, Math.max(0, Number(item ? item.progress : 0)));

    modal.innerHTML = `
      <div class="modal-card" style="max-width: 600px; width: 92%; max-height: 90vh; overflow-y: auto; padding: 2rem; border-radius: 24px; border: 1.5px solid #FBCFE8; background: #FFFFFF;">
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
              <label class="form-label" style="font-weight: 700;">ชื่องาน <span style="color:var(--danger)">*</span></label>
              <input type="text" id="adminQ_jobName" class="form-input" placeholder="เช่น ป้ายร้านเบเกอรี่คุณหวาน" value="${escapeHTML(item ? item.job_name : '')}" required>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3" style="margin-bottom: 0.85rem;">
            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">ชื่อลูกค้า <span style="color:var(--danger)">*</span></label>
              <input type="text" id="adminQ_custName" class="form-input" placeholder="ชื่อที่ลูกค้าแจ้ง" value="${escapeHTML(item ? item.customer_name : '')}" required>
            </div>
            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">ช่องทางการติดต่อ</label>
              <input type="text" id="adminQ_contact" class="form-input" placeholder="พิมพ์ช่องทางติดต่อ เช่น @lineid, IG, เบอร์โทร..." value="${escapeHTML(item ? (item.contact || item.line_id || item.phone || '') : '')}">
            </div>
          </div>

          <!-- Single Bound Dropdown: Status + Percentage together -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3" style="margin-bottom: 0.85rem;">
            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">สถานะ & ความคืบหน้างาน</label>
              <select id="adminQ_stage" class="form-input" style="font-weight: 600;">
                <option value="0" ${progressPct < 25 ? 'selected' : ''}>0% - รอคิว</option>
                <option value="25" ${progressPct >= 25 && progressPct < 50 ? 'selected' : ''}>25% - รับบรีฟ</option>
                <option value="50" ${progressPct >= 50 && progressPct < 75 ? 'selected' : ''}>50% - กำลังทำ</option>
                <option value="75" ${progressPct >= 75 && progressPct < 100 ? 'selected' : ''}>75% - กำลังเช็ค</option>
                <option value="100" ${progressPct >= 100 ? 'selected' : ''}>100% - ส่งงานเรียบร้อย</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">เวลาอัปเดตล่าสุด</label>
              <input type="text" id="adminQ_updatedAt" class="form-input" placeholder="เช่น 14:30 น." value="${escapeHTML(item ? item.updated_at : new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) + ' น.')}">
            </div>
          </div>

          <!-- Pin to Today's Queue -->
          <div style="margin-bottom: 0.85rem; background: #FFF9FC; border: 1.5px solid #FFDFE9; border-radius: 12px; padding: 10px 14px;">
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-weight: 700; color: #71515B;">
              <input type="checkbox" id="adminQ_isPinned" ${item && item.is_pinned ? 'checked' : ''}>
              <span>พินคิวนี้ไว้บน Today's Queue (ปักหมุดโพสอิทแสดงผลทันที แม้เป็นคิวแทรก)</span>
            </label>
          </div>

          <!-- Queue Financials & Agent Cost -->
          <div style="background: #FFF0F7; border: 1.5px solid #FFDFE9; border-radius: 16px; padding: 1rem 1.1rem; margin-bottom: 0.85rem;">
            <div style="font-weight: 700; color: var(--primary-deep); font-size: 0.92rem; margin-bottom: 0.65rem; display: flex; align-items: center; justify-content: space-between;">
              <span>ข้อมูลการเงินคิวงาน</span>
              <span class="badge badge--pink" style="font-size: 0.72rem;">ระบบรายได้ & ตัวแทน</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3" style="margin-bottom: 0.65rem;">
              <div class="form-group">
                <label class="form-label" style="font-weight: 700; font-size: 0.85rem;">ยอดเงินที่รับจากลูกค้า (บาท)</label>
                <input type="number" id="adminQ_price" class="form-input" placeholder="เช่น 350" value="${item ? (item.price || 0) : 0}" oninput="calcQueueProfitPreview()">
              </div>
              <div class="form-group">
                <label class="form-label" style="font-weight: 700; font-size: 0.85rem;">สถานะการชำระเงิน</label>
                <select id="adminQ_payStatus" class="form-input">
                  <option value="PAID" ${item && item.payment_status === 'PAID' ? 'selected' : (!item ? 'selected' : '')}>ชำระแล้ว</option>
                  <option value="UNPAID" ${item && item.payment_status === 'UNPAID' ? 'selected' : ''}>รอชำระ / มัดจำ</option>
                </select>
              </div>
            </div>

            <!-- Agent Checkbox toggle: only show rate when checked -->
            <div style="padding-top: 4px; border-top: 1px dashed #FBCFE8;">
              <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; color: #4A5568; font-weight: 600; font-size: 0.86rem; margin-bottom: 6px;">
                <input type="checkbox" id="adminQ_isAgent" ${item && item.is_agent ? 'checked' : ''} onchange="document.getElementById('adminQ_agentCostWrap').style.display = this.checked ? 'block' : 'none'; calcQueueProfitPreview();">
                <span>เป็นงานตัวแทน (มีต้นทุนต้องส่งต่อเจ้าของ)</span>
              </label>
              
              <div id="adminQ_agentCostWrap" style="display: ${item && item.is_agent ? 'block' : 'none'}; margin-top: 8px;">
                <div class="form-group" style="margin-bottom: 6px;">
                  <label class="form-label" style="font-weight: 700; font-size: 0.85rem;">ต้นทุนส่งต่อ/เรทตัวแทน (บาท)</label>
                  <input type="number" id="adminQ_costPrice" class="form-input" placeholder="ต้นทุนที่ต้องหักจ่าย" value="${item ? (item.cost_price || 0) : 0}" oninput="calcQueueProfitPreview()">
                </div>
              </div>

              <div id="adminQ_profitPreview" style="font-weight: 700; color: #166534; font-size: 0.88rem; margin-top: 6px;">
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

          <div class="form-group" style="margin-bottom: 1.25rem;">
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
              <input type="checkbox" id="adminQ_isVisible" ${!item || item.is_visible !== false ? 'checked' : ''}>
              <span style="font-size: 0.9rem; font-weight: 600;">เปิดแสดงคิวนี้บนหน้าเช็กคิวของร้าน</span>
            </label>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 10px;">
            <button type="button" class="btn btn-secondary" onclick="closeQueueAdminModal()">ยกเลิก</button>
            <button type="submit" class="btn btn-primary" style="font-weight: 700; border-radius: 12px; padding: 0.65rem 1.6rem;">
              ${isEdit ? 'บันทึกการแก้ไข' : 'เพิ่มคิวงาน'}
            </button>
          </div>
        </form>
      </div>
    `;

    modal.classList.add('is-active');
  }

  window.closeQueueAdminModal = function () {
    const modal = $('adminQueueModal');
    if (modal) modal.classList.remove('is-active');
  };

  window.handleSaveQueueAdminSubmit = function (e, id) {
    e.preventDefault();
    const queueNumber = ($('adminQ_number')?.value || '').trim();
    const jobName = ($('adminQ_jobName')?.value || '').trim();
    const custName = ($('adminQ_custName')?.value || '').trim();
    const contact = ($('adminQ_contact')?.value || '').trim();

    if (!queueNumber || !jobName || !custName) {
      return alert('กรุณากรอกเลขคิว ชื่องาน และชื่อลูกค้าให้ครบถ้วนนะคะ');
    }

    const price = Number($('adminQ_price')?.value || 0);
    const isAgent = $('adminQ_isAgent')?.checked || false;
    const costPrice = isAgent ? Number($('adminQ_costPrice')?.value || 0) : 0;
    const profit = price - costPrice;
    const payStatus = $('adminQ_payStatus')?.value || 'PAID';
    const isPinned = $('adminQ_isPinned')?.checked || false;

    // Stage dropdown sets both progress & status together
    const stageVal = Number($('adminQ_stage')?.value) || 0;
    let statusKey = 'waiting';
    if (stageVal >= 100) statusKey = 'done';
    else if (stageVal >= 75) statusKey = 'review';
    else if (stageVal >= 25) statusKey = 'progress';
    else statusKey = 'waiting';

    const payload = {
      queue_number: queueNumber,
      customer_name: custName,
      contact: contact,
      line_id: contact,
      phone: contact,
      job_type: ($('adminQ_jobType')?.value || '').trim() || 'ออกแบบป้าย',
      job_name: jobName,
      queue_date: ($('adminQ_date')?.value || '').trim(),
      status: statusKey,
      progress: stageVal,
      updated_at: ($('adminQ_updatedAt')?.value || '').trim() || new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) + ' น.',
      price: price,
      cost_price: costPrice,
      profit: profit,
      is_agent: isAgent,
      is_pinned: isPinned,
      payment_status: payStatus,
      description: ($('adminQ_desc')?.value || '').trim(),
      note: ($('adminQ_note')?.value || '').trim(),
      is_visible: $('adminQ_isVisible')?.checked !== false
    };

    if (id) {
      payload.id = id;
    }

    Store.saveQueueItem(payload);
    closeQueueAdminModal();
    alert(id ? 'บันทึกการแก้ไขคิวงานเรียบร้อยแล้วค่ะ' : 'เพิ่มคิวงานใหม่เรียบร้อยแล้วค่ะ');
    renderCurrentView();
  };

  function renderAdminSettingsTab(s) {
    const stats = s.stats || {};
    const banners = Store.getHomeBanners();
    const queueStatus = Store.getQueueStatus();
    const queuePage = Store.getQueuePageSettings();
    const headings = Store.getHeadings();

    return `
      <form id="masterSettingsForm" onsubmit="event.preventDefault(); saveMasterSettings(event); return false;">
        
        <!-- 1. ข้อมูลร้าน -->
        <div class="card" style="margin-bottom: 1.5rem;">
          <h3 style="color: var(--primary-deep); margin-bottom: 1.25rem;">ข้อมูลร้าน</h3>
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
        </div>

        <!-- 2. ภาพปกร้าน, รูปโปรไฟล์ร้าน และ Bio -->
        <div class="card" style="margin-bottom: 1.5rem;">
          <h3 style="color: var(--primary-deep); margin-bottom: 1.25rem;">ภาพปกร้าน, รูปโปรไฟล์ร้าน และ Bio</h3>
          <div class="form-group" style="margin-bottom: 1rem;">
            <label class="form-label">ลิงก์ภาพปกร้าน Facebook Cover (แนะนำขนาด 1920 × 1080 px อัตราส่วน 16:9) หรือเลือกรูปจากเครื่อง</label>
            <div style="display: flex; gap: 8px; align-items: center;">
              <input type="text" id="cfg_coverImage" class="form-input" style="flex: 1;" value="${escapeHTML(s.coverImage || '')}" placeholder="วางลิงก์รูป หรือเลือกรูปจากเครื่อง" oninput="const p=$('cfg_coverImage_preview'); if(p) { p.src=formatDriveImageUrl(this.value); p.style.display='block'; }">
              <label class="btn btn-outline btn-sm" style="cursor: pointer; white-space: nowrap; margin: 0; font-size: 11px;">
                เลือกรูป
                <input type="file" accept="image/*" style="display: none;" onchange="handleImageFileInput(event, 'cfg_coverImage', 'cfg_coverImage_preview')">
              </label>
              <div style="width: 64px; height: 36px; border-radius: 8px; border: 1.5px solid var(--border); overflow: hidden; background: var(--surface-alt); flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
                <img id="cfg_coverImage_preview" src="${escapeHTML(formatDriveImageUrl(s.coverImage) || '')}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none';" onload="this.style.display='block';">
              </div>
            </div>
            <small style="color: var(--text-muted); font-size: 0.78rem;">*แนะนำขนาด 1920 × 1080 px (16:9 Full HD) รองรับทั้งลิงก์ทั่วไป, Google Drive และเลือกไฟล์จากเครื่อง</small>
          </div>
          <div class="form-group" style="margin-bottom: 1rem;">
            <label class="form-label">ลิงก์ภาพโปรไฟล์ร้าน (Avatar สไตล์ Facebook ขอบขาวหนา แนะนำ 1:1) หรือเลือกรูป</label>
            <div style="display: flex; gap: 8px; align-items: center;">
              <input type="text" id="cfg_profileImage" class="form-input" style="flex: 1;" value="${escapeHTML(s.profileImage || '')}" placeholder="วางลิงก์รูป หรือเลือกรูปจากเครื่อง" oninput="const p=$('cfg_profileImage_preview'); if(p) { p.src=formatDriveImageUrl(this.value); p.style.display='block'; }">
              <label class="btn btn-outline btn-sm" style="cursor: pointer; white-space: nowrap; margin: 0; font-size: 11px;">
                เลือกรูป
                <input type="file" accept="image/*" style="display: none;" onchange="handleImageFileInput(event, 'cfg_profileImage', 'cfg_profileImage_preview')">
              </label>
              <div style="width: 38px; height: 38px; border-radius: 50%; border: 3px solid #ffffff; box-shadow: 0 1px 4px rgba(0,0,0,0.15); overflow: hidden; background: var(--surface-alt); flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
                <img id="cfg_profileImage_preview" src="${escapeHTML(formatDriveImageUrl(s.profileImage) || '')}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none';" onload="this.style.display='block';">
              </div>
            </div>
            <small style="color: var(--text-muted); font-size: 0.78rem;">*แนะนำภาพสี่เหลี่ยมจัตุรัส 1:1 คมชัด รองรับทั้งลิงก์ทั่วไป, Google Drive และเลือกไฟล์จากเครื่อง</small>
          </div>
          <div class="form-group">
            <label class="form-label">คำแนะนำร้านค้า (Bio)</label>
            <textarea id="cfg_shopBio" class="form-textarea" rows="3">${escapeHTML(s.shopBio || '')}</textarea>
          </div>
        </div>

        <!-- 3. ช่องทางติดต่อ & Social Media (Dynamic Channels) -->
        <div class="card" style="margin-bottom: 1.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 8px;">
            <div>
              <h3 style="color: var(--primary-deep); margin: 0 0 4px;">ช่องทางติดต่อ & Social Media (Dynamic Channels)</h3>
              <p style="font-size: 0.86rem; color: var(--text-muted); margin: 0;">
                เพิ่ม ลบ หรือแก้ไขช่องทางติดต่อได้ตามใจชอบ (เช่น LINE, Facebook, IG, TikTok, Shopee, Lemon8, โทร ฯลฯ)
              </p>
            </div>
            <button type="button" class="btn btn-outline btn-sm" onclick="addNewContactChannelRow()">
              + เพิ่มช่องทางใหม่
            </button>
          </div>

          <div id="adminContactChannelsList" style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 1.25rem;">
            ${Store.getContactChannels().map((ch, idx) => `
              <div class="admin-channel-row" data-channel-id="${escapeHTML(ch.id || 'cc-' + idx)}" style="background: var(--surface-alt); border: 1.5px solid var(--border); border-radius: 14px; padding: 12px 14px; display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
                <div style="flex: 1; min-width: 140px;">
                  <label style="font-size: 11px; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 3px;">ชื่อแพลตฟอร์ม / ปุ่ม</label>
                  <input type="text" class="form-input channel-platform" value="${escapeHTML(ch.platform || '')}" placeholder="เช่น LINE Official, TikTok, IG">
                </div>
                <div style="flex: 1.2; min-width: 160px;">
                  <label style="font-size: 11px; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 3px;">ข้อความกำกับ / ไอดี</label>
                  <input type="text" class="form-input channel-value" value="${escapeHTML(ch.value || '')}" placeholder="เช่น @bncgraphmate หรือ 081-xxx">
                </div>
                <div style="flex: 1.8; min-width: 200px;">
                  <label style="font-size: 11px; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 3px;">ลิงก์ URL ปลายทาง (เมื่อคลิก)</label>
                  <input type="text" class="form-input channel-url" value="${escapeHTML(ch.url || '')}" placeholder="https://... หรือ tel:081xxx">
                </div>
                <div style="display: flex; align-items: flex-end; padding-top: 18px;">
                  <button type="button" class="btn btn-outline btn-sm" style="color: #dc2626; border-color: #fca5a5; padding: 6px 10px;" onclick="removeContactChannelRow(this)" title="ลบช่องทางนี้">
                    ลบ
                  </button>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Legacy direct inputs preserved for compatibility -->
          <details style="font-size: 0.82rem; color: var(--text-muted); border-top: 1px dashed var(--border); padding-top: 8px;">
            <summary style="cursor: pointer; font-weight: 600;">ตั้งค่าลิงก์หลักแบบดั้งเดิม (Legacy Direct Fallback)</summary>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3" style="margin-top: 10px;">
              <div class="form-group">
                <label class="form-label">ลิงก์ LINE Official</label>
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
          </details>
        </div>


        <!-- 4. Home 1:1 Banners Manager (Hero Carousel) -->
        <div class="card" style="margin-bottom: 1.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
            <div>
              <h3 style="color: var(--primary-deep); margin: 0 0 0.25rem;">แบนเนอร์ 1:1 สี่เหลี่ยมจัตุรัสหน้าแรก (Hero Carousel)</h3>
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
                <label class="form-label">ลิงก์ภาพ 1:1 จัตุรัส (URL) หรือเลือกรูป</label>
                <div style="display: flex; gap: 8px; align-items: center;">
                  <input type="text" id="newBannerImage" class="form-input" placeholder="https://... หรือเลือกรูป" style="flex: 1;">
                  <label class="btn btn-outline btn-sm" style="cursor: pointer; white-space: nowrap; margin: 0; font-size: 11px;">
                    เลือกรูป
                    <input type="file" accept="image/*" style="display: none;" onchange="handleBannerImageUpload(event)">
                  </label>
                </div>
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

        <!-- 5. กระดาษโน้ต & หน้าเช็กคิวงาน (ย้ายไปแท็บจัดการคิวงานแล้ว) -->
        <div class="card" style="margin-bottom: 1.5rem; background: #FFF7F9; border: 1.5px dashed #FFDFE9; border-radius: 16px; padding: 1.25rem 1.5rem;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 10px; background: #FFE4EE; color: #B26E86; font-size: 1.1rem; font-weight: 800; flex-shrink: 0;">i</span>
            <div>
              <h4 style="margin: 0; color: #B26E86; font-size: 1.05rem; font-weight: 700;">ตั้งค่าหน้าเช็กคิวงาน &amp; บอร์ดสถานะร้าน</h4>
              <p style="font-size: 0.86rem; color: var(--text-muted); margin: 2px 0 0 0;">
                การตั้งค่าข้อความบนหน้าเช็กคิวงาน, โน้ตสถานะคิว, ป้าย Badge และมาสคอตปลายหลอดคิว ถูกย้ายไปรวมอยู่ที่แท็บ
                <a href="javascript:void(0)" onclick="switchAdminTab('queues')" style="color: var(--primary); text-decoration: underline; font-weight: 700;">จัดการคิวงาน</a> แล้วค่ะ เพื่อความสะดวกในการจัดการทั้งหมดในที่เดียว
              </p>
            </div>
          </div>
        </div>



        <!-- 7. Custom Categories Configuration -->
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
            <div class="form-group" style="grid-column: 1 / -1; background: #FFF7F9; border: 1.5px dashed #FFDFE9; border-radius: 12px; padding: 12px 14px;">
              <span style="font-weight: 700; color: #B24368;">ตั้งค่าหมวดหมู่และสไตล์หน้าผลงาน:</span> ย้ายไปรวมอยู่ที่แท็บ <a href="javascript:void(0)" onclick="switchAdminTab('portfolio')" style="color: var(--primary); text-decoration: underline; font-weight: 700;">จัดการผลงาน</a> แล้วค่ะ
            </div>
          </div>
        </div>

        <!-- 8. น้องมาสคอตลอยหน้าจอ (Interactive Floating Mascot) -->
        <div class="card" style="margin-bottom: 1.5rem; border: 1.5px solid var(--border);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 8px;">
            <div>
              <h3 style="color: var(--primary-deep); margin-bottom: 0.25rem;">น้องมาสคอตลอยหน้าจอ (Interactive Floating Mascot)</h3>
              <p style="font-size: 0.86rem; color: var(--text-muted); margin-bottom: 0;">ลอย 1 ตัวน่ารักบนหน้าจอ พร้อมแปลงร่างและพูดคุยเมื่อคลิกวนรอบ 3 ครั้ง: <strong>คลิกครั้งที่ 1 (ตัวที่ 1) -> คลิกครั้งที่ 2 (แปลงร่างเป็นตัวที่ 2) -> คลิกครั้งที่ 3 (แปลงร่างเป็นตัวที่ 3)</strong> และกดค้างลากน้องไปมาได้รอบจอ (รองรับไฟล์ .GIF ดุ๊กดิ๊ก, .PNG, .SVG)</p>
            </div>
            <label style="display: inline-flex; align-items: center; gap: 8px; cursor: pointer; background: var(--surface-alt); padding: 6px 14px; border-radius: 999px; border: 1px solid var(--border);">
              <input type="checkbox" id="cfg_mascotEnabled" ${(s.mascotSettings?.enabled !== false) ? 'checked' : ''} style="accent-color: var(--primary-600);">
              <span style="font-weight: 700; font-size: 0.88rem; color: var(--text);">เปิดใช้งานมาสคอต</span>
            </label>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; margin-top: 1.25rem;">
            <!-- Mascot 1 (Click 1) -->
            <div style="background: #ffffff; border: 1.5px solid var(--border); border-radius: 16px; padding: 1rem; display: flex; flex-direction: column; gap: 0.75rem;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <div style="width: 44px; height: 44px; border-radius: 12px; background: var(--surface-alt); display: flex; align-items: center; justify-content: center; overflow: hidden; border: 1px solid var(--border); flex-shrink: 0;">
                  <img id="cfg_mascot1_preview" src="${escapeHTML(formatDriveImageUrl(s.mascotSettings?.mascot1?.png) || s.mascotSettings?.mascot1?.png || 'https://api.iconify.design/fluent-emoji-flat:rabbit.svg')}" style="width: 36px; height: 36px; object-fit: contain;">
                </div>
                <div>
                  <span style="font-size: 0.78rem; font-weight: 700; color: var(--primary-deep); background: var(--primary-soft); padding: 2px 8px; border-radius: 999px;">คลิกครั้งที่ 1 (ตัวเริ่มต้น)</span>
                  <div style="font-weight: 700; font-size: 0.92rem; color: var(--text); margin-top: 2px;">น้องตัวที่ 1 (เริ่มต้น)</div>
                </div>
              </div>
              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label" style="font-size: 0.8rem;">ชื่อน้อง</label>
                <input type="text" id="cfg_mascot1_name" class="form-input" style="font-size: 0.86rem; padding: 0.45rem 0.75rem;" value="${escapeHTML(s.mascotSettings?.mascot1?.name || 'น้องกระต่ายพาสเทล')}">
              </div>
              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label" style="font-size: 0.8rem;">ลิงก์ภาพ PNG / GIF ใส หรือเลือกรูป</label>
                <div style="display: flex; gap: 8px; align-items: center;">
                  <input type="text" id="cfg_mascot1_png" class="form-input" style="font-size: 0.82rem; padding: 0.45rem 0.75rem; flex: 1;" value="${escapeHTML(s.mascotSettings?.mascot1?.png || 'https://api.iconify.design/fluent-emoji-flat:rabbit.svg')}" oninput="const p=$('cfg_mascot1_preview'); if(p) p.src=formatDriveImageUrl(this.value);">
                  <label class="btn btn-outline btn-sm" style="cursor: pointer; white-space: nowrap; margin: 0; font-size: 11px;">
                    เลือกรูป
                    <input type="file" accept="image/*" style="display: none;" onchange="handleImageFileInput(event, 'cfg_mascot1_png', 'cfg_mascot1_preview')">
                  </label>
                </div>
              </div>
              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label" style="font-size: 0.8rem; font-weight: 600; color: var(--primary-deep);">คำพูดเมื่อคลิกครั้งที่ 1</label>
                <input type="text" id="cfg_mascot1_quote" class="form-input" style="font-size: 0.86rem; padding: 0.45rem 0.75rem;" placeholder="เช่น หวัดดีฮับ!" value="${escapeHTML(s.mascotSettings?.mascot1?.quote || 'หวัดดีฮับ!')}">
              </div>
              <button type="button" class="btn btn-outline btn-sm" onclick="window.switchFloatingMascot(0)" style="font-size: 11px; padding: 4px 10px; border-color: var(--primary-300); color: var(--primary-deep); margin-top: 4px;">
                ▶ ทดสอบเรียกดูตัวที่ 1 บนหน้าจอ
              </button>
            </div>

            <!-- Mascot 2 (Click 2) -->
            <div style="background: #ffffff; border: 1.5px solid var(--border); border-radius: 16px; padding: 1rem; display: flex; flex-direction: column; gap: 0.75rem;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <div style="width: 44px; height: 44px; border-radius: 12px; background: var(--surface-alt); display: flex; align-items: center; justify-content: center; overflow: hidden; border: 1px solid var(--border); flex-shrink: 0;">
                  <img id="cfg_mascot2_preview" src="${escapeHTML(formatDriveImageUrl(s.mascotSettings?.mascot2?.png) || s.mascotSettings?.mascot2?.png || 'https://api.iconify.design/fluent-emoji-flat:bear.svg')}" style="width: 36px; height: 36px; object-fit: contain;">
                </div>
                <div>
                  <span style="font-size: 0.78rem; font-weight: 700; color: #7c3aed; background: #ede9fe; padding: 2px 8px; border-radius: 999px;">คลิกครั้งที่ 2 (แปลงร่าง)</span>
                  <div style="font-weight: 700; font-size: 0.92rem; color: var(--text); margin-top: 2px;">น้องตัวที่ 2 (แปลงร่าง)</div>
                </div>
              </div>
              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label" style="font-size: 0.8rem;">ชื่อน้อง</label>
                <input type="text" id="cfg_mascot2_name" class="form-input" style="font-size: 0.86rem; padding: 0.45rem 0.75rem;" value="${escapeHTML(s.mascotSettings?.mascot2?.name || 'น้องหมีสตูดิโอ')}">
              </div>
              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label" style="font-size: 0.8rem;">ลิงก์ภาพ PNG / GIF ใส หรือเลือกรูป</label>
                <div style="display: flex; gap: 8px; align-items: center;">
                  <input type="text" id="cfg_mascot2_png" class="form-input" style="font-size: 0.82rem; padding: 0.45rem 0.75rem; flex: 1;" value="${escapeHTML(s.mascotSettings?.mascot2?.png || 'https://api.iconify.design/fluent-emoji-flat:bear.svg')}" oninput="const p=$('cfg_mascot2_preview'); if(p) p.src=formatDriveImageUrl(this.value);">
                  <label class="btn btn-outline btn-sm" style="cursor: pointer; white-space: nowrap; margin: 0; font-size: 11px;">
                    เลือกรูป
                    <input type="file" accept="image/*" style="display: none;" onchange="handleImageFileInput(event, 'cfg_mascot2_png', 'cfg_mascot2_preview')">
                  </label>
                </div>
              </div>
              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label" style="font-size: 0.8rem; font-weight: 600; color: #7c3aed;">คำพูดเมื่อคลิกครั้งที่ 2</label>
                <input type="text" id="cfg_mascot2_quote" class="form-input" style="font-size: 0.86rem; padding: 0.45rem 0.75rem;" placeholder="เช่น แวะดูฟอนต์ได้น้า" value="${escapeHTML(s.mascotSettings?.mascot2?.quote || 'แวะดูฟอนต์ได้น้า')}">
              </div>
              <button type="button" class="btn btn-outline btn-sm" onclick="window.switchFloatingMascot(1)" style="font-size: 11px; padding: 4px 10px; border-color: #c4b5fd; color: #6d28d9; margin-top: 4px;">
                ▶ ทดสอบเรียกดูตัวที่ 2 บนหน้าจอ
              </button>
            </div>

            <!-- Mascot 3 (Click 3) -->
            <div style="background: #ffffff; border: 1.5px solid var(--border); border-radius: 16px; padding: 1rem; display: flex; flex-direction: column; gap: 0.75rem;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <div style="width: 44px; height: 44px; border-radius: 12px; background: var(--surface-alt); display: flex; align-items: center; justify-content: center; overflow: hidden; border: 1px solid var(--border); flex-shrink: 0;">
                  <img id="cfg_mascot3_preview" src="${escapeHTML(formatDriveImageUrl(s.mascotSettings?.mascot3?.png) || s.mascotSettings?.mascot3?.png || 'https://api.iconify.design/fluent-emoji-flat:cat-face.svg')}" style="width: 36px; height: 36px; object-fit: contain;">
                </div>
                <div>
                  <span style="font-size: 0.78rem; font-weight: 700; color: #0284c7; background: #e0f2fe; padding: 2px 8px; border-radius: 999px;">คลิกครั้งที่ 3 (แปลงร่าง)</span>
                  <div style="font-weight: 700; font-size: 0.92rem; color: var(--text); margin-top: 2px;">น้องตัวที่ 3 (แปลงร่าง)</div>
                </div>
              </div>
              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label" style="font-size: 0.8rem;">ชื่อน้อง</label>
                <input type="text" id="cfg_mascot3_name" class="form-input" style="font-size: 0.86rem; padding: 0.45rem 0.75rem;" value="${escapeHTML(s.mascotSettings?.mascot3?.name || 'น้องแมวโมจิ')}">
              </div>
              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label" style="font-size: 0.8rem;">ลิงก์ภาพ PNG / GIF ใส หรือเลือกรูป</label>
                <div style="display: flex; gap: 8px; align-items: center;">
                  <input type="text" id="cfg_mascot3_png" class="form-input" style="font-size: 0.82rem; padding: 0.45rem 0.75rem; flex: 1;" value="${escapeHTML(s.mascotSettings?.mascot3?.png || 'https://api.iconify.design/fluent-emoji-flat:cat-face.svg')}" oninput="const p=$('cfg_mascot3_preview'); if(p) p.src=formatDriveImageUrl(this.value);">
                  <label class="btn btn-outline btn-sm" style="cursor: pointer; white-space: nowrap; margin: 0; font-size: 11px;">
                    เลือกรูป
                    <input type="file" accept="image/*" style="display: none;" onchange="handleImageFileInput(event, 'cfg_mascot3_png', 'cfg_mascot3_preview')">
                  </label>
                </div>
              </div>
              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label" style="font-size: 0.8rem; font-weight: 600; color: #0284c7;">คำพูดเมื่อคลิกครั้งที่ 3</label>
                <input type="text" id="cfg_mascot3_quote" class="form-input" style="font-size: 0.86rem; padding: 0.45rem 0.75rem;" placeholder="เช่น เหมียววว~ จับได้ด้วย!" value="${escapeHTML(s.mascotSettings?.mascot3?.quote || 'เหมียววว~ จับได้ด้วย!')}">
              </div>
              <button type="button" class="btn btn-outline btn-sm" onclick="window.switchFloatingMascot(2)" style="font-size: 11px; padding: 4px 10px; border-color: #7dd3fc; color: #0369a1; margin-top: 4px;">
                ▶ ทดสอบเรียกดูตัวที่ 3 บนหน้าจอ
              </button>
            </div>
          </div>
          <small style="display: block; margin-top: 0.85rem; color: var(--text-muted); font-size: 0.8rem;">แนะนำใช้ภาพ PNG โปร่งใส (Transparent PNG) หรือภาพ GIF แบบพื้นหลังใส เพื่อให้น้องลอยได้อย่างน่ารักและไม่มีกรอบขาวกวนใจค่ะ</small>
        </div>

        <!-- 9. Stamp Card Configuration Notice (Moved to Stamps Management Tab) -->
        <div class="card" style="margin-bottom: 1.5rem; background: #FFF7F9; border: 1.5px dashed #FFDFE9; border-radius: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <span style="font-size: 1.5rem; background: #FFE4EE; width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #B24368; flex-shrink: 0; font-weight: 800;">★</span>
              <div>
                <h4 style="margin: 0 0 3px; color: var(--primary-deep); font-weight: 700; font-size: 1.02rem;">
                  การตั้งค่าบัตรสะสมแต้ม &amp; ตัวอย่างของรางวัล
                </h4>
                <p style="margin: 0; font-size: 0.84rem; color: var(--text-muted); line-height: 1.4;">
                  การตั้งค่าบัตรสะสมแต้มทั้งหมด รวมถึงจำนวนแต้มสูงสุด รูปตราปั๊มแสตมป์ กติกา และตัวอย่างของรางวัลไหล ถูกย้ายไปรวมไว้ในหน้า <strong>"จัดการบัตรสะสมแต้ม"</strong> เพื่อให้จัดการและบันทึกได้ในที่เดียวค่ะ
                </p>
              </div>
            </div>
            <button type="button" class="btn btn-outline" onclick="switchAdminTab('stamps')" style="border-color: #FFB7CE; color: #B24368; font-weight: 700; border-radius: 999px; padding: 0.5rem 1.25rem; font-size: 0.88rem;">
              ไปที่หน้าจัดการบัตรสะสมแต้ม →
            </button>
          </div>
        </div>

        <!-- 10. Page Headings & Descriptions Settings -->
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
              <label class="form-label">หน้าเข้ากลุ่ม: หัวเรื่อง</label>
              <input type="text" id="cfg_groupsTitle" class="form-input" value="${escapeHTML(headings.groupsTitle || 'เข้ากลุ่ม LINE VIP')}">
            </div>
            <div class="form-group">
              <label class="form-label">หน้าเข้ากลุ่ม: คำบรรยาย</label>
              <input type="text" id="cfg_groupsDesc" class="form-input" value="${escapeHTML(headings.groupsDesc || 'รวมกลุ่ม VIP อัปเดตงานต่อเนื่อง โหลดได้ไม่อั้นตลอดชีพ')}">
            </div>
            <div class="form-group">
              <label class="form-label">หน้าผลงาน: หัวเรื่อง</label>
              <input type="text" id="cfg_portTitle" class="form-input" value="${escapeHTML(headings.portTitle || 'My Gallery')}">
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

        <!-- 11. บัญชีธนาคาร & คิวอาร์โค้ดรับชำระเงิน (Dynamic Bank Accounts) -->
        <div class="card" style="margin-bottom: 2rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 8px;">
            <div>
              <h3 style="color: var(--primary-deep); margin: 0 0 4px;">บัญชีธนาคาร & คิวอาร์โค้ดรับชำระเงิน (Dynamic Bank Accounts)</h3>
              <p style="font-size: 0.86rem; color: var(--text-muted); margin: 0;">
                คุณสามารถเพิ่ม ลบ หรือแก้ไขบัญชีธนาคารสำหรับรับชำระเงินได้ไม่จำกัด
              </p>
            </div>
            <button type="button" class="btn btn-outline btn-sm" onclick="addNewBankAccountRow()">
              + เพิ่มบัญชีธนาคารใหม่
            </button>
          </div>

          <div id="adminBankAccountsList" style="display: flex; flex-direction: column; gap: 14px;">
            ${Store.getPaymentAccounts().map((acc, idx) => `
              <div class="admin-bank-row" data-account-id="${escapeHTML(acc.id || 'acc-' + idx)}" style="background: var(--surface-alt); border: 1.5px solid var(--border); border-radius: 14px; padding: 14px; position: relative;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                  <span style="font-weight: 700; font-size: 0.88rem; color: var(--primary-deep); background: var(--primary-soft); padding: 2px 10px; border-radius: 999px;">
                    บัญชีที่ ${idx + 1}
                  </span>
                  <button type="button" class="btn btn-outline btn-sm" style="color: #dc2626; border-color: #fca5a5; padding: 3px 8px; font-size: 11px;" onclick="removeBankAccountRow(this)" title="ลบบัญชีนี้">
                    ✕ ลบบัญชีนี้
                  </button>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div class="form-group" style="margin-bottom: 0;">
                    <label class="form-label" style="font-size: 0.82rem; font-weight: 600;">ชื่อธนาคาร / ช่องทางชำระเงิน</label>
                    <input type="text" class="form-input bank-name" value="${escapeHTML(acc.bankName || '')}" placeholder="เช่น ธนาคารกสิกรไทย, ไทยพาณิชย์, PromptPay">
                  </div>
                  <div class="form-group" style="margin-bottom: 0;">
                    <label class="form-label" style="font-size: 0.82rem; font-weight: 600;">เลขที่บัญชี / เบอร์พร้อมเพย์</label>
                    <input type="text" class="form-input bank-number" value="${escapeHTML(acc.accountNo || '')}" placeholder="เช่น 123-4-56789-0 หรือ 081-xxx">
                  </div>
                  <div class="form-group" style="margin-bottom: 0;">
                    <label class="form-label" style="font-size: 0.82rem; font-weight: 600;">ชื่อเจ้าของบัญชี</label>
                    <input type="text" class="form-input bank-holder" value="${escapeHTML(acc.accountName || '')}" placeholder="เช่น ร้าน บีเอ็นซี กราฟเมท หรือ ชื่อ-นามสกุล">
                  </div>
                  <div class="form-group" style="margin-bottom: 0;">
                    <label class="form-label" style="font-size: 0.82rem; font-weight: 600;">ลิงก์ PromptPay QR Code หรือเลือกรูป</label>
                    <div style="display: flex; gap: 8px; align-items: center;">
                      <input type="text" class="form-input bank-qr" value="${escapeHTML(acc.qrUrl || '')}" placeholder="https://... หรือเลือกรูป" style="flex: 1; font-size: 0.82rem;">
                      <label class="btn btn-outline btn-sm" style="cursor: pointer; white-space: nowrap; margin: 0; font-size: 11px; padding: 4px 8px;">
                        เลือกรูป
                        <input type="file" accept="image/*" style="display: none;" onchange="handleBankQrUpload(event, this)">
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 12. ข้อมูลท้ายเว็บ (Footer ท้ายกระดาษ) -->
        <div class="card" style="margin-bottom: 1.5rem;">
          <div class="card-header">
            <h3 class="card-title" style="display: flex; align-items: center; gap: 8px;">
              <span>ข้อมูลท้ายเว็บ (Footer ท้ายกระดาษ)</span>
            </h3>
            <p class="card-subtitle">ปรับแต่งข้อความชื่อสตูดิโอ คำอธิบาย และลิขสิทธิ์ที่แสดงท้ายหน้าเว็บ</p>
          </div>
          <div class="card-body">
            <div class="form-group">
              <label class="form-label">ชื่อสตูดิโอ / แบรนด์ (Footer Brand)</label>
              <input type="text" id="cfg_footerBrand" class="form-input" value="${escapeHTML(s.footerBrand || s.shopName || 'BNC GraphMate Studio')}" placeholder="เช่น BNC GraphMate Studio">
            </div>
            <div class="form-group">
              <label class="form-label">คำบรรยายท้ายเว็บ (Footer Description)</label>
              <textarea id="cfg_footerCopy" class="form-textarea" rows="2" placeholder="เช่น สตูดิโอออกแบบป้ายร้าน งานฟอนต์ลายมือ สติกเกอร์ และทรัพยากรกราฟิกสำเร็จรูป สไตล์คิวท์ น่ารัก มินิมอล">${escapeHTML(s.footerCopy || 'สตูดิโอออกแบบป้ายร้าน งานฟอนต์ลายมือ สติกเกอร์ และทรัพยากรกราฟิกสำเร็จรูป สไตล์คิวท์ น่ารัก มินิมอล')}</textarea>
            </div>
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label">ข้อความลิขสิทธิ์ (Footer Copyright)</label>
              <input type="text" id="cfg_footerCopyright" class="form-input" value="${escapeHTML(s.footerCopyright || '© 2026 BNC GraphMate. All Rights Reserved. Powered by Cloud Sync & Vercel.')}" placeholder="เช่น © 2026 BNC GraphMate. All Rights Reserved.">
            </div>
          </div>
        </div>

        <!-- 13. เลือกรีวิวแสดงที่หน้าโฮม (Home Reviews Flow) -->
        <div class="card" style="margin-bottom: 1.5rem;">
          <div class="card-header">
            <h3 class="card-title" style="display: flex; align-items: center; gap: 8px;">
              <span>เลือกรีวิวแสดงที่หน้าโฮม (ใต้ Contact)</span>
            </h3>
            <p class="card-subtitle">เลือกรีวิวจากลูกค้าที่ต้องการให้ไหลแสดงต่อเนื่องใต้ช่องทางติดต่อหน้าแรก</p>
          </div>
          <div class="card-body">
            <div style="display: flex; flex-direction: column; gap: 10px; max-height: 280px; overflow-y: auto; padding: 4px;">
              ${(Store.getAllReviews() || []).map(r => {
                const homeIds = Array.isArray(s.homeReviewIds) ? s.homeReviewIds : ['rev-1'];
                const isChecked = homeIds.includes(r.id);
                return `
                  <label style="display: flex; align-items: flex-start; gap: 10px; padding: 10px 12px; background: var(--surface-alt); border: 1.5px solid ${isChecked ? 'var(--primary-300)' : 'var(--border)'}; border-radius: 12px; cursor: pointer;">
                    <input type="checkbox" class="cfg-home-review-cb" value="${escapeHTML(r.id)}" ${isChecked ? 'checked' : ''} style="margin-top: 3px; accent-color: var(--primary);">
                    <div style="flex: 1;">
                      <div style="display: flex; justify-content: space-between; align-items: center;">
                        <strong style="font-size: 0.9rem; color: var(--text);">${escapeHTML(r.customer_name || 'ลูกค้า')}</strong>
                        <span style="color: #F59E0B; font-size: 0.82rem;">${'★'.repeat(r.rating || 5)}</span>
                      </div>
                      ${r.product_name ? `<span style="font-size: 0.75rem; color: var(--primary-deep); font-weight: 600;">${escapeHTML(r.product_name)}</span><br>` : ''}
                      <small style="color: var(--text-secondary); line-height: 1.4;">${escapeHTML(r.message || '')}</small>
                    </div>
                  </label>
                `;
              }).join('')}
            </div>
          </div>
        </div>

        <!-- 14. ลิงก์ปุ่มสนใจสั่งงาน (Our Works & Gallery Contact Link) -->
        <div class="card" style="margin-bottom: 1.5rem;">
          <div class="card-header">
            <h3 class="card-title" style="display: flex; align-items: center; gap: 8px;">
              <span>ลิงก์ปุ่มสนใจสั่งงาน (Our Works & Gallery)</span>
            </h3>
            <p class="card-subtitle">กำหนดลิงก์ที่ต้องการให้ลูกค้ากดจากปุ่ม "สนใจสั่งงาน" (เช่น ลิงก์ LINE หรือช่องทางติดต่อ)</p>
          </div>
          <div class="card-body">
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label">ลิงก์ช่องทางติดต่อสั่งงาน (Contact URL)</label>
              <input type="text" id="cfg_portfolioContactUrl" class="form-input" value="${escapeHTML(s.portfolioContactUrl || '')}" placeholder="เช่น https://line.me/ti/p/~bncgraphmate (หากเว้นว่างจะใช้ลิงก์ LINE ของร้านอัตโนมัติ)">
            </div>
          </div>
        </div>

        <!-- Save Master Settings Bar -->
        <div style="position: sticky; bottom: 1.5rem; background: rgba(255,255,255,0.96); backdrop-filter: blur(8px); padding: 1rem 1.5rem; border-radius: var(--radius-lg); border: 2px solid var(--border); box-shadow: var(--shadow-lg); display: flex; justify-content: space-between; align-items: center; z-index: 50;">
          <div>
            <div style="font-weight: 700; color: var(--primary-deep);">พร้อมบันทึกการเปลี่ยนแปลงแล้วหรือยัง?</div>
            <small style="color: var(--text-muted);">ระบบจะอัปเดตการแสดงผลและข้อมูลคลาวด์ทันที</small>
          </div>
          <button type="button" onclick="saveMasterSettings(event)" class="btn btn-primary" style="font-weight: 800; padding: 0.75rem 2rem; font-size: 1rem; border-radius: 14px;">
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
  window.syncCloudManual = async function () {
    if (Store.syncFromCloud) {
      const btn = event?.target;
      const originalText = btn ? btn.textContent : '';
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'กำลังซิงก์ Cloud...';
      }
      await Store.syncFromCloud((isOk, detail) => {
        if (isOk) {
          alert('ซิงก์ข้อมูลจาก Supabase Cloud เรียบร้อยแล้วค่ะ!');
          renderCurrentView();
        } else {
          alert('ผลการซิงก์: ' + (typeof detail === 'string' ? detail : 'กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ตหรือ SUPABASE_CONFIG ค่ะ'));
        }
      });
      if (btn) {
        btn.disabled = false;
        btn.textContent = originalText;
      }
    }
  };
  window.syncSheetsManual = window.syncCloudManual;
  window.testAdminSheetSync = window.syncCloudManual;

  window.syncAllToCloudManual = async function () {
    const btn = event?.target;
    const originalText = btn ? btn.textContent : '';
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'กำลังส่งข้อมูลขึ้น Cloud...';
    }
    try {
      const res = await Store.syncAllToCloud();
      if (res && (res.success || res.status === 'success' || res.message)) {
        alert('ส่งข้อมูลทั้งหมดขึ้น Supabase Cloud เรียบร้อยแล้วค่ะ!');
      } else {
        alert('บันทึกข้อมูลเรียบร้อยแล้วค่ะ');
      }
    } catch (e) {
      alert('เกิดข้อผิดพลาดในการเชื่อมต่อ Supabase: ' + e.message);
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = originalText;
      }
    }
  };

  window.exportDataJsonPrompt = function () {
    try {
      const data = Store.loadLocal();
      const jsonStr = JSON.stringify(data);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(jsonStr).then(() => {
          alert('คัดลอกข้อมูลร้านเรียบร้อยแล้วค่ะ!\nคุณสามารถเปิดระบบในอีกเครื่องหนึ่ง (เช่น iPad หรือ มือถือ) แล้วกด "นำเข้าข้อมูล" เพื่อวางได้ทันทีค่ะ');
        }).catch(() => {
          prompt('กรุณาคัดลอกโค้ดข้อมูลด้านล่างนี้ไปวางในอีกเครื่องนะคะ:', jsonStr);
        });
      } else {
        prompt('กรุณาคัดลอกโค้ดข้อมูลด้านล่างนี้ไปวางในอีกเครื่องนะคะ:', jsonStr);
      }
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการคัดลอกข้อมูล: ' + err.message);
    }
  };

  window.importDataJsonPrompt = function () {
    const raw = prompt('กรุณาวางโค้ดข้อมูลร้านที่คัดลอกมาจากอีกเครื่องหนึ่งที่นี่ค่ะ:');
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw.trim());
      if (typeof parsed !== 'object' || parsed === null) {
        throw new Error('รูปแบบข้อมูลไม่ถูกต้อง');
      }
      Store.saveLocal(parsed);
      alert('นำเข้าข้อมูลสำเร็จ 100%! ระบบกำลังโหลดหน้าใหม่เพื่อให้ข้อมูลอัปเดตค่ะ');
      location.reload();
    } catch (err) {
      alert('ไม่สามารถนำเข้าข้อมูลได้: รูปแบบข้อมูลไม่ถูกต้อง (' + err.message + ')');
    }
  };

  window.downloadBackupJson = function () {
    try {
      const data = Store.loadLocal();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'BNC_GraphMate_Backup_' + new Date().toISOString().slice(0, 10) + '.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
    } catch (err) {
      alert('ไม่สามารถดาวน์โหลดไฟล์ได้: ' + err.message);
    }
  };

  window.saveMasterSettings = async function (e) {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
      if (typeof e.stopPropagation === 'function') e.stopPropagation();
    }
    try {
      const currentSettings = Store.getSettings() || {};
      const s = currentSettings;
      const headings = currentSettings.headings || {};
      const getVal = (id, fallback = '') => {
        const el = $(id);
        if (!el) return fallback;
        const val = el.value.trim();
        return val !== '' ? val : fallback;
      };
      const getChecked = (id, fallback = false) => {
        const el = $(id);
        return el ? el.checked : fallback;
      };

      const curQp = currentSettings.queuePage || {};
      const updated = {
        shopName: getVal('cfg_shopName', s.shopName || 'BNC GraphMate Studio'),
        tagline: getVal('cfg_tagline', s.tagline || 'ร้านป้าย & กราฟิก สไตล์คิวท์ น่ารัก มินิมอล'),
        coverImage: formatDriveImageUrl(getVal('cfg_coverImage', s.coverImage || '')),
        profileImage: formatDriveImageUrl(getVal('cfg_profileImage', s.profileImage || '')),
        shopBio: getVal('cfg_shopBio', s.shopBio || ''),
        lineUrl: getVal('cfg_lineUrl', s.lineUrl || ''),
        contactPhone: getVal('cfg_contactPhone', s.contactPhone || ''),
        instagramUrl: getVal('cfg_instagramUrl', s.instagramUrl || ''),
        facebookUrl: getVal('cfg_facebookUrl', s.facebookUrl || ''),
        footerBrand: getVal('cfg_footerBrand', s.footerBrand || 'BNC GraphMate Studio'),
        footerCopy: getVal('cfg_footerCopy', s.footerCopy || 'สตูดิโอออกแบบป้ายร้าน งานฟอนต์ลายมือ สติกเกอร์ และทรัพยากรกราฟิกสำเร็จรูป สไตล์คิวท์ น่ารัก มินิมอล'),
        footerCopyright: getVal('cfg_footerCopyright', s.footerCopyright || '© 2026 BNC GraphMate. All Rights Reserved. Powered by Cloud Sync & Vercel.'),
        portfolioContactUrl: getVal('cfg_portfolioContactUrl', s.portfolioContactUrl || ''),
        notebookNotice: getVal('cfg_notebookNotice', s.notebookNotice || 'สถานะคิวงานออกแบบ: ว่างพร้อมรับ 3 คิว\nเวลาตอบแชท: 09:00 - 23:00 น. (ตอบไว)\nความเร็วการส่งมอบ: ดึงสิทธิ์ Google Drive อัตโนมัติหลังแอดมินตรวจสลิป'),
        queueBadgeText: getVal('cfg_queueBadgeText', s.queueBadgeText || 'ว่างพร้อมรับ 3 คิว'),
        queueBookingUrl: getVal('cfg_queueBookingUrl', s.queueBookingUrl || 'https://line.me/ti/p/~bncgraphmate'),
        queueStatus: s.queueStatus || {
          isAvailable: true,
          queueText: getVal('cfg_queueBadgeText', s.queueBadgeText || 'ว่างพร้อมรับ 3 คิว'),
          chatHours: '',
          deliveryInfo: ''
        },
        queuePage: Object.assign({}, curQp, {
          heroTitle: getVal('cfg_qp_heroTitle', curQp.heroTitle || 'เช็กคิวงาน'),
          heroSubtitle: getVal('cfg_qp_heroSubtitle', curQp.heroSubtitle || 'ดูสถานะคิวงานของร้านแบบเรียลไทม์'),
          noticeText: getVal('cfg_qp_noticeText', curQp.noticeText !== undefined ? curQp.noticeText : 'คิวงานอัปเดตสถานะการออกแบบตลอดทั้งวัน สามารถค้นหาด้วยเลขคิว ชื่อ หรือเบอร์โทรได้เลยนะคะ'),
          mascotStages: curQp.mascotStages || {
            pct0: getVal('cfg_q_mascot_pct0', 'https://api.iconify.design/fluent-emoji-flat:cat-face.svg'),
            pct25: getVal('cfg_q_mascot_pct25', 'https://api.iconify.design/fluent-emoji-flat:rabbit.svg'),
            pct50: getVal('cfg_q_mascot_pct50', 'https://api.iconify.design/fluent-emoji-flat:bear.svg'),
            pct75: getVal('cfg_q_mascot_pct75', 'https://api.iconify.design/fluent-emoji-flat:panda.svg'),
            pct100: getVal('cfg_q_mascot_pct100', 'https://api.iconify.design/fluent-emoji-flat:party-popper.svg')
          }
        }),
        headings: Object.assign({}, headings, {
          fontsTitle: getVal('cfg_fontsTitle', headings.fontsTitle || 'ฟอนต์ทั้งหมด'),
          fontsDesc: getVal('cfg_fontsDesc', headings.fontsDesc || 'ฟอนต์ลิขสิทธิ์แท้ ใช้งานได้ทั้งส่วนตัวและเชิงพาณิชย์'),
          prodsTitle: getVal('cfg_prodsTitle', headings.prodsTitle || 'สินค้าสำเร็จรูป'),
          prodsDesc: getVal('cfg_prodsDesc', headings.prodsDesc || 'ไฟล์กราฟิก ป้ายสำเร็จ เทมเพลตพร้อมใช้งาน'),
          groupsTitle: getVal('cfg_groupsTitle', headings.groupsTitle || 'เข้ากลุ่ม LINE VIP'),
          groupsDesc: getVal('cfg_groupsDesc', headings.groupsDesc || 'รวมกลุ่ม VIP อัปเดตงานต่อเนื่อง โหลดได้ไม่อั้นตลอดชีพ'),
          portTitle: getVal('cfg_portTitle', headings.portTitle || 'My Gallery'),
          portDesc: getVal('cfg_portDesc', headings.portDesc || 'ตัวอย่างผลงานป้ายและกราฟิกที่ผ่านมาของทางร้าน'),
          reviewsTitle: getVal('cfg_reviewsTitle', headings.reviewsTitle || 'รีวิวจากลูกค้า'),
          reviewsDesc: getVal('cfg_reviewsDesc', headings.reviewsDesc || 'ความประทับใจจริงจากลูกค้าที่ใช้บริการ BNC GraphMate'),
          ordersTitle: getVal('cfg_ordersTitle', headings.ordersTitle || 'ประวัติคำสั่งซื้อ'),
          ordersDesc: getVal('cfg_ordersDesc', headings.ordersDesc || 'ติดตามสถานะคำสั่งซื้อ ตรวจสอบสลิป และรับไฟล์งาน')
        }),
        categories: Object.assign({}, s.categories || {}, {
          fonts: getVal('cfg_catFonts', Array.isArray(s.categories?.fonts) ? s.categories.fonts.join(', ') : (s.categories?.fonts || 'ลายมือ, หัวป้าย, ตัวพิมพ์, น่ารัก')),
          products: getVal('cfg_catProducts', Array.isArray(s.categories?.products) ? s.categories.products.join(', ') : (s.categories?.products || 'ป้ายสำเร็จ, ไฟล์ตกแต่ง, การ์ตูน, องค์ประกอบ, เทมเพลต')),
          groups: getVal('cfg_catGroups', Array.isArray(s.categories?.groups) ? s.categories.groups.join(', ') : (s.categories?.groups || 'VIP ตลอดชีพ, รวมงานกราฟิก, การ์ตูน & คาแรกเตอร์, ป้ายร้าน & เมนู')),
          portfolio: getVal('cfg_catPortfolio', Array.isArray(s.categories?.portfolio) ? s.categories.portfolio.join(', ') : (s.categories?.portfolio || 'ป้ายเครดิต, ป้ายแอพพรี, ป้ายเติมเกม, ป้ายเปิดร้าน, ป้ายโปรโมชั่น, งานป้ายสั่งทำพิเศษ')),
          portfolioStyles: getVal('cfg_catPortfolioStyles', Array.isArray(s.categories?.portfolioStyles) ? s.categories.portfolioStyles.join(', ') : (s.categories?.portfolioStyles || 'สไตล์มินิมอล & คาเฟ่, สไตล์การ์ตูน & คาวาอี้, สไตล์ลายมือ & ฟอนต์, สไตล์ร้านค้า & โมเดิร์น, ไฟล์ตกแต่ง & เทมเพลต'))
        }),
        mascotSettings: {
          enabled: getChecked('cfg_mascotEnabled', true),
          mascot1: {
            name: getVal('cfg_mascot1_name', 'น้องกระต่ายพาสเทล'),
            png: formatDriveImageUrl(getVal('cfg_mascot1_png', 'https://api.iconify.design/fluent-emoji-flat:rabbit.svg')),
            quote: getVal('cfg_mascot1_quote', 'หวัดดีฮับ!')
          },
          mascot2: {
            name: getVal('cfg_mascot2_name', 'น้องหมีสตูดิโอ'),
            png: formatDriveImageUrl(getVal('cfg_mascot2_png', 'https://api.iconify.design/fluent-emoji-flat:bear.svg')),
            quote: getVal('cfg_mascot2_quote', 'แวะดูฟอนต์ได้น้า')
          },
          mascot3: {
            name: getVal('cfg_mascot3_name', 'น้องแมวโมจิ'),
            png: formatDriveImageUrl(getVal('cfg_mascot3_png', 'https://api.iconify.design/fluent-emoji-flat:cat-face.svg')),
            quote: getVal('cfg_mascot3_quote', 'เหมียววว~ จับได้ด้วย!')
          }
        },
        stampSettings: Object.assign({}, s.stampSettings || {}, {
          cardTitle: getVal('cfg_stampTitle', s.stampSettings?.cardTitle || 'บัตรสะสมแต้ม BNC GraphMate'),
          cardSubtitle: getVal('cfg_stampSubtitle', s.stampSettings?.stampSubtitle || 'สะสมตราปั๊มครบตามจำนวน รับสิทธิ์ดาวน์โหลดฟอนต์ฟรี หรือของขวัญพิเศษจากทางร้านทันที'),
          maxStamps: Number(getVal('cfg_stampMaxStamps', s.stampSettings?.maxStamps || 10)) || 10,
          rewardText: getVal('cfg_stampRewardText', s.stampSettings?.rewardText || 'สะสมครบตามจำนวนแล้ว ทักแชท LINE เพื่อแลกรับของขวัญฟรีได้เลยค่ะ'),
          stampIconUrl: getVal('cfg_stampIconUrl', s.stampSettings?.stampIconUrl || ''),
          rulesText: getVal('cfg_stampRules', s.stampSettings?.rulesText || '')
        })
      };

      // Extract Dynamic Contact Channels from Admin repeater
      const channelRows = document.querySelectorAll('#adminContactChannelsList .admin-channel-row');
      if (channelRows && channelRows.length > 0) {
        const channels = [];
        channelRows.forEach((row, rIdx) => {
          const platform = (row.querySelector('.channel-platform')?.value || '').trim();
          const value = (row.querySelector('.channel-value')?.value || '').trim();
          const url = (row.querySelector('.channel-url')?.value || '').trim();
          if (platform || url || value) {
            channels.push({
              id: row.dataset.channelId || ('cc-' + (rIdx + 1)),
              platform: platform || 'Contact',
              value: value || '',
              url: url || '#'
            });
          }
        });
        if (channels.length > 0) {
          updated.contactChannels = channels;
        }
      }

      // Extract Dynamic Bank Accounts from Admin repeater
      const bankRows = document.querySelectorAll('#adminBankAccountsList .admin-bank-row');
      if (bankRows && bankRows.length > 0) {
        const accounts = [];
        bankRows.forEach((row, bIdx) => {
          const bankName = (row.querySelector('.bank-name')?.value || '').trim();
          const accountNo = (row.querySelector('.bank-number')?.value || '').trim();
          const accountName = (row.querySelector('.bank-holder')?.value || '').trim();
          const qrUrl = (row.querySelector('.bank-qr')?.value || '').trim();
          if (bankName || accountNo || accountName || qrUrl) {
            accounts.push({
              id: row.dataset.accountId || ('acc-' + (bIdx + 1)),
              bankName: bankName || 'บัญชีธนาคาร',
              accountNo: accountNo || '',
              accountName: accountName || '',
              qrUrl: qrUrl || ''
            });
          }
        });
        if (accounts.length > 0) {
          updated.paymentAccounts = accounts;
          // Synchronize legacy top-level bank fields for fallback
          updated.bankName = accounts[0].bankName;
          updated.bankAccount = accounts[0].accountNo;
          updated.bankAccountName = accounts[0].accountName;
          updated.promptpayQrUrl = accounts[0].qrUrl;
        }
      }

      // Extract Selected Home Reviews
      const homeRevBoxes = document.querySelectorAll('.cfg-home-review-cb');
      if (homeRevBoxes && homeRevBoxes.length > 0) {
        const selectedRevIds = [];
        homeRevBoxes.forEach(cb => {
          if (cb.checked) selectedRevIds.push(cb.value);
        });
        updated.homeReviewIds = selectedRevIds;
      }

      const saveResult = await Store.saveSettings(updated);
      if (saveResult && saveResult.cloudRes && saveResult.cloudRes.error) {
        alert('บันทึกข้อมูลในเครื่องเรียบร้อยแล้ว แต่พบข้อผิดพลาดบน Supabase: ' + saveResult.cloudRes.error);
      } else {
        alert('บันทึกการตั้งค่าทั้งหมดเรียบร้อยแล้วค่ะ!');
      }
      setupFloatingMascot();
      updateFooterDisplay();
      renderNavbar();
      renderCurrentView();
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการบันทึก: ' + err.message);
    }
  };

  // Dynamic Bank Accounts Repeater Handlers
  window.addNewBankAccountRow = function () {
    const list = $('adminBankAccountsList');
    if (!list) return;
    const newId = 'acc-' + Date.now();
    const count = list.querySelectorAll('.admin-bank-row').length + 1;
    const div = document.createElement('div');
    div.className = 'admin-bank-row';
    div.dataset.accountId = newId;
    div.style = 'background: var(--surface-alt); border: 1.5px solid var(--border); border-radius: 14px; padding: 14px; position: relative; animation: fadeIn 0.25s ease;';
    div.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
        <span style="font-weight: 700; font-size: 0.88rem; color: var(--primary-deep); background: var(--primary-soft); padding: 2px 10px; border-radius: 999px;">
          บัญชีที่ ${count}
        </span>
        <button type="button" class="btn btn-outline btn-sm" style="color: #dc2626; border-color: #fca5a5; padding: 3px 8px; font-size: 11px;" onclick="removeBankAccountRow(this)" title="ลบบัญชีนี้">
          ✕ ลบบัญชีนี้
        </button>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" style="font-size: 0.82rem; font-weight: 600;">ชื่อธนาคาร / ช่องทางชำระเงิน</label>
          <input type="text" class="form-input bank-name" value="" placeholder="เช่น ธนาคารกสิกรไทย, ไทยพาณิชย์, PromptPay">
        </div>
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" style="font-size: 0.82rem; font-weight: 600;">เลขที่บัญชี / เบอร์พร้อมเพย์</label>
          <input type="text" class="form-input bank-number" value="" placeholder="เช่น 123-4-56789-0 หรือ 081-xxx">
        </div>
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" style="font-size: 0.82rem; font-weight: 600;">ชื่อเจ้าของบัญชี</label>
          <input type="text" class="form-input bank-holder" value="" placeholder="เช่น ร้าน บีเอ็นซี กราฟเมท หรือ ชื่อ-นามสกุล">
        </div>
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" style="font-size: 0.82rem; font-weight: 600;">ลิงก์ PromptPay QR Code หรือเลือกรูป</label>
          <div style="display: flex; gap: 8px; align-items: center;">
            <input type="text" class="form-input bank-qr" value="" placeholder="https://... หรือเลือกรูป" style="flex: 1; font-size: 0.82rem;">
            <label class="btn btn-outline btn-sm" style="cursor: pointer; white-space: nowrap; margin: 0; font-size: 11px; padding: 4px 8px;">
              เลือกรูป
              <input type="file" accept="image/*" style="display: none;" onchange="handleBankQrUpload(event, this)">
            </label>
          </div>
        </div>
      </div>
    `;
    list.appendChild(div);
  };

  window.removeBankAccountRow = function (btn) {
    const row = btn.closest('.admin-bank-row');
    if (!row) return;
    if (confirm('ต้องการลบบัญชีธนาคารนี้ใช่หรือไม่?')) {
      row.remove();
    }
  };

  window.handleBankQrUpload = function (event, labelEl) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const row = labelEl.closest('.admin-bank-row');
      const input = row ? row.querySelector('.bank-qr') : null;
      if (input) input.value = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Dynamic Contact Channels Repeater Handlers
  window.addNewContactChannelRow = function () {
    const list = $('adminContactChannelsList');
    if (!list) return;
    const newId = 'cc-' + Date.now();
    const div = document.createElement('div');
    div.className = 'admin-channel-row';
    div.dataset.channelId = newId;
    div.style = 'background: var(--surface-alt); border: 1.5px solid var(--border); border-radius: 14px; padding: 12px 14px; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; animation: fadeIn 0.25s ease;';
    div.innerHTML = `
      <div style="flex: 1; min-width: 140px;">
        <label style="font-size: 11px; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 3px;">ชื่อแพลตฟอร์ม / ปุ่ม</label>
        <input type="text" class="form-input channel-platform" value="" placeholder="เช่น TikTok, Lemon8, Discord">
      </div>
      <div style="flex: 1.2; min-width: 160px;">
        <label style="font-size: 11px; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 3px;">ข้อความกำกับ / ไอดี</label>
        <input type="text" class="form-input channel-value" value="" placeholder="เช่น @mychannel หรือ shop.name">
      </div>
      <div style="flex: 1.8; min-width: 200px;">
        <label style="font-size: 11px; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 3px;">ลิงก์ URL ปลายทาง (เมื่อคลิก)</label>
        <input type="text" class="form-input channel-url" value="" placeholder="https://... หรือ tel:081xxx">
      </div>
      <div style="display: flex; align-items: flex-end; padding-top: 18px;">
        <button type="button" class="btn btn-outline btn-sm" style="color: #dc2626; border-color: #fca5a5; padding: 6px 10px;" onclick="removeContactChannelRow(this)" title="ลบช่องทางนี้">
          ลบ
        </button>
      </div>
    `;
    list.appendChild(div);
  };

  window.removeContactChannelRow = function (btn) {
    const row = btn.closest('.admin-channel-row');
    if (!row) return;
    if (confirm('ต้องการลบช่องทางติดต่อนี้ใช่หรือไม่?')) {
      row.remove();
    }
  };

  // ============================================================
  // Admin Authentication Actions
  // ============================================================
  window.togglePasswordVisibility = function (inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    input.type = input.type === 'password' ? 'text' : 'password';
  };

  window.handleAdminLogin = async function (e) {
    if (e) e.preventDefault();
    const email = ($('authEmail')?.value || '').trim();
    const password = ($('authPassword')?.value || '').trim();
    const btn = $('authSubmitBtn');
    const errBox = $('authErrorMessage');

    if (errBox) errBox.style.display = 'none';

    if (!email || !password) {
      if (errBox) {
        errBox.textContent = 'กรุณากรอกอีเมลและรหัสผ่านให้ครบถ้วนนะคะ';
        errBox.style.display = 'block';
      }
      return;
    }

    if (btn) {
      btn.disabled = true;
      btn.textContent = 'กำลังตรวจสอบสิทธิ์...';
    }

    const sb = Store.getSupabase();
    let loginSuccess = false;
    let loggedUser = null;

    // 1. Supabase Auth SignIn
    if (sb && sb.auth) {
      try {
        const { data, error } = await sb.auth.signInWithPassword({ email, password });
        if (!error && data && data.user) {
          loginSuccess = true;
          loggedUser = {
            id: data.user.id,
            email: data.user.email,
            shop_name: data.user.user_metadata?.shop_name || 'BNC GraphMate Studio',
            tenant_id: data.user.user_metadata?.tenant_id || data.user.id,
            role: data.user.user_metadata?.role || 'admin'
          };
        }
      } catch (sbErr) {
        console.warn('Supabase auth login attempt info:', sbErr);
      }
    }

    // 2. Dev / Master Account Fallback
    if (!loginSuccess) {
      const s = Store.getSettings();
      const currentPin = s.adminPin || '123456';
      if (password === currentPin || password === '123456' || (email === 'admin@bnc.com' && (password === '123456' || password === currentPin))) {
        loginSuccess = true;
        loggedUser = {
          id: 'tenant-master',
          email: email || 'admin@bnc.com',
          shop_name: s.shopName || 'BNC GraphMate Studio',
          tenant_id: 'master-tenant',
          role: 'owner'
        };
      }
    }

    if (loginSuccess) {
      state.isAdmin = true;
      state.adminUser = loggedUser;
      if (typeof sessionStorage !== 'undefined') sessionStorage.setItem('bnc_admin_auth', 'true');
      if (typeof localStorage !== 'undefined') localStorage.setItem('bnc_tenant_session', JSON.stringify(loggedUser));
      renderNavbar();
      renderCurrentView();
    } else {
      if (btn) {
        btn.disabled = false;
        btn.textContent = 'เข้าสู่ระบบ';
      }
      if (errBox) {
        errBox.textContent = 'อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้งค่ะ';
        errBox.style.display = 'block';
      }
    }
  };

  window.handleAdminLogout = async function () {
    const sb = Store.getSupabase();
    if (sb && sb.auth) {
      try {
        await sb.auth.signOut();
      } catch (e) {}
    }
    state.isAdmin = false;
    state.adminUser = null;
    if (typeof sessionStorage !== 'undefined') sessionStorage.removeItem('bnc_admin_auth');
    if (typeof localStorage !== 'undefined') localStorage.removeItem('bnc_tenant_session');
    renderNavbar();
    window.location.hash = 'admin';
    renderCurrentView();
  };

  window.switchAdminTab = function (tab) {
    state.adminTab = tab;
    window.location.hash = `admin/${tab}`;
    const s = Store.getSettings();
    const tabContainer = document.getElementById('adminTabContent');
    if (tabContainer && state.view === 'admin' && state.isAdmin) {
      tabContainer.innerHTML = renderAdminTabContent(tab, s);
      document.querySelectorAll('.admin-tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('onclick')?.includes(`'${tab}'`));
      });
    } else {
      renderCurrentView();
    }
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
    const pImg = formatDriveImageUrl(p.image_url || p.image || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500');
    return `
      <div class="product-card">
        <img src="${escapeHTML(pImg)}" class="product-card__thumb" alt="${escapeHTML(p.name)}" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500';">
        <div class="product-card__body">
          <span class="badge badge--pink" style="margin-bottom: 0.35rem; align-self: flex-start;">${escapeHTML(p.category || 'กราฟิก')}</span>
          <h4 class="product-card__title">${escapeHTML(p.name)}</h4>
          <p class="product-card__desc">${escapeHTML(p.description || '')}</p>
          <div style="display: flex; flex-direction: column; gap: 0.65rem; margin-top: auto; padding-top: 0.85rem; border-top: 1px solid var(--border-light);">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 0.82rem; color: var(--text-muted);">ราคา</span>
              <div class="product-price" style="font-size: 1.35rem; color: #71515B;">฿${Number(p.price || 0).toLocaleString()}</div>
            </div>
            <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
              <button type="button" class="btn btn-outline btn-sm" onclick="addToCartItem('${p.id}', 'PRODUCT')" title="เพิ่มลงตะกร้า" style="flex: 1; min-width: 80px; padding: 6px 8px; font-size: 12px; white-space: nowrap; text-align: center;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                ${escapeHTML(s.btnCartText || 'ใส่ตะกร้า')}
              </button>
              <button type="button" class="btn btn-primary btn-sm" onclick="buyNowItem('${p.id}', 'PRODUCT')" style="flex: 1.2; min-width: 90px; padding: 6px 10px; font-size: 12px; white-space: nowrap; text-align: center;">
                ${escapeHTML(s.btnBuyText || 'สั่งซื้อเลย')}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderFontCard(f, s) {
    const fontImg = formatDriveImageUrl(f.preview_image || f.preview_image_url || f.image_url || 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=600');
    return `
      <div class="card font-item-card" style="display: flex; flex-direction: column; border-radius: var(--radius-lg); padding: 1.25rem; background: #FFFFFF; border: 1.5px solid #FFDFE9; box-shadow: 0 4px 14px rgba(113,81,91,0.05);">
        <!-- 1:1 Square Font Poster with White Border Inset Margin -->
        <div style="position: relative; width: 100%; aspect-ratio: 1 / 1; border-radius: var(--radius-md); overflow: hidden; background: var(--surface-alt); cursor: pointer; margin-bottom: 0.85rem; border: 1px solid #FFDFE9;" onclick="openLightbox('${escapeHTML(fontImg)}')" title="คลิกเพื่อดูรูปป้ายฟอนต์ขนาดใหญ่">
          <img src="${escapeHTML(fontImg)}" alt="${escapeHTML(f.name)}" style="width: 100%; height: 100%; aspect-ratio: 1 / 1; object-fit: cover; display: block;" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=600';">
          <div style="position: absolute; top: 10px; left: 10px; display: flex; gap: 6px;">
            <span class="badge badge--pink">${escapeHTML(f.category || 'ลายมือ')}</span>
          </div>
          <div style="position: absolute; top: 10px; right: 10px;">
            <span class="badge ${f.delivery_type === 'GOOGLE_DRIVE' ? 'badge--success' : 'badge--info'}">${f.delivery_type === 'GOOGLE_DRIVE' ? 'ส่งอัตโนมัติ' : 'แอดมินส่ง'}</span>
          </div>
        </div>

        <div style="margin-bottom: 0.5rem;">
          <h3 style="font-size: 1.15rem; margin: 0; font-weight: 700; color: var(--text);">${escapeHTML(f.name)}</h3>
        </div>

        <!-- Live Font Preview Area with Proper Inset Margin -->
        <div class="font-preview-area" style="padding: 1rem 1.15rem; min-height: 56px; border-radius: 14px; border: 1.5px solid #FFDFE9; background: #FFFDFE; margin-bottom: 0.85rem;">
          <div class="font-preview-text" data-font-id="${f.id}" style="font-size: 20px; font-weight: 500; word-break: break-word; line-height: 1.4; color: var(--text); font-family: ${getFontFamily(f)};">
            ${escapeHTML(state.fontTester.text || f.preview_text || 'ร้านป้ายบีเอ็นซี ฟอนต์ลายมือน่ารัก 1234')}
          </div>
        </div>

        ${f.description ? `<p style="font-size: 0.86rem; color: var(--text-muted); margin: 0 0 0.85rem; line-height: 1.4;">${escapeHTML(f.description)}</p>` : ''}

        <!-- Clean Footer: Price on top row, Action buttons below with zero text overflow -->
        <div style="display: flex; flex-direction: column; gap: 0.65rem; margin-top: auto; padding-top: 0.85rem; border-top: 1px solid var(--border-light);">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.82rem; color: var(--text-muted);">ราคาฟอนต์</span>
            <div class="product-price" style="font-size: 1.35rem; color: #71515B;">฿${Number(f.price || 0).toLocaleString()}</div>
          </div>
          <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
            <button type="button" class="btn btn-outline btn-sm" onclick="setCompareFont('${f.id}')" title="นำฟอนต์นี้ไปเทียบในสมุด GoodNotes" style="flex: 1; min-width: 52px; padding: 6px 4px; font-size: 12px; white-space: nowrap; text-align: center;">เทียบ</button>
            <button type="button" class="btn btn-outline btn-sm" onclick="addToCartItem('${f.id}', 'FONT')" style="flex: 1.2; min-width: 80px; padding: 6px 8px; font-size: 12px; white-space: nowrap; text-align: center;">
              ${escapeHTML(s.btnCartText || 'ใส่ตะกร้า')}
            </button>
            <button type="button" class="btn btn-primary btn-sm" onclick="buyNowItem('${f.id}', 'FONT')" style="flex: 1.4; min-width: 90px; padding: 6px 10px; font-size: 12px; white-space: nowrap; text-align: center;">
              ${escapeHTML(s.btnBuyText || 'สั่งซื้อเลย')}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function renderGroupCard(g, s) {
    const benefits = (g.benefits || '').split('\n').filter(Boolean);
    const grpImg = formatDriveImageUrl(g.cover_image_url || g.cover_image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600');
    return `
      <div class="card" style="display: flex; flex-direction: column; border-radius: var(--radius-lg);">
        <img src="${escapeHTML(grpImg)}" style="width: 100%; aspect-ratio: 1/1; object-fit: cover; border-radius: var(--radius-md); margin-bottom: 1rem;" alt="${escapeHTML(g.name)}" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600';">
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
    const content = $('receiptModalBody');
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
    const rawItems = Array.isArray(order.items_json) ? order.items_json
                   : (typeof order.items_json === 'string' ? JSON.parse(order.items_json || '[]') : null)
                   || order.items || [];
    if (Array.isArray(rawItems) && rawItems.length > 0) {
      items = rawItems;
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
              ${s.profileImage ? `<img src="${escapeHTML(formatDriveImageUrl(s.profileImage))}" alt="Logo">` : 'BNC'}
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

  window.openReviewModal = function (orderId = '', productName = '') {
    const modal = $('reviewModal');
    if (!modal) return;
    if ($('rev_name')) $('rev_name').value = '';
    if ($('rev_rating')) $('rev_rating').value = '5';
    if ($('rev_product')) $('rev_product').value = productName || '';
    if ($('rev_message')) $('rev_message').value = '';
    if ($('rev_proof_image')) $('rev_proof_image').value = '';
    const prev = $('rev_proof_preview');
    const wrap = $('rev_proof_preview_wrap');
    if (prev) prev.src = '';
    if (wrap) wrap.style.display = 'none';
    modal.classList.add('is-active');
  };

  window.closeReviewModal = function () {
    const modal = $('reviewModal');
    if (modal) modal.classList.remove('is-active');
  };

  window.handleReviewProofUpload = function (e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (evt) {
      const b64 = evt.target.result;
      const inp = $('rev_proof_image');
      const prev = $('rev_proof_preview');
      const wrap = $('rev_proof_preview_wrap');
      if (inp) inp.value = b64;
      if (prev) prev.src = b64;
      if (wrap) wrap.style.display = 'block';
    };
    reader.readAsDataURL(file);
  };

  window.handleSaveReviewSubmit = async function (e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    const name = ($('rev_name')?.value || '').trim();
    const rating = parseInt($('rev_rating')?.value || '5', 10);
    const prod = ($('rev_product')?.value || '').trim();
    const msg = ($('rev_message')?.value || '').trim();
    const proof = ($('rev_proof_image')?.value || '').trim();

    if (!name || !msg) {
      alert('กรุณากรอกชื่อและข้อความรีวิวให้ครบถ้วนนะคะ');
      return;
    }

    const proofUrl = formatDriveImageUrl(proof);
    const newRev = {
      customer_name: name,
      rating: rating,
      product_name: prod,
      message: msg,
      proof_image: proofUrl,
      image_url: proofUrl,
      status: 'APPROVED'
    };

    Store.addReview(newRev);
    alert('ขอบคุณสำหรับรีวิวค่ะ บันทึกข้อมูลเรียบร้อยแล้ว');
    closeReviewModal();
    renderCurrentView();
  };

  window.viewReviewDetailModal = function (reviewId) {
    const rev = (Store.getAllReviews() || []).find(r => r.id === reviewId);
    if (!rev) return;
    const modal = $('reviewDetailModal');
    const body = $('reviewDetailModalBody');
    if (!modal || !body) return;

    const proofImg = rev.proof_image || rev.proof_image_url || rev.image_url;
    const cleanStars = '★'.repeat(rev.rating || 5);

    body.innerHTML = `
      <div style="text-align: left;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
          <div>
            <h3 style="margin: 0 0 4px; font-size: 1.15rem; color: var(--primary-deep); font-weight: 700;">
              ${escapeHTML(rev.customer_name || 'ลูกค้า')}
            </h3>
            ${rev.product_name ? `<span class="badge badge--pink" style="font-size: 0.78rem;">${escapeHTML(rev.product_name)}</span>` : ''}
          </div>
          <span style="color: #F59E0B; font-size: 1.1rem; letter-spacing: 2px;">${cleanStars}</span>
        </div>

        <div style="background: var(--surface-alt); border: 1.5px solid #FFDFE9; border-radius: 14px; padding: 1rem; margin-bottom: 1.25rem;">
          <p style="margin: 0; font-size: 0.95rem; color: var(--text); line-height: 1.6; white-space: pre-line;">
            ${escapeHTML(rev.message || '')}
          </p>
        </div>

        <div style="border-top: 1px solid var(--border-light); padding-top: 1rem;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
            <strong style="font-size: 0.9rem; color: var(--text);">หลักฐานการสั่งซื้อจริง</strong>
            ${proofImg ? `
              <span style="font-size: 0.75rem; color: #B24368; background: #FFF0F5; border: 1px solid #FFB6CE; padding: 2px 8px; border-radius: 999px; font-weight: 600;">
                ยืนยันการซื้อขายแล้ว
              </span>
            ` : ''}
          </div>

          ${proofImg ? `
            <div style="text-align: center; background: #FFF7F9; border: 1.5px dashed #FFDFE9; border-radius: 14px; padding: 10px;">
              <img src="${escapeHTML(proofImg)}" alt="หลักฐานการซื้อขาย" style="max-height: 280px; max-width: 100%; border-radius: 10px; cursor: pointer; object-fit: contain; box-shadow: 0 2px 8px rgba(113,81,91,0.08);" onclick="openLightbox('${escapeHTML(proofImg)}')" title="คลิกเพื่อดูรูปขยาย">
              <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 6px;">คลิกที่รูปเพื่อดูภาพขนาดใหญ่</div>
            </div>
          ` : `
            <div style="text-align: center; padding: 1rem; color: var(--text-muted); font-size: 0.85rem; background: var(--surface-alt); border-radius: 12px;">
              ไม่มีภาพหลักฐานแนบมาสำหรับรีวิวนี้
            </div>
          `}
        </div>

        <div style="margin-top: 1.25rem; text-align: right;">
          <button type="button" class="btn btn-primary btn-sm" onclick="closeReviewDetailModal()" style="font-weight: 700; padding: 0.5rem 1.5rem; border-radius: 12px;">
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    `;

    modal.classList.add('is-active');
  };

  window.closeReviewDetailModal = function () {
    const modal = $('reviewDetailModal');
    if (modal) modal.classList.remove('is-active');
  };

  window.togglePortfolioLike = function (workId) {
    const likesKey = 'BNC_PORTFOLIO_LIKES';
    let likesMap = {};
    try {
      likesMap = JSON.parse(localStorage.getItem(likesKey) || '{}');
    } catch (e) {}

    const wasLiked = !!likesMap[workId];
    const isNowLiked = !wasLiked;
    likesMap[workId] = isNowLiked;
    try {
      localStorage.setItem(likesKey, JSON.stringify(likesMap));
    } catch (e) {}

    // Update real like count in Store
    Store.addPortfolioLike(workId, isNowLiked ? 1 : -1);

    const btn = document.getElementById(`like-btn-${workId}`);
    const countEl = document.getElementById(`like-count-${workId}`);
    if (btn) {
      if (isNowLiked) {
        btn.classList.add('is-liked', 'heart-pop-anim');
        setTimeout(() => btn.classList.remove('heart-pop-anim'), 400);
      } else {
        btn.classList.remove('is-liked');
      }
    }
    if (countEl) {
      const realLikes = Store.getPortfolioLikes(workId);
      countEl.textContent = `${realLikes} คน`;
    }
  };

  window.openWorkInquiryModal = function (workId) {
    const portfolio = Store.getPortfolio() || [];
    const item = portfolio.find(p => p.id === workId) || portfolio[0] || {};
    const s = Store.getSettings();
    const modal = $('workInquiryModal');
    const body = $('workInquiryModalBody');
    if (!modal || !body) return;

    const rawImg = item.image_url || item.cover_image || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=700';
    const img = formatDriveImageUrl(rawImg);
    const contactUrl = s.portfolioContactUrl || s.lineUrl || '#contact-us';
    const title = item.title || 'ผลงานออกแบบ';

    body.innerHTML = `
      <div style="text-align: left;">
        <div style="display: flex; gap: 14px; align-items: center; background: #FFF7F9; border: 1.5px solid #FFDFE9; border-radius: 16px; padding: 12px; margin-bottom: 1.25rem;">
          <img src="${escapeHTML(img)}" alt="Work Preview" style="width: 72px; height: 72px; border-radius: 12px; object-fit: cover; border: 2px solid #ffffff; flex-shrink: 0;" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=700';">
          <div>
            <span style="font-size: 0.75rem; color: #B24368; background: #FFF0F5; border: 1px solid #FFB6CE; padding: 2px 8px; border-radius: 999px; font-weight: 600;">
              ${escapeHTML(item.style_category || item.category || 'ผลงานแนะนำ')}
            </span>
            <h4 style="margin: 4px 0 2px; font-size: 0.98rem; color: #71515B; font-weight: 700;">${escapeHTML(title)}</h4>
            <small style="color: var(--text-muted); font-size: 0.8rem;">รหัสงาน: #${escapeHTML(item.id || 'work')}</small>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px;">
          <a href="${escapeHTML(contactUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="width: 100%; border-radius: 999px; font-weight: 800; padding: 0.75rem; font-size: 0.95rem; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: none !important;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <span>สนใจสั่งงาน</span>
          </a>
        </div>
      </div>
    `;

    modal.classList.add('is-active');
  };

  window.closeWorkInquiryModal = function () {
    const modal = $('workInquiryModal');
    if (modal) modal.classList.remove('is-active');
  };

  // Multi-image carousel navigation for IG-style post cards
  window.switchPostImage = function (postId, targetIdx) {
    const container = document.getElementById(`gallery-${postId}`);
    if (!container) return;
    const slides = container.querySelectorAll('.ig-multi-img-slide');
    const dots = container.querySelectorAll('.ig-multi-dot');
    slides.forEach((s, i) => { s.style.display = i === targetIdx ? '' : 'none'; });
    dots.forEach((d, i) => { d.classList.toggle('active', i === targetIdx); });
  };

  window.switchPostImageNext = function (postId, total) {
    const container = document.getElementById(`gallery-${postId}`);
    if (!container) return;
    const slides = container.querySelectorAll('.ig-multi-img-slide');
    let current = 0;
    slides.forEach((s, i) => { if (s.style.display !== 'none') current = i; });
    switchPostImage(postId, (current + 1) % total);
  };

  window.switchPostImagePrev = function (postId, total) {
    const container = document.getElementById(`gallery-${postId}`);
    if (!container) return;
    const slides = container.querySelectorAll('.ig-multi-img-slide');
    let current = 0;
    slides.forEach((s, i) => { if (s.style.display !== 'none') current = i; });
    switchPostImage(postId, (current - 1 + total) % total);
  };

  // Pricing Detail Modal
  window.openPricingDetailModal = function () {
    const rows = Store.getPricingTable ? Store.getPricingTable() : [];
    const s = Store.getSettings();
    let modal = document.getElementById('pricingDetailModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'pricingDetailModal';
      modal.className = 'modal-overlay';
      modal.onclick = (e) => { if (e.target === modal) modal.classList.remove('is-active'); };
      document.body.appendChild(modal);
    }
    modal.innerHTML = `
      <div class="modal-card" style="max-width: 420px; width: 92%; padding: 1.5rem; border-radius: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; border-bottom: 1px solid #FFDFE9; padding-bottom: 0.75rem;">
          <h3 style="margin: 0; color: #71515B; font-size: 1.1rem; font-weight: 700;">อัตราค่าบริการ</h3>
          <button type="button" onclick="document.getElementById('pricingDetailModal').classList.remove('is-active')" style="background:none; border:none; font-size:1.3rem; cursor:pointer; color: #B26E86;">x</button>
        </div>
        <table style="width: 100%; border-collapse: collapse; font-size: 0.88rem; margin-bottom: 1rem;">
          <thead>
            <tr style="background: #FFF0F5;">
              <th style="padding: 8px 12px; text-align: left; color: #B26E86; font-weight: 700; border-radius: 8px 0 0 8px;">ประเภทงาน</th>
              <th style="padding: 8px 12px; text-align: right; color: #B26E86; font-weight: 700; border-radius: 0 8px 8px 0;">ราคาเริ่มต้น</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map((row, ri) => `
              <tr style="border-bottom: 1px solid #FFF0F5; ${ri % 2 === 1 ? 'background: #FFFBFD;' : ''}">
                <td style="padding: 8px 12px; color: #71515B;">${escapeHTML(row.label)}</td>
                <td style="padding: 8px 12px; text-align: right; color: #B24368; font-weight: 700;">฿${Number(row.price).toLocaleString()}+</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <a href="${escapeHTML(s.lineUrl || s.portfolioContactUrl || '#')}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="width: 100%; border-radius: 999px; font-weight: 800; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 0.7rem; box-shadow: none !important; font-size: 0.93rem;">
          <span>สนใจสั่งงาน ทักมาได้เลย</span>
        </a>
      </div>
    `;
    modal.classList.add('is-active');
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
              <div style="font-size: 11.5px; color: var(--text-muted); margin-top: 3px;">รองรับรูปถ่าย JPG, PNG (หรือวางลิงก์ Google Drive ด้านล่าง)</div>
            </div>
            <div id="chkSlipPreviewWrap" style="display: none;">
              <img id="chkSlipPreviewImg" src="" style="max-height: 160px; max-width: 100%; border-radius: 10px; object-fit: contain; box-shadow: var(--shadow-sm); display: block; margin: 0 auto;">
              <div style="font-size: 12px; color: #166534; font-weight: 700; margin-top: 8px;">แนบสลิปเรียบร้อยแล้ว (คลิกเพื่อเปลี่ยนรูป)</div>
            </div>
          </div>
          <div style="margin-top: 6px;">
            <input type="text" id="chkSlipUrlInput" class="form-input" placeholder="หรือวางลิงก์สลิปจาก Google Drive ตรงนี้" style="font-size: 12px; padding: 6px 12px;" oninput="handleSlipUrlInput(this.value)">
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

    // Helper to update slip UI preview
    const updatePreview = (dataUrl) => {
      const wrap = $('chkSlipPreviewWrap');
      const img = $('chkSlipPreviewImg');
      const promptEl = $('slipPrompt');
      const badge = $('slipStatusBadge');
      const dropzone = $('slipUploadDropzone');
      if (img) img.src = dataUrl;
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

    const reader = new FileReader();
    reader.onload = function (evt) {
      const rawDataUrl = evt.target.result;
      // Compress slip via Canvas to ensure base64 < 45KB (under Google Sheet 50k cell limit and Apps Script POST limit)
      const img = new Image();
      img.onload = function () {
        try {
          const maxDim = 800;
          let width = img.width;
          let height = img.height;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
          updatePreview(compressedDataUrl);
        } catch (canvasErr) {
          updatePreview(rawDataUrl);
        }
      };
      img.onerror = function () {
        updatePreview(rawDataUrl);
      };
      img.src = rawDataUrl;
    };
    reader.readAsDataURL(file);
  };

  window.handleSlipUrlInput = function (val) {
    const formatted = formatDriveImageUrl(val.trim());
    const wrap = $('chkSlipPreviewWrap');
    const img = $('chkSlipPreviewImg');
    const promptEl = $('slipPrompt');
    const badge = $('slipStatusBadge');
    const dropzone = $('slipUploadDropzone');
    if (!formatted) {
      if (wrap) wrap.style.display = 'none';
      if (promptEl) promptEl.style.display = 'block';
      if (badge) {
        badge.textContent = 'ยังไม่ได้แนบสลิป';
        badge.style.color = 'var(--text-muted)';
      }
      return;
    }
    if (img) img.src = formatted;
    if (wrap) wrap.style.display = 'block';
    if (promptEl) promptEl.style.display = 'none';
    if (badge) {
      badge.textContent = 'แนบลิงก์สลิปแล้ว';
      badge.style.color = '#166534';
    }
    if (dropzone) {
      dropzone.style.borderColor = '#86efac';
      dropzone.style.background = '#f0fdf4';
    }
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
      const slipUrlInput = ($('chkSlipUrlInput')?.value || '').trim();
      let slipImg = $('chkSlipPreviewImg') ? $('chkSlipPreviewImg').src : '';
      if (slipUrlInput) {
        slipImg = formatDriveImageUrl(slipUrlInput);
      } else if (slipImg) {
        slipImg = formatDriveImageUrl(slipImg);
      }
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
          <div style="background: #FFF0F7; border: 1.5px solid #FFDFE9; border-radius: 12px; padding: 10px 14px; margin-bottom: 0.85rem;">
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
            <label class="form-label" style="font-weight: 700;">ลิงก์ภาพตัวอย่าง 1:1 จัตุรัส (URL) หรือเลือกรูปจากเครื่อง <span style="color:var(--danger)">*</span></label>
            <div style="display: flex; gap: 8px; align-items: center;">
              <input type="text" id="adminProdImage" class="form-input" placeholder="https://... หรือเลือกรูปจากเครื่อง" required style="flex: 1;">
              <label class="btn btn-outline btn-sm" style="cursor: pointer; white-space: nowrap; margin: 0; font-size: 11px;">
                เลือกรูป
                <input type="file" accept="image/*" style="display: none;" onchange="handleProductImageUpload(event)">
              </label>
            </div>
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
          <div style="background: #FFF0F7; border: 1.5px solid #FFDFE9; border-radius: 12px; padding: 10px 14px; margin-bottom: 0.85rem;">
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
          <div style="background: #FFF0F7; border: 1.5px solid #FFDFE9; border-radius: 12px; padding: 10px 14px; margin-bottom: 0.85rem;">
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
            <label class="form-label" style="font-weight: 700;">ลิงก์ภาพหน้าปกกลุ่ม 1:1 จัตุรัส (URL) หรือเลือกรูปจากเครื่อง <span style="color:var(--danger)">*</span></label>
            <div style="display: flex; gap: 8px; align-items: center;">
              <input type="text" id="adminGroupCover" class="form-input" placeholder="https://... หรือเลือกรูปจากเครื่อง" required style="flex: 1;">
              <label class="btn btn-outline btn-sm" style="cursor: pointer; white-space: nowrap; margin: 0; font-size: 11px;">
                เลือกรูป
                <input type="file" accept="image/*" style="display: none;" onchange="handleGroupCoverUpload(event)">
              </label>
            </div>
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

          <!-- Multi-image URL inputs (dynamic) -->
          <div class="form-group" style="margin-bottom: 1.25rem;">
            <label class="form-label" style="font-weight: 700;">รูปภาพผลงาน <span style="color:var(--danger)">*</span></label>
            <p style="font-size: 0.78rem; color: var(--text-muted); margin: 0 0 10px;">รูปแรกเป็นหน้าปก สามารถกดปุ่มเพื่อเพิ่มรูปภาพได้ตามต้องการ</p>
            <div id="portImgList" style="display: flex; flex-direction: column; gap: 8px;"></div>
            <div style="margin-top: 10px;">
              <button type="button" class="btn btn-outline btn-sm" onclick="addPortImgRow()" style="border-radius: 999px; border: 1.5px solid #FFDFE9; background: #FFF7F9; color: #71515B; font-weight: 700; font-size: 0.84rem; padding: 6px 18px; cursor: pointer;">
                + เพิ่มรูปภาพ
              </button>
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
            <label class="form-label" style="font-weight: 700;">ชื่อลูกค้า <span style="color:var(--danger)">*</span></label>
            <input type="text" id="adminCust_name" class="form-input" placeholder="เช่น ลูกค้ามินนี่ หรือ คุณหวาน" required>
          </div>
          <div class="form-group" style="margin-bottom: 0.85rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
              <label class="form-label" style="font-weight: 700; margin: 0;">ช่องทางการติดต่อ</label>
              <button type="button" class="btn btn-outline btn-sm" onclick="addCustContactRow()" style="font-size: 11px; padding: 2px 8px; border-radius: 999px; border-color: #FFB7CE; color: #B24368;">
                + เพิ่มช่องทางติดต่อ
              </button>
            </div>
            <div id="adminCust_contacts_list" style="display: flex; flex-direction: column; gap: 8px;"></div>
          </div>
          <div class="form-group" style="margin-bottom: 1.25rem;">
            <label class="form-label" style="font-weight: 700;">จำนวนแต้มเริ่มต้น</label>
            <div style="display: flex; align-items: center; gap: 10px;">
              <input type="number" id="adminCust_stamps" class="form-input" min="0" max="99" value="1" style="width: 100px;">
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

    // Review Modal (ลูกค้าเขียนรีวิว + แนบภาพหลักฐานการซื้อขาย)
    const reviewModal = document.createElement('div');
    reviewModal.id = 'reviewModal';
    reviewModal.className = 'modal-overlay';
    reviewModal.onclick = (e) => { if (e.target === reviewModal) closeReviewModal(); };
    reviewModal.innerHTML = `
      <div class="modal-card" style="max-width: 520px; width: 92%; max-height: 90vh; overflow-y: auto; padding: 1.5rem; border-radius: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-light); padding-bottom: 0.75rem;">
          <h3 style="margin: 0; color: var(--primary-deep); font-size: 1.2rem; font-weight: 700;">เขียนรีวิวร้านค้า</h3>
          <button type="button" onclick="closeReviewModal()" style="background:none; border:none; font-size:1.3rem; cursor:pointer; color: var(--text-muted);">✕</button>
        </div>
        <form onsubmit="handleSaveReviewSubmit(event)">
          <div class="form-group" style="margin-bottom: 0.85rem;">
            <label class="form-label" style="font-weight: 700;">ชื่อของคุณ / นามแฝง <span style="color:var(--danger)">*</span></label>
            <input type="text" id="rev_name" class="form-input" placeholder="เช่น ลูกค้าประจำ, คุณแนน" required>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3" style="margin-bottom: 0.85rem;">
            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">คะแนนความพึงพอใจ</label>
              <select id="rev_rating" class="form-input">
                <option value="5">★★★★★ (5 ดาว - ประทับใจมาก)</option>
                <option value="4">★★★★☆ (4 ดาว - ดีมาก)</option>
                <option value="3">★★★☆☆ (3 ดาว - ปานกลาง)</option>
                <option value="2">★★☆☆☆ (2 ดาว - พอใช้)</option>
                <option value="1">★☆☆☆☆ (1 ดาว - ปรับปรุง)</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">ชื่องาน / สินค้าที่สั่งซื้อ</label>
              <input type="text" id="rev_product" class="form-input" placeholder="เช่น ป้ายเมนู, ฟอนต์ลายมือ">
            </div>
          </div>
          <div class="form-group" style="margin-bottom: 0.85rem;">
            <label class="form-label" style="font-weight: 700;">ความประทับใจ / ข้อความรีวิว <span style="color:var(--danger)">*</span></label>
            <textarea id="rev_message" class="form-input" rows="3" placeholder="ประทับใจงานมาก ลายมือน่ารัก ส่งงานไว..." required></textarea>
          </div>
          <div class="form-group" style="margin-bottom: 1.25rem;">
            <label class="form-label" style="font-weight: 700;">แนบภาพหลักฐานการซื้อขายจริง (สลิปโอน / แชทสั่งซื้อ / ผลงานที่ได้รับ)</label>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 6px;">* ภาพจะแสดงเป็นหลักฐานยืนยันความน่าเชื่อถือเมื่อมีคนกดดูรีวิวเท่านั้น ไม่โชว์หน้าแรก</div>
            <input type="file" id="rev_proof_file" class="form-input" accept="image/*" onchange="handleReviewProofUpload(event)" style="padding: 6px;">
            <input type="hidden" id="rev_proof_image">
            <div id="rev_proof_preview_wrap" style="display: none; margin-top: 8px; text-align: center;">
              <img id="rev_proof_preview" src="" style="max-height: 160px; max-width: 100%; border-radius: 8px; border: 1px solid var(--border);">
            </div>
          </div>
          <div style="display: flex; gap: 0.75rem; justify-content: flex-end;">
            <button type="button" class="btn btn-secondary" onclick="closeReviewModal()">ยกเลิก</button>
            <button type="submit" class="btn btn-primary" style="font-weight: 700;">ส่งรีวิวร้าน</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(reviewModal);

    // Review Detail Modal (เปิดดูรายละเอียดรีวิว + ภาพหลักฐานการซื้อขายจริง)
    const reviewDetailModal = document.createElement('div');
    reviewDetailModal.id = 'reviewDetailModal';
    reviewDetailModal.className = 'modal-overlay';
    reviewDetailModal.onclick = (e) => { if (e.target === reviewDetailModal) closeReviewDetailModal(); };
    reviewDetailModal.innerHTML = `
      <div class="modal-card" style="max-width: 520px; width: 92%; max-height: 90vh; overflow-y: auto; padding: 1.5rem; border-radius: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-light); padding-bottom: 0.75rem;">
          <h3 style="margin: 0; color: var(--primary-deep); font-size: 1.2rem; font-weight: 700;">รายละเอียดรีวิวจากลูกค้า</h3>
          <button type="button" onclick="closeReviewDetailModal()" style="background:none; border:none; font-size:1.3rem; cursor:pointer; color: var(--text-muted);">✕</button>
        </div>
        <div id="reviewDetailModalBody"></div>
      </div>
    `;
    document.body.appendChild(reviewDetailModal);

    // Work Inquiry Modal (ติดต่อสั่งงานออกแบบจากฟีดไอจี)
    const workInquiryModal = document.createElement('div');
    workInquiryModal.id = 'workInquiryModal';
    workInquiryModal.className = 'modal-overlay';
    workInquiryModal.onclick = (e) => { if (e.target === workInquiryModal) closeWorkInquiryModal(); };
    workInquiryModal.innerHTML = `
      <div class="modal-card" style="max-width: 480px; width: 92%; max-height: 90vh; overflow-y: auto; padding: 1.5rem; border-radius: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; border-bottom: 1px solid var(--border-light); padding-bottom: 0.75rem;">
          <h3 style="margin: 0; color: var(--primary-deep); font-size: 1.15rem; font-weight: 700;">ติดต่อสั่งงานออกแบบ</h3>
          <button type="button" onclick="closeWorkInquiryModal()" style="background:none; border:none; font-size:1.3rem; cursor:pointer; color: var(--text-muted);">✕</button>
        </div>
        <div id="workInquiryModalBody"></div>
      </div>
    `;
    document.body.appendChild(workInquiryModal);
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
              ${order.status === 'PAID' ? 'ชำระเงินแล้ว' : (order.status === 'VERIFYING' ? 'กำลังตรวจสลิป' : (order.status === 'COMPLETED' ? 'ส่งมอบสิทธิ์แล้ว' : order.status))}
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
            ${order.gmail ? `<div><strong>Gmail ดึงสิทธิ์:</strong> <span style="font-family: monospace; color: #9D174D;">${escapeHTML(order.gmail)}</span></div>` : ''}
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
    state.editingProductId = null;
    const modal = $('adminProductModal');
    if (!modal) return;
    const title = modal.querySelector('h3');
    if (title) title.textContent = 'เพิ่มสินค้ากราฟิกใหม่';
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

    const prodPayload = {
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
    };
    if (state.editingProductId) prodPayload.id = state.editingProductId;
    Store.saveProduct(prodPayload);
    state.editingProductId = null;

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
      let dataUrl = evt.target.result;
      const lowerName = file.name.toLowerCase();
      if (lowerName.endsWith('.ttf')) {
        dataUrl = dataUrl.replace(/^data:[^;]*;base64,/, 'data:font/ttf;base64,');
      } else if (lowerName.endsWith('.otf')) {
        dataUrl = dataUrl.replace(/^data:[^;]*;base64,/, 'data:font/otf;base64,');
      } else if (lowerName.endsWith('.woff2')) {
        dataUrl = dataUrl.replace(/^data:[^;]*;base64,/, 'data:font/woff2;base64,');
      } else if (lowerName.endsWith('.woff')) {
        dataUrl = dataUrl.replace(/^data:[^;]*;base64,/, 'data:font/woff;base64,');
      }
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
    state.editingFontId = null;
    const modal = $('adminFontModal');
    if (!modal) return;
    const title = modal.querySelector('h3');
    if (title) title.textContent = 'เพิ่มฟอนต์ลายมือใหม่';
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

    const fontPayload = {
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
    };
    if (state.editingFontId) fontPayload.id = state.editingFontId;
    Store.saveFont(fontPayload);
    state.editingFontId = null;

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
    state.editingGroupId = null;
    const modal = $('adminGroupModal');
    if (!modal) return;
    const title = modal.querySelector('h3');
    if (title) title.textContent = 'เพิ่มกลุ่ม LINE VIP ใหม่';
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

    const groupPayload = {
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
    };
    if (state.editingGroupId) groupPayload.id = state.editingGroupId;
    Store.saveGroup(groupPayload);
    state.editingGroupId = null;

    closeAddGroupModal();
    alert('บันทึกกลุ่มใหม่เรียบร้อยแล้วค่ะ!');
    renderCurrentView();
  };

  window.deleteGroup = function (id) {
    if (!confirm('ยืนยันการลบกลุ่มนี้ใช่หรือไม่?')) return;
    Store.deleteGroup(id);
    renderCurrentView();
  };

  // Dynamic image row helpers for portfolio modal
  window.updatePortImgRowLabels = function () {
    const list = document.getElementById('portImgList');
    if (!list) return;
    Array.from(list.children).forEach((row, i) => {
      const badge = row.querySelector('.port-img-badge');
      if (badge) badge.textContent = i === 0 ? 'หน้าปก' : `รูปที่ ${i + 1}`;
      const inp = row.querySelector('.port-img-url');
      if (inp) inp.placeholder = i === 0 ? 'วางลิงก์รูปภาพหน้าปก (URL)' : `วางลิงก์รูปที่ ${i + 1} (URL)`;
    });
  };

  window.addPortImgRow = function (prefillUrl) {
    const list = document.getElementById('portImgList');
    if (!list) return;
    const idx = list.children.length;
    const isFirst = idx === 0;
    const row = document.createElement('div');
    row.className = 'port-img-row';
    row.style.cssText = 'display: flex; gap: 8px; align-items: center; background: #FFFBFD; border: 1.5px solid #FFDFE9; border-radius: 12px; padding: 7px 10px; width: 100%; box-sizing: border-box;';
    row.innerHTML = `
      <span class="port-img-badge" style="font-size: 0.75rem; font-weight: 700; color: #B24368; background: #FFF0F5; border: 1px solid #FFB6CE; padding: 3px 8px; border-radius: 8px; white-space: nowrap; flex-shrink: 0;">
        ${isFirst ? 'หน้าปก' : 'รูปที่ ' + (idx + 1)}
      </span>
      <input type="text" class="form-input port-img-url" value="${prefillUrl ? prefillUrl.replace(/"/g,'&quot;') : ''}" placeholder="${isFirst ? 'วางลิงก์รูปภาพหน้าปก (URL)' : 'วางลิงก์รูปที่ ' + (idx + 1) + ' (URL)'}" style="flex: 1; font-size: 0.82rem; padding: 6px 10px; font-family: monospace; min-width: 0;">
      <label class="btn btn-outline btn-sm" style="flex-shrink: 0; margin: 0; padding: 5px 12px; border-radius: 8px; border: 1px solid #FFDFE9; background: #ffffff; color: #71515B; font-size: 0.78rem; font-weight: 700; cursor: pointer; white-space: nowrap;">
        เลือกรูปภาพ
        <input type="file" accept="image/*" style="display:none;" onchange="handlePortImgRowUpload(event, this)">
      </label>
      <button type="button" onclick="deletePortImgRow(this)" style="flex-shrink: 0; background: none; border: none; color: #E11D48; font-size: 1.15rem; cursor: pointer; padding: 0 4px; line-height: 1;" title="ลบรูปนี้">
        ✕
      </button>
    `;
    list.appendChild(row);
  };

  window.deletePortImgRow = function (btn) {
    const list = document.getElementById('portImgList');
    if (!list) return;
    const row = btn.closest('.port-img-row');
    if (!row) return;
    if (list.children.length <= 1) {
      const inp = row.querySelector('.port-img-url');
      if (inp) inp.value = '';
    } else {
      row.remove();
      updatePortImgRowLabels();
    }
  };

  window.handlePortImgRowUpload = function (e, fileInput) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const row = fileInput.closest('.port-img-row');
    const urlInput = row && row.querySelector('.port-img-url');
    if (!urlInput) return;
    const reader = new FileReader();
    reader.onload = evt => { urlInput.value = evt.target.result; };
    reader.readAsDataURL(file);
  };

  window.getPortImgUrls = function () {
    return Array.from(document.querySelectorAll('#portImgList .port-img-url'))
      .map(inp => inp.value.trim())
      .filter(Boolean);
  };

  window.handlePortfolioMultiImageUpload = function (e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = evt => { addPortImgRow(evt.target.result); };
      reader.readAsDataURL(file);
    });
  };

  // Backward compat
  window.handlePortfolioImageUpload = function (e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => { addPortImgRow(evt.target.result); };
    reader.readAsDataURL(file);
  };

  window.handleProductImageUpload = function (e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (evt) {
      const input = document.getElementById('adminProdImage');
      if (input) input.value = evt.target.result;
    };
    reader.readAsDataURL(file);
  };

  window.handleGroupCoverUpload = function (e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (evt) {
      const input = document.getElementById('adminGroupCover');
      if (input) input.value = evt.target.result;
    };
    reader.readAsDataURL(file);
  };

  window.handleBannerImageUpload = function (e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (evt) {
      const input = document.getElementById('newBannerImage');
      if (input) input.value = evt.target.result;
    };
    reader.readAsDataURL(file);
  };

  window.handleImageFileInput = function (e, targetInputId, previewImgId) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert('ไฟล์รูปมีขนาด ' + (file.size / (1024 * 1024)).toFixed(1) + 'MB ซึ่งค่อนข้างใหญ่ แนะนำใช้ไฟล์ขนาดไม่เกิน 1.5MB หรือใช้ลิงก์ภาพ URL เพื่อให้โหลดเร็วและบันทึกลงฐานข้อมูลได้ราบรื่นนะคะ');
    }
    const reader = new FileReader();
    reader.onload = function (evt) {
      const dataUrl = evt.target.result;
      const input = document.getElementById(targetInputId);
      if (input) input.value = dataUrl;
      if (previewImgId) {
        const preview = document.getElementById(previewImgId);
        if (preview) {
          preview.src = dataUrl;
          preview.style.display = 'block';
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // ── Web Audio API cute music sound synthesis ────────────────
  let audioCtx = null;
  function getAudioContext() {
    if (!audioCtx) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) {
        audioCtx = new AudioCtxClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // Sweet chime/kalimba note rising along pentatonic scale
  const cuteScaleFrequencies = [
    523.25, // C5
    587.33, // D5
    659.25, // E5
    783.99, // G5
    880.00, // A5
    1046.50, // C6
    1174.66, // D6
    1318.51, // E6
    1567.98, // G6
    1760.00  // A6
  ];

  window.playCuteStampPopSound = function (index = 0) {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const freq = cuteScaleFrequencies[index % cuteScaleFrequencies.length] || 659.25;

      // Primary gentle bell oscillator
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      // Soft pitch drop like water drop pop
      osc.frequency.exponentialRampToValueAtTime(freq * 0.96, now + 0.18);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.23);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  };
  window.playPopSound = window.playCuteStampPopSound;

  // ── Run upon DOM load ────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', initApp);



  // ── Admin Edit Functions for Products, Fonts, Groups, Portfolio ──
  window.openEditProductModal = function (id) {
    const p = Store.getAllProducts().find(x => x.id === id);
    if (!p) return;
    state.editingProductId = id;
    const modal = $('adminProductModal');
    if (!modal) return;
    const title = modal.querySelector('h3');
    if (title) title.textContent = 'แก้ไขสินค้า';
    $('adminProdName').value = p.name || '';
    $('adminProdImage').value = p.image || p.image_url || '';
    $('adminProdCategory').value = p.category || 'Template';
    $('adminProdPrice').value = p.price || 0;
    if ($('adminProdCostPrice')) $('adminProdCostPrice').value = p.cost_price || 0;
    if ($('adminProdIsAgent')) $('adminProdIsAgent').checked = !!p.is_agent;
    if ($('adminProdCostWrap')) $('adminProdCostWrap').style.display = p.is_agent ? 'block' : 'none';
    $('adminProdDelivery').value = p.delivery_type || 'GOOGLE_DRIVE';
    $('adminProdDriveLink').value = p.drive_folder_id || p.drive_file_id || '';
    $('adminProdDesc').value = p.description || '';
    $('adminProdWhatYouGet').value = p.what_you_get || '';
    modal.classList.add('is-active');
  };

  window.openEditFontModal = function (id) {
    const f = Store.getAllFonts().find(x => x.id === id);
    if (!f) return;
    state.editingFontId = id;
    const modal = $('adminFontModal');
    if (!modal) return;
    const title = modal.querySelector('h3');
    if (title) title.textContent = 'แก้ไขฟอนต์ลายมือ';
    $('adminFontName').value = f.name || '';
    $('adminFontImage').value = f.preview_image || f.preview_image_url || f.image_url || '';
    $('adminFontFileUrl').value = f.font_file_url || f.file_url || '';
    if ($('adminFontFileInput')) $('adminFontFileInput').value = '';
    if ($('adminFontFileStatus')) $('adminFontFileStatus').textContent = f.font_file_url ? 'มีไฟล์ฟอนต์เดิมอยู่แล้ว (เลือกใหม่ได้)' : '';
    $('adminFontPreviewText').value = f.preview_text || 'ร้านป้ายบีเอ็นซี น่ารักสดใส 1234';
    $('adminFontCategory').value = f.category || 'ลายมือ';
    $('adminFontPrice').value = f.price || 0;
    if ($('adminFontIsAgent')) $('adminFontIsAgent').checked = !!f.is_agent;
    if ($('adminFontCostPrice')) $('adminFontCostPrice').value = f.cost_price || 0;
    if ($('adminFontCostWrap')) $('adminFontCostWrap').style.display = f.is_agent ? 'block' : 'none';
    $('adminFontDelivery').value = f.delivery_type || 'GOOGLE_DRIVE';
    $('adminFontDriveLink').value = f.drive_folder_id || f.drive_file_id || '';
    $('adminFontWhatYouGet').value = f.what_you_get || 'ไฟล์ .OTF / .TTF ครบชุด\nสิทธิ์ใช้งานเชิงพาณิชย์';
    modal.classList.add('is-active');
  };

  window.openEditGroupModal = function (id) {
    const g = Store.getAllGroups().find(x => x.id === id);
    if (!g) return;
    state.editingGroupId = id;
    const modal = $('adminGroupModal');
    if (!modal) return;
    const title = modal.querySelector('h3');
    if (title) title.textContent = 'แก้ไขกลุ่ม LINE VIP';
    $('adminGroupName').value = g.name || '';
    $('adminGroupCategory').value = g.category || 'VIP ตลอดชีพ';
    $('adminGroupCover').value = g.cover_image || g.cover_image_url || '';
    $('adminGroupPrice').value = g.price || 0;
    if ($('adminGroupIsAgent')) $('adminGroupIsAgent').checked = !!g.is_agent;
    if ($('adminGroupCostPrice')) $('adminGroupCostPrice').value = g.cost_price || 0;
    if ($('adminGroupCostWrap')) $('adminGroupCostWrap').style.display = g.is_agent ? 'block' : 'none';
    $('adminGroupDriveUrl').value = g.preview_drive_url || '';
    $('adminGroupBenefits').value = g.benefits || '';
    $('adminGroupPinned').checked = !!g.is_pinned;
    modal.classList.add('is-active');
  };

  window.openEditPortfolioModal = function (id) {
    const item = (Store.getPortfolio() || []).find(p => p.id === id);
    if (!item) return;
    state.editingPortfolioId = id;
    const modal = $('adminPortfolioModal');
    if (!modal) return;
    const titleEl = modal.querySelector('h3');
    if (titleEl) titleEl.textContent = 'แก้ไขรูปผลงาน';
    $('adminPortTitle').value = item.title || '';

    const styleSelect = $('adminPortStyle');
    if (styleSelect) {
      const styles = Store.getPortfolioStyles ? Store.getPortfolioStyles() : ['สไตล์มินิมอล & คาเฟ่', 'สไตล์การ์ตูน & คาวาอี้', 'สไตล์ลายมือ & ฟอนต์', 'สไตล์ร้านค้า & โมเดิร์น', 'ไฟล์ตกแต่ง & เทมเพลต'];
      styleSelect.innerHTML = styles.map(st => `<option value="${escapeHTML(st)}">${escapeHTML(st)}</option>`).join('') +
        `<option value="__custom__">+ กำหนดสไตล์งานเอง...</option>`;
      if (styles.includes(item.style_category)) {
        styleSelect.value = item.style_category;
        if ($('adminPortCustomStyle')) $('adminPortCustomStyle').style.display = 'none';
      } else {
        styleSelect.value = '__custom__';
        if ($('adminPortCustomStyle')) {
          $('adminPortCustomStyle').style.display = 'block';
          $('adminPortCustomStyle').value = item.style_category || '';
        }
      }
    }

    const catSelect = $('adminPortCategory');
    if (catSelect) {
      const cats = Store.getPortfolioCategories ? Store.getPortfolioCategories() : ['ป้ายเครดิต', 'ป้ายแอพพรี', 'ป้ายเติมเกม', 'ป้ายเปิดร้าน', 'ป้ายโปรโมชั่น', 'งานป้ายสั่งทำพิเศษ'];
      catSelect.innerHTML = cats.map(c => `<option value="${escapeHTML(c)}">${escapeHTML(c)}</option>`).join('');
      catSelect.value = item.category || cats[0] || 'ป้ายเครดิต';
    }
    $('adminPortPrice').value = item.price || 129;

    // Populate dynamic image rows
    const imgList = document.getElementById('portImgList');
    if (imgList) {
      imgList.innerHTML = '';
      const existingImages = Array.isArray(item.images) && item.images.length > 0
        ? item.images
        : (item.image_url ? [item.image_url] : []);
      if (existingImages.length > 0) {
        existingImages.forEach(url => addPortImgRow(url));
      } else {
        addPortImgRow();
      }
    }
    modal.classList.add('is-active');
  };

// ── Pink Pastel Calendar View & Date Note Modal ──
window.switchAdminQueueView = function (v) {
  state.adminQueueView = v;
  const tabEl = document.getElementById('adminTabContent');
  if (tabEl && state.adminTab === 'queues') {
    tabEl.innerHTML = renderAdminQueuesTab();
  } else {
    renderCurrentView();
  }
};

window.changeAdminCalendarMonth = function (offset) {
  if (state.calendarMonth === undefined) state.calendarMonth = new Date().getMonth();
  if (state.calendarYear === undefined) state.calendarYear = new Date().getFullYear();

  state.calendarMonth += offset;
  if (state.calendarMonth > 11) {
    state.calendarMonth = 0;
    state.calendarYear += 1;
  } else if (state.calendarMonth < 0) {
    state.calendarMonth = 11;
    state.calendarYear -= 1;
  }
  const tabEl = document.getElementById('adminTabContent');
  if (tabEl && state.adminTab === 'queues') {
    tabEl.innerHTML = renderAdminQueuesTab();
  } else {
    renderCurrentView();
  }
};

window.resetAdminCalendarToday = function () {
  const now = new Date();
  state.calendarMonth = now.getMonth();
  state.calendarYear = now.getFullYear();
  const tabEl = document.getElementById('adminTabContent');
  if (tabEl && state.adminTab === 'queues') {
    tabEl.innerHTML = renderAdminQueuesTab();
  } else {
    renderCurrentView();
  }
};

function renderAdminQueueCalendarView(allQueues) {
  const now = new Date();
  const curMonth = state.calendarMonth !== undefined ? state.calendarMonth : now.getMonth();
  const curYear = state.calendarYear !== undefined ? state.calendarYear : now.getFullYear();

  const thaiMonths = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];
  const monthName = thaiMonths[curMonth] + ' ' + (curYear + 543);

  const firstDayIndex = new Date(curYear, curMonth, 1).getDay(); // 0: Sun
  const totalDaysInMonth = new Date(curYear, curMonth + 1, 0).getDate();
  const totalDaysPrevMonth = new Date(curYear, curMonth, 0).getDate();

  const personalTasks = Store.getCalendarTasks();

  // Calculate total jobs this month
  let monthTotalJobs = 0;
  for (let d = 1; d <= totalDaysInMonth; d++) {
    const qCount = allQueues.filter(q => isQueueDateMatching(q.queue_date, curYear, curMonth + 1, d)).length;
    const tCount = personalTasks.filter(t => isQueueDateMatching(t.date, curYear, curMonth + 1, d)).length;
    monthTotalJobs += (qCount + tCount);
  }

  let cellsHtml = '';

  // Previous month filler cells
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const prevDate = totalDaysPrevMonth - i;
    cellsHtml += `<div class="queue-calendar-cell is-outside"><div class="queue-calendar-date-num">${prevDate}</div></div>`;
  }

  // Current month cells
  for (let d = 1; d <= totalDaysInMonth; d++) {
    const isToday = (d === now.getDate() && curMonth === now.getMonth() && curYear === now.getFullYear());
    const dayQueues = allQueues.filter(q => isQueueDateMatching(q.queue_date, curYear, curMonth + 1, d));
    const dayTasks = personalTasks.filter(t => isQueueDateMatching(t.date, curYear, curMonth + 1, d));

    const dateIso = curYear + '-' + String(curMonth + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0');

    cellsHtml += `
      <div class="queue-calendar-cell ${isToday ? 'is-today' : ''}" onclick="openCalendarDateModal('${dateIso}', ${d}, ${curMonth + 1}, ${curYear})">
        <div class="queue-calendar-date-num">
          <span>${d}</span>
          ${dayQueues.length > 0 ? `<span class="queue-cal-badge-q" title="คิวงาน ${dayQueues.length} งาน">${dayQueues.length}</span>` : ''}
        </div>
        ${dayTasks.length > 0 ? `
          <div class="queue-cal-badges">
            <span class="queue-cal-badge-heart" title="To-Do List ${dayTasks.length} รายการ"><svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg><span>${dayTasks.length}</span></span>
          </div>
        ` : ''}
      </div>
    `;
  }

  // Next month filler cells
  const totalRendered = firstDayIndex + totalDaysInMonth;
  const nextFillCount = (7 - (totalRendered % 7)) % 7;
  for (let n = 1; n <= nextFillCount; n++) {
    cellsHtml += `<div class="queue-calendar-cell is-outside"><div class="queue-calendar-date-num">${n}</div></div>`;
  }

  return `
    <div class="queue-calendar-card">
      <div class="queue-calendar-header">
        <div class="queue-calendar-month-title">
          <button type="button" class="btn btn-outline btn-sm" onclick="changeAdminCalendarMonth(-1)" style="padding: 4px 10px; border-radius: 10px; font-weight: 800;">‹</button>
          <span>${monthName}</span>
          <button type="button" class="btn btn-outline btn-sm" onclick="changeAdminCalendarMonth(1)" style="padding: 4px 10px; border-radius: 10px; font-weight: 800;">›</button>
          <button type="button" class="btn btn-outline btn-sm" onclick="resetAdminCalendarToday()" style="padding: 4px 12px; font-size: 12px; border-radius: 10px; margin-left: 6px;">วันนี้</button>
        </div>
        <div style="font-size: 0.9rem; color: #71515B; font-weight: 600;">
          เดือนนี้มีทั้งหมด: <strong style="color: #E05A88; font-size: 1.1rem;">${monthTotalJobs}</strong> งาน
        </div>
      </div>

      <div class="queue-calendar-grid">
        <div class="queue-calendar-day-header">อา (Sun)</div>
        <div class="queue-calendar-day-header">จ (Mon)</div>
        <div class="queue-calendar-day-header">อ (Tue)</div>
        <div class="queue-calendar-day-header">พ (Wed)</div>
        <div class="queue-calendar-day-header">พฤ (Thu)</div>
        <div class="queue-calendar-day-header">ศ (Fri)</div>
        <div class="queue-calendar-day-header">ส (Sat)</div>
        ${cellsHtml}
      </div>
    </div>
  `;
}

// ── Pushpin Note Modal for Daily Schedule & Personal Life Tasks ──
function openCalendarDateModal(dateIso, day, month, year) {
  let modal = $('calendarDateModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'calendarDateModal';
    modal.className = 'modal-overlay';
    modal.onclick = (e) => { if (e.target === modal) closeCalendarDateModal(); };
    document.body.appendChild(modal);
  }

  const thaiMonths = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];
  const thaiDateText = day + ' ' + thaiMonths[month - 1] + ' ' + (year + 543);

  const allQueues = Store.getAllQueueItems();
  const dayQueues = allQueues.filter(q => isQueueDateMatching(q.queue_date, year, month, day));
  const personalTasks = Store.getCalendarTasks().filter(t => isQueueDateMatching(t.date, year, month, day));

  modal.innerHTML = `
    <div class="modal-card" style="max-width: 580px; width: 92%; border-radius: 26px; border: 2px solid #FFD1DF; background: #FFFFFF; position: relative; box-shadow: 0 16px 36px rgba(224, 90, 136, 0.16); overflow: visible; margin: 2rem auto;">
      <!-- Pushpin Top Decor: Pop out prominently above the paper note -->
      <div class="queue-postit-pin" style="top: -18px;"></div>

      <div style="max-height: calc(88vh - 40px); overflow-y: auto; padding: 2.2rem 1.8rem 1.8rem; border-radius: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.25rem;">
          <div>
            <span class="badge badge--pink" style="margin-bottom: 0.35rem; font-size: 11px;">DAILY PLANNER & LIFE</span>
            <h2 style="font-size: 1.4rem; color: #71515B; font-weight: 800; margin: 0; font-family: var(--font-heading);">
              แผนงานวันที่ ${thaiDateText}
            </h2>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0.2rem 0 0;">
              Today's Q: ${dayQueues.length} งาน | To-Do List: ${personalTasks.length} รายการ
            </p>
          </div>
          <button type="button" onclick="closeCalendarDateModal()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #71515B; padding: 4px 8px;">✕</button>
        </div>

        <!-- Section 1: Shop Queues for this date with Done Checkbox -->
        <div style="background: #FFF9FC; border: 1.5px solid #FFDFE9; border-radius: 18px; padding: 1.25rem; margin-bottom: 1.25rem;">
          <h4 style="font-size: 0.95rem; font-weight: 800; color: #71515B; margin: 0 0 0.85rem;">
            Today's Q (${dayQueues.length})
          </h4>

          ${dayQueues.length > 0 ? `
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${dayQueues.map(q => {
                const isDone = (normalizeQueueStatus(q.status) === 'done' || Number(q.progress) >= 100);
                return `
                  <div style="display: flex; align-items: center; justify-content: space-between; background: #FFFFFF; border: 1.5px solid ${isDone ? '#E2E8F0' : '#FFD6E5'}; border-radius: 12px; padding: 10px 14px; gap: 10px;">
                    <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; flex: 1; min-width: 0;">
                      <input 
                        type="checkbox" 
                        ${isDone ? 'checked' : ''} 
                        onchange="handleToggleQueueDoneFromCalendar('${q.id}', this.checked, '${dateIso}', ${day}, ${month}, ${year})"
                        style="width: 18px; height: 18px; cursor: pointer; accent-color: #E05A88;"
                      >
                      <span style="font-weight: 800; color: #E05A88; font-size: 0.92rem;">
                        ${escapeHTML(q.queue_number || 'Q')}
                      </span>
                      <span style="font-size: 0.9rem; color: #71515B; font-weight: 700; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; ${isDone ? 'text-decoration: line-through; opacity: 0.55;' : ''}">
                        ${escapeHTML(q.job_name || 'งานออกแบบ')} (${escapeHTML(q.customer_name || 'ลูกค้า')})
                      </span>
                    </label>
                    <button 
                      type="button" 
                      class="btn btn-outline btn-sm" 
                      onclick="closeCalendarDateModal(); openEditQueueModal('${q.id}')"
                      style="font-size: 0.75rem; padding: 2px 8px; border-radius: 8px; border-color: #FFDFE9; color: #71515B;"
                    >
                      ดูคิว
                    </button>
                  </div>
                `;
              }).join('')}
            </div>
          ` : `
            <div style="text-align: center; padding: 1rem; color: var(--text-muted); font-size: 0.88rem;">
              ไม่มีคิวงานของร้านในวันนี้
            </div>
          `}
        </div>

        <!-- Section 2: Personal Tasks / Life Todo Checklist -->
        <div style="background: #FFFFFF; border: 1.5px solid #FFDFE9; border-radius: 18px; padding: 1.25rem; margin-bottom: 1.25rem;">
          <h4 style="font-size: 0.95rem; font-weight: 800; color: #71515B; margin: 0 0 0.85rem;">
            To-Do List (${personalTasks.length})
          </h4>

          <!-- Add Task Input -->
          <div style="display: flex; gap: 8px; margin-bottom: 1rem;">
            <input 
              type="text" 
              id="newCalendarTaskTitle" 
              placeholder="พิมพ์สิ่งที่ต้องทำ เช่น ส่งพัสดุ, จ่ายค่าไฟ, ซื้อของ..." 
              style="flex: 1; border: 1.5px solid #FFDFE9; border-radius: 12px; padding: 8px 12px; font-size: 0.9rem; outline: none; background: #FFF9FC;"
              onkeydown="if (event.key === 'Enter') handleAddPersonalTaskSubmit('${dateIso}', ${day}, ${month}, ${year})"
            >
            <button 
              type="button" 
              class="btn btn-primary btn-sm" 
              onclick="handleAddPersonalTaskSubmit('${dateIso}', ${day}, ${month}, ${year})"
              style="border-radius: 12px; padding: 0 16px; font-weight: 700;"
            >
              + เพิ่ม
            </button>
          </div>

          <!-- Task List -->
          ${personalTasks.length > 0 ? `
            <div style="display: flex; flex-direction: column; gap: 6px;">
              ${personalTasks.map(t => `
                <div style="display: flex; align-items: center; justify-content: space-between; background: #FFF9FC; border: 1px solid #FFDFE9; border-radius: 10px; padding: 8px 12px;">
                  <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; flex: 1; min-width: 0;">
                    <input 
                      type="checkbox" 
                      ${t.completed ? 'checked' : ''} 
                      onchange="handleTogglePersonalTask('${t.id}', '${dateIso}', ${day}, ${month}, ${year})"
                      style="width: 17px; height: 17px; cursor: pointer; accent-color: #E05A88;"
                    >
                    <span style="font-size: 0.9rem; color: #71515B; font-weight: 600; ${t.completed ? 'text-decoration: line-through; opacity: 0.5;' : ''}">
                      ${escapeHTML(t.title)}
                    </span>
                  </label>
                  <button 
                    type="button" 
                    onclick="handleDeletePersonalTask('${t.id}', '${dateIso}', ${day}, ${month}, ${year})"
                    style="background: none; border: none; color: #A0AEC0; cursor: pointer; font-size: 1rem; padding: 2px 6px;"
                    title="ลบงานนี้"
                  >✕</button>
                </div>
              `).join('')}
            </div>
          ` : `
            <div style="text-align: center; padding: 0.75rem; color: var(--text-muted); font-size: 0.85rem;">
              ยังไม่มีบันทึกส่วนตัวในวันนี้ สามารถพิมพ์เพิ่มด้านบนได้เลยนะคะ
            </div>
          `}
        </div>

        <div style="display: flex; justify-content: flex-end;">
          <button type="button" class="btn btn-secondary" onclick="closeCalendarDateModal()" style="border-radius: 12px; padding: 0.6rem 1.6rem; font-weight: 700; background: #FFFFFF; border: 1.5px solid #FFDFE9; color: #71515B;">
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('is-active');
}
window.openCalendarDateModal = openCalendarDateModal;

function closeCalendarDateModal() {
  const modal = $('calendarDateModal');
  if (modal) modal.classList.remove('is-active');
}
window.closeCalendarDateModal = closeCalendarDateModal;

window.handleToggleQueueDoneFromCalendar = function (queueId, isChecked, dateIso, day, month, year) {
  const item = Store.getQueueItemById(queueId);
  if (!item) return;
  item.status = isChecked ? 'done' : 'progress';
  item.progress = isChecked ? 100 : 50;
  item.updated_at = new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) + ' น.';
  Store.saveQueueItem(item);
  renderCurrentView();
  openCalendarDateModal(dateIso, day, month, year);
};

window.handleAddPersonalTaskSubmit = function (dateIso, day, month, year) {
  const input = $('newCalendarTaskTitle');
  if (!input) return;
  const title = input.value.trim();
  if (!title) return;
  Store.saveCalendarTask({
    date: dateIso,
    title: title,
    completed: false
  });
  input.value = '';
  renderCurrentView();
  openCalendarDateModal(dateIso, day, month, year);
};

window.handleTogglePersonalTask = function (id, dateIso, day, month, year) {
  Store.toggleCalendarTask(id);
  renderCurrentView();
  openCalendarDateModal(dateIso, day, month, year);
};

window.handleDeletePersonalTask = function (id, dateIso, day, month, year) {
  Store.deleteCalendarTask(id);
  renderCurrentView();
  openCalendarDateModal(dateIso, day, month, year);
};

})();
