import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="row">
      <div className="card">
        <div className="card-image">
          <img
            src="https://avatars3.githubusercontent.com/u/36360335?s=460&u=60efbfa1383ca82470a4333e8cfd2cd82dfb8ff3&v=4"
            alt="Profile"
          />
        </div>
        <div className="card-content">
          <i className="material-icons">favorite</i>
          <p>this is amazing post</p>
          <input type="text" placeholder="Add a comment" />
        </div>
      </div>
    </div>
  );
};

export default Home;
