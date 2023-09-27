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
            '/admin': {
                secure: false,
                target: "http://127.0.0.1:8000/",
                changeOrigin: true
            },
			'/api': {
				secure: false,
				target: "http://127.0.0.1:8000/",
				changeOrigin: true
            },
            '/api-auth': {
                secure: false,
				target: "http://127.0.0.1:8000/",
				changeOrigin: true
            },
            '/static': {
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
    },
    build: {
        assetsDir: "static/assets",
        emptyOutDir: true
    }
})
