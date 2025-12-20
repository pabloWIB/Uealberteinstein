const SHEET_NAME = 'Contactos';
const TIMEZONE = 'America/Guayaquil';

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      const newSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet(SHEET_NAME);
      newSheet.appendRow(['Fecha', 'Hora', 'Nombre', 'Email', 'Teléfono', 'Mensaje']);
      newSheet.getRange('A1:F1').setFontWeight('bold').setBackground('#f9d829');
      return;
    }
    
    const data = JSON.parse(e.postData.contents);
    const timestamp = new Date();
    
    sheet.appendRow([
      Utilities.formatDate(timestamp, TIMEZONE, 'dd/MM/yyyy'),
      Utilities.formatDate(timestamp, TIMEZONE, 'HH:mm:ss'),
      data.user_name || '',
      data.user_email || '',
      data.user_phone || '',
      data.message || ''
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Datos guardados correctamente'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}