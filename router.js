const express = require('express');

const router = express.Router();

router.use((_, __, next) => {
    console.log('Time: ', Date.now());
    next();
});

router.post('/', (req, res) => {
    const { msg } = req.query;
    res.json({ message: msg });
});

module.exports = router;
