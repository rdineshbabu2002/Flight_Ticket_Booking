import React from "react";
import { useState } from "react";
import axios from "axios";

const Usersignup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    passwordConfirm: "",
  });
  const onchange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(user);
    const response = await axios.post(
      "http://localhost:8000/api/v1/users/signup/",
      {
        name: user.name,
        email: user.email,
        password: user.password,
        passwordConfirm: user.passwordConfirm,
      }
    );
    // const json = await response.json();
    console.log(response);
  };

  return (
    <div>
      <div className="wrapper">
        <div className="container main">
          <div className="row">
            <div className="col-md-6 side-image">
              <div className="text">
                <p></p>
              </div>
            </div>
            <div className="col-md-6 right">
              <div className="input-box">
                <header>Create account</header>
                <form onSubmit={(e) => submitHandler(e)}>
                  <div className="input-field">
                    <input
                      type="text"
                      className="input"
                      id="name"
                      name="name"
                      value={user.name}
                      onChange={(e) => {
                        onchange(e);
                      }}
                      required
                    />
                    <label htmlFor="name">Name</label>
                  </div>
                  <div className="input-field">
                    <input
                      type="text"
                      className="input"
                      id="email"
                      name="email"
                      value={user.email}
                      onChange={(e) => {
                        onchange(e);
                      }}
                      required
                    />
                    <label htmlFor="email">Email</label>
                  </div>
                  <div className="input-field">
                    <input
                      type="password"
                      name="password"
                      className="input"
                      id="password"
                      value={user.password}
                      onChange={(e) => {
                        onchange(e);
                      }}
                      required
                    />
                    <label htmlFor="password">Password</label>
                  </div>
                  <div className="input-field">
                    <input
                      type="password"
                      name="passwordConfirm"
                      className="input"
                      id="passwordconfirm"
                      value={user.passwordConfirm}
                      onChange={(e) => {
                        onchange(e);
                      }}
                      required
                    />
                    <label htmlFor="password">Confirm Password</label>
                  </div>
                  <div className="input-field">
                    <input
                      type="number"
                      className="input"
                      id="mobile"
                      name="mobile"
                      required
                    />
                    <label htmlFor="mobile">Mobile</label>
                  </div>
                  {/* <div class="input-field">
                  <input
                    type="number"
                    placeholder=""
                    class="input"
                    id="age"
                    name="age"
                    required
                  />
                  <label for="age">Enter Age:</label>
                </div> */}
                  <div className="input-field">
                    <input
                      type="text"
                      className="input"
                      id="city"
                      name="city"
                      required
                    />
                    <label htmlFor="city">Enter City :</label>
                  </div>
                  <div className="input-field">
                    <input type="submit" className="submit" value="Submit" />
                  </div>
                </form>

                <div className="signin">
                  <span>
                    Already have an account?
                    <a href="login.html">Login here here</a>
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

export default Usersignup;
