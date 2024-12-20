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
import type { Player } from './Player';
import {
    PlayerFromJSON,
    PlayerFromJSONTyped,
    PlayerToJSON,
    PlayerToJSONTyped,
} from './Player';
import type { Environment } from './Environment';
import {
    EnvironmentFromJSON,
    EnvironmentFromJSONTyped,
    EnvironmentToJSON,
    EnvironmentToJSONTyped,
} from './Environment';
import type { Card } from './Card';
import {
    CardFromJSON,
    CardFromJSONTyped,
    CardToJSON,
    CardToJSONTyped,
} from './Card';

/**
 * 
 * @export
 * @interface GameLogicDummy
 */
export interface GameLogicDummy {
    /**
     * 
     * @type {Player}
     * @memberof GameLogicDummy
     */
    player?: Player;
    /**
     * 
     * @type {Array<Card>}
     * @memberof GameLogicDummy
     */
    cards?: Array<Card>;
    /**
     * 
     * @type {Environment}
     * @memberof GameLogicDummy
     */
    environment?: Environment;
}

/**
 * Check if a given object implements the GameLogicDummy interface.
 */
export function instanceOfGameLogicDummy(value: object): value is GameLogicDummy {
    return true;
}

export function GameLogicDummyFromJSON(json: any): GameLogicDummy {
    return GameLogicDummyFromJSONTyped(json, false);
}

export function GameLogicDummyFromJSONTyped(json: any, ignoreDiscriminator: boolean): GameLogicDummy {
    if (json == null) {
        return json;
    }
    return {
        
        'player': json['player'] == null ? undefined : PlayerFromJSON(json['player']),
        'cards': json['cards'] == null ? undefined : ((json['cards'] as Array<any>).map(CardFromJSON)),
        'environment': json['environment'] == null ? undefined : EnvironmentFromJSON(json['environment']),
    };
}

  export function GameLogicDummyToJSON(json: any): GameLogicDummy {
      return GameLogicDummyToJSONTyped(json, false);
  }

  export function GameLogicDummyToJSONTyped(value?: GameLogicDummy | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'player': PlayerToJSON(value['player']),
        'cards': value['cards'] == null ? undefined : ((value['cards'] as Array<any>).map(CardToJSON)),
        'environment': EnvironmentToJSON(value['environment']),
    };
}

