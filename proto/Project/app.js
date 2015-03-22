var app = angular.module( 'FramerApp', [ 'ngMaterial' ] );


app.controller('FramerCtrl', ['$scope', function($scope){
  $scope.splahScreen = true;
    
    setTimeout(function(){
        $scope.splahScreen = false;
        $scope.$apply();
    },3000)
}]);