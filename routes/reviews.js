var express = require('express');
var router = express.Router();
var multer = require('multer');

function isValidString(str) {
    return (typeof str === 'string' && str.length > 0);
}

/* todo - validate rating -> number 1-5 */

/* all reviews */
router.get('/', function (req, res, next) {
    var reviewsCollection = req.db.get('reviews');

    reviewsCollection.find({}, {}, function (err, docs) {
        if (err) {
            res.status(500);
            res.json(err);
        } else {
            res.status(200);
            res.json(docs);
        }
    });
});

/* all reviews for a book */
router.get('/:bookId', function (req, res, next) {
    var reviewsCollection = req.db.get('reviews');

    reviewsCollection.find({bookId: req.params.bookId}, {}, function (err, docs) {
        if (err) {
            res.status(500);
            res.json(err);
        } else {
            var usersCollection = req.db.get('users');
            usersCollection.find({}, "_id name", function (err, users) {
                if (err) {
                    res.status(500);
                    res.json(err);
                } else {
                    docs.map(d => {
                        var name = users.find(u => u._id == d.userId).name;
                        d.username = name || "unknown";
                    });
                    res.status(200);
                    res.json(docs);
                }
            });
        }
    });
});

/* get single review */
router.get('/review/:reviewId', function (req, res, next) {
    var reviewsCollection = req.db.get('reviews');

    reviewsCollection.find({ _id: req.params.reviewId }, {}, function (err, docs) {
        if (err) {
            res.status(500);
            res.json(err);
        } else {
            res.status(200);
            res.json(docs[0]);
        }
    })
});

/* update book when adding/editing/deleting a review */
function updateBook(bookId, req) {
    var booksCollection = req.db.get('books');
    var reviewsCollection = req.db.get('reviews');
    
    reviewsCollection.find({ bookId: bookId }, function(err, docs) {
        if (err) throw err;

        var reviews = docs;
        var averageRating = 0;
        var ratingsCount = 0;


        if (reviews.length > 0) {
            var s = reviews.reduce((sum, review) => sum + review.rating, 0);
            averageRating = (s / reviews.length).toFixed(1);
            ratingsCount = reviews.length;
        }

        booksCollection.find({_id: bookId}, {}, (err, docs) => {
            if(err) {
                throw err;
            } else {
                booksCollection.update({_id: bookId}, {$set: {"volumeInfo.averageRating": averageRating, "volumeInfo.ratingsCount": ratingsCount}}, (err, resp) => {
                    if(err) {
                        throw err;
                    } else {
                    }
                })
            }
        })
        
    });
}

/* add review */
router.post('/', function (req, res, next) {
    var reviewsCollection = req.db.get('reviews');
    var review = req.body;
  console.log(req.body)
    if (!review.userId) {
        res.status(412);
        res.json({error: "no user"});
        return;
    }

    if (!review.bookId) {
        res.status(412);
        res.json({error: "no such book"});
        return;
    }

    reviewsCollection.insert(review, function (err, docs) {
        if (err) {
            res.status(500);
            res.json(err);
        } else {
            updateBook(review.bookId, req);
            res.status(200);
            res.json(docs);
        }

    });
});

/* update review*/
router.put('/review/:id', function (req, res, next) {
    var reviewsCollection = req.db.get('reviews');
    var reviewId = req.params.id;
    var review = req.body;

    reviewsCollection.find({ _id: reviewId }, {}, function (err, docs) {
        if (err) {
            res.status(500);
            res.json(err);
        } else {
            if (docs.length == 0) {
                res.status(404);
                res.json({error: "review not found"});
                return;
            }

            if (!review.userId || review.userId !== docs[0].userId) {
                res.status(412);
                res.json({error: "wrong user"});
                return;
            }
        
            if (!review.bookId || review.bookId !== docs[0].bookId) {
                res.status(412);
                res.json({error: "wrong book"});
                return;
            }

            reviewsCollection.update({_id: reviewId}, review, function (err, docs) {
                if (err) {
                    res.status(500);
                    res.json(err);
                } else {
                    updateBook(review.bookId, req);
                    res.status(200);
                    res.json(review);
                }
            });
        }
    });
});

router.delete('/review/:id/:userId/:bookId/:isAdmin', function (req, res, next) {
    var reviewId = req.params.id;
    var userId = req.params.userId;
    var bookId = req.params.bookId;
    var isAdmin = req.params.isAdmin;
    var reviewsCollection = req.db.get('reviews');
  
    reviewsCollection.find({ _id: reviewId }, {}, function (err, docs) {
        if (err) {
            res.status(500);
            res.json(err);
        } else {
            if (!userId || (userId !== docs[0].userId && !isAdmin)) {
                res.status(412);
                res.json({error: "wrong user"});
                return;
            }
        
            if (!bookId || bookId !== docs[0].bookId) {
                res.status(412);
                res.json({error: "wrong book"});
                return;
            }

            reviewsCollection.remove({ _id: reviewId }, {}, function (err, data) {
                updateBook(bookId, req);
                res.status(200);
                res.json({ message: "success" });
            });
        }
    });
});

module.exports = router;
