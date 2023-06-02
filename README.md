# Soal Developer

## Instalasi

```bash
npm install
```

## Penggunaan

production mode:

```bash
npm start
```

development mode:

```bash
npm run dev
```

## Routes

- Marketing

  - GET `/marketing` melihat semua daftar sales marketing.
  - GET `/marketing/:id` melihat 1 sales marketing.
  - GET `/marketing/perhitungan` melihat seluruh hasil perhitungan.
  - POST `/marketing/perhitungan` menambah perhitungan komisi.<br>
    body:
    ```javascript
    {
      idMarketing: required,
      bulan: required,
      omzet: optional (default: 0)
    }
    ```

- Penjualan
  - GET `/penjualan` melihat semua data kredit.
  - POST `/penjualan/bayar` melakukan pembayaran kredit pada transaksi tertentu sesuai ID.<br>
    body:
    ```javascript
    {
      id: required,
      payment: required
    }
    ```

### NOTE

setiap objek output yang memiliki persentase pada soal tidak ditampilkan sebagai persentase, melainkan sebagai floating number. contoh: 5% menjadi 0.05, 2.5% menjadi 0.025, dst.

koleksi ekspor postman menggunakan versi 2.1.
