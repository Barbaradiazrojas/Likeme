const express = require('express');
const cors = require('cors');
const { obtenerPosts, agregarPost } = require('./consultas');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/posts", async (req, res) => {
  try {
    const posts = await obtenerPosts();
    res.json(posts);
  } catch (error) {
    console.error("Error al obtener posts:", error);
    res.status(500).json({ error: "Error al obtener posts" });
  }
});

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

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});