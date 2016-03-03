'use strict';

describe('Controller: MapcontrolsCtrl', function () {

  // load the controller's module
  beforeEach(module('transportApp'));

  var MapcontrolsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MapcontrolsCtrl = $controller('MapcontrolsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MapcontrolsCtrl.awesomeThings.length).toBe(3);
  });
});
