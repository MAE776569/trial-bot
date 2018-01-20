const express = require('express');
const router = express.Router();


//for verification
router.get('/$', function(req, res) {
    if (req.query['hub.verify_token'] === 'PathfinderBot') {
        res.send(req.query['hub.challenge']);
    }
	else
		console.error("error verification token");
});

module.exports = router;