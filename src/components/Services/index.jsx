import React, { useState } from "react";
import BreadCrumb from "../BreadCrumb";
import { Button } from "primereact/button";
import "./services.css";
import dummyImage from "../../images/grades.svg";

const Services = (
  {
    // service
  }
) => {
  const [activeMenu, setActiveMenu] = useState(1);
  const service = {
    nav: [
      {
        id: 0,
        name: "Home",
        url: "/",
      },
      {
        id: 1,
        name: "Tuition",
        url: "/tuition",
        active: true,
      },
    ],
    menu: [
      {
        id: 1,
        name: "Grades",
        data: {
          icon: dummyImage,
          innerData: [
            { id: 1, name: "Grade 1" },
            { id: 2, name: "Grade 2" },
            { id: 3, name: "Grade 3" },
            { id: 4, name: "Grade 4" },
            { id: 5, name: "Grade 5" },
            { id: 6, name: "Grade 6" },
            { id: 7, name: "Grade 7" },
            { id: 8, name: "Grade 8" },
            { id: 9, name: "Grade 9" },
          ],
        },
      },
      {
        id: 2,
        name: "Subjects",
        data: {
          icon: dummyImage,
          innerData: [
            { id: 1, name: "Grade 1" },
            { id: 2, name: "Grade 2" },
            { id: 3, name: "Grade 3" },
            { id: 4, name: "Grade 4" },
          ],
        },
      },
      {
        id: 3,
        name: "Services",
        data: {
          icon: dummyImage,
          innerData: [
            { id: 6, name: "Face to Face tuition" },
            { id: 7, name: "Topic wise QP & AP" },
            { id: 8, name: "Grade 8" },
            { id: 9, name: "Grade 9" },
          ],
        },
      },
    ],
  };

  return (
    <div className="services-main-body">
      <BreadCrumb items={service.nav} />
      <div className="service-body">
        <div className="services-left-section">
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
                  onClick={() => setActiveMenu(menu.id)}
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
        </div>
        <div className="services-right-section">
          {service.menu.map(
            (menu) =>
              activeMenu === menu.id && (
                <div key={menu.id}>
                  <div className="flex-gap">
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
                  </div>
                  <div className="services-right-section-list">
                    {menu.data.innerData.map((inner) => (
                      <div
                        key={inner.id}
                        className="services-right-section-card"
                      >
                        <div>{inner.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;
