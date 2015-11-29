
// require dependencies for the application
var twilio = require('twilio');
var express = require('express');
var bodyParser = require('body-parser');
 
// Create a simple Express web app that will parse incoming POST bodies
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
 
// Create a route to render the home page
app.get('/', function(request, response) {
    response.render('index.jade');
});
 
// Create a route that will handle the form submission
app.post('/send', function(request, response) {
    // to send a message, we need a Twilio REST client - we create one here,
    // initializing with our Twilio account credentials. I am loading them here
    // from system environment variables, accessible through the "process.env"
    // global object in Node
    var client = new twilio.RestClient(process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN);
 
    // Now, get the parameters POSTed from our form:
    var toNumber = request.body.phone;
    var message = request.body.message;
    var mediaUrl = request.body.url;
 
    // Now let's send the message!
    client.sendMessage({
        to: toNumber,
        body: message,
        mediaUrl: mediaUrl,
        // This is the MMS-enabled number you purchased previously
        from: process.env.TWILIO_NUMBER
    }, function(err, messageData) {
        if (err) {
            response.send('Oops, there was an error :(');
            console.error(err);
        } else {
            response.send('Message sent! SID: ' + messageData.sid);
        }
    });
});
 
// Start the web application, and serve on local port 3000
app.listen(3000);
