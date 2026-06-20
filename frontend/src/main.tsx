/**
 * React 앱 진입점 (Entry Point).
 *
 * index.html의 <div id="root"> 안에 App 컴포넌트를 마운트(렌더링)합니다.
 * StrictMode: 개발 중 잠재적 문제를 두 번 렌더링해 찾아주는 React 도구 (운영 빌드에는 영향 없음).
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
