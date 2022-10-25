import React, { useState } from "react";
import Footer from "../../../components/Footer";
import TopNavigation from "../../../components/TopNavigation";
import { useForm } from "@mantine/form";
import { Input, Modal, PasswordInput } from "@mantine/core";
import CustomButton from "../../../components/Buttons";
import { m } from "framer-motion";
import { container, zoomItem } from "../../../animation";
import signUpStudyImage from "../../../images/studySignUpImage.svg";
import { redNotify } from "../../../notification";
import isEmail from "validator/lib/isEmail";
import congratsImage from "../../../images/congrats_c.gif";
import { showNotification } from "@mantine/notifications";
import "./tuitionSignUp.css";

const TuitionSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [isSuccessModal, toggleSuccessModal] = useState(false);
  // const [isErrorModal, toggleErrorModal] = useState(false);
  const form = useForm({
    initialValues: {
      full_name: "",
      email: "",
      password: "",
    },
    // validate: {
    //   subjects: (value) =>
    //     value.length < 1 ? "Please choose atleast 1 subject!" : null,
    // },
  });

  // useEffect(() => {
  //   form.setValues({
  //     ...form.values,
  //     subjects: [],
  //   });
  //   // eslint-disable-next-line
  // }, [form.values.grades]);

  const handleSubmit = async (values) => {
    const Email = values["email"];
    const Password = values["password"];
    setLoading(true);
    if (!isEmail(Email)) {
      showNotification({
        title: "Sign Up Error",
        message: "Please enter a valid Email!",
        styles: redNotify,
      });
      setLoading(false);
      return;
    } else {
      var axios = require("axios");
      var data = JSON.stringify({
        name: values.full_name,
        email: Email,
        password: Password,
      });

      var config = {
        method: "post",
        url: "/api/student/register",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          setLoading(false);
          toggleSuccessModal(true);
          form.reset();
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
        opened={isSuccessModal}
        onClose={() => toggleSuccessModal(false)}
        centered
        padding={"lg"}
        radius={"lg"}
      >
        <div className="flex-gap-column-1">
          <img src={congratsImage} alt="Congratulations for registering" />
          <div className="large-text bolder">Congratulations!!</div>
          <div className="bold text-grey">
            Thank you for registering yourself with us!
          </div>
          <div className="bold text-green small-text">
            The account has been successfully created. Please headover to your
            mail to see the activation email.
          </div>
        </div>
      </Modal>
      <TopNavigation />
      <div className="tuitionSignUp-wrapper-body">
        <div className="tuitionSignUp-body">
          <div className="tuitionSignUp-image">
            <img src={signUpStudyImage} alt="Sign Up" />
          </div>
          <div className="tuitionSignUp-form-body">
            <div className="red-shade-colour boldest primary-font larger-text">
              Tuition Sign Up
            </div>
            <div className="text-light-grey bold">
              For face-to-face and online tuition contact us on (Phone Number)
            </div>
            <m.form
              onSubmit={form.onSubmit(handleSubmit)}
              className="tuitionSignUp-form"
              variants={container}
              animate={"show"}
              initial={"hidden"}
            >
              <m.div variants={zoomItem}>
                <div className="bold just-flex">
                  <div className="text-grey">Full Name</div>
                  <div className="text-red">*</div>
                </div>
                <div style={{ width: "100%" }}>
                  <Input
                    placeholder="Enter your full name"
                    radius="lg"
                    size="lg"
                    {...form.getInputProps("full_name")}
                    required
                  />
                </div>
              </m.div>
              <m.div variants={zoomItem}>
                <div className="bold just-flex">
                  <div className="text-grey">Email</div>
                  <div className="text-red">*</div>
                </div>
                <Input
                  placeholder="Enter your email"
                  radius="lg"
                  size="lg"
                  {...form.getInputProps("email")}
                  required
                />
              </m.div>
              <m.div variants={zoomItem}>
                <div className="bold just-flex">
                  <div className="text-grey">Password</div>
                  <div className="text-red">*</div>
                </div>
                <PasswordInput
                  placeholder="Enter your password"
                  radius="lg"
                  size="lg"
                  {...form.getInputProps("password")}
                  required
                />
              </m.div>
              {/* <m.div variants={zoomItem}>
              <div className="bold just-flex">
              <div>Grades</div>
              <div className="text-red">*</div>
              </div>
              <Select
              placeholder="Select your country"
              data={[
                { label: "Grades", value: 1 },
                { label: "Subjects", value: 2 },
                { label: "Services", value: 3 },
              ]}
              radius="lg"
              size="lg"
                transitionDuration={150}
                transition="pop-top-left"
                transitionTimingFunction="ease"
                {...form.getInputProps("grades")}
                />
              </m.div> */}
              {/* <m.div style={{ gridColumn: "1/3" }} variants={zoomItem}>
              <div className="bold just-flex">
              <div>Subjects</div>
              <div className="text-red">*</div>
              </div>
              <MultiSelect
              data={[
                { value: "react", label: "React" },
                { value: "ng", label: "Angular" },
                  { value: "svelte", label: "Svelte" },
                  { value: "vue", label: "Vue" },
                  { value: "riot", label: "Riot" },
                  { value: "next", label: "Next.js" },
                  { value: "blitz", label: "Blitz.js" },
                ]}
                placeholder="Please choose your subjects"
                radius="lg"
                size="lg"
                transitionDuration={150}
                transition="pop-top-left"
                transitionTimingFunction="ease"
                {...form.getInputProps("subjects")}
              />
            </m.div> */}
              <div style={{ marginTop: "10px" }}>
                <CustomButton
                  label="Register for free"
                  category="landing"
                  type={"submit"}
                  size={"lg"}
                  radius={"xl"}
                  maxWidth
                  loading={loading}
                  // action={() => navigate("/login")}
                />
              </div>
            </m.form>
          </div>
        </div>
      </div>
      <Footer />
    </m.div>
  );
};

export default TuitionSignUp;
