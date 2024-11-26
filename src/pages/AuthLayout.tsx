import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

export function AuthLayout() {

    useEffect(() => {
        const token = localStorage.getItem('jwt')
        if (!token) {
            window.location.href = '/register'
        }
    }, [])

    return (
        <>
            <Outlet />
        </>

    )
}
