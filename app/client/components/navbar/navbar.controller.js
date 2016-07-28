'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    title: 'Dogs',
    state: 'dogs'
  }, {
    title: 'Kennels',
    state: 'kennels'
  }, {
    title: 'Exhibitions',
    state: 'exhibitions'
  }, {
    title: 'Sports',
    state: 'sports'
  }];
  //end-non-standard
  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }

}

angular.module('dogzApp')
  .controller('NavbarController', NavbarController);
