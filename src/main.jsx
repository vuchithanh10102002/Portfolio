import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// Bootstrap 4 for the grid + utility classes the template's markup relies on.
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/skins.css'
import './styles/pages.css'
import './styles/style.css'
import './styles/circle.css'
import './styles/switcher.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
