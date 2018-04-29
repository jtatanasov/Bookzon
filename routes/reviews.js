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
            res.status(200);
            res.json(docs);
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

/* add review */
router.post('/', function (req, res, next) {
    var reviewsCollection = req.db.get('reviews');
    var review = req.body;
  
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
            res.status(200);
            res.json({ id: review._id });
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
                    res.status(200);
                    res.json({ id: reviewId });
                }
            });
        }
    });
});

router.delete('/review/:id', function (req, res, next) {
    var reviewId = req.params.id;
    var reviewsCollection = req.db.get('reviews');
    var review = req.body;
  
    reviewsCollection.find({ _id: reviewId }, {}, function (err, docs) {
        if (err) {
            res.status(500);
            res.json(err);
        } else {
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

            reviewsCollection.remove({ _id: reviewId }, {}, function (err, data) {
                res.status(200);
                res.json({ message: "success" });
            });
        }
    });
});

module.exports = router;
