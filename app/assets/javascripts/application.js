// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs

//= require_tree ./lib
//= require socket.io
//= require_tree .


// socket = io.connect("http://localhost:5001");
// socket = io.connect("36c44f99.ngrok.com");

// socket.on("rt-change", function(message){
//   $('dl.rt-change').append('<dt>'+ message.username + '</dt><dd>' + message.message +'</dd>')
//   console.log(message);
// });

// socket.on("create-room", function(message){
//   $('dl.create-room').append('<dt>'+ message.username + '</dt><dd>' + message.message +'</dd>')
//   console.log(message);
// });

