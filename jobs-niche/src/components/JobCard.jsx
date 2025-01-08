import React from "react";
import "./JobCard.css";

const JobCard = ({ job, isExpanded, toggleDescription, getRedirectionUrl, trackJobClick }) => {
  const handleApplyNowClick = () => {
    const redirectionUrls = getRedirectionUrl(job.id);
    
    // Track job click with Propush
    trackJobClick(job);

    // Open a new tab with the redirection URLs (or choose one)
    window.open(redirectionUrls[0], '_blank');  // Change index if you want a different link
  };

  return (
    <div className="job-card">
      <h3 className="job-title">{job.title || "Job Title Unavailable"}</h3>
      <p className="company-name">{job.company || "Company Name Unavailable"}</p>
      <p className="job-location">{job.location || "Remote"}</p>
      <div className="star-rating">{renderStars(job.rating || 0)}</div>
      <p className="job-description">
        {isExpanded ? job.snippet : truncateDescription(job.snippet)}
        {job.snippet && job.snippet.length > 300 && (
          <button
            className="toggle-description"
            onClick={() => toggleDescription(job.id)}
          >
            {isExpanded ? "Show less" : "Show more"}
          </button>
        )}
      </p>
      <div className="additional-info">
        <p className="date-posted">Updated: {new Date(job.updated).toLocaleDateString()}</p>
        <p className="employment-type">{job.type || "Employment type not specified"}</p>
        <p className="salary">{job.salary || "Salary not specified"}</p>
      </div>

      {/* Apply Button */}
      <div className="apply-button-container">
        <button className="apply-button" onClick={handleApplyNowClick}>
          Apply Now
        </button>
      </div>
    </div>
  );
};

const truncateDescription = (description) => {
  if (!description) return "No description available.";
  return description.length > 300 ? description.substring(0, 300) + "..." : description;
};

const renderStars = (rating) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i} className={i < rating ? "star filled" : "star"}>★</span>
    );
  }
  return stars;
};

export default JobCard;
