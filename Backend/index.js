/* eslint-env node */
const express = require('express');
const cors = require('cors');
const { obtenerPosts, agregarPost, agregarLike, eliminarPost } = require('./consultas');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Ruta GET - Obtener todos los posts
app.get("/posts", async (req, res) => {
  try {
    const posts = await obtenerPosts();
    res.json(posts);
  } catch (error) {
    console.error("Error al obtener posts:", error);
    res.status(500).json({ error: "Error al obtener posts" });
  }
});

// Ruta POST - Crear un nuevo post
app.post("/posts", async (req, res) => {
  try {
    const { titulo, url, descripcion } = req.body;
    await agregarPost(titulo, url, descripcion);
    res.status(201).json({ message: "Post agregado con éxito" });
  } catch (error) {
    console.error("Error al agregar post:", error);
    res.status(500).json({ error: "Error al agregar post" });
  }
});

// ⭐ NUEVA: Ruta PUT - Incrementar likes de un post (Requerimiento 1)
app.put("/posts/like/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await agregarLike(id);
    res.json({ message: "Like agregado con éxito" });
  } catch (error) {
    console.error("Error al agregar like:", error);
    res.status(500).json({ error: "Error al agregar like" });
  }
});

// ⭐ NUEVA: Ruta DELETE - Eliminar un post (Requerimiento 2)
app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await eliminarPost(id);
    res.json({ message: "Post eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar post:", error);
    res.status(500).json({ error: "Error al eliminar post" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});