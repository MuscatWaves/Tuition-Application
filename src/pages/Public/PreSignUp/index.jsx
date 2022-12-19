import React from "react";
import Footer from "../../../components/Footer";
import TopNavigation from "../../../components/TopNavigation";
import { BiCheckCircle } from "react-icons/bi";
import { AiOutlineRight } from "react-icons/ai";
import CustomButton from "../../../components/Buttons";
import { useNavigate } from "react-router-dom";
import { container, item } from "../../../animation";
import { m } from "framer-motion";
import "./presignup.css";
import { useEffect } from "react";

const PreSignUp = () => {
  const navigate = useNavigate();
  const cards = [
    {
      id: 1,
      name: "Student",
      benefits: [
        "Topic Wise Notes",
        "Topic Wise Question Papers & Answer Papers",
        "Topic Wise Videos",
        "Student Enquiries",
        "Various Subjects",
      ],
      path: "/signUp/Tuition",
    },
    {
      id: 2,
      name: "IELTS",
      benefits: [
        "Face to face classes",
        "Online Notes",
        "Question Papers & Answer Papers",
        "Explanatory Videos",
      ],
      path: "/signUp/IELTS",
      disabled: true,
    },
  ];

  useEffect(() => {
    document.title = "Alamnii - Sign Up";
  }, []);

  return (
    <m.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
      <TopNavigation />
      <div className="pre-sign-up__page">
        <div className="pre-sign-up__page-wrapper">
          <div className="larger-text bolder primary-font">
            Choose your package
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
                      disabled={card.disabled}
                    />
                  </div>
                </div>
              </m.div>
            ))}
          </m.div>
        </div>
      </div>
      <Footer />
    </m.div>
  );
};

export default PreSignUp;
