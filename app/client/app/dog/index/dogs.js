'use strict';

angular.module('dogzApp')
  .config($stateProvider => {
    $stateProvider.state('dogs', {
      url: '/dogs',
      template: '<dogs></dogs>'
    });
  });
