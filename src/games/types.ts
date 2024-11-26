import { Card } from "@/types";

export type Vec = [number, number, number];

export type Chat = {
    sender: string
    message: string
}

export type CardUI = {
    card: Card;
    isRotated: boolean;
    isAbleToPlay: boolean;
}

export type AndoAbilityUI = "choosePlayer" | "playCard" | "none"

export type Command = "Right" | "Left" | "Up" | "Down"
    | "SubmitField" | "SubmitQueue" | "SubmitPool" | "PowerUp"
    | "ReceiveQueue" | "ReceivePool"
    | "Ability" | "EndTurn" | "None";