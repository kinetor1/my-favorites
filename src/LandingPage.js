import React, { useState, useEffect } from "react";
import "./LandingPage.css";
import Form from "./Form";
import Sites from "./Sites";

const LandingPage = () => {
  const [sites, setSites] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const storedSites = localStorage.getItem("sites");
    if (storedSites) {
      setSites(JSON.parse(storedSites));
    }
  }, []);

  const toggleModal = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = (newSite) => {
    const updatedSites = [...sites, newSite];
    setSites(updatedSites);
    localStorage.setItem("sites", JSON.stringify(updatedSites)); // Save the updated sites array to local storage
    toggleModal();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const uploadedSites = JSON.parse(e.target.result);
      setSites(uploadedSites);
      localStorage.setItem("sites", JSON.stringify(uploadedSites));
    };
    reader.readAsText(file);
  };

  const downloadSites = () => {
    const data = JSON.stringify(sites);
    const blob = new Blob([data], { type: "text/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "sites.json";
    link.click();
  };

  return (
    <div className="landing-page">
      <header className="header">
        <div className="header-buttons">
          <button className="add-button" onClick={toggleModal}>
            <span className="plus-sign">+</span>
          </button>
          <button className="save-button" onClick={downloadSites}>
            Save
          </button>
          <input
            type="file"
            accept=".json"
            className="upload-button"
            onChange={handleFileUpload}
            style={{ display: "none" }} // Hide the input element
            id="file-upload" // Add an id attribute for easy reference
          />
          <label htmlFor="file-upload" className="browse-button">
            Load
          </label>
        </div>
      </header>
      <div className="cards-container">
        <Sites sites={sites} />
      </div>
      {showForm && <Form onSubmit={handleSubmit} toggleModal={toggleModal} />}
    </div>
  );
};

export default LandingPage;
