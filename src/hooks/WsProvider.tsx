import { WsMessage } from "@/types"
import { ReactNode, createContext, useContext, useEffect, useMemo, useRef, useState } from "react"
import { useMeta } from "./MetaProvider"
import { clientError } from "@/utils/errors"

type WsContextType = {
    wsMessage: WsMessage | null
    isClosed: boolean
    connectWs: () => Promise<void>
    sendMessage: (message: string) => Promise<boolean>
    sendMessageForSure: (message: string) => Promise<void>
}

const DefaultWsContext: WsContextType = {
    wsMessage: null,
    isClosed: true,
    connectWs: async () => { return },
    sendMessage: async (_: string) => { return false },
    sendMessageForSure: async (_: string) => { }
}

export const WsContext: React.Context<WsContextType> = createContext(DefaultWsContext)

export function WsProvider({ children, url }: { children?: ReactNode, url: string }) {

    const { setEd } = useMeta()
    const wsRef = useRef<WebSocket | null>(null);
    const [wsMessage, setWsMessage] = useState<WsMessage | null>(null)
    const [isClosed, setIsClosed] = useState(true)

    useEffect(() => {
        return () => {
            wsRef.current?.close(); // クリーンアップで WebSocket を閉じる
        };
    }, []);

    const connectWs = async () => {

        const roomKey = localStorage.getItem('jwt')
        const ws = new WebSocket(url + `?roomKey=${roomKey}`)

        ws.onmessage = (event) => {
            console.log('###message', event.data)
            const parsed: WsMessage = JSON.parse(event.data)
            if (!parsed.messageType) {
                console.error('No messageType in message')
                setEd(clientError('No messageType in message'))
                return
            }
            setWsMessage(parsed)
        }

        ws.onclose = (event) => {
            console.log('close', event)
            setIsClosed(true)
        }

        ws.onerror = (event) => {
            console.log('error', event)
            setIsClosed(true)
        }

        await new Promise((resolve) => ws.addEventListener('open', resolve));
        setIsClosed(false)
        wsRef.current = ws
    }

    const sendMessage = async (message: string): Promise<boolean> => {
        if (wsRef.current) {
            wsRef.current.send(message)
            return true
        }
        return false
    }

    const sendMessageForSure = async (message: string) => {
        console.log('sendMessageForSure', message)
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(message)
        } else {
            connectWs().then(async _ => {
                wsRef.current?.send(message)
            })
        }
    }

    return (
        <WsContext.Provider value={{ isClosed, wsMessage, connectWs, sendMessage, sendMessageForSure }}>
            {children}
        </WsContext.Provider>
    )
}

export function useWs() {
    return useContext(WsContext)
}
