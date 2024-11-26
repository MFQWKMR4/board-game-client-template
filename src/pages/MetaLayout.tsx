import { Outlet } from 'react-router-dom'
import { useMeta } from '@/hooks/MetaProvider'

export function MetaLayout() {
    const { ed } = useMeta()

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            {ed &&
                <div>
                    <h1>Error</h1>
                    <p>{ed.errorSummary}</p>
                    <p>{ed.errorMessage}</p>
                    <p>{ed.senderId}</p>
                    <p>{ed.requestJson}</p>
                </div>
            }
            <div className="w-[800px] h-[450px] bg-white border-4 border-gray-500 shadow-lg flex items-center justify-center cursor-pointer" >
                <Outlet />
            </div>
        </div >
    )
}
