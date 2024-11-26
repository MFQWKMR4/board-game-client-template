import { ThreeElements } from "@react-three/fiber";
import { FC, memo, useMemo } from "react";
import { Vec } from "@/games/types";
import { Card } from "@/types";
import { textTexture } from "@/games/textTexture";
import React from "react";
import { useGameStateFromServer } from "@/hooks/GameStateFromServerProvider";
import { useTextTextureMaterial } from "@/hooks/useTextTextureMaterial";
import { addZ } from "@/games/vec";

export type CardOnTableProps = ThreeElements['mesh'] & {
    card: Card;
};

export const CardOnTable: FC<CardOnTableProps> = memo((props: CardOnTableProps) => {
    const { card } = props;
    const position = props.position as Vec;

    const mate1 = useTextTextureMaterial(card.chara, 0x000000);
    const mate2 = useTextTextureMaterial(card.value > -1 ? card.value.toString() : "", 0x000000);

    const upper = useMemo(() => {
        return addZ(position, 0.3);
    }, [position]);

    const lower = useMemo(() => {
        return addZ(position, -0.3);
    }, [position]);

    return (

        <>
            <mesh
                key={0}
                {...props}
                position={upper}
                rotation={[Math.PI / 2, 0, 0]}
                castShadow={true}
            >
                <boxGeometry args={[0.42, 0.42, 0.02]} />
                {mate1}
            </mesh>
            <mesh
                key={1}
                {...props}
                position={lower}
                rotation={[Math.PI / 2, 0, 0]}
                castShadow={true}
            >
                <boxGeometry args={[0.42, 0.42, 0.02]} />
                {mate2}
            </mesh>
        </>
    )
})

export type QueueOnTableProps = {
    position: Vec,
    count: number
    cards?: Card[]
};

export const QueueOnTable: FC<QueueOnTableProps> = memo((props: QueueOnTableProps) => {
    const { count, position, cards } = props;
    const { me } = useGameStateFromServer();
    const isBale = me?.personality === "bale";
    const materials = useTextTextureMaterial("", 0x000000);

    const calcPosition = (i: number): Vec => {
        return [position[0] + i * 0.4, position[1], position[2] + i * 0.13];
    }

    const calcPosition2 = (i: number): Vec => {
        return [position[0] + i * 0.4, position[1], position[2] + i * 0.13 + 0.6];
    }

    return (
        <group>
            {isBale ?
                cards && cards.map((card, i) => {
                    const c = textTexture(card.chara);
                    const v = textTexture(card.value.toString());

                    const m1 = [
                        <meshBasicMaterial key={1} attach="material-0" color={0x000000} />,
                        <meshBasicMaterial key={2} attach="material-1" color={0x000000} />,
                        <meshBasicMaterial key={3} attach="material-2" color={0x000000} />,
                        <meshBasicMaterial key={4} attach="material-3" color={0x000000} />,
                        <meshBasicMaterial key={5} attach="material-4" color={0x000000} />,
                        <meshBasicMaterial key={6} attach="material-5" map={c} />,
                    ];

                    const m2 = [
                        <meshBasicMaterial key={1} attach="material-0" color={0x000000} />,
                        <meshBasicMaterial key={2} attach="material-1" color={0x000000} />,
                        <meshBasicMaterial key={3} attach="material-2" color={0x000000} />,
                        <meshBasicMaterial key={4} attach="material-3" color={0x000000} />,
                        <meshBasicMaterial key={5} attach="material-4" color={0x000000} />,
                        <meshBasicMaterial key={6} attach="material-5" map={v} />,
                    ];

                    return (
                        <React.Fragment key={i}>
                            <mesh
                                {...props}
                                position={calcPosition(i)}
                                rotation={[Math.PI / 2, 0, Math.PI]}
                                castShadow={true}
                            >
                                <boxGeometry args={[0.42, 0.42, 0.02]} />
                                {m1}
                            </mesh>
                            <mesh
                                {...props}
                                position={calcPosition2(i)}
                                rotation={[Math.PI / 2, 0, Math.PI]}
                                castShadow={true}
                            >
                                <boxGeometry args={[0.42, 0.42, 0.02]} />
                                {m2}
                            </mesh>
                        </React.Fragment>
                    )
                }) :
                [...Array(count)].map((_, i) => (
                    <React.Fragment key={i}>
                        <mesh
                            {...props}
                            position={calcPosition(i)}
                            rotation={[- Math.PI / 2, 0, 0]}
                            castShadow={true}
                        >
                            <boxGeometry args={[0.42, 0.42, 0.02]} />
                            {materials}
                        </mesh>
                        <mesh
                            {...props}
                            position={calcPosition2(i)}
                            rotation={[- Math.PI / 2, 0, 0]}
                            castShadow={true}
                        >
                            <boxGeometry args={[0.42, 0.42, 0.02]} />
                            {materials}
                        </mesh>
                    </React.Fragment>
                ))}
        </group>
    )
})

export const PoolOnTable: FC<QueueOnTableProps> = memo((props: QueueOnTableProps) => {
    const { count, position } = props;
    const materials = useTextTextureMaterial("", 0x000000);

    const calcPosition = (i: number): Vec => {
        return [position[0], position[1] + i * 0.04, position[2]];
    }
    const calcPosition2 = (i: number): Vec => {
        return [position[0], position[1] + i * 0.04, position[2] + 0.5];
    }

    return (
        <group>
            {[...Array(count)].map((_, i) => (
                <React.Fragment key={i}>
                    <mesh
                        {...props}
                        position={calcPosition(i)}
                        rotation={[- Math.PI / 2, 0, 0]}
                        castShadow={true}
                    >
                        <boxGeometry args={[0.42, 0.42, 0.02]} />
                        {materials}
                    </mesh>
                    <mesh
                        {...props}
                        position={calcPosition2(i)}
                        rotation={[- Math.PI / 2, 0, 0]}
                        castShadow={true}
                    >
                        <boxGeometry args={[0.42, 0.42, 0.02]} />
                        {materials}
                    </mesh>
                </React.Fragment>
            ))}
        </group>
    )
})
