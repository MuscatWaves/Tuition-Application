import React, { useState } from "react";
import { Button } from "primereact/button";
import "./topnavigation.css";

function TopNavigation() {
  const [colorChange, setColorchange] = useState(false);
  const changeNavbarColor = () => {
    if (window.scrollY >= 80) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };
  window.addEventListener("scroll", changeNavbarColor);

  return (
    <div className="nav-wrapper">
      <div
        className={
          colorChange ? "top-navigation-main nav-down" : "top-navigation-main"
        }
      >
        <div className="bolder text-black large-text">Tution</div>
        <div className="flex-gap">
          <div className="bolder">Home</div>
          <div>Services</div>
          <div>Cabbie</div>
        </div>
        <div className="flex-small-gap">
          <Button type="primary" className="p-button-sm">
            Login
          </Button>
          <Button type="primary" className="p-button-sm">
            SignUp
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TopNavigation;
