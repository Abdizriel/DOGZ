'use strict';

(() => {

  class DogController {

    constructor($http, $scope, socket) {
      this.$http = $http;
      this.socket = socket;
      this.dogs = [];

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('dog');
      });
    }

    $onInit() {
      this.$http.get('/api/dogs')
        .then(({data}) => {
          this.dogs = data;
          this.socket.syncUpdates('dog', this.dogs);
        });
    }
  }

  angular.module('dogzApp')
    .component('dog', {
      templateUrl: 'app/dog/dog.html',
      controller: DogController
    });
})();
