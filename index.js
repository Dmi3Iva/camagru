const http = require('http');

const app = http.createServer((request, response)=>{
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write('simlpe answer');
	response.end();
});

app.listen(3000);
