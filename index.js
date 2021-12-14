const express = require("express");
const session = require("express-session");
const passport = require("passport");
require("./Authentication");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.use('/public', express.static(__dirname + "/public"));

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

app.use(session({ secret: "j6hs4w(*^Gw3bg5(*G^" }));
app.use(passport.initialize());
app.use(passport.session());

//  PAGES   //

app.get('', (req, res) => {
  res.render('index');
})

app.get('/auth/google', passport.authenticate("google", { scope: ["email", "profile"] }));

app.get('/auth/google/callback', (req, res) => {
    res.render('index');
})


app.get('/index', (req, res) => {
    res.render('index');
})

app.get('/ContactUs', (req, res) => {
    res.render('ContactUs');
})

app.get('/Purchase', isLoggedIn, (req, res) => {
    //res.render('Purchase');
    res.send(`Hello.... ${req.user.displayName}`);
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));