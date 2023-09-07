import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
        open: true,
        host: '127.0.0.1',
		port: 3000,
		proxy: {
			'/api': {
				secure: false,
				target: "http://127.0.0.1:8000/",
				changeOrigin: true
			}
		}
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
})
