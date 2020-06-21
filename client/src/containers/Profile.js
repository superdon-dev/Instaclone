import React from "react";
import "./Profile.css";

const Profile = () => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="column">
          <img
            className="column-picture"
            src="https://avatars3.githubusercontent.com/u/36360335?s=460&u=60efbfa1383ca82470a4333e8cfd2cd82dfb8ff3&v=4"
            alt="Profile"
          />
        </div>
        <div className="column">
          <h4>Superdon</h4>
          <div className="column-links">
            <h6>40 posts</h6>
            <h6>40 followers</h6>
            <h6>40 following</h6>
          </div>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="gallery">
          <img
            className="gallery-item"
            src="https://avatars3.githubusercontent.com/u/36360335?s=460&u=60efbfa1383ca82470a4333e8cfd2cd82dfb8ff3&v=4"
            alt="Profile"
          />
          <img
            className="gallery-item"
            src="https://avatars3.githubusercontent.com/u/36360335?s=460&u=60efbfa1383ca82470a4333e8cfd2cd82dfb8ff3&v=4"
            alt="Profile"
          />
          <img
            className="gallery-item"
            src="https://avatars3.githubusercontent.com/u/36360335?s=460&u=60efbfa1383ca82470a4333e8cfd2cd82dfb8ff3&v=4"
            alt="Profile"
          />
          <img
            className="gallery-item"
            src="https://avatars3.githubusercontent.com/u/36360335?s=460&u=60efbfa1383ca82470a4333e8cfd2cd82dfb8ff3&v=4"
            alt="Profile"
          />
          <img
            className="gallery-item"
            src="https://avatars3.githubusercontent.com/u/36360335?s=460&u=60efbfa1383ca82470a4333e8cfd2cd82dfb8ff3&v=4"
            alt="Profile"
          />
          <img
            className="gallery-item"
            src="https://avatars3.githubusercontent.com/u/36360335?s=460&u=60efbfa1383ca82470a4333e8cfd2cd82dfb8ff3&v=4"
            alt="Profile"
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
