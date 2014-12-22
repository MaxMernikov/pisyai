var io = require('socket.io').listen(5001),
    redis = require('redis').createClient();

redis.subscribe('create-room');

// redis.subscribe('func');


io.on('connection', function(socket){
  redis.on('message', function(channel, message){
    if(channel == 'create-room'){
      console.log('subscribe ' + message);
      redis.subscribe(message);
      // socket.emit('create-room', JSON.parse(message));
    // }else{
    //   socket.emit('rt-change', JSON.parse(message));
    }else{
      console.log(channel + ': ' + message);
      socket.emit(channel, JSON.parse(message));
    }
  });
});

// function create_room(room){
//   redis.subscribe(room);
// }

// function drop_room(room){
//   redis.unsubscribe(room);
// }