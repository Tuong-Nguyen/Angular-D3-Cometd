# KafkaRestProxy.Offset

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**partition** | **Number** | Partition the message was published to, or null if publishing the message failed | [optional] 
**offset** | **Number** | Offset of the message, or null if publishing the message failed | [optional] 
**errorCode** | **Number** | An error code classifying the reason this operation failed, or null if it succeeded. | [optional] 
**error** | **String** | An error message describing why the operation failed, or null if it succeeded | [optional] 


