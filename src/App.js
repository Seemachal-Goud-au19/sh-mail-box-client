import React, { useContext } from 'react'
import { Routes, Route, Navigate, Redirect } from 'react-router-dom';
import AuthForm from './routes/Auth/AuthForm'
import Home from './routes/Home/Home';
import CartContext from './store/cart-context';

const App = () => {
  const cartCtx = useContext(CartContext)
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={<AuthForm />} />

        {cartCtx.isLoggedIn && <Route
          path="/"
          element={<Home />} />}
      </Routes>
    </>
  )
}

export default App



