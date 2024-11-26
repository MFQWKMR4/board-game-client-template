import { Button } from "@/components/ui/button"
import { useClientState } from "@/hooks/ClientStateProvider"
import { useGameStateFromServer } from "@/hooks/GameStateFromServerProvider"
import { useWs } from "@/hooks/WsProvider"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@radix-ui/react-collapsible"
import { FC, useState } from "react"
import { MdExpandCircleDown } from "react-icons/md"


export const OverlayChat: FC = () => {

    const { isClosed, sendMessageForSure } = useWs()
    const { gs } = useGameStateFromServer()
    const { handleFetch } = useClientState()
    const onClickButton = () => {
        sendMessageForSure(handleFetch())
    }

    const isOnline = !isClosed;
    const chatHistory = gs.gameLogicState.chatHistory
    const [isOpen, setIsOpen] = useState(false)
    const recentChats = chatHistory.filter((c) => c.message.length > 0).slice(-5).reverse();

    const chat = recentChats[0]
    const rest = recentChats.slice(1)

    return (
        <div style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            color: 'black',
        }}>
            <Collapsible
                open={isOpen}
                onOpenChange={setIsOpen}
                className="w-[300px] space-y-2"
            >
                <div className="flex items-center justify-between space-x-4 px-4">
                    <div className="flex">
                        <div
                            onClick={onClickButton}
                            className={`w-3 h-3 mt-1 pl-1 rounded-lg font-bold text-center flex items-center justify-center cursor-pointer transition-all duration-300 ${isOnline
                                ? 'bg-pattarn1-secondary text-white shadow-[0_0_6px_rgba(52,211,153,0.6),_0_0_12px_rgba(52,211,153,0.4)]'
                                : 'bg-pattarn1-primary text-gray-200 shadow-[0_0_4px_rgba(75,85,99,0.5)]'
                                }`}
                        >
                        </div>
                        <h4 className="text-sm font-semibold  ml-3">
                            Messages
                        </h4>
                    </div>
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="w-9 p-0">
                            <MdExpandCircleDown className="h-4 w-4" color="black" />
                            <span className="sr-only">Toggle</span>
                        </Button>
                    </CollapsibleTrigger>
                </div>
                <div className="rounded-md border px-4 py-3 font-mono text-sm">
                    {chat && <p className="text-sm">{chat.message}</p>}
                    {chat && chat.sender && chat.sender != "Server" ? <div className="flex justify-between">
                        <p className="text-sm  font-bold">{chat.sender}</p>
                    </div> : <></>}
                </div>
                <CollapsibleContent className="space-y-2">
                    {rest.map((chat, index) => {
                        return (
                            <div key={index} className="rounded-md border px-4 py-3 font-mono text-sm">
                                <p className="text-sm">{chat.message}</p>
                                {chat.sender && chat.sender != "Server" ?
                                    <div className="flex justify-between">
                                        <p className="text-sm  font-bold">{chat.sender}</p>
                                    </div> : <></>}
                            </div>
                        )
                    })
                    }

                </CollapsibleContent>
            </Collapsible>
        </div>
    );
}