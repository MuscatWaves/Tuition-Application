import { motion } from "framer-motion";
import React from "react";
import bannerImage from "../../images/banner-image.webp";

const Login = () => {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      exit={{ opacity: 0 }}
    >
      <div>
        <img src={bannerImage} alt="sac"></img>
      </div>
    </motion.div>
  );
};

export default Login;
