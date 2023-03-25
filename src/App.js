import { Routes, Route } from 'react-router-dom'
import AppHeader from './components/layout/Header'
import Home from './pages/Home'
import { CeloProvider, Alfajores, NetworkNames } from '@celo/react-celo'
import '@celo/react-celo/lib/styles.css'


const WrappedApp = () => {
  return (
    <CeloProvider
      networks={[Alfajores]}
      network={{
        name: NetworkNames.Alfajores,
        rpcUrl: 'https://alfajores-forno.celo-testnet.org',
        graphQl: 'https://alfajores-blockscout.celo-testnet.org/graphiql',
        explorer: 'https://alfajores-blockscout.celo-testnet.org',
        chainId: 44787,
      }}
      dapp={{
        name: 'NFT Marketplace for Tech Artisans',
        description: '',
        url: 'https://tech-artisans.vercel.app/',
      }}
    >
      <App />
    </CeloProvider>
  )
}

const App = () => {

  return (
    <div>
        <AppHeader/>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
    </div>
  )
}

export default WrappedApp
