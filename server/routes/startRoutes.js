const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Welcome to sociopedia Server");
});

module.exports = router;
