goog.provide('API.Client.PartitionInTopic');

/**
 * @record
 */
API.Client.PartitionInTopic = function() {}

/**
 * Name of the topic
 * @type {!string}
 * @export
 */
API.Client.PartitionInTopic.prototype.topic;

/**
 * Partition ID
 * @type {!number}
 * @export
 */
API.Client.PartitionInTopic.prototype.partition;

