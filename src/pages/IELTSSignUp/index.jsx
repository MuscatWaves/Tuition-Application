import React, { useEffect } from "react";
import Footer from "../../components/Footer";
import TopNavigation from "../../components/TopNavigation";
import { useForm } from "@mantine/form";
import { Select } from "@mantine/core";
import CustomButton from "../../components/Buttons";
import { m } from "framer-motion";
import { container, zoomItem } from "../../animation";
import "./tuitionSignUp.css";

const IELTSSignUp = () => {
  const form = useForm({
    initialValues: {
      first_name: "",
      last_name: "",
      country: "",
      email: "",
      password: "",
      grades: "",
      subjects: [],
    },
    validate: {
      subjects: (value) =>
        value.length < 1 ? "Please choose atleast 1 subject!" : null,
    },
  });

  useEffect(() => {
    form.setValues({
      ...form.values,
      subjects: [],
    });
    // eslint-disable-next-line
  }, [form.values.grades]);

  return (
    <m.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
      <TopNavigation />
      <div className="tuitionSignUp-wrapper-body">
        <div className="tuitionSignUp-body">
          <div className="red-shade-colour boldest primary-font larger-text">
            IELTS Sign Up
          </div>
          <div className="text-light-grey bold">
            For face-to-face and online tuition contact us on (Phone Number)
          </div>
          <m.form
            onSubmit={form.onSubmit((values) => console.log(values))}
            className="tuitionSignUp-form"
            variants={container}
            animate={"show"}
            initial={"hidden"}
          >
            <m.div variants={zoomItem}>
              <div className="bold just-flex">
                <div>First Name</div>
                <div className="text-red">*</div>
              </div>
              <div style={{ width: "100%" }}>
                <input
                  type="text"
                  className="login-input"
                  placeholder="Enter your first name"
                  {...form.getInputProps("first_name")}
                  required
                />
              </div>
            </m.div>
            <m.div variants={zoomItem}>
              <div className="bold just-flex">
                <div>Last Name</div>
                <div className="text-red">*</div>
              </div>
              <input
                type="text"
                className="login-input"
                placeholder="Enter your last name"
                {...form.getInputProps("last_name")}
                required
              />
            </m.div>
            <m.div variants={zoomItem}>
              <div className="bold just-flex">
                <div>Country</div>
                <div className="text-red">*</div>
              </div>
              <Select
                placeholder="Select your country"
                data={[
                  { label: "Grades", value: 1 },
                  { label: "Subjects", value: 2 },
                  { label: "Services", value: 3 },
                ]}
                radius="xl"
                size="lg"
                transitionDuration={150}
                transition="pop-top-left"
                transitionTimingFunction="ease"
                {...form.getInputProps("country")}
              />
            </m.div>
            <m.div variants={zoomItem}>
              <div className="bold just-flex">
                <div>Email</div>
                <div className="text-red">*</div>
              </div>
              <input
                type="text"
                className="login-input"
                placeholder="Enter your email"
                required
                {...form.getInputProps("email")}
              />
            </m.div>
            <m.div variants={zoomItem}>
              <div className="bold just-flex">
                <div>Password</div>
                <div className="text-red">*</div>
              </div>
              <input
                type="text"
                className="login-input"
                placeholder="Enter your password"
                {...form.getInputProps("password")}
                required
              />
            </m.div>
            <m.div style={{ gridColumn: `1/3` }}>
              <div className="large-text primary-font boldest secondary-colour amounts-section">
                <div>Total Amount to be paid is</div>
                <div className="text-green bolder small-card larger-text">
                  $5
                </div>
              </div>
            </m.div>
            <div style={{ gridColumn: `1/3` }}>
              <CustomButton
                label="Proceed to Checkout"
                category="landing"
                type={"submit"}
                size={"lg"}
                radius={"xl"}
                maxWidth
                // action={() => navigate("/login")}
              />
            </div>
          </m.form>
        </div>
      </div>
      <Footer />
    </m.div>
  );
};

export default IELTSSignUp;
