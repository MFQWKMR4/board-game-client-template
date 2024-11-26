import { useState, useEffect } from "react";
import { Command } from "@/games/types";

export function useArrowKey() {
    const [direction, setDirection] = useState<Command>("None");
    const pressedKeys = new Set();

    useEffect(() => {
        const handleKeyDown = (event: any) => {
            pressedKeys.add(event.key);

            switch (event.key) {
                case "ArrowUp":
                    setDirection("Up");
                    break;
                case "ArrowDown":
                    setDirection("Down");
                    break;
                case "ArrowLeft":
                    setDirection("Left");
                    break;
                case "ArrowRight":
                    setDirection("Right");
                    break;
                default:
                    break;
            }

            if (pressedKeys.has(" ")) {
                if (pressedKeys.has("f")) {
                    setDirection("SubmitField");
                } else if (pressedKeys.has("s")) {
                    setDirection("SubmitQueue");
                } else if (pressedKeys.has("d")) {
                    setDirection("SubmitPool");
                } else if (pressedKeys.has("q")) {
                    setDirection("ReceiveQueue");
                } else if (pressedKeys.has("w")) {
                    setDirection("ReceivePool");
                } else if (pressedKeys.has("a")) {
                    setDirection("Ability");
                } else if (pressedKeys.has("v")) {
                    setDirection("PowerUp");
                } else if (pressedKeys.has("e")) {
                    setDirection("EndTurn");
                }
            }
        };

        const handleKeyUp = (event: any) => {
            pressedKeys.clear();
            setDirection("None");
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    return direction;
}
