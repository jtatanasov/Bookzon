var express = require('express');
var router = express.Router();

function Cart(userId) {
    this.userId = userId;
    this.books = [];
    this.price = 0;
    this.deliveryPrice = 0;
    this.totalPrice = 0;
}
function calculatePrice(cart) {
    var price = 0;
    price = cart.books.reduce(function (price, book) {
        return (price + (+book.price));
    }, 0);
    return (Number(price.toFixed(2)))
}
function calculateDeliveryPrice(cart) {
    var deliveryPrice = 0;
    if (cart.price < 150) {
        deliveryPrice = Number((0.02 * cart.price).toFixed(2));
    }
    return deliveryPrice;
}
function calculateTotalPrice(cart) {
    return ((+cart.price) + (+cart.deliveryPrice)).toFixed(2);
}
function updateCart(cart, booksInCart) {
    cart.books = booksInCart;
    cart.price = calculatePrice(cart);
    cart.deliveryPrice = calculateDeliveryPrice(cart);
    cart.totalPrice = calculateTotalPrice(cart);
    return cart;
}
router.get('/', function (req, res, next) {
    var cartsCollection = req.db.get('carts');

    cartsCollection.find({}, {}, function (err, docs) {
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
    var cartsCollection = req.db.get('carts');
    var userId = req.params.id;

    cartsCollection.find({ userId: userId }, {}, function (err, docs) {
        if (err) {
            res.status(500);
            res.json(err);
        } else {
            res.status(200);
            res.json(docs);
        }
    });
});

router.post('/:userId', function(req,res,next) {
    var cartsCollection = req.db.get('carts');
    var userId = req.params.userId;
    var bookToAdd = req.body;
    cartsCollection.find({userId: userId}, {}, (err, docs) => {
        if(err) throw err;
        else {
            if(docs.length == 0) {
                var cart = new Cart(userId);
                cartsCollection.insert(cart);
            } else {
                var cart = docs[0];
            }
            var booksInCart = cart.books;

            if(!booksInCart.find(b => b.bookId == bookToAdd.bookId)) {
                booksInCart.push(bookToAdd);
            } else {
                res.status(200);
                res.json({alreadyInCart: true});
                return;
            }

            cart = updateCart(cart, booksInCart);

            cartsCollection.update({ _id: cart._id }, cart, function (err, docs) {
                if (err) throw err
                else {
                    res.status(200);
                    res.json({ message: 'success' });
                }
            })
        }
    });
});
router.delete('/:userId', function (req, res, next) {
    var cartsCollection = req.db.get('carts');
    var userId = req.params.userId;

    cartsCollection.find({ userId: userId }, {}, function (err, docs) {
        if (err) {
            res.status(500);
            res.json(err);
        } else {
            var cart = docs[0];
            var booksInCart = cart.books;
            booksInCart = [];

            cart = updateCart(cart, booksInCart);

            cartsCollection.update({ _id: cart._id }, cart, function (err, docs) {
                if (err) {
                    res.status(500);
                    res.json(err);
                } else {
                    res.status(200);
                    res.json({ message: 'success' });
                }
            })
        }
    })
});

router.delete('/:userId/:bookId', function (req, res, next) {
    var cartsCollection = req.db.get('carts');
    var userId = req.params.userId;
    var bookToRemoveId = req.params.bookId;

    cartsCollection.find({ userId: userId }, {}, function (err, docs) {
        if (err) {
            res.status(500);
            res.json(err);
        } else {
            var cart = docs[0];
            var booksInCart = cart.books;
            var bookIndex = booksInCart.findIndex(b => b.bookId == bookToRemoveId);
            booksInCart.splice(bookIndex, 1);

            cart = updateCart(cart, booksInCart);

            cartsCollection.update({ _id: cart._id }, cart, function (err, docs) {
                if (err) {
                    res.status(500);
                    res.json(err);
                } else {
                    res.status(200);
                    res.json({ message: 'success' });
                }
            })
        }
    })

});

module.exports = router;
