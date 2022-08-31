import React, { useState } from "react";
import logo from "../../images/logo.png";
import logoSmall from "../../images/logo-small.png";
import whiteLogo from "../../images/white-logo.png";
import { m, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import CustomButton from "../Buttons";
import { IoIosArrowDown } from "react-icons/io";
import { Burger } from "@mantine/core";
import SmallNavigation from "./SmallNavigation";
import "./topnavigation.css";

const TopNavigation = ({ setActiveItem, landing }) => {
  const location = useLocation().pathname;
  const [isSmallMenuOpen, setSmallMenuOpen] = useState(false);
  const [colorChange, setColorchange] = useState(false);
  const [firstItem, setFirstItem] = useState(false);
  const [secondItem, setSecondItem] = useState(false);
  const [thirdItem, setThirdItem] = useState(false);
  const navigateTo = useNavigate();
  const changeNavbarColor = () => {
    if (window.scrollY >= 50) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };
  window.addEventListener("scroll", changeNavbarColor);

  return (
    <m.div
      className="nav-wrapper"
      initial={{ y: "-80px" }}
      animate={{ y: "0px" }}
      transition={{ type: "spring", stiffness: 50, damping: 6 }}
    >
      <SmallNavigation
        isSmallMenuOpen={isSmallMenuOpen}
        setSmallMenuOpen={setSmallMenuOpen}
        firstItem={firstItem}
        secondItem={secondItem}
        thirdItem={thirdItem}
        setFirstItem={setFirstItem}
        setSecondItem={setSecondItem}
        setThirdItem={setThirdItem}
        setActiveItem={setActiveItem}
      />
      <m.div
        className={
          colorChange ? "top-navigation-main nav-down" : "top-navigation-main"
        }
      >
        <div>
          {colorChange && (
            <m.img
              animate={{ opacity: 1, y: "0" }}
              initial={{ opacity: 0, y: "20px" }}
              transition={{ duration: "0.8" }}
              src={logoSmall}
              width={"50px"}
              height={"50px"}
              onClick={() => navigateTo("/")}
            />
          )}
          {!colorChange && (
            <m.img
              animate={{ opacity: 1, y: "0" }}
              initial={{ opacity: 0, y: "-20px" }}
              transition={{ duration: "1.2" }}
              src={landing ? whiteLogo : logo}
              width={"140px"}
              height={"140px"}
              onClick={() => navigateTo("/")}
            />
          )}
        </div>
        <div className="flex-gap main-container-nav">
          <m.div
            onMouseEnter={() => setFirstItem(true)}
            onMouseLeave={() => setFirstItem(false)}
          >
            <div
              className={
                landing && !colorChange
                  ? "bold pointer menu-nav white-appearance flex-small-gap"
                  : "primary-colour bold pointer menu-nav flex-small-gap"
              }
              style={{ fontSize: "18px" }}
              onClick={() => {
                navigateTo("/tuition");
              }}
            >
              Tution
              <m.div
                animate={{ rotate: firstItem ? "360deg" : "180deg" }}
                transition={{ duration: "0.3" }}
              >
                <IoIosArrowDown style={{ fontSize: "16px" }} />
              </m.div>
            </div>
            <AnimatePresence>
              {firstItem && (
                <m.div
                  className="menu-box-wrapper"
                  animate={{ opacity: 1, y: "0" }}
                  initial={{ opacity: 0, y: "20px" }}
                  exit={{ opacity: 0, y: "20px" }}
                  transition={{ duration: "0.3" }}
                >
                  <m.div className="menu-box">
                    <div
                      className={"primary-colour bold pointer menu-nav"}
                      onClick={() => {
                        localStorage.setItem("tabSelected", 1);
                        navigateTo("/tuition");
                        setActiveItem &&
                          location === "/tuition" &&
                          setActiveItem(1);
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
                      className="primary-colour bold pointer menu-nav"
                      onClick={() => {
                        localStorage.setItem("tabSelected", 2);
                        navigateTo("/tuition");
                        setActiveItem &&
                          location === "/tuition" &&
                          setActiveItem(2);
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
                      className="primary-colour bold pointer menu-nav"
                      onClick={() => {
                        localStorage.setItem("tabSelected", 3);
                        navigateTo("/tuition");
                        setActiveItem &&
                          location === "/tuition" &&
                          setActiveItem(3);
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
                  </m.div>
                </m.div>
              )}
            </AnimatePresence>
          </m.div>
          <m.div
            className="primary-colour bold pointer menu-nav"
            onMouseEnter={() => setSecondItem(true)}
            onMouseLeave={() => setSecondItem(false)}
          >
            <div
              className={
                landing && !colorChange
                  ? "bold pointer menu-nav white-appearance flex-small-gap"
                  : "primary-colour bold pointer menu-nav flex-small-gap"
              }
              style={{ fontSize: "18px" }}
            >
              IELTS{" "}
              <m.div
                animate={{ rotate: secondItem ? "360deg" : "180deg" }}
                transition={{ duration: "0.3" }}
              >
                <IoIosArrowDown style={{ fontSize: "16px" }} />
              </m.div>
            </div>
            <AnimatePresence>
              {secondItem && (
                <m.div
                  className="menu-box-wrapper"
                  animate={{ opacity: 1, y: "0" }}
                  initial={{ opacity: 0, y: "20px" }}
                  exit={{ opacity: 0, y: "20px" }}
                  transition={{ duration: "0.3" }}
                >
                  <m.div className="menu-box">
                    <div className="primary-colour bold pointer menu-nav">
                      Subject
                    </div>
                    <div className="primary-colour bold pointer menu-nav">
                      Services
                    </div>
                  </m.div>
                </m.div>
              )}
            </AnimatePresence>
          </m.div>
          <m.div
            className="primary-colour bold pointer"
            onMouseEnter={() => setThirdItem(true)}
            onMouseLeave={() => setThirdItem(false)}
          >
            <div
              className={
                landing && !colorChange
                  ? "bold pointer menu-nav white-appearance flex-small-gap"
                  : "primary-colour bold pointer menu-nav flex-small-gap"
              }
              style={{ fontSize: "18px" }}
            >
              Summer Activities{" "}
              <m.div
                animate={{ rotate: thirdItem ? "360deg" : "180deg" }}
                transition={{ duration: "0.3" }}
              >
                <IoIosArrowDown style={{ fontSize: "16px" }} />
              </m.div>
            </div>
            <AnimatePresence>
              {thirdItem && (
                <m.div
                  className="menu-box-wrapper"
                  animate={{ opacity: 1, y: "0" }}
                  initial={{ opacity: 0, y: "20px" }}
                  exit={{ opacity: 0, y: "20px" }}
                  transition={{ duration: "0.3" }}
                >
                  <m.div className="menu-box">
                    <div className="primary-colour bold pointer menu-nav">
                      Languages
                    </div>
                    <div className="primary-colour bold pointer menu-nav">
                      Music & Art
                    </div>
                    <div className="primary-colour bold pointer menu-nav">
                      Other
                    </div>
                  </m.div>
                </m.div>
              )}
            </AnimatePresence>
          </m.div>
        </div>
        <div className="flex-small-gap main-container-nav">
          <CustomButton
            label="Login"
            category="primary"
            size={"md"}
            radius={"md"}
            action={() => navigateTo("/login")}
          />
          <CustomButton
            label="Sign Up"
            category="landing"
            size={"md"}
            radius={"md"}
          />
        </div>
        <Burger
          className="smallMenuOpen"
          opened={isSmallMenuOpen}
          onClick={() => setSmallMenuOpen(!isSmallMenuOpen)}
          color={colorChange ? "var(--red-shade-color)" : "#fff"}
        />
      </m.div>
    </m.div>
  );
};

export default TopNavigation;
