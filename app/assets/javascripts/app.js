(function(){
  var app = angular
    .module('room', ['ngSocket'])
    .config(["$socketProvider", function ($socketProvider) {
        $socketProvider.setUrl("http://localhost:5001");
      }]);

  // app.controller('RoomController', function(){
  //   this.product = 123;
  //   alert('ds');
  // });

  app.controller('RoomController', ['$scope', '$socket', function($scope, $socket){

    $scope.chatMessages = [];

    $socket.on( $('#roomCode').data('code'), $scope, function(data) {
      $scope[data.key] = data.val;
    });

    $scope.$watch('new_message', function (val){
      if(val){ $scope.chatMessages.push(val) };
    })

  }])

})();