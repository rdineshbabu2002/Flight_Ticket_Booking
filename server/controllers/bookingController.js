const express = require("express");
const FlightBooking = require("../models/booking");
const Flight = require("../models/flight");

// GET all flight bookings
exports.getallbooking = async (req, res) => {
  const queryObj = { ...req.query };

  // Loop through the keys of queryObj
  Object.keys(queryObj).forEach((key) => {
    // Check if the field requires regex
    if (
      key === "airline" ||
      key === "flightNumber" ||
      key === "departureAirport" ||
      key === "arrivalAirport"
    ) {
      // Add regex pattern to the value of the field
      queryObj[key] = { $regex: queryObj[key], $options: "i" };
    }
  });

  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  // const response = await FlightBooking.find({}).populate("user flight");
  // const Flight = require("./models/flight");
  // const Booking = require("./models/booking");

  // const flightNumbers = ["AC123", "EK789"]; // the flight numbers you want to find bookings for
  let resp;
  Flight.find(JSON.parse(queryStr))
    .then((flights) => {
      const flightIds = flights.map((flight) => flight._id);

      FlightBooking.find({ flight: { $in: flightIds } })
        .populate("user flight")
        .then((bookings) => {
          resp = bookings;
          console.log(`Bookings for flights :`);
          console.log("hfh", bookings);
          res.json(bookings);
        })
        .catch((err) => {
          console.error(err);
        });
    })
    .catch((err) => {
      console.error(err);
    });

  const response = await FlightBooking.find()
    .populate("user flight")
    .find({ "flight.flightName": "AC123" });

  // const response = await response.find({ totalCost: 500 });
  // console.log(response);
  // console.log(query);
  // console.log(JSON.parse(queryStr));
  // const features = new APIFeatures(Flight.find(filter), req.query).filter();
  // const doc = await Flight.find();

  // const flightBookings = await FlightBooking.find().populate("user flight");
  // res.json(flightBookings);
};
exports.getbooking = async (req, res) => {
  console.log(req.query);
  const flightBooking = await FlightBooking.findById(req.params.id).populate(
    "user flight"
  );

  res.json(response);
};

// POST a new flight booking
exports.addbooking = async (req, res) => {
  // console.log(req.body.flight);
  const response = await Flight.findById(req.body.flight);
  // console.log(response);
  if (response.availableSeats - req.body.passengers.length < 0) {
    res.status(404).json({ data: "Seat unavailable" });
  }
  response.availableSeats =
    response.availableSeats - req.body.passengers.length;
  await Flight.findByIdAndUpdate(req.body.flight, response, {
    new: true,
  });
  const flightBooking = new FlightBooking(req.body);
  await flightBooking.save();
  // res.json(flightBooking);
};

exports.mybooking = async (req, res) => {
  try {
    console.log(req.user);
    const response = await FlightBooking.find({ user: req.user._id }).populate(
      "user flight"
    );
    res.status(200).json({ data: response });
  } catch {
    res.status(400).json({ data: "not found" });
  }
};
// PUT (update) a flight booking by ID
exports.updatebooking = async (req, res) => {
  const flightBooking = await FlightBooking.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(flightBooking);
};

// DELETE a flight booking by ID
exports.deletebooking = async (req, res) => {
  const booking = await FlightBooking.findById(req.params.id);

  let flight = await Flight.findById(booking.flight);
  console.log(booking.passengers.length);
  console.log("hi");
  flight.availableSeats = flight.availableSeats + booking.passengers.length;
  const flightresponse = await Flight.findByIdAndUpdate(
    booking.flight,
    flight,
    {
      new: true,
    }
  );
  // await FlightBooking.findByIdAndDelete(req.params.id);
  res.json({ message: "Flight booking deleted" });
};
