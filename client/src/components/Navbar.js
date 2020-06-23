import React, { useContext, useRef, useEffect, useState } from "react";
import { NavLink, useHistory, Link } from "react-router-dom";
import { UserContext } from "../App";
import M from "materialize-css";

const Navbar = () => {
  const searchModal = useRef(null);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    M.Modal.init(searchModal.current);
  }, []);

  const logout = () => {
    localStorage.clear();
    dispatch({ type: "CLEAR" });
    history.push("/login");
  };

  const fetchUsers = (query) => {
    setSearch(query);
    fetch("/search-users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    })
      .then((res) => res.json())
      .then((results) => {
        setUsers(results.users);
      });
  };

  const renderList = () => {
    if (state) {
      return [
        <li key="search">
          <i
            data-target="modal1"
            className="large material-icons icon-search modal-trigger"
          >
            search
          </i>
        </li>,
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
      {/* modal */}
      <div id="modal1" className="modal" ref={searchModal}>
        <div className="modal-content">
          <input
            type="text"
            placeholder="Search users:"
            value={search}
            onChange={(e) => fetchUsers(e.target.value)}
          />
          <div className="collection">
            {users.map((user) => {
              return (
                <Link
                  key={`Item ${user.name}`}
                  to={
                    user._id !== state._id ? `/profile/${user._id}` : "profile"
                  }
                  className="collection-item"
                  onClick={() => {
                    M.Modal.getInstance(searchModal.current).close();
                    setSearch("");
                    setUsers([]);
                  }}
                >
                  {user.name}
                </Link>
              );
            })}
          </div>
          <button className="btn modal-close waves-effect">Close</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
