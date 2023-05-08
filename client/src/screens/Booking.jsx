import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Booking.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Booking = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchdata = async () => {
      setLoading(true);
      axios
        .get("/api/v1/users/me")
        .then((response) => {
          if (response.status === 200) {
            setUser(response.data.data);
            console.log(response.data.data);
            if (response.data.data.length === 0) {
              setLoading(true);
            } else {
              setLoading(false);
            }
          }
          console.log(response.status);
          // setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(true);
        });
    };
    fetchdata();
    // setLoading(false);
  }, []);

  const [data, setdata] = useState({
    cost: "",
    date: "",
    status: "Pending",
  });
  const [inputValues, setInputValues] = useState([
    { name: "", age: "", gender: "male" },
  ]);

  const handleInputChange = (event, index, field) => {
    console.log(event);
    const { value } = event.target;
    const newInputValues = [...inputValues];
    newInputValues[index][field] = value;
    setInputValues(newInputValues);
  };

  const handleAddInput = () => {
    setInputValues([...inputValues, { name: "", age: "", gender: "male" }]);
  };

  const handleRemoveInput = (index) => {
    const newInputValues = [...inputValues];
    newInputValues.splice(index, 1);
    setInputValues(newInputValues);
  };

  const changeValue = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
  };

  const submit = (e) => {
    e.preventDefault();
    const senddata = async () => {
      axios
        .post("/api/v1/bookings", {
          user: user._id,
          flight: id,
          passengers: inputValues,
          totalCost: data.cost,
          bookingDate: data.date,
          paymentStatus: data.status,
        })
        .then((response) => {
          if (response.status === 200) {
            alert("Sucess");
            navigate("/user/booking");
          }
        })
        .catch((err) => console.log(err));
    };
    senddata();
    console.log(inputValues);
  };
  if (loading) {
    return <div>Loading .....</div>;
  }

  return (
    <div>
      <Navbar />
      <h3 className="title"> Enter Booking Details :</h3>
      <form className="addcustomer" onSubmit={submit}>
        <div className="addrow">
          <div className="column">
            <div>Name</div>
            <div>Age</div>
            <div>Gender</div>
            <div></div>
          </div>

          {inputValues.map((inputValue, index) => (
            <div key={index} className="column">
              <input
                type="text"
                className="ele"
                value={inputValue.name}
                onChange={(event) => handleInputChange(event, index, "name")}
                placeholder="Enter Name"
              />
              <input
                type="number"
                className="ele"
                value={inputValue.age}
                onChange={(event) => handleInputChange(event, index, "age")}
                placeholder="Enter age"
              />
              <select
                className="ele"
                value={inputValue.gender}
                onChange={(event) => handleInputChange(event, index, "gender")}
              >
                <option value="male">Male</option>
                <option value="female">female</option>
              </select>
              <button onClick={() => handleRemoveInput(index)}>Remove</button>
            </div>
          ))}
          <button onClick={handleAddInput}>Add Input</button>
        </div>

        <div className="element">
          <label className="formlabel" htmlFor="cost">
            Total cost:
          </label>
          <input
            required
            className="forminput"
            type="number"
            name="cost"
            id="cost"
            onChange={changeValue}
            placeholder="Enter cost"
            value={data.cost}
          />
        </div>
        <div className="element">
          <label className="formlabel" htmlFor="date">
            Choose Date:
          </label>
          <input
            type="date"
            required
            className="forminput"
            name="date"
            id="date"
            onChange={changeValue}
            value={data.date}
          />
        </div>
        <div className="element">
          <label className="formlabel" htmlFor="payment">
            Choose Payment Status :
          </label>
          <select className="forminput" name="payment" onChange={changeValue}>
            <option value="Pending">Pending</option>
            <option value="Success">Success</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
        <input className="button" type={"submit"} value="Submit" />
      </form>
    </div>
  );
};

export default Booking;
