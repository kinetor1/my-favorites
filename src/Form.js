import React, { useState, useEffect } from "react";
import "./Form.css";

const Form = ({ onSubmit, toggleModal }) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [isValidImage, setIsValidImage] = useState(true);
  const [localImg, setLocalImg] = useState(null);

  useEffect(() => {
    const commonImageExtensions = /\.(png|jpg|jpeg|gif|bmp|svg)$/i;
    setIsValidImage(commonImageExtensions.test(imgUrl) || imgUrl === "");
  }, [imgUrl]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ name, url, imgUrl: localImg || imgUrl });
    setName("");
    setUrl("");
    setImgUrl("");
    setLocalImg(null);
    toggleModal();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLocalImg(e.target.result);
      };
      reader.readAsDataURL(file);
    }
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
          required={!localImg}
        />
        {!isValidImage && (
          <p className="warning-message">
            Warning: Image URL should end with a common image file extension
            (e.g. .png, .jpg, .jpeg, .gif, .bmp, .svg).
          </p>
        )}
        {imgUrl && (
          <div className="image-preview">
            <img src={imgUrl} alt="Preview" />
          </div>
        )}
        <label htmlFor="localImg">Or upload an image:</label>
        <input
          type="file"
          id="localImg"
          accept="image/*"
          onChange={handleFileChange}
        />
        {localImg && (
          <div className="image-preview">
            <img src={localImg} alt="preview" />
          </div>
        )}
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Form;
