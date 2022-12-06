import React from "react";
import { removeUnderScore } from "../../utilities";
import BreadCrumb from "../BreadCrumb";
import { m } from "framer-motion";
import "./innerheader.css";

const InnerHeader = ({ navigation, data, customHeading, customDesc }) => {
  return (
    <m.div
      className="innerHeader-main medium-gap"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
      {(customHeading && customHeading) || (
        <div className="larger-text bolder primary-font-2 red-shade-colour">
          {removeUnderScore(data.chapter)}
        </div>
      )}
      <BreadCrumb items={navigation} />
    </m.div>
  );
};

export default InnerHeader;
