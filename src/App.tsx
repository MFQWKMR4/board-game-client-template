import { BrowserRouter } from 'react-router-dom'
import { ApiProvider } from '@/hooks/ApiProvider'
import { WsProvider } from '@/hooks/WsProvider'
import { GameStateFromServerProvider } from '@/hooks/GameStateFromServerProvider'
import { MetaProvider } from '@/hooks/MetaProvider'
import { AppRoutes3D } from '@/routes/Routes3D'
import { ClientStateProvider } from '@/hooks/ClientStateProvider'
import { useGLTF } from '@react-three/drei'

useGLTF.preload(import.meta.env.GLB_URL);

function App() {

  const apiUrl = import.meta.env.API_BASE_URL;
  const wsUrl = import.meta.env.WS_URL;

  return (
    <BrowserRouter>
      <MetaProvider>
        <ApiProvider url={apiUrl}>
          <WsProvider url={wsUrl}>
            <GameStateFromServerProvider>
              <ClientStateProvider>
                <AppRoutes3D />
              </ClientStateProvider>
            </GameStateFromServerProvider>
          </WsProvider>
        </ApiProvider>
      </MetaProvider>
    </BrowserRouter >
  )
}

export default App
