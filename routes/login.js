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
    var attemptingUser = req.body;

    if (!isValidMail(attemptingUser.email) || !(isValidPassword(attemptingUser.password))) {
        res.status(412);
        res.json({ message: "Invalid input data" });
    } else {
        attemptingUser.password = sha1(attemptingUser.password);
        usersCollection.find({ email: attemptingUser.email, password: attemptingUser.password }, {}, function (err, doc) {
            if (err) {
                res.status(500);
                res.json({ err: err });
            }
            if (doc.length === 0) {
                res.status(404);
                res.json({ message: "Wrong username or password" });
            } else {
                res.status(200);
                var tmpUser = doc[0];
                delete tmpUser.password;
                req.session.user = tmpUser;
                req.session.save((err) => {
                    if (err) {
                        console.log(err);
                    } 
                });
                tmpUser = {
                    _id: doc[0]._id,
                    name: doc[0].name,
                    email: doc[0].email,
                    isAdmin: doc[0].isAdmin,
                    address: doc[0].address,
                    mobileNumber: doc[0].mobileNumber
                }
                res.json(tmpUser);
            }
        });
    }
});


module.exports = router;
