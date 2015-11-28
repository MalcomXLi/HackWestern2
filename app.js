var express = require("express");
var app = express ();
var bodyParser = require("body-parser");
var twilio = require("twilio");
var wolfram = require('./wolfram.js');

app.set('port', (process.env.PORT || 3000));

// Create an express web app
var app = express();


//Serving files, such as images, CSS, JavaScript and other static files 
app.use('/', express.static(__dirname+ '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.post('/sms', twilio.webhook(), function(request, response) {
	console.log("Text is : " + request.body.Body);
	response.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    });

    //var query = "integrate 2x";
    var query = request.body.Body;
    wolfram.queryWolfram(query, function(err, result){
        if (err){
            var twiml = new twilio.TwimlResponse();
		    twiml.message('eat dick');
		    response.send(twiml);    
        }
        else{
        	console.log(result);
            var twiml = new twilio.TwimlResponse();
		    twiml.message('What is UP my NIGGA');
		    response.send(twiml);     
        }
    });

});

//app.listen(process.env.PORT || 3000);

var server = app.listen(process.env.PORT || 3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
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
        	console.log(result.queryresult);
            for(var a=0; a<result.queryresult.pod.length; a++)
	        {
	            var pod = result.queryresult.pod[a];
	            console.log(pod.$.title,": ");
	            for(var b=0; b<pod.subpod.length; b++)
	            {
	                var subpod = pod.subpod[b];
	                for(var c=0; c<subpod.plaintext.length; c++)
	                {
	                    var text = subpod.plaintext[c];
	                    console.log('\t', text);
	                }
	            }
	        }      
        }
    });
});