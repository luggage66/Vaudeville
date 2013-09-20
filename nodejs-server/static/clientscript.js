var socket;

$(function() {
	
	socket = io.connect('http://localhost:8888');

	socket.on('connect', function() {
		socket.on('log', function(data) {
			$('<p>').text(data.message).appendTo('#logs')
		});

		socket.on('processStatusChanged', function(data) {
			var ui = $('#processStatus');
			
			ui.text(data.status);

			if (data.status == 'Running')
				ui.removeClass('bad').addClass('good');
			else
				ui.removeClass('good').addClass('bad');
		});
	});



	$('#killButton').click(function() {
		socket.emit('kill');
	});

	$('#startButton').click(function() {
		socket.emit('start');
	});
});
