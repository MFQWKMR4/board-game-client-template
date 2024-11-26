import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { DefaultApi } from '@/types'
import { useApi } from '@/hooks/ApiProvider'
import { useWs } from '@/hooks/WsProvider'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Frame } from '@/component/Frame'

const CreateRoom = () => {

    const api = useApi().api as DefaultApi;
    const { connectWs } = useWs()
    const navigate = useNavigate()
    const [roomName, setRoomName] = useState('')
    const [numberOfPlayers, setNumberOfPlayers] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    const handleCreateRoom = async () => {
        setIsLoading(true)
        const result = await api.createRoomRaw(
            { createRoomRequest: { name: roomName, numberOfPlayers } },
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                }
            },
        )
        setIsLoading(false)
        if (result.raw.status === 200) {
            const body = await result.value()
            const roomKey = body.roomKey
            localStorage.setItem('jwt', roomKey)
            await connectWs()
            navigate(`/game3d/${body.id}`)
        } else {
            console.log('Failed to create room')
        }
    }

    return (
        <Frame >
            <div className="flex flex-col space-y-4">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                    Create Room
                </h4>
                <div className="flex flex-col space-y-4">
                    <div className="flex flex-col space-y-1">
                        <Label>Room Name</Label>
                        <Input type="text" value={roomName} onChange={(e) => setRoomName(e.target.value)} />
                    </div>

                    <div className="flex flex-col space-y-1">
                        <Label>Number of Players</Label>
                        <Input type="number" value={numberOfPlayers} onChange={(e) => setNumberOfPlayers(parseInt(e.target.value))} />
                        <Button onClick={handleCreateRoom} disabled={isLoading}  >Create Room</Button>
                    </div>
                </div>
            </div>
        </Frame >
    )
}

export default CreateRoom