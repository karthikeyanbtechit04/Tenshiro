const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Login system removed: bypass authentication
    req.user = { id: 1, email: 'guest@tenshiro.io', username: 'Guest Student' };
    next();
};
