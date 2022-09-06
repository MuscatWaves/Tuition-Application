import React from "react";
import { container, item } from "../../animation";
import { m, AnimatePresence } from "framer-motion";
import { getYoutubeThumbnail } from "../../utilities";
import "./gridInnerPage.css";

const GridInnerPage = ({ data, view }) => {
  const checkView = (data) => {
    if (view === "list") {
      return (
        <m.div key={data.id} className="tpw-notes-each-card" variants={item}>
          <div className="red-shade-colour larger-text bolder">{data.name}</div>
          <div className="flex-small-gap-column small-margin-top">
            {data.resources.map((resource) => (
              <div className="primary-colour medium-text" key={resource.id}>
                {resource.name}
              </div>
            ))}
          </div>
        </m.div>
      );
    }
    if (view === "video") {
      return (
        <m.div key={data.id} className="ep-notes-each-card" variants={item}>
          <div className="red-shade-colour larger-text bolder">{data.name}</div>
          <div className="flex-gap-column small-margin-top">
            {data.resources.map((resource) => (
              <div className="exp-videoBox" key={resource.id}>
                <img
                  src={getYoutubeThumbnail(resource.link, "max")}
                  className={"ep-image"}
                  alt={resource.name}
                />
                <div className="secondary-colour medium-text" key={resource.id}>
                  {resource.name}
                </div>
              </div>
            ))}
          </div>
        </m.div>
      );
    }
  };

  return (
    <div className="tpw-notes-wrapper">
      <AnimatePresence>
        <m.div
          className="tpw-notes-main"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {data.map((data) => checkView(data))}
        </m.div>
      </AnimatePresence>
    </div>
  );
};

export default GridInnerPage;
