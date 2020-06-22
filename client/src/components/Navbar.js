import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { UserContext } from "../App";

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const logout = () => {
    localStorage.clear();
    dispatch({ type: "CLEAR" });
    history.push("/login");
  };
  const renderList = () => {
    if (state) {
      return [
        <li key="home">
          <NavLink to="/">Home</NavLink>
        </li>,
        <li key="create-post">
          <NavLink to="/create-post">Create Post</NavLink>
        </li>,
        <li key="profile">
          <NavLink to="/profile">Profile</NavLink>
        </li>,
        <li key="logout">
          <a onClick={logout}>Logout</a>
        </li>,
      ];
    } else {
      return [
        <li key="login">
          <NavLink to="/login">Login</NavLink>
        </li>,
        <li key="signup">
          <NavLink to="/signup">Sign Up</NavLink>
        </li>,
      ];
    }
  };
  return (
    <nav>
      <div className="nav-wrapper white">
        <a href={state ? "/" : "/signin"} className="brand-logo">
          Instaclone
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {renderList()}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;