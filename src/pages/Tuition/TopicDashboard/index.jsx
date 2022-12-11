import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../../components/Header";
import GridLayoutDash from "../../../components/GridLayoutDash";
import InnerHeader from "../../../components/InnerHeader";
import { removeUnderScore } from "../../../utilities";
import { m } from "framer-motion";
import { cards } from "./constants";
import Cookies from "universal-cookie";
import jwtDecode from "jwt-decode";
import "./dashboard.css";

const TopicDashboard = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const user = jwtDecode(token);
  const data = useParams();
  const isLoggedIn = {};

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
      active: true,
    },
  ];

  useEffect(() => {
    document.title = removeUnderScore(data.chapter);
    // eslint-disable-next-line
  }, []);

  // https://img.youtube.com/vi/sUwD3GRPJos/maxresdefault.jpg

  return (
    <m.div
      className="main-dashboard"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
      <div>
        <Header />
        <InnerHeader navigation={navigation} data={data} />
        <GridLayoutDash
          cards={cards}
          isLoggedIn={isLoggedIn}
          data={data}
          user={user.name}
        />
      </div>
    </m.div>
  );
};

export default TopicDashboard;
