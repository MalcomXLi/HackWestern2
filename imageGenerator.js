var fs = require('fs'),
    request = require('request');

var download = function(uri, filename, callback){

  request.head(uri, function(err, res, body){

    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    var r = request(uri).pipe(fs.createWriteStream(filename));
    r.on('close', callback);
  });
};

module.exports = {
	download: download
}

// download('http://www4b.wolframalpha.com/Calculate/MSP/MSP3731d0f05eg55hhg5670000416i62fdch17d60c?MSPStoreType=image/gif&s=5', 'img/image.jpg', function(){
//     console.log('Done downloading..');
//   });