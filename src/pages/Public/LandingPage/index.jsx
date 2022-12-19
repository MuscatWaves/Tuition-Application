import React, { useState, useRef } from "react";
import TopNavigation from "../../../components/TopNavigation";
import { cardList } from "./constants.ts";
import { useNavigate } from "react-router-dom";
import { m, AnimatePresence } from "framer-motion";
import logo from "../../../images/logo.png";
import howWeWorkImage from "../../../images/how_we_work.svg";
import learnImage from "../../../images/learn.svg";
import Footer from "../../../components/Footer";
import CustomButton from "../../../components/Buttons";
import { AspectRatio, Modal } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  item,
  logoRevealVariant,
  howWeVariant,
  inViewVariant,
  zoomItem,
} from "../../../animation";
import "./landingpage.css";
import { useEffect } from "react";

const LandingPage = () => {
  let navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [showVideo, toggleVideo] = useState(false);
  const aboutRef = useRef(null);
  const [cards, setCards] = useState({
    card1: false,
    card2: false,
    card3: false,
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.6,
      },
    },
  };

  useEffect(() => {
    document.title = "Alamnii";
  }, []);

  const executeScroll = () =>
    aboutRef.current.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <m.div
      className="main-landing-page-body"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
      <Modal
        opened={showVideo}
        onClose={() => toggleVideo(false)}
        size={
          isMobile ? window.innerWidth : `calc(${window.innerWidth}px - 500px)`
        }
        overlayOpacity={0.55}
        overlayBlur={3}
      >
        {showVideo && (
          <AspectRatio ratio={16 / 9}>
            <iframe
              src="https://www.youtube.com/embed/sUwD3GRPJos?controls=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </AspectRatio>
        )}
      </Modal>
      <TopNavigation landing />
      <div className="landing-body">
        <div className="first-section">
          <div className="first-section-content">
            <m.div
              className="flex-gap-column-2"
              variants={container}
              initial={"hidden"}
              animate={"show"}
            >
              <m.div
                className="text primary-font text-white-light primary-header-text"
                variants={zoomItem}
              >
                Looking forward to ACE your year?
              </m.div>
              <m.div
                className="text-white-light landing-description-text"
                variants={zoomItem}
              >
                We’re here to help you achieve just that.
              </m.div>
              <m.div className="flex-small-gap" variants={zoomItem}>
                <CustomButton
                  label="Sign Up"
                  category="landing"
                  size={"lg"}
                  radius={"md"}
                  action={() => navigate("/preSignUp")}
                />
                <CustomButton
                  label="Learn More"
                  category="grey"
                  size={"lg"}
                  radius={"md"}
                  action={executeScroll}
                />
              </m.div>
            </m.div>
            <div className="first-section-image">
              <img src={learnImage} alt="learn new things" />
            </div>
          </div>
        </div>
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
                <span className="red-shade-colour">Alamnii</span> aims to make
                student's studies easier and more fun. We provide students with
                all the required resources to help them in their academic year,
                whether you're in elementary school, middle school or high
                school, Alamnii is here to help.
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
              className="we-work-landing-desc primary-font large-text bolder text-colour"
              variants={item}
            >
              We work to provide you with the best materials to excel in your
              studies.
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
                      {card.icon && (
                        <card.icon
                          style={{
                            fontSize: "80px",
                            color: "#96858f",
                          }}
                        />
                      )}
                      {card.img && (
                        <img
                          src={card.img}
                          style={{ width: "100px" }}
                          alt={card.name}
                        />
                      )}
                      <div>{card.name}</div>
                    </div>
                  )}
                  <AnimatePresence>
                    {cards[`card${card.id}`] && (
                      <m.div
                        key={card.id}
                        className={
                          "card-description secondary-text-colour pointer"
                        }
                        animate={{ y: 0 }}
                        initial={{ y: "120px" }}
                        transition={{
                          stiffness: 70,
                          type: "spring",
                          damping: 10,
                        }}
                        exit={{ y: "120px", opacity: 0 }}
                        onClick={() => navigate(card.link)}
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
      </div>
      <Footer />
    </m.div>
  );
};

export default LandingPage;
