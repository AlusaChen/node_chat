var io = io.connect();
var room = 'test';
io.on('connect', function(){
	$('button#join').click(function(){
		var room = $('select[name=room]').val();
		io.emit('room', room);
	});

	$('button#leave').click(function(){
		var room = $('select[name=room]').val();
		io.emit('leaveroom', room);
	});

	$('#message').keypress(function(e){
		if(e.which == 13)
		{
			var msg = $(this).val();
			if(msg.length > 0)
			{
				io.send(msg);
			}
			$(this).val('');
		}
	});

	io.on('message', function(msg){
		$('.message ol').append($('<li></li>').text(msg));
	});
});





