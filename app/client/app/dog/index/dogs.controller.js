'use strict';

(() => {

  class DogsController {

    constructor($scope, socket, DogService) {
      this.socket = socket;
      this.DogService = DogService;
      this.dogs = [];

      $scope.$on('$destroy', () => {
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
      templateUrl: 'app/dog/index/dogs.html',
      controller: DogsController,
      controllerAs: 'vm'
    });
})();
