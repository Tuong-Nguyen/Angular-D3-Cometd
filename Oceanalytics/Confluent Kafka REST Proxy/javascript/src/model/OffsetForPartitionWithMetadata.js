/**
 * Kafka REST proxy
 * Confluent Kafka REST proxy
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.KafkaRestProxy) {
      root.KafkaRestProxy = {};
    }
    root.KafkaRestProxy.OffsetForPartitionWithMetadata = factory(root.KafkaRestProxy.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The OffsetForPartitionWithMetadata model module.
   * @module model/OffsetForPartitionWithMetadata
   * @version 1.0.0
   */

  /**
   * Constructs a new <code>OffsetForPartitionWithMetadata</code>.
   * @alias module:model/OffsetForPartitionWithMetadata
   * @class
   */
  var exports = function() {
    var _this = this;





  };

  /**
   * Constructs a <code>OffsetForPartitionWithMetadata</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/OffsetForPartitionWithMetadata} obj Optional instance to populate.
   * @return {module:model/OffsetForPartitionWithMetadata} The populated <code>OffsetForPartitionWithMetadata</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('topic')) {
        obj['topic'] = ApiClient.convertToType(data['topic'], 'String');
      }
      if (data.hasOwnProperty('partition')) {
        obj['partition'] = ApiClient.convertToType(data['partition'], 'Number');
      }
      if (data.hasOwnProperty('offset')) {
        obj['offset'] = ApiClient.convertToType(data['offset'], 'Number');
      }
      if (data.hasOwnProperty('metadata')) {
        obj['metadata'] = ApiClient.convertToType(data['metadata'], 'String');
      }
    }
    return obj;
  }

  /**
   * Name of the topic
   * @member {String} topic
   */
  exports.prototype['topic'] = undefined;
  /**
   * Partition ID
   * @member {Number} partition
   */
  exports.prototype['partition'] = undefined;
  /**
   * The offset to commit
   * @member {Number} offset
   */
  exports.prototype['offset'] = undefined;
  /**
   * Metadata for the committed offset
   * @member {String} metadata
   */
  exports.prototype['metadata'] = undefined;



  return exports;
}));


