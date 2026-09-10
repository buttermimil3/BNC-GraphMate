/**
 * BNC GraphMate — Google Apps Script Central Cloud Database API
 * ใช้งานร่วมกับ Vercel ได้ 100% ทำให้ข้อมูลตรงกันทุกเครื่อง (มือถือลูกค้า และ คอมพิวเตอร์แอดมิน)
 * 
 * -------------------------------------------------------------
 * วิธีติดตั้ง (ทำเพียงครั้งเดียว):
 * 1. เข้า Google Drive -> สร้าง Google Sheet ใหม่ ตั้งชื่อ "BNC GraphMate Database"
 * 2. ไปที่เมนู "ส่วนขยาย" (Extensions) -> "Apps Script"
 * 3. ลบโค้ดเดิมออกทั้งหมด แล้ววางโค้ดไฟล์นี้ลงไป
 * 4. กดปุ่ม "ทำให้ใช้งานได้" (Deploy) -> "การทำให้ใช้งานได้ใหม่" (New deployment)
 * 5. เลือกประเภท: "เว็บแอป" (Web app)
 * 6. ตั้งค่า:
 *    - คำอธิบาย: BNC Database API
 *    - ดำเนินการในฐานะ: ตัวฉัน (Me)
 *    - ผู้ที่มีสิทธิ์เข้าถึง: ทุกคน (Anyone)  <--- สำคัญมาก!
 * 7. กด "ทำให้ใช้งานได้" (Authorize สิทธิ์ให้เรียบร้อย)
 * 8. คัดลอก "URL ของเว็บแอป" (Web App URL)
 * 9. นำ URL มาใส่ในไฟล์ js/store.js หรือใส่ในหน้า Admin Settings
 * -------------------------------------------------------------
 */

function doGet(e) {
  return handleRequest(e, 'GET');
}

function doPost(e) {
  return handleRequest(e, 'POST');
}

