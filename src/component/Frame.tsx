import { ReactNode } from "react"


export const Frame = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="w-[1066px] h-[600px] bg-white border-4 border-gray-500 shadow-lg flex items-center justify-center cursor-pointer" >
                {children}
            </div>
        </div >
    )
}
