import React from "react";
import { Routes, Route } from "react-router-dom";
import Userlogin from "./Userlogin";
import Usersignup from "./Usersignup";

const Allroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Userlogin />} />
      <Route path="/signup" element={<Usersignup />} />
    </Routes>
  );
};

export default Allroutes;
