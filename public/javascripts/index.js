var io = io.connect();
io.on('connect', function(){
  var rooms   = [];
  var msg_box = $('#income').find('ol');

  //enter room
  $('button#join').click(function(){
    var room = $('select[name=room]').val();
    if(rooms.indexOf(room) < 0)
    {
      rooms.push(room);
      $('#room_list').find('ol').append($('<li _room="'+room+'"></li>').text(room));
      io.emit('room', room);
    }
  });

  //leave room
  $('button#leave').click(function(){
    var room = $('select[name=room]').val();
    if(rooms.indexOf(room) >= 0)
    {
      rooms.splice(rooms.indexOf(room), 1);
      $('#room_list').find('[_room='+room+']').remove();
      io.emit('leaveroom', room);
    }
  });

  //send message
  $('#message').keypress(function(e){
    if(e.which == 13)
    {
      var msg = $(this).val();
      if(msg.length > 0)
      {
        io.send(msg);
      }
      $(this).val('');
      msg_box.append($('<li></li>').text('Me : ' + msg));
    }
  });

  //send name
  $('#nickname').keypress(function(e){
    if(e.which == 13)
    {
      var nickname = $(this).val();
      if(nickname.length > 0)
      {
        var msg = nickname;
        io.send(msg);
      }
      $(this).val('');

    }
  });



  //receive data
  io.on('message', function(data){
    switch(data.type)
    {
      case 'welcome':
        msg_box.append($('<li></li>').text('welcome , ' + data.nickname));
        $('#nickname').remove();
        $('#message').show();
        break;
      case 'error':
        alert(data.message);
        break;
      case 'login':
        msg_box.append($('<li></li>').text(data.nickname + ' login!'));
        break;
      case 'logout':
        msg_box.append($('<li></li>').text(data.nickname  + ' logout!'));
        break;
      default:
        msg_box.append($('<li></li>').text(data.nickname + ' : ' + data.message));
        break;
    }
  });

});





