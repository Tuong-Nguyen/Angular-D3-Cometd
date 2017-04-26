goog.provide('API.Client.consumer_request');

/**
 * @record
 */
API.Client.ConsumerRequest = function() {}

/**
 * Name for the consumer instance, which will be used in URLs for the consumer. This must be unique, at least within the proxy process handling the request. If omitted, falls back on the automatically generated ID. Using automatically generated names is recommended for most use cases.
 * @type {!string}
 * @export
 */
API.Client.ConsumerRequest.prototype.name;

/**
 * The format of consumed messages, it must be JSON.
 * @type {!string}
 * @export
 */
API.Client.ConsumerRequest.prototype.format;

/**
 * Sets the auto.offset.reset setting for the consumer
 * @type {!string}
 * @export
 */
API.Client.ConsumerRequest.prototype.autoOffsetReset;

/**
 * Sets the auto.commit.enable setting for the consumer
 * @type {!string}
 * @export
 */
API.Client.ConsumerRequest.prototype.autoCommitEnable;

