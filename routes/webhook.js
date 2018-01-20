const express = require('express');
const router = express.Router();


//for verification
router.get('/$', function(req, res) {
    if (req.query['hub.verify_token'] === 'Aha_Moment_Labs') {
        res.send(req.query['hub.challenge'])
    }
    res.end('Error, wrong token')
});

module.exports = router;