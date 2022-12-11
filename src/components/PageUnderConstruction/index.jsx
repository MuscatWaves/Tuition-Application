import { domAnimation, LazyMotion, m } from "framer-motion";
import React, { useEffect } from "react";
import pageNotFound from "../../images/under_construction.svg";
import { container, item } from "../../animation";
import "./page.css";

const PageUnderConstruction = () => {
  useEffect(() => {
    document.title = "Page Under Construction";
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className="not-page-found"
        variants={container}
        animate={"show"}
        initial={"hidden"}
      >
        <m.img
          variants={item}
          src={pageNotFound}
          alt="Page Not Found"
          className="no-page-found-image"
        />
        <m.div variants={item} className="larger-text red-shade-colour bold">
          Page is Under Construction!
        </m.div>
        <m.div variants={item} className="medium-text primary-colour bold">
          Please visit this page later
        </m.div>
        <m.div
          variants={item}
          className="copyright text-light-grey slide-in-top-animation"
        >
          @ 2022 Copyright Powered by Oman Jobs
        </m.div>
      </m.div>
    </LazyMotion>
  );
};

export default PageUnderConstruction;
