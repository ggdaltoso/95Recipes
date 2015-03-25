var app = angular.module( 'FramerApp', [ 'ngMaterial' ] );

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('red');
  $mdThemingProvider.theme('default').backgroundPalette('red');
})

app.controller('FramerCtrl', ['$scope', function($scope){
  $scope.splahScreen = true;
}]);