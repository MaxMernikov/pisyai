function send_message(val){
  $('.js-messages').append('<p>' + val['username'] + ': ' + val['message'] + '</p>')
}

function join_in_room(val){
  $('.js-join_in').append('<div class="list-group-item">'+ val +'</div>')
}

function start_game(val){
  $('.room h2').text(val['question']);
  $('.room').show();
  $('.hallway').hide();
}