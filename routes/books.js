var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var booksCollection = req.db.get('books');

    booksCollection.find({},  {} , function(err, docs) {
    // booksCollection.find({"volumeInfo.category" : "art"},  {} , function(err, docs) {
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
    var booksCollection = req.db.get('books');
  
    booksCollection.find({ _id: req.params.id }, {}, function (err, docs) {
      if (err) {
        res.status(500);
        res.json(err);
      } else {
        res.status(200);
        res.json(docs[0]);
      }
    })
  });
  

module.exports = router;
