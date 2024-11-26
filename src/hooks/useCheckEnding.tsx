import { useState, useEffect } from "react";
import { GamePhase, UIState, UIStateCode } from "@/types";

export function useCheckEnding(uiState: UIState) {
    const [showEnding, setShowEnding] = useState(false);
    const [isWin, setIsWin] = useState(false);
    const { phase, uiStateCode } = uiState;

    useEffect(() => {
        if (uiStateCode === UIStateCode.YouWon && phase === GamePhase.End) {
            setTimeout(() => {
                setShowEnding(true);
                setIsWin(true);
            }, 3000);
        } else if (uiStateCode === UIStateCode.YouLost && phase === GamePhase.End) {
            setTimeout(() => {
                setShowEnding(true);
                setIsWin(false);
            }, 3000);
        }
    }, [uiState.phase]);

    return {
        showEnding: showEnding,
        isWin: isWin,
    };
}
