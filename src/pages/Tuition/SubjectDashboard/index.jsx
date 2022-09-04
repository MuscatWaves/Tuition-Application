import React from "react";
import Header from "../../../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, m } from "framer-motion";
import { cards, container, item } from "./constants";
import { removeUnderScore } from "../../../utilities";
import "./dashboard.css";

const SubjectDashboard = () => {
  // const [isLoggedIn, setLoggedIn] = useState({});
  const data = useParams();
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
        <div className="flex-column-center">
          <div className="larger-text bolder primary-font-2 red-shade-colour">
            {removeUnderScore(data.subject)}
          </div>
          <div className="primary-font bold primary-colour">
            A start of something good
          </div>
        </div>
        <div>
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
                        <card.icon style={{ fontSize: "48px" }} />
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

export default SubjectDashboard;
