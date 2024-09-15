// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../modelos/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registro de usuario
router.post('/register', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    username: req.body.username,
    password: hashedPassword
  });
  user.save()
    .then(user => res.json(user))
    .catch(err => res.status(400).json(err));
});

// Inicio de sesión
router.post('/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user && await bcrypt.compare(req.body.password, user.password)) {
    const token = jwt.sign({ _id: user._id }, 'secret_key');
    res.json({ token });
  } else {
    res.status(400).json({ error: 'Invalid credentials' });
  }
});

module.exports = router;