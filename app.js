var express = require('express');
var https = require('https');
var fs = require('fs');
var app = express();

app.use(express.static(__dirname + '/public'));

app.port = 443;

https.createServer({
  key: fs.readFileSync(process.env.ASHEVILLE_WEB_SSL_KEY, 'utf8'),
  cert: fs.readFileSync(process.env.ASHEVILLE_WEB_SSL_CRT, 'utf8')
}, app).listen(app.port);

console.info('listening on', app.port);