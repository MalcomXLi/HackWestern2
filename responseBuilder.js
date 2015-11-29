var responseBuild = function(result, callback){
	var results = [];
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
	callback(results);
}

module.exports = {
	responseBuild: responseBuild
}