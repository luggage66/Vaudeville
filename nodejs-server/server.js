#!/usr/bin/env node

var http = require("http");
var connect = require("connect");
var io = require("socket.io");

var app = connect();
app.use(connect.static(__dirname + '/static'));

var server = http.createServer(app);
server.listen(8888);
io = io.listen(server);

io.sockets.on('connection', function(socket) {
	socket.emit('log', { message: "Connected!"});

	socket.on('kill', function() {

		//TODO: kill app

		socket.emit('log', { message: 'App Killed.'});
	});

});