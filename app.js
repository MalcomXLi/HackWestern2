var express = require("express");
var app = express ();
var bodyParser = require("body-parser");
var twilio = require("twilio");
	

app.set('port', (process.env.PORT || 3000));

//Serving files, such as images, CSS, JavaScript and other static files 
app.use('/', express.static(__dirname+ '/public'));
app.use(bodyParser.json());

var server = app.listen(app.get("port"), function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

app.post('/sms', twilio.webhook({
    host:'hackwestern.herokuapp.com',
    protocol:'https'
}), function(request, response) {
    var twiml = new twilio.TwimlResponse();
    twiml.message('What is UP my NIGGA');
    response.send(twiml);
});

app.post('/call', function(request, response) {
    //Create TwiML response
    var twiml = new twilio.TwimlResponse();
    twiml.say('Hi you fucker!');

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

