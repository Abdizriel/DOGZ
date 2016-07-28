'use strict';

angular.module('dogzApp')
  .config($stateProvider => {
    $stateProvider.state('exhibitions', {
      url: '/exhibitions',
      template: '<exhibitions></exhibitions>'
    });
  });
