const express = require('express')
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();
const db = require('./config/database.js');
const path = require('path');


const port = 443; // Port untuk rest api kita


// Set template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.json());
app.use(express.urlencoded({ extended: false }))


app.use('/api', routes);
app.use(express.static('public'));


app.listen(port, () => {
    console.log('Server berjalan di http://localhost:3000/');
});