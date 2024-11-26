/* tslint:disable */
/* eslint-disable */
/**
 * Bodoge API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface Chat
 */
export interface Chat {
    /**
     * 
     * @type {string}
     * @memberof Chat
     */
    message: string;
    /**
     * 
     * @type {string}
     * @memberof Chat
     */
    sender: string;
}

/**
 * Check if a given object implements the Chat interface.
 */
export function instanceOfChat(value: object): value is Chat {
    if (!('message' in value) || value['message'] === undefined) return false;
    if (!('sender' in value) || value['sender'] === undefined) return false;
    return true;
}

export function ChatFromJSON(json: any): Chat {
    return ChatFromJSONTyped(json, false);
}

export function ChatFromJSONTyped(json: any, ignoreDiscriminator: boolean): Chat {
    if (json == null) {
        return json;
    }
    return {
        
        'message': json['message'],
        'sender': json['sender'],
    };
}

  export function ChatToJSON(json: any): Chat {
      return ChatToJSONTyped(json, false);
  }

  export function ChatToJSONTyped(value?: Chat | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'message': value['message'],
        'sender': value['sender'],
    };
}

