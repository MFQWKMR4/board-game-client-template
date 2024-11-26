import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export type EndingProps = {
    isWin: boolean;
}

export const Ending = (props: EndingProps) => {

    const { isWin } = props

    const [opacity, setOpacity] = useState(0)

    useEffect(() => {
        setTimeout(() => {
            setOpacity(1)
        }, 600)
    }, [])

    return (
        <div className="absolute w-screen h-screen bg-pattarn1-secondary border-4 border-gray-500 shadow-lg flex flex-col items-center justify-center transition-opacity duration-500" style={{ opacity }}>
            {/* テキストを中央に配置 */}
            <h1 className="text-6xl text-white mb-4 absolute top-1/2 transform -translate-y-1/2">
                {isWin ? "You Win!" : "You Lose ..."}
            </h1>

            {/* ボタンをh1の下側に配置 */}
            <Button
                className="mt-40 px-3 py-1 bg-pattarn1-primary text-white rounded-lg shadow-md"
                onClick={() => {
                    window.location.href = "/";
                }}
            >
                GO TO TOP
            </Button>
        </div>
    )
}
