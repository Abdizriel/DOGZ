'use strict';

angular
  .module('dogzApp')
  .factory('ExhibitionService', ExhibitionService);

ExhibitionService.$inject = ['$http', 'APIUtilService'];

/**
 * Create a Exhibition API Service.
 * @function ExhibitionService
 * @param {Object} $http - Angular service that facilitates communication with the remote HTTP
 * @param {Object} APIUtilService - API Utility services
 * @returns {Object} service - All API Exhibition services
 */
function ExhibitionService($http, APIUtilService) {

  // Service base url
  const urlBase = '/api/exhibitions';
  const { handleSuccess, handleError } = APIUtilService;

  // Service list
  let service = {};

  service.getExhibitions = getExhibitions;
  service.getExhibition = getExhibition;
  service.createExhibition = createExhibition;
  service.updateExhibition = updateExhibition;
  service.deleteExhibition = deleteExhibition;

  return service;

  /**
   * Gets all exhibitions from BE.
   * @function getExhibitions
   * @returns {Promise}
   */
  function getExhibitions () {
    return $http.get(urlBase)
      .then(handleSuccess)
      .catch(handleError);
  }

  /**
   * Get single exhibition by id from BE.
   * @function getExhibition
   * @param {String} id - Exhibition ID
   * @returns {Promise}
   */
  function getExhibition (id) {
    return $http.get(urlBase + '/' + id)
      .then(handleSuccess)
      .catch(handleError);
  }

  /**
   * Send new exhibition data to BE.
   * @function getExhibition
   * @param {Object} exhibition - New exhibition data
   * @returns {Promise}
   */
  function createExhibition (exhibition) {
    return $http.post(urlBase, exhibition)
      .then(handleSuccess)
      .catch(handleError);
  }

  /**
   * Send updated exhibition data to BE.
   * @function getExhibition
   * @param {Object} exhibition - Updated exhibition data
   * @returns {Promise}
   */
  function updateExhibition (exhibition) {
    return $http.put(urlBase + '/' + exhibition._id, exhibition)
      .then(handleSuccess)
      .catch(handleError);
  }

  /**
   * Send delete exhibition request by id to BE.
   * @function DeleteExhibition
   * @param {String} id - Exhibition ID
   * @returns {Promise}
   */
  function deleteExhibition (id) {
    return $http.delete(urlBase + '/' + id)
      .then(handleSuccess)
      .catch(handleError);
  }

}
