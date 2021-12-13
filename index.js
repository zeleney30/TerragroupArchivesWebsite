const express = require("express");

const path = require("path");
const ejs = require("ejs");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.use('/public', express.static(__dirname + "/public"));

app.get('', (req, res) => {
  res.render('index');
})

app.get('/index', (req, res) => {
    res.render('index');
})

app.get('/ContactUs', (req, res) => {
    res.render('ContactUs');
})

app.get('/Purchase', (req, res) => {
    res.render('Purchase');
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));