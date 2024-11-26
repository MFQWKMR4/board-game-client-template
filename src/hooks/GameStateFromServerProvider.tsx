import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react"
import { jwtDecode } from "jwt-decode"
import { useWs } from "@/hooks/WsProvider"
import { GamePhase, GameState, Player, UIState, UIStateCode, WsSystemStateFromServer } from "@/types"
import { useMeta } from "@/hooks/MetaProvider"
import { emptyCard } from "@/games/card"
import { ifThen } from "@/utils/fp"
import { Vec } from "@/games/types"
import { playersCoordination } from '@/games/coordinations'

const initialState: GameState = {
    name: 'game',
    playerIds: [],
    phase: GamePhase.Waiting,
    numberOfPlayers: 0,
    gameLogicState: {
        deck: [],
        turnPlayerId: '',
        turnNumber: 0,
        orderedPlayerIds: [],
        players: [],
        environment: {
            field: {
                top: emptyCard(),
                sequence: "",
            },
            cardPool: {
                amount: 0,
            },
            cardQueue: {
                amount: 0,
            }
        },
        isRevolving: false,
        chatHistory: [],
        forClient: {},
        skipCount: 0,
        bannedChara: [],
        loopSnapShot: {},
        isNoAction: false,
        andoAbilityCount: 0,
        isBoon: false,
        readyCount: 0,
    },
    versionId: ''
}

type GameStateFromServerContextType = {
    // state
    playerId: string
    gs: GameState
    uiState: UIState
    isWaiting: boolean
    // computed
    me: Player | undefined
    isMyTurn: boolean
    isChoosingPlayer: boolean
    myIndex: number
    handCountMap: { [playerIndex: number]: number }
    playerBasePosition: Vec
    cameraPosition: Vec
    axis: "x" | "z"
}

const DefaultGameStateFromServerContext: GameStateFromServerContextType = {
    playerId: '',
    gs: initialState,
    uiState: {
        phase: GamePhase.Waiting,
        uiStateCode: UIStateCode.Initializing
    },
    isMyTurn: false,
    isChoosingPlayer: false,
    me: undefined,
    isWaiting: true,
    myIndex: 0,
    handCountMap: {},
    playerBasePosition: [0, 0, 0],
    cameraPosition: [0, 0, 0],
    axis: "x"
}

export const GameStateFromServerContext: React.Context<GameStateFromServerContextType> = createContext(DefaultGameStateFromServerContext)

// Clientの状態に関係なく計算できるものはここで計算し保持する
export function GameStateFromServerProvider({ children }: { children?: ReactNode }) {
    const { setEd } = useMeta()
    const { wsMessage, sendMessage } = useWs()

    // states
    const [playerId, setPlayerId] = useState('')

    // computations
    const gs = useMemo(() => {
        if (wsMessage === null) return initialState;
        switch (wsMessage.messageType) {
            case 'WsSystemStateFromServer':
                const body = wsMessage.body as WsSystemStateFromServer;
                if (body.errorDetail) {
                    console.error('Error from server', body.errorDetail)
                    return initialState
                }
                const gameState = body.gameState;
                gameState.versionId = gameState.versionId + 'atclient'
                return gameState
            default:
                console.error('Unknown messageType', wsMessage.messageType)
                return initialState
        }
    }, [wsMessage])

    const uiState = useMemo(() => {
        if (wsMessage === null) {
            return {
                phase: GamePhase.Waiting,
                uiStateCode: UIStateCode.Initializing
            }
        }
        switch (wsMessage.messageType) {
            case 'WsSystemStateFromServer':
                const body = wsMessage.body as WsSystemStateFromServer;
                return body.uiState
            default:
                console.error('Unknown messageType', wsMessage.messageType)
                return {
                    phase: GamePhase.Waiting,
                    uiStateCode: UIStateCode.Initializing
                }
        }
    }, [wsMessage])

    const isWaiting = useMemo(() => {
        return uiState.phase === GamePhase.Waiting || uiState.uiStateCode === UIStateCode.Initializing
    }, [uiState])

    const { gameLogicState } = gs
    const {
        deck,
        turnPlayerId,
        turnNumber,
        orderedPlayerIds,
        players,
        environment,
        isRevolving,
        forClient,
        chatHistory,
        skipCount,
        bannedChara,
        loopSnapShot,
        isNoAction,
        andoAbilityCount
    } = gameLogicState

    const me = useMemo(() => {
        return players.find(p => p.playerId === playerId)
    }, [players, playerId])

    const isMyTurn = useMemo(() => (uiState.uiStateCode !== UIStateCode.InOthersTurn), [uiState])

    const isChoosingPlayer = useMemo(
        () => ([UIStateCode.UndoEffect1, UIStateCode.UndoEffect2, UIStateCode.PeeqEffect1, UIStateCode.PeeqEffect2] as UIStateCode[]).includes(uiState.uiStateCode), [uiState])

    const myIndex = useMemo(() => (orderedPlayerIds.indexOf(playerId)), [orderedPlayerIds, playerId])

    const handCountMap = useMemo(() => {
        return players.reduce((acc, p, index) => {
            acc[index] = p.handsCount
            return acc
        }, {} as { [playerIndex: number]: number })
    }, [players])

    const playerBasePosition = useMemo(() => {
        const coord = playersCoordination[myIndex]
        return ifThen(!!coord, () => coord.position, () => [0, 0, 0] as Vec)
    }, [playersCoordination, myIndex])

    const cameraPosition = useMemo(() => {
        const coord = playersCoordination[myIndex]
        return ifThen(!!coord, () => coord.cameraPosition, () => [0, 0, 0] as Vec)
    }, [playersCoordination, myIndex])

    const axis = useMemo(() => {
        const coord = playersCoordination[myIndex]
        return ifThen(!!coord, () => coord.axis, () => 'x' as 'x' | 'z')
    }, [playersCoordination, myIndex])

    // effects
    useEffect(() => {
        const token = localStorage.getItem('jwt')
        if (!token) {
            console.error('No token')
        } else {
            const decoded = jwtDecode<{ playerId: string, roomId: string }>(token);
            setPlayerId(decoded.playerId)
        }
    }, [])

    return (
        <GameStateFromServerContext.Provider value={{
            gs,
            uiState,
            playerId,
            isWaiting,
            // computed
            me,
            isMyTurn,
            isChoosingPlayer,
            myIndex,
            handCountMap,
            playerBasePosition,
            cameraPosition,
            axis,
        }}>
            {children}
        </GameStateFromServerContext.Provider>
    )
}

export function useGameStateFromServer() {
    return useContext(GameStateFromServerContext)
}
