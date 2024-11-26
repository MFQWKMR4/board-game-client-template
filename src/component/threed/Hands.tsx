import { Vec } from "@/games/types";
import { ThreeElements } from "@react-three/fiber";
import * as THREE from "three";
import { Card3D, RoleCard3D } from "@/component/threed/Card";
import { emptyCardForUI } from "@/games/card";
import { useCallback, useMemo } from "react";
import { useClientState } from "@/hooks/ClientStateProvider";
import { useGameStateFromServer } from "@/hooks/GameStateFromServerProvider";

export type HandsProps = {
    playerIndex: number,
    playerPosition: Vec;
    tableCenter: THREE.Vector3,
    role: string;
} & ThreeElements['mesh'];

export function Hands(props: HandsProps) {

    const { playerIndex, playerPosition, tableCenter, role } = props;
    const { handCountMap, myIndex } = useGameStateFromServer();
    const { handsForUI, selectedHandIndex } = useClientState();

    const n = handCountMap[playerIndex];
    const isMe = playerIndex === myIndex;
    const hands = isMe ? handsForUI : new Array(n).fill(0)
    const position = {
        x: playerPosition[0],
        y: playerPosition[1],
        z: playerPosition[2],
    }
    const radius = 14;
    const heightAboveTable = 3;
    const angleToFacePlayer = Math.atan2(position.z - tableCenter.z, position.x - tableCenter.x);
    const center = (hands.length - 1) / 2;

    const positionFunc = useCallback((angleOffset: number) => {
        if (playerIndex == 1) {
            const x = position.x + Math.sin(angleOffset) * radius;
            const y = position.y + heightAboveTable;
            const z = position.z + Math.cos(angleOffset) * radius;
            return [x, y, z];
        } else if (playerIndex == 2) {
            const x = position.x + Math.cos(angleOffset) * radius;
            const y = position.y + heightAboveTable;
            const z = position.z + Math.sin(angleOffset) * radius;
            return [x, y, z];
        } else if (playerIndex == 3) {
            const x = position.x + Math.sin(angleOffset) * radius;
            const y = position.y + heightAboveTable;
            const z = position.z - Math.cos(angleOffset) * radius;
            return [x, y, z];
        } else if (playerIndex == 0) {
            const x = position.x - Math.cos(angleOffset) * radius;
            const y = position.y + heightAboveTable;
            const z = position.z - Math.sin(angleOffset * -1) * radius;
            return [x, y, z];
        }
        throw new Error('Invalid player index');
    }, [playerIndex, position, radius, heightAboveTable]);

    const rotation: Vec = useMemo(() => {
        if (playerIndex == 1) {
            return [-Math.PI / 32, angleToFacePlayer + Math.PI * 1 / 2, 0];
        } else if (playerIndex == 2) {
            return [0, angleToFacePlayer + Math.PI * 3 / 2, 0];
        } else if (playerIndex == 3) {
            return [Math.PI / 32, angleToFacePlayer + Math.PI / 2, 0];
        } else if (playerIndex == 0) {
            return [0, angleToFacePlayer + Math.PI * 3 / 2, 0];
        }
        throw new Error('Invalid player index');
    }, [playerIndex, angleToFacePlayer]);

    const rolePositon: Vec = useMemo(() => {
        const pos = positionFunc(0);
        return [pos[0], pos[1] + 1, pos[2]];
    }, [positionFunc]);

    return (
        <group>
            {hands.map((h, index) => {
                const angleOffset = (Math.PI / 70) * (index - center);
                const pos = positionFunc(angleOffset);
                const notMe = (typeof h === 'number')
                const c = notMe ? emptyCardForUI() : h;
                return <Card3D
                    key={index}
                    position={pos as Vec}
                    rotation={rotation as Vec}
                    card={c}
                    isSelected={!notMe && index === selectedHandIndex}
                />
            })}

            <RoleCard3D position={rolePositon} rotation={rotation} role={role} />
        </group>
    )
}
