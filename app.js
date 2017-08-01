var http = require("https");

var options = {
  "method": "GET",
  "hostname": "stackoverflow.com",
  "port": null,
  "path": "/jobs?sort=i&l=Remote&d=20&u=Km",
  "headers": {
    "cache-control": "no-cache"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();
