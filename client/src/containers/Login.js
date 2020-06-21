import React from "react";
import { NavLink } from "react-router-dom";
import "./Login.css";

const Login = () => {
  return (
    <div class="card">
      <div className="card-auth input-field">
        <h4>Login:</h4>
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
        <button className="btn waves-effect">Login</button>
        <h6>
          <NavLink to="/signup">Don't have an account?</NavLink>
        </h6>
      </div>
    </div>
  );
};

export default Login;
