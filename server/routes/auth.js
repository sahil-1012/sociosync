const express = require('express');
const { login, register } = require("../controller/auth.js");

const router = express.Router();

router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // Add 'Authorization' to the header
    next();
});


router.post('/login', login);
router.post('/register', register);

module.exports = router;
