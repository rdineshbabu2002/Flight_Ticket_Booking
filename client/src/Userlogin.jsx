import React from "react";
import "./styles/login.css";
import "./styles/register.css";
import { useState } from "react";
import axios from "axios";
const UserLogin = () => {
  const [user, setuser] = useState({
    email: "rdineshbabu2002@gmail.com",
    password: "Dineshbabu@123",
  });
  const onchange = (e) => {
    const { name, value } = e.target;
    setuser({ ...user, [name]: value });
  };

  const onsubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    const response = await axios.post(
      "http://localhost:8000/api/v1/users/login",
      {
        email: user.email,
        password: user.password,
      }
    );
    const json = response.json();
    console.log(json);
  };
  return (
    <div>
      <div className="wrapper">
        <div className="container main">
          <div className="row">
            <div className="col-md-6 side-image">
              <img src="" alt="" />
              <div className="text">
                <p></p>
              </div>
            </div>
            <div className="col-md-6 right">
              <div className="input-box">
                <header>Login</header>
                <form id="my-form" onSubmit={onsubmit}>
                  <div className="input-field">
                    <input
                      type="text"
                      className="input"
                      id="email"
                      name="email"
                      onChange={(e) => {
                        onchange(e);
                      }}
                      value={user.email}
                      required
                    />
                    <label htmlFor="email">Email</label>
                  </div>
                  <div className="input-field">
                    <input
                      type="password"
                      className="input"
                      id="password"
                      name="password"
                      onChange={(e) => onchange(e)}
                      value={user.password}
                      required
                    />
                    <label htmlFor="password">Password</label>
                  </div>
                  <div className="input-field">
                    <input
                      type="submit"
                      className="submit"
                      value="Submit"
                      onChange={(e) => {
                        onchange(e);
                      }}
                    />
                  </div>
                </form>
                <div className="signin">
                  <span>
                    Don't have an account?{" "}
                    <a href="register.html">Sign up here</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
