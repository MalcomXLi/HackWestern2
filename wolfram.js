var wolfram = require('wolfram-alpha').createClient(process.env.WOLFRAM_API_KEY);

var queryWolfram = function(query, callback){
	wolfram.query(query, function (err, result) {
		callback(err, result);
	});
}

module.exports = {
	queryWolfram: queryWolfram
}