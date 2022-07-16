import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer">
        <div>Logo</div>
        <div>
          <div className="large-text bolder primary-font small-margin-bottom">
            Tution
          </div>
          <div>Grade</div>
          <div>Subject</div>
          <div>Services</div>
        </div>
        <div>
          <div className="large-text bolder primary-font small-margin-bottom">
            IELTS
          </div>
          <div>Grade</div>
          <div>Subject</div>
        </div>
        <div>
          <div className="large-text bolder primary-font small-margin-bottom">
            Summer Classes
          </div>
          <div>Grade</div>
        </div>
        <div>
          <div>Contact Us</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
