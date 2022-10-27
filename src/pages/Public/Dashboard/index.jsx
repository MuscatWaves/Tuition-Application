import React from "react";
import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, m } from "framer-motion";
import { cards, container, item } from "./constants";
import { FaBook, FaUserCircle } from "react-icons/fa";
import { MdOutlineGrade } from "react-icons/md";
import { FiMail } from "react-icons/fi";
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
    <m.div
      className="tuition-dashboard-page"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
      <Header />
      <div className="mtd-wrapper">
        <div className="mtd-info-box">
          <div className="tuition-wt">
            <div className="larger-text bold text-white-light">Welcome</div>
            <FaUserCircle
              style={{
                width: "150px",
                height: "150px",
                color: "var(--red-shade-color)",
                backgroundColor: "#fff",
                borderRadius: "50%",
              }}
            />
            <div className="large-text bolder text-white-light">
              Prabin Kumar Pradeep
            </div>
            <div className="tuition-wt-inner">
              <div className="flex-small-gap">
                <FiMail
                  style={{
                    width: "20px",
                    height: "20px",
                    color: "var(--red-shade-color)",
                  }}
                />
                <div className="small-text bold">
                  prabinkumar1999@outlook.com
                </div>
              </div>
              <div className="flex-small-gap">
                <MdOutlineGrade
                  style={{
                    width: "20px",
                    height: "20px",
                    color: "var(--red-shade-color)",
                  }}
                />
                <div className="small-text bold">Grade 2</div>
              </div>
            </div>
          </div>
          <div className="bolder text-white-light">
            &copy; Powered by Accadia Tuitions
          </div>
        </div>
        <div className="mtd-main-box">
          <div className="mtd-main-box__inner">
            <div className="mtd-main-box__b-1">Personal Details</div>
            <div className="mtd-main-box__b-2">Recent Purchases</div>
            <div className="mtd-main-box__b-3">A buy icon</div>
          </div>
          <div>My Subjects</div>
        </div>
      </div>
    </m.div>
  );
};

export default Dashboard;

{
  /* <AnimatePresence>
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
          </AnimatePresence> */
}
