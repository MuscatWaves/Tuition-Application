import React from "react";
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

const SubjectDashboard = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const user = jwtDecode(token);
  const data = useParams();
  const isLoggedIn = {};

  const navigation = [
    { id: 1, title: "Dashboard", to: "/dashboard" },
    {
      id: 2,
      title: removeUnderScore(data.subject),
      to: `/dashboard/${data.subject}`,
      active: true,
    },
  ];

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
          subject={data.subject}
          user={user.name}
        />
      </div>
      <div>Footer</div>
    </m.div>
  );
};

export default SubjectDashboard;
