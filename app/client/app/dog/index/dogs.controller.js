'use strict';

(() => {

  class DogsController {

    constructor($scope, $stateParams, socket, DogService) {
      this.$stateParams = $stateParams;
      this.socket = socket;
      this.DogService = DogService;
      this.dogs = [];
      this.filterDog = {};
      if($stateParams.fullName) this.filterDog.fullName = $stateParams.fullName;

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
