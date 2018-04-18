var express = require('express');
var router = express.Router();


router.post('/', function (req, res, next) {
    var usersCollection = req.db.get('users');

    usersCollection.insert({ username: req.body.username, password: req.body.password, email: req.body.email }, function(err, doc) {
        if(err) throw err;
        else {
            res.status(200);
            res.json({id: doc._id});
        }
    });

});

router.delete('/:id', function (req, res, next) {
    var idToDelete = req.params.id;
    var usersCollection = req.db.get('users');

    usersCollection.remove({ _id: idToDelete }).then(function (err, d) {
        res.status(200);
        res.json({ message: 'success' });
    });

});

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

module.exports = router;
