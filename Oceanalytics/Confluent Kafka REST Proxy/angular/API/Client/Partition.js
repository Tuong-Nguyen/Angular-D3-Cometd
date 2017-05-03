goog.provide('API.Client.Partition');

/**
 * The partitions resource provides per-partition metadata, including the current leaders and replicas for each partition
 * @record
 */
API.Client.Partition = function() {}

/**
 * ID of the partition
 * @type {!number}
 * @export
 */
API.Client.Partition.prototype.partition;

/**
 * Broker ID of the leader for this partition
 * @type {!number}
 * @export
 */
API.Client.Partition.prototype.leader;

/**
 * List of brokers acting as replicas for this partition
 * @type {!Array<!API.Client.Replica>}
 * @export
 */
API.Client.Partition.prototype.replicas;

