goog.provide('API.Client.OffsetForPartition');

/**
 * @record
 */
API.Client.OffsetForPartition = function() {}

/**
 * Name of the topic
 * @type {!string}
 * @export
 */
API.Client.OffsetForPartition.prototype.topic;

/**
 * Partition ID
 * @type {!number}
 * @export
 */
API.Client.OffsetForPartition.prototype.partition;

/**
 * The offset to commit
 * @type {!number}
 * @export
 */
API.Client.OffsetForPartition.prototype.offset;