function handleRequest(e, method) {
  var lock = LockService.getScriptLock();
  // รอ lock สูงสุด 30 วินาทีเพื่อป้องกัน race condition เมื่อสั่งซื้อพร้อมกัน
  lock.tryLock(30000);

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    initSheetsIfMissing(ss);

    var action = (e && e.parameter && e.parameter.action) || 'GET_ALL';
    var body = {};

    if (e && e.postData && e.postData.contents) {
      try {
        body = JSON.parse(e.postData.contents);
        if (body.action) action = body.action;
      } catch (err) {}
    }

    var result = { status: 'success' };

    if (action === 'GET_ALL') {
      result.data = getAllDatabaseData(ss);
    } 
    else if (action === 'CREATE_ORDER') {
      result.data = handleCreateOrder(ss, body.orderInfo, body.paymentInfo);
    }
    else if (action === 'APPROVE_PAYMENT') {
      result.data = handleApprovePayment(ss, body.paymentId);
    }
    else if (action === 'REJECT_PAYMENT') {
      result.data = handleRejectPayment(ss, body.paymentId, body.reason);
    }
    else if (action === 'COMPLETE_GROUP_ACCESS') {
      result.data = handleCompleteGroupAccess(ss, body.accessId);
    }
    else if (action === 'FAIL_GROUP_ACCESS') {
      result.data = handleFailGroupAccess(ss, body.accessId, body.note);
    }
    else if (action === 'COMPLETE_DRIVE_ACCESS') {
      result.data = handleCompleteDriveAccess(ss, body.accessId);
    }
    else if (action === 'ADJUST_POINTS') {
      result.data = handleAdjustPoints(ss, body.customerId, body.amount, body.type, body.description);
    }
    else if (action === 'ADD_REVIEW') {
      result.data = handleAddReview(ss, body.review);
    }
    else if (action === 'UPDATE_REVIEW_STATUS') {
      result.data = handleUpdateReviewStatus(ss, body.id, body.status);
    }
    else if (action === 'SAVE_GROUP') {
      result.data = handleSaveEntity(ss, 'Groups', body.item);
    }
    else if (action === 'SAVE_PRODUCT') {
      result.data = handleSaveEntity(ss, 'Products', body.item);
    }
    else if (action === 'SAVE_FONT') {
      result.data = handleSaveEntity(ss, 'Fonts', body.item);
    }
    else if (action === 'SAVE_SETTINGS') {
      result.data = handleSaveSettings(ss, body.settings);
    }
    else if (action === 'SYNC_ALL' && body.payload) {
      // Sync ก้อนใหญ่
      saveAllDataToSheets(ss, body.payload);
      result.message = 'Synced all successfully';
    }

    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// ---------------- Helper Functions ---------------- //

function getAllDatabaseData(ss) {
  return {
    settings: getSheetRowsAsObjects(ss, 'Settings')[0] || {},
    groups: getSheetRowsAsObjects(ss, 'Groups'),
    products: getSheetRowsAsObjects(ss, 'Products'),
    fonts: getSheetRowsAsObjects(ss, 'Fonts'),
    orders: getSheetRowsAsObjects(ss, 'Orders'),
    payments: getSheetRowsAsObjects(ss, 'Payments'),
    group_access: getSheetRowsAsObjects(ss, 'GroupAccess'),
    drive_access: getSheetRowsAsObjects(ss, 'DriveAccess'),
    point_transactions: getSheetRowsAsObjects(ss, 'PointTransactions'),
    reviews: getSheetRowsAsObjects(ss, 'Reviews'),
    customers: getSheetRowsAsObjects(ss, 'Customers')
  };
}

function handleCreateOrder(ss, orderInfo, paymentInfo) {
  var oId = 'ord-' + Utilities.getUuid().slice(0, 8);
  var ordersSheet = ss.getSheetByName('Orders');
  var orderCount = Math.max(0, ordersSheet.getLastRow() - 1);
  var oNum = 'ORD-' + String(1001 + orderCount).padStart(6, '0');

  var newOrder = {
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

  var pId = 'pay-' + Utilities.getUuid().slice(0, 8);
  var newPayment = {
    id: pId,
    order_id: oId,
    amount: Number(orderInfo.amount),
    slip_image_url: paymentInfo.slip_image_url || '',
    verification_status: 'VERIFYING',
    qr_ref: paymentInfo.qr_ref || '',
    qr_trans_ref: paymentInfo.qr_trans_ref || '',
    qr_date: paymentInfo.qr_date || '',
    verified_at: ''
  };

  appendObjectToSheet(ss, 'Orders', newOrder);
  appendObjectToSheet(ss, 'Payments', newPayment);

  // GROUP
  if (orderInfo.order_type === 'GROUP') {
    var ga = {
      id: 'ga-' + Utilities.getUuid().slice(0, 8),
      order_id: oId,
      customer_id: newOrder.customer_id,
      customer_name: newOrder.customer_name,
      group_id: orderInfo.item_id,
      group_name: orderInfo.item_name,
      line_id: orderInfo.line_id || '',
      status: 'PENDING',
      completed_at: ''
    };
    appendObjectToSheet(ss, 'GroupAccess', ga);
  }

  // PRODUCT / FONT
  if (orderInfo.order_type === 'PRODUCT' || orderInfo.order_type === 'FONT') {
    var delivery = orderInfo.delivery_type || 'MANUAL';
    var da = {
      id: 'da-' + Utilities.getUuid().slice(0, 8),
      order_id: oId,
      customer_id: newOrder.customer_id,
      customer_name: newOrder.customer_name,
      item_id: orderInfo.item_id,
      item_name: orderInfo.item_name,
      item_type: orderInfo.order_type,
      delivery_type: delivery,
      gmail: orderInfo.gmail || '',
      drive_id: orderInfo.drive_folder_id || '',
      status: (delivery === 'GOOGLE_DRIVE') ? 'WAITING_EMAIL' : 'WAITING_ADMIN',
      completed_at: ''
    };
    appendObjectToSheet(ss, 'DriveAccess', da);
  }

  return { order: newOrder, payment: newPayment };
}

function handleApprovePayment(ss, paymentId) {
  var now = new Date().toISOString();
  updateCellWhere(ss, 'Payments', 'id', paymentId, 'verification_status', 'PAID');
  updateCellWhere(ss, 'Payments', 'id', paymentId, 'verified_at', now);

  var payments = getSheetRowsAsObjects(ss, 'Payments');
  var pay = payments.find(function(p) { return p.id === paymentId; });
  if (pay && pay.order_id) {
    updateCellWhere(ss, 'Orders', 'id', pay.order_id, 'status', 'PAID');
    // อัปเดต Drive access ถ้าเป็น Drive ออโต้
    updateCellWhere(ss, 'DriveAccess', 'order_id', pay.order_id, 'status', 'COMPLETED');
    updateCellWhere(ss, 'DriveAccess', 'order_id', pay.order_id, 'completed_at', now);
  }
  return { success: true };
}

function handleRejectPayment(ss, paymentId, reason) {
  var now = new Date().toISOString();
  updateCellWhere(ss, 'Payments', 'id', paymentId, 'verification_status', 'REJECTED');
  updateCellWhere(ss, 'Payments', 'id', paymentId, 'verified_at', now);

  var payments = getSheetRowsAsObjects(ss, 'Payments');
  var pay = payments.find(function(p) { return p.id === paymentId; });
  if (pay && pay.order_id) {
    updateCellWhere(ss, 'Orders', 'id', pay.order_id, 'status', 'REJECTED');
  }
  return { success: true };
}

function handleCompleteGroupAccess(ss, accessId) {
  var now = new Date().toISOString();
  updateCellWhere(ss, 'GroupAccess', 'id', accessId, 'status', 'COMPLETED');
  updateCellWhere(ss, 'GroupAccess', 'id', accessId, 'completed_at', now);
  return { success: true };
}

function handleFailGroupAccess(ss, accessId, note) {
  updateCellWhere(ss, 'GroupAccess', 'id', accessId, 'status', 'FAILED');
  return { success: true };
}

function handleCompleteDriveAccess(ss, accessId) {
  var now = new Date().toISOString();
  updateCellWhere(ss, 'DriveAccess', 'id', accessId, 'status', 'COMPLETED');
  updateCellWhere(ss, 'DriveAccess', 'id', accessId, 'completed_at', now);
  return { success: true };
}

function handleAdjustPoints(ss, customerId, amount, type, description) {
  var amt = Number(amount);
  var pt = {
    id: 'pt-' + Utilities.getUuid().slice(0, 8),
    customer_id: customerId,
    amount: amt,
    type: type,
    description: description || 'ปรับคะแนนโดยแอดมิน',
    created_at: new Date().toISOString()
  };
  appendObjectToSheet(ss, 'PointTransactions', pt);

  // คำนวณแต้มรวมของลูกค้า
  var custs = getSheetRowsAsObjects(ss, 'Customers');
  var cust = custs.find(function(c) { return c.id === customerId; });
  if (cust) {
    var cur = Number(cust.total_points) || 0;
    var updated = cur;
    if (type === 'EARN' || type === 'BONUS') updated += amt;
    else if (type === 'REDEEM') updated = Math.max(0, cur - amt);
    else if (type === 'ADJUST') updated = amt;

    updateCellWhere(ss, 'Customers', 'id', customerId, 'total_points', updated);

    var level = 'BRONZE';
    if (updated >= 3000) level = 'DIAMOND';
    else if (updated >= 1000) level = 'GOLD';
    else if (updated >= 500) level = 'SILVER';
    updateCellWhere(ss, 'Customers', 'id', customerId, 'member_level', level);
  }
  return { success: true };
}

function handleAddReview(ss, review) {
  review.id = 'rev-' + Utilities.getUuid().slice(0, 8);
  review.status = 'PENDING';
  review.created_at = new Date().toISOString();
  appendObjectToSheet(ss, 'Reviews', review);
  return review;
}

function handleUpdateReviewStatus(ss, id, status) {
  updateCellWhere(ss, 'Reviews', 'id', id, 'status', status);
  return { success: true };
}

function handleSaveEntity(ss, sheetName, item) {
  if (!item.id) {
    item.id = sheetName.toLowerCase().slice(0,3) + '-' + Utilities.getUuid().slice(0, 8);
    item.created_at = new Date().toISOString();
    appendObjectToSheet(ss, sheetName, item);
  } else {
    updateRowWhere(ss, sheetName, 'id', item.id, item);
  }
  return item;
}

function handleSaveSettings(ss, settings) {
  var sheet = ss.getSheetByName('Settings');
  sheet.clearContents();
  var headers = Object.keys(settings);
  sheet.appendRow(headers);
  var values = headers.map(function(k) { return settings[k]; });
  sheet.appendRow(values);
  return settings;
}

// ---------------- Sheet Row Utilities ---------------- //

function getSheetRowsAsObjects(ss, sheetName) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) return [];
  var data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];
  var headers = data[0];
  var rows = [];
  for (var i = 1; i < data.length; i++) {
    var obj = {};
    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = data[i][j];
    }
    rows.push(obj);
  }
  return rows;
}

