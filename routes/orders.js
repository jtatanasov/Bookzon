var express = require('express');
var router = express.Router();

function Orders(userId) {
    this.userId = userId;
    this.orders = [];
}

router.post('/:id', function(req,res,next) {
    var ordersCollection = req.db.get('orders');
    var booksCollection = req.db.get('books');
    var newOrder = req.body;
    var userId = req.params.id;
    
    ordersCollection.find({userId: userId}, {}, (err, docs) => {
        if(err) throw err;
        
        if(docs.length == 0) {
            var orders = new Orders(userId);
            ordersCollection.insert(orders);
        } else {
            var orders = docs[0];
        }
        orders.orders.push(newOrder);
        var booksInOrder = (orders.orders[orders.orders.length - 1].books);
        booksInOrder.forEach(book => {
            booksCollection.find({_id: book.bookId}, {}, (err, docs) => {
                var tmpBook = docs[0];
                tmpBook.volumeInfo.quantity--;
                booksCollection.update({_id: tmpBook._id}, tmpBook);
            })
        })
        ordersCollection.update({_id: orders._id}, orders, (err, docs) =>{
            if(err) throw err;
            else {
                res.status(200);
                res.json({message: "success"});
                
            }
        })
    })
});


module.exports = router;
