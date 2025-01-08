import React from "react";
import "./Header.css"; // Ensure to create this CSS file and link it

const Header = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="header">
      <div className="logo-container">
        <h1 className="logo">Job Finder</h1>
      </div>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <button className="nav-link" onClick={() => scrollToSection("home")}>
              Home
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link" onClick={() => scrollToSection("about")}>
              About
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link" onClick={() => scrollToSection("jobs")}>
              Jobs
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link" onClick={() => scrollToSection("contact")}>
              Contact
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
