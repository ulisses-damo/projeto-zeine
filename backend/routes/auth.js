const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
      [name, email, password]
    );
    res.status(201).json({ message: 'Usuário criado!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1 AND password = $2',
      [email, password]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'E-mail ou senha inválidos.' });
    }
    res.json({ email: result.rows[0].email, name: result.rows[0].name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;