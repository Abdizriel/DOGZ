'use strict';

angular.module('dogzApp')
  .config($stateProvider => {
    $stateProvider.state('dog', {
      url: '/dogs',
      template: '<dog></dog>'
    });
  });
