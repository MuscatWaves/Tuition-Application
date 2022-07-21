import React from "react";
import { RiWhatsappFill } from "react-icons/ri";
import { AiFillYoutube } from "react-icons/ai";
import { GrMail } from "react-icons/gr";
import { BsFacebook } from "react-icons/bs";
import logo from "../../images/logo.png";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="horizontal-line-footer"></div>
      <div className="footer">
        <div>
          <img src={logo} alt={"logo"} />
        </div>
        <div className="each-division-service-footer">
          <div className="mid-large-text boldest primary-font small-margin-bottom primary-colour">
            Tution
          </div>
          <div className="flex-small-gap-column">
            <div className="bolder text-black pointer">Grade</div>
            <div className="bolder text-black pointer">Subject</div>
            <div className="bolder text-black pointer">Services</div>
          </div>
        </div>
        <div className="each-division-service-footer">
          <div className="mid-large-text boldest primary-font small-margin-bottom primary-colour">
            IELTS
          </div>
          <div className="flex-small-gap-column">
            <div className="bolder text-black pointer">Grade</div>
            <div className="bolder text-black pointer">Subject</div>
          </div>
        </div>
        <div className="each-division-service-footer">
          <div className="mid-large-text boldest primary-font small-margin-bottom primary-colour">
            Summer Classes
          </div>
          <div className="flex-small-gap-column">
            <div className="bolder text-black pointer">Grade</div>
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
      <div className="flex-between footer-last-part bolder">
        <div className="small-text text-colour bolder">
          Powered by Tution App Company
        </div>
        <div className="small-text text-colour bolder">Privacy Policy</div>
      </div>
    </div>
  );
};

export default Footer;
