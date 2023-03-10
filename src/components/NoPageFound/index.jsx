import { domAnimation, LazyMotion, m } from "framer-motion";
import React, { useEffect } from "react";
import pageNotFound from "../../images/page_not_found.svg";
import { container, item } from "../../animation";
import "./page.css";

const PageNotFound = () => {
  useEffect(() => {
    document.title = "Page not found";
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
          Page Not Found
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

export default PageNotFound;
