import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ZenithLanding from './ZenithLanding'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ZenithLanding />
  </StrictMode>,
)
