'use strict';

angular.module('dogzApp')
  .config($stateProvider => {
    $stateProvider.state('kennels', {
      url: '/kennels',
      template: '<kennels></kennels>'
    });
  });
