import { useGameStateFromServer } from "@/hooks/GameStateFromServerProvider"
import { FC } from "react"

export const OverlayStringDisplay: FC = () => {
    const { gs } = useGameStateFromServer()
    const sequence = gs.gameLogicState.environment.field.sequence
    return (
        <div className="flex" style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
        }}>
            <p
                className=" mt-2 text-4xl"
            >Current String: {sequence}</p>
        </div>
    )
}
