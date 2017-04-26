goog.provide('API.Client.Topic');

/**
 * The topics resource provides information about the topics in your Kafka cluster and their current state
 * @record
 */
API.Client.Topic = function() {}

/**
 * Name of the topic
 * @type {!string}
 * @export
 */
API.Client.Topic.prototype.name;

/**
 * Per-topic configuration overrides
 * @type {!string}
 * @export
 */
API.Client.Topic.prototype.configs;

/**
 * List of partitions for this topic
 * @type {!Array<!API.Client.Partition>}
 * @export
 */
API.Client.Topic.prototype.partitions;

