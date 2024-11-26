import { Card } from "@/types"
import { HANDS_X, HANDS_X_INTERVAL, HANDS_Y, CARD_WIDTH, CARD_HEIGHT, CARD_POOL, CARD_QUEUE } from "@/games/canvas"
import { CardUI } from "@/games/types"

export const emptyCard = (): Card => {
    return {
        id: "0-0",
        originalChara: "",
        chara: "",
        value: -1,
        conditionsToPlay: [],
    }
}

export const emptyCardForUI = (): CardUI => {
    const c = {
        card: emptyCard(),
        isRotated: false,
        isAbleToPlay: false,
    }
    return c
}

export const isAbleToPlay = (card: Card): boolean => {
    const char = card.chara
    const condition = card.conditionsToPlay.filter((c) => c.chara === char)
    const isAble = condition.length > 0 && condition[0].isAbleToPlay

    return isAble
}

export interface CanvasCard {
    x: number;
    y: number;
    w: number;
    h: number;
    angle: number;
    withRotateButton?: boolean;
    card: Card;
    isAbleToPlay: boolean;
}

export const toCanvasHands = (current: Card[], newCards: Card[]): CanvasCard[] => {
    // console.log(cards);
    return newCards.map((card, i) => {
        const currentCard = current.find((c) => c.id === card.id)
        let updatedCard = card
        if (currentCard) {
            updatedCard = {
                ...card,
                chara: currentCard.chara,
            }
        }
        return {
            x: HANDS_X + HANDS_X_INTERVAL * i,
            y: HANDS_Y,
            w: CARD_WIDTH,
            h: CARD_HEIGHT,
            angle: 0,
            isRotated: false,
            card: updatedCard,
            isAbleToPlay: isAbleToPlay(updatedCard),
        }
    });
}

export const toCanvasCardPool = (cards: Card[]): CanvasCard[] => {
    // console.log(cards);

    const dx = (CARD_POOL.WIDTH - CARD_WIDTH) / 2 - 5;
    const dy = (CARD_POOL.HEIGHT - CARD_HEIGHT) / 2 - 5;

    return cards.map((card, i) => ({
        x: CARD_POOL.X - dx + HANDS_X_INTERVAL * i,
        y: CARD_POOL.Y - dy,
        w: CARD_WIDTH,
        h: CARD_HEIGHT,
        angle: 0,
        isRotated: false,
        card,
        isAbleToPlay: false,
    }));
}

export const toCanvasCardQueue = (cards: Card[]): CanvasCard[] => {
    const dx = (CARD_QUEUE.WIDTH - CARD_WIDTH) / 2 - 5;
    const dy = (CARD_QUEUE.HEIGHT - CARD_HEIGHT) / 2 - 5;

    return cards.map((card, i) => ({
        x: CARD_QUEUE.X - dx + HANDS_X_INTERVAL * (i % 5),
        y: CARD_QUEUE.Y - dy + (Math.floor(i / 5) * 50),
        w: CARD_WIDTH,
        h: CARD_HEIGHT,
        angle: 0,
        isRotated: false,
        card,
        isAbleToPlay: false,
    }));
}


export const toCanvasCardTop = (card: Card): CanvasCard => {
    return {
        x: 0,
        y: 0,
        w: CARD_WIDTH,
        h: CARD_HEIGHT,
        angle: 0,
        withRotateButton: false,
        card,
        isAbleToPlay: false,
    }
}

export const invert = (chara: string): string => {

    // - 'a', 'e'
    // - 'n', 'u'
    // - 'd', 'p'
    // - 'o'
    // - 'b', 'q'
    // - 'l'

    const mapping = {
        "a": "e",
        "n": "u",
        "d": "p",
        "o": "o",
        "b": "q",
        "l": "l",
        // vice versa
        "e": "a",
        "u": "n",
        "p": "d",
        "q": "b",
    }

    const x = mapping[chara as keyof typeof mapping]
    return x || chara;
}