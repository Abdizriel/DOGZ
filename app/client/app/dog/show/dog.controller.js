'use strict';

(() => {

  class DogController {

    constructor($stateParams, DogService) {
      this.$stateParams = $stateParams;
      this.DogService = DogService;
      this.dog = {};
      this.pedigree = {};
      this.exhibitions = [];
    }

    $onInit() {
      this.DogService.getDog(this.$stateParams.id)
        .then(dog => {
          this.dog = dog;
          this.dog.image = dog.images.filter(image => image.isPedigree)[0].src;
          this.exhibitions = this.getExhibitions(dog.exhibitions);
        })
        .then(() => this.DogService.getPedigree(this.$stateParams.id))
        .then(pedigree => {
          this.pedigree = pedigree;
        });
    }

    getExhibitions(exhibitions) {
      return exhibitions.map(exhibition => {
        const id = exhibition ? exhibition._id : '';
        const location = exhibition && exhibition.location ? exhibition.location.city : '';
        const type = exhibition ? exhibition.type : '';
        const date = exhibition ? exhibition.date : '';
        const judge = exhibition && exhibition.judge ? exhibition.judge.name : '';
        const dogResults = exhibition && exhibition.dogs
          ? exhibition.dogs.filter(results => results.dog._id === this.dog._id)[0]
          : [];
        const grade = dogResults ? dogResults.grade : '';
        const result = dogResults ? dogResults.result : '';
        const comments = dogResults ? dogResults.comments : '';
        return { id, location, type, date, judge, grade, result, comments };
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
