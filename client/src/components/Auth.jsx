import React, { useState } from "react";
import { useCookies } from "react-cookie";
const Auth = () => {
  const [cookies, setCookies, removeCookie] = useCookies(["Email", "Auth"], {
    sameSite: "strict",
    path: "/",
    expires: new Date(Date.now() + 3600000), // 1 hour
    // secure: true, // only send cookies over HTTPS
    doNotParse: true,
  });
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
    try {
      if (isLogin) {
        if (!email.includes("@") || password.length < 6) {
          setError("Invalid email or password");
          console.log("something wrong");
          return;
        }
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
      }

      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/${endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await res.json();
      if (res.status == 201 || res.status == 200) {
        setError(null);
        // alert("Login successful");
        // clear form
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setCookies("Email", data.email, {
          expires: new Date(Date.now() + 3600000),
          sameSite: "strict",
        });
        setCookies("Auth", data.token, {
          expires: new Date(Date.now() + 3600000),
          sameSite: "strict",
        });
        window.location.reload();
      }
    } catch (error) {
      if (res.status == 401 || 404) {
        setError(res?.message);
      } else {
        setError("An error occurred, please try again later");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form action="">
          <h2>{isLogin ? "Please login" : "Please sign up"}</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
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
