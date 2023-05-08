import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import axios from "axios";
import { PopupMenu } from "react-simple-widgets";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Navbars(props) {
  const [login, setlogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");
  const Navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    const fetchdata = async () => {
      setLoading(true);
      console.log(document.cookie);
      axios
        .get("/api/v1/users/me")
        .then((response) => {
          if (response.status === 200) {
            setData(response.data.data);
            // if (response.data.data.role === "admin") {
            //   logout();
            //   // Navigate("/userlogin");
            // }
            console.log(response.data.data);
            setlogin(true);
          }
          console.log(response.status);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.data.data) {
            if (props.home === undefined) {
              alert(err.response.data.data);
              Navigate("/");
            }
          }
          setLoading(false);
        });
    };
    fetchdata();
    setLoading(false);
  }, []);
  if (loading) {
    return <p>Loading ......</p>;
  }
  function logout() {
    axios.get("/api/v1/users/logout").then((response) => {
      console.log(response);
      setlogin(false);
      Navigate("/userlogin");
    });
  }
  return (
    <Navbar expand="lg" style={{ backgroundColor: "#D6E5E3", padding: "12px" }}>
      <Container fluid>
        <Navbar.Brand href="/">Flight Booking</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/availableflights">Available Flights</Nav.Link>
            <NavDropdown title="Services" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/availableflights">
                Book our flights
              </NavDropdown.Item>
              <NavDropdown.Item href="/availableflights">
                Delete our booking
              </NavDropdown.Item>
              {/* <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item> */}
            </NavDropdown>
            <Nav.Link href="/user/booking">My bookings</Nav.Link>
          </Nav>
          {login === false ? (
            <Form className="d-flex gap-3">
              {/* <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button> */}
              <div>
                <NavDropdown title="Login" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="/adminLogin">
                    Admin Login
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/userlogin">
                    User Login
                  </NavDropdown.Item>
                  {/* <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item> */}
                </NavDropdown>
              </div>
              <Nav.Link href="/signup">Sign up</Nav.Link>
            </Form>
          ) : (
            <div className="text-end">
              <PopupMenu>
                <button className="btn btn-primary">
                  <small>Profile</small>
                </button>

                <div className="card text-start">
                  <div className="card-body px-4 py-4">
                    <div
                      id="circle-avatar"
                      className="text-center mx-auto mb-4"
                    >
                      <span></span>
                    </div>

                    <h5 className="text-center mb-0">{data.name}</h5>
                    <p className="text-center mb-2">{data.email}</p>

                    <hr />

                    <p
                      className="mb-0"
                      style={{
                        color: "#bebebe",
                        fontWeight: "bold",
                        fontSize: 12,
                      }}
                    >
                      {data.role}
                    </p>
                    <p style={{ fontSize: 12 }}>
                      {[
                        "Submitter",
                        "Project manager",
                        "Change control board",
                      ].join(", ")}
                    </p>

                    <hr className="mb-0" style={{ margin: "0 -24px 0" }} />

                    <div
                      className="list-group list-group-flush"
                      style={{ margin: "0 -24px 0" }}
                    >
                      <button className="list-group-item list-group-item-action px-4">
                        <NavLink
                          to="/availableflights"
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          Available flights
                        </NavLink>
                      </button>
                      <button className="list-group-item list-group-item-action px-4">
                        <NavLink
                          to="/availablefights"
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          Book my ticket
                        </NavLink>
                      </button>
                      <button className="list-group-item list-group-item-action px-4">
                        <NavLink
                          to="/user/booking"
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          My Bookings
                        </NavLink>
                      </button>
                    </div>

                    <hr style={{ margin: "0 -24px 24px" }} />

                    <div className="d-grid">
                      <button className="btn btn-secondary" onClick={logout}>
                        <small>Logout</small>
                      </button>
                    </div>
                  </div>
                </div>
              </PopupMenu>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbars;
