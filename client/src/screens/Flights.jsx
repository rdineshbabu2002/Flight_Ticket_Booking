import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { Form, Row, Col } from "react-bootstrap";
import "./flights.css";
import axios from "axios";
import Navbars from "../components/Navbar";
const Flights = () => {
  const [data, setdata] = useState({
    airline: "",
    flightNumber: "",
    departureAirport: "",
    arrivalAirport: "",
    departureTime: "",
    arrivalTime: "",
    price: "",
    seats: "",
    availableSeats: "",
  });
  const [result, setresult] = useState([
    {
      airline: "dev",
      flightNumber: "1234",
      departureAirport: "Salem",
      arrivalAirport: "Coimbatore",
      departureTime: "12",
      arrivalTime: "12",
      price: "120",
      seats: "60",
      availableSeats: "60",
    },
  ]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios.get("/api/v1/flights").then((response) => {
      setresult(response.data);
      // setData(response.data[0]);
      // console.log(data);
      console.log(response.data);
      setLoading(false);
    });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log("dines", data);
    let obj = data;
    obj[name] = value;
    console.log("babu", obj);
    setdata({ ...obj });
    console.log(name, value);
    sendquery();
  };

  const sendquery = async () => {
    let query = "/api/v1/flights?";
    if (data.airline !== "") {
      query += `airline=${data.airline}`;
    }
    if (data.flightNumber !== "") {
      query += `&flightumber=${data.flightNumber}`;
    }
    if (data.departureAirport !== "") {
      query += `&departureAirport=${data.departureAirport}`;
    }
    if (data.arrivalAirport !== "") {
      query += `&arrivalAirport=${data.arrivalAirport}`;
    }
    if (data.departureTime !== "") {
      query += `&departureTime[gte]=${data.departureTime}`;
    }
    if (data.arrivalTime !== "") {
      query += `&arrivalTime[gte]=${data.arrivalTime}`;
    }
    console.log(query);
    await axios
      .get(query)
      .then((response) => {
        setresult([...response.data]);
        console.log("acvb", data.airline, result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (loading) {
    return <p>Loading .....</p>;
  }

  return (
    <>
      <Navbars />
      <Form>
        <Row>
          <Col>
            <Form.Group controlId="airline">
              <Form.Label>Airline</Form.Label>
              <Form.Control
                type="text"
                name="airline"
                value={data.airline}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="flightnumber">
              <Form.Label>Flight Number</Form.Label>
              <Form.Control
                type="text"
                name="flightnumber"
                value={data.flightnumber}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="departureAirport">
              <Form.Label>Departure Airport</Form.Label>
              <Form.Control
                type="text"
                name="departureAirport"
                value={data.departureAirport}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="arrivalAirport">
              <Form.Label>Arrival Airport</Form.Label>
              <Form.Control
                type="text"
                name="arrivalAirport"
                value={data.arrivalAirport}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="departureTime">
              <Form.Label>Departure Time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="departureTime"
                value={data.departureTime}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="departureTime">
              <Form.Label>Arrival Time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="arrivalTime"
                value={data.departureTime}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          {/* <Col xs={1}>
            <Button variant="primary" type="submit">
              Search
            </Button>
          </Col> */}
        </Row>
      </Form>
      {/* <div className="filter">
        <input
          type="text"
          className="input-element"
          name="airline"
          placeholder="Enter airline"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          className="input-element"
          name="flightNumber"
          placeholder="Enter flightNumber"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          className="input-element"
          name="departureAirport"
          placeholder="Enter Departure Airport"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          className="input-element"
          name="arrivalAirport"
          placeholder="Enter Arrival Airport"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="datetime-local"
          className="input-element"
          name="departureTime"
          placeholder="choose departure"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="datetime-local"
          className="input-element"
          name="arrivalTime"
          placeholder="Enter airline"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="Number"
          className="input-element"
          name="price"
          placeholder="price"
        />
        <input
          type="Number"
          className=""
          name="seats"
          placeholder="Total Seats"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="Number"
          className="input-element"
          name="availableSeats"
          placeholder="Available Seats"
          onChange={(e) => handleChange(e)}
        />
      </div> */}
      <div className="grid-container">
        {result.map((d) => (
          <Card data={d} admin={true} />
        ))}
      </div>
    </>
  );
};

export default Flights;
