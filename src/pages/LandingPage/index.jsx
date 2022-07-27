import React, { useState, useRef } from "react";
import TopNavigation from "../../components/TopNavigation";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { cardList } from "./constants.ts";
import { useNavigate } from "react-router-dom";
import { m, AnimatePresence } from "framer-motion";
import "./landingpage.css";
import logo from "../../images/logo.png";
import howWeWorkImage from "../../images/how_we_work.svg";
import learnImage from "../../images/learn.svg";
import Footer from "../../components/Footer";

const LandingPage = () => {
  let navigate = useNavigate();
  const [showVideo, toggleVideo] = useState(false);
  const aboutRef = useRef(null);
  const [cards, setCards] = useState({
    card1: false,
    card2: false,
    card3: false,
  });

  const inViewVariant = {
    zoomView: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.25,
        ease: "easeOut",
      },
    },
    zoomHidden: { scale: 0.9, opacity: 0 },
    leftViewVariant: {
      x: "0",
      opacity: 1,
      transition: { type: "spring", stiffness: 40, damping: 6 },
    },
    leftViewHidden: {
      x: "-100px",
      opacity: 0,
    },
    rightViewVariant: {
      x: "0",
      opacity: 1,
      transition: { stiffness: 40, type: "spring", damping: 20 },
    },
    rightViewHidden: {
      x: "5vw",
      opacity: 0,
    },
    slideTopView: {
      y: "0",
      opacity: 1,
      transition: { stiffness: 40, type: "spring", damping: 20 },
    },
    slideTopHidden: {
      y: "5vh",
      opacity: 1,
      transition: { stiffness: 40, type: "spring", damping: 20 },
    },
  };

  const logoRevealVariant = {
    leftShow: {
      x: "0",
      transition: { type: "spring", delay: 0.25 },
    },
    leftHidden: {
      x: "10vw",
    },
    rightShow: {
      opacity: 1,
      transition: { delay: 0.3, duration: 0.5 },
    },
    rightHidden: {
      opacity: 0,
    },
  };

  const howWeVariant = {
    leftShow: {
      x: "0",
      transition: { type: "spring", delay: 0.5 },
    },
    leftHidden: {
      x: "50%",
    },
    rightShow: {
      opacity: 1,
      transition: { delay: 0.7, duration: 0.6 },
    },
    rightHidden: {
      opacity: 0,
    },
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: "100px",
    },
    show: {
      opacity: 1,
      y: 0,
      delay: 0.7,
      transition: {
        type: "spring",
        stiffness: 40,
        damping: 9,
      },
    },
  };

  const executeScroll = () =>
    aboutRef.current.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <m.div
      className="main-landing-page-body"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      exit={{ opacity: 0 }}
    >
      <Dialog
        // header="Header"
        className="video-cont"
        visible={showVideo}
        style={{ width: "50vw" }}
        onHide={() => toggleVideo(false)}
      >
        {showVideo && (
          <div className="video-section">
            <iframe
              className="iframe"
              src="https://www.youtube.com/embed/sUwD3GRPJos?controls=0"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              autoPlay={1}
            ></iframe>
          </div>
        )}
      </Dialog>
      <TopNavigation landing />
      <m.div className="landing-body" variants={inViewVariant}>
        <m.div className="first-section">
          <div className="first-section-content">
            <m.div
              className="flex-gap-column-2"
              variants={inViewVariant}
              whileInView={"leftViewVariant"}
              initial={"leftViewHidden"}
            >
              <m.div>
                <div className="text primary-font text-white-light primary-header-text">
                  Company
                </div>
              </m.div>
              <m.div className="text-white-light description-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                sit amet molestie est, vel condimentum lorem.
              </m.div>
              <m.div className="flex-small-gap">
                <Button
                  type="outlined"
                  size="large"
                  shape="round"
                  icon="pi pi-arrow-right"
                  iconPos="right"
                  label="Sign Up"
                  onClick={() => navigate("/login")}
                  className={"our-button"}
                />
                <Button
                  type="primary"
                  className="p-button-outlined"
                  size="large"
                  shape="round"
                  label="Learn More"
                  onClick={executeScroll}
                />
              </m.div>
            </m.div>
            <div className="first-section-image">
              <img src={learnImage} alt="learn new things" />
            </div>
          </div>
        </m.div>
        <m.div className="second-section-wrapper">
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
            <div className="horizontal-line"></div>
            <div className="larger-text bolder primary-font primary-colour">
              Wondering who we are?
            </div>
            <div className="about-section-desc">
              <div ref={aboutRef} className={"image-landing-about-section"}>
                <m.img
                  src={logo}
                  alt="logo"
                  variants={logoRevealVariant}
                  whileInView={"leftShow"}
                  initial={"leftHidden"}
                  viewport={{ margin: "-80px" }}
                  width={"280px"}
                  height={"280px"}
                ></m.img>
              </div>
              <m.div
                className="primary-font large-text bolder secondary-colour"
                style={{ lineHeight: "1.6" }}
                variants={logoRevealVariant}
                whileInView={"rightShow"}
                initial={"rightHidden"}
                viewport={{ margin: "-80px" }}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised.
              </m.div>
            </div>
          </m.div>
        </m.div>
        <m.div className="third-section">
          <m.div
            className="how-we-work-hook"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ margin: "-250px" }}
          >
            <m.div
              className="horizontal-line"
              style={{ margin: "2rem 0" }}
              variants={item}
            ></m.div>
            <m.div
              className="larger-text bolder primary-font primary-colour"
              variants={item}
            >
              How we work?
            </m.div>
            <m.div
              style={{ width: "50%", marginTop: "10px" }}
              className="primary-font large-text bolder text-colour"
              variants={item}
            >
              We Work for your sucess Lorem Ipsum is simply dummy text.
            </m.div>
            <img
              src={howWeWorkImage}
              className={"stairs-sv"}
              alt="stairs"
            ></img>
          </m.div>
          <m.div
            className="how-we-work-image"
            variants={howWeVariant}
            whileInView={"rightShow"}
            initial={"rightHidden"}
          >
            <div
              className="video-play-button"
              onClick={() => toggleVideo(true)}
            >
              <span></span>
            </div>
          </m.div>
        </m.div>
        <div className="fourth-section">
          <m.div
            variants={inViewVariant}
            whileInView={"zoomView"}
            initial={"zoomHidden"}
            viewport={{ margin: "-250px" }}
          >
            <div className="second-section-header">
              <m.div
                className="horizontal-line"
                style={{ margin: "2rem 0" }}
                variants={item}
              ></m.div>
              <m.div
                className="larger-text bolder primary-font primary-colour"
                variants={item}
              >
                What we provide?
              </m.div>
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
                    // background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0,0, 0, 0.6)), url(${card.image})`,
                    background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0,0, 0, 0.6))`,
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
                  <AnimatePresence>
                    {cards[`card${card.id}`] && (
                      <m.div
                        key={card.id}
                        className={"card-description secondary-text-colour"}
                        animate={{ y: 0 }}
                        initial={{ y: "120px" }}
                        transition={{
                          stiffness: 70,
                          type: "spring",
                          damping: 10,
                        }}
                        exit={{ y: "120px", opacity: 0 }}
                      >
                        <div className="bolder large-text">{card.name}</div>
                        <div className="horizontal-line"></div>
                        <div className="medium-text">{card.description}</div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </m.div>
        </div>
      </m.div>
      <Footer />
    </m.div>
  );
};

export default LandingPage;
