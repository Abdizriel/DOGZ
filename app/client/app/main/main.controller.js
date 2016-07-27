'use strict';

(function() {

  class MainController {

    constructor($scope, socket) {
      this.socket = socket;

      // $scope.$on('$destroy', function() {
      //   socket.unsyncUpdates('thing');
      // });
    }

    $onInit() {

    }

  }

  angular.module('dogzApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
