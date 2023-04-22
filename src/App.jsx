import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/LoginPage";
import SignUp from "./components/SignUp/SignUpPage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
        {/* <Login />
        <Dashboard /> */}
      </Router>
    </div>
  );
}

export default App;
