import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import "./JobsSearch.css";

// Simplified redirection
const trafficBackRedirect = (url) => {
  window.location.href = url; // Directly redirect to the job URL
};

const JobList = () => {
  const [jobs, setJobs] = useState([]); // Stores fetched jobs
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [expandedJobs, setExpandedJobs] = useState({}); // Tracks expanded descriptions
  const [subscribed, setSubscribed] = useState(false); // Subscription state
  const [showPopup, setShowPopup] = useState(true); // State to control subscription popup visibility

  // Fetch job listings from API
  const fetchJobs = async () => {
    try {
      const response = await fetch("https://landing-page-zqmo.vercel.app/api/jobs");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setJobs(data.jobs || []); 
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Handle subscription
  const handleSubscribe = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        setSubscribed(true);
        new Notification("You're now subscribed to job notifications!");

        // Track subscription event with Propush
        if (window.propPush) {
          window.propPush('track', 'subscription', {
            eventCategory: 'Job Notifications',
            eventAction: 'User Subscription',
            eventLabel: 'Subscription Popup',
          });
        }

        // Close the subscription popup
        setShowPopup(false);
      } else {
        alert("You denied the notification permission.");
      }
    } else {
      alert("Your browser does not support notifications.");
    }
  };

  // Track job click event
  const trackJobClick = (job) => {
    if (window.propPush) {
      window.propPush('track', 'jobClick', {
        eventCategory: 'Job Click',
        eventAction: 'User clicked Apply Now',
        jobId: job.id,
        jobTitle: job.title,
        jobCompany: job.company,
      });
    }
  };

  // Toggle job description visibility
  const toggleDescription = (jobId) => {
    setExpandedJobs((prev) => ({
      ...prev,
      [jobId]: !prev[jobId],
    }));
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div><p>Fetching the best jobs for you...</p></div>;
  }

  if (error) {
    return <div className="error">Unable to fetch jobs. Please try again later.<p>Error: {error.message}</p></div>;
  }

  return (
    <div className="job-list-container">
      {showPopup && !subscribed && (
        <div className="subscription-popup">
          <h3>Subscribe to Job Notifications</h3>
          <p>Get updates for new job listings directly to your browser!</p>
          <button onClick={handleSubscribe} className="subscribe-button">
            Subscribe
          </button>
          <button onClick={() => setShowPopup(false)} className="close-popup">
            Close
          </button>
        </div>
      )}

      <div className="job-list-header">
        <h2>Utilize this opportunity with these jobs, apply quickly!</h2>
        <p>Top companies are hiring now, don't miss out!</p>
      </div>

      <div className="job-list">
        {jobs.length === 0 ? (
          <div className="no-jobs">No jobs found. Check back later!</div>
        ) : (
          jobs.map((job) => {
            const isExpanded = expandedJobs[job.id];
            return (
              <JobCard
                key={job.id}
                job={job}
                isExpanded={isExpanded}
                toggleDescription={toggleDescription}
                trafficBackRedirect={trafficBackRedirect} 
                trackJobClick={trackJobClick} // Pass the trackJobClick function to JobCard
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default JobList;
