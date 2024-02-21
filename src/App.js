import React from 'react'
import { Routes, Route, Navigate, Redirect } from 'react-router-dom';
import AuthForm from './routes/Auth/AuthForm'

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={<AuthForm />} />
      </Routes>
    </>
  )
}

export default App



