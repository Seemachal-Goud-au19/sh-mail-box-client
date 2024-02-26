import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Mail from "./components/Mail/Mail";
import EmailList from "./components/EmailList/EmailList";
import SendMail from "./components/SendMail/SendMail";
import { useSelector } from "react-redux";
import { selectSendMessageIsOpen } from "./features/mailSlice";
import { selectUser } from "./features/userSlice";
// import Login from "./components/Login/Login";
import AuthForm from "./routes/Auth/AuthForm";
import { db } from "./firebase";

import CartContext from "./store/cart-context";

function App() {
  const sendMessageIsOpen = useSelector(selectSendMessageIsOpen);
  const user = useSelector(selectUser);
  const [emails, setEmails] = useState([]);

  const cartCtx = useContext(CartContext)
  const isLoggedIn = cartCtx.isLoggedIn
  const userEmail = localStorage.getItem('email')

  console.log("e", emails);
  useEffect(() => {
    db.collection(userEmail)
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        console.log(">>> snapshot", snapshot)
        return setEmails(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      }
      );
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <div className="app">
          <Header />
          <div className="app-body">
            <Sidebar emails={emails} />
            <Routes>
              <Route path="/mail" element={<Mail />} />
              <Route path="/" element={<EmailList emails={emails} />} />
            </Routes>
          </div>
          {sendMessageIsOpen && <SendMail />}
        </div>
      ) : <AuthForm />}
    </>
  );

}

export default App;


{/* <Router>
      {!user ? (
        <Login />
      ) : (
        <div className="app">
          <Header />
          <div className="app-body">
            <Sidebar emails={emails} />
            <Routes>
              <Route path="/mail">
                <Mail />
              </Route>
              <Route path="/" exact>
                <EmailList emails={emails} />
              </Route>
            </Routes>
          </div>

          {sendMessageIsOpen && <SendMail />}
        </div>
      )}
    </Router> */}