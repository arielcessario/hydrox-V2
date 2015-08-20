(function () {
    'use strict';


// Declare app level module which depends on views, and components
    angular.module('hydrox', [
        'ngRoute',
        'ngAnimate',
        'hydrox.main_view'
    ])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.otherwise({redirectTo: '/main_view'});
        }])
        .controller('MainController', MainController);


    MainController.$inject = ['$scope'];
    function MainController($scope) {

        var s = skrollr.init();
        var vm = this;

        vm.seccion = 'seccion-01';
        vm.img = '';
        vm.xpos = 0;



        vm.selectImage = function (img) {
            vm.img = img;
        };

        document.addEventListener('touchstart', function(e) {
            //e.preventDefault();

            var touches = e.changedTouches;
            for (var i = 0; i < touches.length; i++) {
                console.log(touches[i].pageX);
            }
            $scope.$apply();
            //e.stopPropagation();
        });

        document.addEventListener('touchmove', function(e) {
            //e.preventDefault();
            $scope.$apply();
            //e.stopPropagation();
        });

        document.addEventListener('touchend', function(e) {
            //e.preventDefault();
            window.pageYOffset = window.pageYOffset +
            $scope.$apply();
            //e.stopPropagation();
        });

        document.addEventListener('scroll', function () {

            //animate();
            //requestAnimationFrame(animate);
            //console.log(window.pageYOffset);


            vm.xpos = window.pageYOffset;



            if((window.pageYOffset > 5000 && window.pageYOffset < 9900)  && vm.seccion != 'seccion-02'){
                //console.log('entra');
                vm.seccion = 'seccion-02';
                vm.img = 'zapa_neoprene_01.gif';

            }

            if(parseInt(window.pageYOffset) > 10000 && vm.seccion != 'seccion-02'){
                //console.log('entra');
                vm.seccion = 'seccion-03';
                vm.img = 'zapa_neoprene_01.gif';
                //$scope.$apply();
            }
            //showPosition();
            //
            //function showPosition(){
            //    console.log('top: ' + window.pageYOffset);
            //    console.log('bottom: ' + (window.pageYOffset + window.innerHeight));
            //}
            $scope.$apply();
        }, false);


    }

    // Implementa request animate dependiendo del explorador
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();




})();

