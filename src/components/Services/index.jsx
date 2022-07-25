import React from "react";
import BreadCrumb from "../BreadCrumb";
import { Button } from "primereact/button";
import { m } from "framer-motion";
import "./services.css";

const Services = ({ service, activeMenu, setActiveMenu }) => {
  localStorage.removeItem("tabSelected");
  const leftMenuVariant = {
    show: {
      x: "0",
      opacity: 1,
      transition: { type: "spring", stiffness: 40, damping: 6 },
    },
    hidden: {
      x: "-100px",
      opacity: 0,
    },
  };

  const heading = {
    hidden: { opacity: 1, y: "60px" },
    show: {
      y: "0",
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 40,
        damping: 9,
      },
    },
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: "100px",
    },
    show: {
      opacity: 1,
      y: 0,
      delay: 0.7,
      transition: {
        type: "spring",
        stiffness: 40,
        damping: 9,
      },
    },
  };

  return (
    <div className="services-main-body">
      <BreadCrumb items={service.nav} />
      <div className="service-body">
        <m.div
          className="services-left-section"
          variants={leftMenuVariant}
          initial="hidden"
          animate="show"
        >
          <div
            className="text-light-grey bold primary-font"
            style={{ fontSize: "3em" }}
          >
            Here We Offer
          </div>
          <div className="services-left-menu-selection">
            {service.menu.map((menu) => (
              <div key={menu.id}>
                <div
                  className={
                    activeMenu === menu.id
                      ? "bolder active-menu-item-services"
                      : "menu-item-services primary-colour"
                  }
                  onClick={() => {
                    setActiveMenu(menu.id);
                    window.scrollTo({
                      top: 0,
                      left: 0,
                      behavior: "smooth",
                    });
                  }}
                >
                  {menu.name}
                </div>
              </div>
            ))}
          </div>
          <div className="service-left-section-button">
            <Button type="primary" className="p-button our-button">
              Join Now
            </Button>
          </div>
        </m.div>
        <div className="services-right-section">
          {service.menu.map(
            (menu) =>
              activeMenu === menu.id && (
                <div key={menu.id}>
                  <m.div
                    className="flex-gap"
                    variants={heading}
                    animate="show"
                    initial="hidden"
                  >
                    <img
                      src={menu.data.icon}
                      className="services-right-section-image"
                      alt="menu.id"
                    />
                    <div
                      className="bolder secondary-colour"
                      style={{ fontSize: "42px" }}
                    >
                      {menu.name}
                    </div>
                  </m.div>
                  <m.div
                    className="services-right-section-list"
                    variants={container}
                    initial="hidden"
                    animate="show"
                  >
                    {menu.data.innerData.map((inner) => (
                      <m.div
                        key={inner.id}
                        className="services-right-section-card"
                        variants={item}
                      >
                        <div>{inner.name}</div>
                      </m.div>
                    ))}
                  </m.div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;
