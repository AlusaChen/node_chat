$(function(){
  var sio = io('/chat');
  sio.on('connect', function(){
    $('input').removeAttr('disabled');
    $('button').removeAttr('disabled');


    sio.on('message', function(info){
      switch(info.type)
      {
        case 'welcome':
          showWelcome(info);
          break;
        case 'login':
          showLogin(info);
          break;
        case 'logout':
          showLogout(info);
          break;
        case 'error':
          showError(info);
          break;
        default:
          showMessage(info);            
          break;
      }
    });

    $('input#username').keydown(function(e){
      if(e.which == 13)
      {
        e.preventDefault();
        var name = $(this).val();
        if(name.length > 0)
        {
          submitHandler($(this));
        }
      }
    });

    $('input#message').keydown(function(e){
      if(e.which == 13)
      {
        e.preventDefault();
        submitHandler($(this));
      }
    });

    function submitHandler(obj)
    {
      var msg = obj.val();
      if(msg.length >0 )
      {
        var info = {};
        info.message = msg;

        var room = $('input[name=chatroom]:checked').val();
        info.room = room;
        sio.send(info);

        obj.val('');
        if($('input#username').length < 1) $('.message ol').append($('<li></li>').text('Me : ' + msg));
      }
    }

    function showWelcome(info)
    {
      $('input#username').remove();
      $('input#message').show();
      $('.message ol').append($('<li></li>').text('welcome ' + info.name));
    }

    function showMessage(info)
    {
      $('.message ol').append($('<li></li>').text(info.name + ' : ' +info.message));
    }

    function showLogin(info)
    {
      $('.message ol').append($('<li></li>').text(info.name + ' login'));
    }

    function showLogout(info)
    {
      $('.message ol').append($('<li></li>').text(info.name + ' logout'));
    }

    function showError(info)
    {
      alert(info.message);
    }



  });
});