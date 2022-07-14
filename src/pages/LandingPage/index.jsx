import React from "react";
import TopNavigation from "../../components/TopNavigation";
import { Button } from "primereact/button";
import { cardList } from "./constants.ts";
import "./landingpage.css";

const LandingPage = () => {
  return (
    <div>
      <TopNavigation />
      <div className="landing-body">
        <div className="first-section">
          <div className="flex-gap-column-2">
            <div>
              <div className="text primary-font primary-text-colour big-text">
                Ready to learn
              </div>
            </div>
            <div className="primary-text-colour middile-text">
              You've got the will. We've got the way. We will help you towards
              your victory
            </div>
            <div>
              <Button type="primary" size="large" shape="round">
                Register Yourself
              </Button>
            </div>
          </div>
          <div className="videoWrapper">
            <iframe
              className="iframe"
              src="https://www.youtube.com/embed/sUwD3GRPJos?controls=0"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className="second-section">
          <div className="second-section-header">
            <div className="secondary-text-colour bolder">
              Sharing the light
            </div>
            <div className="larger-text bolder primary-text-colour">
              Services we provide
            </div>
          </div>
          <div className="card-pack">
            {cardList.map((card) => (
              <div className="each-card" key={card.key}>
                <div></div>
                <div>
                  <div>{card.name}</div>
                  <div>{card.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
