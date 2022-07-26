import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';

const root = createRoot(document.querySelector('#root') as Element);
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);