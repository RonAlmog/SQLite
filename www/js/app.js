// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var db = null;

var myModule = angular.module('starter', ['ionic', 'ngCordova']);

myModule.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    
    if (window.cordova) {
        db = $cordovaSQLite.openDB("my.db");
        console.log("Opened DEVICE");
    }else{
        db = window.openDatabase("my.db", '1', 'my', 1024 * 1024 * 100); // browser
        console.log("Opened BROWSER");
    }
      
      
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS contacts (id integer primary key, firstname text, lastname text)");
    
  });
})

myModule.config(function($stateProvider, $urlRouterProvider){
   
    $stateProvider
        
        .state('home',
        {
            url: "/home",
            templateUrl: "html/home.html"
            
        })
    
    $urlRouterProvider.otherwise("/home");
    
});

myModule.controller('mainController', function($scope, $cordovaSQLite) {
    
    $scope.insert = function(firstname, lastname){
        
        var query = "INSERT INTO contacts (firstname, lastname) VALUES (?,?)";
        $cordovaSQLite.execute(db, query, [firstname,lastname]).then(function(res){
           console.log("INSERT ID -> " + res.insertID); 
        },function(err){
            console.log(err);
        });
    }
    
    $scope.select = function(v) {
        var query = "SELECT * FROM contacts";
        $cordovaSQLite.execute(db, query).then(function(res) {
            if(res.rows.length > 0) {
                console.log(res);
                v(res);
            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error(err);
        });
    }
    
    $scope.default = function(){
        $scope.insert("Ori", "Almog");
        $scope.insert("Ali", "Ardent");
        $scope.insert("Boris", "Bran");
    }
    
    $scope.wipe = function(){

        var query = "DELETE FROM contacts";
        $cordovaSQLite.execute(db, query).then(function(res){
           console.log("Deleted table");
        },function(err){
            console.log(err);
        });
    }

    $scope.add = function(){
        $scope.insert($scope.firstname, $scope.lastname);   
    }
    
    $scope.ref = function(){
        $scope.select(function(res){
            $scope.myData = [];

            for (var i = 0; i < res.rows.length; i++){
                $scope.myData.push([res.rows.item(i).firstname, res.rows.item(i).lastname]);
                console.log(res.rows.item(i).id);
            }
        });
    }
    
});

myModule.controller('listCtrl', function($scope){
   
    $scope.list = [
        "Events",
        "blank",
        "Find a product",
        "About"
        ];
});

//myModule.service('dbs', function($ionicPlatform, $cordovaSQLite){
//   
////    $ionicPlatform.ready(function() {
////      $cordovaPlugin.someFunction().then(success, error);
////    });
//    
//    
//    this.db = null;
//    
//    this.createTable = function() {
//        $ionicPlatform.ready(function() {//Maybe don't need this
//            var db = this.db;
//            var query = "CREATE TABLE IF NOT EXISTS contacts(ID INTEGER PRIMARY KEY ASC, firstname TEXT, lastname TEXT)";
//            
//            $cordovaSQLite.execute(db, query, []).then(function(res) {
//              console.log("Created table");
//            }, function (err) {
//              console.error(err);
//            });
//        });
//    };
//    
//    this.open = function(){
//        
//        $ionicPlatform.ready(function() {
//            this.db = $cordovaSQLite.openDB({name: "contacts.db"});//device
//            console.log("Opened table");
//        });
//    };
//    
//    this.add = function(firstname, lastname){
//        
//        var db = this.db;
//        var query = "INSERT INTO contacts(firstname, lastname) VALUES (?,?)";
//        
//        $ionicPlatform.ready(function() {
//            $cordovaSQLite.execute(db, query, [firstname, lastname]).then(function(res) {
//                console.log("insertId: " + res.insertId);
//            }, function (err) {
//                console.error(err);
//            });
//        });
//    };    
//});
//
//
//
//








