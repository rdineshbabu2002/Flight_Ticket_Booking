import React, { useEffect, useState } from "react";
import axios from "axios";
import Bookingcard from "../components/Bookingcard";
import Navbar from "../components/Navbar";

const Mybooking = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getbooking = (req, res) => {
      setLoading(true);
      axios
        .get("/api/v1/bookings/mybooking")
        .then((response) => {
          console.log(response.data.data);
          setData(response.data.data);
          console.log(data);
          if (response.data.data.length !== 0) {
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(true);
        });
    };
    getbooking();
  }, []);
  if (loading) {
    return <div>Loading ....</div>;
  }
  return (
    <div>
      <Navbar />
      <h1 style={{ textAlign: "center", marginTop: "12px" }}>Your Bookings</h1>
      <div className="card-top">
        {data.map((d) => (
          <Bookingcard booking={d} />
        ))}
      </div>
    </div>
  );
};

export default Mybooking;
