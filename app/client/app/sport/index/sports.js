'use strict';

angular.module('dogzApp')
  .config($stateProvider => {
    $stateProvider.state('sports', {
      url: '/sports',
      template: '<sports></sports>'
    });
  });
