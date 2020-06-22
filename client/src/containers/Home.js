import React, { useState, useEffect } from "react";
import "./Home.css";

const Home = () => {
  const [data, setData] = useState([]);
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
                    <i className="material-icons">favorite</i>
                    <p>{item.description}</p>
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
