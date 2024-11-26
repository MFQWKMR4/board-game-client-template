import { CardUI, Vec } from "@/games/types";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import Ando from "@/assets/ando_text.png";
import Ueno from "@/assets/ueno_text.png";
import Abe from "@/assets/abe_text.png";
import Bale from "@/assets/bale_text.png";
import { Edges } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import { useClientState } from "@/hooks/ClientStateProvider";
import gsap from "gsap";
import { themeColors } from "@/utils/colors";
import { useGameStateFromServer } from "@/hooks/GameStateFromServerProvider";
import { useTextTextureMaterial } from "@/hooks/useTextTextureMaterial";
import { addX, addY, addZ } from "@/games/vec";

type CardProps = {
    position: Vec;
    rotation: Vec;
    isSelected: boolean;
    card: CardUI;
    color?: number;
}

export function Card3D(props: CardProps) {
    const { position, rotation, isSelected, card } = props;
    const cardRaw = card.card;
    const { axis } = useGameStateFromServer();
    const { setIsRotatingWrapper } = useClientState();

    const meshRef = useRef<THREE.Mesh>(null!);
    const [isRotated, setIsRotated] = useState(false);

    const upper = useMemo(() => {
        return addY(position, 0.3);
    }, [position]);

    const lower = useMemo(() => {
        return addY(position, -0.3);
    }, [position]);

    const mate1 = useTextTextureMaterial(cardRaw.originalChara, 0x000000);
    const mate2 = useTextTextureMaterial(cardRaw.value.toString(), 0x000000);

    useEffect(() => {
        if (meshRef.current && isSelected && isRotated !== card.isRotated) {
            const tmp: THREE.Euler = meshRef.current.rotation;
            const targetRotation = axis === 'x' ? addX(tmp, Math.PI) : addZ(tmp, Math.PI) as Vec;
            gsap.to(meshRef.current.rotation, {
                x: targetRotation[0],
                y: targetRotation[1],
                z: targetRotation[2],
                duration: 1,
                ease: "power2.out",
                onComplete: () => {
                    setIsRotatingWrapper(false);
                    setIsRotated(card.isRotated);
                }
            });
        }
    }, [card.isRotated, rotation]);

    return (
        <group>
            <mesh
                ref={meshRef}
                position={upper}
                rotation={rotation}
                castShadow={true}
            >
                <boxGeometry args={[0.42, 0.42, 0.02]} />
                {mate1}
                {!isSelected && card.isAbleToPlay && <Edges color={themeColors.pattarn1.secondary} lineWidth={3} />}
                {isSelected && <Edges color="yellow" lineWidth={3} />}
            </mesh>
            <mesh
                position={lower}
                rotation={rotation}
                castShadow={true}
            >
                <boxGeometry args={[0.42, 0.42, 0.02]} />
                {mate2}
                {!isSelected && card.isAbleToPlay && <Edges color={themeColors.pattarn1.secondary} lineWidth={3} />}
                {isSelected && <Edges color="yellow" lineWidth={3} />}
            </mesh>
        </group>
    )
}

type RoleCardProps = {
    position: Vec;
    rotation: Vec;
    role: string;
}

export function RoleCard3D(props: RoleCardProps) {
    const { position, rotation, role } = props;

    const texture = useLoader(THREE.TextureLoader, role === "ando" ? Ando : role === "ueno" ? Ueno : role === "abe" ? Abe : Bale);
    const materials = [
        <meshBasicMaterial key={1} attach="material-0" color={0x000000} />,
        <meshBasicMaterial key={2} attach="material-1" color={0x000000} />,
        <meshBasicMaterial key={3} attach="material-2" color={0x000000} />,
        <meshBasicMaterial key={4} attach="material-3" color={0x000000} />,
        <meshBasicMaterial key={5} attach="material-4" color={0x000000} />,
        <meshBasicMaterial key={6} attach="material-5" map={texture} />,
    ];

    return (
        <mesh
            position={position}
            rotation={rotation}
            castShadow={true}
        >
            <boxGeometry args={[0.7, 0.7, 0.02]} />
            {materials}
        </mesh>
    )
}
