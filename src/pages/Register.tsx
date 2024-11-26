import { useState } from 'react'
import { DefaultApi } from '@/types'
import { useApi } from '@/hooks/ApiProvider'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Frame } from '@/component/Frame'

const Register = () => {
    const api = useApi().api as DefaultApi;
    const [userName, setUserName] = useState('')

    const handleCreateUser = async () => {
        const result = await api.registerRaw({ registerRequest: { name: userName } })

        if (result.raw.status === 200) {

            const body = await result.value()
            const jwt = body.token
            localStorage.setItem('jwt', jwt);
            window.location.href = '/'
        }
    }

    return (
        <Frame >
            <div className="flex flex-col space-y-4">
                <div className="flex flex-col space-y-1">
                    <Label>User Name</Label>
                    <Input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                    <Button onClick={handleCreateUser}>Create User</Button>
                </div>
            </div>
        </Frame>
    )
}

export default Register