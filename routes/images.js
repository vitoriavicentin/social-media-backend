const express = require('express');
const router = express.Router();
const multer = require('multer');
const db = require('../db/db');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { id_post } = req.body;
    const imageData = req.file.buffer; // Dados binários da imagem


    if (id_post === undefined || imageData === undefined) {
      return res.status(400).json({ error: 'Campos obrigatórios não fornecidos' });
    }

    const connection = await db.connect();

    await connection.execute('INSERT INTO images (id_post, image_data) VALUES (?, ?)', [id_post, imageData]);

    await connection.end();

    res.status(201).json({ message: 'Imagem adicionada com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao adicionar a imagem' });
  }
});

router.get('/:post_id', async (req, res) => {
  try {
    const { post_id } = req.params;

    const connection = await db.connect();

    const [result] = await connection.execute('SELECT image_data FROM images WHERE id_post = ?', [post_id]);

    await connection.end();

    if (result.length > 0) {
      const imageData = result[0].image_data;
      res.writeHead(200, {
        'Content-Type': 'image/jpeg', // Altere o tipo de conteúdo conforme necessário
        'Content-Length': imageData.length
      });
      res.end(imageData);
    } else {
      res.status(404).json({ error: 'Imagem não encontrada para o post_id especificado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter a imagem' });
  }
});

router.delete('/:post_id', async (req, res) => {
  try {
    const { post_id } = req.params;

    const connection = await db.connect();

    const [result] = await connection.execute('DELETE FROM images WHERE id_post = ?', [post_id]);

    await connection.end();

    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Imagem excluída com sucesso' });
    } else {
      res.status(404).json({ error: 'Imagem não encontrada para o post_id especificado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir a imagem' });
  }
});



module.exports = router;
