'use strict';

angular.module('dogzApp')
  .config($stateProvider => {
    $stateProvider.state('sport', {
      url: '/sports/:id',
      template: '<sport></sport>'
    });
  });
