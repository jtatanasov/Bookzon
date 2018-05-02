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

    usersCollection.find({ _id: idToSearch }, {}, function (err, docs) {
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

router.put('/:id', function (req, res, next) {
    var usersCollection = req.db.get('users');
    var idToSearch = req.params.id;

    var updateObj = {};
    usersCollection.find({ _id: idToSearch }, {}, function (err, docs) {
        var user = docs[0];

        if (req.body.name) {
            if (!isValidString(req.body.name)) {
                res.status(412);
                res.json({ message: 'Invalid name' });
                return;
            }
            updateObj.name = req.body.name;
        } else {
            updateObj.name = user.name;
        }
        if (req.body.email) {
            if (!isValidMail(req.body.email)) {
                res.status(412);
                res.json({ message: 'Invalid email' });
                return;
            }
            updateObj.email = req.body.email;
        } else {
            updateObj.email = user.email;
        }
        if (req.body.mobileNumber) {
            if (!isValidPhoneNumber(req.body.mobileNumber)) {
                res.status(412);
                res.json({ message: 'Invalid mobile number' });
            }
            updateObj.mobileNumber = req.body.mobileNumber;
        }else {
            if(user.mobileNumber != undefined)
                updateObj.mobileNumber = user.mobileNumber;
        }
        if (req.body.password) {
            if (!isValidPassword(req.body.password)) {
                res.status(412);
                res.json({ message: 'Invalid password' });
                return;
            }
            updateObj.password = sha1(req.body.password);
        } else {
            updateObj.password = user.password;
        }
        if( req.body.address) {
            if(!isValidString(req.body.address)) {
                res.status(412);
                res.json({message: 'Invalid address'});
                return;
            }
            updateObj.address = req.body.address;
        } else {
            if(user.address != undefined) {
                updateObj.address = user.address;
            }
        }
        
        usersCollection.update({ _id: idToSearch }, updateObj, function (err, docs) {
            if (err) {
                res.json({ message: 'No such user' });
                res.status(404);
                return;
            } else {
                res.status(200);
                updateObj._id = idToSearch;
                delete updateObj.password;
                res.json(updateObj);
            }
    
        });
    });

    


});


module.exports = router;
