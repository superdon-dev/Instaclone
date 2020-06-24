import React, { useEffect, useState, useContext } from "react";
import Loading from "../components/Loading";
import { UserContext } from "../App";
import "./Profile.css";

const Profile = () => {
  const { state, dispatch } = useContext(UserContext);
  const [mypics, setPics] = useState([]);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/my-posts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPics(result.posts);
        setIsLoading(false);
      });
  }, []);
  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "instaclone");
      data.append("cloud_name", "de2hosdqv");
      fetch("https://api.cloudinary.com/v1_1/de2hosdqv/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          fetch("/update-image", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              image: data.url,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              setUrl(result.image);
              localStorage.setItem(
                "user",
                JSON.stringify({ ...state, image: result.image })
              );
              dispatch({ type: "UPDATE_IMAGE", payload: result.image });
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [image]);

  const updateImage = (file) => {
    setImage(file);
  };
  let content = <Loading />;
  if (!isLoading) {
    content = (
      <React.Fragment>
        <div className="row">
          <div className="column">
            <img
              className="column-picture"
              src={state ? state.image : "loading"}
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

            <div className="file-field input-field">
              <div className="btn">
                <span>Upload image</span>
                <input
                  type="file"
                  onChange={(e) => updateImage(e.target.files[0])}
                />
              </div>
            </div>

            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="gallery">
            {mypics.map((item) => {
              return (
                <img
                  key={item._id}
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
  }

  return (
    <div className="row">
      <div className="column">{content}</div>
    </div>
  );
};

export default Profile;
