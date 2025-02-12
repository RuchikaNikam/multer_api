const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

const registerUser = async (req, res) => {
    const { username, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const user = await User.create({ username, password: hashedPassword });
        res.status(201).send(user);
    } catch (err) {
        res.status(400).send(err);
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });
        if (!user) return res.status(400).send('User not found');

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).send('Invalid password');

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.header('Authorization', token).send({ token });
    } catch (err) {
        res.status(500).send('Internal server error');
    }
};


const getAllUsers = async (req, res) => {
    const users = await User.findAll();
    res.send(users);
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username } = req.body;

    try {
        const user = await User.findByPk(id);
        user.username = username;
        await user.save();
        res.send(user);
    } catch (err) {
        res.status(400).send(err);
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);
        await user.destroy();
        res.send('User deleted');
    } catch (err) {
        res.status(400).send(err);
    }
};

module.exports = { registerUser, loginUser, getAllUsers, updateUser, deleteUser, upload };
// In the above code, we define several controller functions to handle user-related operations. These functions interact with the User model to perform CRUD operations on the database. We also define a multer middleware for handling file uploads. Finally, we export these functions to be used in other files.