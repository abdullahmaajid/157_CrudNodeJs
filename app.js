const express = require('express');
const app = express();
const dotenv = require('dotenv');
const db = require('./database/db');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const { isAuthenticated } = require('./middlewares/middlewares.js');
const todoRoutes = require('./Routes/tododb.js');
const authRoutes = require('./Routes/authRoutes');

// Load environment variables from .env file
dotenv.config();

// Set the port from environment variables, default to 3000 if not defined
const port = process.env.PORT || 3000;

// Middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files like images, CSS, and JS from the public folder
app.use(express.static('public'));

// Set up Express session
app.use(session({
    secret: process.env.SESSION_SECRET, // Secret key for session
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Use Express EJS layouts for template rendering
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Routes

// Home route (protected by authentication)
app.get('/', isAuthenticated, (req, res) => {
    res.render('index', {
        layout: 'layouts/main-layouts'
    });
});


// Contact page
app.get('/contact', (req, res) => {
    res.render('contact', {
        layout: 'layouts/main-layouts'
    });
});

// To-Do list view (protected by authentication)
app.get('/todo-view', isAuthenticated, (req, res) => {
    db.query('SELECT * FROM todos', (err, todos) => {
        if (err) return res.status(500).send('Internal Server Error');
        res.render('todo', {
            layout: 'layouts/main-layouts',
            todos: todos
        });
    });
});

// Authentication routes (login, signup, etc.)
app.use('/', authRoutes);

// Todo-related routes
app.use('/todos', todoRoutes);

// Catch-all error handler for unhandled routes or errors
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging
    res.status(500).send('Something went wrong!'); // Send generic error message
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
