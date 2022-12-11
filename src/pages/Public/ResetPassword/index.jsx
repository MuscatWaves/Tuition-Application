import React, { useState } from "react";
import Footer from "../../../components/Footer";
import { useForm } from "@mantine/form";
import { m } from "framer-motion";
import logoSmall from "../../../images/logo-small.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import { showNotification } from "@mantine/notifications";
import CustomButton from "../../../components/Buttons";
import { greenNotify, redNotify } from "../../../notification";
import { PasswordInput } from "@mantine/core";
import "./login.css";
import { container, item, zoomItem } from "../../../animation";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      code: searchParams.get("code"),
      email: searchParams.get("email"),
      password: "",
      repeatPassword: "",
    },
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    var axios = require("axios");
    var data = JSON.stringify({
      email: values.email,
      code: values.code,
      password: values.password,
      repeatPassword: values.repeatPassword,
    });

    var config = {
      method: "post",
      url: "/api/student/reset",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          showNotification({
            title: "Password Reset Successful!",
            styles: greenNotify,
          });
          navigate("/tuition/login");
        } else {
          if (response.status === 201) {
            showNotification({
              title: "Reset Error!",
              message: response.data.error,
              styles: redNotify,
            });
            setLoading(false);
          } else {
            showNotification({
              title: "Reset Error!",
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
          message: error.response.data.error || "Something went terribly wrong",
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
              {`Reset Password`}
            </div>
            <m.div className="flex-small-gap-column" variants={zoomItem}>
              <div className="medium-text bolder text-light-grey">Email</div>
              <div className="bold">{form.values.email}</div>
            </m.div>
            <m.div className="flex-small-gap-column" variants={zoomItem}>
              <div className="medium-text bolder text-light-grey">Password</div>
              <PasswordInput
                placeholder="Enter your new password here!"
                radius="lg"
                size="lg"
                {...form.getInputProps("password")}
              />
            </m.div>
            <m.div
              className="flex-small-gap-column small-margin-bottom"
              variants={zoomItem}
            >
              <div className="medium-text bolder text-light-grey">
                Repeat Password
              </div>
              <PasswordInput
                placeholder="Confirm your password here!"
                radius="lg"
                size="lg"
                {...form.getInputProps("repeatPassword")}
              />
            </m.div>
            <CustomButton
              label="Reset Password"
              category="landing"
              type={"submit"}
              size={"lg"}
              radius={"xl"}
              loading={loading}
            />
          </m.form>
        </div>
      </div>
      <Footer />
    </m.div>
  );
};

export default ResetPassword;
