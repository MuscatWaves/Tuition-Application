import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AnimatePresence, m } from "framer-motion";
import Header from "../../../components/Header";
import InnerHeader from "../../../components/InnerHeader";
import { removeUnderScore } from "../../../utilities";
import { useQuery } from "react-query";
import axios from "axios";
import Spinner from "../../../components/Spinner";
import Cookies from "universal-cookie";
import { container, item } from "../../../animation";
import "../TopicWiseNotes/topicwisenotes.css";
import { MdOutlineOndemandVideo } from "react-icons/md";
import CustomButton from "../../../components/Buttons";
import "video-react/dist/video-react.css";
import { Player } from "video-react";
import { Modal } from "@mantine/core";

const ExplanatoryVideo = () => {
  const data = useParams();
  const cookies = new Cookies();
  const token = cookies.get("token");
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
  const [videoModal, setVideoModal] = useState(false);
  const [videoData, setVideoData] = useState("");

  const { data: notesDetAPI = [], isFetching } = useQuery(
    [`studentNotes${data.chapter}answers`],
    () =>
      axios.get(`/api/subs/file?id=${data.chapterId}&type=video`, {
        headers: {
          Authorization: token,
        },
      }),
    { refetchOnWindowFocus: false, select: (data) => data.data.data }
  );

  useEffect(() => {
    document.title = `${removeUnderScore(data.chapter)} - Explanatory Video`;
    // eslint-disable-next-line
  }, []);

  const handleClose = () => {
    setVideoModal(false);
    setVideoData("");
  };

  return (
    <m.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
      <Modal
        title={<div className="bolder large-text">Alamnii Resource Video</div>}
        opened={videoModal}
        onClose={handleClose}
        centered
        size="80%"
      >
        <Player>
          <source src={videoData} />
        </Player>
      </Modal>
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
        <div className="tt-inner-grid-wrapper">
          {isFetching ? (
            <div className="tt-inner-grid-loader">
              <Spinner />
            </div>
          ) : (
            <AnimatePresence>
              <m.div
                className="tt-inner-grid-list-main"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {notesDetAPI.map((subject) => (
                  <m.div
                    className="tt-inner-grid-list-main__each pointer"
                    key={subject.id}
                    variants={item}
                  >
                    <MdOutlineOndemandVideo
                      style={{
                        fontSize: "4em",
                        color: "var(--red-shade-color)",
                      }}
                    />
                    <div className="bold primary-colour">{subject.file}</div>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        flexWrap: "wrap",
                        justifyContent: "center",
                      }}
                    >
                      <CustomButton
                        label={"View Video"}
                        action={() => {
                          setVideoModal(true);
                          setVideoData(
                            `https://cvparse.fra1.cdn.digitaloceanspaces.com/files/tution/${subject.file}`
                          );
                        }}
                      />
                    </div>
                  </m.div>
                ))}
              </m.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </m.div>
  );
};

export default ExplanatoryVideo;
