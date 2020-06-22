import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
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
          if (item._id == result._id) {
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

  return (
    <div className="row-center">
      <div className="column">
        {data
          ? data.map((item) => {
              return (
                <div className="card card-post" key={item._id}>
                  <div className="card-image">
                    <img src={item.url} alt={`Img ${item._id}`} />
                  </div>
                  <div className="card-content">
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
                    <h5>
                      <strong>{item.postedBy.name}</strong>
                    </h5>
                    <h5>{item.description}</h5>
                    <input type="text" placeholder="Add a comment" />
                  </div>
                </div>
              );
            })
          : "No posts found."}
      </div>
    </div>
  );
};

export default Home;
