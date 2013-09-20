#!/usr/bin/env node

var express = require("express");
var io = require("socket.io");

var app = express();
var server = require('http').createServer(app);
server.listen(8888);

app.use(express.static(__dirname + '/static'));
io = io.listen(server);

io.sockets.on('connection', function(socket) {
	var appId = 0;

	socket.emit('log', { message: "Connected!"});

	socket.on('start', function() {

		//TODO: kill app
		appId = setInterval(randomShit, 1000);

		socket.emit('log', { message: 'App Started.'});
		socket.emit('processStatusChanged', { status: 'Running'});

		socket.emit('resize', [100, 100]);

		socket.emit('draw', {
			props: {
				fillStyle: '#00ff00'
			},
			calls: {
				"fillRect": [0, 0, 100, 100],
			}
		});
	});

	socket.on('kill', function() {

		//TODO: kill app
		clearInterval(appId);

		socket.emit('log', { message: 'App Killed.'});
		socket.emit('processStatusChanged', { status: 'Stopped'});
	});

	function randomShit() {
		var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);

		socket.emit('draw', {
			props: {
				fillStyle: randomColor
			},
			calls: {
				"fillRect": [0, 0, 100, 100],
			}
		});

	}

});

