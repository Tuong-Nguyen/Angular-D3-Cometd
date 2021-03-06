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

export interface RecordInfo {
    /**
     * The topic
     */
    topic?: string;

    /**
     * The message key, formatted according to the embedded format
     */
    key?: string;

    /**
     * The message value, formatted according to the embedded format
     */
    value?: any;

    /**
     * Partition to store the message in
     */
    partition?: number;

    /**
     * Offset of the message
     */
    offset?: number;

}
