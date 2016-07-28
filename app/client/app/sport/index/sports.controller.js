'use strict';

(() => {

  class SportsController {

    constructor($scope, socket, SportService) {
      this.socket = socket;
      this.SportService = SportService;
      this.sports = [];

      $scope.$on('$destroy', () => {
        socket.unsyncUpdates('sport');
      });
    }

    $onInit() {
      this.SportService.getSports()
        .then(sports => {
          this.sports = sports;
          this.socket.syncUpdates('sport', this.sports);
        });
    }
  }

  angular.module('dogzApp')
    .component('sports', {
      templateUrl: 'app/sport/index/sports.html',
      controller: SportsController,
      controllerAs: 'vm'
    });
})();
