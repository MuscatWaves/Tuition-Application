import React, { useState } from "react";
import TopNavigation from "../../components/TopNavigation";
import { Button } from "primereact/button";
import { cardList } from "./constants.ts";
import { LazyMotion, domAnimation, m } from "framer-motion";
import bannerImage from "../../images/banner-image.webp";
import "./landingpage.css";

const LandingPage = () => {
  const [cards, setCards] = useState({
    card1: false,
    card2: false,
    card3: false,
  });

  return (
    <div>
      <LazyMotion features={domAnimation}>
        <TopNavigation />
        <m.div className="landing-body">
          <m.div
            className="first-section"
            animate={{ scale: 1, opacity: 1 }}
            initial={{ scale: 0.7, opacity: 0 }}
            transition={{ stiffness: 40, type: "spring", damping: 20 }}
          >
            <div className="flex-gap-column-2">
              <m.div>
                <div className="text primary-font primary-text-colour big-text">
                  Company
                </div>
              </m.div>
              <div className="text-grey middile-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                sit amet molestie est, vel condimentum lorem. Quisque porta
                scelerisque tellus nec faucibus.In erat lacus, pellentesque eget
                ornare eu, vulputate ac enim. Proin malesuada.
              </div>
              <div className="flex-small-gap">
                <Button
                  type="outlined"
                  size="large"
                  shape="round"
                  icon="pi pi-arrow-right"
                  iconPos="right"
                  label="Sign Up"
                />
                <Button
                  type="primary"
                  className="p-button-outlined"
                  size="large"
                  shape="round"
                  label="Learn More"
                />
              </div>
            </div>
            <div className="videoWrapper">
              <img
                src={bannerImage}
                className={"banner-image"}
                alt={"banner"}
              />
            </div>
          </m.div>
          <m.div
            className="second-section"
            animate={{ scale: 1, opacity: 1 }}
            initial={{ scale: 0.7, opacity: 0 }}
            transition={{
              stiffness: 40,
              type: "spring",
              damping: 20,
              delay: 0.5,
            }}
          >
            <div className="second-section-header">
              <div className="secondary-text-colour bolder">Lorem Ipsum</div>
              <div className="larger-text bolder primary-text-colour">
                How it works?
              </div>
            </div>
            <div className="video-section">
              <iframe
                className="iframe"
                src="https://www.youtube.com/embed/sUwD3GRPJos?controls=0"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </m.div>
          <m.div
            className="second-section"
            animate={{ scale: 1, opacity: 1 }}
            initial={{ scale: 0.7, opacity: 0 }}
            transition={{
              stiffness: 40,
              type: "spring",
              damping: 20,
            }}
          >
            <div className="second-section-header">
              <div className="secondary-text-colour bolder">
                Sharing the light
              </div>
              <div className="larger-text bolder primary-text-colour">
                Our Services
              </div>
            </div>
            <div className="card-pack">
              {cardList.map((card) => (
                <div
                  className={
                    cards[`card${card.id}`]
                      ? "each-card each-card--active"
                      : "each-card"
                  }
                  style={{
                    background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${card.image})`,
                  }}
                  key={card.id}
                  onMouseEnter={() =>
                    setCards({
                      card1: false,
                      card2: false,
                      card3: false,
                      [`card${card.id}`]: true,
                    })
                  }
                  onMouseLeave={() => {
                    setCards({
                      card1: false,
                      card2: false,
                      card3: false,
                    });
                  }}
                >
                  {!cards[`card${card.id}`] && (
                    <div className="card--inactive larger-text bolder">
                      {card.name}
                    </div>
                  )}
                  {cards[`card${card.id}`] && (
                    <div className={"card-description secondary-text-colour"}>
                      <div className="bolder large-text">{card.name}</div>
                      <div className="horizontal-line"></div>
                      <div className="medium-text">{card.description}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </m.div>
        </m.div>
      </LazyMotion>
    </div>
  );
};

export default LandingPage;
