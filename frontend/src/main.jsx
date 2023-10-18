import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssVarsProvider, CssBaseline } from '@mui/joy'
import Application from '@/components/Application'
import { UserProvider } from './components/UserContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import '@/styles/global.css'
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
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
