
import { useState, useEffect, WheelEventHandler } from "react";
import { ThreeEvent } from "@react-three/fiber";
import { Vec } from "@/games/types";

export function useCameraPosition(cameraPosition: Vec) {

    const [target, setTarget] = useState<[number, number, number]>([0, 0, 0]);
    const [cameraD, setCameraD] = useState(0);

    const onClickTable = (event: ThreeEvent<MouseEvent>) => {
        setTarget([event.point.x, event.point.y, event.point.z]);
    };
    const handleWheel: WheelEventHandler = (event: React.WheelEvent<Element>) => {
        if (cameraD < 0) {
            const add = event.deltaY * 0.01;
            setCameraD(Math.max(-20, Math.min(cameraD + add, -1)));
        } else {
            const add = event.deltaY * 0.01;
            setCameraD(Math.max(1, Math.min(cameraD + add, 20)));
        }
    }

    useEffect(() => {
        const d = cameraPosition[0] == 0 ? cameraPosition[2] : cameraPosition[0];
        setCameraD(d);
    }, [cameraPosition])

    return {
        target,
        cameraD,
        onClickTable,
        handleWheel,
    };
}
