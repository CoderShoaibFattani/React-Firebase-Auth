// import { useState } from "react";
import Login from "../Login/Login";
import SignUp from "../SignUp//Signup";
// import Dashboard from "../Dashboard/Dashboard";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
// import ProductInfo from "../ProductInfo/ProductInfo";

const NavBar = () => {
  return (
    <div className="App">
      {/* Navigation menu */}
      <nav>
        <ul>
          <li>
            {/* Link component for navigation without page reload */}
            <Link to="/">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Sign In</Link>
          </li>
          {/* <li>
            <Link to="/dashboard">Dashboard</Link>
          </li> */}
        </ul>
      </nav>
    </div>
  );
};

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/productinfo/:id" element={<ProductInfo />} /> */}
      </Routes>
    </>
  );
};
export default App;
