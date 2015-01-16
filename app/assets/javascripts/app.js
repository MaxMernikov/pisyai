(function(){
  var app = angular
    .module('room', ['ngSocket'])
    .config(["$socketProvider", function ($socketProvider) {
        $socketProvider.setUrl("http://localhost:5001");
      }]);

  // http://stackoverflow.com/questions/20369377/how-to-use-http-get-in-angularjs-correctly-in-specific-for-an-external-api-cal
  app.service('dataService', function($http) {
  this.getData = function(callbackFunc) {
      console.log(callbackFunc);
      var room_code = $('#roomCode').data('code');
      $http.get('/api/' + room_code + '/all_messages')
      .success(function(data){
        callbackFunc(data);
      }).error(function(){
        alert("error");
      });
   }
  });

  app.controller('RoomController', ['$scope', '$http', '$socket', 'dataService', function($scope, $http, $socket, dataService){

    var room_code = $('#roomCode').data('code');

    dataService.getData(function(dataResponse) {
      $scope.chatMessages = dataResponse;
    });

    $socket.on( room_code, $scope, function(data) {
      $scope[data.key] = data.val;
    });

    // подписка на получение писем
    $scope.$watch('new_message', function (val){
      if(val){ $scope.chatMessages.push(val) };
    })
  }]);

})();