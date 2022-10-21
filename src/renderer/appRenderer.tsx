import React from 'react';
import { createRoot } from 'react-dom/client';

import { store } from './app/redux/store';
import { foodData, initFood } from './app/redux/foodSlice';

import { Provider } from 'react-redux';

import context from '@src/main/sqlite3/sqlite3ContextApi';

import 'bootstrap/dist/css/bootstrap.min.css';

import App from './app/App';

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);

context.getAllFood('getAllFood')
  .then((result: foodData[]) => {
    store.dispatch(initFood(result));
  })
  .catch();
