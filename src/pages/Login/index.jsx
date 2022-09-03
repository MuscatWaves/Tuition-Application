import React from "react";
import Footer from "../../components/Footer";
import { useForm } from "@mantine/form";
import { m } from "framer-motion";
import logoSmall from "../../images/logo-small.png";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/Buttons";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });
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
            className="flex-gap-column-1"
            onSubmit={form.onSubmit((values) => console.log(values))}
          >
            <div className="flex-small-gap-column">
              <div className="medium-text bolder text-light-grey">Email</div>
              <input
                type="text"
                name="text"
                className="login-input"
                placeholder="Enter your mail here!"
                {...form.getInputProps("email")}
                required
              />
            </div>
            <div className="flex-small-gap-column small-margin-bottom">
              <div className="medium-text bolder text-light-grey">Password</div>
              <input
                type="password"
                name="text"
                className="login-input"
                placeholder="Enter your password here!"
                {...form.getInputProps("password")}
                required
              />
            </div>
            <CustomButton
              label="Log in"
              category="landing"
              type={"submit"}
              size={"lg"}
              radius={"xl"}
              action={() => navigate("/dashboard")}
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
