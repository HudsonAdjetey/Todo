import React, { useState } from "react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const viewLogin = (status) => {
    setError(null);
    setIsLogin(status);
  };
  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form action="">
          <h2>{isLogin ? "Please login" : "Please sign up"}</h2>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          {!isLogin && <input type="password" placeholder="Confirm Password" />}
          <input type="submit" value="Submit" className="create" />
          <p>{error}</p>
        </form>
      </div>
      <div className="auth-options">
        <button
          onClick={() => viewLogin(false)}
          style={{ background: !isLogin ? "white" : "rgb(188, 188, 180" }}
        >
          Sign Up
        </button>
        <button
          style={{ background: isLogin ? "white" : "rgb(188, 188, 180" }}
          onClick={() => viewLogin(true)}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Auth;
