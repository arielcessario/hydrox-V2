'use strict';

describe('myApp.main_view module', function() {

  beforeEach(module('myApp.view1'));

  describe('main_view controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var view1Ctrl = $controller('View1Ctrl');
      expect(view1Ctrl).toBeDefined();
    }));

  });
});