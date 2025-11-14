const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

function authMiddleware(req, res, next) {
  const h = req.headers.authorization;
  if (!h) return res.status(401).json({ error: 'No auth' });
  const token = h.replace('Bearer ', '');
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = data;
    next();
  } catch (e) { res.status(401).json({ error: 'Invalid token' }); }
}

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '12h' });
    return res.json({ token });
  }
  res.status(401).json({ error: 'Bad credentials' });
});

router.get('/me', authMiddleware, (req, res) => res.json({ email: req.admin.email }));

module.exports = router;
