
(function () {
	var request = require("request");
	const cheerio = require('cheerio');
	var myMap = new Map();
		
	var myTestRequest=generateStackOverflowUrl("NOT YET INTEGRATED=SEARCH");
	var body= dispatchRequest(myTestRequest,"stackoverflow");
	
	console.log(myMap);
	
	function generateStackOverflowUrl(SEARCHTERM, PAGENUMBER=1){
	  var generatedRequest = { method: 'GET',
	  url: 'https://stackoverflow.com/jobs/remote-developer-jobs',
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
		
	};//end ParserStackOverflowHtml

	function incrementMapCount(key){
		if(myMap.get(key.toLowerCase())==undefined){
			myMap.set(key.toLowerCase(),1);
		}else{
			myMap.set(key.toLowerCase(),myMap.get(key.toLowerCase())+1);
		}
	}
	
})();//end of file
