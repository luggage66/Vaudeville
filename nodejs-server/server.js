#!/usr/bin/env node

var express = require("express");
var io = require("socket.io");

var app = express();
var server = require('http').createServer(app);
server.listen(8888);

app.use(express.static(__dirname + '/static'));
io = io.listen(server);

io.sockets.on('connection', function(socket) {
	socket.emit('log', { message: "Connected!"});

	socket.on('start', function() {

		//TODO: kill app

		socket.emit('log', { message: 'App Started.'});
		socket.emit('processStatusChanged', { status: 'Running'});
	});

	socket.on('kill', function() {

		//TODO: kill app

		socket.emit('log', { message: 'App Killed.'});
		socket.emit('processStatusChanged', { status: 'Stopped'});
	});

});

