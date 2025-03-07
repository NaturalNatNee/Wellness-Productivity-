import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Timer from './components/timer/Timer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  
    <Timer />
  </StrictMode>,
)
