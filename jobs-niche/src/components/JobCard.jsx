import React from "react";
import "./JobCard.css";

const JobCard = ({ job, isExpanded, toggleDescription, getRedirectionUrl, trackJobClick }) => {
  // Handle Apply Now click event to navigate to Jooble's job listing page
  const handleApplyNowClick = () => {
    const applyUrl = job.link; // Get the specific job URL from the job object (link property)

    // Track job click with Propush (or any analytics tool)
    trackJobClick(job);

    // Open the job URL in a new tab
    if (applyUrl) {
      window.open(applyUrl, "_blank");
    } else {
      console.error("Apply URL not found for job:", job.id);
    }
  };

  const handlePlayButtonClick = () => {
    const redirectionUrls = getRedirectionUrl(job.id);
    window.open(redirectionUrls[1], "_blank"); // Open the second URL (you can adjust this logic as needed)
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

      {/* Play Button */}
      <div className="play-button-container">
        <button className="play-button" onClick={handlePlayButtonClick}>
          Play
        </button>
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

// Function to truncate job descriptions
const truncateDescription = (description) => {
  if (!description) return "No description available.";
  return description.length > 300 ? description.substring(0, 300) + "..." : description;
};

// Function to render star ratings for the job
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
