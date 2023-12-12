const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Rota para obter todos os posts
router.get('/', async (req, res) => {
  try {
    const connection = await db.connect();

    // Lógica para obter todos os posts
    const [rows] = await connection.execute('SELECT * FROM posts');

    // Não se esqueça de fechar a conexão após o uso
    await connection.end();

    res.status(200).json({ posts: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter os posts' });
  }
});

// Rota para obter um post específico
router.get('/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;
    const connection = await db.connect();

    // Lógica para obter um post específico
    const [rows] = await connection.execute('SELECT * FROM posts WHERE post_id = ?', [postId]);

    // Não se esqueça de fechar a conexão após o uso
    await connection.end();

    if (rows.length > 0) {
      res.status(200).json({ post: rows[0] });
    } else {
      res.status(404).json({ message: 'Post não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter o post' });
  }
});

// Rota para atualizar um post
router.put('/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;
    const { content, author, category } = req.body;

    const connection = await db.connect();

    // Lógica para atualizar um post
    await connection.execute('UPDATE posts SET content = ?, author = ?, category = ? WHERE post_id = ?', [content, author, category, postId]);

    // Não se esqueça de fechar a conexão após o uso
    await connection.end();

    res.status(200).json({ message: 'Post atualizado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar o post' });
  }
});

// Rota para excluir um post
router.delete('/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;
    const connection = await db.connect();

    // Lógica para excluir um post
    await connection.execute('DELETE FROM posts WHERE post_id = ?', [postId]);

    // Não se esqueça de fechar a conexão após o uso
    await connection.end();

    res.status(200).json({ message: 'Post excluído com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir o post' });
  }
});

router.post('/', async (req, res) => {
    try {
      const { content, author, category } = req.body;
  
      const connection = await db.connect();
  
      // Lógica para adicionar um post
      const [result] = await connection.execute('INSERT INTO posts (content, author, category) VALUES (?, ?, ?)', [content, author, category]);
  
      const postId = result.insertId;
  
      // Não se esqueça de fechar a conexão após o uso
      await connection.end();
  
      res.status(201).json({ postId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao adicionar o post' });
    }
  });

module.exports = router;
