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
    if(!map){   //stop if map name not provided
      return false;
    }
    var short;
    short = map.split("_");
    short = short[0];
    if(isShort){        //if shortName asked return it and stop
      return short;
    }
    else{             //gamemode override by map name (ex mediaval for cp_degrootkeep)
      if($rootScope.refined.mapsGameModes[map]){
        return $rootScope.refined.mapsGameModes[map];
      }
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
