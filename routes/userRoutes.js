const express = require('express');
const { registerUser, loginUser, getAllUsers, updateUser, deleteUser, upload } = require('../controllers/userController');
const authenticateToken = require('../middlewares/auth');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', authenticateToken, getAllUsers);
router.put('/users/:id', authenticateToken, updateUser);
router.delete('/users/:id', authenticateToken, deleteUser);

router.post('/upload', upload.single('file'), (req, res) => {
    res.send('File uploaded');
});

// Render views
router.get('/', (req, res) => {
    res.render('index');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/users', async (req, res) => {
    const users = await User.findAll();
    res.render('user', { users });
});

module.exports = router;
