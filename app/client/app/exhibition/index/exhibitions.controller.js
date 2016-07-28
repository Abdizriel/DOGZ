'use strict';

(() => {

  class ExhibitionsController {

    constructor($scope, socket, ExhibitionService) {
      this.socket = socket;
      this.ExhibitionService = ExhibitionService;
      this.exhibitions = [];

      $scope.$on('$destroy', () => {
        socket.unsyncUpdates('exhibition');
      });
    }

    $onInit() {
      this.ExhibitionService.getExhibitions()
        .then(exhibitions => {
          this.exhibitions = exhibitions;
          this.socket.syncUpdates('exhibition', this.exhibitions);
        });
    }
  }

  angular.module('dogzApp')
    .component('exhibitions', {
      templateUrl: 'app/exhibition/index/exhibitions.html',
      controller: ExhibitionsController,
      controllerAs: 'vm'
    });
})();
