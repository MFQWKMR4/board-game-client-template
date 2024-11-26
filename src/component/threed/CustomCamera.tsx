import { useGameStateFromServer } from "@/hooks/GameStateFromServerProvider";
import { Vec } from "@/games/types";
import { useFrame, useThree } from "@react-three/fiber";
import { useLayoutEffect, useRef } from "react";
import * as THREE from "three";

export function CustomCamera({ target, posX, posZ }: { target: Vec, posX: number, posZ: number }) {
    const cameraRef = useRef<THREE.PerspectiveCamera>(
        new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    );
    const smoothTarget = useRef(new THREE.Vector3(0, 0, 0));
    const set = useThree(({ set }) => set)
    const size = useThree(({ size }) => size)

    const { cameraPosition } = useGameStateFromServer();
    const [x, y, z] = cameraPosition;

    useLayoutEffect(() => {
        if (cameraRef.current) {
            cameraRef.current.aspect = size.width / size.height
            cameraRef.current.position.set(x, y, z)
            cameraRef.current.updateProjectionMatrix()
        }
    }, [size, x, y, z])

    useLayoutEffect(() => {
        set({ camera: cameraRef.current })
    }, [set])

    useFrame(() => {
        if (cameraRef.current) {
            const xPlus = x > 0;
            const xMinus = x < 0;
            const zPlus = z > 0;
            const zMinus = z < 0;
            if (zMinus) {
                const currentPosition = cameraRef.current.position.z;
                cameraRef.current.position.z += (posZ - currentPosition) * 0.1; // 補間速度0.1
                cameraRef.current.updateProjectionMatrix(); // 必要なら投影行列を更新
            } else if (zPlus) {
                const currentPosition = cameraRef.current.position.z;
                cameraRef.current.position.z += (posZ - currentPosition) * 0.1; // 補間速度0.1
                cameraRef.current.updateProjectionMatrix(); // 必要なら投影行列を更新
            } else if (xMinus) {
                const currentPosition = cameraRef.current.position.x;
                cameraRef.current.position.x += (posX - currentPosition) * 0.1; // 補間速度0.1
                cameraRef.current.updateProjectionMatrix(); // 必要なら投影行列を更新
            } else if (xPlus) {
                const currentPosition = cameraRef.current.position.x;
                cameraRef.current.position.x += (posX - currentPosition) * 0.1; // 補間速度0.1
                cameraRef.current.updateProjectionMatrix(); // 必要なら投影行列を更新
            }
        }
        if (cameraRef.current) {
            smoothTarget.current.lerp(new THREE.Vector3(...target), 0.1); // 0.1は補間速度
            cameraRef.current.lookAt(smoothTarget.current); // カメラが補間位置を見る
        }
    });
    return <perspectiveCamera ref={cameraRef} />
}
