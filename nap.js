
// require dependencies for the application
var twilio = require('twilio');
var express = require('express');
var bodyParser = require('body-parser');
 
// Create a simple Express web app that will parse incoming POST bodies
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
 
 
// Create a route that will handle the form submission
function fuck() {
    // to send a message, we need a Twilio REST client - we create one here,
    // initializing with our Twilio account credentials. I am loading them here
    // from system environment variables, accessible through the "process.env"
    // global object in Node
    var client = new twilio.RestClient('AC1f06851c12d27364cec272da2001283c',
        'e6e3aabb0bd46fc6eda88221cb58d15a');
 
    // Now let's send the message!
    client.sendMessage({
        to: '5195908581',
        body: "FUCK U TURD",
        mediaUrl: 'http://www4b.wolframalpha.com/Calculate/MSP/MSP3731d0f05eg55hhg5670000416i62fdch17d60c?MSPStoreType=image/gif&s=5',
        // This is the MMS-enabled number you purchased previously
        from: '2267791130'
    }, function(err, messageData) {
        if (err) {
            console.log(err);
        } else {
            console.log('Message sent! SID: ' + messageData.sid);
        }
    });
}
 
 fuck();
// Start the web application, and serve on local port 3000
app.listen(3000);
