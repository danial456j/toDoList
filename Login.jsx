import React, { useState, useEffect, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

import "./style.css";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userID, setUserId] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  useEffect(() => {
    if (isLoggedIn && userID) {
      console.log("user id DDDDDDDDDDDDDDDDDDDDDDDD", userID);
      navigate(`/tasks/${userID}`);
    }
  }, [isLoggedIn, userID, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      // console.log("Response from server:", data.userId);

      if (response.ok) {
        // Login successful, you can redirect or perform other actions
        console.log("Login successful", data.userId);
        setLoggedIn(true);
        setUserId(data.userId);
      } else {
        // Login failed, display an error message
        console.error("Login failed", data.message);
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error("Error during login", error.message);
      setError("Error during login. Please try again.");
    }
  }

  function handleRegister() {
    navigate(`/signup`);
  }

  // if (isLoggedIn) {
  //     // If logged in, render TaskList component
  //     // console.log("login USERID: ");
  //     // console.log(JSON.stringify(userID, null, 2));
  //     //////////////////////////////////////////////////////////
  //     // return <TaskList userId={userID} />;
  //     /////////////////////////////////////////////////////////
  // }

  return (
    <Fragment>
      <div className="login template d-flex justify-content-center align-items-center ">
        <div className="welcome-container text-start me-5">
          <h1 className="welcome mb-2">Make Today Amazing with TaskBuddy!</h1>
          <h3 className="mb-2">
            Turn your dreams into plans, and your plans into reality.{" "}
            <Link
              to="/signup"
              className="ms-2"
              style={{ color: `#7ad8d7`, fontWeight: `bold` }}
            >
              Let's get started!
            </Link>
          </h3>
          {/* <div className="mb-2">
                    <button className="registerBtn" onClick={handleRegister}>Register</button>
                </div> */}
        </div>
        <form onSubmit={handleSubmit} className="form_container p-5 rounded">
          <h3 className="text-center mb-4">Log In</h3>
          <div className="mb-2">
            {/* <label htmlFor="email">Email</label> */}
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              onChange={handleChange}
              value={user.email}
              required
            />
          </div>
          <div className="mb-2">
            {/* <label htmlFor="password">Password</label> */}
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleChange}
              value={user.password}
              required
            />
          </div>
          {error && (
    <p style={{ color: 'red', fontWeight: 'bold', fontSize: '1.2em' }} className="error-message">
        {error}
    </p>
)}

          <div className="mb-1">
            <button type="submit">Log In</button>
          </div>

          {/* <p className="text-end mt-2">
                <Link to="/signup" className="ms-2">Register</Link>
                </p> */}
        </form>
      </div>
    </Fragment>
  );
}

export default Login;
