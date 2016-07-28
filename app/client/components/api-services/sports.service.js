'use strict';

angular
  .module('dogzApp')
  .factory('SportService', SportService);

SportService.$inject = ['$http', 'APIUtilService'];

/**
 * Create a Sport API Service.
 * @function SportService
 * @param {Object} $http - Angular service that facilitates communication with the remote HTTP
 * @param {Object} APIUtilService - API Utility services
 * @returns {Object} service - All API Sport services
 */
function SportService($http, APIUtilService) {

  // Service base url
  const urlBase = '/api/sports';
  const { handleSuccess, handleError } = APIUtilService;

  // Service list
  let service = {};

  service.getSports = getSports;
  service.getSport = getSport;
  service.createSport = createSport;
  service.updateSport = updateSport;
  service.deleteSport = deleteSport;

  return service;

  /**
   * Gets all sports from BE.
   * @function getSports
   * @returns {Promise}
   */
  function getSports () {
    return $http.get(urlBase)
      .then(handleSuccess)
      .catch(handleError);
  }

  /**
   * Get single sport by id from BE.
   * @function getSport
   * @param {String} id - Sport ID
   * @returns {Promise}
   */
  function getSport (id) {
    return $http.get(urlBase + '/' + id)
      .then(handleSuccess)
      .catch(handleError);
  }

  /**
   * Send new sport data to BE.
   * @function getSport
   * @param {Object} sport - New sport data
   * @returns {Promise}
   */
  function createSport (sport) {
    return $http.post(urlBase, sport)
      .then(handleSuccess)
      .catch(handleError);
  }

  /**
   * Send updated sport data to BE.
   * @function getSport
   * @param {Object} sport - Updated sport data
   * @returns {Promise}
   */
  function updateSport (sport) {
    return $http.put(urlBase + '/' + sport._id, sport)
      .then(handleSuccess)
      .catch(handleError);
  }

  /**
   * Send delete sport request by id to BE.
   * @function DeleteSport
   * @param {String} id - Sport ID
   * @returns {Promise}
   */
  function deleteSport (id) {
    return $http.delete(urlBase + '/' + id)
      .then(handleSuccess)
      .catch(handleError);
  }

}
