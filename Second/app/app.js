'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
  'ngAnimate', 
  'ngRoute',
  'ngSanitize',
  'ui.bootstrap',
  'ngTable',
  'TweetModule'
]).
config(['$routeProvider', '$locationProvider', function($routeProvider ,$locationProvider) {
 // use the HTML5 History API
 //$locationProvider.html5Mode(true);
        
  $routeProvider.when('/home', {
    templateUrl: 'views/Home.html',
    controller: 'HomeController'
  });

  $routeProvider.otherwise({ redirectTo: '/home' });
}]);
