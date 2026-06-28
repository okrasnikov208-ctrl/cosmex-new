import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster position="top-right" toastOptions={{
        style:{ background:'#06061a', color:'#e8eeff', border:'1px solid rgba(91,143,255,0.3)' }
      }}/>
    </BrowserRouter>
  </React.StrictMode>
)
