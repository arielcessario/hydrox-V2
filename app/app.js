(function () {
    'use strict';

// Declare app level module which depends on views, and components
    angular.module('hydrox', [
        'ngRoute',
        'hydrox.main_view'
    ])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.otherwise({redirectTo: '/main_view'});
        }])
        .controller('MainController', MainController)
        .directive("scroll", Scroll);


    function MainController() {


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


    //Function Scroll - Detecta el movimiento de scroll y actua en consecuencia
    function Scroll($window) {
        requestAnimFrame(Scroll);
        return ScrollAnimate();
    }

    function ScrollAnimate() {
        return {

            restrict: 'A',
            link: function (scope, element, attrs) {
                var startX = 0, startY = 0, x = 0, y = 0;
                element.on('scroll', function (event) {
                    console.log(event);
                    //console.log(eve1nt.target.scrollLeft);
                    //startX = event.pageX - x;
                    //startY = event.pageY - y;
                    //
                    //console.log(event);
                    scope.$apply();


                });

                element.on('mousewheel', function (event) {

                    //console.log(event);
                    //console.log(event.target.scrollLeft);

                    element[0].scrollLeft = element[0].scrollLeft + event.deltaY;
                    scope.$apply();
                });


                element.on('ondrag', function (event) {

                    console.log(event);
                    //console.log(event.target.scrollLeft);

                    //console.log(element[0].scrollLeft);
                    //element[0].scrollLeft = element[0].scrollLeft + event.deltaY;
                    //scope.$apply();
                });
                //element.on('mousedown', function(event) {
                //    // Prevent default dragging of selected content
                //    event.preventDefault();
                //    console.log(event);
                //    //startX = event.pageX - x;
                //    //startY = event.pageY - y;
                //    //$document.on('mousemove', mousemove);
                //    //$document.on('mouseup', mouseup);
                //});
                //
                //function mousemove(event) {
                //    y = event.pageY - startY;
                //    x = event.pageX - startX;
                //    element.css({
                //        top: y + 'px',
                //        left:  x + 'px'
                //    });
                //}
                //
                //function mouseup() {
                //    $document.off('mousemove', mousemove);
                //    $document.off('mouseup', mouseup);
                //}
            }
        }
    }

})();

