const {Router} = require('express');
const Book = require('../models/Book');
const User = require('../models/User');
const auth = require('../middleware/auth.middleware');
const router = Router();


module.exports = router;

router.post('/updatePurchasedBooks', auth, async (req, res) => {
    try {
        const bookIds = req.body;

        // console.log('*******REQUEST BODY IS *******' + bookIds);
        const user = await User.findOneAndUpdate(
            {email: req.user.email},
            {$set: {'books': bookIds}});
        if (user) {
            return res.status(201).json({message: 'user updated correctly', user: JSON.stringify(user, null, 2)});
        }
    } catch (e) {
        res.status(500).message('something went wrong, update history rolled back');
    }
});

//retrieves the last purchased books
router.post('/getPurchasedBooks', auth, async (req, res) => {
    try {
        // console.log('*******REQUEST BODY IS *******' + req.body);
        const result = await User.findOne({email: req.user.email}, async (err, doc) => {
            const books = await Book.find({isbn13: {$in: doc.books}});
            return res.status(201).json({books});
        });
        // const latestBooks = await Book.find();
        // console.log('*******BOOKS ID ON USER ARE *******' + JSON.stringify(result, null, 2));
        // return res.status(201).json({message: 'no latest books found for this user'});
    } catch (e) {
        res.status(500).message('something went wrong, try later');
    }
});
