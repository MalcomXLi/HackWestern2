var express = require("express");
var app = express ();
var bodyParser = require("body-parser");
var twilio = require("twilio");
var wolfram = require('./wolfram.js');

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
    validate:false
}), function(request, response) {
	console.log(request);
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

app.get('/wolfram', function(request, response){
    response.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    });

    var query = "integrate 2x";

    wolfram.queryWolfram(query, function(err, result){
        if (err){
            response.status(404).send(err);
        }
        else{
            response.status(200).send(result);      
        }
    });
});