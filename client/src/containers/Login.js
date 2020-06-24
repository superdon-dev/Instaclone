import React, { useState, useContext } from "react";
import Loading from "../components/Loading";
import { NavLink, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import M from "materialize-css";
import "./Login.css";

const Login = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const postData = () => {
    setIsLoading(true);
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
          setIsLoading(false);
          M.toast({ html: data.error });
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
          M.toast({ html: "Successfully signedin." });
          history.push("/");
        }
      });
  };

  let content = (
    <React.Fragment>
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

export default Login;
