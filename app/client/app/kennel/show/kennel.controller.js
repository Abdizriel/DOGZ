'use strict';

(() => {

  class KennelController {

    constructor($stateParams, $scope, socket, KennelService) {
      this.socket = socket;
      this.$stateParams = $stateParams;
      this.KennelService = KennelService;
      this.kennel = {};

      $scope.$on('$destroy', () => {
        socket.unsyncUpdates('kennel');
      });
    }

    $onInit() {
      this.KennelService.getKennel(this.$stateParams.id)
        .then(kennel => {
          this.kennel = kennel;
          this.socket.syncUpdates('kennel', this.kennel);
        });
    }
  }

  angular.module('dogzApp')
    .component('kennel', {
      templateUrl: 'app/kennel/show/kennel.html',
      controller: KennelController,
      controllerAs: 'vm'
    });
})();
