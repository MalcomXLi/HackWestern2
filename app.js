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
	console.log("Query is : " + request.body.Body);
	response.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    });

    //var query = "integrate 2x";
    var query = request.body.Body;
    var twiml = new twilio.TwimlResponse();
    wolfram.queryWolfram(query, function(err, result){
        if (err){
		    twiml.message('eat dick');
		    response.send(twiml);    
        }
        else{
        	var title;
        	var text;
        	var image;
        	console.log(JSON.stringify(result));
        	result.forEach(function(res){
        		if (res['primary']){
	        		console.log("Results : " + JSON.stringify(res));
					console.log("Title: " + res['title']);
				 	title = res['title'];
	        		res['subpods'].forEach(function(pods){
	        			console.log("text: " + pods['text']);
	        			
	        			console.log("image : " + pods['image']);
	        			text = pods['text'];
						image = JSON.stringify(pods);
	        		});
        		}
        	});
        
		    twiml.message("Query Results : \nTitle:" 
		    	+ title +
		    	"\nAnswer: " + text +
		    	"\nImage: " + image);
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
	console.log(request);
    response.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    });
    	var query = "4*9";


    wolfram.queryWolfram(query, function(err, result){
        if (err){
            response.status(404).send(err);
        }
        else{
            response.status(200).send(result);      
        }
    });
});