# KafkaRestProxy.BrokerApi

All URIs are relative to *http://11.11.254.102:8082/*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getIDs**](BrokerApi.md#getIDs) | **GET** /brokers | 


<a name="getIDs"></a>
# **getIDs**
> getIDs()



Get a list of brokers.

### Example
```javascript
var KafkaRestProxy = require('kafka_rest_proxy');

var apiInstance = new KafkaRestProxy.BrokerApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.getIDs(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

