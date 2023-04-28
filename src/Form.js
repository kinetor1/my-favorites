import React, { useState } from "react";
import "./Form.css";

const Form = ({ onSubmit, toggleModal }) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ name, url, imgUrl });
    setName("");
    setUrl("");
    setImgUrl("");
    toggleModal();
  };

  return (
    <div className="form-modal">
      <form onSubmit={handleSubmit} className="form-container">
        <div className="modal-header">
          <h2>Add a Favorite</h2>
          <button className="close-button" onClick={toggleModal}>
            X
          </button>
        </div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="url">URL:</label>
        <input
          type="url"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <label htmlFor="imgUrl">Image URL:</label>
        <input
          type="url"
          id="imgUrl"
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
          required
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Form;
