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



// router.delete('/:id', function (req, res, next) {
//     var idToDelete = req.params.id;
//     var usersCollection = req.db.get('users');

//     usersCollection.remove({ _id: idToDelete }).then(function (err, d) {
//         res.status(200);
//         res.json({ message: 'success' });
//     });

// });

router.get('/', function (req, res, next) {
    var usersCollection = req.db.get('users');

    usersCollection.find({}, {}, function (err, docs) {
        if (err) {
            res.status(500);
            res.json(err);
        } else {
            res.status(200);
            res.json(docs);
        }
    });
});

router.get('/:id', function (req, res, next) {
    var usersCollection = req.db.get('users');
    var idToSearch = req.params.id;

    usersCollection.find({ _id: idToSearch}, {}, function (err, docs) {
        if (err) {
            res.status(500);
            res.json(err);
        } else {
            var user = docs[0];
            delete user.password;
            res.status(200);
            res.json(docs);
        }
    });
});


module.exports = router;
