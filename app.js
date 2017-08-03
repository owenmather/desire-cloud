
(function () {
	var request = require("request");
	const cheerio = require('cheerio');
	var myMap = new Map();
		
	var myTestRequest=generateStackOverflowUrl("NOT YET INTEGRATED=SEARCH");
	var body= dispatchRequest(myTestRequest,"stackoverflow");
	
	console.log(myMap);
	
	function generateStackOverflowUrl(SEARCHTERM, PAGENUMBER=1){
	  var generatedRequest = { method: 'GET',
	  url: 'http://localhost/stack/test.html',
	  qs: { sort: 'i', pg: PAGENUMBER },
	  headers: 
	   { 'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.94 Safari/537.36',
		 'content-type': 'application/gzip',
		 'accept-encoding': 'gzip,deflate,br',
		 'host':'stackoverflow.com',
		 'DNT':'1'};
		 
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
		$("a").each(function(i, elem) {
			if($(this).attr("class") === "post-tag job-link no-tag-menu") {
				incrementMapCount($(this).text());
			}
		});
	};

	function incrementMapCount(key){
		if(myMap.get(key.toLowerCase())==undefined){
			myMap.set(key.toLowerCase(),1);
		}else{
			myMap.set(key.toLowerCase(),myMap.get(key.toLowerCase())+1);
		}
	}
	
	function saveToMysql(){
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
	}
})();//end of file
