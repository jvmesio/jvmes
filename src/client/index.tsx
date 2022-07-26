import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';

/* webpack will bundle these files */
import styles from './scss/application.scss';

const root = createRoot(document.querySelector('#root') as Element);
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);