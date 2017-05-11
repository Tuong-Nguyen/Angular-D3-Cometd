/**
 * @fileoverview AUTOMATICALLY GENERATED service for API.Client.PartitionApi.
 * Do not edit this file by hand or your changes will be lost next time it is
 * generated.
 *
 * Confluent Kafka REST proxy
 * Version: 1.0.0
 * Generated by: io.swagger.codegen.languages.JavascriptClosureAngularClientCodegen
 */
/**
 * @license Apache 2.0
 * http://www.apache.org/licenses/LICENSE-2.0.html
 */

goog.provide('API.Client.PartitionApi');

goog.require('API.Client.OffsetWithAvroSchema');
goog.require('API.Client.Partition');
goog.require('API.Client.Record');

/**
 * @constructor
 * @param {!angular.$http} $http
 * @param {!Object} $httpParamSerializer
 * @param {!angular.$injector} $injector
 * @struct
 */
API.Client.PartitionApi = function($http, $httpParamSerializer, $injector) {
  /** @private {!string} */
  this.basePath_ = $injector.has('PartitionApiBasePath') ?
                   /** @type {!string} */ ($injector.get('PartitionApiBasePath')) :
                   'http://11.11.254.102:8082/';

  /** @private {!Object<string, string>} */
  this.defaultHeaders_ = $injector.has('PartitionApiDefaultHeaders') ?
                   /** @type {!Object<string, string>} */ (
                       $injector.get('PartitionApiDefaultHeaders')) :
                   {};

  /** @private {!angular.$http} */
  this.http_ = $http;

  /** @package {!Object} */
  this.httpParamSerializer = $injector.get('$httpParamSerializer');
}
API.Client.PartitionApi.$inject = ['$http', '$httpParamSerializer', '$injector'];

/**
 * 
 * Get metadata about a single partition in the topic.
 * @param {!string} topicName Name of the topic
 * @param {!number} partitionId ID of the partition to inspect
 * @param {!angular.$http.Config=} opt_extraHttpRequestParams Extra HTTP parameters to send.
 * @return {!angular.$q.Promise<!API.Client.Partition>}
 */
API.Client.PartitionApi.prototype.getPartitionMetadataInTopic = function(topicName, partitionId, opt_extraHttpRequestParams) {
  /** @const {string} */
  var path = this.basePath_ + '/topics/{topic_name}/partitions/{partition_id}'
      .replace('{' + 'topic_name' + '}', String(topicName))
      .replace('{' + 'partition_id' + '}', String(partitionId));

  /** @type {!Object} */
  var queryParameters = {};

  /** @type {!Object} */
  var headerParams = angular.extend({}, this.defaultHeaders_);
  // verify required parameter 'topicName' is set
  if (!topicName) {
    throw new Error('Missing required parameter topicName when calling getPartitionMetadataInTopic');
  }
  // verify required parameter 'partitionId' is set
  if (!partitionId) {
    throw new Error('Missing required parameter partitionId when calling getPartitionMetadataInTopic');
  }
  /** @type {!Object} */
  var httpRequestParams = {
    method: 'GET',
    url: path,
    json: true,
            params: queryParameters,
    headers: headerParams
  };

  if (opt_extraHttpRequestParams) {
    httpRequestParams = angular.extend(httpRequestParams, opt_extraHttpRequestParams);
  }

  return (/** @type {?} */ (this.http_))(httpRequestParams);
}

/**
 * 
 * Get a list of partitions for the topic.
 * @param {!string} topicName Name of the topic
 * @param {!angular.$http.Config=} opt_extraHttpRequestParams Extra HTTP parameters to send.
 * @return {!angular.$q.Promise<!API.Client.Partition>}
 */
API.Client.PartitionApi.prototype.getPartitionsForTopic = function(topicName, opt_extraHttpRequestParams) {
  /** @const {string} */
  var path = this.basePath_ + '/topics/{topic_name}/partitions'
      .replace('{' + 'topic_name' + '}', String(topicName));

  /** @type {!Object} */
  var queryParameters = {};

  /** @type {!Object} */
  var headerParams = angular.extend({}, this.defaultHeaders_);
  // verify required parameter 'topicName' is set
  if (!topicName) {
    throw new Error('Missing required parameter topicName when calling getPartitionsForTopic');
  }
  /** @type {!Object} */
  var httpRequestParams = {
    method: 'GET',
    url: path,
    json: true,
            params: queryParameters,
    headers: headerParams
  };

  if (opt_extraHttpRequestParams) {
    httpRequestParams = angular.extend(httpRequestParams, opt_extraHttpRequestParams);
  }

  return (/** @type {?} */ (this.http_))(httpRequestParams);
}

/**
 * 
 * Produce messages to one partition of the topic.
 * @param {!string} topicName Name of the topic to produce the messages to
 * @param {!number} partitionId Partition to produce the messages to
 * @param {!Array<!API.Client.Record>} records A list of records to produce to partition.
 * @param {!angular.$http.Config=} opt_extraHttpRequestParams Extra HTTP parameters to send.
 * @return {!angular.$q.Promise<!API.Client.OffsetWithAvroSchema>}
 */
API.Client.PartitionApi.prototype.produceMessageToPartitionOfTopic = function(topicName, partitionId, records, opt_extraHttpRequestParams) {
  /** @const {string} */
  var path = this.basePath_ + '/topics/{topic_name}/partitions/{partition_id}'
      .replace('{' + 'topic_name' + '}', String(topicName))
      .replace('{' + 'partition_id' + '}', String(partitionId));

  /** @type {!Object} */
  var queryParameters = {};

  /** @type {!Object} */
  var headerParams = angular.extend({}, this.defaultHeaders_);
  // verify required parameter 'topicName' is set
  if (!topicName) {
    throw new Error('Missing required parameter topicName when calling produceMessageToPartitionOfTopic');
  }
  // verify required parameter 'partitionId' is set
  if (!partitionId) {
    throw new Error('Missing required parameter partitionId when calling produceMessageToPartitionOfTopic');
  }
  // verify required parameter 'records' is set
  if (!records) {
    throw new Error('Missing required parameter records when calling produceMessageToPartitionOfTopic');
  }
  /** @type {!Object} */
  var httpRequestParams = {
    method: 'POST',
    url: path,
    json: true,
    data: records,
        params: queryParameters,
    headers: headerParams
  };

  if (opt_extraHttpRequestParams) {
    httpRequestParams = angular.extend(httpRequestParams, opt_extraHttpRequestParams);
  }

  return (/** @type {?} */ (this.http_))(httpRequestParams);
}