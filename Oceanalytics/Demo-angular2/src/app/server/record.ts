
//1st way // named type // prefer use this !!! 
export class value {
	kafkaTopicName : string;
	subscriptionRequest : subscriptionRequest;
}

export class subscriptionRequest {
	measuresStream : string;
	password: string;
	user: string;
}

export class RecordDetail {
	key: string;
	value: value;
}

export class Record {
	records : RecordDetail[];
}

//2nd way // anonymous type variant

// export class Record {
// 	records : 
// 	{
// 		key: string;
// 		value: {
// 			kafkaTopicName : string;
// 			subscriptionRequest : {
// 				measuresStream : string;
// 				password: string;
// 				user: string;
// 			}
// 		}
// 	}[]
// }