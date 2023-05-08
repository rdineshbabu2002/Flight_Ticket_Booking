import React from "react";
import "./Bookingcard.css";
const Bookingcard = ({ booking }) => {
  return (
    <div>
      <div className="booking-card card">
        <h2 style={{ textAlign: "center" }}>
          <strong>{booking.flight.airline}</strong>
        </h2>
        <h2 style={{ textAlign: "center" }}>
          <strong>{booking.flight.flightNumber}</strong>
        </h2>
        <p>
          <strong>Name:</strong> {booking.user.name}
        </p>
        <p>
          <strong>Email:</strong> {booking.user.email}
        </p>
        <p>
          <strong>Phone:</strong> {6369408056}
        </p>
        <p>
          <strong>Arrival Date:</strong>
          {booking.flight &&
            new Date(booking.flight.arrivalTime).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
        </p>
        <p>
          <strong>Arrival Time:</strong>
          {booking.flight &&
            new Date(booking.flight.arrivalTime).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
        </p>
        <p>
          <strong>Departure Date:</strong>{" "}
          {booking.flight &&
            new Date(booking.flight.departureTime).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
        </p>
        <p>
          <strong>Departure Time:</strong>
          {booking.flight &&
            new Date(booking.flight.departureTime).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
        </p>
        <p>
          <strong>Number of Passengers:</strong> {booking.passengers.length}
        </p>
        <div className="guest-details">
          {booking.passengers.map((guest, index) => (
            <div key={index}>
              <h3>Passenger {index + 1}</h3>
              <p>
                <strong>Name:</strong> {guest.name}
              </p>
              <p>
                <strong>Age:</strong> {guest.age}
              </p>
              <p>
                <strong>Gender:</strong> {guest.gender}
              </p>
            </div>
          ))}
        </div>
        <p>
          <strong>Message:</strong> {"Hello"}
        </p>
        <a
          href={`/booking/delete/${booking._id}`}
          style={{
            textDecoration: "none",
            color: "black",
          }}
        >
          <button className="button-62">Delete the booking</button>
        </a>
      </div>
    </div>
  );
};

export default Bookingcard;
