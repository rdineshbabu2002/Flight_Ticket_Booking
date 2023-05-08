import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import Bookingcard from "../components/Bookingcard";
import AdminNavbars from "../components/AdminNavbar";
const Viewbooking = () => {
  const [dataloading, setdataloading] = useState(false);
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
      // "_id": "6455d2e535e3cd9c87522264",
      user: {
        _id: "64550fac7cd2abc7d139213b",
        name: "Dineshbabu",
        email: "rdineshbabu2002@gmail.com",
        role: "user",
      },
      flight: {
        _id: "6455c8296309a26eff584968",
        airline: "Air Canada",
        flightNumber: "AC123",
        departureAirport: "Toronto Pearson International Airport",
        arrivalAirport: "Vancouver International Airport",
        departureTime: "2023-05-07T08:30:00.000Z",
        arrivalTime: "2023-05-20T14:00:00.000Z",
        price: 300,
        seats: 60,
        availableSeats: 1,
      },
      passengers: [
        {
          name: "John Smith",
          age: 35,
          gender: "Male",
          _id: "6455d2e535e3cd9c87522265",
        },
        {
          name: "Jane Smith",
          age: 32,
          gender: "Female",
          _id: "6455d2e535e3cd9c87522266",
        },
      ],
      totalCost: 900,
      bookingDate: "2023-05-07T15:30:00.000Z",
      paymentStatus: "Pending",
      // "__v": 0
    },
  ]);
  const [loading, setLoading] = useState(false);

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
    let query = "/api/v1/bookings/?";
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
        setLoading(false);
        setdataloading(false);
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

  if (loading) {
    return <p>Loading .....</p>;
  }

  return (
    <div>
      {" "}
      <div>
        <AdminNavbars />
        <h1 style={{ textAlign: "center", marginTop: "12px" }}>
          Your Bookings
        </h1>
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
                  name="flightNumber"
                  value={data.flightNumber}
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
        {dataloading && (
          <div className="card-top">
            {console.log(result)}
            {result.map((d) => (
              <Bookingcard booking={d} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Viewbooking;
