import React from "react";
// import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
// import Authentication from "../../components/Authentication";
// import jwt from "jsonwebtoken";
import { AiOutlinePoweroff } from "react-icons/ai";
import logoSmall from "../../images/logo-small.png";
import { FiUser } from "react-icons/fi";
// import { removeCookie } from "../../utilities";
import { m } from "framer-motion";
import CustomButton from "../Buttons";
import { showNotification } from "@mantine/notifications";
import "./header.css";

const Header = () => {
  const navigateTo = useNavigate();
  // const cookies = new Cookies();
  // const token = cookies.get("token");
  // const navigateTo = (path) => {
  //   navigate(path);
  // };
  //   const user =
  //     (token && jwt.verify(token, process.env.REACT_APP_JWT_KEY)) || "";

  const logOut = () => {
    navigateTo("/prelogin");
    showNotification({
      title: "Testing",
      message: "Message something",
      styles: (theme) => ({
        root: {
          backgroundColor: theme.colors.blue[6],
          borderColor: theme.colors.blue[6],

          "&::before": { backgroundColor: theme.white },
        },

        title: { color: theme.white },
        description: { color: theme.white },
        closeButton: {
          color: theme.white,
          "&:hover": { backgroundColor: theme.colors.blue[7] },
        },
      }),
    });
  };

  return (
    <div className="header-wrapper">
      <div className="header">
        <m.img
          animate={{ opacity: 1, y: "0" }}
          initial={{ opacity: 0, y: "20px" }}
          transition={{ duration: "0.8" }}
          src={logoSmall}
          width={"70px"}
          height={"70px"}
          onClick={() => navigateTo("/dashboard")}
        />
        {/* <Authentication /> */}
        <div className="flex-small-gap">
          <FiUser className="large-text text-light-grey" />
          <div className="text-light-grey bolder">
            {/* {user?.data ? user.data[0].name : ""} */}
            Test User
          </div>
          <CustomButton
            color="red"
            radius="lg"
            size="sm"
            label={<AiOutlinePoweroff style={{ fontSize: "22px" }} />}
            action={logOut}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
