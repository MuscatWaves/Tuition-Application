import React from "react";
import { Drawer, Collapse } from "@mantine/core";
import { container, item } from "../../animation";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { m } from "framer-motion";

const SmallNavigation = ({
  isSmallMenuOpen,
  setSmallMenuOpen,
  firstItem,
  secondItem,
  thirdItem,
  setFirstItem,
  setSecondItem,
  setThirdItem,
  setActiveItem,
}) => {
  const location = useLocation().pathname;
  const navigateTo = useNavigate();
  return (
    <Drawer
      opened={isSmallMenuOpen}
      onClose={() => setSmallMenuOpen(false)}
      position="right"
      padding="xl"
      size="full"
      transition="pop"
      transitionDuration={400}
      transitionTimingFunction="ease"
    >
      <m.div
        className="bolder larger-text flex-gap-column2 medium-padding text-colour"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <m.div className="flex-gap-column2" variants={item}>
          <div
            className={
              firstItem
                ? "flex-gap pointer red-shade-colour"
                : "flex-gap pointer"
            }
            onClick={() => {
              setSecondItem(false);
              setThirdItem(false);
              setFirstItem(!firstItem);
            }}
          >
            Title{" "}
            <m.div
              animate={{ rotate: firstItem ? "360deg" : "180deg" }}
              transition={{ duration: "0.3" }}
            >
              <IoIosArrowDown style={{ fontSize: "16px" }} />
            </m.div>
          </div>
          <div>
            <Collapse
              in={firstItem}
              transitionDuration={400}
              transitionTimingFunction="linear"
            >
              <div className="small-padding larger-text primary-colour bold">
                <div
                  className="pointer"
                  onClick={() => {
                    localStorage.setItem("tabSelected", 1);
                    setSmallMenuOpen(false);
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
                  onClick={() => {
                    localStorage.setItem("tabSelected", 2);
                    setSmallMenuOpen(false);
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
                <div onClick={() => {}}>Services</div>
              </div>
            </Collapse>
          </div>
        </m.div>
        <m.div variants={item}>
          <div>Title</div>
        </m.div>
      </m.div>
    </Drawer>
  );
};

export default SmallNavigation;
