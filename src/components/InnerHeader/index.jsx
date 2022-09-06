import React from "react";
import { removeUnderScore } from "../../utilities";
import { useNavigate } from "react-router-dom";
import { FaLongArrowAltRight, FaLongArrowAltDown } from "react-icons/fa";
import { m } from "framer-motion";
import "./innerheader.css";

const InnerHeader = ({ navigation, data, customHeading, customDesc }) => {
  const navigateTo = useNavigate();
  const items = navigation.map((item, index) => (
    <div
      key={item.id}
      className={item.active ? "link--active" : "link"}
      onClick={() => navigateTo(item.to)}
    >
      {item.title}
    </div>
  ));

  for (let i = 0; i < items.length; i++) {
    if (i % 2 !== 0) {
      items.splice(
        i,
        0,
        <div className="bolder" key={i + 10}>
          <FaLongArrowAltRight
            style={{
              fontSize: "18px",
              marginTop: "8px",
              color: "var(--red-shade-color)",
            }}
            className="innerHeader-right-icon"
          />
          <FaLongArrowAltDown
            style={{
              fontSize: "18px",
              marginTop: "8px",
              color: "var(--red-shade-color)",
            }}
            className="innerHeader-down-icon"
          />
        </div>
      );
      items.join();
    }
  }

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
          {removeUnderScore(data.subject)}
        </div>
      )}
      <div className="innerHeader-navigation">{items.map((item) => item)}</div>
      {(customDesc && customDesc) || (
        <div className="primary-font bold primary-colour">
          A start of something good
        </div>
      )}
    </m.div>
  );
};

export default InnerHeader;
