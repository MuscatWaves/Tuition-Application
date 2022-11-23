import React, { useState } from "react";
import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";
import { m } from "framer-motion";
// import { container, item } from "./constants";
import { FaUserCircle, FaShopify, FaBook } from "react-icons/fa";
import { ImFilesEmpty } from "react-icons/im";
import { FiMail } from "react-icons/fi";
import { removeUnderScore } from "../../../utilities";
import { useQuery } from "react-query";
import Cookies from "universal-cookie";
import axios from "axios";
import moment from "moment";
import CustomButton from "../../../components/Buttons";
import { BsFillCartCheckFill } from "react-icons/bs";
import { Input, Modal, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import "./dashboard.css";
import { greenNotify, redNotify } from "../../../notification";
import { showNotification } from "@mantine/notifications";
import Spinner from "../../../components/Spinner";
import { container, item, zoomItem } from "../../../animation";
import { useEffect } from "react";
import { DatePicker } from "@mantine/dates";
import StudentUpdateEdu from "../StudentEducationUpdate/StudentUpdateEdu";

const Dashboard = () => {
  // const [isLoggedIn, setLoggedIn] = useState({});
  const [isViewAllEduModal, setViewAllEduModal] = useState(false);
  const [isUpdateModal, setUpdateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEduUpdate, setEduUpdate] = useState(false);
  const [isEduUpdateData, setEduUpdateData] = useState(false);
  const cookies = new Cookies();
  const token = cookies.get("token");
  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(path);
  };
  const form = useForm({
    initialValues: {
      gender: "",
      dob: "",
      country: "",
    },
  });

  useEffect(() => {
    document.title = "Student - Dashboard";
  }, []);

  const {
    data: basicDetApi = [],
    // isFetching: basicDetFetching,
    refetch: basicDetRefetch,
  } = useQuery(
    ["basicDetailsFetch"],
    () =>
      axios.get(`/api/studentprofile/basic`, {
        headers: {
          Authorization: token,
        },
      }),
    { refetchOnWindowFocus: false, select: (data) => data.data.data }
  );

  const {
    data: eduDetApi = [],
    // isFetching,
    refetch,
  } = useQuery(
    ["educationDetailsFetch"],
    () =>
      axios.get(`/api/studentprofile/education`, {
        headers: {
          Authorization: token,
        },
      }),
    { refetchOnWindowFocus: false, select: (data) => data.data.data }
  );

  const { data: subDetApi = [], isFetching: subDetFetch } = useQuery(
    ["subjectDetailsFetch"],
    () =>
      axios.get(`/api/student/subject/subscription`, {
        headers: {
          Authorization: token,
        },
      }),
    { refetchOnWindowFocus: false, select: (data) => data.data.data }
  );

  const basicDetails = {
    gender: basicDetApi[0]?.Gender || "Not Provided",
    name: basicDetApi[0]?.name || "Not Provided",
    createdAt:
      moment(basicDetApi[0]?.createdAt).format("DD MMM, YYYY") ||
      "Not Provided",
    date_of_birth:
      moment(basicDetApi[0]?.dob).format("DD MMM, YYYY") || "Not Provided",
    location: basicDetApi[0]?.country || "Not Provided",
  };

  const educationDetail = {
    standard: eduDetApi[0]?.course || "Not Provided",
    school: eduDetApi[0]?.university || "Not Provided",
    location: eduDetApi[0]?.location || "Not Provided",
    passingYear: eduDetApi[0]?.passingYear || "Not Provided",
  };

  const handleClose = () => {
    form.reset();
    setUpdateModal(false);
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    if (!moment(values.dob).isValid()) {
      showNotification({
        title: "Update Error!",
        message: "Please enter a valid DOB!",
        styles: redNotify,
      });
      setLoading(false);
      return;
    } else {
      var axios = require("axios");
      var data = JSON.stringify({
        Gender: values.gender,
        country: values.country,
        dob: moment(values.dob).format("YYYY-MM-DD"),
      });

      var config = {
        method: basicDetApi.length !== 0 ? "put" : "post",
        url: "/api/studentprofile/basic",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          setLoading(false);
          setUpdateModal(false);
          form.reset();
          basicDetRefetch();
          showNotification({
            title: "Success!",
            message: "Updated Successfully",
            styles: greenNotify,
          });
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
      className="tuition-dashboard-page"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
      <StudentUpdateEdu
        isModalOpen={isEduUpdate}
        toggleModal={setEduUpdate}
        data={isEduUpdateData}
        setData={setEduUpdateData}
        token={token}
        refetch={refetch}
      />
      <Modal
        title={<div className="bolder large-text">Update Basic Details</div>}
        opened={isUpdateModal}
        onClose={handleClose}
        centered
      >
        <form
          onSubmit={form.onSubmit(handleSubmit)}
          className="flex-gap-column-1"
        >
          <div className="flex-small-gap-column">
            <div className="bold just-flex text-grey">
              <div>Gender</div>
            </div>
            <Select
              placeholder="Select your gender"
              data={[
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
              ]}
              radius="lg"
              size="lg"
              transitionDuration={150}
              transition="pop-top-left"
              transitionTimingFunction="ease"
              {...form.getInputProps("gender")}
            />
          </div>
          <div className="flex-small-gap-column">
            <div className="bold just-flex text-grey">
              <div>DOB</div>
            </div>
            <DatePicker
              placeholder={
                moment(basicDetApi[0]?.dob)
                  ? moment(basicDetApi[0]?.dob).format("DD MMMM, YYYY")
                  : "Please pick a date"
              }
              withAsterisk
              {...form.getInputProps("dob")}
            />
          </div>
          <div className="flex-small-gap-column">
            <div className="bold just-flex text-grey">
              <div>Location</div>
            </div>
            <Input
              placeholder="Enter the name of your location"
              radius="lg"
              size="lg"
              {...form.getInputProps("country")}
            />
          </div>
          <div className="flex-center">
            <CustomButton
              label={"Cancel"}
              size={"md"}
              radius={"xl"}
              variant={"subtle"}
              action={handleClose}
              color={"gray"}
            />
            <CustomButton
              label={"Update"}
              category="landing"
              type={"submit"}
              size={"md"}
              radius={"xl"}
              loading={loading}
            />
          </div>
        </form>
      </Modal>
      <Modal
        title={<div className="bolder large-text">Your Education</div>}
        opened={isViewAllEduModal}
        onClose={() => setViewAllEduModal(false)}
        size="auto"
        radius={"xl"}
        centered
      >
        {(
          <div className="flex-gap-column-1">
            {eduDetApi.length !== 0 &&
              eduDetApi?.map((education) => (
                <div className="education-modal-vall" key={education.id}>
                  <div>
                    <div className="small-text bold red-shade-colour">
                      Course
                    </div>
                    <div className="bold">{education.course}</div>
                  </div>
                  <div>
                    <div className="small-text bold red-shade-colour">
                      Specialization
                    </div>
                    <div className="bold">{education.specialization}</div>
                  </div>
                  <div>
                    <div className="small-text bold red-shade-colour">
                      University
                    </div>
                    <div className="bold">{education.university}</div>
                  </div>
                  <div>
                    <div className="small-text bold red-shade-colour">
                      Location
                    </div>
                    <div className="bold">{education.location}</div>
                  </div>
                  <div>
                    <div className="small-text bold red-shade-colour">
                      Passing Year
                    </div>
                    <div className="bold">{education.passingYear}</div>
                  </div>
                </div>
              ))}
            <CustomButton
              label={"Update education"}
              radius="xl"
              action={() => navigateTo("/student/eduUpdate")}
            />
          </div>
        ) || (
          <div className="bold large-text red-shade-colour flex-small-gap">
            No Educations Added{"   "}
            <span>
              <CustomButton
                label={"Add education"}
                radius="xl"
                action={() => navigateTo("/student/eduUpdate")}
              />
            </span>
          </div>
        )}
      </Modal>
      <Header
        CustomComponent={
          basicDetApi[0]?.cartCount > 0 && (
            <m.div
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              exit={{ opacity: 0 }}
            >
              <CustomButton
                label={
                  <div>{`${basicDetApi[0]?.cartCount} item('s) in cart`}</div>
                }
                radius={"xl"}
                color="orange"
                leftIcon={<BsFillCartCheckFill style={{ fontSize: "18px" }} />}
                action={() => navigateTo("/shop/cart")}
              />
            </m.div>
          )
        }
      />
      <m.div
        className="mtd-wrapper"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <m.div className="mtd-info-box" variants={item}>
          <div className="tuition-wt">
            <div className="larger-text bold text-white-light">Welcome</div>
            <FaUserCircle
              style={{
                width: "150px",
                height: "150px",
                color: "var(--red-shade-color)",
                backgroundColor: "#fff",
                borderRadius: "50%",
              }}
            />
            <div className="tuition-wt-inner">
              <div>
                <div className="small-text bold red-shade-colour">Name</div>
                <div className="bold">{basicDetails.name}</div>
              </div>
              <div>
                <div className="small-text bold red-shade-colour">Email</div>
                <div className="flex-small-gap flex-center">
                  <FiMail
                    style={{
                      width: "20px",
                      height: "20px",
                      color: "var(--red-shade-color)",
                    }}
                  />
                  <div className="bold">{basicDetApi[0]?.email}</div>
                </div>
              </div>
              <div>
                <div className="bold primary-colour">
                  Hope you have a wonderful day!
                </div>
              </div>
            </div>
          </div>
          <div className="bolder text-white-light">
            &copy; Powered by Tuitions
          </div>
        </m.div>
        <div className="mtd-main-box">
          <div className="mtd-main-box__inner">
            <m.div className="mtd-main-box__b-1" variants={zoomItem}>
              <div className="flex-between small-margin-bottom">
                <div className="red-shade-colour large-text bold">
                  Basic Details
                </div>
                <CustomButton
                  label={"Update"}
                  radius="xl"
                  action={() => {
                    setUpdateModal(true);
                    form.setValues({
                      gender: basicDetApi[0]?.Gender || "",
                      dob:
                        moment(basicDetApi[0]?.dob).format("YYYY/MM/DD") || "",
                      country: basicDetApi[0]?.country || "",
                    });
                  }}
                />
              </div>
              <div className="mtd-main-box__b-1__grid-2">
                {Object.keys(basicDetails).map((detail) => (
                  <div key={detail}>
                    <div className="small-text bold red-shade-colour">
                      {removeUnderScore(detail)}
                    </div>
                    <div className="bold">{basicDetails[detail]}</div>
                  </div>
                ))}
              </div>
            </m.div>
            <m.div className="mtd-main-box__b-2" variants={zoomItem}>
              <div className="flex-between small-margin-bottom">
                <div className="red-shade-colour large-text bold">
                  Education Details
                </div>
                <div className="flex-small-gap">
                  {/* <CustomButton
                    label={"View All"}
                    radius="xl"
                    color="teal"
                    action={() => setViewAllEduModal(true)}
                  /> */}
                  <CustomButton
                    label={"Update"}
                    radius="xl"
                    action={() => {
                      if (eduDetApi.length === 0) {
                        setEduUpdateData(null);
                        setEduUpdate(true);
                      } else {
                        setEduUpdateData(eduDetApi[0]);
                        setEduUpdate(true);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="mtd-main-box__b-1__grid-3">
                {Object.keys(educationDetail).map((detail) => (
                  <div key={detail}>
                    <div className="small-text bold red-shade-colour">
                      {removeUnderScore(detail)}
                    </div>
                    <div className="bold">{educationDetail[detail]}</div>
                  </div>
                ))}
              </div>
            </m.div>
            <div
              className="mtd-main-box__b-3"
              onClick={() => navigateTo("/shop")}
            >
              <FaShopify className="mtd-main-box__shopping-icon" />
              <div className="bold large-text">Shop</div>
            </div>
          </div>
          <div className="mtd-subject-container">
            {subDetFetch ? (
              <div className="dash-spin">
                <Spinner />
              </div>
            ) : (
              <>
                <div className="red-shade-colour large-text bold small-margin-bottom">
                  My Subjects
                </div>
                {subDetApi.length === 0 ? (
                  <div className="mtd__no-subjects-subscribed">
                    <ImFilesEmpty className="mtd-main-box__shopping-icon primary-colour" />
                    <div className="bold large-text">
                      No Subjects Subscribed
                    </div>
                    <div className="red-shade-colour bold">
                      Please head over to Shop to purchase subjects!
                    </div>
                  </div>
                ) : (
                  <m.div
                    className="mtd-subjects__list-container"
                    variants={container}
                  >
                    {subDetApi.map(
                      (subject) =>
                        subject.subscriptionStatus && (
                          <m.div
                            className="mtd-subjects__list-container__each pointer"
                            key={subject.id}
                            variants={item}
                            onClick={() => {
                              navigateTo(
                                `/dashboard/${subject.title.replaceAll(
                                  " ",
                                  "_"
                                )}`
                              );
                            }}
                          >
                            <FaBook style={{ fontSize: "3em" }} />
                            <div>{subject.title}</div>
                          </m.div>
                        )
                    )}
                  </m.div>
                )}
              </>
            )}
          </div>
        </div>
      </m.div>
    </m.div>
  );
};

export default Dashboard;
