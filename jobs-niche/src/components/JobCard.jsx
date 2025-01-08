import React from "react";
import "./JobCard.css";

const JobCard = ({ job, isExpanded, toggleDescription, trafficBackRedirect }) => {
  // Define the redirection URL based on the job card index
  const getRedirectionUrl = () => {
    const jobIndex = job.id; // Assuming the `id` is unique for each job card
    
    switch (jobIndex) {
      case 1:
        return "https://www.indeed.com";
      case 2:
        return "https://www.adzuna.com";
      case 3:
        return "https://www.linkedin.com/jobs";
      case 4:
        return "https://www.glassdoor.com";
      case 5:
        return "https://www.monster.com";
      default:
        return job.link || "#"; // Fallback to job link if no specific URL is defined
    }
  };

  // Handle redirection on job card click
  const handleJobCardClick = () => {
    const redirectUrl = getRedirectionUrl();
    trafficBackRedirect(redirectUrl); // Trigger the redirection with TrafficBack functionality
  };

  return (
    <div className="job-card" onClick={handleJobCardClick}>
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
