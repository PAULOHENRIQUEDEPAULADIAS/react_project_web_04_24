import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import { AuthProvider } from "./services/authcontext.tsx"; 


createRoot(document.getElementById('root')).render(
    <AuthProvider>
    <App />
    </AuthProvider>
)
