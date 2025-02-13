require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config');
const userRoutes = require('./routes/userRoutes');
const multer = require('multer');
const path = require('path');

const app = express();
const user = require('./models/user.js');
console.log(user);

// Set EJS as the view engine
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

const usersData = [
    { username: 'user1' },
    { username: 'user2' },
    { username: 'user3' },
  ];

// Serve static files
app.use(express.static(path.join(__dirname, '.')));

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.UPLOAD_DIR || 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Add root route to render index.ejs
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    // Handle the login request here
    // This is where you would send the login form or redirect the user
    res.render('login'); // For testing, we send some text for now
  });

app.get('/register', (req, res) => {
    // Handle the register request here
    // This is where you would send the register form or redirect the user
    res.render('register'); // For testing, we send some text for now
  });

app.get('/users', async (req, res) => {
    try {
        const users = await user.findAll();
        res.render('user', { users });

    } catch (err) {
        res.status(500).send('Failed to fetch users');
    }
});

// Add user routes
app.use('/api', userRoutes);

sequelize.sync().then(() => {
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
}).catch(err => console.log(err));