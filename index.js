const express = require('express');
const cors = require('cors');
const session = require('express-session');
const path = require('path')
const application =  require('./src/app/routes/index')
require('dotenv').config()
const port = process.env.PORT;

const app = express();

app.set('views', path.join(__dirname, 'src/views/'))
app.set('view engine','ejs');
app.use(express.urlencoded({extended : true}))

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }
    })
);

const corsOptions = {
    origin: '*', // Allow any origin to access the API
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(express.static(path.join(__dirname, '/src/public')));
app.use(cors(corsOptions));
app.use('/',application)

// interface
app.get('/loginpage', (req, res) => {
    res.render('index')
})

// Ensure the server is listening on all interfaces with the correct IP
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Access locally via: http://localhost:${port}`);
    console.log(`Access from other devices via: http://10.200.143.85:${port}`);
});