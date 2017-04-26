# KafkaRestProxy.PartitionApi

All URIs are relative to *http://11.11.254.102:8082/*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getPartitionMetadataInTopic**](PartitionApi.md#getPartitionMetadataInTopic) | **GET** /topics/{topic_name}/partitions/{partition_id} | 
[**getPartitionsForTopic**](PartitionApi.md#getPartitionsForTopic) | **GET** /topics/{topic_name}/partitions | 
[**produceMessageToPartitionOfTopic**](PartitionApi.md#produceMessageToPartitionOfTopic) | **POST** /topics/{topic_name}/partitions/{partition_id} | 


<a name="getPartitionMetadataInTopic"></a>
# **getPartitionMetadataInTopic**
> Partition getPartitionMetadataInTopic(topicName, partitionId)



Get metadata about a single partition in the topic.

### Example
```javascript
var KafkaRestProxy = require('kafka_rest_proxy');

var apiInstance = new KafkaRestProxy.PartitionApi();

var topicName = "topicName_example"; // String | Name of the topic

var partitionId = 56; // Number | ID of the partition to inspect


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getPartitionMetadataInTopic(topicName, partitionId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **topicName** | **String**| Name of the topic | 
 **partitionId** | **Number**| ID of the partition to inspect | 

### Return type

[**Partition**](Partition.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/vnd.kafka.v2+json

<a name="getPartitionsForTopic"></a>
# **getPartitionsForTopic**
> Partition getPartitionsForTopic(topicName)



Get a list of partitions for the topic.

### Example
```javascript
var KafkaRestProxy = require('kafka_rest_proxy');

var apiInstance = new KafkaRestProxy.PartitionApi();

var topicName = "topicName_example"; // String | Name of the topic


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getPartitionsForTopic(topicName, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **topicName** | **String**| Name of the topic | 

### Return type

[**Partition**](Partition.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/vnd.kafka.v2+json

<a name="produceMessageToPartitionOfTopic"></a>
# **produceMessageToPartitionOfTopic**
> OffsetWithAvroSchema produceMessageToPartitionOfTopic(topicName, partitionId, records)



Produce messages to one partition of the topic.

### Example
```javascript
var KafkaRestProxy = require('kafka_rest_proxy');

var apiInstance = new KafkaRestProxy.PartitionApi();

var topicName = "topicName_example"; // String | Name of the topic to produce the messages to

var partitionId = 56; // Number | Partition to produce the messages to

var records = [new KafkaRestProxy.Record()]; // [Record] | A list of records to produce to partition.


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.produceMessageToPartitionOfTopic(topicName, partitionId, records, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **topicName** | **String**| Name of the topic to produce the messages to | 
 **partitionId** | **Number**| Partition to produce the messages to | 
 **records** | [**[Record]**](Record.md)| A list of records to produce to partition. | 

### Return type

[**OffsetWithAvroSchema**](OffsetWithAvroSchema.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/vnd.kafka.v2+json
 - **Accept**: application/vnd.kafka.v2+json

