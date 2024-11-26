import { useMemo, useRef } from "react";
import * as THREE from "three";
import { ThreeElements } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const TABLE_GLB_URL: string = import.meta.env.GLB_URL;

export const MainTable = (props: ThreeElements['mesh']) => {
    const ref = useRef<THREE.Mesh>(null!);
    const { scene } = useGLTF(TABLE_GLB_URL, true);
    const memoizedScene = useMemo(() => scene.clone(), [scene]);

    return <primitive
        {...props}
        ref={ref}
        object={memoizedScene}
        scale={[16, 16, 16]} />;
}
