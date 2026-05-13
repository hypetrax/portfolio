import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import './App.css'
import App from './App.tsx'

const root = document.getElementById('root')!
const app = (
  <HelmetProvider>
    <App />
  </HelmetProvider>
)

createRoot(root).render(app)
