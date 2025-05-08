// Backend/Routes/auth.js

const express   = require('express');
const bcrypt    = require('bcrypt');
const jwt       = require('jsonwebtoken');
const User      = require('../Models/User');      // make sure this path is correct
const router    = express.Router();

const SECRET    = process.env.JWT_SECRET;
if (!SECRET) console.warn('⚠️  JWT_SECRET is not defined in .env');

// POST /auth/register
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password required' });
    }
    try {
        if (await User.findOne({ username })) {
            return res.status(409).json({ error: 'Username taken' });
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({ username, passwordHash: hash });
        res.status(201).json({ message: 'Registered' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal error' });
    }
});

// POST /auth/login
router.post('/login', async (req, res) => {
    console.log('[AUTH] login body:', req.body);
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password required' });
    }
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });
        if (!await bcrypt.compare(password, user.passwordHash)) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ sub: user._id }, SECRET, { expiresIn: '2h' });
        res.json({ token });
    } catch (e) {
        console.error('[AUTH ERROR]', e);
        res.status(500).json({ error: 'Internal error' });
    }
});

module.exports = router;
