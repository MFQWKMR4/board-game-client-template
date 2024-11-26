import { useClientState } from "@/hooks/ClientStateProvider"
import { useGameStateFromServer } from "@/hooks/GameStateFromServerProvider"
import { FC } from "react"

export const OverlayInstructions: FC = () => {

    const { gs, me, isChoosingPlayer } = useGameStateFromServer()
    const { activeAndoAbility } = useClientState()

    const power = me?.power
    const isAndo = me?.personality === "ando"
    const environment = gs.gameLogicState.environment
    const queue = environment.cardQueue.cards
    const pool = environment.cardPool.cards
    const isUsual = !activeAndoAbility && !isChoosingPlayer

    return (
        <div style={{
            position: 'absolute',
            bottom: '16px',
            left: '16px',
            color: 'black',
            fontSize: '14px',
            pointerEvents: 'none' // マウス操作を無効化（背景の3D操作を邪魔しない）
        }}>
            <p>Arrow ←/→ : select a card</p>
            {activeAndoAbility || isChoosingPlayer ? <p>Arrow ↑/↓ : choose player</p> : <p>Arrow ↑/↓ : rotate a card</p>}
            {activeAndoAbility ? <p>Space + F : submit a card to the player</p> : (isChoosingPlayer ? <p>Space + F : submit the player</p> : <p>Space + F : submit to field</p>)}
            {isUsual && queue && <p>Space + S : submit to queue</p>}
            {isUsual && pool && <p>Space + D : submit to pool</p>}
            {isUsual && <p>Space + V : increment selected card's value (remaining power {power || 0}) </p>}
            {isUsual && queue && <p>Space + Q : receive from queue</p>}
            {isUsual && pool && <p>Space + W : receive from pool</p>}
            {isAndo && <p>Space + A : activate ability</p>}
            {isUsual && <p>Space + E : end turn</p>}
            <p>Scroll    : zoom in / out</p>
        </div>
    );
}
