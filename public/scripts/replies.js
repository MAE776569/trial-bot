const request = require("request");
const ACCESS_TOKEN = '';

exports.sendTextMessage = function(text, userID, callback){
	if(!text){
		let error = new Error("Invalid message, empty string.");
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
	           		recipient: {
	           			id: userID
	           		},
	            		message: text,
	        		},
	        	function(error, response, body){
	        		if(error)
	        			callback(error, null);
	        		else if(response.body.error)
	        			callback(response.body.error, null);
	        		else
	        			callback(null, response);
	        	}
        	});
	}
};