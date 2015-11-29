var responseBuild = function(result, callback){
	var title;
	var text;
	var image;
	result.forEach(function(res){
		console.log("Results : " + JSON.stringify(res));
		//console.log("Title: " + res['title']);
		res['subpods'].forEach(function(pods){
			//console.log("text: " + pods['text']);
			if (res['primary']){
			 	results['title'] = res['title'];
				results['text']  = pods['text'];
			}
		});
	});
	callback(err, result);
}

module.exports = {
	responseBuild: responseBuild
}