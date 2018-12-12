const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to the course Api');
});

module.exports = router;