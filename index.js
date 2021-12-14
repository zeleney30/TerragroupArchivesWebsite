const express = require("express");
const passport = require("passport");
const paypal = require("paypal-rest-sdk");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.use('/public', express.static(__dirname + "/public"));

paypal.configure({
    'mode': 'sandbox',  //sandbox or live
    'client_id': 'AS9v3cwbNXKcblabWMHkkc_pgDWM0KA4Sz_wEXiH4H-Fd2f-vCuXrHptFHpd-keB27ZFpMu6SmTKtQn2',
    'client_secret': 'EEMH3_VONY8AEHY6I4xNxviIAuRDpbJ3O_v3t7MbhExJitIDsgMprxAGQ8FihiH3fQyT9NUkgGgwBu4u'
})

app.get('', (req, res) => {
  res.render('index');
})

// /auth/google
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

app.get('/Purchase', (req, res) => {
    res.render('Purchase');
})

app.get('/Buy', (req, res) => {
    var payment = {
        "intent": "authorize",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "",
            "cancel_url": ""
        },
        "transactions": [{
            "amount": {
                "total": 39.00,
                "currency": "USD"
            },
            "description": "Terragroup Archives Software"
        }]
    }

    createPay(payment).then((transaction) => {
        var id = transaction.id;
        var links = transaction.links;
        var counter = links.length;
        while (counter--)
        {
            if (links[counter].method == 'REDIRECT')
            {
                return res.redirect(links[counter].href)
            }
        }
    }).catch((err) => {
        console.log(err);
        res.redirect('/err');
    })
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));