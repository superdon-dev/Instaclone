import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";
import "./Profile.css";

const Profile = () => {
  const { state, dispatch } = useContext(UserContext);
  const [mypics, setPics] = useState([]);
  useEffect(() => {
    fetch("/my-posts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPics(result.posts);
      });
  }, []);
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
        <div className="column-left">
          <h4>{state ? state.name : "loading"}</h4>
          <div className="column-links">
            <h6>{mypics.length} posts</h6>
            <h6>{state ? state.followers.length : 0} followers</h6>
            <h6>{state ? state.following.length : 0} following</h6>
          </div>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="gallery">
          {mypics.map((item) => {
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
  );
};

export default Profile;
