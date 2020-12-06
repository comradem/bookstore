const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = (req, res, next) => {


    // do nothing, just a server check
    if (req.method === 'OPTIONS') {
        return next();
    }
    try {


        // console.log("$$$$$$$$$$$$$$ AUTHORIZATION HEADER $$$$$$$$$$$" + req.headers.authorization);
        const token = req.headers.authorization.split(' ')[1]; // Bearer TOKEN

        // console.log("$$$$$$$$$$$$$$ AUTHORIZATION TOKEN $$$$$$$$$$$" + token);
        if (!token) {
            return res.status(401).json({message: 'unauthorized'});
        }
        req.user = jwt.verify(token, config.get('jwtsecret'));
        next();

    } catch (e) {
        return res.status(401).json({message: 'unauthorized', error: e.message});

    }
};
