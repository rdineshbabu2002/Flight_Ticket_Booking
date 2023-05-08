import React, { useEffect } from "react";
import "../styles/register.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AdminLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchdata = async () => {
      axios
        .get("/api/v1/users/me")
        .then((response) => {
          console.log(response.data);
          if (response.data.data.role === "user") {
            navigate("/user");
          } else {
            navigate("/admin");
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };
    fetchdata();
  }, []);
  const [user, setuser] = useState({
    email: "adminflight@gmail.com",
    password: "Adminflight@123",
  });
  const onchange = (e) => {
    const { name, value } = e.target;
    setuser({ ...user, [name]: value });
  };

  const onsubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    const response = await fetch("/api/v1/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    });
    const json = await response.json();
    console.log(json.data.user.role);
    if (json.status === "success") {
      if (json.data.user.role === "admin") {
        navigate("/admin");
      } else {
        function logout() {
          setLoading(true);
          axios.get("/api/v1/users/logout").then((response) => {
            console.log(response);
            setLoading(false);
            navigate("/userlogin");
          });
        }
        logout();
      }
    }
  };
  if (loading) {
    return <div>loading .....</div>;
  }
  return (
    <div>
      <div className="wrapper">
        <div className="container main">
          <div className="rowele row">
            <div className="col-md-6 side-image">
              <img src="" alt="" />
              <div className="text">
                <p></p>
              </div>
            </div>
            <div className="col-md-6 right">
              <div className="input-box">
                <header>Admin Login</header>
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
                    Are you an User? <a href="/userlogin">Login in here</a>
                  </span>
                </div>
                <div className="signin">
                  <span>
                    Don't have an account? <a href="/signup">Sign up here</a>
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

export default AdminLogin;
