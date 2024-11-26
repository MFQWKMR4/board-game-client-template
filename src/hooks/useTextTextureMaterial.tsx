import { textTexture } from "@/games/textTexture";
import { Color } from "@react-three/fiber";
import { useMemo } from "react";

export function useTextTextureMaterial(text: string, color: Color): JSX.Element[] {
    const mat = useMemo(() => {
        const c = textTexture(text);
        return [
            <meshBasicMaterial key={1} attach="material-0" color={color} />,
            <meshBasicMaterial key={2} attach="material-1" color={color} />,
            <meshBasicMaterial key={3} attach="material-2" color={color} />,
            <meshBasicMaterial key={4} attach="material-3" color={color} />,
            <meshBasicMaterial key={5} attach="material-4" color={color} />,
            <meshBasicMaterial key={6} attach="material-5" map={c} />,
        ]
    }, [text, color]);

    return mat;
}
