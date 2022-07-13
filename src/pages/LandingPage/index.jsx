import React from "react";
import TopNavigation from "../../components/TopNavigation";
import { Button } from "primereact/button";
import "./landingpage.css";

const LandingPage = () => {
  return (
    <div>
      <TopNavigation />
      <div className="landing-body">
        <div className="first-section">
          <div className="flex-gap-column-2">
            <div>
              <h1 className="text primary-text-colour boldest big-text">
                Ready to learn
              </h1>
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
          <div>
            <iframe
              className="iframe"
              width="600"
              height="340"
              src="https://www.youtube.com/embed/sUwD3GRPJos?controls=0"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
        <div className="second-section"></div>
      </div>
    </div>
  );
};

export default LandingPage;
