import React from 'react';
import { createRoot } from 'react-dom/client';

import { store } from './app/redux/store';
import { Provider } from 'react-redux';

import App from './app/App';

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
