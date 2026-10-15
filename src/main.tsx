import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// глобальные стили подключаются первыми, чтобы стили компонентов их переопределяли
import './styles/global.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
