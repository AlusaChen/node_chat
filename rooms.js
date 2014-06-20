#!/usr/bin/env node

var app 		= require('./app');

var server		= require('http').Server(app);
var io 			= require('socket.io')(server);
io.on('connection', function(socket){
	console.log('connection!!!!!!!');


	socket.on('room', function(room){
		socket.join(room);
	});

	socket.on('leaveroom', function(room){
		socket.leave(room);
	});

	socket.on('message', function(msg){
		//console.log(socket.rooms);
		var rooms = socket.rooms;
		for(var i in rooms){
			if(i == 0) continue;
			console.log(rooms[i]);
			socket.broadcast.to(rooms[i]).send(msg);
			//socket.broadcast.in(rooms[i]).send(msg); //include the sender
		}
	});
});

/*
setInterval(function(){
	io.in('room1').emit('message', 'what is going on?');
	io.in('room2').emit('message', 'anyone here?')	
},2000);
*/
//io.to(rooms[i]).emit('message', msg);
//io.in(rooms[i]).emit('message', msg); //include the sender

server.listen(3000);

