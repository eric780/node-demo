var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');

var server = http.createServer(function(req, res) {
	serveStatic(res, "index.html");
})

function serveStatic(response, absolutePath) {
	if (fs.exists(absolutePath, function(exists) {

		if (exists) {
			fs.readFile(absolutePath, function (err, data) {
				if (err) {
					send404(response);
				} else {

					var mimeType = mime.lookup(path.basename(absolutePath));
					response.writeHead(200, {'Content-Type' : mimeType});
					response.end(data);

				}
			});
		} else {
			send404(response);
		}

	}));
}

function send404(response) {
	res.writeHead(404, {'Content-Type' : 'text/plain'});
	res.end('404 : not found');	
}

server.listen(8081);
console.log('server listening on 8081');
