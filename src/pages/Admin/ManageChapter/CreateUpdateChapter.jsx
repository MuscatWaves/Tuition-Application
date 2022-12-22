import React, { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import { Drawer, Select, Input } from "@mantine/core";
import CustomButton from "../../../components/Buttons";
import { showNotification } from "@mantine/notifications";
import { redNotify, greenNotify } from "../../../notification";
import "./createupdatechapter.css";

const CreateUpdateChapter = ({
  isModalOpen,
  toggleModal,
  data,
  setData,
  token,
  subjectData,
  refetch,
}) => {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      subject: "",
      title: "",
      standard: "",
      price: "",
      description: "",
    },
  });

  useEffect(() => {
    if (data) {
      form.setValues({
        subject: data.subjectId,
        title: data.title,
        description: data.description,
        standard: data.standard,
        price: data.price,
      });
    }
    // eslint-disable-next-line
  }, [data]);

  const handleSubmit = (values) => {
    var axios = require("axios");
    var updateData = data
      ? JSON.stringify({
          id: data.id,
          subjectId: values.subject,
          title: values.title,
          description: values.description,
          standard: values.standard,
          price: values.price,
        })
      : JSON.stringify({
          subjectId: values.subject,
          title: values.title,
          description: values.description,
          standard: values.standard,
          price: values.price,
        });

    var config = {
      method: data ? "put" : "post",
      url: "/api/chapter",
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
          <div className="bolder large-text">Update Chapter</div>
        ) : (
          <div className="bolder large-text">Create Chapter</div>
        )
      }
      padding="xl"
      size="xl"
      position="right"
    >
      <form
        className="form-manage-access-chapter"
        onSubmit={form.onSubmit(handleSubmit)}
      >
        <div className="flex-small-gap-column">
          <div className="bold just-flex text-light-grey">
            <div>Subject</div>
            <div className="text-red">*</div>
          </div>
          <Select
            placeholder="Select your subject"
            data={subjectData}
            radius="lg"
            size="lg"
            transitionDuration={150}
            transition="pop-top-left"
            transitionTimingFunction="ease"
            {...form.getInputProps("subject")}
          />
        </div>
        <div className="flex-small-gap-column">
          <div className="bold just-flex text-light-grey">
            <div>Title</div>
            <div className="text-red">*</div>
          </div>
          <Input
            placeholder="Please enter the title of chapter"
            radius="lg"
            size="lg"
            {...form.getInputProps("title")}
            required
          />
        </div>
        <div className="flex-small-gap-column">
          <div className="bold just-flex text-light-grey">
            <div>Standard</div>
            <div className="text-red">*</div>
          </div>
          <Input
            placeholder="Please enter the standard for the chapter"
            radius="lg"
            size="lg"
            {...form.getInputProps("standard")}
            data-autofocus
            required
          />
        </div>
        <div className="flex-small-gap-column">
          <div className="bold just-flex text-light-grey">
            <div>Price</div>
            <div className="text-red">*</div>
          </div>
          <Input
            placeholder="Please enter the price of chapter"
            radius="lg"
            size="lg"
            {...form.getInputProps("price")}
            data-autofocus
            required
          />
        </div>
        <div className="flex-small-gap-column" style={{ gridColumn: "1/3" }}>
          <div className="bolder text-light-grey">Small Description</div>
          <Input
            placeholder="Please enter the description of chapter"
            radius="lg"
            size="lg"
            {...form.getInputProps("description")}
          />
        </div>
        <div className="button-form-manage-chapter">
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

export default CreateUpdateChapter;
