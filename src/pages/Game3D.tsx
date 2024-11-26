import { FC, useEffect } from 'react'
import * as THREE from 'three'
import { useWs } from '@/hooks/WsProvider'
import { useGameStateFromServer } from '@/hooks/GameStateFromServerProvider'
import { Canvas } from '@react-three/fiber'
import { CustomCamera } from '@/component/threed/CustomCamera'
import { Room } from '@/component/threed/Room'
import { Hands } from '@/component/threed/Hands'
import { Vec } from '@/games/types'
import { CardOnTable, PoolOnTable, QueueOnTable } from '@/component/threed/CardOnTable'
import { MainTable } from '@/component/threed/MainTable'
import { playersCoordination } from '@/games/coordinations'
import { useClientState } from '@/hooks/ClientStateProvider'
import { useCheckEnding } from '@/hooks/useCheckEnding'
import { useCameraPosition } from '@/hooks/useCameraPosition'
import { SwitchWaitingScreen } from '@/component/SwitchWaitingScreen'
import { SwitchEndingScreen } from '@/component/SwitchEndingScreen'
import { OverlayStringDisplay } from '@/component/OverlayStringDisplay'
import { OverlayChat } from '@/component/OverlayChat'
import { OverlayPlayersBoard } from '@/component/OverlayPlayersBoard'
import { OverlayInstructions } from '@/component/OverlayInstructions'
import { Helper } from '@/component/threed/Helper'

const Game3D: FC = () => {
    const { sendMessageForSure } = useWs()
    const { gs, playerId, cameraPosition, uiState, isWaiting } = useGameStateFromServer()
    const { handleFetch } = useClientState()

    const { gameLogicState } = gs
    const players = gs.gameLogicState.players;
    const { environment } = gameLogicState
    const que = environment.cardQueue;
    const pool = environment.cardPool;
    const field = environment.field;

    const checkEnding = useCheckEnding(uiState)
    const { target, cameraD, handleWheel, onClickTable } = useCameraPosition(cameraPosition)

    useEffect(() => {
        if (gs.numberOfPlayers === 0) {
            sendMessageForSure(handleFetch())
        }
    }, [isWaiting, playerId])

    return (
        <SwitchWaitingScreen isWaiting={isWaiting}>
            <SwitchEndingScreen showEnding={checkEnding.showEnding} isWin={checkEnding.isWin}>
                <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
                    <Canvas
                        onWheel={handleWheel}
                    >
                        <Helper isAxis={false} isGrid={false} />
                        <CustomCamera target={target} posX={cameraD} posZ={cameraD} />
                        <directionalLight
                            castShadow={true}
                            position={[10, 18, 10]}
                            intensity={2} />
                        <Room />
                        {
                            playersCoordination.map((p, index) => {
                                const a = players[index];
                                return <Hands
                                    key={index}
                                    playerIndex={index}
                                    playerPosition={p.position as Vec}
                                    tableCenter={new THREE.Vector3(0, 1, 0)}
                                    role={a ? a.personality : ''}
                                />
                            })
                        }
                        <CardOnTable position={[0, 5.3, 0]} card={field.top} />
                        <QueueOnTable position={[-2, 5.3, -3]} count={que.amount} cards={que.cards} />
                        <PoolOnTable position={[-2, 5.3, 0]} count={pool.amount} />
                        <MainTable position={[0, 0, 0]} onClick={onClickTable} />
                    </Canvas>
                    <OverlayStringDisplay />
                    <OverlayChat />
                    <OverlayPlayersBoard />
                    <OverlayInstructions />
                </div>
            </SwitchEndingScreen>
        </SwitchWaitingScreen>
    )
}

export default Game3D