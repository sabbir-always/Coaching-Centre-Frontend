import AdmissionContextProvider from './context/AdmissionContext.jsx'
import CommonContextProvider from './context/CommonContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CommonContextProvider>
        <AdmissionContextProvider>
          <App />
        </AdmissionContextProvider>
      </CommonContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
