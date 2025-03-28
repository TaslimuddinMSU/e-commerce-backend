const jwt = require('jsonwebtoken');
const { User } = require('../modal/user');


const authentication = async (req, res, next) => {

    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Authentication is required.", error: "Token is required" })
    }

    try {
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decodeToken);
        const user = await User.findOne({ email: decodeToken.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user;
        next();

    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }

};


module.exports = { authentication }