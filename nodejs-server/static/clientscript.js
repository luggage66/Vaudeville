var socket;

$(function() {
	
	socket = io.connect('http://localhost:8888');

	socket.on('log', function(data) {
		$('<p>').text(data.message).appendTo('#logs')
	});

	$('#killButton').click(function() {
		socket.emit('kill');
	});
});
