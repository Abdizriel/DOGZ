'use strict';

angular.module('dogzApp')
  .config($stateProvider => {
    $stateProvider.state('exhibition', {
      url: '/exhibitions/:id',
      template: '<exhibition></exhibition>'
    });
  });