function appendObjectToSheet(ss, sheetName, obj) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) return;
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var row = [];
  for (var i = 0; i < headers.length; i++) {
    var val = obj[headers[i]];
    row.push(val !== undefined ? val : '');
  }
  sheet.appendRow(row);
}

function updateCellWhere(ss, sheetName, keyCol, keyVal, targetCol, newVal) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) return;
  var data = sheet.getDataRange().getValues();
  if (data.length <= 1) return;
  var headers = data[0];
  var kIdx = headers.indexOf(keyCol);
  var tIdx = headers.indexOf(targetCol);
  if (kIdx === -1 || tIdx === -1) return;

  for (var i = 1; i < data.length; i++) {
    if (String(data[i][kIdx]) === String(keyVal)) {
      sheet.getRange(i + 1, tIdx + 1).setValue(newVal);
      break;
    }
  }
}

function updateRowWhere(ss, sheetName, keyCol, keyVal, newObj) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) return;
  var data = sheet.getDataRange().getValues();
  if (data.length <= 1) return;
  var headers = data[0];
  var kIdx = headers.indexOf(keyCol);
  if (kIdx === -1) return;

  for (var i = 1; i < data.length; i++) {
    if (String(data[i][kIdx]) === String(keyVal)) {
      for (var j = 0; j < headers.length; j++) {
        var field = headers[j];
        if (newObj[field] !== undefined) {
          sheet.getRange(i + 1, j + 1).setValue(newObj[field]);
        }
      }
      break;
    }
  }
}

