import { FC, Fragment } from "react"
import { useClientState } from "@/hooks/ClientStateProvider"
import { useGameStateFromServer } from "@/hooks/GameStateFromServerProvider"
import { PlayerStateEnum, UIStateCode } from "@/types"
import { Separator } from "@radix-ui/react-separator"
import { FaArrowAltCircleRight } from "react-icons/fa"

export const OverlayPlayersBoard: FC = () => {
    const { gs, playerId, isChoosingPlayer } = useGameStateFromServer()
    const { activeAndoAbility, selectedPlayerIndex } = useClientState()
    const turnPlayerId = gs.gameLogicState.turnPlayerId
    const players = gs.gameLogicState.players
    const showArrowIcon = isChoosingPlayer || activeAndoAbility

    return (

        <div className="flex" style={{
            position: 'absolute',
            bottom: '12px',
            right: '18px',
        }}>
            <div className=" rounded-md min-w-48">
                {
                    players.map((player, index) => {
                        const isTurn = player.playerId === turnPlayerId
                        const isMe = playerId === player.playerId
                        const isReady = player.state === PlayerStateEnum.Ready
                        return (
                            <Fragment key={index}>
                                <div className="pt-4 min-w-8 flex relative">
                                    {showArrowIcon && selectedPlayerIndex === index &&
                                        <FaArrowAltCircleRight size={24} style={{ position: "absolute", left: -42, top: 21 }} />
                                    }
                                    {isTurn && <div
                                        className={`w-3 h-3 mt-3 pl-3 rounded-lg font-bold text-center flex items-center justify-center cursor-pointer transition-all duration-300 ${isMe
                                            ? 'bg-pattarn1-secondary text-white shadow-[0_0_6px_rgba(52,211,153,0.6),_0_0_12px_rgba(52,211,153,0.4)]'
                                            : 'bg-pattarn1-primary text-gray-200 shadow-[0_0_4px_rgba(75,85,99,0.5)]'
                                            }`}
                                    >
                                    </div>}
                                    <p className="pl-6 pr-6 text-xl text-black">
                                        {player.name}
                                    </p>
                                    {isReady && <p>[READY]</p>}
                                </div>
                                <Separator className="mt-4 bg-white" />
                            </Fragment>
                        )
                    })
                }
            </div>
        </div>
    )
}
