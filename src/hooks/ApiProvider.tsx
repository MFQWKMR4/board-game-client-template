import { Configuration, ConfigurationParameters, DefaultApi } from "@/types"
import { ReactNode, createContext, useContext, useMemo } from "react"

type ApiContextType = {
    api: DefaultApi | null
}

const DefaultApiContext: ApiContextType = {
    api: null,
}

export const ApiContext: React.Context<ApiContextType> = createContext(DefaultApiContext)

export function ApiProvider({ children, url }: { children?: ReactNode, url: string }) {

    const api = useMemo(() => {
        // const credentials = url == "http://localhost:8787" ? "include" : "same-origin"
        const p: ConfigurationParameters = {
            credentials: "include",
            basePath: url,
        };
        const c = new Configuration(p);
        const a = new DefaultApi(c);
        return a;
    }, []);


    return (
        <ApiContext.Provider value={{ api }}>
            {children}
        </ApiContext.Provider>
    )
}

export function useApi() {
    return useContext(ApiContext)
}
