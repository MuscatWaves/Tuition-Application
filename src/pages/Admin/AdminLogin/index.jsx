import React, { useState } from "react";
import Footer from "../../../components/Footer";
import { useForm } from "@mantine/form";
import { m } from "framer-motion";
import axios from "axios";
import Cookies from "universal-cookie";
import logoSmall from "../../../images/logo-small.png";
import { useNavigate } from "react-router-dom";
import { showNotification } from "@mantine/notifications";
import CustomButton from "../../../components/Buttons";
import { greenNotify, redNotify } from "../../../notification";
import { Input, PasswordInput } from "@mantine/core";
import { container, item, zoomItem } from "../../../animation";
import "../../Public/Login/login.css";
import { useEffect } from "react";

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const cookies = new Cookies();
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    document.title = "Login - Admin";
  }, []);

  const handleSubmit = async (values) => {
    const Email = values["email"];
    const Password = values["password"];
    setLoading(true);
    var bodyFormData = new FormData();
    bodyFormData.append("username", Email);
    bodyFormData.append("password", Password);
    await axios({
      method: "POST",
      url: `/api/login`,
      data: bodyFormData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        if (response.status === 200 && response.data.token) {
          localStorage.clear();
          showNotification({
            title: "Login Successful!",
            styles: greenNotify,
          });
          cookies.set("token", response.data.token, {
            path: "/",
            maxAge: 60 * 60 * 24 * 365,
          });
          navigate("/adminDashboard");
          setLoading(false);
        } else {
          if (response.status === 201) {
            showNotification({
              title: "Login Error!",
              message: response.data.error,
              styles: greenNotify,
            });
            setLoading(false);
          } else {
            showNotification({
              title: "Login Error!",
              message: `Ouch, Something went terribly wrong`,
              styles: redNotify,
            });
            setLoading(false);
          }
        }
      })
      .catch(function (response) {
        setLoading(false);
        showNotification({
          title: "Login Error!",
          message:
            response.response.data.error || "Something went terribly wrong",
          styles: redNotify,
        });
      });
  };

  return (
    <m.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
      <div className="login-form-main-wrapper">
        <div className="login-form-main">
          <m.img
            className="logo-small-login"
            src={logoSmall}
            alt="login-small"
            variants={item}
            animate={"show"}
            initial={"hidden"}
          />
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <m.div
              className="flex-gap-column-1 form-main-login"
              variants={container}
              animate={"show"}
              initial={"hidden"}
            >
              <m.div
                className="flex-center bold larger-text primary-font red-shade-colour"
                variants={zoomItem}
              >
                Admin Login
              </m.div>
              <m.div className="flex-small-gap-column" variants={zoomItem}>
                <div className="medium-text bolder text-light-grey">
                  Username
                </div>
                <Input
                  placeholder="Enter your username here!"
                  required
                  radius="lg"
                  size="lg"
                  {...form.getInputProps("email")}
                />
              </m.div>
              <m.div
                className="flex-small-gap-column small-margin-bottom"
                variants={zoomItem}
              >
                <div className="medium-text bolder text-light-grey">
                  Password
                </div>
                <PasswordInput
                  placeholder="Enter your password here!"
                  radius="lg"
                  size="lg"
                  {...form.getInputProps("password")}
                />
              </m.div>
              <CustomButton
                label="Log in"
                category="landing"
                type={"submit"}
                size={"lg"}
                radius={"xl"}
                loading={loading}
              />
              <div className="small-text bolder flex-end text-light-grey">
                Only for Admins & Teachers
              </div>
            </m.div>
          </form>
        </div>
      </div>
      <Footer />
    </m.div>
  );
};

export default AdminLogin;
