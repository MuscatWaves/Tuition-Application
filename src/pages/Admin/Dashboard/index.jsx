import React from "react";
import Header from "../../../components/Header";
import { m } from "framer-motion";
import { container, item } from "../../Dashboard/constants";
import { AnimatePresence } from "framer-motion";
import { FaBook } from "react-icons/fa";
import { adminCards } from "./adminCards";
import { useNavigate } from "react-router-dom";
import "../../Dashboard/dashboard.css";

const AdminDash = () => {
  const navigateTo = useNavigate();
  const isLoggedIn = {};
  const checkNumberOfCards = () =>
    adminCards(isLoggedIn).filter((card) => card?.permission).length;

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
        <div className="main-dashboard-wrapper">
          <div className="larger-text bolder primary-font primary-colour flex-small-gap welcome-message">
            <span>Welcome</span>
            <span className="red-shade-colour">Admin!</span>
          </div>
          <AnimatePresence>
            <m.div
              className={
                checkNumberOfCards() > 4 ? "main-card grid-3" : "main-card"
              }
              variants={container}
              initial="hidden"
              animate="show"
            >
              {adminCards(isLoggedIn).map(
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
        </div>
      </div>
      <div>Footer</div>
    </m.div>
  );
};

export default AdminDash;
