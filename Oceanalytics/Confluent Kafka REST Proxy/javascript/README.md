# kafka_rest_proxy

KafkaRestProxy - JavaScript client for kafka_rest_proxy
Confluent Kafka REST proxy
This SDK is automatically generated by the [Swagger Codegen](https://github.com/swagger-api/swagger-codegen) project:

- API version: 1.0.0
- Package version: 1.0.0
- Build package: io.swagger.codegen.languages.JavascriptClientCodegen

## Installation

### For [Node.js](https://nodejs.org/)

#### npm

To publish the library as a [npm](https://www.npmjs.com/),
please follow the procedure in ["Publishing npm packages"](https://docs.npmjs.com/getting-started/publishing-npm-packages).

Then install it via:

```shell
npm install kafka_rest_proxy --save
```

#### git
#
If the library is hosted at a git repository, e.g.
https://github.com/GIT_USER_ID/GIT_REPO_ID
then install it via:

```shell
    npm install GIT_USER_ID/GIT_REPO_ID --save
```

### For browser

The library also works in the browser environment via npm and [browserify](http://browserify.org/). After following
the above steps with Node.js and installing browserify with `npm install -g browserify`,
perform the following (assuming *main.js* is your entry file):

```shell
browserify main.js > bundle.js
```

Then include *bundle.js* in the HTML pages.

## Getting Started

Please follow the [installation](#installation) instruction and execute the following JS code:

```javascript
var KafkaRestProxy = require('kafka_rest_proxy');

var api = new KafkaRestProxy.BrokerApi()

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
api.getIDs(callback);

```

## Documentation for API Endpoints

All URIs are relative to *http://11.11.254.102:8082/*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*KafkaRestProxy.BrokerApi* | [**getIDs**](docs/BrokerApi.md#getIDs) | **GET** /brokers | 
*KafkaRestProxy.ConsumerApi* | [**assignPartitions**](docs/ConsumerApi.md#assignPartitions) | **POST** /consumers/{group_name}/instances/{instance}/assignments | 
*KafkaRestProxy.ConsumerApi* | [**commitOffsets**](docs/ConsumerApi.md#commitOffsets) | **POST** /consumers/{group_name}/instances/{instance}/offsets | 
*KafkaRestProxy.ConsumerApi* | [**createInstanceToGroup**](docs/ConsumerApi.md#createInstanceToGroup) | **POST** /consumers/{group_name} | 
*KafkaRestProxy.ConsumerApi* | [**destroyConsumer**](docs/ConsumerApi.md#destroyConsumer) | **DELETE** /consumers/{group_name}/instances/{instance} | 
*KafkaRestProxy.ConsumerApi* | [**fetchData**](docs/ConsumerApi.md#fetchData) | **GET** /consumers/{group_name}/instances/{instance}/records | 
*KafkaRestProxy.ConsumerApi* | [**getLastCommittedOffsetsForPartition**](docs/ConsumerApi.md#getLastCommittedOffsetsForPartition) | **GET** /consumers/{group_name}/instances/{instance}/offsets | 
*KafkaRestProxy.ConsumerApi* | [**getPartitions**](docs/ConsumerApi.md#getPartitions) | **GET** /consumers/{group_name}/instances/{instance}/assignments | 
*KafkaRestProxy.ConsumerApi* | [**getTopicsSubscriptions**](docs/ConsumerApi.md#getTopicsSubscriptions) | **GET** /consumers/{group_name}/instances/{instance}/subscription | 
*KafkaRestProxy.ConsumerApi* | [**seekToFirstOffsetOfPartitions**](docs/ConsumerApi.md#seekToFirstOffsetOfPartitions) | **POST** /consumers/{group_name}/instances/{instance}/positions/beginning | 
*KafkaRestProxy.ConsumerApi* | [**seekToLastOffsetOfPartitions**](docs/ConsumerApi.md#seekToLastOffsetOfPartitions) | **POST** /consumers/{group_name}/instances/{instance}/positions/end | 
*KafkaRestProxy.ConsumerApi* | [**setFetchOffsets**](docs/ConsumerApi.md#setFetchOffsets) | **POST** /consumers/{group_name}/instances/{instance}/positions | 
*KafkaRestProxy.ConsumerApi* | [**subscribesTopics**](docs/ConsumerApi.md#subscribesTopics) | **POST** /consumers/{group_name}/instances/{instance}/subscription | 
*KafkaRestProxy.ConsumerApi* | [**unsubscribe**](docs/ConsumerApi.md#unsubscribe) | **DELETE** /consumers/{group_name}/instances/{instance}/subscription | 
*KafkaRestProxy.PartitionApi* | [**getPartitionMetadataInTopic**](docs/PartitionApi.md#getPartitionMetadataInTopic) | **GET** /topics/{topic_name}/partitions/{partition_id} | 
*KafkaRestProxy.PartitionApi* | [**getPartitionsForTopic**](docs/PartitionApi.md#getPartitionsForTopic) | **GET** /topics/{topic_name}/partitions | 
*KafkaRestProxy.PartitionApi* | [**produceMessageToPartitionOfTopic**](docs/PartitionApi.md#produceMessageToPartitionOfTopic) | **POST** /topics/{topic_name}/partitions/{partition_id} | 
*KafkaRestProxy.TopicApi* | [**getTopicMetadata**](docs/TopicApi.md#getTopicMetadata) | **GET** /topics/{topic_name} | 
*KafkaRestProxy.TopicApi* | [**getTopics**](docs/TopicApi.md#getTopics) | **GET** /topics | 
*KafkaRestProxy.TopicApi* | [**produceMessageToTopic**](docs/TopicApi.md#produceMessageToTopic) | **POST** /topics/{topic_name} | 


## Documentation for Models

 - [KafkaRestProxy.ConsumerRequest](docs/ConsumerRequest.md)
 - [KafkaRestProxy.ConsumerResponse](docs/ConsumerResponse.md)
 - [KafkaRestProxy.Offset](docs/Offset.md)
 - [KafkaRestProxy.OffsetForPartition](docs/OffsetForPartition.md)
 - [KafkaRestProxy.OffsetForPartitionWithMetadata](docs/OffsetForPartitionWithMetadata.md)
 - [KafkaRestProxy.OffsetWithAvroSchema](docs/OffsetWithAvroSchema.md)
 - [KafkaRestProxy.Partition](docs/Partition.md)
 - [KafkaRestProxy.PartitionInTopic](docs/PartitionInTopic.md)
 - [KafkaRestProxy.Record](docs/Record.md)
 - [KafkaRestProxy.RecordInfo](docs/RecordInfo.md)
 - [KafkaRestProxy.Replica](docs/Replica.md)
 - [KafkaRestProxy.Topic](docs/Topic.md)
 - [KafkaRestProxy.TopicSubscriptionRequest](docs/TopicSubscriptionRequest.md)
 - [KafkaRestProxy.Topics](docs/Topics.md)


## Documentation for Authorization

 All endpoints do not require authorization.
