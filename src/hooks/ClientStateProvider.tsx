import { ReactNode, createContext, useContext, useEffect, useMemo, useRef, useState } from "react"
import { useGameStateFromServer } from "@/hooks/GameStateFromServerProvider"
import { Card, Destination, Player, UIStateCode, WsAndoAbility, WsChoosePlayer, WsFetch, WsMessage, WsPlayCard, WsPowerUp, WsReceiveCard } from "@/types"
import { useArrowKey } from "@/hooks/useArrowKey"
import { invert, isAbleToPlay } from "@/games/card"
import { useWs } from "@/hooks/WsProvider"
import { CardUI } from "@/games/types"

type ClientStateContextType = {
    selectedHandIndex: number
    selectedPlayerIndex: number
    handsForUI: CardUI[]
    activeAndoAbility: boolean
    setIsRotatingWrapper: (isRotating: boolean) => void
    setChosenPlayerId: (playerId: string) => void
    handleFetch: () => string
    handlePlayCard: (cards: Card[], destination: Destination) => Promise<void>
    handleReceiveCard: (card: Card | undefined, source: Destination, isSkip: boolean) => Promise<void>
    handleChoosePlayer: () => Promise<void>
    handleAndoAbility: (c: Card) => Promise<void>
}

const DefaultClientStateContext: ClientStateContextType = {
    selectedHandIndex: 0,
    selectedPlayerIndex: 0,
    handsForUI: [],
    activeAndoAbility: false,
    setIsRotatingWrapper: () => { },
    setChosenPlayerId: (_: string) => { },
    handleFetch: () => { return "" },
    handlePlayCard: async (_: Card[], __: Destination) => { },
    handleReceiveCard: async (_: Card | undefined, __: Destination, ___: boolean) => { },
    handleChoosePlayer: async () => { },
    handleAndoAbility: async (_: Card) => { }
}

export const ClientStateContext: React.Context<ClientStateContextType> = createContext(DefaultClientStateContext)

