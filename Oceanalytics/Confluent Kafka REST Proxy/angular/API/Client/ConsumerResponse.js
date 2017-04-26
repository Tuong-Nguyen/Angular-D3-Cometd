goog.provide('API.Client.ConsumerResponse');

/**
 * @record
 */
API.Client.ConsumerResponse = function() {}

/**
 * Unique ID for the consumer instance in this group.
 * @type {!string}
 * @export
 */
API.Client.ConsumerResponse.prototype.instanceId;

/**
 * Base URI used to construct URIs for subsequent requests against this consumer instance. This will be of the form http://hostname:port/consumers/consumer_group/instances/instance_id.
 * @type {!string}
 * @export
 */
API.Client.ConsumerResponse.prototype.baseUri;