// ---------------- Initialize Default Data ---------------- //

function initSheetsIfMissing(ss) {
  var requiredSheets = [
    { name: 'Settings', headers: ['shopName','tagline','contactPhone','contactLine','lineUrl','bankName','bankAccount','bankAccountName','promptpayQrUrl','googleSheetWebAppUrl','announcement'] },
    { name: 'Groups', headers: ['id','name','description','cover_image','price','preview_drive_url','benefits','status','created_at'] },
    { name: 'Products', headers: ['id','name','category','description','price','image','delivery_type','drive_folder_id','drive_file_id','what_you_get','status','created_at'] },
    { name: 'Fonts', headers: ['id','name','category','description','price','preview_text','preview_image','delivery_type','drive_folder_id','drive_file_id','status','created_at'] },
    { name: 'Orders', headers: ['id','order_number','customer_id','customer_name','order_type','item_id','item_name','amount','status','line_id','gmail','notes','created_at'] },
    { name: 'Payments', headers: ['id','order_id','amount','slip_image_url','verification_status','qr_ref','qr_trans_ref','qr_date','verified_at'] },
    { name: 'GroupAccess', headers: ['id','order_id','customer_id','customer_name','group_id','group_name','line_id','status','completed_at'] },
    { name: 'DriveAccess', headers: ['id','order_id','customer_id','customer_name','item_id','item_name','item_type','delivery_type','gmail','drive_id','status','completed_at'] },
    { name: 'PointTransactions', headers: ['id','customer_id','amount','type','description','created_at'] },
    { name: 'Reviews', headers: ['id','customer_name','product_name','rating','message','image_url','status','created_at'] },
    { name: 'Customers', headers: ['id','name','member_code','phone','line_id','email','total_points','member_level','created_at'] }
  ];

  requiredSheets.forEach(function(s) {
    var sheet = ss.getSheetByName(s.name);
    if (!sheet) {
      sheet = ss.insertSheet(s.name);
      sheet.appendRow(s.headers);
    }
  });
}
