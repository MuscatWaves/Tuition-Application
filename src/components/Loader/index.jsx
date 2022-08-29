import React, { useEffect } from "react";
import "./loader.css";
import { m, LazyMotion, domAnimation } from "framer-motion";
import logoSmall from "../../images/logo-small.png";
import Spinner from "../Spinner";

const Loader = ({ minHeight }) => {
  useEffect(() => {
    document.title = "Loading";
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className="loading-data"
        style={{ minHeight: minHeight }}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        exit={{ opacity: 0 }}
      >
        <img
          src={logoSmall}
          width={"90px"}
          height={"90px"}
          alt="loading the page"
        />
        <div className="inner-loading-data">
          <Spinner />
        </div>
      </m.div>
    </LazyMotion>
  );
};

export default Loader;
