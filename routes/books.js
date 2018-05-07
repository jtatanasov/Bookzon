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

router.put('/:bookId', function(req, res, next) {
    var booksCollection = req.db.get('books');
    var bookId = req.params.bookId;
    var newParams = req.body;

    booksCollection.find({_id: bookId}, {}, (err, docs) => {
        if(err) {
            res.status(500);
            res.json(err);
        } else {
            var book = docs[0];
            if(newParams.quantity) {
                book.volumeInfo.quantity = newParams.quantity;
            }
            if(newParams.price) {
                book.volumeInfo.price = newParams.price;
            }
            booksCollection.update({_id: bookId}, book, (err, resp) => {
                if(err) {
                    res.status(500);
                    res.json(err);
                } else {
                    res.status(200);
                    res.json({message: 'success'});
                }

            })
        }
    })
}); 
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
        authors: [book.author],
        publisher: book.publisher,
        publishedDate: date,
        description: book.description,
        pageCount: book.pages,
        rating: 0,
        quantity: book.quantity,
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
    booksCollection.insert(newBook, function (err, doc) {
        if (err) {
            res.status(500);
        } else {
            res.status(200);
            res.json({ id: doc._id });
        }
    });
});

router.delete('/:id', function (req, res, next) {
    var booksCollection = req.db.get('books');
    var bookToDelete = req.params.id;
    booksCollection.remove({ _id: bookToDelete }, (err, docs) => {
        if (err) {
            res.status(404);
            res.json({ message: 'Not Found' });
        }
        else {
            res.status(200);
            res.json({ message: 'success' });
        }
    });
});


/* Get books by one or more categories */
router.get('/category/:categories', function (req, res, next) {
    var booksCollection = req.db.get('books');
    var categories = req.params.categories.split("&");

    booksCollection.find( {"volumeInfo.category" : { $in: categories }}, {}, function (err, docs) {
        if (err) {
            res.status(500);
            res.json(err);
        } else {
            res.status(200);
            res.json(docs);
        }
    })
});

/* Get books by keyword */
router.get('/search', function (req, res, next) {
    var booksCollection = req.db.get('books');
    var keyword = req.query['q'];
    
    if (!keyword) {
        getAllBooks(req, res, next);
    } else {
        var regularExpression = new RegExp(keyword.replace(/[, ]+/g, " ").trim().replace(/ /g, "|"), "i");
       
        /* full word search with mongodb text index in title and authors */
        // booksCollection.find( { $text: { $search: keyword } }, {}, function (err, docs) {
        /* parial search with regular expression */
        booksCollection.find( { $or: [ { "volumeInfo.title": { "$regex": regularExpression } }, { "volumeInfo.authors": { "$regex": regularExpression }} ] }, {}, function (err, docs) {
            if (err) {
                res.status(500);
                res.json(err);
            } else {
                res.status(200);
                res.json(docs);
            }
        })
    }
});

/* Get some 'random' books for home page */
router.get('/random/:num', function (req, res, next) {
    var booksCollection = req.db.get('books');
    var num = +req.params.num;
    var limit = (num >= 1 && num <= 20) ? num : 10;

    // tesitng with averageRating
    booksCollection.find( {"volumeInfo.averageRating": { $gt: 4 }}, {limit: num}, function (err, docs) {
        if (err) {
            res.status(500);
            res.json(err);
        } else {
            res.status(200);
            res.json(docs);
        }
    })
});

/* Get single book */
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

/* Get all books */
router.get('/', getAllBooks);
function getAllBooks(req, res, next) {
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
}

module.exports = router;
