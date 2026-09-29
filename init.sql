CREATE TABLE IF NOT EXISTS instansi_gol_score (
  id SERIAL PRIMARY KEY,
  instansi_id_gol INTEGER NOT NULL,
  score INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
