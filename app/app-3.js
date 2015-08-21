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


    MainController.$inject = ['$scope', '$interval'];
    function MainController($scope, $interval) {

        var s = skrollr.init();
        var vm = this;

        vm.seccion = 'seccion-01';
        vm.img = '';
        vm.ypos = 0;

        var view = document;

        var velocity = 0;
        var max = parseInt(view.body.scrollHeight, 10) - innerHeight;
        var offset = 0;
        var min = 0;
        var pressed = false;
        var indicator = document.getElementById('indicator');
        var relative = (innerHeight - 30) / max;

        var reference = 0;
        var amplitude = 0;
        var frame = 0;
        var timestamp = 0;
        var target = 0;
        var ticker = {};
        var timeConstant = 50;
        var delta = 0;


        var xform = 'transform';
        //['webkit', 'Moz', 'O', 'ms'].every(function (prefix) {
        //    var e = prefix + 'Transform';
        //    if (typeof view.style[e] !== 'undefined') {
        //        xform = e;
        //        return false;
        //    }
        //    return true;
        //});


        vm.selectImage = function (img) {
            vm.img = img;
        };


        if (typeof window.ontouchstart !== 'undefined') {
            view.addEventListener('touchstart', tap);
            view.addEventListener('touchmove', drag);
            view.addEventListener('touchend', release);
        }
        view.addEventListener('mousedown', tap);
        view.addEventListener('mousemove', drag);
        view.addEventListener('mouseup', release);


        function ypos(e) {
            // touch event
            if (e.targetTouches && (e.targetTouches.length >= 1)) {
                return e.targetTouches[0].clientY;
            }

            // mouse event
            return e.clientY;
        }

        function scroll(y) {

            //
            //console.log(offset);
            //console.log(delta);
            //console.log('------');


            offset = (y + offset > 0) ? y + offset : 0;
            vm.ypos = offset;

            var el = {};
            var porc = 0;
            if (offset > 0 && offset < 5000) {
                el = angular.element(document.querySelector('#seccion-01'));

                porc = offset * 100 / 5000;
                el.css('transform','translate3d('+porc+' %, 0 %, 0)');

            }
            if (offset > 5000 && offset < 10000) {
                porc = (offset - 5000) * 100 / 5000;
                el = document.getElementById('seccion-02');
                el.css('transform','translate3d('+porc+' %, 0 %, 0)');

            }
            //transform:;

            $scope.$apply();

            //offset = (y > max) ? max : (y < min) ? min : y;
            //view.style[xform] = 'translateY(' + (-offset) + 'px)';
            //indicator.style[xform] = 'translateY(' + (offset * relative) + 'px)';
        }

        function tap(e) {
            pressed = true;
            reference = ypos(e);

            velocity = amplitude = 0;
            frame = offset;
            timestamp = Date.now();
            clearInterval(ticker);
            ticker = $interval(track, 100);

            //console.log(frame);


            e.preventDefault();
            e.stopPropagation();
            return false;
        }


        function release(e) {
            pressed = false;

            $interval.cancel(ticker);

            if (velocity > 10 || velocity < -10) {
                amplitude = 0.8 * velocity;
                target = Math.round(offset + amplitude);
                timestamp = Date.now();
                requestAnimationFrame(autoScroll);
            }

            e.preventDefault();
            e.stopPropagation();
            return false;
        }

        function drag(e) {
            var y;
            if (pressed) {
                y = ypos(e);
                delta = reference - y;
                if (delta > 2 || delta < -2) {
                    reference = y;
                    //scroll(offset + delta);
                    scroll(delta);
                }
            }


            e.preventDefault();
            e.stopPropagation();
            return false;
        }

        function track() {
            var now, elapsed, v;

            now = Date.now();
            elapsed = now - timestamp;
            timestamp = now;
            //delta = offset - frame;
            frame = offset;

            v = 1000 * delta / (1 + elapsed);
            velocity = 0.8 * v + 0.2 * velocity;


        }

        function autoScroll() {
            var elapsed;
            if (amplitude) {
                elapsed = Date.now() - timestamp;
                delta = -1 * -amplitude * Math.exp(-elapsed / timeConstant);
                //console.log('lslsls' + delta);


                if (delta > 0.5 || delta < -0.5) {
                    //scroll(target + delta);
                    scroll(delta);
                    requestAnimationFrame(autoScroll);
                } else {
                    //scroll(target);
                    scroll(delta);
                }
            }
        }


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

