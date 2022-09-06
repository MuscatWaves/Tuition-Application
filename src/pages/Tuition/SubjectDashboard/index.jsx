import React from "react";
import { useParams } from "react-router-dom";
import Header from "../../../components/Header";
import GridLayoutDash from "../../../components/GridLayoutDash";
import InnerHeader from "../../../components/InnerHeader";
import { cards } from "./constants";
import { m } from "framer-motion";
import "./dashboard.css";

const SubjectDashboard = () => {
  // const [isLoggedIn, setLoggedIn] = useState({});
  const data = useParams();
  const isLoggedIn = {};

  const navigation = [
    { id: 1, title: "Dashboard", to: "/dashboard" },
    { id: 2, title: "English", to: `/dashboard/${data.subject}`, active: true },
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
        <GridLayoutDash cards={cards} isLoggedIn={isLoggedIn} />
      </div>
      <div>Footer</div>
    </m.div>
  );
};

export default SubjectDashboard;
