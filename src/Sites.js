import React from "react";
import "./Sites.css";

const SiteCard = ({ site, handleDelete }) => (
  <a
    href={site.url}
    target="_blank"
    rel="noreferrer"
    className="site-card-link"
  >
    <div className="site-card">
      <button className="delete-button" onClick={(e) => {
        e.preventDefault(); // Prevent navigating to the link when clicking the delete button
        handleDelete(site);
      }}>X</button>
      <h3>{site.name}</h3>
      <img src={site.imgUrl} alt={site.name} />
    </div>
  </a>
);

const Sites = ({ sites, handleDelete }) => {
  return (
    <div className="sites-container">
      {sites.map((site) => (
        <SiteCard key={site.url} site={site} handleDelete={handleDelete} />
      ))}
    </div>
  );
};

export default Sites;
