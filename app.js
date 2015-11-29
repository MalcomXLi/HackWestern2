var express = require("express");
var app = express ();
var bodyParser = require("body-parser");
var twilio = require("twilio");
var wolfram = require('./wolfram.js');
var responseBuilder = require('./responseBuilder.js');
var imageGenerator = require('./imageGenerator.js');
var fs = require('fs');
var wiki = require('./wikipedia.js');


// Create an express web app
var app = express();


//Serving files, such as images, CSS, JavaScript and other static files 
app.use('/', express.static(__dirname+ '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.post('/sms', twilio.webhook(), function(request, response) {
	console.log("Query is : " + request.body.Body);
	response.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    });

    var query = request.body.Body;
    var twiml = new twilio.TwimlResponse();
    wolfram.queryWolfram(query, function(err, result){
        if (err){
		    twiml.message('eat dick');
		    response.send(twiml);    
        }
        else{
        	responseBuilder.responseBuild(result, function(res){
        		if (res['image']){
        			imageGenerator.download('http://www4b.wolframalpha.com/Calculate/MSP/MSP3731d0f05eg55hhg5670000416i62fdch17d60c?MSPStoreType=image/gif&s=5', 'img/image.jpg', function(){
					   	try
					    {
					        console.log( fs.statSync('img/image.jpg').isFile());
					        console.log( fs.statSync('img/image2.jpg').isFile());
					    }
					    catch (err)
					    {
					        console.log (false);
					    }

					    console.log('Done downloading..');
					  });
        		}
        		var resultstring = res['title'] +
		    	"\nAnswer: " + res['text'] ;
		    	var media = res['image'];
				console.log("fuck");
        		twiml.message(function() {
			        this.body(resultstring);
			        this.media(media);
			    });

		    response.send(twiml);  
        	})   
        }
    });

});

//app.listen(process.env.PORT || 3000);

var server = app.listen(process.env.PORT || 6000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});


app.get('/wolfram', function(request, response){
	console.log(request);
    response.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    });
    	var query = "integral(log(x))";


    wolfram.queryWolfram(query, function(err, result){
        if (err){
            response.status(404).send(err);
        }
        else{
            response.status(200).send(result);      
        }
    });
});

app.get('/wiki', function(request, response){
    console.log(request);
    response.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    });

    var query = "Big Bang"

    wiki.queryWiki(query, function(err, result){
        if (err){
            response.status(404).send(err);
        }
        else{
            response.status(200).send(result);      
        }
    });
});