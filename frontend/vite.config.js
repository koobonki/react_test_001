/**
 * Vite 개발 서버 설정.
 *
 * - port 5173: Frontend 접속 주소
 * - proxy /api → http://localhost:8081
 *   브라우저는 같은 origin(5173)으로 요청하고, Vite가 Backend로 중계합니다.
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      },
    },
  },
})
