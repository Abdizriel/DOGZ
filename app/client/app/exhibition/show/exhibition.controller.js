'use strict';

(() => {

  class ExhibitionController {

    constructor($stateParams, $scope, socket, ExhibitionService) {
      this.socket = socket;
      this.$stateParams = $stateParams;
      this.ExhibitionService = ExhibitionService;
      this.exhibition = {};

      $scope.$on('$destroy', () => {
        socket.unsyncUpdates('exhibition');
      });
    }

    $onInit() {
      this.ExhibitionService.getExhibition(this.$stateParams.id)
        .then(exhibition => {
          this.exhibition = exhibition;
          console.log(exhibition);
          this.socket.syncUpdates('exhibition', this.exhibition);
        });
    }
  }

  angular.module('dogzApp')
    .component('exhibition', {
      templateUrl: 'app/exhibition/show/exhibition.html',
      controller: ExhibitionController,
      controllerAs: 'vm'
    });
})();
