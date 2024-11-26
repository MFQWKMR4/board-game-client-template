import { Ending } from "@/component/Ending";
import { memo } from "react";

export type SwitchEndingScreenProps = {
    showEnding: boolean;
    isWin: boolean;
    children: React.ReactNode;
}

export const SwitchEndingScreen = memo((props: SwitchEndingScreenProps) => {
    const { showEnding, isWin, children } = props;
    return showEnding ? <Ending isWin={isWin} /> : <>{children}</>
})
