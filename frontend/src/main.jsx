import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssVarsProvider, CssBaseline } from '@mui/joy'
import Application from '@/components/Application'
import { UserProvider } from './components/UserContext'
import '@/styles/global.css'
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <UserProvider>
            <CssVarsProvider>
                <CssBaseline />
                <Application />
            </CssVarsProvider>
        </UserProvider>
    </React.StrictMode>,
)
