import React, { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import { Drawer, FileInput, Select } from "@mantine/core";
import CustomButton from "../../../components/Buttons";
import { showNotification } from "@mantine/notifications";
import { redNotify, greenNotify } from "../../../notification";
import { useQuery } from "react-query";
import axios from "axios";
import "./createupdateuploadfile.css";

const CreateUpdateUploadFile = ({
  isModalOpen,
  toggleModal,
  data,
  setData,
  token,
  refetch,
  formValues,
  typeData,
}) => {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      subject: "",
      chapter: "",
      type: "",
      file: null,
    },
  });

  const { data: subjectData = [], isFetching: subjectFetching } = useQuery(
    ["adminManageSubjectTemp1"],
    () =>
      axios.get(`/api/open/subject`, {
        headers: {
          Authorization: token,
        },
      }),
    {
      refetchOnWindowFocus: false,
      select: (data) => {
        const newData = data.data.data.map((item) => ({
          label: item.subjectName,
          value: item.id,
        }));
        return newData;
      },
    }
  );

  const { data: chapterData = [], isFetching } = useQuery(
    ["adminManageSubjectTemp12", form.values.subject],
    () =>
      axios.get(
        `/api/open/chapter?search=&title=&standard&subjectId=${form.values.subject}`,
        {
          headers: {
            Authorization: token,
          },
        }
      ),
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
        user: data.user,
        name: data.name,
        password: data.password,
        isActive: data.isActive,
      });
    }
    // eslint-disable-next-line
  }, [data]);

  const handleSubmit = (values) => {
    var axios = require("axios");
    var updateData = new FormData();
    updateData.append("chapterId", values.chapter);
    updateData.append("type", values.type);
    updateData.append("file", values.file);

    var config = {
      method: data ? "put" : "post",
      url: "/api/uploads",
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

  useEffect(() => {
    if (form.values.subject) {
      form.setValues({
        chapter: "",
      });
    }
    // eslint-disable-next-line
  }, [form.values.subject]);

  return (
    <Drawer
      opened={isModalOpen}
      onClose={handleClose}
      title={
        data ? (
          <div className="bolder large-text">Update Uploads</div>
        ) : (
          <div className="bolder large-text">Upload File</div>
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
            placeholder={
              isFetching
                ? "Loading the data...Please wait!!"
                : "Select the subject"
            }
            data={subjectData}
            searchable
            radius="lg"
            size="lg"
            transitionDuration={150}
            transition="pop-top-left"
            transitionTimingFunction="ease"
            disabled={subjectFetching}
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
            <div>Type</div>
            <div className="text-red">*</div>
          </div>
          <Select
            placeholder={"Select the Type of file"}
            data={typeData}
            searchable
            radius="lg"
            size="lg"
            transitionDuration={150}
            transition="pop-top-left"
            transitionTimingFunction="ease"
            {...form.getInputProps("type")}
          />
        </div>
        <div className="flex-small-gap-column">
          <div className="bold just-flex text-light-grey">
            <div>File to Upload</div>
            <div className="text-red">*</div>
          </div>
          <FileInput
            placeholder="Pick your file"
            {...form.getInputProps("file")}
            size="lg"
            clearable
          />
        </div>
        <div className="button-form-manage-account">
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

export default CreateUpdateUploadFile;
