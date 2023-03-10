import React, { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import { Drawer, Input } from "@mantine/core";
import CustomButton from "../../../components/Buttons";
import { showNotification } from "@mantine/notifications";
import { redNotify, greenNotify } from "../../../notification";
import "./createupdatesubject.css";

const CreateUpdateSubject = ({
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
      subjectName: "",
    },
  });

  useEffect(() => {
    if (data) {
      form.setValues({
        subjectName: data.subjectName,
      });
    }
    // eslint-disable-next-line
  }, [data]);

  const handleSubmit = (values) => {
    var axios = require("axios");
    var updateData = data
      ? JSON.stringify({
          id: data.id,
          subjectName: values.subjectName,
        })
      : JSON.stringify({
          subjectName: values.subjectName,
        });

    var config = {
      method: data ? "put" : "post",
      url: "/api/subject",
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
          <div className="bolder large-text">Update Subject</div>
        ) : (
          <div className="bolder large-text">Create Subject</div>
        )
      }
      padding="xl"
      size="xl"
      position="right"
    >
      <form
        className="form-manage-access-subject"
        onSubmit={form.onSubmit(handleSubmit)}
      >
        <div className="flex-small-gap-column">
          <div className="bold just-flex text-light-grey">
            <div>Title</div>
            <div className="text-red">*</div>
          </div>
          <Input
            placeholder="Please enter the title of subject"
            radius="lg"
            size="lg"
            {...form.getInputProps("subjectName")}
            data-autofocus
            required
          />
        </div>
        <div className="button-form-manage-subject">
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

export default CreateUpdateSubject;
