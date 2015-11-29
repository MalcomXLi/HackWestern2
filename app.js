var express = require("express");
var app = express ();
var bodyParser = require("body-parser");
var twilio = require("twilio");
var wolfram = require('./wolfram.js');
var responseBuilder = require('./responseBuilder.js');
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
        		var resultstring = stringFormat(res);
		    	var media = res['image'];
		    	if (media){
	        		twiml.message(function() {
				        this.body(resultstring);
				        this.media(media);
				    });
        		}else {
        			twiml.message(resultstring);
        		}

		    response.send(twiml);  
        	})   
        }
    });

});

var stringFormat = function(res){
	var result = "";
	var
	for (var key in res){
		if (res.hasOwnProperty(key)) {
       		var obj = res[key];
	        if(obj && (key !== 'image')){
	        	result+=result + key + " " + obj;
	        }
	    }
	}
	setTimeout(function(){
		return result;
	},500)
}

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