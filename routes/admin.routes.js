const {Router} = require('express');
const Book = require('../models/Book');
const User = require('../models/User');
const auth = require('../middleware/auth.middleware');
const router = Router();

module.exports = router;


router.post('/updateBook', auth, async (req, res) => {
    try {
        console.log('*******REQUEST BODY IS *******' + JSON.stringify(req.body));
        let query = {},
            update = {
                title: req.body.title,
                subtitle: req.body.subtitle,
                isbn13: req.body.isbn13,
                price: req.body.price,
                image: req.body.image,
                url: req.body.url,
                searchKeywords: req.body.searchKeywords,
            },
            options = {upsert: true, new: true, setDefaultsOnInsert: true};


        const book = await Book.findOneAndUpdate(query, update, options);
        if (book) {
            return res.status(201).json({message: 'book updated', book: JSON.stringify(book, null, 2)});
        }
    } catch (e) {
        res.status(500).message('something went wrong, update rolled back');
    }
});

//update book
router.post('/createBook', auth, async (req, res) => {
    try {
        const book = req.body;
        const newBook = await Book.create(book);
        const ack = await newBook.save();


        console.log('*******NEW BOOK CREATED *******' + JSON.stringify(ack, null, 2));
        // const latestBooks = await Book.find();

        return res.status(201).json({book: ack});
    } catch (e) {
        res.status(500).message('something went wrong, try create book later');
    }
});

//delete book
router.post('/deleteBook', auth, async (req, res) => {
    try {
        const {isbn13} = req.body;
        const result = await Book.findOneAndDelete({isbn13});

        if (result) {
            return res.status(201).json({message: `deleted book with isnb13: ${isbn13}`, result});
        }
        return res.status(201).json({message: `isnb13: ${isbn13} does not exist in store`});
    } catch (e) {
        res.status(500).message('something went wrong, try delete later');
    }
});
