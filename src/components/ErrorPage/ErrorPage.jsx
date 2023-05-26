import React from "react";
import { useNavigate } from "react-router-dom";
import "./ErrorPage.css";

const ErrorPage = () => {
  const navigate = useNavigate();
  const handleGoBackToHome = () => {
    navigate("/");
  };
  return (
    <div className="error-content">
      <h1>404 Page not found!!!</h1>
      <button onClick={handleGoBackToHome}>Go Back to Home</button>
    </div>
  );
};

export default ErrorPage;
