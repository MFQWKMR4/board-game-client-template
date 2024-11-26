import { Vec } from "@/games/types"

const DISTANCE_PLAYER_BASE = 18
const DISTANCE_PLAYER_Y = 3

const DISTANCE_CAMERA = 12
const DISTANCE_CAMERA_Y = 11

type CoordinationInfo = {
    position: Vec;
    cameraPosition: Vec;
    axis: 'x' | 'z';
}

export const playersCoordination: CoordinationInfo[] = [
    {
        position: [DISTANCE_PLAYER_BASE, DISTANCE_PLAYER_Y, 0],
        cameraPosition: [DISTANCE_CAMERA, DISTANCE_CAMERA_Y, 0],
        axis: 'x',
    },
    {
        position: [0, DISTANCE_PLAYER_Y, -1 * DISTANCE_PLAYER_BASE],
        cameraPosition: [0, DISTANCE_CAMERA_Y, -1 * DISTANCE_CAMERA],
        axis: 'z',
    },
    {
        position: [-1 * DISTANCE_PLAYER_BASE, DISTANCE_PLAYER_Y, 0],
        cameraPosition: [-1 * DISTANCE_CAMERA, DISTANCE_CAMERA_Y, 0],
        axis: 'x',
    },
    {
        position: [0, DISTANCE_PLAYER_Y, DISTANCE_PLAYER_BASE],
        cameraPosition: [0, DISTANCE_CAMERA_Y, DISTANCE_CAMERA],
        axis: 'z',
    },
];
