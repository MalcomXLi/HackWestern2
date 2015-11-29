var wikipedia = require("wikipedia-js");

var queryWiki = function(query, callback){
  var options = {query: query, format: "json", summaryOnly: true};
  wikipedia.searchArticle(options, function(err, htmlWikiText){
    if(err){
      callback(err);
    }
    else{
      callback(htmlWikiText);
    }
  });
}

module.exports = {
  queryWiki: queryWiki
}