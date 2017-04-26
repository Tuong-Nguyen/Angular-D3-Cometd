goog.provide('API.Client.TopicSubscriptionRequest');

/**
 * @record
 */
API.Client.TopicSubscriptionRequest = function() {}

/**
 * A list of topics to subscribe
 * @type {!API.Client.Topics}
 * @export
 */
API.Client.TopicSubscriptionRequest.prototype.topics;

/**
 * A REGEX pattern. topics_pattern and topics fields are mutually exclusive.
 * @type {!string}
 * @export
 */
API.Client.TopicSubscriptionRequest.prototype.topicPattern;

