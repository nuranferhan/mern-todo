import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Footer from "./components/footer/Footer";
import About from "./components/about/About";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/signup/Signup";
import SignIn from "./components/signup/SignIn";
import Todo from "./components/todo/Todo";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  
 
  const hasSessionId = sessionStorage.getItem("id");
  
  return (isLoggedIn || hasSessionId) ? children : <Navigate to="/signin" />;
};

const App = () => {
  const dispatch = useDispatch();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const id = sessionStorage.getItem("id");
    if (id) {
      dispatch(authActions.login());
    }
    setIsInitialized(true);
  }, [dispatch]); 

 
  if (!isInitialized) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/todo"
            element={
              <PrivateRoute>
                <Todo />
              </PrivateRoute>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
};

export default App; 