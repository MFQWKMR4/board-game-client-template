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
import type { ErrorDetail } from './ErrorDetail';
import {
    ErrorDetailFromJSON,
    ErrorDetailFromJSONTyped,
    ErrorDetailToJSON,
    ErrorDetailToJSONTyped,
} from './ErrorDetail';
import type { UIState } from './UIState';
import {
    UIStateFromJSON,
    UIStateFromJSONTyped,
    UIStateToJSON,
    UIStateToJSONTyped,
} from './UIState';
import type { GameState } from './GameState';
import {
    GameStateFromJSON,
    GameStateFromJSONTyped,
    GameStateToJSON,
    GameStateToJSONTyped,
} from './GameState';

/**
 * 
 * @export
 * @interface WsSystemStateFromServer
 */
export interface WsSystemStateFromServer {
    /**
     * 
     * @type {GameState}
     * @memberof WsSystemStateFromServer
     */
    gameState: GameState;
    /**
     * 
     * @type {UIState}
     * @memberof WsSystemStateFromServer
     */
    uiState: UIState;
    /**
     * 
     * @type {ErrorDetail}
     * @memberof WsSystemStateFromServer
     */
    errorDetail?: ErrorDetail;
}

/**
 * Check if a given object implements the WsSystemStateFromServer interface.
 */
export function instanceOfWsSystemStateFromServer(value: object): value is WsSystemStateFromServer {
    if (!('gameState' in value) || value['gameState'] === undefined) return false;
    if (!('uiState' in value) || value['uiState'] === undefined) return false;
    return true;
}

export function WsSystemStateFromServerFromJSON(json: any): WsSystemStateFromServer {
    return WsSystemStateFromServerFromJSONTyped(json, false);
}

export function WsSystemStateFromServerFromJSONTyped(json: any, ignoreDiscriminator: boolean): WsSystemStateFromServer {
    if (json == null) {
        return json;
    }
    return {
        
        'gameState': GameStateFromJSON(json['gameState']),
        'uiState': UIStateFromJSON(json['uiState']),
        'errorDetail': json['errorDetail'] == null ? undefined : ErrorDetailFromJSON(json['errorDetail']),
    };
}

  export function WsSystemStateFromServerToJSON(json: any): WsSystemStateFromServer {
      return WsSystemStateFromServerToJSONTyped(json, false);
  }

  export function WsSystemStateFromServerToJSONTyped(value?: WsSystemStateFromServer | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'gameState': GameStateToJSON(value['gameState']),
        'uiState': UIStateToJSON(value['uiState']),
        'errorDetail': ErrorDetailToJSON(value['errorDetail']),
    };
}
