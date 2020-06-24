import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Loading from "../components/Loading";
import M from "materialize-css";
import "./Signup.css";

const Signup = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (url) {
      uploadFields();
    }
  }, [url]);

  const uploadImage = () => {
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
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const uploadFields = () => {
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        password,
        email,
        image: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setIsLoading(false);
          M.toast({ html: data.error });
        } else {
          M.toast({ html: data.message });
          history.push("/login");
        }
      });
  };

  const postData = () => {
    setIsLoading(true);
    if (image) {
      uploadImage();
    } else {
      uploadFields();
    }
  };

  let content = (
    <React.Fragment>
      <h4>Create new account:</h4>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="E-mail"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
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
      <button className="btn waves-effect" onClick={postData}>
        SignUp
      </button>
      <h6>
        <NavLink to="/login">Aleady have an account?</NavLink>
      </h6>
    </React.Fragment>
  );
  if (isLoading) {
    content = <Loading />;
  }
  return (
    <div className="card">
      <div className="card-auth input-field">{content}</div>
    </div>
  );
};

export default Signup;
