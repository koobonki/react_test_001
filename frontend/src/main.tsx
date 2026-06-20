/**
 * React 앱 진입점.
 * index.html의 <div id="root"> 안에 App 컴포넌트를 렌더링합니다.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
