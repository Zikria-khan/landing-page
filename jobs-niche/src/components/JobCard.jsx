import React from "react";
import "./JobCard.css"; // CSS file for styling this component

const JobCard = ({ job, isExpanded, toggleDescription }) => {
  return (
    <div className="job-card">
      {/* Job Title and Company */}
      <h3 className="job-title">{job.title || "Job Title Unavailable"}</h3>
      <p className="company-name">{job.company || "Company Name Unavailable"}</p>

      {/* Location */}
      <p className="job-location">{job.location || "Remote"}</p>

      {/* Star Rating Display */}
      <div className="star-rating">{renderStars(job.rating || 0)}</div>

      {/* Job Description with Toggle */}
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

      {/* Apply Link */}
      <a
        href={job.link || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="apply-link"
      >
        Apply Now
      </a>

      {/* Additional Info */}
      <div className="additional-info">
        <p className="date-posted">Updated: {new Date(job.updated).toLocaleDateString()}</p>
        <p className="employment-type">{job.type || "Employment type not specified"}</p>
        <p className="salary">{job.salary || "Salary not specified"}</p>
      </div>
    </div>
  );
};

// Function to truncate long job descriptions
const truncateDescription = (description) => {
  if (!description) return "No description available.";
  return description.length > 300 ? description.substring(0, 300) + "..." : description;
};

// Function to render star ratings
const renderStars = (rating) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i} className={i < rating ? "star filled" : "star"}>
        ★
      </span>
    );
  }
  return stars;
};

export default JobCard;
