goog.provide('API.Client.Record');

/**
 * @record
 */
API.Client.Record = function() {}

/**
 * The message key, formatted according to the embedded format, or null to omit a key (optional)
 * @type {!string}
 * @export
 */
API.Client.Record.prototype.key;

/**
 * The message value, formatted according to the embedded format
 * @type {!string}
 * @export
 */
API.Client.Record.prototype.value;

/**
 * Partition to store the message in (optional)
 * @type {!number}
 * @export
 */
API.Client.Record.prototype.partition;

