import React from "react";

import "./Card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
const Card = (props) => {
  // console.log(props.data);
  var prop = props.data;
  return (
    <div>
      <div>
        <div className="">
          <div className="">
            <div
              className="card-body d-flex flex-column justify-content-between text-white p-0"
              style={{ width: "400px" }}
            >
              <div className="p-4 bg-top">
                <h1 style={{ textAlign: "center" }}>{prop.airline}</h1>
                <div className="d-flex flex-row justify-content-between">
                  <div className="d-flex flex-column justify-content-between align-items-center">
                    {/* <h1>{prop.airline}</h1> */}
                    <span className="mb-2">
                      {prop.departureAirport.split(" ")[0]}
                    </span>
                    <span>
                      {new Date(prop.departureTime).toLocaleDateString(
                        "en-US",
                        { weekday: "short", month: "short", day: "numeric" }
                      )}
                    </span>
                    <span>
                      {new Date(prop.departureTime).toLocaleTimeString(
                        "en-US",
                        { hour: "numeric", minute: "numeric", hour12: true }
                      )}
                    </span>
                  </div>
                  <div className="d-flex flex-column justify-content-center">
                    <i className="fa fa-plane fa-3x"></i>
                    <FontAwesomeIcon icon={faPlane} size="3x" />
                  </div>
                  <div className="d-flex flex-column justify-content-between align-items-center">
                    <span className="mb-2">
                      {prop.arrivalAirport.split(" ")[0]}
                    </span>
                    <span>
                      {" "}
                      {new Date(prop.arrivalTime).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span>
                      {new Date(prop.arrivalTime).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-danger p-4">
                <div className="d-flex flex-column justify-content-between">
                  <div className="d-flex flex-row justify-content-between text-center">
                    <div>
                      <span className="d-block font-weight-bold">Flight</span>
                      <span>{prop.flightNumber}</span>
                    </div>
                    <div>
                      <span className="d-block font-weight-bold">Gate</span>
                      <span>12</span>
                    </div>
                    <div>
                      <span className="d-block font-weight-bold">Terminal</span>
                      <span>B</span>
                    </div>
                    <div>
                      <span className="d-block font-weight-bold">
                        Boarding Time
                      </span>
                      <span>
                        {" "}
                        {new Date(prop.departureTime).toLocaleTimeString(
                          "en-US",
                          { hour: "numeric", minute: "numeric", hour12: true }
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="doted-lines">
                    <hr className="dotted-line" />
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                    <div
                      className="d-flex flex-column"
                      style={{ marginTop: "18px" }}
                    >
                      <div>
                        <span className="d-block font-weight-bold">
                          Passenger
                        </span>
                        <span>Eric Rigs</span>
                      </div>
                      <div className="mt-3">
                        <span className="d-block font-weight-bold">Seat</span>
                        <span>{prop.seats}</span>
                      </div>
                    </div>
                    <div className="d-flex" style={{ marginLeft: "142px" }}>
                      <div className="mt-3 ">
                        <div style={{ marginBottom: "12px" }} className="">
                          <span className="d-block font-weight-bold">
                            Available Seat
                          </span>
                          <span>{prop.availableSeats}</span>
                        </div>

                        {props.admin === false && (
                          <a
                            href={`/user/booking/${prop._id}`}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            <button className="button-62">
                              Book your ticket
                            </button>
                          </a>
                        )}

                        {props.admin === true && (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "10px",
                            }}
                          >
                            <button className="button-62">
                              <a
                                href={`/admin/addflight/${prop._id}`}
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                }}
                              >
                                Update the flight
                              </a>
                            </button>
                            <button className="button-62">
                              <a
                                href={`/admin/flight/delete/${prop._id}`}
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                }}
                              >
                                Delete the flight
                              </a>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
