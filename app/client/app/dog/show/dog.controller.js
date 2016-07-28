'use strict';

(() => {

  class DogController {

    constructor($stateParams, DogService) {
      this.$stateParams = $stateParams;
      this.DogService = DogService;
      this.dog = {};
      this.pedigree = {};
      this.exhibitions = [];
      this.sports = [];
    }

    $onInit() {
      this.DogService.getDog(this.$stateParams.id)
        .then(dog => {
          this.dog = dog;
          this.dog.image = dog.images.filter(image => image.isPedigree)[0].src;
          this.exhibitions = this.getExhibitions(dog.exhibitions);
          this.sports = this.getSports(dog.sports);
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

    getSports(sports) {
      let dataArray = [];
      let resultObj = {
        ptExam: {
          name: 'PT Exam',
          data: []
        },
        ptCompetition: {
          name: 'PT Competition',
          data: []
        },
        obedienceFCI: {
          name: 'Obedience FCI',
          data: []
        },
        obedienceASCA: {
          name: 'Obedience ASCA',
          data: []
        },
        herdingSheep: {
          name: 'Herding Sheep',
          data: []
        }
      };

      sports.map(sport => {
        const type = sport ? sport.type : '';
        const subtype = sport ? sport.subtype : '';

        const id = sport ? sport._id : '';
        const name = sport ? sport.name : '';
        const location = sport && sport.location ? sport.location.city : '';
        const date = sport ? sport.date : '';
        const rank = sport ? sport.rank : '';
        const dogCount = sport && sport.dogs ? sport.dogs.length : 0;
        const judges = sport && sport.judges
          ? sport.judges.map(judge => { return {id: judge._id, name: judge.name} })
          : [];

        const dogResults = sport && sport.dogs
          ? sport.dogs.filter(results => results.dog._id === this.dog._id)[0]
          : [];
        const guide = dogResults && dogResults.guide
          ? { id: dogResults.guide._id, name: dogResults.guide.name }
          : {};
        const grade = dogResults ? dogResults.grade : '';
        const result = dogResults ? dogResults.result : '';
        const rating = dogResults ? dogResults.rating : '';
        const position = dogResults ? dogResults.position : '';
        const comments = dogResults ? dogResults.comments : '';
        const dataObj = { id, name, location, type, date, rank, judges, dogCount, guide, grade, result, rating, position, comments };

        if(type === 'PT' && subtype === 'Exam') resultObj.ptExam.data.push(dataObj);
        if(type === 'PT' && subtype === 'Competition') resultObj.ptCompetition.data.push(dataObj);
        if(type === 'Obedience' && subtype === 'FCI') resultObj.obedienceFCI.data.push(dataObj);
        if(type === 'Obedience' && subtype === 'ASCA') resultObj.obedienceASCA.data.push(dataObj);
        if(type === 'Herding Sheep') resultObj.herdingSheep.data.push(dataObj);
      });

      Object.keys(resultObj).forEach(key => dataArray.push(resultObj[key]));
      return dataArray;

    }
  }

  angular.module('dogzApp')
    .component('dog', {
      templateUrl: 'app/dog/show/dog.html',
      controller: DogController,
      controllerAs: 'vm'
    });
})();
