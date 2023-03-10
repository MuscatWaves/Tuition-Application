import React from "react";
import { RiWhatsappFill } from "react-icons/ri";
import { AiFillInstagram } from "react-icons/ai";
import { GrMail } from "react-icons/gr";
import logo from "../../images/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import "./footer.css";

const Footer = ({ setActiveItem }) => {
  const location = useLocation().pathname;
  const navigateTo = useNavigate();
  return (
    <div className="footer-wrapper">
      <div className="horizontal-line-footer"></div>
      <div className="footer">
        <div>
          <img src={logo} alt={"logo"} width={"250px"} height={"250px"} />
        </div>
        <div className="whole-division-footer">
          <div className="each-division-service-footer">
            <div className="mid-large-text boldest primary-font small-margin-bottom primary-colour">
              Tution
            </div>
            <div className="flex-small-gap-column">
              <div
                className="bolder text-black pointer"
                onClick={() => {
                  localStorage.setItem("tabSelected", 1);
                  navigateTo("/tuition");
                  setActiveItem && location === "/tuition" && setActiveItem(1);
                  setActiveItem &&
                    location === "/tuition" &&
                    window.scrollTo({
                      top: 0,
                      left: 0,
                      behavior: "smooth",
                    });
                }}
              >
                Grade
              </div>
              <div
                className="bolder text-black pointer"
                onClick={() => {
                  localStorage.setItem("tabSelected", 2);
                  navigateTo("/tuition");
                  setActiveItem && location === "/tuition" && setActiveItem(2);
                  setActiveItem &&
                    location === "/tuition" &&
                    window.scrollTo({
                      top: 0,
                      left: 0,
                      behavior: "smooth",
                    });
                }}
              >
                Subject
              </div>
              <div
                className="bolder text-black pointer"
                onClick={() => {
                  localStorage.setItem("tabSelected", 3);
                  navigateTo("/tuition");
                  setActiveItem && location === "/tuition" && setActiveItem(3);
                  setActiveItem &&
                    location === "/tuition" &&
                    window.scrollTo({
                      top: 0,
                      left: 0,
                      behavior: "smooth",
                    });
                }}
              >
                Services
              </div>
            </div>
          </div>

          <div className="each-division-service-footer">
            <div className="mid-large-text boldest primary-font small-margin-bottom primary-colour">
              IELTS
            </div>
            <div className="flex-small-gap-column">
              <div className="bolder text-black pointer-disabled">Subject</div>
              <div className="bolder text-black pointer-disabled">Services</div>
            </div>
          </div>
          <div className="each-division-service-footer">
            <div className="mid-large-text boldest primary-font small-margin-bottom primary-colour">
              Summer Classes
            </div>
            <div className="flex-small-gap-column">
              <div className="bolder text-black pointer-disabled">
                Languages
              </div>
              <div className="bolder text-black pointer-disabled">
                Music & Art
              </div>
              <div className="bolder text-black pointer-disabled">Other</div>
            </div>
          </div>
        </div>
        <div>
          <div className="small-margin-bottom small-margin-top bolder">
            Contact Us
          </div>
          <div className="flex-small-gap">
            <GrMail
              className="icon-footer mail-icon"
              onClick={() => window.open("mailto:a3lamnii@gmail.com", "_blank")}
            />
            <RiWhatsappFill className="icon-footer whatsapp-icon" />
            {/* <BsFacebook className="icon-footer facebook-icon" /> */}
            {/* <AiFillYoutube className="icon-footer youtube-icon" /> */}
            <AiFillInstagram
              className="icon-footer instagram-icon"
              onClick={() =>
                window.open("https://www.instagram.com/alamnii.om/", "_blank")
              }
            />
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
