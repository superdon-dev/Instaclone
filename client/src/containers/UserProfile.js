import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";
import "./Profile.css";
import { userParams, useParams } from "react-router-dom";

const Profile = () => {
  const { userId } = useParams();
  const { state, dispatch } = useContext(UserContext);
  const [userProfile, setUserProfile] = useState(null);
  useEffect(() => {
    fetch(`/user/${userId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUserProfile(result);
        console.log(result);
      });
  }, []);
  return userProfile ? (
    <React.Fragment>
      <div className="row">
        <div className="column">
          <img
            className="column-picture"
            src="https://avatars3.githubusercontent.com/u/36360335?s=460&u=60efbfa1383ca82470a4333e8cfd2cd82dfb8ff3&v=4"
            alt="Profile"
          />
        </div>
        <div className="column-left">
          <h4>{userProfile ? userProfile.user.name : "loading"}</h4>
          <div className="column-links">
            <h6>{userProfile.posts.length} posts</h6>
            <h6>40 followers</h6>
            <h6>40 following</h6>
          </div>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="gallery">
          {userProfile.posts.map((item) => {
            return (
              <img
                className="gallery-item"
                src={item.url}
                alt={`Img ${item._id}`}
              />
            );
          })}
        </div>
      </div>
    </React.Fragment>
  ) : (
    <h2>Loading...</h2>
  );
};

export default Profile;
