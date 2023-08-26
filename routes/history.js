const express = require('express');
const router = express.Router();
const fs = require('fs');


router.get("/", (req, res) => {
    let historyData = JSON.parse(fs.readFileSync('history.json', 'utf-8'));
    res.send(JSON.stringify(historyData, null, 2));
});


module.exports = router;