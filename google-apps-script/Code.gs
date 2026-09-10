/**
 * BNC GraphMate — Google Apps Script Backend (ฟรี 100% ไม่เสียค่าเซิร์ฟเวอร์)
 * 
 * วิธีติดตั้ง:
 * 1. เปิด Google Drive แล้วสร้าง Google Sheet ใหม่ ตั้งชื่อว่า "BNC GraphMate Database"
 * 2. ไปที่เมนู "ส่วนขยาย" (Extensions) -> "Apps Script"
 * 3. ลบโค้ดเดิมออกทั้งหมด แล้ววางโค้ดในไฟล์นี้ลงไป
 * 4. กดปุ่ม "ทำให้ใช้งานได้" (Deploy) -> "การทำให้ใช้งานได้ใหม่" (New deployment)
 * 5. เลือกประเภท: "เว็บแอป" (Web app)
 * 6. ตั้งค่า:
 *    - คำอธิบาย: BNC Database API
 *    - ดำเนินการในฐานะ: ตัวฉัน (Me)
 *    - ผู้ที่มีสิทธิ์เข้าถึง: ทุกคน (Anyone)
 * 7. กด "ทำให้ใช้งานได้" แล้วคัดลอก "URL ของเว็บแอป" (Web App URL)
 * 8. นำ URL มาใส่ในหน้า Admin Settings ของเว็บไซต์ ในช่อง "Google Sheet Web App URL"
 * เรียบร้อย! ข้อมูลทั้งหมดจะถูกบันทึกและซิงก์ลง Google Sheet ของคุณทันที!
 */

function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var action = (e.parameter && e.parameter.action) || 'GET_ALL';
    var body = {};

    if (e.postData && e.postData.contents) {
      try {
        body = JSON.parse(e.postData.contents);
        if (body.action) action = body.action;
      } catch (err) {}
    }

    if (action === 'SYNC_ALL' && body.payload) {
      // บันทึกข้อมูลลงชีตแยกแต่ละแท็บ
      saveSheetData(ss, 'Settings', [body.payload.settings]);
      saveSheetData(ss, 'Orders', body.payload.orders || []);
      saveSheetData(ss, 'Customers', body.payload.customers || []);
      saveSheetData(ss, 'Payments', body.payload.payments || []);
      saveSheetData(ss, 'GroupAccess', body.payload.group_access || []);
      saveSheetData(ss, 'DriveAccess', body.payload.drive_access || []);
      saveSheetData(ss, 'Points', body.payload.point_transactions || []);
      saveSheetData(ss, 'Reviews', body.payload.reviews || []);

      return ContentService.createTextOutput(JSON.stringify({ status: 'success', message: 'Synced successfully' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Default: ดึงข้อมูลสรุป
    return ContentService.createTextOutput(JSON.stringify({ status: 'ok', shop: 'BNC GraphMate' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function saveSheetData(ss, sheetName, items) {
  if (!items || items.length === 0) return;
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }

  // ดึงหัวตารางจาก keys
  var headers = Object.keys(items[0]);
  sheet.clearContents();
  sheet.appendRow(headers);

  var rows = [];
  for (var i = 0; i < items.length; i++) {
    var row = [];
    for (var j = 0; j < headers.length; j++) {
      var val = items[i][headers[j]];
      if (typeof val === 'object' && val !== null) {
        val = JSON.stringify(val);
      }
      row.push(val !== undefined ? val : '');
    }
    rows.push(row);
  }

  if (rows.length > 0) {
    sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
  }
}
