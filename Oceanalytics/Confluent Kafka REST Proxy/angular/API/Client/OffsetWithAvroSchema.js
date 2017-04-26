goog.provide('API.Client.OffsetWithAvroSchema');

/**
 * @record
 */
API.Client.OffsetWithAvroSchema = function() {}

/**
 * ID returned by a previous request using the same schema. This ID corresponds to the ID of the schema in the registry.
 * @type {!number}
 * @export
 */
API.Client.OffsetWithAvroSchema.prototype.keySchemaId;

/**
 * ID returned by a previous request using the same schema. This ID corresponds to the ID of the schema in the registry.
 * @type {!number}
 * @export
 */
API.Client.OffsetWithAvroSchema.prototype.valueSchemaId;

/**
 * @type {!Array<!API.Client.Offset>}
 * @export
 */
API.Client.OffsetWithAvroSchema.prototype.offsets;

