var responseBuild = function(result, callback){
	var results = [];
	result.forEach(function(res){
		console.log("Results : " + JSON.stringify(res));
		//console.log("Title: " + res['title']);
		res['subpods'].forEach(function(pods){
			//console.log("text: " + pods['text']);
			if (res['primary']){
				if (!results['title'] && !results['text']){
				 	results['title'] = res['title'];
					results['text']  = pods['text'];
				}
			}
			if ((res['title'].toLowerCase()).indexOf('plot') !== -1){//pictures of plots
				results['image'] = pods['image'];
			}
			else if ((res['title'].toLowerCase()).indexOf('image') !== -1){//general pictures
				if (!results['title']){
					results['title'] = res['title'];
				}
				results['image'] = pods['image'];
			}
			if ((res['title'].toLowerCase()).indexOf('material properties') !== -1){
				if (!results['title']){
					results['title'] = res['title'];
				}
				if (!results['text']){
					results['text'] = res['text'];
				}
			}
		});
		callback(results);
	}
}

module.exports = {
	responseBuild: responseBuild
}