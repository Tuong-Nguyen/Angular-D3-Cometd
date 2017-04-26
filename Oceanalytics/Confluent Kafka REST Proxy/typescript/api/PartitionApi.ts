/**
 * Kafka REST proxy
 * Confluent Kafka REST proxy
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { Http, Headers, URLSearchParams }                    from '@angular/http';
import { RequestMethod, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Response, ResponseContentType }                     from '@angular/http';

import { Observable }                                        from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as models                                           from '../model/models';
import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';

/* tslint:disable:no-unused-variable member-ordering */


@Injectable()
export class PartitionApi {
    protected basePath = 'http://11.11.254.102:8082/';
    public defaultHeaders: Headers = new Headers();
    public configuration: Configuration = new Configuration();

    constructor(protected http: Http, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
        }
    }

    /**
     * 
     * Get metadata about a single partition in the topic.
     * @param topicName Name of the topic
     * @param partitionId ID of the partition to inspect
     */
    public getPartitionMetadataInTopic(topicName: string, partitionId: number, extraHttpRequestParams?: any): Observable<models.Partition> {
        return this.getPartitionMetadataInTopicWithHttpInfo(topicName, partitionId, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * 
     * Get a list of partitions for the topic.
     * @param topicName Name of the topic
     */
    public getPartitionsForTopic(topicName: string, extraHttpRequestParams?: any): Observable<models.Partition> {
        return this.getPartitionsForTopicWithHttpInfo(topicName, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * 
     * Produce messages to one partition of the topic.
     * @param topicName Name of the topic to produce the messages to
     * @param partitionId Partition to produce the messages to
     * @param records A list of records to produce to partition.
     */
    public produceMessageToPartitionOfTopic(topicName: string, partitionId: number, records: Array<models.Record>, extraHttpRequestParams?: any): Observable<models.OffsetWithAvroSchema> {
        return this.produceMessageToPartitionOfTopicWithHttpInfo(topicName, partitionId, records, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }


    /**
     * 
     * Get metadata about a single partition in the topic.
     * @param topicName Name of the topic
     * @param partitionId ID of the partition to inspect
     */
    public getPartitionMetadataInTopicWithHttpInfo(topicName: string, partitionId: number, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + `/topics/${topic_name}/partitions/${partition_id}`;

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'topicName' is not null or undefined
        if (topicName === null || topicName === undefined) {
            throw new Error('Required parameter topicName was null or undefined when calling getPartitionMetadataInTopic.');
        }
        // verify required parameter 'partitionId' is not null or undefined
        if (partitionId === null || partitionId === undefined) {
            throw new Error('Required parameter partitionId was null or undefined when calling getPartitionMetadataInTopic.');
        }
        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        // to determine the Accept header
        let produces: string[] = [
            'application/vnd.kafka.v2+json'
        ];

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * 
     * Get a list of partitions for the topic.
     * @param topicName Name of the topic
     */
    public getPartitionsForTopicWithHttpInfo(topicName: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + `/topics/${topic_name}/partitions`;

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'topicName' is not null or undefined
        if (topicName === null || topicName === undefined) {
            throw new Error('Required parameter topicName was null or undefined when calling getPartitionsForTopic.');
        }
        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        // to determine the Accept header
        let produces: string[] = [
            'application/vnd.kafka.v2+json'
        ];

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * 
     * Produce messages to one partition of the topic.
     * @param topicName Name of the topic to produce the messages to
     * @param partitionId Partition to produce the messages to
     * @param records A list of records to produce to partition.
     */
    public produceMessageToPartitionOfTopicWithHttpInfo(topicName: string, partitionId: number, records: Array<models.Record>, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + `/topics/${topic_name}/partitions/${partition_id}`;

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'topicName' is not null or undefined
        if (topicName === null || topicName === undefined) {
            throw new Error('Required parameter topicName was null or undefined when calling produceMessageToPartitionOfTopic.');
        }
        // verify required parameter 'partitionId' is not null or undefined
        if (partitionId === null || partitionId === undefined) {
            throw new Error('Required parameter partitionId was null or undefined when calling produceMessageToPartitionOfTopic.');
        }
        // verify required parameter 'records' is not null or undefined
        if (records === null || records === undefined) {
            throw new Error('Required parameter records was null or undefined when calling produceMessageToPartitionOfTopic.');
        }
        // to determine the Content-Type header
        let consumes: string[] = [
            'application/vnd.kafka.v2+json'
        ];

        // to determine the Accept header
        let produces: string[] = [
            'application/vnd.kafka.v2+json'
        ];

        headers.set('Content-Type', 'application/json');

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Post,
            headers: headers,
            body: records == null ? '' : JSON.stringify(records), // https://github.com/angular/angular/issues/10612
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

}
