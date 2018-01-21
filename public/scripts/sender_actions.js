const request = require("request");
const ACCESS_TOKEN = '';

module.exports = function senderAction(action, userID, callback){
	let allowedActions = ["mark_seen", "typing_on", "typing_off"];
	if (!allowedActions.includes(action)){
		let error = new Error("Invalid sender action");
		return callback(error, null);	
	}
	else{
		request({
			url: "https://graph.facebook.com/v2.11/me/messages",
			qs: {
				access_token: ACCESS_TOKEN
			},
			method: "POST",
			headers: {
				"content-type": "application/json"
			},
			json: {
				"recipient":{
				    "id": userID
				  	},
				  "sender_action": action
				}
			},
		function(error, response, body){
			if(error)
				callback(error, null);
			else if(response.body.error)
				callback(response.body.error, null);
			else
				callback(null, response);
		});
	}
};