import React from "react";
import "./CreatePost.css";

const CreatePost = () => {
  return (
    <div className="card">
      <div className="card-upload input-field">
        <h4>Add an image:</h4>
        <input type="text" placeholder="Description" />
        <div className="file-field input-field">
          <div className="btn">
            <span>Upload image</span>
            <input type="file" />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        <button className="btn waves-effect">Submit</button>
      </div>
    </div>
  );
};

export default CreatePost;
