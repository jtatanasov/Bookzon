var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var booksCollection = req.db.get('books');

    booksCollection.find({"volumeInfo.category" : "art"},  {} , function(err, docs) {
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
