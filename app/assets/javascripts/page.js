function join_in_room(val){
  $('.js-join_in').append('<div class="list-group-item">'+ val +'</div>')
}

function countdown(callback) {
	var bar = document.getElementById('progress'),
    time = 0, max = 300,
    int = setInterval(function() {
        bar.style.width = Math.floor(100 * time++ / max) + '%';
        if (time - 1 == max) {
            clearInterval(int);
            // 600ms - width animation time
            callback && setTimeout(callback, 1000);
        }
    }, 100);
};

function start_game(val){
  $('.room h2').text(val['question']);
  $('.hallway, .welcome-page').hide();
  $('.room.answer').show();
  countdown(function() {
    alert('Redirect');
    view_answers();
  });
}

function view_answers(val) {
	$('.room.answer').hide();
	$('.room.choose-answer').show();
	$('.room h2').text(val['question']);
}
$(document).ready(function(){
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
	$('.room-number').zclip({
      path:'/javascripts/ZeroClipboard.swf',
      copy:$('.room-number span').text()
    });
});