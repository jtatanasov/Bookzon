var express = require('express');
var router = express.Router();

function Orders(userId) {
    this.userId = userId;
    this.orders = [];
}

function Notifications(userId) {
    this.userId = userId;
    this.notifications = [];
}
function Notification(bookName, bookId) {
    this.id = new Date() + bookId;
    this.seen = false;
    this.bookName = bookName;
    this.bookId = bookId;
    this.text = 'Book in your cart (' + this.bookName + ') has been deleted or is out of stock! For more information contact Admin!';
}


router.get('/:id', function (req, res, next) {
    var ordersCollection = req.db.get('orders');
    var userId = req.params.id;

    ordersCollection.find({ userId: userId }, {}, (err, docs) => {
        if (err) throw err;
        else {
            res.status(200);
            res.json(docs[0]);
        }
    })
});
router.post('/:id', function (req, res, next) {
    var ordersCollection = req.db.get('orders');
    var booksCollection = req.db.get('books');
    var cartsCollection = req.db.get('carts');
    var notificationCollection = req.db.get('notifications');
    var newOrder = req.body;
    var userId = req.params.id;

    ordersCollection.find({ userId: userId }, {}, (err, docs) => {
        if (err) throw err;

        if (docs.length == 0) {
            var orders = new Orders(userId);
            ordersCollection.insert(orders);
        } else {
            var orders = docs[0];
        }
        orders.orders.push(newOrder);
        var booksInOrder = (orders.orders[orders.orders.length - 1].books);
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
                                    var notifcation = new Notification(foundBook.name, foundBook.bookId);

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
                booksCollection.update({ _id: tmpBook._id }, tmpBook);
            })
        })
        ordersCollection.update({ _id: orders._id }, orders, (err, docs) => {
            if (err) throw err;
            else {
                res.status(200);
                res.json({ message: "success" });

            }
        })
    })
});


module.exports = router;
