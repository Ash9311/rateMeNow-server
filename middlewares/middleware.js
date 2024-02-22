
const jwt = require("jsonwebtoken");

const authMiddleWare = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.userId) {
            req.userId = decoded.userId;
            next();
        }
        else {
            res.status(403).json({});
        }
    } catch (error) {
        res.status(403).json({});
    }
};

module.exports = { authMiddleWare }