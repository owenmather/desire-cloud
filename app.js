
(function () {
	var request = require("request");
	const cheerio = require('cheerio');
	var myTestRequest=generateStackOverflowUrl("NOT YET INTEGRATED=SEARCH");
	var body= dispatchRequest(myTestRequest,"stackoverflow");
	
	function generateStackOverflowUrl(SEARCHTERM, PAGENUMBER=1){
	  var generatedRequest = { method: 'GET',
	  url: 'http://localhost/stack/test.html',
	  qs: { sort: 'i', pg: PAGENUMBER },
	  headers: 
	   { 'postman-token': '15718f0d-cb72-a151-6eb9-f0451ba1fa9c',
		 'cache-control': 'no-cache',
		 'content-type': 'application/gzip'} };
		 
	  return generatedRequest;
	}//end generateStackOverflowUrl

	function dispatchRequest(generatedRequest, website){
		request(generatedRequest, function (error, response, htmlResponse) {
			if (error) throw new Error(error);
		  
			if(website == "stackoverflow")
				parseStackOverflowHtml(htmlResponse);
		});
	}//end dispatchRequest

	function parseStackOverflowHtml(html) {
		const $ = cheerio.load(html);
		const HashMap = require('hashmap');
		var map = new HashMap();
		$("a").each(function(i, elem) {
			if($(this).attr("class") === "post-tag job-link no-tag-menu") {
				if(map.get($(this).text())){
				   map.set($(this).text(), map.get($(this).text()) + 1);
				} else {
				   map.set($(this).text(), 1);
				}
			}
		});
		
		var mysql = require('mysql');
		var pool = mysql.createPool({
		  host     : 'localhost',
		  user     : 'David',
		  password : 'password',
		  database : 'desirecloud'
		});

		pool.getConnection(function(err, connection) {
		  // Use the connection
			
		  	map.forEach(function(value, key) {
				var post = {language: key, count: value};
				console.log(key + " : " + value);
				var query = connection.query('INSERT INTO languagelisting SET ?', post, function (error, results, fields) {
					if (error) throw error;
					// Neat!
				 	
				});
			});
			// And done with the connection.
			connection.release();
			pool.end(function (err) {
  // all connections in the pool have ended
});
		});
	};//end ParserStackOverflowHtml


})();//end of file
