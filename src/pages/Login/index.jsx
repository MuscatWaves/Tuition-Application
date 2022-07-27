import { motion } from "framer-motion";
import React from "react";

const Login = () => {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      exit={{ opacity: 0 }}
    >
      <div>Tester</div>
    </motion.div>
  );
};

export default Login;