export function ClientStateProvider({ children }: { children?: ReactNode }) {

    const { sendMessage } = useWs()
    const { gs, uiState, playerId, me, isChoosingPlayer } = useGameStateFromServer()

    const [selectedHandIndex, setSelectedHandIndex] = useState(DefaultClientStateContext.selectedHandIndex)
    const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(DefaultClientStateContext.selectedPlayerIndex)
    const [handsForUI, setHandsForUI] = useState<CardUI[]>(DefaultClientStateContext.handsForUI)
    const isRotatingRef = useRef(false); // useRefで即時状態を管理 アニメーション中かどうか
    const [activeAndoAbility, setActiveAndoAbility] = useState(false)
    const [chosenPlayerId, setChosenPlayerId] = useState('')

    // const [activeAndoAbility, setActiveAndoAbility] = useState("none" as AndoAbilityUI)

    const setIsRotatingWrapper = (isRotating: boolean) => {
        isRotatingRef.current = isRotating
    }

    const uiCode = uiState.uiStateCode
    const { gameLogicState } = gs
    const { orderedPlayerIds, } = gameLogicState

    const handleFetch = () => {
        const body: WsFetch = {
            playerId,
        }
        const msg: WsMessage = {
            messageType: 'WsFetch',
            body: body
        }
        return JSON.stringify(msg)
    }

    const handlePowerUp = async (card: Card) => {
        const body: WsPowerUp = {
            playerId,
            card
        }
        const msg: WsMessage = {
            messageType: 'WsPowerUp',
            body: body
        }
        await sendMessage(JSON.stringify(msg))
    }

    const handlePlayCard = async (cards: Card[], destination: Destination) => {

        if (cards.length === 0) return
        const c = cards[0]
        if (c.value === -1) return

        const body: WsPlayCard = {
            playerId,
            cards,
            destination
        }
        const msg: WsMessage = {
            messageType: 'WsPlayCard',
            body: body
        }
        await sendMessage(JSON.stringify(msg))
    }

    const handleReceiveCard = async (card: Card | undefined, source: Destination, isSkip: boolean) => {

        if (isSkip) {
            const body: WsReceiveCard = {
                playerId,
                card: undefined,
                source: Destination.Skip,
                isSkip: true
            }
            const msg: WsMessage = {
                messageType: 'WsReceiveCard',
                body: body
            }
            await sendMessage(JSON.stringify(msg))
        } else {
            const body: WsReceiveCard = {
                playerId,
                card,
                source,
                isSkip
            }
            const msg: WsMessage = {
                messageType: 'WsReceiveCard',
                body: body
            }
            await sendMessage(JSON.stringify(msg))
        }
    }

    const handleChoosePlayer = async () => {
        if (chosenPlayerId === '') {
            return
        }
        const undo = ([UIStateCode.UndoEffect1, UIStateCode.UndoEffect2] as UIStateCode[]).includes(uiState.uiStateCode)
        const peeq = ([UIStateCode.PeeqEffect1, UIStateCode.PeeqEffect2] as UIStateCode[]).includes(uiState.uiStateCode)

        const body: WsChoosePlayer = {
            playerId,
            targetPlayerId: chosenPlayerId,
            effect: undo ? 'undo' : peeq ? 'peeq' : ''
        }
        const msg: WsMessage = {
            messageType: 'WsChoosePlayer',
            body: body
        }
        await sendMessage(JSON.stringify(msg))
        setChosenPlayerId('')
    }

    const handleAndoAbility = async (c: Card) => {
        if (chosenPlayerId === '') {
            return
        }
        const body: WsAndoAbility = {
            playerId,
            targetPlayerId: chosenPlayerId,
            card: c
        }
        const msg: WsMessage = {
            messageType: 'WsAndoAbility',
            body: body
        }
        await sendMessage(JSON.stringify(msg))
        setChosenPlayerId('')
    }

    const command = useArrowKey()

    useEffect(() => {
        if (me?.hands) {
            const handsForUI = me.hands.map((card, index) => {
                const playable = isAbleToPlay(card)
                return { card, isRotated: false, isAbleToPlay: playable }
            })
            setHandsForUI(handsForUI)
        }
    }, [me]);

    useEffect(() => {
        console.log("###command", command)
        console.log("###handsForUI", handsForUI)

        if (me?.hands && handsForUI && command) {
            if (command === 'Left') {
                console.log("###left", selectedHandIndex)
                setSelectedHandIndex(Math.max(0, selectedHandIndex - 1))
            } else if (command === 'Right') {
                console.log("###right", selectedHandIndex)
                setSelectedHandIndex(Math.min(me.hands.length - 1, selectedHandIndex + 1))
            } else if (command === 'Up' || command === 'Down') {
                if (activeAndoAbility || isChoosingPlayer) {
                    if (command === 'Up') {
                        const nextIndex = (selectedPlayerIndex - 1 + 4) % 4 as 0 | 1 | 2 | 3
                        setChosenPlayerId(orderedPlayerIds[nextIndex])
                        setSelectedPlayerIndex(nextIndex)
                    } else {
                        const nextIndex = (selectedPlayerIndex + 1) % 4 as 0 | 1 | 2 | 3
                        setChosenPlayerId(orderedPlayerIds[nextIndex])
                        setSelectedPlayerIndex(nextIndex)
                    }
                } else {
                    console.log("###updown", isRotatingRef.current)
                    setTimeout(() => {
                        setIsRotatingWrapper(false)
                    }, 2000);
                    if (isRotatingRef.current) return
                    setIsRotatingWrapper(true)

                    const card = me.hands[selectedHandIndex]
                    if (card) {
                        const hs: CardUI[] = handsForUI.map((c, index) => {
                            if (index === selectedHandIndex) {
                                const nextState = !c.isRotated
                                let nextC = c.card.originalChara
                                if (nextState) {
                                    nextC = invert(c.card.originalChara)
                                }
                                const newCard: Card = {
                                    ...c.card,
                                    conditionsToPlay: card.conditionsToPlay,
                                    chara: nextC,
                                }
                                const playable = isAbleToPlay(newCard)
                                return {
                                    card: newCard,
                                    isRotated: nextState,
                                    isAbleToPlay: playable
                                }
                            } else {
                                return c
                            }
                        })
                        setHandsForUI(hs)
                    }


                }
            } else if (command === 'SubmitField') {
                const c = handsForUI[selectedHandIndex]
                if (c && activeAndoAbility) {
                    handleAndoAbility(c.card)
                    setSelectedHandIndex(0)
                    setActiveAndoAbility(false)
                } else if (isChoosingPlayer) {
                    handleChoosePlayer()
                } else {
                    const playable = ([UIStateCode.InYourTurn, UIStateCode.PlayOneCard] as UIStateCode[]).includes(uiCode);
                    if (c && c.isAbleToPlay && playable) {
                        handlePlayCard([c.card], Destination.Field)
                        setSelectedHandIndex(0)
                    }
                }
            } else if (command === 'SubmitQueue') {
                const c = handsForUI[selectedHandIndex]
                const playable = ([UIStateCode.InYourTurn] as UIStateCode[]).includes(uiCode);
                if (c && playable) {
                    handlePlayCard([c.card], Destination.CardQueue)
                    setSelectedHandIndex(0)
                }
            } else if (command === 'SubmitPool') {
                const c = handsForUI[selectedHandIndex]
                const playable = ([UIStateCode.InYourTurn] as UIStateCode[]).includes(uiCode);
                if (c && playable) {
                    handlePlayCard([c.card], Destination.CardPool)
                    setSelectedHandIndex(0)
                }
            } else if (command === 'Ability') {
                if (me.personality === "ando" && gameLogicState.andoAbilityCount < 2) {
                    setActiveAndoAbility(!activeAndoAbility)
                }
            } else if (command === 'PowerUp') {
                const c = handsForUI[selectedHandIndex]
                const available = ([UIStateCode.InYourTurn, UIStateCode.PlayOneCard, UIStateCode.PlayTwoCard, UIStateCode.PlayCardToOther] as UIStateCode[]).includes(uiCode);
                if (c && available) {
                    handlePowerUp(c.card)
                }
            } else if (command === 'ReceiveQueue') {

                const receivable = ([UIStateCode.InYourTurn, UIStateCode.PlayOneCard, UIStateCode.PlayTwoCard, UIStateCode.PlayCardToOther] as UIStateCode[]).includes(uiCode);
                if (!receivable || me?.cannotReceiveCard) return;

                handleReceiveCard(undefined, Destination.CardQueue, false)
            } else if (command === 'ReceivePool') {

                const receivable = ([UIStateCode.InYourTurn, UIStateCode.PlayOneCard, UIStateCode.PlayTwoCard, UIStateCode.PlayCardToOther] as UIStateCode[]).includes(uiCode);
                if (!receivable || me?.cannotReceiveCard) return;

                handleReceiveCard(undefined, Destination.CardPool, false)
            } else if (command === 'EndTurn') {
                handleReceiveCard(undefined, Destination.Skip, true)
            }
        }
    }, [command])

    return (
        <ClientStateContext.Provider value={{
            selectedHandIndex,
            selectedPlayerIndex,
            handsForUI,
            activeAndoAbility,
            setIsRotatingWrapper,
            handleFetch,
            handlePlayCard,
            handleReceiveCard,
            handleChoosePlayer,
            handleAndoAbility,
            setChosenPlayerId,
        }}>
            {children}
        </ClientStateContext.Provider>
    )
}

export function useClientState() {
    return useContext(ClientStateContext)
}
