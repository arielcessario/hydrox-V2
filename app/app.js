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

        //The options (second parameter) are all optional. The values shown are the default values.
        skrollr.menu.init(s, {
            //skrollr will smoothly animate to the new position using `animateTo`.
            animate: true,

            //The easing function to use.
            easing: 'sqrt',

            //Multiply your data-[offset] values so they match those set in skrollr.init
            scale: 2,

            //How long the animation should take in ms.
            duration: function (currentTop, targetTop) {
                //By default, the duration is hardcoded at 500ms.
                return 500;

                //But you could calculate a value based on the current scroll position (`currentTop`) and the target scroll position (`targetTop`).
                //return Math.abs(currentTop - targetTop) * 10;
            },

            //If you pass a handleLink function you'll disable `data-menu-top` and `data-menu-offset`.
            //You are in control where skrollr will scroll to. You get the clicked link as a parameter and are expected to return a number.
            //handleLink: function(link) {
            //    return 400;//Hardcoding 400 doesn't make much sense.
            //},

            //By default skrollr-menu will only react to links whose href attribute contains a hash and nothing more, e.g. `href="#foo"`.
            //If you enable `complexLinks`, skrollr-menu also reacts to absolute and relative URLs which have a hash part.
            //The following will all work (if the user is on the correct page):
            //http://example.com/currentPage/#foo
            //http://example.com/currentDir/currentPage.html?foo=bar#foo
            ///?foo=bar#foo
            complexLinks: false,

            //This event is triggered right before we jump/animate to a new hash.
            change: function (newHash, newTopPosition) {
                //Do stuff
            },

            //Add hash link (e.g. `#foo`) to URL or not.
            updateUrl: false //defaults to `true`.
        });


        var vm = this;

        vm.seccion = 'seccion-01';
        vm.img = '';
        vm.ypos = 0;
        vm.goToPage = goToPage;

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
        var timeConstant = 200;
        var delta = 0;


        var xform = 'transform';


        var el01 = angular.element(document.querySelector('#seccion-01'));
        var el02 = angular.element(document.querySelector('#seccion-02'));
        var el03 = angular.element(document.querySelector('#seccion-03'));
        var el04 = angular.element(document.querySelector('#seccion-04'));
        var el05 = angular.element(document.querySelector('#seccion-05'));
        var el06 = angular.element(document.querySelector('#seccion-06'));
        var el07 = angular.element(document.querySelector('#seccion-07'));
        var el08 = angular.element(document.querySelector('#seccion-08'));
        var el09 = angular.element(document.querySelector('#seccion-09'));
        var el10 = angular.element(document.querySelector('#seccion-10'));
        var el11 = angular.element(document.querySelector('#seccion-11'));
        var el12 = angular.element(document.querySelector('#seccion-12'));
        var el13 = angular.element(document.querySelector('#seccion-13'));


        function goToPage() {

            vm.seccion = 'seccion-02';
            vm.img = 'zapa_neoprene_01.gif';
        }


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


            var position01 = el01[0].style.transform.replace('translate3d(', '').replace(', 0%, 0px)', '');
            var position02 = el02[0].style.transform.replace('translate3d(', '').replace(', 0%, 0px)', '');
            var position03 = el03[0].style.transform.replace('translate3d(', '').replace(', 0%, 0px)', '');
            var position04 = el04[0].style.transform.replace('translate3d(', '').replace(', 0%, 0px)', '');
            var position05 = el05[0].style.transform.replace('translate3d(', '').replace(', 0%, 0px)', '');
            var position06 = el06[0].style.transform.replace('translate3d(', '').replace(', 0%, 0px)', '');
            var position07 = el07[0].style.transform.replace('translate3d(', '').replace(', 0%, 0px)', '');
            var position08 = el08[0].style.transform.replace('translate3d(', '').replace(', 0%, 0px)', '');
            var position09 = el09[0].style.transform.replace('translate3d(', '').replace(', 0%, 0px)', '');
            var position10 = el10[0].style.transform.replace('translate3d(', '').replace(', 0%, 0px)', '');
            var position11 = el11[0].style.transform.replace('translate3d(', '').replace(', 0%, 0px)', '');
            var position12 = el12[0].style.transform.replace('translate3d(', '').replace(', 0%, 0px)', '');
            var position13 = el13[0].style.transform.replace('translate3d(', '').replace(', 0%, 0px)', '');

            vm.ypos = position02;

            if (parseFloat(position01) < 20 && parseFloat(position01) > -99) {
                //console.log('true');
            } else {
                //console.log('false');

            }


            if (parseFloat(position02) < 20 && parseFloat(position02) > -99) {
                console.log(position02);
                vm.seccion = 'seccion-02';
                vm.img = 'zapa_neoprene_01.gif';
            }

            if (parseFloat(position03) < 20 && parseFloat(position03) > -99) {
                console.log(position03);
                vm.seccion = 'seccion-03';
                vm.img = 'zapa_neoprene_01.gif';
            }
            
            if (parseFloat(position04) < 20 && parseFloat(position04) > -99) {
                console.log(position04);
                vm.seccion = 'seccion-04';
                vm.img = 'zapa_neoprene_01.gif';
            }
            
            if (parseFloat(position05) < 20 && parseFloat(position05) > -99) {
                console.log(position05);
                vm.seccion = 'seccion-05';
                vm.img = 'zapa_neoprene_01.gif';
            }
            
            if (parseFloat(position06) < 20 && parseFloat(position06) > -99) {
                console.log(position06);
                vm.seccion = 'seccion-06';
                vm.img = 'zapa_neoprene_01.gif';
            }
            
            if (parseFloat(position07) < 20 && parseFloat(position07) > -99) {
                console.log(position07);
                vm.seccion = 'seccion-07';
                vm.img = 'zapa_neoprene_01.gif';
            }
            
            if (parseFloat(position08) < 20 && parseFloat(position08) > -99) {
                console.log(position08);
                vm.seccion = 'seccion-08';
                vm.img = 'zapa_neoprene_01.gif';
            }
            
            if (parseFloat(position09) < 20 && parseFloat(position09) > -99) {
                console.log(position09);
                vm.seccion = 'seccion-09';
                vm.img = 'zapa_neoprene_01.gif';
            }
            
            if (parseFloat(position10) < 20 && parseFloat(position10) > -99) {
                console.log(position10);
                vm.seccion = 'seccion-10';
                vm.img = 'zapa_neoprene_01.gif';
            }
            
            if (parseFloat(position11) < 20 && parseFloat(position11) > -99) {
                console.log(position11);
                vm.seccion = 'seccion-11';
                vm.img = 'zapa_neoprene_01.gif';
            }
            
            if (parseFloat(position12) < 20 && parseFloat(position12) > -99) {
                console.log(position12);
                vm.seccion = 'seccion-12';
                vm.img = 'zapa_neoprene_01.gif';
            }
            
            if (parseFloat(position13) < 20 && parseFloat(position13) > -99) {
                console.log(position13);
                vm.seccion = 'seccion-13';
                vm.img = 'zapa_neoprene_01.gif';
            }
            
            //console.log(position01);
            //console.log(position02);

            //$scope.$apply();
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


        document.addEventListener('scroll', function () {

            //animate();
            //requestAnimationFrame(animate);
            //console.log(window.pageYOffset);


            vm.ypos = window.pageYOffset;


            if ((window.pageYOffset > 1000 && window.pageYOffset < 2200) && vm.seccion != 'seccion-02') {
                //console.log('entra');
                vm.seccion = 'seccion-02';
                vm.img = 'zapa_neoprene_01.gif';

            }

            if ((window.pageYOffset > 2000 && window.pageYOffset < 3200) && vm.seccion != 'seccion-03') {
                //console.log('entra');
                vm.seccion = 'seccion-03';
                vm.img = 'zapa_neoprene_01.gif';
                //$scope.$apply();
            }


            if ((window.pageYOffset > 3000 && window.pageYOffset < 4200) && vm.seccion != 'seccion-04') {
                //console.log('entra');
                vm.seccion = 'seccion-04';
                vm.img = 'zapa_neoprene_01.gif';
                //$scope.$apply();
            }


            if ((window.pageYOffset > 4000 && window.pageYOffset < 5200) && vm.seccion != 'seccion-05') {
                //console.log('entra');
                vm.seccion = 'seccion-05';
                vm.img = 'zapa_neoprene_01.gif';
                //$scope.$apply();
            }
            if ((window.pageYOffset > 5000 && window.pageYOffset < 6200) && vm.seccion != 'seccion-06') {
                //console.log('entra');
                vm.seccion = 'seccion-06';
                vm.img = 'zapa_neoprene_01.gif';
                //$scope.$apply();
            }
            if ((window.pageYOffset > 6000 && window.pageYOffset < 7200) && vm.seccion != 'seccion-07') {
                //console.log('entra');
                vm.seccion = 'seccion-07';
                vm.img = 'zapa_neoprene_01.gif';
                //$scope.$apply();
            }
            if ((window.pageYOffset > 7000 && window.pageYOffset < 8200) && vm.seccion != 'seccion-08') {
                //console.log('entra');
                vm.seccion = 'seccion-08';
                vm.img = 'zapa_neoprene_01.gif';
                //$scope.$apply();
            }
            if ((window.pageYOffset > 8000 && window.pageYOffset < 9200) && vm.seccion != 'seccion-09') {
                //console.log('entra');
                vm.seccion = 'seccion-09';
                vm.img = 'zapa_neoprene_01.gif';
                //$scope.$apply();
            }
            if ((window.pageYOffset > 9000 && window.pageYOffset < 10200) && vm.seccion != 'seccion-10') {
                //console.log('entra');
                vm.seccion = 'seccion-10';
                vm.img = 'zapa_neoprene_' +
                    '01.gif';
                //$scope.$apply();
            }
            if ((window.pageYOffset > 10000 && window.pageYOffset < 11200) && vm.seccion != 'seccion-11') {
                //console.log('entra');
                vm.seccion = 'seccion-11';
                vm.img = 'zapa_neoprene_01.gif';
                //$scope.$apply();
            }
            if ((window.pageYOffset > 11000 && window.pageYOffset < 12200) && vm.seccion != 'seccion-12') {
                //console.log('entra');
                vm.seccion = 'seccion-12';
                vm.img = 'zapa_neoprene_01.gif';
                //$scope.$apply();
            }
            if ((window.pageYOffset > 12000 && window.pageYOffset < 13200) && vm.seccion != 'seccion-13') {
                //console.log('entra');
                vm.seccion = 'seccion-13';
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

