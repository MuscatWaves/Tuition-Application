import React from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, m } from "framer-motion";
import { cards, container, item } from "./constants";
import { FaBook } from "react-icons/fa";
import "./dashboard.css";

const Dashboard = () => {
  // const [isLoggedIn, setLoggedIn] = useState({});
  const isLoggedIn = {};
  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(path);
  };
  const checkNumberOfCards = () =>
    cards(isLoggedIn).filter((card) => card?.permission).length;

  // https://img.youtube.com/vi/sUwD3GRPJos/maxresdefault.jpg

  return (
    <div className="main-dashboard">
      <div>
        <Header />
        <div className="main-dashboard-wrapper">
          <div className="larger-text bolder primary-font primary-colour flex-small-gap welcome-message">
            <span>Welcome</span>
            <span className="red-shade-colour">Test User!</span>
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
              {cards(isLoggedIn).map(
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
    </div>
  );
};

export default Dashboard;
