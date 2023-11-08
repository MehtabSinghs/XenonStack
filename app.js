const express = require('express');
const app = express();
const mysql = require('mysql2');

// MySQL Connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

app.use(express.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
    const data = req.body.data;

    connection.query('INSERT INTO your_table SET ?', { column_name: data }, (err, result) => {
        if (err) throw err;
        console.log('Data inserted: ', result);
        res.send('Data inserted into the database.');
    });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/contact_us.html');
});

app.get('/php', (req, res) => {
    res.sendFile(__dirname + '/phpMyAdmin');
});
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
