import React from "react";
import("./Home.css");

const Home = () => {
  return (
    <div>
      {" "}
      <div className="home">
        <div className="container">
          <p className="ultimate">The ultimate travel experience</p>
          <h1 className="places">Explore Beautiful Places</h1>
        </div>
        <div className="tophead">
          <div className="location">
            <div className="local">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="icon-name"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              <p className="location">Location</p>
            </div>
            <input
              className="inputtext"
              placeholder="Where do you want to go ?"
              type={"text"}
              // value={location}
              // onChange={(e) => setlocation(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
