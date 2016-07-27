'use strict';

angular.module('dogzApp')
  .config($stateProvider => {
    $stateProvider.state('kennel', {
      url: '/kennels/:id',
      template: '<kennel></kennel>'
    });
  });
