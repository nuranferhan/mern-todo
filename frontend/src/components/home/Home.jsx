import React from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    const userId = sessionStorage.getItem("id");
    if (userId) {
      navigate("/todo");
    } else {
      navigate("/signin");
    }
  };

  return (
    <div className="home d-flex justify-content-center align-items-center">
      <div className="container d-flex justify-content-center align-items-center flex-column">
        <h1 className="text-center">
          Optimize Productivity,<br />
          Maximize Impact.
        </h1>
        <p>
          A personal productivity framework designed to help professionals<br />
          structure their day, prioritize tasks and achieve high-impact<br />
          outcomes with clarity and consistency.
        </p>
        <button className="home-btn p-2" onClick={handleClick}>
          Make Todo List
        </button>
      </div>
    </div>
  );
};

export default Home;
