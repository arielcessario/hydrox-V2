'use strict';

// Declare app level module which depends on views, and components
angular.module('hydrox', [
  'ngRoute',
  'hydrox.main_view'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/main_view'});
}]);
