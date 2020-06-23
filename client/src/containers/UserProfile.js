import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";
import "./Profile.css";
import { userParams, useParams } from "react-router-dom";

const Profile = () => {
  const { userId } = useParams();
  const { state, dispatch } = useContext(UserContext);
  const [userProfile, setUserProfile] = useState(null);
  const [showFollow, setShowFollow] = useState(
    state ? !state.following.includes(userId) : true
  );

  useEffect(() => {
    fetch(`/user/${userId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUserProfile(result);
      });
  }, []);

  const followUser = () => {
    fetch("/follow", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ followId: userId }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "UPDATE",
          payload: {
            followers: data.followers,
            following: data.following,
          },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setUserProfile((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, data._id],
            },
          };
        });
      });
    setShowFollow(false);
  };

  const unfollowUser = () => {
    fetch("/unfollow", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ unfollowId: userId }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "UPDATE",
          payload: {
            followers: data.followers,
            following: data.following,
          },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setUserProfile((prevState) => {
          const newFollower = prevState.user.followers.filter(
            (item) => item !== data._id
          );
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollower,
            },
          };
        });
      });
    setShowFollow(true);
  };
  return userProfile ? (
    <React.Fragment>
      <div className="row">
        <div className="column">
          <img
            className="column-picture"
            src={userProfile.user.image}
            alt="Profile"
          />
        </div>
        <div className="column-left">
          <h4>{userProfile ? userProfile.user.name : "loading"}</h4>
          <div className="column-links">
            <h6>{userProfile.posts.length} posts</h6>
            <h6>{userProfile.user.followers.length} followers</h6>
            <h6>{userProfile.user.following.length} following</h6>
          </div>
          {showFollow ? (
            <button
              className="btn waves-effect btn-follow"
              onClick={() => followUser()}
            >
              Follow
            </button>
          ) : (
            <button
              className="btn waves-effect btn-follow"
              onClick={() => unfollowUser()}
            >
              Unfollow
            </button>
          )}
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
