# KafkaRestProxy.TopicApi

All URIs are relative to *http://11.11.254.102:8082/*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getTopicMetadata**](TopicApi.md#getTopicMetadata) | **GET** /topics/{topic_name} | 
[**getTopics**](TopicApi.md#getTopics) | **GET** /topics | 
[**produceMessageToTopic**](TopicApi.md#produceMessageToTopic) | **POST** /topics/{topic_name} | 


<a name="getTopicMetadata"></a>
# **getTopicMetadata**
> Topic getTopicMetadata(topicName)



Get metadata about a specific topic.

### Example
```javascript
var KafkaRestProxy = require('kafka_rest_proxy');

var apiInstance = new KafkaRestProxy.TopicApi();

var topicName = "topicName_example"; // String | Name of the topic to get metadata about


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getTopicMetadata(topicName, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **topicName** | **String**| Name of the topic to get metadata about | 

### Return type

[**Topic**](Topic.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getTopics"></a>
# **getTopics**
> [&#39;String&#39;] getTopics()



Get a list of Kafka topics.

### Example
```javascript
var KafkaRestProxy = require('kafka_rest_proxy');

var apiInstance = new KafkaRestProxy.TopicApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getTopics(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

**[&#39;String&#39;]**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="produceMessageToTopic"></a>
# **produceMessageToTopic**
> OffsetWithAvroSchema produceMessageToTopic(topicName, records)



Produce messages to a topic, optionally specifying keys or partitions for the messages. If no partition is provided, one will be chosen based on the hash of the key. If no key is provided, the partition will be chosen for each message in a round-robin fashion.

### Example
```javascript
var KafkaRestProxy = require('kafka_rest_proxy');

var apiInstance = new KafkaRestProxy.TopicApi();

var topicName = "topicName_example"; // String | Name of the topic to produce the messages to

var records = [new KafkaRestProxy.Record()]; // [Record] | A list of records to produce to the topic.


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.produceMessageToTopic(topicName, records, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **topicName** | **String**| Name of the topic to produce the messages to | 
 **records** | [**[Record]**](Record.md)| A list of records to produce to the topic. | 

### Return type

[**OffsetWithAvroSchema**](OffsetWithAvroSchema.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

