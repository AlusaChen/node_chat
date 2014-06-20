$(function(){
  var sio = io();
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
          submitHandler();
        }
      }
    });

    $('input#message').keydown(function(e){
      if(e.which == 13)
      {
        e.preventDefault();
        submitHandler();
      }
    });

    $('button').click(function(){
      submitHandler();
    });

    function submitHandler()
    {
      var msg = $('input').val();
      if(msg.length >0 )
      {
        sio.send(msg);
        $('input').val('');
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