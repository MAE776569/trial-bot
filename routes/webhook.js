const express = require('express');
const router = express.Router();


//for verification
router.get('/$', function(req, res) {
    if (req.query['hub.verify_token'] === 'PathfinderBot') {		    
        res.status(200).end(req.query['hub.challenge']);
    }
	else{
		console.error("error verification token");
		res.status(404).end();
	}
});

router.post('/$', function (req, res) {
	console.log(req.body);
	res.end();
});

module.exports = router;