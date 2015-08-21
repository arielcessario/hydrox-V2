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
        vm.ypos = 0;

        vm.posicion = 0;
        vm.ypos_ant = 0;
        vm.ypos_act = 0;
        vm.dif = 0;

        var velocity = 0;
        var timestamp = 0;
        var frame = 0;
        var amplitude = 0;
        var timeConstant = 325;
        var ticker = 0;


        vm.selectImage = function (img) {
            vm.img = img;
        };


        function track() {
            var now, elapsed, delta, v;

            now = Date.now();
            elapsed = now - timestamp;
            timestamp = now;
            delta = vm.posicion - frame;
            frame = vm.posicion;

            v = 1000 * delta / (1 + elapsed);
            //console.log(delta);
            velocity = 0.8 * v + 0.2 * velocity;
        }

        function autoScroll() {
            var elapsed, delta;
            if (amplitude) {
                elapsed = Date.now() - timestamp;
                delta = -amplitude * Math.exp(-elapsed / timeConstant);
                if (delta > 0.5 || delta < -0.5) {
                    scroll(vm.posicion + delta);
                    requestAnimationFrame(autoScroll);
                } else {
                    scroll(vm.posicion);
                }
            }
        }

        function resetY() {

            vm.ypos_ant = 0;
            vm.ypos_act = 0;
            vm.dif = 0;


            clearInterval(ticker);
            if (velocity > 10 || velocity < -10) {
                amplitude = 0.8 * velocity;
                vm.posicion = Math.round(vm.posicion + amplitude);
                timestamp = Date.now();
                requestAnimationFrame(autoScroll);
            }
        }

        function newY(valor) {
            vm.ypos_ant = valor;
            vm.ypos_act = valor;
            vm.dif = 0;

            frame = vm.posicion;
            timestamp = Date.now();
            clearInterval(ticker);
            ticker = setInterval(track, 100);
        }

        function scroll(nuevo) {
            //
            //console.log(nuevo);
            console.log(vm.ypos_ant);
            console.log(vm.ypos_act);
            //console.log(vm.dif);
            console.log(vm.posicion);
            console.log('---------');


            if(vm.ypos_act != nuevo){

                vm.ypos_ant = parseFloat(vm.ypos_act);
                vm.ypos_act = nuevo;
                vm.dif = vm.ypos_ant - nuevo;


                if(vm.dif + vm.posicion != (nuevo * -1)){

                    vm.posicion =  vm.dif + vm.posicion;
                }
                //if(vm.posicion < 0){vm.posicion= 0}
            }
            //console.log(vm.ypos_ant);
            $scope.$apply();

        }

        document.addEventListener('touchstart', function (e) {
            //e.preventDefault();

            var touches = e.changedTouches;

            newY(touches[0].pageY);
            e.preventDefault();
            e.stopPropagation();
            return false;
            //scroll(touches[0].pageY);
            //e.stopPropagation();
        }, false);

        document.addEventListener('touchmove', function (e) {
            //e.preventDefault();
            var touches = e.changedTouches;
            scroll(touches[0].pageY);


            //e.stopPropagation();
        }, false);

        document.addEventListener('touchend', function (e) {
            //e.preventDefault();
            //window.pageYOffset = window.pageYOffset +
            var touches = e.changedTouches;
            //scroll(touches[0].pageY);
            resetY();
            e.preventDefault();
            e.stopPropagation();
            return false;
            //e.stopPropagation();
        }, false);

        document.addEventListener('scroll', function () {

            //animate();
            //requestAnimationFrame(animate);
            //console.log(window.pageYOffset);


            vm.ypos = window.pageYOffset;


            if ((window.pageYOffset > 5000 && window.pageYOffset < 9900) && vm.seccion != 'seccion-02') {
                //console.log('entra');
                vm.seccion = 'seccion-02';
                vm.img = 'zapa_neoprene_01.gif';

            }

            if (parseInt(window.pageYOffset) > 10000 && vm.seccion != 'seccion-02') {
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

