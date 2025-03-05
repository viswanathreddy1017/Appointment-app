import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Appointment from "./pages/Appointment";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import axios from "axios";
import { Context } from "./main";


const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } =
    useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://appointment-app-yior.onrender.com/api/v1/user/student/me",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  return (
      <>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/appointment' element={<Appointment/>} />
            <Route path='/about' element={<AboutUs/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/login' element={<Login/>} />
          </Routes>
          <Footer />
          <ToastContainer position ="top-center"/>
          <toast position ="top-center"/>
        </Router>
      </>

  );
}

export default App;