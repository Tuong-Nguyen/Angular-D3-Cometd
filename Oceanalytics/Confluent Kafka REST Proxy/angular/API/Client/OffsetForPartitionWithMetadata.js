goog.provide('API.Client.OffsetForPartitionWithMetadata');

/**
 * @record
 */
API.Client.OffsetForPartitionWithMetadata = function() {}

/**
 * Name of the topic
 * @type {!string}
 * @export
 */
API.Client.OffsetForPartitionWithMetadata.prototype.topic;

/**
 * Partition ID
 * @type {!number}
 * @export
 */
API.Client.OffsetForPartitionWithMetadata.prototype.partition;

/**
 * The offset to commit
 * @type {!number}
 * @export
 */
API.Client.OffsetForPartitionWithMetadata.prototype.offset;

/**
 * Metadata for the committed offset
 * @type {!string}
 * @export
 */
API.Client.OffsetForPartitionWithMetadata.prototype.metadata;

