var io = require('socket.io').listen(5001),
    redis = require('redis').createClient();

redis.subscribe('func');
// redis.subscribe('create-room');


io.on('connection', function(socket){
  redis.on('message', function(channel, message){
    if(channel == 'func'){
      // create_room(message);
      socket.emit('create-room', JSON.parse(message));
    }else{
      socket.emit('rt-change', JSON.parse(message));
    }
  });
});

function create_room(room){
  redis.subscribe(room);
}

function drop_room(room){
  redis.unsubscribe(room);
}