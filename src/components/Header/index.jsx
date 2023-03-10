import React from "react";
import { useNavigate } from "react-router-dom";
import Authentication from "../../components/Authentication";
import { AiOutlinePoweroff } from "react-icons/ai";
import logoSmall from "../../images/logo-small.png";
import { FiUser } from "react-icons/fi";
import { m } from "framer-motion";
import CustomButton from "../Buttons";
import { removeCookie } from "../../utilities";
import Cookies from "universal-cookie";
import jwtDecode from "jwt-decode";
import "./header.css";

const Header = ({ customLink, CustomComponent }) => {
  const navigateTo = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get("token");
  const user = jwtDecode(token);
  const logOut = () => {
    removeCookie(navigateTo);
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
          onClick={() => navigateTo(customLink || "/dashboard")}
        />
        <Authentication />
        <div className="custom-right-rendering">
          <div>{CustomComponent}</div>
          <div className="flex-small-gap">
            <div className="header-name">
              <FiUser className="large-text text-light-grey" />
              <div className="text-light-grey bolder">{user.name}</div>
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
    </div>
  );
};

export default Header;
