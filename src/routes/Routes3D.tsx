import { useRoutes } from 'react-router-dom'

import Error404 from '@/pages/NotFound'
import Register from '@/pages/Register'
import Top from '@/pages/Top'
import { AuthLayout } from '@/pages/AuthLayout'
import CreateRoom from '@/pages/CreateRoom'
import JoinRoom from '@/pages/JoinRoom'
import Game3D from '@/pages/Game3D'

export const AppRoutes3D = () => {
    return useRoutes([
        {
            element: <AuthLayout />,
            children: [
                { path: '/', element: <Top /> },
                { path: '/create', element: <CreateRoom /> },
                { path: '/join', element: <JoinRoom /> },
                { path: '/game3d/:id', element: <Game3D /> },
            ],
        },
        { path: '/register', element: <Register /> },
        { path: '*', element: <Error404 /> },
    ])
}
