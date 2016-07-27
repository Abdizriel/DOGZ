'use strict';

(() => {

  class DogController {

    constructor($stateParams, DogService) {
      this.$stateParams = $stateParams;
      this.DogService = DogService;
      this.dog = [];
    }

    $onInit() {
      this.DogService.getDog(this.$stateParams.id)
        .then(dog => {
          this.dog = dog;
        });
    }
  }

  angular.module('dogzApp')
    .component('dog', {
      templateUrl: 'app/dog/show/dog.html',
      controller: DogController,
      controllerAs: 'vm'
    });
})();
