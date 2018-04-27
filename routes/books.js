var express = require('express');
var router = express.Router();
var multer = require('multer');

function isValidString(str) {
    return (typeof str === 'string' && str.length > 0);
}
function isValidNumber(num) {
    num = +num;
    return (typeof num == 'number' && num > 0);
}

router.post('/', function (req, res, next) {
    // console.log(req.body);
    // console.log(req.files);
    var book = req.body;

    if (!isValidString(book.title) || !isValidString(book.author) ||
        !isValidString(book.description) || !isValidNumber(book.price)) {
        res.status(412);
        res.json({ message: 'Invalid data' });
        return;
    }

    var spliitedDate = book.publishedDate.split(' ');
    var date = spliitedDate[2] + ' ' + spliitedDate[1] + ' ' + spliitedDate[3];
    
    var newPath = 'http://localhost:3000\\'
    var path = req.files[0].path.split('\\');
    path.splice(0, 1);
    path = path.join('\\');
    newPath += path;
    
    var volumeInfo = {
        title: book.title,
        author: [book.author],
        publisher: book.publisher,
        publishedDate: date,
        description: book.description,
        pageCount: book.pages,
        rating: 0,
        category: book.category,
        industryIdentifiers: [{
            type: 'ISBN_13',
            identifier: book.isbn13
        }, {
            type: 'ISBN_10',
            identifier: book.isbn10
        }],
        price: book.price,
        imageLinks: {
            smallThumbnail: newPath
        }
    }
    var newBook = {
        volumeInfo: volumeInfo
    }

    var booksCollection = req.db.get('books');
    booksCollection.insert(newBook, function(err, doc) {
        if(err) {
            res.status(500);
        } else {
            res.status(200);
            res.json({id: doc._id});
        }
    });
});

router.get('/', function (req, res, next) {
    var booksCollection = req.db.get('books');

    booksCollection.find({}, {}, function (err, docs) {
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
