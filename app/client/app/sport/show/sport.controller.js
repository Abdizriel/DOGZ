'use strict';

(() => {

  class SportController {

    constructor($stateParams, $scope, socket, SportService) {
      this.socket = socket;
      this.$stateParams = $stateParams;
      this.SportService = SportService;
      this.sport = {};

      $scope.$on('$destroy', () => {
        socket.unsyncUpdates('sport');
      });
    }

    $onInit() {
      this.SportService.getSport(this.$stateParams.id)
        .then(sport => {
          this.sport = sport;
          this.socket.syncUpdates('sport', this.sport);
        });
    }
  }

  angular.module('dogzApp')
    .component('sport', {
      templateUrl: 'app/sport/show/sport.html',
      controller: SportController,
      controllerAs: 'vm'
    });
})();
