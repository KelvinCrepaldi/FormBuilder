import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'

import GlobalRoutes from './routes/index.tsx'
import Providers from './providers/index.tsx'


import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Providers>
        <GlobalRoutes/>
      </Providers>
    </BrowserRouter>
  </StrictMode>,
)
