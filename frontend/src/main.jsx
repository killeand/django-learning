import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssVarsProvider } from '@mui/joy'
import Application from '@/components/Application'
import { UserProvider } from './components/UserContext'
import '@/styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <UserProvider>
            <CssVarsProvider>
                <Application />
            </CssVarsProvider>
        </UserProvider>
    </React.StrictMode>,
)
