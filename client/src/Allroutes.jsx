import React from "react";
import { Routes, Route } from "react-router-dom";
import Userlogin from "./screens/Userlogin";
import Usersignup from "./screens/Usersignup";
import User from "./User/User";
import AdminLogin from "./screens/AdminLogin";
import Availableflights from "./screens/Availableflights";
import Booking from "./screens/Booking";
import Mybooking from "./screens/Mybooking";
import Flights from "./screens/Flights";
import Admin from "./screens/Admin";
import Addflight from "./screens/Addflight";
import Deleteflight from "./screens/Deleteflight";
import Deletebooking from "./screens/Deletebooking";
import Viewbooking from "./screens/Viewbooking";
import Homeflight from "./screens/Homeflight";

const Allroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homeflight />} />
      <Route path="/userlogin" element={<Userlogin />} />
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path="/signup" element={<Usersignup />} />
      <Route path="/user" element={<User />} />
      <Route path="/availableflights" element={<Availableflights />} />
      <Route path="/user/booking/:id" element={<Booking></Booking>} />
      <Route path="/user/booking" element={<Mybooking />} />
      <Route path="/admin/flights" element={<Flights />} />
      <Route path="/admin/addflight" element={<Addflight />} />
      <Route path="/admin/addflight/:id" element={<Addflight />} />
      <Route path="/admin/flight/delete/:id" element={<Deleteflight />} />
      <Route path="/admin/viewbooking" element={<Viewbooking />} />
      <Route path="/booking/delete/:id" element={<Deletebooking />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
};

export default Allroutes;
