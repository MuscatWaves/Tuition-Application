import React, { useState } from "react";
import Footer from "../../components/Footer";
import { useForm } from "@mantine/form";
import { m } from "framer-motion";
import isEmail from "validator/lib/isEmail";
import axios from "axios";
import Cookies from "universal-cookie";
import logoSmall from "../../images/logo-small.png";
import { useNavigate, useParams } from "react-router-dom";
import { showNotification } from "@mantine/notifications";
import CustomButton from "../../components/Buttons";
import { greenNotify, redNotify } from "../../notification";
import { Input, PasswordInput } from "@mantine/core";
import "./login.css";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const cookies = new Cookies();
  const navigate = useNavigate();
  const data = useParams();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values) => {
    const Email = values["email"];
    const Password = values["password"];
    setLoading(true);
    if (!isEmail(Email) && data.type !== "admin") {
      showNotification({
        title: "Login Error",
        message: "Please enter a valid Email!",
        styles: redNotify,
      });
      setLoading(false);
      return;
    } else {
      var bodyFormData = new FormData();
      data.type === "admin"
        ? bodyFormData.append("username", "Admin")
        : bodyFormData.append("username", Email);
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
            showNotification({
              title: "Login Successful!",
              styles: greenNotify,
            });
            cookies.set("token", response.data.token, {
              path: "/",
              maxAge: 60 * 60 * 24 * 365,
            });
            if (data.type === "admin") {
              navigate("/adminDashboard");
            }
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
    }
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
          <img className="logo-small-login" src={logoSmall} alt="login-small" />
          <form
            className="flex-gap-column-1 form-main-login"
            onSubmit={form.onSubmit(handleSubmit)}
          >
            {data.type === "admin" ? (
              <div className="flex-center bold larger-text primary-font red-shade-colour">
                Admin Login
              </div>
            ) : (
              <div className="flex-small-gap-column">
                <div className="medium-text bolder text-light-grey">Email</div>
                <Input
                  placeholder="Enter your mail here!"
                  required
                  radius="lg"
                  size="lg"
                  {...form.getInputProps("email")}
                />
              </div>
            )}
            <div className="flex-small-gap-column small-margin-bottom">
              <div className="medium-text bolder text-light-grey">Password</div>
              <PasswordInput
                placeholder="Enter your password here!"
                radius="lg"
                size="lg"
                {...form.getInputProps("password")}
              />
            </div>
            <CustomButton
              label="Log in"
              category="landing"
              type={"submit"}
              size={"lg"}
              radius={"xl"}
              loading={loading}
            />
            <div className="small-text bolder flex-end text-grey">
              Forgot Password?
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </m.div>
  );
};

export default Login;
