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

import * as models from './models';

export interface PartitionInTopic {
    /**
     * Name of the topic
     */
    topic?: string;

    /**
     * Partition ID
     */
    partition?: number;

}
