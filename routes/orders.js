var express = require('express');
var router = express.Router();
const PENDING_ORDER = 'Pending';
const ACCEPTED_ORDER = 'Shipping';
const DELIVERED_ORDER = 'Delivered';

function Orders(userId) {
    this.userId = userId;
    this.orders = [];
}

function Notifications(userId) {
    this.userId = userId;
    this.notifications = [];
}
function Notification(text, bookId) {
    this.id = new Date() + bookId;
    this.seen = false;
    this.bookId = bookId;
    this.text = text;

}

router.get('/pending', function (req, res, next) {
    var ordersCollection = req.db.get('orders');

    ordersCollection.find({}, {}, (err, docs) => {
        if (err) throw err;
        var allPendingOrders = [];
        allPendingOrders = docs.filter(o => o.status == PENDING_ORDER);
        res.status(200);
        res.json(allPendingOrders);
    })
});

router.put('/accept/:orderId', function (req, res, next) {
    var ordersCollection = req.db.get('orders');
    var booksCollection = req.db.get('books');
    var cartsCollection = req.db.get('carts');
    var notificationCollection = req.db.get('notifications');
    var orderToSearchId = req.params.orderId;

    ordersCollection.find({ _id: orderToSearchId }, {}, (err, docs) => {
        if (err) throw err;
        else {
            var tmpOrder = docs[0];
            var userId = docs[0].userId;
            var booksInOrder = docs[0].books;
            tmpOrder.status = ACCEPTED_ORDER;
            booksInOrder.forEach(book => {
                booksCollection.find({ _id: book.bookId }, {}, (err, docs) => {
                    var tmpBook = docs[0];
                    if (tmpBook.volumeInfo.quantity > 0) {
                        tmpBook.volumeInfo.quantity--;
                    }

                    if (tmpBook.volumeInfo.quantity == 0) {
                        cartsCollection.find({}, {}, (err, carts) => {
                            carts.forEach(cart => {
                                if (cart.userId != userId) {
                                    var foundBook = cart.books.find(b => b.bookId == book.bookId);
                                    if (foundBook) {
                                        var userToNotifyId = cart.userId;
                                        var text = 'Book in your cart (' + foundBook.name + ') has been deleted or is out of stock. We apologize for the inconvenience!';
                                        var notifcation = new Notification(text, foundBook.bookId);

                                        notificationCollection.find({ userId: userToNotifyId }, {}, (err, docs) => {
                                            if (err) throw err;
                                            else {
                                                if (docs.length == 0) {
                                                    var notifications = new Notifications(userToNotifyId);
                                                    notificationCollection.insert(notifications);
                                                } else {
                                                    var notifications = docs[0];
                                                }
                                                notifications.notifications.push(notifcation);
                                                notificationCollection.update({ _id: notifications._id }, notifications);
                                            }
                                        })
                                    }
                                }

                            })
                        })
                    }
                    booksCollection.update({ _id: tmpBook._id }, tmpBook)
                    ordersCollection.update({ _id: orderToSearchId }, tmpOrder, (err, resp) => {
                        if (err) throw err;
                        else {
                            res.status(200);
                            res.json({ orderId: tmpOrder._id });
                        }
                    })
                })
            })

        }
    })
})

router.delete('/decline/:orderId', function (req, res, next) {
    var ordersCollection = req.db.get('orders');
    var notificationCollection = req.db.get('notifications');
    var orderToSearchId = req.params.orderId;
    var userToNotifyId = '';

    ordersCollection.find({ _id: orderToSearchId }, {}, (err, docs) => {
        if (err) throw err;
        else {
            var userToNotifyId = docs[0].userId;
            ordersCollection.remove({ _id: orderToSearchId }, (err, docs) => {
                if (err) throw err;
                else {
                    var text = 'Your last order has been declined. We apologize for the inconvenience!';
                    var notification = new Notification(text, 1);
                    notificationCollection.find({ userId: userToNotifyId }, {}, (err, docs) => {
                        if (err) throw err;
                        else {
                            if (docs.length == 0) {
                                var notifications = new Notifications(userToNotifyId);
                                notificationCollection.insert(notifications);
                            } else {
                                var notifications = docs[0];
                            }
                            notifications.notifications.push(notification);
                            notificationCollection.update({ _id: notifications._id }, notifications);
                        }
                    })

                    res.status(200);
                    res.json({ message: 'success' });
                }
            })
        }
    });


})

router.put('/delivered/:orderId', function(req, res, next) {
    var ordersCollection = req.db.get('orders');
    var orderToSearchId = req.params.orderId;

    ordersCollection.find({_id: orderToSearchId}, {}, (err, docs) =>{
        if(err) throw err;
        else {
            var currOrder = docs[0];
            currOrder.status = 'Delivered';
            ordersCollection.update({_id: orderToSearchId}, currOrder, (err, resp) => {
                if(err) throw err;
                else {
                    res.status(200);
                    res.json({message: 'success'});
                }
            })
        }
    })
});
router.get('/:id', function (req, res, next) {
    var ordersCollection = req.db.get('orders');
    var userId = req.params.id;

    ordersCollection.find({ userId: userId }, {}, (err, docs) => {
        if (err) throw err;
        else {
            res.status(200);
            res.json(docs);
        }
    })
});
router.post('/', function (req, res, next) {
    var ordersCollection = req.db.get('orders');
    var booksCollection = req.db.get('books');
    var cartsCollection = req.db.get('carts');
    var notificationCollection = req.db.get('notifications');
    var newOrder = req.body;

    ordersCollection.insert(newOrder, (err, docs) => {
        if (err) throw err;
        res.status(200);
        res.json({ message: "success" });
    })

});


module.exports = router;
