function send_message(val){
  $('.js-messages').append('<p>' + val['username'] + ': ' + val['message'] + '</p>')
}

function join_in_room(val){
  $('.js-join_in').append('<div class="list-group-item">'+ val +'</div>')
}

function start_game(val){
  $('.room h2').text(val['question']);
  $('.hallway, .welcome-page').hide();
  $('.room').show();
}

$('.form-horizontal .btn').on('click', function(){
    var well = $('.well.js-messages');
    var height = well[0].scrollHeight + 20;
    well.scrollTop(height);
  });
  $('.chat p a').on('click', function(){
    if ($(this).hasClass('slide-up')) {
      $('.form-horizontal').slideDown();
      $(this).removeClass('slide-up');
    }
    else {
      $('.form-horizontal').slideUp();
      $(this).addClass('slide-up')
    }
  });