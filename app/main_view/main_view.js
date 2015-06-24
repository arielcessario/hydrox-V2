(function(){

    'use strict';
    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length-1].src;

    angular.module('hydrox.main_view', ['ngRoute'])

        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/main_view', {
                templateUrl: currentScriptPath.replace('js','html'),
                controller: 'MainViewCtrl'
            });
        }])

        .controller('MainViewCtrl', MainViewCtrl);

    MainViewCtrl.$inject = ['$window'];
    function MainViewCtrl($window){
        var vm = this;
        //vm.wHeight = $window.pageYOffset;
        //console.log(vm.wHeight);


    }

})();


