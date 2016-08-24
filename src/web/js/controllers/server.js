app.controller('serverCtrl', function($scope, $rootScope, $stateParams)
{
  $scope.list = {
    limit : 100,
    servers : [],
    currentServer : null,
    retreiving : false,
    retreive : function(){
      console.log("Retreiving servers list...");
      $rootScope.ipc.emit("retreiveServers",{filters : $scope.filters, limit : this.limit});
    }
  }

  $scope.getGamemodeName = function(map, isShort){
    var short;
    short = map.split("_");
    short = short[0];
    if(isShort){
      return short;
    }
    else{
      var r = $rootScope.refined.gameModes[short];
      if(!r){
        return "unknow";
      }
      return $rootScope.refined.gameModes[short];
    }
  }

  //master server query filter
  $scope.filters = {
    "appid" : 440,
    "secure" : true,
    "empty" : false
  };

  $scope.list.retreive();

  //on server list receiving
  $rootScope.ipc.on("serversList", function(data){
    console.log(data[0]);
    $scope.list.servers = data;
    if(!$scope.$$phase) {
      $scope.$apply()
    }
  });

});
