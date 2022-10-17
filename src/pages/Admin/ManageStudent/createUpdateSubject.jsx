import React, { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import {
  Checkbox,
  Drawer,
  Input,
  PasswordInput,
  Select,
  Switch,
} from "@mantine/core";
import CustomButton from "../../../components/Buttons";
import { showNotification } from "@mantine/notifications";
import { redNotify, greenNotify } from "../../../notification";
import { useQuery } from "react-query";
import axios from "axios";
import "./createupdatestudent.css";

const CreateUpdateSubject = ({
  isModalOpen,
  toggleModal,
  data,
  setData,
  token,
  refetch,
  userSubjectList,
  studentId,
}) => {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      subject: null,
      access: false,
    },
  });

  const { data: filteredSubject = [], isFetching } = useQuery(
    ["adminManageEachSubjectFilter"],
    () =>
      axios.get(`/api/subject`, {
        headers: {
          Authorization: token,
        },
      }),
    {
      refetchOnWindowFocus: false,
      select: (data) => {
        const filteredData = data.data.data.filter((object1) => {
          return !userSubjectList.some((object2) => {
            return object1.id === object2.subjectId;
          });
        });
        const newData = filteredData.map((subject) => ({
          label: subject.title,
          value: subject.id,
        }));
        return newData;
      },
    }
  );

  useEffect(() => {
    if (data) {
      form.setValues({
        subject: { label: data.title, value: data.subjectId },
        access: data.access,
      });
    }
    // eslint-disable-next-line
  }, [data]);

  const handleSubmit = (values) => {
    var axios = require("axios");
    var updateData = data
      ? JSON.stringify({
          id: data.id,
          access: values.access,
        })
      : JSON.stringify({
          subjectId: values.subject,
          studentId: studentId,
          access: values.access,
        });

    var config = {
      method: data ? "put" : "post",
      url: "/api/adminstudentaccess",
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
          <div className="bolder large-text">Update Subject - Student</div>
        ) : (
          <div className="bolder large-text">Create Subject - Student</div>
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
        {data && (
          <div className="flex-small-gap-column">
            <div className="bold just-flex text-light-grey">
              <div>Name</div>
            </div>
            <div className="bolder text-large">{data.title}</div>
          </div>
        )}
        {!data && (
          <div className="flex-small-gap-column">
            <div className="bold just-flex text-light-grey">
              <div>Name</div>
            </div>
            <Select
              placeholder="Select your subject"
              data={filteredSubject}
              radius="lg"
              size="lg"
              transitionDuration={150}
              transition="pop-top-left"
              transitionTimingFunction="ease"
              {...form.getInputProps("subject")}
            />
          </div>
        )}
        <div className="flex-small-gap-column">
          <div className="bold just-flex text-grey">
            <div>Subject Access Status</div>
          </div>
          <Switch
            label={
              <div className="bold">Click here to change the access status</div>
            }
            size="md"
            checked={form.values.access}
            color={"teal"}
            {...form.getInputProps("access")}
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
