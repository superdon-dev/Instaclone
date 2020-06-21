import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import M from "materialize-css";
import "./Signup.css";

const Signup = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const postData = () => {
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error });
        } else {
          M.toast({ html: data.message });
          history.push("/login");
        }
      });
  };
  return (
    <div className="card">
      <div className="card-auth input-field">
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
        <button className="btn waves-effect" onClick={postData}>
          SignUp
        </button>
        <h6>
          <NavLink to="/login">Aleady have an account?</NavLink>
        </h6>
      </div>
    </div>
  );
};

export default Signup;
