/* eslint-env node */
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'hola12345',
  database: 'likeme',
  port: 1025,
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

// ⭐ NUEVA: Incrementar likes de un post
const agregarLike = async (id) => {
  const consulta = "UPDATE posts SET likes = likes + 1 WHERE id = $1";
  const values = [id];
  await pool.query(consulta, values);
};

// ⭐ NUEVA: Eliminar un post
const eliminarPost = async (id) => {
  const consulta = "DELETE FROM posts WHERE id = $1";
  const values = [id];
  await pool.query(consulta, values);
};

module.exports = { obtenerPosts, agregarPost, agregarLike, eliminarPost };