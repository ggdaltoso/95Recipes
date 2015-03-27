var app = angular.module( 'FramerApp', [ 'ngMaterial' ] );

app.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
    .primaryPalette('red');
    $mdThemingProvider.theme('default').backgroundPalette('red');
})

app.controller('AppCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
    $scope.splahScreen = true;

    $scope.toggleSidenav = function(menuId) {
        $mdSidenav(menuId).toggle();
        
        setTimeout(function(){
            $mdSidenav(menuId).toggle();
        }, 500);
    };
}]);