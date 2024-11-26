import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DefaultApi } from '@/types'
import { useApi } from '@/hooks/ApiProvider'
import { useWs } from '@/hooks/WsProvider'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Frame } from '@/component/Frame'

const JoinRoom = () => {

    const api = useApi().api as DefaultApi;
    const { connectWs } = useWs()
    const navigate = useNavigate()
    const [roomId, setRoomId] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleJoinRoom = async () => {

        const token = localStorage.getItem('jwt');
        if (!token) {
            console.log('jwt is not set')
            return
        }
        setIsLoading(true)
        const result = await api.joinRoomRaw(
            { joinRoomRequest: { roomId: roomId } },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            },
        )
        setIsLoading(false)

        if (result.raw.status === 200) {
            const body = await result.value()
            // const decoded = jwtDecode<{ playerId: string, roomId: string }>(body.roomKey);
            localStorage.setItem('jwt', body.roomKey)
            await connectWs()
            navigate(`/game3d/${roomId}`)
        } else {
            console.log('Failed to join room')
        }
    }

    return (

        <Frame >

            <div className="flex flex-col space-y-4">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                    Join Room
                </h4>
                <div className="flex flex-col space-y-4">
                    <div className="flex flex-col space-y-1">
                        <Label>Room Id</Label>
                        <Input type="text" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
                        <Button onClick={handleJoinRoom} disabled={isLoading}>Join Room</Button>
                    </div>
                </div>
            </div>
        </Frame>
    )
}

export default JoinRoom