'use strict';

angular.module('hydrox.main_view', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main_view', {
    templateUrl: '/main_view.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [function() {

}]);