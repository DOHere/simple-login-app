const express = require("express");
const app = express();
const PORT = 8000;const cors = require('cors');

const session = require('express-session');
// const mysql = require('mysql');

// Same user data as in db
let users = [
    {
        id: 1,
        username: 'john.smith',
        password: 'pass1',
        name: 'John Smith',
        email: 'john.smith@test.com',
        location: 'Bucharest',
    },
    {
        id: 2,
        username: 'marry.williams',
        password: 'pass2',
        name: 'Marry Williams',
        email: 'john.smith@test.com',
        location: 'Cluj',
    },
];
// const connection = mysql.createConnection({
// 	host     : 'localhost',
// 	user     : 'root',
// 	password : '',
// 	database : 'nodelogin'
// });

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(cors());

app.post("/api/login", (req, res) => {
    const username = req.body ? req.body.username : null;
	const password = req.body ? req.body.password : null;

    if (!username || !password) {
        return res.status(401).json({ success: false, error: 'Please enter your username and password!' });
    }

    let user = users.find( (usr) => {
        return (usr.username === username && usr.password === password);
    });
    // connection.query('SELECT 1 FROM users WHERE username = ? AND password = ?', [username, password], (error, results) => {...}
  
    if (user) {
        // req.session.loggedin = true;
        // req.session.username = username;
        return res.json({ success: true, user });
    } else {
        return res.status(401).json({ success: false, error: 'Incorrect username or password' });
    }
});

app.get('/api/user', (req, res) => {
    let user = users.find( (usr) => {
        return (usr.username === req.session.username);
    });
    // connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (error, results) => {...}

	if (!!req.session.loggedin) {
        return res.json({ success: true, user });
	} else {
        return res.status(401).json({ success: false, error: 'Please login to view this data' });
	}
});

app.post("/api/logout", (req, res) => {
    delete req.session.loggedin;
    delete req.session.username;
  
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`This app is listening on port ${PORT}`);
})