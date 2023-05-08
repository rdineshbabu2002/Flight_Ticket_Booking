const Flight = require("../models/flight");
const APIFeatures = require("./../utils/apiFeatures");

// GET all flights
exports.getflight = async (req, res) => {
  const response = await Flight.find({});
  res.json(response);
};

exports.getfilterflight = async (req, res) => {
  // console.log(req.query);
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

  const response = await Flight.find(JSON.parse(queryStr));
  // console.log(JSON.parse(queryStr));
  // console.log(response);
  res.json(response);
};

// GET a flight by ID
exports.getoneflight = async (req, res) => {
  const flight = await Flight.findById(req.params.id);
  res.json(flight);
};

// POST a new flight
exports.addflight = async (req, res) => {
  const flight = new Flight(req.body);
  await flight.save();
  res.json(flight);
};

// PUT (update) a flight by ID
exports.updateflight = async (req, res) => {
  const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(flight);
};

// DELETE a flight by ID
exports.deleteflight = async (req, res) => {
  await Flight.findByIdAndDelete(req.params.id);
  res.json({ message: "Flight deleted" });
};
