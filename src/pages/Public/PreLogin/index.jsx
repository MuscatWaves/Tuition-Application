import React from "react";
import TopNavigation from "../../../components/TopNavigation";
import { container, item } from "../../../animation";
import { useNavigate } from "react-router-dom";
import { m } from "framer-motion";
import CustomButton from "../../../components/Buttons";
import { AiOutlineRight } from "react-icons/ai";
import Footer from "../../../components/Footer";
import "../PreSignUp/presignup.css";
import { useEffect } from "react";
import { FaGraduationCap } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";

const PreLogin = () => {
  const navigate = useNavigate();
  const cards = [
    {
      id: 1,
      name: "Student",
      description: "Login for Student Portal",
      path: "/tuition/login",
      icon: FaGraduationCap,
    },
    {
      id: 2,
      name: "Admin",
      description: "Login for Admin Portal",
      path: "/admin/login",
      icon: RiAdminLine,
    },
  ];

  useEffect(() => {
    document.title = "Alamnii - Portal Login";
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
            Please select the portal
          </div>
          <m.div
            className="pre-sign-up__two-section"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {cards.map((card) => (
              <m.div
                className="pre-sign-in__card"
                variants={item}
                key={card.id}
              >
                <div className="larger-text bold primary-colour">
                  {card.name}
                </div>
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
                <div className="medium-text text-grey">{card.description}</div>
                <div className="flex-center">
                  <CustomButton
                    label="Login"
                    category="landing"
                    size={"lg"}
                    radius={"md"}
                    action={() => navigate(card.path)}
                    rightIcon={<AiOutlineRight />}
                  />
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

export default PreLogin;
