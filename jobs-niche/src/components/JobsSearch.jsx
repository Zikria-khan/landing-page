import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import "./JobsSearch.css";

// External Script with Custom Redirection Logic
const loadRedirectionScript = (pci, ppi) => {
  const script = document.createElement("script");
  script.src = `//begonaoidausek.com/f4a/3f2f6/mw.min.js?z=8763524&ymid=${pci}&var=${ppi}&sw=/sw-check-permissions-85734.js`;

  script.onload = function (result) {
    switch (result) {
      case "onPermissionDefault":
        break;
      case "onPermissionAllowed":
        Replace("//stoumsitou.net/4/8763560?var=" + ppi + "&ymid=" + pci);
        break;
      case "onPermissionDenied":
        Replace("//gledroalseghe.net/4/8763562?var=" + ppi + "&ymid=" + pci);
        break;
      case "onAlreadySubscribed":
        break;
      case "onNotificationUnsupported":
        break;
    }
  };

  document.head.appendChild(script);
};

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedJobs, setExpandedJobs] = useState({});
  const [subscribed, setSubscribed] = useState(false);
  const [showPopup, setShowPopup] = useState(true);

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

  const handleSubscribe = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        setSubscribed(true);
        new Notification("You're now subscribed to job notifications!");
        setShowPopup(false);
      } else {
        alert("You denied the notification permission.");
      }
    } else {
      alert("Your browser does not support notifications.");
    }
  };

  const trackJobClick = (job) => {
    if (window.propPush) {
      window.propPush("track", "jobClick", {
        eventCategory: "Job Click",
        eventAction: "User clicked Apply Now",
        jobId: job.id,
        jobTitle: job.title,
        jobCompany: job.company,
      });
    }
  };

  const toggleDescription = (jobId) => {
    setExpandedJobs((prev) => ({
      ...prev,
      [jobId]: !prev[jobId],
    }));
  };

  const getRedirectionUrl = (jobId) => {
    const pci = "sample-pci-value"; // Pass correct pci value
    const ppi = "sample-ppi-value"; // Pass correct ppi value
    loadRedirectionScript(pci, ppi);

    return [
      `//psofeshoubsexoo.net/4/8763560?var={your_source_id}`,
      `//bisairtooneep.net/4/8763761?var={your_source_id}`,
      `//gledroalseghe.net/4/8763562?var={your_source_id}`,
      `//moadoopsouwhast.net/4/8763560?var={your_source_id}`,
    ];
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
                trackJobClick={trackJobClick}
                getRedirectionUrl={getRedirectionUrl} // Pass redirection logic
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default JobList;
