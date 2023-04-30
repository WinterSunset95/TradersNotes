import { useState, useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, Router, Redirect, Switch } from "react-router-dom";
import { Home } from "./pages/Home";
import { Users } from "./pages/Users";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { MainContext } from "./components/MainContext";

function App() {
  const urlRoot = 'http://localhost/TradersNotes'
  const [username, setUsername] = useState('')
  useEffect(() => {
    const storedLogin = localStorage.getItem('username')
    if (storedLogin != '') {
      setUsername(localStorage.getItem('username'))
    }
  }, [])
  useEffect(() => {
    localStorage.setItem('username', username)
  }, [username])
  return (
    <MainContext.Provider value={{ urlRoot, username, setUsername }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </MainContext.Provider>
  );
}

export default App;
