import { ReactNode, createContext, useContext, useMemo, useState } from "react"
import { ErrorDetail } from "@/types"

type MetaContextType = {
    ed: ErrorDetail | null
    setEd: (ed: ErrorDetail | null) => void
}

const DefaultMetaContext: MetaContextType = {
    ed: null,
    setEd: (_: ErrorDetail | null) => { },
}

export const MetaContext: React.Context<MetaContextType> = createContext(DefaultMetaContext)

export function MetaProvider({ children }: { children?: ReactNode }) {

    const [ed, setEd] = useState<ErrorDetail | null>(null)
    return (
        <MetaContext.Provider value={{ ed, setEd }}>
            {children}
        </MetaContext.Provider>
    )
}

export function useMeta() {
    return useContext(MetaContext)
}
