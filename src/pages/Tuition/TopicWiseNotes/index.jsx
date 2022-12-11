import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { m } from "framer-motion";
import Header from "../../../components/Header";
import GridInnerPage from "../../../components/GridInnerPage";
import InnerHeader from "../../../components/InnerHeader";
import { removeUnderScore } from "../../../utilities";
import "./topicwisenotes.css";

const TopicWiseNotes = () => {
  const data = useParams();

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
      name: `Topic Wise Notes`,
      active: true,
    },
  ];

  useEffect(() => {
    document.title = `${removeUnderScore(data.chapter)} - Topic Wise Notes`;
    // eslint-disable-next-line
  }, []);

  const testData = [
    {
      id: 1,
      name: "Information 1",
      resources: [
        { id: 1, name: "Test Link 1" },
        { id: 2, name: "Test Link 2" },
        { id: 3, name: "Test Link 3" },
        { id: 4, name: "Test Link 3" },
        { id: 5, name: "Test Link 3" },
        { id: 6, name: "Test Link 3" },
      ],
    },
    {
      id: 2,
      name: "Information 2",
      resources: [
        { id: 1, name: "Test Link 1" },
        { id: 2, name: "Test Link 2" },
        { id: 3, name: "Test Link 3" },
      ],
    },
    {
      id: 3,
      name: "Information 3",
      resources: [
        { id: 1, name: "Test Link 1" },
        { id: 2, name: "Test Link 2" },
        { id: 3, name: "Test Link 3" },
        { id: 4, name: "Test Link 3" },
        { id: 5, name: "Test Link 3" },
        { id: 6, name: "Test Link 3" },
      ],
    },
    {
      id: 4,
      name: "Information 4",
      resources: [
        { id: 1, name: "Test Link 1" },
        { id: 2, name: "Test Link 2" },
        { id: 3, name: "Test Link 3" },
      ],
    },
  ];

  return (
    <m.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
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
              <span className="secondary-colour">Topic Wise Notes</span>
            </div>
          }
          customDesc={
            <div className="primary-colour">{`Concise resources for the ${removeUnderScore(
              data.subject
            )} course.`}</div>
          }
        />
        <GridInnerPage data={testData} view={"list"} />
      </div>
    </m.div>
  );
};

export default TopicWiseNotes;
