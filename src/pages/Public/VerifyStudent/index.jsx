import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import logo from "../../../images/logo.png";
import logoSmall from "../../../images/logo-small.png";
import { BsCheckCircleFill, BsInfoCircleFill } from "react-icons/bs";
import { MdOutlineError } from "react-icons/md";
import { Button, Loader } from "@mantine/core";
import { m } from "framer-motion";
import "./verifyStudent.css";
import { redNotify } from "../../../notification";
import { showNotification } from "@mantine/notifications";

const VerifyStudent = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("ld");

  const getStatus = () => {
    setStatus("ld");
    var axios = require("axios");

    var config = {
      method: "get",
      url: `/api/verify/student?email=${searchParams.get(
        "email"
      )}&code=${searchParams.get("code")}`,
    };

    axios(config)
      .then(function (response) {
        if (response.data.message === "Your Account is already Activated!")
          setStatus("ad");
        else setStatus("rd");
      })
      .catch(function (error) {
        showNotification({
          title: "List Error!",
          message: error.response.data.error || "Something went terribly wrong",
          styles: redNotify,
        });
        setStatus("ed");
      });
  };

  useEffect(() => {
    document.title = "Student Verification";
    getStatus();
    // eslint-disable-next-line
  }, []);

  const loaderDom = () => {
    if (status === "ld")
      return <Loader variant="bars" size="xl" color="teal" />;
  };

  const textRender = () => {
    if (status === "ld")
      return (
        <div className="bold large-text red-shade-colour">
          Verifying your account...
        </div>
      );
    if (status === "ad") {
      return (
        <m.div
          className="vst-body--registered"
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          exit={{ opacity: 0 }}
        >
          <img src={logoSmall} alt="Alamnii" className="vst-body-small-image" />
          <div>
            <BsInfoCircleFill className="text-yellow mid-large-text" />
          </div>
          <div className="text-yellow bold">
            Your account has been already verified
          </div>
          <div className="primary-colour">
            As part of our entire team, We are grateful to have you.
          </div>
          <Button radius="xl">Go to Dashboard</Button>
        </m.div>
      );
    }
    if (status === "ed") {
      return (
        <m.div
          className="vst-body--registered"
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          exit={{ opacity: 0 }}
        >
          <img src={logoSmall} alt="Alamnii" className="vst-body-small-image" />
          <div>
            <MdOutlineError className="text-red mid-large-text" />
          </div>
          <div className="text-red bold">
            Oops, Something went wrong with your verification
          </div>
          <div className="primary-colour">
            Please contact our administrator through email
          </div>
          <Button radius="xl">Go to Dashboard</Button>
        </m.div>
      );
    }
    if (status === "rd") {
      return (
        <m.div
          className="vst-body--registered"
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          exit={{ opacity: 0 }}
        >
          <img src={logoSmall} alt="Alamnii" className="vst-body-small-image" />
          <div>
            <BsCheckCircleFill className="text-green mid-large-text" />
          </div>
          <div className="text-green bold">
            Your account has been successfully verified
          </div>
          <div className="primary-colour">
            Welcome to <span className="red-shade-colour">Alamnii!!</span>. As
            part of our entire team, We are grateful to have you.
          </div>
          <Button radius="xl">Go to Dashboard</Button>
        </m.div>
      );
    }
  };

  return (
    <m.div
      className="vst-body"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
      <m.div
        className="vst-wrapper"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0 }}
      >
        {status === "ld" && (
          <img src={logo} alt="Alamnii" className="vst-body-image" />
        )}
        <div className="vst-loader-wrapper">{loaderDom()}</div>
        <div className="vst-text-wrapper">{textRender()}</div>
      </m.div>
    </m.div>
  );
};

export default VerifyStudent;

// Cases - Already Registered | Registered | Verifying your account
