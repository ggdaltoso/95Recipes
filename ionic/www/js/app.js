/// <reference path="../../typings/cordova/cordova.d.ts"/>
/// <reference path="../../typings/angularjs/angular.d.ts"/>
var app = angular.module('ionicApp', ['ionic', 'ngCordova']);

app.config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/help');

    $stateProvider.state("home",{
        url: "/home",
        views:
        {
            home:
            {
                templateUrl: "home.html"
            }
        }
    });

    $stateProvider.state('help', {
        url: '/help',
        views: {
            help: {
                templateUrl: 'help.html'
            }
        }
    });

    $stateProvider.state("todos",{
        abstract: true,
        url: "/todos",
        views:
        {
            todos:
            {
                template: "<ion-nav-view></ion-nav-view>"
            }
        }
    });

    $stateProvider.state("todos.index",{
        url: "",
        templateUrl: "todos.html",
        controller: "TodosCtrl"
    });


    $stateProvider.state("todos.detail",{
        url: "/:todo",
        templateUrl: "todo.html",
        controller: "TodoCtrl",
        resolve:
        {
            todo: function($stateParams, TodosService)
            {
                return TodosService.getTodo($stateParams.todo);
            }
        }
    });

});

app.factory('TodosService', function(){
    var todos = [
        {title: "Pizza", done: true, type: {name: 'food', icon: 'fork'}, thumb: 'img/thumb/pizza.png'},
        {title: "Cupcake", done: false, type: {name: 'food', icon: 'fork'}, thumb: 'img/thumb/cupcake.png'},
        {title: "Rosca", done: false, type: {name: 'food', icon: 'fork'}, thumb: 'img/thumb/rosca.png'},
        {title: "Drink", done: false, type: {name: 'drink', icon: 'android-bar'}, thumb: 'img/thumb/drink.jpg'}
    ];

    return {
        todos: todos, 
        getTodo: function(index){
            return todos[index];
        },
        addTodo: function(todo){
            todos.push(todo);    
        }
    };
});

app.factory('Camera', ['$q', function($q){
    return {
        getPicture: function(options){
            var q = $q.defer();
            
            navigator.camera.getPicture(function(result){
                q.resolve(result);
            }, function(err){
                q.reject(err);
            }, options);
            
            return q.promise;
        }
    }
}])

app.controller('TodosCtrl', function($scope, TodosService, Camera, $ionicModal, $cordovaFile) {
    $scope.todos = TodosService.todos;
    
    $scope.dir = cordova.file.dataDirectory;
    
    $scope.types = [
        {name: 'food', icon: 'fork'},
        {name: 'drink', icon: 'android-bar'}
    ];
    
    $ionicModal.fromTemplateUrl('new-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal){
        $scope.modal = modal;
    });
    
    $scope.openModal = function(){        
        $scope.modal.show();
    };
    
    $scope.closeModal = function(){       
        $scope.modal.hide();   
    };
    
    $scope.$on('$destroy', function(){
        $scope.modal.remove();
    });
    
    $scope.addRecipe = function(recipe){        
        
        var newRecipe = {
            title: recipe.title,
            type: recipe.type,
            done: false
        };
        
        //createImage(recipe);
        
        recipe.dir = "teste";
        recipe.dir = cordova.file.dataDirectory + '/img/thumb/' + recipe.title;
        
        $scope.todos.push(newRecipe);
        
        console.log('Recipe', recipe);
        
        //recipe.title = '';
        //recipe.type = '';
        
        $scope.closeModal();
    };
    
    function createFileEntry(recipe){
     
     var newName = recipe.title + '.jpg';
     
     var fileEntry = recipe.image;
     
     window
        .resolveLocalFileSystemURL(
            cordova.file.dataDirectory, 
                function(fileSystem2) {
                     fileEntry.copyTo( fileSystem2, newName, onCopySuccess, fail );
                }, fail);
    }
    
    function onCopySuccess(entry) {
        $scope.$apply(function(){
        })
    }
    
    function copyFile(fileURI) {
        var name = fileEntry.fullPath.substr()
    }
    
    function fail(error) {
        console.log('Fail: ' + error.code);
    }
    
    $scope.getPicture = function(recipe){
        var options = {
            quality : 75,
            targetWidth: 320,
            targetHeight: 320
            /*,
            allowEdit: false,
            sourceType: Camera.PictureSourceType.CAMERA,
            destinationType: Camera.DestinationType.FILE_URL,
            encodingType: Camera.EncodingType.JPEG,
            //popoverOptions: CameraPopoverOptions
            */
        };
        
        Camera
            .getPicture(options)
            .then(function(imageData){
                recipe.image = imageData;
                recipe.thumb = imageData;
               // createFileEntry(recipe);
            }, function(err){
                console.log(err);
            });
    };
    
    $scope.recipe = {};
    $scope.recipe.type = $scope.types[0];
    
    console.log($scope.todos);    
});

app.controller('TodoCtrl', function($scope, todo) {
    $scope.todo = todo;
});
