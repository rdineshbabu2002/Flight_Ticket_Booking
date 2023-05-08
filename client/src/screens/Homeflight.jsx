import React from "react";
import Navbars from "../components/Navbar";
import Home from "../components/Home";

const Homeflight = () => {
  return (
    <div>
      <Navbars home={true} />
      <Home />
    </div>
  );
};

export default Homeflight;
