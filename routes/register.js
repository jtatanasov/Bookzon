var express = require('express');
var router = express.Router();
var sha1 = require('sha1');

function isValidMail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function isValidString(str) {
    return (typeof str === 'string' && str.length > 0);
}
function hasNumber(str) {
    return /\d/.test(str);
}
function isValidPassword(pass) {
    return (typeof pass === 'string' && pass.length >= 6 && hasNumber(pass))
}
function isValidPhoneNumber(phone) {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(String(phone));
}

router.post('/', function (req, res, next) {
    res.setHeader('content-type', 'application/json');
    var usersCollection = req.db.get('users');
    var newUser = req.body;

    if (!isValidMail(newUser.email) || !(isValidString(newUser.name)) || !(isValidPassword(newUser.password))) {
        res.status(200);
        res.json({ message: "Invalid input data" });
    } else {
        usersCollection.find({ email: newUser.email }, {}, function (err, doc) {
            if (err) {
                res.status(500);
                res.json({err:err});
            }

            if (doc.length === 0) {
                newUser.password = sha1(newUser.password);
                usersCollection.insert(newUser, function (err, doc) {
                    if (err) throw err;
                    res.status(200);
                    res.json({ id: doc._id });
                });
            } else {
                res.status(200);
                res.json({ message: "There is user with this email" });
            }
        });
    }
});

module.exports = router;