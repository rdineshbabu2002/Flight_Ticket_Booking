import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      className="py-3"
      style={{ backgroundColor: "#D6E5E3", marginTop: "48px" }}
    >
      <Container style={{ paddingTop: "24px" }}>
        <Row>
          <Col md={3}>
            <h6>About Us</h6>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Col>
          <Col md={3}>
            <h6>Contact Us</h6>
            <p>
              123 Main Street, Anytown, USA
              <br />
              info@travelsite.com
              <br />
              (123) 456-7890
            </p>
          </Col>
          <Col md={3}>
            <h6>Follow Us</h6>
            <ul className="list-unstyled">
              <li>
                <a
                  href="#fg"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <i className="fa fa-facebook fa-fw"></i> Facebook
                </a>
              </li>
              <li>
                <a
                  href="#vv"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <i className="fa fa-twitter fa-fw"></i> Twitter
                </a>
              </li>
              <li>
                <a
                  href="#gf"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <i className="fa fa-instagram fa-fw"></i> Instagram
                </a>
              </li>
            </ul>
          </Col>
          <Col md={3}>
            <h6>Subscribe</h6>
            <form>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your email"
                />
                <span className="input-group-btn">
                  <button className="btn btn-primary" type="submit">
                    Subscribe
                  </button>
                </span>
              </div>
            </form>
          </Col>
        </Row>
        <hr className="my-4" />
        <p className="text-center">
          &copy; 2023 Travelsite. All Rights Reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
