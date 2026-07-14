import { createRoot } from 'react-dom/client';
import './index.css';
import App from 'core_components/App';
import config from 'utils/config';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'css/common.css';
import 'css/main.css';
import 'css/responsive.css';

const container = document.getElementById(config.dom_root_id);

if (!container) {
    throw new Error(`Root element with id "${config.dom_root_id}" not found`);
}

const root = createRoot(container);
root.render(<App />);