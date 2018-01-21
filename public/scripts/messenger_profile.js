const request = require("request");
const ACCESS_TOKEN = '';

module.exports = function () {

    //initialize messenger profile
    request({
        url: "https://graph.facebook.com/v2.11/me/messenger_profile",
        qs: { access_token: ACCESS_TOKEN },
        method: 'POST',
        json: {
            "get_started": {
                "payload": "get_started"
            },
            "greeting": [
                {
                    "locale": "default",
                    "text": "Hello, {{user_full_name}}!"
                },
                {
                    "locale": "en_US",
                    "text": "Hello, {{user_full_name}}!"
                }
            ]
        },
        headers: {
            'content-type': 'application/json'
        }
    }, function (error, response, body) {
        if (error) {
            console.error('Error making request: ', error.message);
        }
        else if (response.body.error) {
            console.error(response.statusCode, response.statusMessage);
            console.error('Response Error:', response.body.error.message);
        }
        else
    		   console.log(response.result);
    });
};