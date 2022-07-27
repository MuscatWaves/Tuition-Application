import React, { useEffect } from "react";
import "./loader.css";
import { ProgressSpinner } from "primereact/progressspinner";
import { m, LazyMotion, domAnimation } from "framer-motion";

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
        <div className="inner-loading-data">
          <ProgressSpinner />
        </div>
      </m.div>
    </LazyMotion>
  );
};

export default Loader;
