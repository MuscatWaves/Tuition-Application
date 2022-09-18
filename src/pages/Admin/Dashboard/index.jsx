import React, { useEffect } from "react";
import Header from "../../../components/Header";
import { m } from "framer-motion";
import { container, item } from "../../Dashboard/constants";
import { AnimatePresence } from "framer-motion";
import Cookies from "universal-cookie";
import { FaBook } from "react-icons/fa";
import { adminCards } from "./adminCards";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useQuery } from "react-query";
import axios from "axios";
import Loader from "../../../components/Loader";
import "../../Dashboard/dashboard.css";

const AdminDash = () => {
  const navigateTo = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get("token");
  const user = jwtDecode(token);
  const userData = JSON.parse(localStorage.getItem("user"));
  const checkNumberOfCards = () =>
    adminCards(userData).filter((card) => card?.permission).length;

  const { isFetching, refetch } = useQuery(
    ["adminManageAccess"],
    () =>
      axios.get(`/api/account/${user.id}`, {
        headers: {
          Authorization: token,
        },
      }),
    {
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: (data) =>
        localStorage.setItem("user", JSON.stringify(data.data)),
    }
  );

  useEffect(() => {
    localStorage.getItem("user") || refetch();
    // eslint-disable-next-line
  }, []);

  return (
    <m.div
      className="main-dashboard"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
      <div>
        <Header customLink={"/adminDashboard"} />
        <div className="main-dashboard-wrapper">
          <div className="larger-text bolder primary-font primary-colour flex-small-gap welcome-message">
            <span>Welcome</span>
            <span className="red-shade-colour">Admin!</span>
          </div>
          {isFetching ? (
            <div className="first-time-dash">
              <Loader />
              <div className="bolder text-light-grey medium-text">
                Personalizing your workspace
              </div>
            </div>
          ) : (
            userData && (
              <AnimatePresence>
                <m.div
                  className={
                    checkNumberOfCards() > 4 ? "main-card grid-3" : "main-card"
                  }
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  {adminCards(userData).map(
                    (card, index) =>
                      card.permission && (
                        <m.div
                          key={card.id}
                          className="card"
                          onClick={() => navigateTo(card.path)}
                          variants={item}
                        >
                          <div className="dash-card-icon">
                            <FaBook style={{ fontSize: "48px" }} />
                          </div>
                          <h2 className="text-black">{card.title}</h2>
                          <p className="description-text bolder">
                            {card.description}
                          </p>
                          <div className="go-corner" href="#">
                            <div className="go-arrow">→</div>
                          </div>
                        </m.div>
                      )
                  )}
                </m.div>
              </AnimatePresence>
            )
          )}
        </div>
      </div>
      <div>Footer</div>
    </m.div>
  );
};

export default AdminDash;
