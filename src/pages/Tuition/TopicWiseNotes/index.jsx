import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../components/Header";
import { removeUnderScore } from "../../../utilities";
import { Breadcrumbs, Anchor } from "@mantine/core";
import { container, item } from "../../../animation";
import { m, AnimatePresence } from "framer-motion";
import "./topicwisenotes.css";

const TopicWiseNotes = () => {
  const navigateTo = useNavigate();
  const data = useParams();
  const items = [
    { title: "Dashboard", href: "/dashboard" },
    { title: "English", href: "#" },
    { title: "Topic Wise Notes", href: "#", active: true },
  ].map((item, index) => (
    <Anchor
      key={index}
      className={item.active ? "link--active" : "link"}
      onClick={() => navigateTo(item.href)}
    >
      {item.title}
    </Anchor>
  ));

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
    <div>
      <Header />
      <div>
        <div className="flex-column-center medium-gap">
          <div className="bolder primary-font-2 larger-text">
            <span className="secondary-colour">
              {removeUnderScore(`${data.subject} : `)}
            </span>
            <span className="primary-colour">Topic Wise Notes</span>
          </div>
          <div>
            <Breadcrumbs separator="→">{items}</Breadcrumbs>
          </div>
          <div className="bold text-light-grey small-margin-top">{`Concise resources for the ${removeUnderScore(
            data.subject
          )} course.`}</div>
        </div>
      </div>
      <div className="tpw-notes-wrapper">
        <AnimatePresence>
          <m.div
            className="tpw-notes-main"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {testData.map((data) => (
              <m.div
                key={data.id}
                className="tpw-notes-each-card"
                variants={item}
              >
                <div className="red-shade-colour larger-text bolder">
                  {data.name}
                </div>
                <div className="flex-small-gap-column small-margin-top">
                  {data.resources.map((resource) => (
                    <div
                      className="primary-colour medium-text"
                      key={resource.id}
                    >
                      {resource.name}
                    </div>
                  ))}
                </div>
              </m.div>
            ))}
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TopicWiseNotes;
