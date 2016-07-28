'use strict';

angular.module('dogzApp')
  .config($stateProvider => {
    $stateProvider.state('dogs', {
      url: '/dogs',
      params: {
        fullName: null
      },
      template: '<dogs></dogs>'
    });
  });
