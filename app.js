
(function () {
	var request = require("request");
	var myTestRequest=generateStackOverflowUrl("NOT YET INTEGRATED=SEARCH");
	var body= dispatchRequest(myTestRequest,"stackoverflow");
	
	function generateStackOverflowUrl(SEARCHTERM, PAGENUMBER=1){
	  var generatedRequest = { method: 'GET',
	  url: 'https://stackoverflow.com/jobs/remote-developer-jobs',
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
	   console.log(html);
	};//end ParserStackOverflowHtml


})();//end of file
