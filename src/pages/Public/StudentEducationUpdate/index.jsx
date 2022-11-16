import React, { useState, useEffect } from "react";
import { m } from "framer-motion";
import BreadCrumb from "../../../components/BreadCrumb";
import Header from "../../../components/Header";
import { Modal } from "@mantine/core";
import Cookies from "universal-cookie";
import CustomButton from "../../../components/Buttons";
import { greenNotify, redNotify } from "../../../notification";
import { showNotification } from "@mantine/notifications";
import { SiGoogleclassroom } from "react-icons/si";
import { container, item } from "../Dashboard/constants";
import Spinner from "../../../components/Spinner";
import { useQuery } from "react-query";
import axios from "axios";
import StudentUpdateEdu from "./StudentUpdateEdu";
import { BiPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import "../Shop/shop.css";
import "../Dashboard/dashboard.css";

function StudentEducationUpdate() {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const navigateTo = useNavigate();
  const [isDeleteData, setDeleteData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const navigation = [
    { id: 0, name: "Dashboard", url: "/dashboard" },
    {
      id: 23,
      name: "Education Update",
      active: true,
    },
  ];

  //   Edit Functions

  const [isEditModal, toggleEditModal] = useState(false);
  const [isEditData, setEditData] = useState(null);

  useEffect(() => {
    document.title = "Tuition - Education Update";
    // eslint-disable-next-line
  }, []);

  const { data, refetch, isFetching } = useQuery(
    ["educationDetailsFetch"],
    () =>
      axios.get(`/api/studentprofile/education`, {
        headers: {
          Authorization: token,
        },
      }),
    { refetchOnWindowFocus: false, select: (data) => data.data.data }
  );

  const removeEducation = () => {
    setLoading(true);
    var axios = require("axios");
    var data = JSON.stringify({
      id: Number(isDeleteData.id),
    });

    var config = {
      method: "delete",
      url: "/api/studentprofile/education",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        showNotification({
          title: "Success",
          styles: greenNotify,
        });
        refetch();
        handleClose();
        setLoading(false);
      })
      .catch(function (error) {
        showNotification({
          title: "Error!",
          styles: redNotify,
        });
        setLoading(false);
      });
  };

  const handleClose = () => {
    setDeleteData(null);
    setDeleteModal(false);
  };

  return (
    <m.div
      className="shp"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
      <StudentUpdateEdu
        isModalOpen={isEditModal}
        toggleModal={toggleEditModal}
        data={isEditData}
        setData={setEditData}
        token={token}
        refetch={refetch}
      />
      <Modal
        title={<div className="bolder large-text">Delete Education Data</div>}
        opened={deleteModal}
        onClose={handleClose}
        centered
      >
        <div>You are going to remove the education?</div>
        <div style={{ padding: "1rem 0" }} className="flex-small-gap">
          <CustomButton action={handleClose} label={"Cancel"} color={"gray"} />
          <CustomButton
            action={() => {
              removeEducation();
            }}
            loading={loading}
            color={"red"}
            label={"Proceed"}
          />
        </div>
      </Modal>
      <Header />
      <div className="shp-wrapper">
        <BreadCrumb items={navigation} />
        <div className="flex-center align-center medium-gap">
          <SiGoogleclassroom
            style={{ fontSize: "4em", color: "var(--red-shade-color)" }}
          />
          <div className="large-text primary-colour bolder">
            Education Update
          </div>
        </div>
        {isFetching ? (
          <div className="shp-loader">
            <Spinner />
          </div>
        ) : (
          <>
            <m.div
              className="shp-list-main"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {data.map((education) => (
                <m.div
                  className="education-normal"
                  key={education.id}
                  variants={item}
                >
                  <div className="flex-small-gap-column">
                    <div className="small-text bold red-shade-colour">
                      Course
                    </div>
                    <div className="bold">
                      {education.course || "Not Provided"}
                    </div>
                  </div>
                  <div className="flex-small-gap-column">
                    <div className="small-text bold red-shade-colour">
                      Specialization
                    </div>
                    <div className="bold">
                      {education.specialization || "Not Provided"}
                    </div>
                  </div>
                  <div className="flex-small-gap-column">
                    <div className="small-text bold red-shade-colour">
                      University
                    </div>
                    <div className="bold">
                      {education.university || "Not Provided"}
                    </div>
                  </div>
                  <div className="flex-small-gap-column">
                    <div className="small-text bold red-shade-colour">
                      Location
                    </div>
                    <div className="bold">
                      {education.location || "Not Provided"}
                    </div>
                  </div>
                  <div className="flex-small-gap-column">
                    <div className="small-text bold red-shade-colour">
                      Passing Year
                    </div>
                    <div className="bold">
                      {education.passingYear || "Not Provided"}
                    </div>
                  </div>
                  <div className="flex-small-gap">
                    <CustomButton
                      label={"Edit"}
                      action={() => {
                        setEditData(education);
                        toggleEditModal(true);
                      }}
                    />
                    <CustomButton
                      label={"Delete"}
                      color="red"
                      action={() => {
                        setDeleteData(education);
                        setDeleteModal(true);
                      }}
                    />
                  </div>
                </m.div>
              ))}
            </m.div>
            <m.div
              className="shp-list-main__total-amount"
              animate={{ opacity: 1, y: "0" }}
              initial={{ opacity: 0, y: "20px" }}
              transition={{ duration: "0.8" }}
            >
              <div className="bold primary-colour">{`${data.length} education('s) are present`}</div>
              <div className="flex-small-gap">
                <CustomButton
                  label="Add more education"
                  radius={"xl"}
                  leftIcon={<BiPlus style={{ fontSize: "22px" }} />}
                  action={() => {
                    setEditData(null);
                    toggleEditModal(true);
                  }}
                />
                <CustomButton
                  label="Go Back to Dashboard"
                  color="teal"
                  radius={"xl"}
                  action={() => {
                    navigateTo("/dashboard");
                  }}
                />
              </div>
            </m.div>
          </>
        )}
      </div>
    </m.div>
  );
}

export default StudentEducationUpdate;
