'use strict';

angular.module('dogzApp.auth', ['dogzApp.constants', 'dogzApp.util', 'ngCookies', 'ui.router'])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
