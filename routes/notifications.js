var express = require('express');
var router = express.Router();

router.put('/:userId/:notificationId', function(req, res,next) {
    var notificationsCollection = req.db.get('notifications');
    var userId = req.params.userId;
    var notificationId = req.params.notificationId;

    notificationsCollection.find({userId: userId}, {}, (err, docs) => {
        if(err) throw err;
        else {
            var notifications = docs[0].notifications;
            var notIndex = notifications.findIndex(n => n.id == notificationId);
            notifications[notIndex].seen = true;
            notificationsCollection.update({_id: docs[0]._id}, docs[0]);
        }
    })

    res.json({"message": "success"});
})
router.get('/:id', function(req, res, next) {
    var notificationsCollection = req.db.get('notifications');
    var userId = req.params.id;
    notificationsCollection.find({userId: userId}, {}, (err, docs) => {
        if(err) throw err;
        else {
            res.status(200);
            res.json(docs[0]);
        }
    })
});

module.exports = router;
