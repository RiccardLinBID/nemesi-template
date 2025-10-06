import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          navigate("/about");
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
