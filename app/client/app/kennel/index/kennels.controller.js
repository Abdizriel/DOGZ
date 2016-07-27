'use strict';

(() => {

  class KennelsController {

    constructor($scope, socket, KennelService) {
      this.socket = socket;
      this.KennelService = KennelService;
      this.kennels = [];

      $scope.$on('$destroy', () => {
        socket.unsyncUpdates('kennel');
      });
    }

    $onInit() {
      this.KennelService.getKennels()
        .then(kennels => {
          this.kennels = kennels;
          this.socket.syncUpdates('kennel', this.kennels);
        });
    }
  }

  angular.module('dogzApp')
    .component('kennels', {
      templateUrl: 'app/kennel/index/kennels.html',
      controller: KennelsController,
      controllerAs: 'vm'
    });
})();
