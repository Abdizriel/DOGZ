'use strict';

angular
  .module('dogzApp')
  .factory('KennelService', KennelService);

KennelService.$inject = ['$http', 'APIUtilService'];

/**
 * Create a Kennel API Service.
 * @function KennelService
 * @param {Object} $http - Angular service that facilitates communication with the remote HTTP
 * @param {Object} APIUtilService - API Utility services
 * @returns {Object} service - All API Kennel services
 */
function KennelService($http, APIUtilService) {

  // Service base url
  const urlBase = '/api/kennels';
  const { handleSuccess, handleError } = APIUtilService;

  // Service list
  let service = {};

  service.getKennels = getKennels;
  service.getKennel = getKennel;
  service.createKennel = createKennel;
  service.updateKennel = updateKennel;
  service.deleteKennel = deleteKennel;

  return service;

  /**
   * Gets all kennels from BE.
   * @function getKennels
   * @returns {Promise}
   */
  function getKennels () {
    return $http.get(urlBase)
      .then(handleSuccess)
      .catch(handleError);
  }

  /**
   * Get single kennel by id from BE.
   * @function getKennel
   * @param {String} id - Kennel ID
   * @returns {Promise}
   */
  function getKennel (id) {
    return $http.get(urlBase + '/' + id)
      .then(handleSuccess)
      .catch(handleError);
  }

  /**
   * Send new kennel data to BE.
   * @function getKennel
   * @param {Object} kennel - New kennel data
   * @returns {Promise}
   */
  function createKennel (kennel) {
    return $http.post(urlBase, kennel)
      .then(handleSuccess)
      .catch(handleError);
  }

  /**
   * Send updated kennel data to BE.
   * @function getKennel
   * @param {Object} kennel - Updated kennel data
   * @returns {Promise}
   */
  function updateKennel (kennel) {
    return $http.put(urlBase + '/' + kennel._id, kennel)
      .then(handleSuccess)
      .catch(handleError);
  }

  /**
   * Send delete kennel request by id to BE.
   * @function DeleteKennel
   * @param {String} id - Kennel ID
   * @returns {Promise}
   */
  function deleteKennel (id) {
    return $http.delete(urlBase + '/' + id)
      .then(handleSuccess)
      .catch(handleError);
  }

}
