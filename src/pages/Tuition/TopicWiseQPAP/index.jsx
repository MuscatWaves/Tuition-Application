import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, m } from "framer-motion";
import Header from "../../../components/Header";
import { container, item } from "../../../animation";
import InnerHeader from "../../../components/InnerHeader";
import { removeUnderScore } from "../../../utilities";
import "../TopicWiseNotes/topicwisenotes.css";
import { CgNotes } from "react-icons/cg";

const TopicWiseQPAP = () => {
  const data = useParams();
  const navigateTo = useNavigate();
  const navigation = [
    { id: 0, name: "Dashboard", url: "/dashboard" },
    {
      id: 1,
      name: removeUnderScore(data.subject),
      url: `/dashboard/student/${data.subject}/${data.subjectId}/chapters/`,
    },
    {
      id: 2,
      name: removeUnderScore(data.chapter),
      url: `/dashboard/student/${data.subject}/${data.subjectId}/${data.chapter}/${data.chapterId}`,
    },
    {
      id: 3,
      name: `Topic Wise QP/AP`,
      active: true,
    },
  ];

  useEffect(() => {
    document.title = `${removeUnderScore(data.chapter)} - Topic Wise QP/AP`;
    // eslint-disable-next-line
  }, []);

  return (
    <m.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      className="tt-inner-notes-whole"
    >
      <Header />
      <div>
        <InnerHeader
          navigation={navigation}
          customHeading={
            <div className="bolder primary-font-2 larger-text">
              <span className="red-shade-colour">
                {removeUnderScore(`${data.subject} : `)}
              </span>
              <span className="secondary-colour">{`Topic Wise QP & AP`}</span>
            </div>
          }
          customDesc={
            <div className="primary-colour">{`Concise resources for the ${removeUnderScore(
              data.subject
            )} course.`}</div>
          }
        />
      </div>
      <div className="tt-inner-grid-wrapper">
        <AnimatePresence>
          <m.div
            className="std-chp-dash-list-main"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <m.div
              className="std-chp-dash-list-main__each pointer"
              variants={item}
              onClick={() =>
                navigateTo(
                  `/tuition/${data.subject}/${data.subjectId}/${data.chapter}/${data.chapterId}/topicWiseQPAP/questions`
                )
              }
            >
              <CgNotes style={{ fontSize: "3em" }} />
              <div className="large-text bold">Question Papers</div>
            </m.div>
            <m.div
              className="std-chp-dash-list-main__each pointer"
              variants={item}
              onClick={() =>
                navigateTo(
                  `/tuition/${data.subject}/${data.subjectId}/${data.chapter}/${data.chapterId}/topicWiseQPAP/answers`
                )
              }
            >
              <CgNotes style={{ fontSize: "3em" }} />
              <div className="large-text bold">Answer Papers</div>
            </m.div>
          </m.div>
        </AnimatePresence>
      </div>
    </m.div>
  );
};

export default TopicWiseQPAP;
