 var app = angular.module( 'funAnalysisApp', [ 'ngMaterial' ] )
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
  
});
 
 var CrawlerController = function($scope) {
     
     var socket = io.connect();
     $scope.errors = [];
     
     socket.on('percentage', function(data) {
         console.log(data);
          $scope.percentage = data;
          $scope.$apply();
     });
     
     socket.on('error', function(data) {
         $scope.errors.push(data);
           $scope.$apply();
     });
 }
            
app.controller("CrawlerController", CrawlerController );