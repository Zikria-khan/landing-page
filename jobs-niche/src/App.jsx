import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import JobList from "./components/JobsSearch";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AboutUs from "./components/About";
import ContactUs from "./components/Contactus";
import "./App.css";

function App() {
  return (
    <Router> {/* Ensure the Router is wrapping the whole app */}
      <div className="app">
        <Header />
        <main>
          {/* Your component content goes here */}
          <JobList />
          <AboutUs />
          <ContactUs />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
