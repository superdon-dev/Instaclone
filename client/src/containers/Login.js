import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import M from "materialize-css";
import "./Login.css";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const postData = () => {
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error });
        } else {
          M.toast({ html: "Successfully signedin." });
          history.push("/");
        }
      });
  };
  return (
    <div class="card">
      <div className="card-auth input-field">
        <h4>Login:</h4>
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
          Login
        </button>
        <h6>
          <NavLink to="/signup">Don't have an account?</NavLink>
        </h6>
      </div>
    </div>
  );
};

export default Login;
