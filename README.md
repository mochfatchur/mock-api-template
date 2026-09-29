# Mock API Template (Node 14 + Express + PostgreSQL)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy `.env.example` jadi `.env`, sesuaikan kredensial Postgres local:
   ```bash
   cp .env.example .env
   ```

3. Buat tabel di Postgres local (jalankan lewat psql atau tool GUI):
   ```bash
   psql -U postgres -d mock_bcs_db -f init.sql
   ```
   > Pastikan database `mock_bcs_db` sudah dibuat duluan (`createdb mock_bcs_db`).

4. Jalankan server:
   ```bash
   npm start
   # atau untuk auto-reload saat development
   npm run dev
   ```

5. Server jalan di `http://localhost:3001`

## Endpoint

| Method | Endpoint      | Deskripsi                          |
|--------|---------------|-------------------------------------|
| GET    | `/`           | Health check                        |
| GET    | `/api/score`  | Ambil semua data instansi_id_gol & score |
| POST   | `/api/score`  | Insert bulk data (mock insert)      |

### Contoh POST body:
```json
{
  "data": [
    { "instansi_id_gol": 1487, "score": 73 },
    { "instansi_id_gol": 1568, "score": 82 }
  ]
}
```

### Contoh response sukses (200):
```json
{
  "data": [
    { "instansi_id_gol": 1487, "score": 73 },
    { "instansi_id_gol": 1568, "score": 82 }
  ]
}
```

## Menyesuaikan dengan API Dev asli

- Edit `routes/score.js` untuk mengubah field request/response supaya match dengan kontrak API Dev BCS/ebudget yang sebenarnya.
- Tambah file route baru di folder `routes/` untuk endpoint mock lainnya, lalu daftarkan di `server.js` (`app.use('/api', namaRoute)`).
- Struktur error response bisa disesuaikan biar konsisten dengan format error API Dev (mis. kode error khusus).
