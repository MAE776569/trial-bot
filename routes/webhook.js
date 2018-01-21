const express = require('express');
const router = express.Router();
const senderActions = require("../public/scripts/sender_actions.js");
const replies = require("../public/scripts/replies.js");

function senderActionsCallback(error, response){
	if(error)
		console.error("Sender action error", error.message);
	else
		console.log("Success sending sender action.");
}

function textMessageCallback(error, response){
	if(error)
		console.error("Sender action error", error.message);
	else
		console.log("Success sending text message.");
}

//for verification
router.get('/$', function(req, res) {
    if (req.query['hub.verify_token'] === 'PathfinderBot') {		    
        res.sendStatus(200).end(req.query['hub.challenge']);
    }
	else{
		console.error("error verification token");
		res.sendStatus(404);
	}
});

router.post('/$', function (req, res) {
	let events = req.body.entry;
	for(let entry of events){
		let messaging = entry.messaging[0];
		let senderID = messaging.sender.id;
		if(messaging.postback){
			let postback = JSON.stringify(event.postback);
			if(postback.payload === "get_started"){
				senderActions("mark_seen", senderID, senderActionsCallback);
				senderActions("typing_on", senderID, senderActionsCallback);
				senderActions("typing_off", senderID, senderActionsCallback);
				sendTextMessage("Let's rock and roll!??", senderID, textMessageCallback);
			}
		}
	}
});

module.exports = router;