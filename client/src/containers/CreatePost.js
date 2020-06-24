import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Loading from "../components/Loading";
import M from "materialize-css";
import "./CreatePost.css";

const CreatePost = () => {
  const history = useHistory();
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (url) {
      //create post
      fetch("/create-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          description,
          url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setIsLoading(false);
            M.toast({ html: data.error });
          } else {
            setIsLoading(false);
            M.toast({ html: "Created post successfully." });
            history.push("/");
          }
        });
    }
  }, [url]);

  const postDetails = () => {
    setIsLoading(true);
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
        setUrl(data.url);
      })
      .catch((err) => console.log(err));
  };

  let content = (
    <React.Fragment>
      <h4>Add an image:</h4>
      <input
        type="text"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="file-field input-field">
        <div className="btn">
          <span>Upload image</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button className="btn waves-effect" onClick={postDetails}>
        Submit
      </button>
    </React.Fragment>
  );
  if (isLoading) {
    content = <Loading />;
  }
  return (
    <div className="card">
      <div className="card-upload input-field">{content}</div>
    </div>
  );
};

export default CreatePost;
