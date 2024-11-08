const express = require('express');
const app = express();
const todoRoutes = require('./Routes/tododb.js');
require('dotenv').config();
const port = process.env.PORT;

app.use(express.json());

app.use('/todos', todoRoutes);

app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/contact', (req, res) => {
    res.render('contact');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});