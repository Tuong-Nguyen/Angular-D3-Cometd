goog.provide('API.Client.RecordInfo');

/**
 * @record
 */
API.Client.RecordInfo = function() {}

/**
 * The topic
 * @type {!string}
 * @export
 */
API.Client.RecordInfo.prototype.topic;

/**
 * The message key, formatted according to the embedded format
 * @type {!string}
 * @export
 */
API.Client.RecordInfo.prototype.key;

/**
 * The message value, formatted according to the embedded format
 * @type {!string}
 * @export
 */
API.Client.RecordInfo.prototype.value;

/**
 * Partition to store the message in
 * @type {!number}
 * @export
 */
API.Client.RecordInfo.prototype.partition;

/**
 * Offset of the message
 * @type {!number}
 * @export
 */
API.Client.RecordInfo.prototype.offset;

