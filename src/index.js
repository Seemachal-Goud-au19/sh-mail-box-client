import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import CartProvider from './store/CartProvider'
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Router>
         <CartProvider>
        <App />
        </CartProvider>
    </Router>);
