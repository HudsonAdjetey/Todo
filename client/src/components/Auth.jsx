import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // confirm password
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const viewLogin = (status) => {
    setError(null);
    setIsLogin(status);
  };

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (isLogin) {
      // validate email and password
      if (!email.includes("@") || password.length < 6) {
        setError("Invalid email or password");
        return;
      }
      // login logic here
      //...
    } else {
      // validate email, password and confirm password
      if (
        !email.includes("@") ||
        password.length < 6 ||
        confirmPassword !== password
      ) {
        setError("Invalid email or password");
        return;
      }
      // sign up logic here
      //...
    }
    // sign up logic here
    // ...
    await fetch(`${import.meta.env.VITE_SERVER_URL}/${endpoint}`);
  };

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form action="">
          <h2>{isLogin ? "Please login" : "Please sign up"}</h2>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          {!isLogin && <input type="password" placeholder="Confirm Password" />}
          <input
            type="submit"
            value="Submit"
            className="create"
            onClick={(e) => handleSubmit(e, isLogin ? "login" : "signup")}
          />
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
