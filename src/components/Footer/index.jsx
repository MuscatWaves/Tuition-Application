import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer">
        <div>Logo</div>
        <div>
          <div className="large-text bolder primary-font small-margin-bottom text-grey">
            Tution
          </div>
          <div className="pointer">Grade</div>
          <div className="pointer">Subject</div>
          <div className="pointer">Services</div>
        </div>
        <div>
          <div className="large-text bolder primary-font small-margin-bottom">
            IELTS
          </div>
          <div className="pointer">Grade</div>
          <div className="pointer">Subject</div>
          <div className="pointer">Services</div>
        </div>
        <div>
          <div className="large-text bolder primary-font small-margin-bottom">
            Summer Classes
          </div>
          <div className="pointer">Grade</div>
        </div>
        <div>
          <div>Contact Us</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
