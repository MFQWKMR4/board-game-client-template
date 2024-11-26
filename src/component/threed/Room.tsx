import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import Wall from "@/assets/wall2.jpg";
import Floor from "@/assets/floor.png";
import { FC, memo } from "react";

export const Room: FC = memo(() => {
    const frontTexture = useLoader(THREE.TextureLoader, Wall);
    const floorTexture = useLoader(THREE.TextureLoader, Floor);
    const materials = [
        <meshBasicMaterial key={1} attach="material-0" map={frontTexture} side={THREE.BackSide} />,
        <meshBasicMaterial key={2} attach="material-1" map={frontTexture} side={THREE.BackSide} />,
        <meshBasicMaterial key={3} attach="material-2" color={0x333333} side={THREE.BackSide} />,
        <meshBasicMaterial key={4} attach="material-3" map={floorTexture} side={THREE.BackSide} />, // ゆか
        <meshBasicMaterial key={5} attach="material-4" map={frontTexture} side={THREE.BackSide} />,
        <meshBasicMaterial key={6} attach="material-5" map={frontTexture} side={THREE.BackSide} />,
    ];
    return (
        <mesh
            position={[0, 18, 0]}
            receiveShadow={true}
            castShadow={true}>
            <boxGeometry args={[36, 36, 36]} />
            {materials}
        </mesh>
    )
})
