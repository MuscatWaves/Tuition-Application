import React from "react";
import { m, AnimatePresence } from "framer-motion";
import { container, item } from "../../animation";
import { useNavigate } from "react-router-dom";
import "./gridLayoutDash.css";

const GridLayoutDash = ({ cards, isLoggedIn, data, user }) => {
  const navigateTo = useNavigate();
  const checkNumberOfCards = () =>
    cards(isLoggedIn).filter((card) => card?.permission).length;

  return (
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
          {cards(isLoggedIn, data, user).map(
            (card, index) =>
              card?.permission && (
                <m.div
                  key={card.id}
                  className="card"
                  onClick={
                    card.action ? card.action : () => navigateTo(card.path)
                  }
                  variants={item}
                >
                  <div className="dash-card-icon">
                    <card.icon style={{ fontSize: "48px" }} />
                  </div>
                  <h2 className="text-black">{card.title}</h2>
                  <p className="description-text bolder">{card.description}</p>
                  <div className="go-corner" href="#">
                    <div className="go-arrow">→</div>
                  </div>
                </m.div>
              )
          )}
        </m.div>
      </AnimatePresence>
    </div>
  );
};

export default GridLayoutDash;
