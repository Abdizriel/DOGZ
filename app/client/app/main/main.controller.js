'use strict';

(() => {

  class MainController {

    constructor($state) {
      this.$state = $state;
      this.fullName = '';
    }

    searchDog() {
      this.$state.go('dogs', {fullName: this.fullName});
    }

  }

  angular.module('dogzApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController,
      controllerAs: 'vm'
    });
})();
