# KafkaRestProxy.ConsumerApi

All URIs are relative to *http://11.11.254.102:8082/*

Method | HTTP request | Description
------------- | ------------- | -------------
[**assignPartitions**](ConsumerApi.md#assignPartitions) | **POST** /consumers/{group_name}/instances/{instance}/assignments | 
[**commitOffsets**](ConsumerApi.md#commitOffsets) | **POST** /consumers/{group_name}/instances/{instance}/offsets | 
[**createInstanceToGroup**](ConsumerApi.md#createInstanceToGroup) | **POST** /consumers/{group_name} | 
[**destroyConsumer**](ConsumerApi.md#destroyConsumer) | **DELETE** /consumers/{group_name}/instances/{instance} | 
[**fetchData**](ConsumerApi.md#fetchData) | **GET** /consumers/{group_name}/instances/{instance}/records | 
[**getLastCommittedOffsetsForPartition**](ConsumerApi.md#getLastCommittedOffsetsForPartition) | **GET** /consumers/{group_name}/instances/{instance}/offsets | 
[**getPartitions**](ConsumerApi.md#getPartitions) | **GET** /consumers/{group_name}/instances/{instance}/assignments | 
[**getTopicsSubscriptions**](ConsumerApi.md#getTopicsSubscriptions) | **GET** /consumers/{group_name}/instances/{instance}/subscription | 
[**seekToFirstOffsetOfPartitions**](ConsumerApi.md#seekToFirstOffsetOfPartitions) | **POST** /consumers/{group_name}/instances/{instance}/positions/beginning | 
[**seekToLastOffsetOfPartitions**](ConsumerApi.md#seekToLastOffsetOfPartitions) | **POST** /consumers/{group_name}/instances/{instance}/positions/end | 
[**setFetchOffsets**](ConsumerApi.md#setFetchOffsets) | **POST** /consumers/{group_name}/instances/{instance}/positions | 
[**subscribesTopics**](ConsumerApi.md#subscribesTopics) | **POST** /consumers/{group_name}/instances/{instance}/subscription | 
[**unsubscribe**](ConsumerApi.md#unsubscribe) | **DELETE** /consumers/{group_name}/instances/{instance}/subscription | 


<a name="assignPartitions"></a>
# **assignPartitions**
> assignPartitions(groupName, instance, opts)



Manually assign a list of partitions to this consumer.

### Example
```javascript
var KafkaRestProxy = require('kafka_rest_proxy');

var apiInstance = new KafkaRestProxy.ConsumerApi();

var groupName = "groupName_example"; // String | The name of the consumer group

var instance = "instance_example"; // String | The ID of the consumer instance

var opts = { 
  'partitions': [new KafkaRestProxy.PartitionInTopic()] // [PartitionInTopic] | A list of partitions to assign to this consumer
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.assignPartitions(groupName, instance, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **groupName** | **String**| The name of the consumer group | 
 **instance** | **String**| The ID of the consumer instance | 
 **partitions** | [**[PartitionInTopic]**](PartitionInTopic.md)| A list of partitions to assign to this consumer | [optional] 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="commitOffsets"></a>
# **commitOffsets**
> commitOffsets(groupName, instance, opts)



Commit a list of offsets for the consumer. When the post body is empty, it commits all the records that have been fetched by the consumer instance

### Example
```javascript
var KafkaRestProxy = require('kafka_rest_proxy');

var apiInstance = new KafkaRestProxy.ConsumerApi();

var groupName = "groupName_example"; // String | The name of the consumer group

var instance = "instance_example"; // String | The ID of the consumer instance

var opts = { 
  'offsets': [new KafkaRestProxy.OffsetForPartition()] // [OffsetForPartition] | A list of offsets to commit for partitions
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.commitOffsets(groupName, instance, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **groupName** | **String**| The name of the consumer group | 
 **instance** | **String**| The ID of the consumer instance | 
 **offsets** | [**[OffsetForPartition]**](OffsetForPartition.md)| A list of offsets to commit for partitions | [optional] 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="createInstanceToGroup"></a>
# **createInstanceToGroup**
> ConsumerResponse createInstanceToGroup(groupName, opts)



Create a new consumer instance in the consumer group

### Example
```javascript
var KafkaRestProxy = require('kafka_rest_proxy');

var apiInstance = new KafkaRestProxy.ConsumerApi();

var groupName = "groupName_example"; // String | The name of the consumer group.

var opts = { 
  'consumerRequest': new KafkaRestProxy.ConsumerRequest() // ConsumerRequest | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.createInstanceToGroup(groupName, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **groupName** | **String**| The name of the consumer group. | 
 **consumerRequest** | [**ConsumerRequest**](ConsumerRequest.md)|  | [optional] 

### Return type

[**ConsumerResponse**](ConsumerResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="destroyConsumer"></a>
# **destroyConsumer**
> destroyConsumer(groupName, instance)



Destroy the consumer instance.

### Example
```javascript
var KafkaRestProxy = require('kafka_rest_proxy');

var apiInstance = new KafkaRestProxy.ConsumerApi();

var groupName = "groupName_example"; // String | The name of the consumer group

var instance = "instance_example"; // String | The ID of the consumer instance


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.destroyConsumer(groupName, instance, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **groupName** | **String**| The name of the consumer group | 
 **instance** | **String**| The ID of the consumer instance | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="fetchData"></a>
# **fetchData**
> [RecordInfo] fetchData(groupName, instance, opts)



Fetch data for the topics or partitions specified using one of the subscribe/assign APIs.

### Example
```javascript
var KafkaRestProxy = require('kafka_rest_proxy');

var apiInstance = new KafkaRestProxy.ConsumerApi();

var groupName = "groupName_example"; // String | The name of the consumer group

var instance = "instance_example"; // String | The ID of the consumer instance

var opts = { 
  'timeout': 56, // Number | The number of milliseconds for the underlying client library poll(timeout) request to fetch the records. Default to 5000ms.
  'maxBytes': 56 // Number | The maximum number of bytes of unencoded keys and values that should be included in the response. This provides approximate control over the size of responses and the amount of memory required to store the decoded response. The actual limit will be the minimum of this setting and the server-side configuration consumer.request.max.bytes. Default is unlimited.
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.fetchData(groupName, instance, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **groupName** | **String**| The name of the consumer group | 
 **instance** | **String**| The ID of the consumer instance | 
 **timeout** | **Number**| The number of milliseconds for the underlying client library poll(timeout) request to fetch the records. Default to 5000ms. | [optional] 
 **maxBytes** | **Number**| The maximum number of bytes of unencoded keys and values that should be included in the response. This provides approximate control over the size of responses and the amount of memory required to store the decoded response. The actual limit will be the minimum of this setting and the server-side configuration consumer.request.max.bytes. Default is unlimited. | [optional] 

### Return type

[**[RecordInfo]**](RecordInfo.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

<a name="getLastCommittedOffsetsForPartition"></a>
# **getLastCommittedOffsetsForPartition**
> [OffsetForPartitionWithMetadata] getLastCommittedOffsetsForPartition(groupName, instance, opts)



Get the last committed offsets for the given partitions (whether the commit happened by this process or another).

### Example
```javascript
var KafkaRestProxy = require('kafka_rest_proxy');

var apiInstance = new KafkaRestProxy.ConsumerApi();

var groupName = "groupName_example"; // String | The name of the consumer group

var instance = "instance_example"; // String | The ID of the consumer instance

var opts = { 
  'partitions': [new KafkaRestProxy.PartitionInTopic()] // [PartitionInTopic] | A list of partitions to find the last committed offsets for
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getLastCommittedOffsetsForPartition(groupName, instance, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **groupName** | **String**| The name of the consumer group | 
 **instance** | **String**| The ID of the consumer instance | 
 **partitions** | [**[PartitionInTopic]**](PartitionInTopic.md)| A list of partitions to find the last committed offsets for | [optional] 

### Return type

[**[OffsetForPartitionWithMetadata]**](OffsetForPartitionWithMetadata.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="getPartitions"></a>
# **getPartitions**
> [PartitionInTopic] getPartitions(groupName, instance)



Get the list of partitions currently manually assigned to this consumer.

### Example
```javascript
var KafkaRestProxy = require('kafka_rest_proxy');

var apiInstance = new KafkaRestProxy.ConsumerApi();

var groupName = "groupName_example"; // String | The name of the consumer group

var instance = "instance_example"; // String | The ID of the consumer instance


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getPartitions(groupName, instance, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **groupName** | **String**| The name of the consumer group | 
 **instance** | **String**| The ID of the consumer instance | 

### Return type

[**[PartitionInTopic]**](PartitionInTopic.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

<a name="getTopicsSubscriptions"></a>
# **getTopicsSubscriptions**
> Topics getTopicsSubscriptions(groupName, instance)



Get the current subscribed list of topics.

### Example
```javascript
var KafkaRestProxy = require('kafka_rest_proxy');

var apiInstance = new KafkaRestProxy.ConsumerApi();

var groupName = "groupName_example"; // String | The name of the consumer group

var instance = "instance_example"; // String | The ID of the consumer instance


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getTopicsSubscriptions(groupName, instance, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **groupName** | **String**| The name of the consumer group | 
 **instance** | **String**| The ID of the consumer instance | 

### Return type

[**Topics**](Topics.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

<a name="seekToFirstOffsetOfPartitions"></a>
# **seekToFirstOffsetOfPartitions**
> seekToFirstOffsetOfPartitions(groupName, instance, opts)



Seek to the first offset for each of the given partitions.

### Example
```javascript
var KafkaRestProxy = require('kafka_rest_proxy');

var apiInstance = new KafkaRestProxy.ConsumerApi();

var groupName = "groupName_example"; // String | The name of the consumer group

var instance = "instance_example"; // String | The ID of the consumer instance

var opts = { 
  'partitions': [new KafkaRestProxy.PartitionInTopic()] // [PartitionInTopic] | A list of partitions
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.seekToFirstOffsetOfPartitions(groupName, instance, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **groupName** | **String**| The name of the consumer group | 
 **instance** | **String**| The ID of the consumer instance | 
 **partitions** | [**[PartitionInTopic]**](PartitionInTopic.md)| A list of partitions | [optional] 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="seekToLastOffsetOfPartitions"></a>
# **seekToLastOffsetOfPartitions**
> seekToLastOffsetOfPartitions(groupName, instance, opts)



Seek to the last offset for each of the given partitions.

### Example
```javascript
var KafkaRestProxy = require('kafka_rest_proxy');

var apiInstance = new KafkaRestProxy.ConsumerApi();

var groupName = "groupName_example"; // String | The name of the consumer group

var instance = "instance_example"; // String | The ID of the consumer instance

var opts = { 
  'partitions': [new KafkaRestProxy.PartitionInTopic()] // [PartitionInTopic] | A list of partitions
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.seekToLastOffsetOfPartitions(groupName, instance, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **groupName** | **String**| The name of the consumer group | 
 **instance** | **String**| The ID of the consumer instance | 
 **partitions** | [**[PartitionInTopic]**](PartitionInTopic.md)| A list of partitions | [optional] 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="setFetchOffsets"></a>
# **setFetchOffsets**
> setFetchOffsets(groupName, instance, opts)



Overrides the fetch offsets that the consumer will use for the next set of records to fetch.

### Example
```javascript
var KafkaRestProxy = require('kafka_rest_proxy');

var apiInstance = new KafkaRestProxy.ConsumerApi();

var groupName = "groupName_example"; // String | The name of the consumer group

var instance = "instance_example"; // String | The ID of the consumer instance

var opts = { 
  'offsets': [new KafkaRestProxy.OffsetForPartition()] // [OffsetForPartition] | A list of offsets
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.setFetchOffsets(groupName, instance, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **groupName** | **String**| The name of the consumer group | 
 **instance** | **String**| The ID of the consumer instance | 
 **offsets** | [**[OffsetForPartition]**](OffsetForPartition.md)| A list of offsets | [optional] 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="subscribesTopics"></a>
# **subscribesTopics**
> subscribesTopics(groupName, instance, opts)



Subscribe to the given list of topics or a topic pattern to get dynamically assigned partitions. If a prior subscription exists, it would be replaced by the latest subscription.

### Example
```javascript
var KafkaRestProxy = require('kafka_rest_proxy');

var apiInstance = new KafkaRestProxy.ConsumerApi();

var groupName = "groupName_example"; // String | The name of the consumer group

var instance = "instance_example"; // String | The ID of the consumer instance

var opts = { 
  'topics': new KafkaRestProxy.TopicSubscriptionRequest() // TopicSubscriptionRequest | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.subscribesTopics(groupName, instance, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **groupName** | **String**| The name of the consumer group | 
 **instance** | **String**| The ID of the consumer instance | 
 **topics** | [**TopicSubscriptionRequest**](TopicSubscriptionRequest.md)|  | [optional] 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="unsubscribe"></a>
# **unsubscribe**
> unsubscribe(groupName, instance)



Unsubscribe from topics currently subscribed.

### Example
```javascript
var KafkaRestProxy = require('kafka_rest_proxy');

var apiInstance = new KafkaRestProxy.ConsumerApi();

var groupName = "groupName_example"; // String | The name of the consumer group

var instance = "instance_example"; // String | The ID of the consumer instance


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.unsubscribe(groupName, instance, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **groupName** | **String**| The name of the consumer group | 
 **instance** | **String**| The ID of the consumer instance | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

