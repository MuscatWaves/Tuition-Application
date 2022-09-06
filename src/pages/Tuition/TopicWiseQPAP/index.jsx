import React from "react";
import { useParams } from "react-router-dom";
import { m } from "framer-motion";
import Header from "../../../components/Header";
import InnerHeader from "../../../components/InnerHeader";
import { removeUnderScore } from "../../../utilities";
import GridInnerPage from "../../../components/GridInnerPage";

const TopicWiseQPAP = () => {
  const data = useParams();
  const navigation = [
    { id: 1, title: "Dashboard", to: "/dashboard" },
    { id: 2, title: "English", to: `/dashboard/${data.subject}` },
    { id: 3, title: "Topic Wise QP/AP", to: "", active: true },
  ];

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
              <span className="secondary-colour">{`Topic Wise QP & AP`}</span>
            </div>
          }
          customDesc={
            <div className="primary-colour">{`Concise resources for the ${removeUnderScore(
              data.subject
            )} course.`}</div>
          }
        />
        <GridInnerPage data={testData} view={"two-list"} />
      </div>
    </m.div>
  );
};

export default TopicWiseQPAP;
