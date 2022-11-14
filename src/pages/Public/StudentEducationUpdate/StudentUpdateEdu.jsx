import React, { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import { Drawer, Input } from "@mantine/core";
import CustomButton from "../../../components/Buttons";
import { showNotification } from "@mantine/notifications";
import { redNotify, greenNotify } from "../../../notification";
import "../../Admin/ManageAccess/manageacess.css";

const StudentUpdateEdu = ({
  isModalOpen,
  toggleModal,
  data,
  setData,
  token,
  refetch,
}) => {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      course: "",
      specialization: "",
      university: "",
      location: "",
      passingYear: "",
    },
  });

  useEffect(() => {
    if (data) {
      form.setValues({
        course: data.course,
        specialization: data.specialization,
        university: data.university,
        location: data.location,
        passingYear: data.passingYear,
      });
    }
    // eslint-disable-next-line
  }, [data]);

  const handleSubmit = (values) => {
    var axios = require("axios");
    var updateData = data
      ? JSON.stringify({
          id: data.id,
          course: values.course,
          specialization: values.specialization,
          university: values.university,
          location: values.location,
          passingYear: values.passingYear,
        })
      : JSON.stringify({
          course: values.course,
          specialization: values.specialization,
          university: values.university,
          location: values.location,
          passingYear: values.passingYear,
        });

    var config = {
      method: data ? "put" : "post",
      url: "/api/studentprofile/education",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      data: updateData,
    };
    setLoading(true);
    axios(config)
      .then(function (response) {
        showNotification({
          title: data ? "Updated Successfully" : "Created Sucessfully!",
          styles: greenNotify,
        });
        setLoading(false);
        refetch();
        handleClose();
      })
      .catch(function (error) {
        showNotification({
          title: "Error!",
          message: error.response.data.error,
          styles: redNotify,
        });
        setLoading(false);
      });
  };

  const handleClose = () => {
    setData(false);
    toggleModal(false);
    form.reset();
  };

  return (
    <Drawer
      opened={isModalOpen}
      onClose={handleClose}
      title={
        data ? (
          <div className="bolder large-text">Update Student Education Data</div>
        ) : (
          <div className="bolder large-text">Create Student Education Data</div>
        )
      }
      padding="xl"
      size="xl"
      position="right"
    >
      <form
        className="form-manage-access-admin"
        onSubmit={form.onSubmit(handleSubmit)}
      >
        <div className="flex-small-gap-column" style={{ gridColumn: "1/3" }}>
          <div className="bold just-flex text-grey">
            <div>Course</div>
          </div>
          <Input
            placeholder="Enter the name of the course"
            radius="lg"
            size="lg"
            {...form.getInputProps("course")}
          />
        </div>
        <div className="flex-small-gap-column" style={{ gridColumn: "1/3" }}>
          <div className="bold just-flex text-grey">
            <div>Specialization</div>
          </div>
          <Input
            placeholder="Enter the name of the specialization"
            radius="lg"
            size="lg"
            {...form.getInputProps("specialization")}
          />
        </div>
        <div className="flex-small-gap-column" style={{ gridColumn: "1/3" }}>
          <div className="bold just-flex text-grey">
            <div>University</div>
          </div>
          <Input
            placeholder="Enter the name of the university"
            radius="lg"
            size="lg"
            {...form.getInputProps("university")}
          />
        </div>
        <div className="flex-small-gap-column" style={{ gridColumn: "1/3" }}>
          <div className="bold just-flex text-grey">
            <div>Location</div>
          </div>
          <Input
            placeholder="Enter the location of education institution"
            radius="lg"
            size="lg"
            {...form.getInputProps("location")}
          />
        </div>
        <div className="flex-small-gap-column" style={{ gridColumn: "1/3" }}>
          <div className="bold just-flex text-grey">
            <div>Passing Year</div>
          </div>
          <Input
            placeholder="Enter passing year for the course"
            radius="lg"
            size="lg"
            {...form.getInputProps("passingYear")}
          />
        </div>
        <div className="button-form-manage-access">
          <CustomButton
            label={"Cancel"}
            size={"md"}
            radius={"xl"}
            variant={"subtle"}
            action={handleClose}
            color={"gray"}
          />
          <CustomButton
            label={data ? "Update" : "Create"}
            category="landing"
            type={"submit"}
            size={"md"}
            radius={"xl"}
            loading={loading}
          />
        </div>
      </form>
    </Drawer>
  );
};

export default StudentUpdateEdu;
