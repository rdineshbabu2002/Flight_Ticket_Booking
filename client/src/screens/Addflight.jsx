import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import axios from "axios";
// import "./Booking.css";

const Addflight = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setdata] = useState({
    airline: "dev",
    flightNumber: "1234",
    departureAirport: "Salem",
    arrivalAirport: "Coimbatore",
    departureTime: "12",
    arrivalTime: "12",
    price: "120",
    seats: "60",
    availableSeats: "60",
  });

  useEffect(() => {
    if (id !== undefined) {
      axios
        .get(`/api/v1/flights/${id}`)
        .then((response) => {
          console.log(response.data);
          const options = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "numeric",
            minute: "numeric",
          };
          const date = new Date(response.data.departureTime);
          date.setHours(date.getHours() + 5);
          date.setMinutes(date.getMinutes() + 30);
          response.data.departureTime = date;
          response.data.departureTime = new Date(response.data.departureTime)
            .toISOString()
            .slice(0, 16);
          // new Date(response.data.departureTime)
          //   .toLocaleString(undefined, options)
          //   .replace(", ", "T");
          // response.data.departureTime = new Date(response.data.departureTime)
          //   .toLocaleString()
          //   .replace(/:\d{2}\.\d{3}/, "")
          //   .replace("Z", "");
          const arrivaldate = new Date(response.data.arrivalTime);
          arrivaldate.setHours(date.getHours() + 5);
          arrivaldate.setMinutes(date.getMinutes() + 30);
          response.data.arrivalTime = arrivaldate;
          response.data.arrivalTime = new Date(response.data.arrivalTime)
            .toISOString()
            .replace(/:\d{2}\.\d{3}/, "")
            .replace("Z", "");
          setdata(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  const changeValue = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
  };

  const submit = (e) => {
    e.preventDefault();
    if (id !== undefined) {
      updateflight(data);
    } else {
      addflight(data);
    }
  };
  const updateflight = (data) => {
    axios
      .post(`/api/v1/flights/update/${id}`, data)
      .then((response) => {
        console.log(response.data);
        navigate("/admin/flights");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addflight = (data) => {
    console.log(data);
    axios
      .post("/api/v1/flights/add", data)
      .then((response) => {
        console.log(response);
        navigate("/admin/flights");
      })
      .catch((err) => {
        console.log(err);
      });
    // localStorage.setItem("customers", JSON.stringify(temp));
    // navigate("/");
  };
  return (
    <div>
      <AdminNavbar />
      <h3 className="title"> Enter Flight Details :</h3>
      <form className="addcustomer" onSubmit={submit}>
        <div className="element">
          <label className="formlabel" htmlFor="airline">
            Enter Airline Name :
          </label>
          <input
            required
            className="forminput"
            type="text"
            name="airline"
            id="airline"
            onChange={changeValue}
            placeholder="Enter Airline name"
            value={data.airline}
          />
        </div>
        <div className="element">
          <label className="formlabel" htmlFor="flightNumber">
            Enter Flight Number :
          </label>
          <input
            required
            className="forminput"
            type="text"
            name="flightNumber"
            id="flightNumber"
            onChange={changeValue}
            placeholder="Enter Flight Number"
            value={data.flightNumber}
          />
        </div>
        <div className="element">
          <label className="formlabel" htmlFor="departureAirport">
            Enter Departure Airport :
          </label>
          <input
            required
            className="forminput"
            type="text"
            name="departureAirport"
            id="departureAirport"
            onChange={changeValue}
            placeholder="Enter Departure Airport"
            value={data.departureAirport}
          />
        </div>
        <div className="element">
          <label className="formlabel" htmlFor="arrivalAirport">
            Enter Arrival Airport :
          </label>
          <input
            required
            className="forminput"
            type="text"
            name="arrivalAirport"
            id="arrivalAirport"
            onChange={changeValue}
            placeholder="Enter Arrival Airport"
            value={data.arrivalAirport}
          />
        </div>
        <div className="element">
          <label className="formlabel" htmlFor="departureTime">
            Enter Departure Time :
          </label>
          <input
            required
            className="forminput"
            type="datetime-local"
            name="departureTime"
            id="departureTime"
            onChange={changeValue}
            placeholder="Enter Departure Time"
            value={data.departureTime}
          />
        </div>
        <div className="element">
          <label className="formlabel" htmlFor="arrivalTime">
            Enter Arrival Time :
          </label>
          <input
            required
            className="forminput"
            type="datetime-local"
            name="arrivalTime"
            id="arrivalTime"
            onChange={changeValue}
            placeholder="Enter Arrival Time"
            value={data.arrivalTime}
          />
        </div>

        <div className="element">
          <label className="formlabel" htmlFor="price">
            Enter Price :
          </label>
          <input
            required
            className="forminput"
            type="number"
            name="price"
            value={data.price}
            id="price"
            placeholder="Enter Price"
            onChange={changeValue}
          />
        </div>
        <div className="element">
          <label className="formlabel" htmlFor="seats">
            Enter Seats :
          </label>
          <input
            required
            className="forminput"
            type="number"
            name="seats"
            value={data.seats}
            id="seats"
            max={60}
            placeholder="Enter Seats"
            onChange={changeValue}
          />
        </div>
        <div className="element">
          <label className="formlabel" htmlFor="availableSeats">
            Enter Available Seats :
          </label>
          <input
            required
            className="forminput"
            type="number"
            name="availableSeats"
            value={data.availableSeats}
            max={60}
            id="availableSeats"
            placeholder="Enter Available Seats"
            onChange={changeValue}
          />
        </div>
        <input className="button" type={"submit"} value="Submit" />
      </form>
    </div>
  );
};

export default Addflight;
