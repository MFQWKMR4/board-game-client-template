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
import type { Chat } from './Chat';
import {
    ChatFromJSON,
    ChatFromJSONTyped,
    ChatToJSON,
    ChatToJSONTyped,
} from './Chat';

/**
 * 
 * @export
 * @interface WsGameStartFromServer
 */
export interface WsGameStartFromServer {
    /**
     * 
     * @type {Chat}
     * @memberof WsGameStartFromServer
     */
    chat: Chat;
}

/**
 * Check if a given object implements the WsGameStartFromServer interface.
 */
export function instanceOfWsGameStartFromServer(value: object): value is WsGameStartFromServer {
    if (!('chat' in value) || value['chat'] === undefined) return false;
    return true;
}

export function WsGameStartFromServerFromJSON(json: any): WsGameStartFromServer {
    return WsGameStartFromServerFromJSONTyped(json, false);
}

export function WsGameStartFromServerFromJSONTyped(json: any, ignoreDiscriminator: boolean): WsGameStartFromServer {
    if (json == null) {
        return json;
    }
    return {
        
        'chat': ChatFromJSON(json['chat']),
    };
}

  export function WsGameStartFromServerToJSON(json: any): WsGameStartFromServer {
      return WsGameStartFromServerToJSONTyped(json, false);
  }

  export function WsGameStartFromServerToJSONTyped(value?: WsGameStartFromServer | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'chat': ChatToJSON(value['chat']),
    };
}
