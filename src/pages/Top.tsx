import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Frame } from '@/component/Frame'

const Top = () => {
    const navigate = useNavigate()
    return (
        <Frame >
            <div className='flex flex-col space-y-4'>
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                    Menu
                </h4>
                <div className="flex flex-col space-y-4">
                    <Button onClick={() => {
                        navigate('/create')
                    }}>Create Room</Button>

                    <Button onClick={() => {
                        navigate('/join')
                    }}>Join Room</Button>

                    {/* <Button onClick={() => {
                        navigate('/view')
                    }}>View Room</Button> */}
                </div>
            </div>
        </Frame>

    )
}

export default Top