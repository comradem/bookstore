const {Router} = require('express');
const User = require('../models/User');
const Book = require('../models/Book');
const encryptor = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const router = Router();


module.exports = router;

// api/auth
// login --
// fetch user if exists in db by email
// check password
// create jwt if everything is in order
router.post('/login', [
    check('email', 'enter correct email').normalizeEmail().isEmail(),
    check('password', 'Enter the password').exists(),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Incorrect values entered, fix the errors and try again',
                errors: errors.array(),
            });
        }
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user){
            return res.status(400).json({message: 'user or password is incorrect'});
        }
        const passwMatch = await encryptor.compare(password, user.password);
        if (!passwMatch){
            return res.status(400).json({message: 'user or password is incorrect'});
        }
        const token = jwt.sign(
            {userId: user.id, email},
            config.get('jwtsecret'),
            {expiresIn: '1h'}
            );
        res.json({token, userId: user.id, userType: user.userType});

    } catch (e) {
        return res.status(500).message('something went wrong, try register later');
    }
});

// register new user
router.post('/register', [
    check('email', 'wrong email pattern').isEmail(),
    check('password', 'minimum length of the password is 6 symbols').isLength({min: 6}),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Incorrect values entered, fix the errors and try again',
                errors: errors.array(),
            });
        }

        const {email, password} = req.body;
        const candidate = await User.findOne({email});
        if (candidate) {
            return res.status(400).json({message: 'user already exists, choose a different username'});
        }
        const encryptedPassword = await encryptor.hash(password, 7);
        const userTypeCheck = email.includes('admin') ? 'Admin' : 'User'
        const newUser = new User({email, password: encryptedPassword, userType: userTypeCheck});
        await newUser.save();
        res.status(201).json({message: 'user created, you can continue shopping'});


    } catch (e) {
        res.status(500).message('something went wrong, try register later');
    }
});


