import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    fetch("/posts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.posts);
      });
  }, []);

  const impressionSend = (id, impression) => {
    fetch(`/${impression}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        //update elements
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const commentSend = (text, postId) => {
    fetch("/comment", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePost = (postId) => {
    fetch(`/delete-post/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.filter((item) => {
          return item._id !== result._id;
        });
        setData(newData);
      });
  };

  return (
    <div className="row-center">
      <div className="column">
        {data.map((item) => {
          return (
            <div className="card card-post" key={item._id}>
              <div className="card-image">
                <img src={item.url} alt={`Img ${item._id}`} />
              </div>
              <div className="card-content">
                <h5>
                  <strong>
                    <Link to={`/profile/${item.postedBy._id}`}>
                      {item.postedBy.name}
                    </Link>
                    {item.postedBy._id === state._id && (
                      <i
                        className="material-icons"
                        onClick={() => deletePost(item._id)}
                      >
                        delete
                      </i>
                    )}
                  </strong>
                </h5>
                <i className="material-icons" style={{ color: "red" }}>
                  favorite
                </i>
                {!item.likes.includes(state._id) ? (
                  <i
                    className="material-icons"
                    onClick={() => impressionSend(item._id, "like")}
                  >
                    thumb_up
                  </i>
                ) : (
                  <i
                    className="material-icons"
                    onClick={() => impressionSend(item._id, "dislike")}
                  >
                    thumb_down
                  </i>
                )}
                <h5>{item.likes.length} likes</h5>
                <h5>{item.description}</h5>
                {item.comments.map((record) => {
                  return (
                    <h6 key={`Com ${record._id}`}>
                      <span>
                        <strong>{record.postedBy.name}</strong>{" "}
                      </span>
                      {record.text}
                    </h6>
                  );
                })}
                <form
                  action=""
                  onSubmit={(e) => {
                    e.preventDefault();
                    commentSend(e.target[0].value, item._id);
                    e.target[0].value = "";
                  }}
                >
                  <input type="text" placeholder="Add a comment" />
                </form>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
