const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET semua data (untuk cek data yang sudah masuk)
router.get('/score', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT instansi_id_gol, score FROM instansi_gol_score ORDER BY id DESC'
    );
    return res.status(200).json({
      data: result.rows,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
});

// POST - mock endpoint sesuai payload:
// { "data": [ { "instansi_id_gol": 1487, "score": 73 }, ... ] }
router.post('/neo-answer/scores/gol/:year', async (req, res) => {
  const { data } = req.body;
  const { year } = req.params;

  if (!Array.isArray(data) || data.length === 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Field "data" wajib berupa array dan tidak boleh kosong',
    });
  }
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    console.log('begin')

    const insertQuery = `
      INSERT INTO instansi_gol_score (year, instansi_id_gol, score, keterangan)
      VALUES ($1, $2, $3, $4)
      RETURNING instansi_id_gol, score
    `;

    const inserted = [];
    const instansi_gol_ids = []
    for (const item of data) {
      const { instansi_id_gol, score, keterangan } = item;

      instansi_gol_ids.push(instansi_id_gol)

      if (instansi_id_gol === undefined || score === undefined) {
        throw new Error('Setiap item wajib punya instansi_id_gol dan score');
      }

      const result = await client.query(insertQuery, [year, instansi_id_gol, score, keterangan]);
      inserted.push(result.rows[0]);
    }

    await client.query('COMMIT');

    console.log('end')

    // Response mengikuti format contoh sukses yang diberikan
    return res.status(200).json({
      success: true,
      data: {
        count: inserted.length,
        instansi_id_gol: [...instansi_gol_ids]
      },
      message: "Success!"
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    return res.status(500).json({ status: 'error', message: err.message });
  } finally {
    client.release();
  }
});

module.exports = router;
