import React from "react";
import "./CreatePost.css";

const CreatePost = () => {
  return (
    <div className="card">
      <div className="card-upload input-field">
        <h4>Add an image:</h4>
        <input type="text" placeholder="Description" />
        <div class="file-field input-field">
          <div class="btn">
            <span>Upload image</span>
            <input type="file" />
          </div>
          <div class="file-path-wrapper">
            <input class="file-path validate" type="text" />
          </div>
        </div>
        <button className="btn waves-effect">Submit</button>
      </div>
    </div>
  );
};

export default CreatePost;
