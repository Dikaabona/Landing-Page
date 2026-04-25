
# Integrasi Google Spreadsheet untuk Form Karir

Untuk menghubungkan form karir ke Spreadsheet Anda secara otomatis, ikuti langkah-langkah berikut:

1. Buka Spreadsheet Anda: https://docs.google.com/spreadsheets/d/1yY2WbVzz4iOGB8XII_x2n5cALVQH56dYLZcaMXfylFo/edit
2. Pilih menu **Extensions** > **Apps Script**.
3. Hapus kode yang ada dan tempelkan kode di bawah ini:

```javascript
function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0]; // Menggunakan sheet pertama
  
  try {
    var data = JSON.parse(e.postData.contents);
    
    // Header: Tanggal | Email Address | Nama | Tempat Tanggal Lahir | Alamat Lengkap | No HP | Gaji yang diharapkan | Posisi yang dilamar | Video Link | Portfolio Link
    sheet.appendRow([
      data.tanggal,
      data.email,
      data.nama,
      data.ttl,
      data.alamat,
      data.nohp,
      data.gaji,
      data.posisi,
      data.videoLink,
      data.portfolioLink
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Klik tombol **Save** (ikon disket) dan beri nama proyek (misal: "Visibel Career Hook").
5. Klik tombol **Deploy** > **New Deployment**.
6. Pilih type: **Web App**.
7. Konfigurasi:
   - Description: "Career Form API"
   - Execute as: **Me**
   - Who has access: **Anyone** (PENTING agar website bisa mengirim data)
8. Klik **Deploy**.
9. Salin **Web App URL** yang muncul (biasanya berakhiran `/exec`).
10. Masukkan URL tersebut ke **Environment Variables** di project ini dengan nama:
    `CAREER_SPREADSHEET_WEBHOOK_URL`

Setelah itu, setiap ada yang mengisi form di menu Karir, datanya akan otomatis masuk ke baris baru di spreadsheet Anda.
