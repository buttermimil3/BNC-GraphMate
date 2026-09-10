/**
 * BNC GraphMate — Free Client-Side Slip Scanner & Anti-Fraud Checker
 * ถอดรหัส QR Code บนสลิปโอนเงินธนาคารไทย (มาตรฐาน PromptPay EMVCo) ฟรี 100%
 * ป้องกันการส่งสลิปซ้ำ และดึงเลขอ้างอิงทำรายการโดยไม่ต้องพึ่งพา API เสียเงิน!
 */

const SlipScanner = (function () {
  // ฟังก์ชันโหลด jsQR library แบบ dynamic หากยังไม่มีในหน้า
  function ensureJsQRLoaded() {
    return new Promise((resolve, reject) => {
      if (window.jsQR) return resolve(window.jsQR);
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js';
      script.onload = () => resolve(window.jsQR);
      script.onerror = () => reject(new Error('ไม่สามารถโหลด jsQR ได้'));
      document.head.appendChild(script);
    });
  }

  // อ่านรูปภาพเป็น ImageData บน Canvas
  function getImageDataFromFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          try {
            const imageData = ctx.getImageData(0, 0, img.width, img.height);
            resolve({ imageData, dataUrl: e.target.result, width: img.width, height: img.height });
          } catch (err) {
            reject(err);
          }
        };
        img.onerror = () => reject(new Error('ไม่สามารถอ่านไฟล์รูปภาพได้'));
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error('การอ่านไฟล์ล้มเหลว'));
      reader.readAsDataURL(file);
    });
  }

  // ถอดรหัสข้อมูล Thai QR Payment (EMVCo) บนสลิปธนาคาร
  function parseThaiSlipQR(rawText) {
    const result = {
      raw: rawText,
      isSlipQR: false,
      transRef: '',
      bankCode: '',
      date: '',
      amount: null
    };

    if (!rawText) return result;

    // ตรวจสอบโครงสร้างสลิปมาตรฐาน เช่น 00460006000001 หรือ KBank/SCB slip
    if (rawText.startsWith('0046') || rawText.includes('0006000001') || rawText.length > 20) {
      result.isSlipQR = true;
      // พยายามหา Transaction Reference รหัส 20-30 หลัก
      const matches = rawText.match(/[A-Za-z0-9]{18,35}/g);
      if (matches && matches.length > 0) {
        result.transRef = matches[matches.length - 1];
      } else {
        result.transRef = rawText.substring(rawText.length - 25);
      }
    }

    return result;
  }

  // ฟังก์ชันหลักในการสแกนและตรวจสอบสลิป
  async function scanSlip(file) {
    try {
      const jsQR = await ensureJsQRLoaded();
      const { imageData, dataUrl } = await getImageDataFromFile(file);

      // สแกน QR Code จากรูปสลิป
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert'
      });

      let qrData = null;
      let isDuplicate = false;
      let duplicateOrderId = null;

      if (code && code.data) {
        qrData = parseThaiSlipQR(code.data);

        // ตรวจสอบว่าเลขอ้างอิงนี้เคยถูกใช้ในระบบแล้วหรือไม่ (ป้องกันสลิปซ้ำ)
        if (window.Store) {
          const payments = window.Store.getPayments();
          const existing = payments.find(p => 
            p.qr_trans_ref && qrData.transRef && p.qr_trans_ref === qrData.transRef
          );
          if (existing) {
            isDuplicate = true;
            duplicateOrderId = existing.order_id;
          }
        }
      }

      return {
        success: true,
        hasQr: !!code,
        qrRaw: code ? code.data : null,
        transRef: qrData ? qrData.transRef : ('MANUAL-' + Date.now().toString().slice(-6)),
        isDuplicate: isDuplicate,
        duplicateOrderId: duplicateOrderId,
        dataUrl: dataUrl
      };
    } catch (error) {
      console.warn('Slip scanner fallback to manual:', error);
      // กรณีรูปแตกหรืออ่าน QR ไม่ได้ อนุญาตให้อัปโหลดแบบธรรมดาเพื่อให้แอดมินดูตาเปล่า
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve({
            success: true,
            hasQr: false,
            qrRaw: null,
            transRef: 'MANUAL-' + Date.now().toString().slice(-6),
            isDuplicate: false,
            dataUrl: e.target.result
          });
        };
        reader.readAsDataURL(file);
      });
    }
  }

  return {
    scanSlip: scanSlip
  };
})();

window.SlipScanner = SlipScanner;
