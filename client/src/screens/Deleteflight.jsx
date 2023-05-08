import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const Deleteflight = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);
  useEffect(() => {
    const Deleteflight = () => {
      setLoading(true);
      axios
        .delete(`/api/v1/flights/${id}`)
        .then((response) => {
          console.log(response);
          setLoading(false);
          navigate("/admin/flights");
        })
        .catch((err) => console.log(err));
    };
    Deleteflight();
  }, []);
  if (loading) {
    return <div>Loading ...</div>;
  }
  return <div>Deleteflight</div>;
};

export default Deleteflight;
