import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import CartProvider from './store/CartProvider';
import { store } from './app/store';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Router>
        <Provider store={store}>
            <CartProvider>
                <App />
            </CartProvider>
        </Provider>
    </Router>);
