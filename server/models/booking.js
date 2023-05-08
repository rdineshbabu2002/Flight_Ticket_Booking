const mongoose = require("mongoose");
const User = require("./user");
const Flight = require("./flight");

const flightBookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    flight: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Flight,
      required: true,
    },
    passengers: [
      {
        name: {
          type: String,
          required: true,
        },
        age: {
          type: Number,
          required: true,
        },
        gender: {
          type: String,
          required: true,
        },
      },
    ],
    totalCost: {
      type: Number,
      required: true,
    },
    bookingDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Success", "Failure"],
      required: true,
      default: "Pending",
    },
  },
  { timestamps: true }
);
flightBookingSchema.pre("save", async function (req, res, next) {
  const response = await Flight.findById(this.flight);
  // console.log(response);
  if (response.availableSeats - this.passengers.length < 0) {
    return next(new Error("There is less available seats"));
  }
  response.availableSeats = response.availableSeats - this.passengers.length;
});
const FlightBooking = mongoose.model("FlightBooking", flightBookingSchema);

module.exports = FlightBooking;
