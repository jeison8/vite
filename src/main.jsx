import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}> 
      <App />
    </Provider>
  /* </React.StrictMode> */
)
