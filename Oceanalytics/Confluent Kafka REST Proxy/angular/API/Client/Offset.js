goog.provide('API.Client.Offset');

/**
 * @record
 */
API.Client.Offset = function() {}

/**
 * Partition the message was published to, or null if publishing the message failed
 * @type {!number}
 * @export
 */
API.Client.Offset.prototype.partition;

/**
 * Offset of the message, or null if publishing the message failed
 * @type {!number}
 * @export
 */
API.Client.Offset.prototype.offset;

/**
 * An error code classifying the reason this operation failed, or null if it succeeded.
 * @type {!number}
 * @export
 */
API.Client.Offset.prototype.errorCode;

/**
 * An error message describing why the operation failed, or null if it succeeded
 * @type {!string}
 * @export
 */
API.Client.Offset.prototype.error;

