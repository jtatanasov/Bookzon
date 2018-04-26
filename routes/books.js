var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ 
    dest: 'uploads/',
    fileSize: 100000000
 });

// var multerConf = {
//     storage: multer.diskStorage({
//         destination: function (req, file, next) {
//             next(null, 'uploads/')
//         },
//         filename: function (req, file, next) {
//             const ext = file.mimetype.split('/')[1];
//             next(null, file.fieldname + '-' + Date.now() + ext);
//         }
//     }),
//     fileFilter: function (req, file, next) {
//         if (!file) {
//             next();
//         }
//         console.log(req.body);
//         console.log(file);
//         next(null, true);
        

//     }
// }

router.post('/', upload.array('bookImage', 12), function (req, res) {
    console.log(req.body);
    console.log(req.files);
    //...................................................
    res.json();
    
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
