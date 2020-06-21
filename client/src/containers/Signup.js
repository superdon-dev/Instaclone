import React from "react";
import { NavLink } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  return (
    <div class="card">
      <div className="card-auth input-field">
        <h4>Create new account:</h4>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="E-mail" />
        <input type="password" placeholder="Password" />
        <button className="btn waves-effect">SignUp</button>
        <h6>
          <NavLink to="/login">Aleady have an account?</NavLink>
        </h6>
      </div>
    </div>
  );
};

export default Signup;
