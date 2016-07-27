'use strict';

(() => {

  class DogController {

    constructor($stateParams, DogService) {
      this.$stateParams = $stateParams;
      this.DogService = DogService;
      this.dog = {};
      this.pedigree = {};
    }

    $onInit() {
      this.DogService.getDog(this.$stateParams.id)
        .then(dog => {
          this.dog = dog;
          this.dog.image = dog.images.filter(image => image.isPedigree)[0].src
        })
        .then(() => this.DogService.getPedigree(this.$stateParams.id))
        .then(pedigree => {
          this.pedigree = pedigree;
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
