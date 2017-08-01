var request = require("request");

var options = { method: 'GET',
  url: 'https://stackoverflow.com/jobs',
  qs: { sort: 'i', l: 'Remote', d: '20', u: 'Km' },
  headers: 
   { } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
