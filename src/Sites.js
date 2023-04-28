import React from "react";
import "./Sites.css";

const SiteCard = ({ site }) => (
  <a
    href={site.url}
    target="_blank"
    rel="noreferrer"
    className="site-card-link"
  >
    {" "}
    {/* Add the new class */}
    <div className="site-card">
      <h3>{site.name}</h3>
      <img src={site.imgUrl} alt={site.name} />
    </div>
  </a>
);

const Sites = ({ sites }) => {
  return (
    <div className="sites-container">
      {sites.map((site) => (
        <SiteCard key={site.url} site={site} />
      ))}
    </div>
  );
};

export default Sites;
