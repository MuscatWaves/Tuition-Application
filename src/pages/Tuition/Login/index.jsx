import React, { useState } from "react";
import Footer from "../../../components/Footer";
import { useForm } from "@mantine/form";
import { m } from "framer-motion";
import isEmail from "validator/lib/isEmail";
import Cookies from "universal-cookie";
import logoSmall from "../../../images/logo-small.png";
import { useNavigate } from "react-router-dom";
import { showNotification } from "@mantine/notifications";
import CustomButton from "../../../components/Buttons";
import { greenNotify, redNotify } from "../../../notification";
import { Input, Modal, PasswordInput } from "@mantine/core";
import "./login.css";
import { container, item, zoomItem } from "../../../animation";

const TuitionLogin = () => {
  const [loading, setLoading] = useState(false);
  const cookies = new Cookies();
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });
  const form2 = useForm({
    initialValues: {
      email: "",
    },
  });
  const [isResetPassword, toggleResetPassword] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const handleResetPassword = async (values) => {
    setPasswordLoading(true);
    var axios = require("axios");
    var updateData = JSON.stringify({
      email: values.email,
    });

    var config = {
      method: "post",
      url: "/api/student/forgot",
      headers: {
        "Content-Type": "application/json",
      },
      data: updateData,
    };
    axios(config)
      .then(function (response) {
        showNotification({
          title: "Reset Password sent to your mail",
          styles: greenNotify,
        });
        setPasswordLoading(false);
        toggleResetPassword(false);
        form2.reset();
      })
      .catch(function (error) {
        showNotification({
          title: "Error!",
          message: error.response.data.error,
          styles: redNotify,
        });
        setPasswordLoading(false);
      });
  };

  const handleSubmit = async (values) => {
    const Email = values["email"];
    const Password = values["password"];
    setLoading(true);
    if (!isEmail(Email)) {
      showNotification({
        title: "Login Error",
        message: "Please enter a valid Email!",
        styles: redNotify,
      });
      setLoading(false);
      return;
    } else {
      var axios = require("axios");
      var data = JSON.stringify({
        email: Email,
        password: Password,
      });

      var config = {
        method: "post",
        url: "/api/student/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
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
            setLoading(false);
            navigate("/dashboard");
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
        .catch(function (error) {
          setLoading(false);
          showNotification({
            title: "Login Error!",
            message:
              error.response.data.error || "Something went terribly wrong",
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
      <Modal
        opened={isResetPassword}
        onClose={() => toggleResetPassword(false)}
        centered
        padding={"lg"}
        title={
          <div className="bolder small-text primary-colour">
            Account Password Reset
          </div>
        }
        radius={"lg"}
      >
        <form
          className="flex-gap-column-1 form-main-login"
          onSubmit={form2.onSubmit(handleResetPassword)}
          variants={container}
          animate={"show"}
          initial={"hidden"}
        >
          <m.div className="flex-small-gap-column" variants={zoomItem}>
            <div className="medium-text bolder text-light-grey">Email</div>
            <Input
              placeholder="Enter your mail here!"
              required
              radius="lg"
              size="lg"
              {...form2.getInputProps("email")}
            />
          </m.div>
          <CustomButton
            label="Send Reset Password Mail"
            category="landing"
            type={"submit"}
            size={"lg"}
            radius={"xl"}
            loading={passwordLoading}
          />
        </form>
      </Modal>
      <div className="login-form-main-wrapper">
        <div className="login-form-main">
          <m.img
            className="logo-small-login pointer"
            src={logoSmall}
            alt="login-small"
            onClick={() => navigate("/")}
            variants={item}
            animate={"show"}
            initial={"hidden"}
          />
          <m.form
            className="flex-gap-column-1 form-main-login"
            onSubmit={form.onSubmit(handleSubmit)}
            variants={container}
            animate={"show"}
            initial={"hidden"}
          >
            <div className="flex-center bold larger-text primary-font red-shade-colour">
              {`Student Login`}
            </div>
            <m.div className="flex-small-gap-column" variants={zoomItem}>
              <div className="medium-text bolder text-light-grey">Email</div>
              <Input
                placeholder="Enter your mail here!"
                required
                radius="lg"
                size="lg"
                {...form.getInputProps("email")}
              />
            </m.div>
            <m.div className="flex-small-gap-column" variants={zoomItem}>
              <div className="medium-text bolder text-light-grey">Password</div>
              <PasswordInput
                placeholder="Enter your password here!"
                radius="lg"
                size="lg"
                {...form.getInputProps("password")}
              />
            </m.div>
            <div
              className="small-text bolder flex-end text-grey pointer"
              onClick={() => {
                form2.reset();
                toggleResetPassword(true);
              }}
            >
              Forgot Password?
            </div>
            <CustomButton
              label="Log in"
              category="landing"
              type={"submit"}
              size={"lg"}
              radius={"xl"}
              loading={loading}
            />
            <div className="small-text bolder flex-center text-grey">
              Don't have an account?
              <span
                className="bold red-shade-colour pointer"
                onClick={() => navigate("/signUp/Tuition")}
              >
                Sign up
              </span>
            </div>
          </m.form>
        </div>
      </div>
      <Footer />
    </m.div>
  );
};

export default TuitionLogin;
