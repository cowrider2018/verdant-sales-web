import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@verdant/ui/styles/theme.css'
import '@verdant/ui/styles/primitives.css'
import './styles/portfolio.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
