goog.provide('API.Client.Replica');

/**
 * @record
 */
API.Client.Replica = function() {}

/**
 * broker ID of the replica
 * @type {!number}
 * @export
 */
API.Client.Replica.prototype.broker;

/**
 * true if this replica is the leader for the partition
 * @type {!boolean}
 * @export
 */
API.Client.Replica.prototype.leader;

/**
 * true if this replica is currently in sync with the leader
 * @type {!boolean}
 * @export
 */
API.Client.Replica.prototype.sync;

