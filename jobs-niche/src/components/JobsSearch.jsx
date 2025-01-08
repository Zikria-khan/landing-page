import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import "./JobsSearch.css";

const JobList = () => {
  const [jobs, setJobs] = useState([]); // Stores fetched jobs
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [expandedJobs, setExpandedJobs] = useState({}); // Tracks expanded descriptions

  // Fetch jobs from the backend API
  const fetchJobs = async () => {
    try {
      const response = await fetch("https://landing-page-zqmo.vercel.app/api/jobs");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      setJobs(data.jobs || []); // Assuming jobs are stored in `data.jobs`
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Toggles the description's expanded state for a specific job
  const toggleDescription = (jobId) => {
    setExpandedJobs((prev) => ({
      ...prev,
      [jobId]: !prev[jobId],
    }));
  };

  // Renders star ratings for jobs
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

  // Handle loading and error states
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Fetching the best jobs for you...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        Unable to fetch jobs. Please try again later.
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="job-list-container">
      {/* Motivational Header Section */}
      <div className="job-list-header">
        <h2>Utilize this opportunity with these jobs, apply quickly!</h2>
        <p>Top companies are hiring now, don't miss out!</p>
      </div>

      {/* Job List */}
      <div className="job-list">
        {jobs.length === 0 ? (
          <div className="no-jobs">No jobs found. Check back later!</div>
        ) : (
          jobs.map((job) => {
            const isExpanded = expandedJobs[job.id]; // Check if the job's description is expanded
            return (
              <JobCard
                key={job.id}
                job={job}
                isExpanded={isExpanded}
                toggleDescription={toggleDescription}
                renderStars={renderStars}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default JobList;
