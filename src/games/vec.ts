import { Vec } from "@/games/types";
import * as THREE from "three";

export const addX = (v: Vec | THREE.Euler, x: number): Vec => {
    if (v instanceof THREE.Euler) {
        return [v.x + x, v.y, v.z]
    } else {
        return [v[0] + x, v[1], v[2]]
    }
}

export const addY = (v: Vec | THREE.Euler, y: number): Vec => {
    if (v instanceof THREE.Euler) {
        return [v.x, v.y + y, v.z]
    } else {
        return [v[0], v[1] + y, v[2]]
    }
}

export const addZ = (v: Vec | THREE.Euler, z: number): Vec => {
    if (v instanceof THREE.Euler) {
        return [v.x, v.y, v.z + z]
    } else {
        return [v[0], v[1], v[2] + z]
    }
}
