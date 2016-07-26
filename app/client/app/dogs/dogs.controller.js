'use strict';

(() => {

  class DogsController {

    constructor($http, $scope, socket, DogService) {
      this.$http = $http;
      this.socket = socket;
      this.DogService = DogService;
      this.dogs = [];

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('dog');
      });
    }

    $onInit() {
      this.DogService.getDogs()
        .then(dogs => {
          this.dogs = dogs;
          this.socket.syncUpdates('dog', this.dogs);
        });
    }
  }

  angular.module('dogzApp')
    .component('dogs', {
      templateUrl: 'app/dogs/dogs.html',
      controller: DogsController,
      controllerAs: 'vm'
    });
})();
