import React from "react";
import { RiWhatsappFill } from "react-icons/ri";
import { AiFillYoutube } from "react-icons/ai";
import { GrMail } from "react-icons/gr";
import { BsFacebook } from "react-icons/bs";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="horizontal-line-footer"></div>
      <div className="footer">
        <div>Logo</div>
        <div>
          <div className="large-text bolder primary-font small-margin-bottom text-grey">
            Tution
          </div>
          <div className="flex-small-gap-column">
            <div className="pointer">Grade</div>
            <div className="pointer">Subject</div>
            <div className="pointer">Services</div>
          </div>
        </div>
        <div>
          <div className="large-text bolder primary-font small-margin-bottom text-grey">
            IELTS
          </div>
          <div className="flex-small-gap-column">
            <div className="pointer">Grade</div>
            <div className="pointer">Subject</div>
          </div>
        </div>
        <div>
          <div className="large-text bolder primary-font small-margin-bottom text-grey">
            Summer Classes
          </div>
          <div className="flex-small-gap-column">
            <div className="pointer">Grade</div>
          </div>
        </div>
        <div>
          <div className="small-margin-bottom">Contact Us</div>
          <div className="flex-small-gap">
            <GrMail className="icon-footer mail-icon" />
            <RiWhatsappFill className="icon-footer whatsapp-icon" />
            <BsFacebook className="icon-footer facebook-icon" />
            <AiFillYoutube className="icon-footer youtube-icon" />
          </div>
        </div>
      </div>
      <div className="horizontal-line-footer"></div>
      <div className="flex-between footer-last-part bold">
        <div className="small-text text-grey">
          Powered by Tution App Company
        </div>
        <div className="small-text text-grey bold">Privacy Policy</div>
      </div>
    </div>
  );
};

export default Footer;
