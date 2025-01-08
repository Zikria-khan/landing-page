import React from "react";
import "./JobCard.css"; // CSS file for styling this component

const JobCard = ({ job, isExpanded, toggleDescription, trafficBackRedirect }) => {
  // Define the redirection URL based on the job card index
  const getRedirectionUrl = () => {
    // Define a list of predefined redirection URLs based on job index or specific conditions
    const jobIndex = job.id; // Assuming the `id` is unique for each job card, can use index too
    
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
    const redirectUrl = getRedirectionUrl(); // Get the appropriate URL based on job index
    trafficBackRedirect(redirectUrl); // Trigger the redirection with TrafficBack functionality
  };

  return (
    <div className="job-card" onClick={handleJobCardClick}> {/* Trigger redirection when clicking the job card */}
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
