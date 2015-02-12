var express = require('express');
var http = require('http');
var https = require('https');
var fs = require('fs');
var app = express();

app.use(function(req, res, next) {
  if(!req.secure) {
    return res.redirect(['https://', req.hostname, ':', app.https_port, req.originalUrl].join(''));
  }
  next();
});

app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.https_port = process.env.ASHEVILLE_WEB_HTTPS_PORT;
app.http_port = process.env.ASHEVILLE_WEB_HTTP_PORT;

https.createServer({
  key: fs.readFileSync(process.env.ASHEVILLE_WEB_SSL_KEY, 'utf8'),
  cert: fs.readFileSync(process.env.ASHEVILLE_WEB_SSL_CRT, 'utf8')
}, app).listen(app.https_port);

http.createServer(app).listen(app.http_port);

console.info('https listening on', app.https_port);
console.info('http listening on', app.http_port);