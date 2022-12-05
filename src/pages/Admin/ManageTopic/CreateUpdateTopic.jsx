import React, { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import { Drawer, Select, Input } from "@mantine/core";
import CustomButton from "../../../components/Buttons";
import { showNotification } from "@mantine/notifications";
import { useQuery } from "react-query";
import axios from "axios";
import { redNotify, greenNotify } from "../../../notification";
import "./createupdatetopic.css";

const CreateUpdateTopic = ({
  isModalOpen,
  toggleModal,
  data,
  setData,
  token,
  subjectData = [],
  refetch,
}) => {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      subject: "",
      chapter: "",
      title: "",
      description: "",
    },
  });

  const { data: chapterData = [], isFetching } = useQuery(
    ["adminManageSubjectTemp12", form.values.subject],
    () =>
      axios.get(`/api/open/chapter`, {
        headers: {
          Authorization: token,
        },
      }),
    {
      refetchOnWindowFocus: false,
      select: (data) => {
        const newData = data.data.data.map((item) => ({
          label: item.title,
          value: item.id,
        }));
        return newData;
      },
    }
  );

  useEffect(() => {
    if (data) {
      form.setValues({
        chapter: data.subjectId,
        title: data.title,
        description: data.description,
      });
    }
    // eslint-disable-next-line
  }, [data]);

  useEffect(() => {
    if (form.values.subject) {
      form.setValues({
        chapter: "",
      });
    }
    // eslint-disable-next-line
  }, [form.values.subject]);

  const handleSubmit = (values) => {
    var axios = require("axios");
    var updateData = data
      ? JSON.stringify({
          id: data.id,
          subjectId: values.chapter,
          title: values.title,
          description: values.description,
        })
      : JSON.stringify({
          subjectId: values.chapter,
          title: values.title,
          description: values.description,
        });

    var config = {
      method: data ? "put" : "post",
      url: "/api/topic",
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
          <div className="bolder large-text">Update Topic</div>
        ) : (
          <div className="bolder large-text">Create Topic</div>
        )
      }
      padding="xl"
      size="xl"
      position="right"
    >
      <form
        className="form-manage-access-topic"
        onSubmit={form.onSubmit(handleSubmit)}
      >
        <div className="flex-small-gap-column">
          <div className="bold just-flex text-light-grey">
            <div>Subject</div>
            <div className="text-red">*</div>
          </div>
          <Select
            placeholder="Select the subject"
            data={subjectData}
            searchable
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
            <div>Chapter</div>
            <div className="text-red">*</div>
          </div>
          <Select
            placeholder={
              isFetching
                ? "Loading the data...Please wait!!"
                : "Select the chapter"
            }
            data={chapterData}
            searchable
            radius="lg"
            size="lg"
            transitionDuration={150}
            transition="pop-top-left"
            transitionTimingFunction="ease"
            disabled={isFetching}
            {...form.getInputProps("chapter")}
          />
        </div>
        <div className="flex-small-gap-column">
          <div className="bold just-flex text-light-grey">
            <div>Title</div>
            <div className="text-red">*</div>
          </div>
          <Input
            placeholder="Please enter the title of subject"
            radius="lg"
            size="lg"
            {...form.getInputProps("title")}
            required
          />
        </div>
        <div className="flex-small-gap-column" style={{ gridColumn: "1/3" }}>
          <div className="bolder text-light-grey">Small Description</div>
          <Input
            placeholder="Please enter the description of subject"
            radius="lg"
            size="lg"
            {...form.getInputProps("description")}
          />
        </div>
        <div className="button-form-manage-topic">
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

export default CreateUpdateTopic;
