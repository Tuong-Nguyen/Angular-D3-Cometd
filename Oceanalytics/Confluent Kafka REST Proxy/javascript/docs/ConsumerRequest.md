# KafkaRestProxy.ConsumerRequest

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **String** | Name for the consumer instance, which will be used in URLs for the consumer. This must be unique, at least within the proxy process handling the request. If omitted, falls back on the automatically generated ID. Using automatically generated names is recommended for most use cases. | [optional] 
**format** | **String** | The format of consumed messages, which is used to convert messages into a JSON-compatible form. Valid values \&quot;binary\&quot;, \&quot;avro\&quot;, \&quot;json\&quot;. If unspecified, defaults to “binary”. | [optional] 
**autoOffsetReset** | **String** | Sets the auto.offset.reset setting for the consumer | [optional] 
**autoCommitEnable** | **String** | Sets the auto.commit.enable setting for the consumer | [optional] 


