import React from "react";
import { removeUnderScore } from "../../utilities";
import { useNavigate } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import { m } from "framer-motion";

const InnerHeader = ({ navigation, data }) => {
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
          <FaLongArrowAltRight style={{ fontSize: "18px", marginTop: "8px" }} />
        </div>
      );
      items.join();
    }
  }

  return (
    <m.div
      className="flex-column-center medium-gap"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
      <div className="larger-text bolder primary-font-2 red-shade-colour">
        {removeUnderScore(data.subject)}
      </div>
      <div className="flex-small-gap">{items.map((item) => item)}</div>
      <div className="primary-font bold primary-colour">
        A start of something good
      </div>
    </m.div>
  );
};

export default InnerHeader;
