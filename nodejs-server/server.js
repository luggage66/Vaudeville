#!/usr/bin/env node

var http = require("http");
var connect = require("connect");

var app = connect();
app.use(connect.static(__dirname + '/static'));

var server = http.createServer(app);
server.listen(8888);
