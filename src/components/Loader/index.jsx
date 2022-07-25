import React, { useEffect } from "react";
import ojimage from "../../images/brush.webp";
import "./loader.css";
import { ProgressSpinner } from "primereact/progressspinner";
import { motion } from "framer-motion";

const Loader = ({ minHeight }) => {
  useEffect(() => {
    document.title = "Loading";
  }, []);

  return (
    <motion.div
      className="loading-data"
      style={{ minHeight: minHeight }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0 }}
    >
      <div className="inner-loading-data">
        <img src={ojimage} className="loader-image" alt="Oman jobs" />
        <ProgressSpinner />
      </div>
    </motion.div>
  );
};

export default Loader;
