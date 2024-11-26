import { LoadingSpinner } from "@/component/Loading";
import { memo } from "react";

export type SwitchWaitingScreenProps = {
    isWaiting: boolean;
    children: React.ReactNode;
}

export const SwitchWaitingScreen = memo((props: SwitchWaitingScreenProps) => {
    const { isWaiting, children } = props;

    return (
        isWaiting ?
            (<div className="w-full h-screen flex items-center justify-center">
                <div className='flex flex-col'>
                    <LoadingSpinner />
                    <p className='mt-12 pl-2'>Waiting for other players ..</p>
                </div>
            </div>)
            :
            <>{children}</>
    )
})
