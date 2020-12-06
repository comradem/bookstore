const {Router} = require('express');
const Book = require('../models/Book');
const User = require('../models/User');
const auth = require('../middleware/auth.middleware');
const router = Router();


module.exports = router;

router.post('/getAllBooks', async (req, res) => {
    try {

        const books = await Book.find((err)=>{
            if (err){
                console.log("error while searching the store books");
            }
        });
        if (!books){
            return res.status(201).json({message: 'no books found in store'});
        }
        return res.status(201).json({books, message: 'status ok'});
    } catch (e) {
        res.status(500).message('something went wrong, try search later');
    }
});

router.get('/searchStore', async (req, res) => {
    try {
        const searchStr = req.query.search;
        const books = await Book.find({ "searchKeywords": {"$regex": `${searchStr}`, "$options": 'i'}})
        return res.status(201).json({books});
    } catch (e) {
        res.status(500).message('something went wrong, try search later');
    }
});



