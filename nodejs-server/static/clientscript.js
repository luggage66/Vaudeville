var socket;

$(function() {

	var canvas = $('#appCanvas').get(0)
	var context = canvas.getContext('2d');
	
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

		socket.on('resize', function(data) {
			canvas.width = data[0];
			canvas.height = data[1];
		});

		socket.on('draw', function(data) {
			for (prop in data.props) {
				context[prop] = data.props[prop];
			}
			for (func in data.calls) {
				context[func].apply(context, data.calls[func]);
			}
			
		});
	});



	$('#killButton').click(function() {
		socket.emit('kill');
	});

	$('#startButton').click(function() {
		socket.emit('start');
	});
});
