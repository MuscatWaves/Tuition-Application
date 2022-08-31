import React from "react";
import Footer from "../../components/Footer";
import TopNavigation from "../../components/TopNavigation";
import { BiCheckCircle } from "react-icons/bi";
import { AiOutlineRight } from "react-icons/ai";
import CustomButton from "../../components/Buttons";
import { useNavigate } from "react-router-dom";
import { container, item } from "../../animation";
import { m } from "framer-motion";
import "./presignup.css";

const PreSignUp = () => {
  const navigate = useNavigate();
  const cards = [
    {
      id: 1,
      name: "Tuition",
      duration: "5 months",
      benefits: [
        "Custom Dashboard",
        "Topic Wise Notes",
        "Topic Wise Question Papers & Answer Papers",
        "Videos for each section",
        "Student Enquiries",
        "Various Subjects",
      ],
      path: "/signUp/Tuition",
    },
    {
      id: 2,
      name: "IELTS",
      duration: "1 month",
      benefits: [
        "Face to face classes",
        "Online Notes",
        "Question Papers & Answer Papers",
        "Explanatory Videos",
      ],
    },
  ];

  return (
    <div>
      <TopNavigation />
      <div className="pre-sign-up__page">
        <div className="pre-sign-up__page-wrapper">
          <div className="larger-text bolder primary-font">
            Choose your package
          </div>
          <div className="bold text-light-grey">
            Payments will be shown on next page
          </div>
          <m.div
            className="pre-sign-up__two-section"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {cards.map((card) => (
              <m.div
                className="pre-sign-up__card"
                variants={item}
                key={card.id}
              >
                <div className="larger-text bolder primary-colour">
                  {card.name}
                </div>
                <div className="bolder medium-text">{`Duration - ${card.duration}`}</div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  <div className="bolder text-light-grey">
                    Package includes :{" "}
                  </div>
                  <div>
                    {card.benefits.map((point) => (
                      <div
                        style={{ display: "flex", gap: "0.5rem" }}
                        key={point}
                      >
                        <div>
                          <BiCheckCircle
                            className="text-green"
                            style={{ fontSize: "24px" }}
                          />
                        </div>
                        <div className="bold text-grey">{point}</div>
                      </div>
                    ))}
                  </div>
                  <div className="small-margin-top flex-center">
                    <CustomButton
                      label="Sign Up"
                      category="landing"
                      size={"lg"}
                      radius={"md"}
                      action={() => navigate(card.path)}
                      rightIcon={<AiOutlineRight />}
                    />
                  </div>
                </div>
              </m.div>
            ))}
          </m.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PreSignUp;
