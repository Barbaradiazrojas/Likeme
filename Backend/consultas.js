const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'postgres',
  database: 'likeme',
  allowExitOnIdle: true
});

const obtenerPosts = async () => {
  const { rows } = await pool.query("SELECT * FROM posts ORDER BY id DESC");
  return rows;
};

const agregarPost = async (titulo, img, descripcion) => {
  const consulta = "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, 0)";
  const values = [titulo, img, descripcion];
  await pool.query(consulta, values);
};

module.exports = { obtenerPosts, agregarPost };