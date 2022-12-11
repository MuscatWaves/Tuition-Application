import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { m } from "framer-motion";
import Header from "../../../components/Header";
import InnerHeader from "../../../components/InnerHeader";
import { removeUnderScore } from "../../../utilities";
import GridInnerPage from "../../../components/GridInnerPage";

const ExplanatoryVideo = () => {
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
      name: `Explanatory Videos`,
      active: true,
    },
  ];

  useEffect(() => {
    document.title = `${removeUnderScore(data.chapter)} - Explanatory Video`;
    // eslint-disable-next-line
  }, []);

  const testData = [
    {
      id: 1,
      name: "Information 1",
      resources: [
        {
          id: 1,
          name: "Test Link 1",
          link: "https://www.youtube.com/watch?v=rXhGajRFLlY",
        },
        {
          id: 2,
          name: "Test Link 2",
          link: "https://www.youtube.com/watch?v=e992r0QxuI4",
        },
        {
          id: 3,
          name: "Test Link 3",
          link: "https://www.youtube.com/watch?v=ba7L_g59cNI",
        },
      ],
    },
    {
      id: 2,
      name: "Information 2",
      resources: [
        {
          id: 1,
          name: "Test Link 1",
          link: "https://www.youtube.com/watch?v=itEhZsn8wXc",
        },
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
              <span className="secondary-colour">Explanatory Videos</span>
            </div>
          }
          customDesc={
            <div className="primary-colour">{`Concise resources for the ${removeUnderScore(
              data.subject
            )} course.`}</div>
          }
        />
        <GridInnerPage data={testData} view={"video"} />
      </div>
    </m.div>
  );
};

export default ExplanatoryVideo;
