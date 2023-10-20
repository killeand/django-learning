import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssVarsProvider, CssBaseline } from '@mui/joy'
import Application from '@/components/Application'
import { UserProvider } from './components/UserContext'
import { QueryClientProvider } from '@tanstack/react-query'
import { TanQuery } from './scripts/Query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import '@/styles/global.css'
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={TanQuery}>
            <UserProvider>
                <CssVarsProvider>
                    <ReactQueryDevtools />
                    <CssBaseline />
                    <Application />
                </CssVarsProvider>
            </UserProvider>
        </QueryClientProvider>
    </React.StrictMode>,
)
