import React, { useState } from 'react';
import './App.css';

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!phone || !password) {
      alert("Please fill all fields.");
      return;
    }

    const loginData = { phone, password };

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
      });

      const result = await response.json();

      if (response.ok) {
        alert(`Welcome Back, ${result.user.name}`);
       // console.log("User:", result.user);
      } else {
        alert(result.error || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="page">
      <div className="field">
        <h2 align="center">Login</h2>
        <input
          type="text"
          id="phone"
          placeholder="Enter Your Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="password"
          id="password"
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button id="submitBtn" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
