import React, { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import { Checkbox, Drawer, Input, PasswordInput, Switch } from "@mantine/core";
import CustomButton from "../../../components/Buttons";
import { showNotification } from "@mantine/notifications";
import { redNotify, greenNotify } from "../../../notification";
import "./createupdatestudent.css";

const CreateUpdateStudent = ({
  isModalOpen,
  toggleModal,
  data,
  setData,
  token,
  refetch,
}) => {
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      isActive: false,
      isAccess: false,
    },
  });

  useEffect(() => {
    if (data) {
      form.setValues({
        name: data.name,
        email: data.email,
        password: data.password,
        isActive: data.isActive,
        isAccess: data.isAccess,
      });
    }
    // eslint-disable-next-line
  }, [data]);

  const handleSubmit = (values) => {
    var axios = require("axios");
    var updateData = data
      ? JSON.stringify({
          id: data.id,
          name: values.name,
          password: values.password,
          isActive: values.isActive,
          isAccess: values.isAccess,
        })
      : JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
          isActive: values.isActive,
          isAccess: values.isAccess,
        });

    var config = {
      method: data ? "put" : "post",
      url: "/api/adminstudent",
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
          <div className="bolder large-text">Update Student</div>
        ) : (
          <div className="bolder large-text">Create Student</div>
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
            <div>Name</div>
            <div className="text-red">*</div>
          </div>
          <Input
            placeholder="Please enter the name of the student!"
            radius="lg"
            size="lg"
            {...form.getInputProps("name")}
            data-autofocus
            required
          />
        </div>
        <div className="flex-small-gap-column" style={{ gridColumn: "1/3" }}>
          <div className="bold just-flex text-light-grey">
            <div>Email</div>
            <div className="text-red">*</div>
          </div>
          <Input
            placeholder="Please enter the email of the student!"
            radius="lg"
            size="lg"
            {...form.getInputProps("email")}
          />
        </div>
        {!data && (
          <div className="flex-small-gap-column" style={{ gridColumn: "1/3" }}>
            <div className="bold just-flex text-light-grey">
              <div>Password</div>
              <div className="text-red">*</div>
            </div>
            <PasswordInput
              placeholder="Please enter the password for student!"
              radius="lg"
              size="lg"
              {...form.getInputProps("password")}
            />
          </div>
        )}
        {data && (
          <Checkbox
            checked={checked}
            label={"Please check to update the password"}
            onChange={(event) => setChecked(event.currentTarget.checked)}
          />
        )}
        {data && checked && (
          <div className="flex-small-gap-column" style={{ gridColumn: "1/3" }}>
            <div className="bold just-flex text-grey">
              <div>New Password</div>
            </div>
            <PasswordInput
              placeholder={"Please enter new password to update!"}
              radius="lg"
              size="lg"
              {...form.getInputProps("password")}
            />
          </div>
        )}
        <div className="flex-small-gap-column">
          <div className="bold just-flex text-grey">
            <div>User Active Status</div>
          </div>
          <Switch
            label={
              <div className="bold">Click here to change the active status</div>
            }
            size="md"
            checked={form.values.isActive}
            color={"teal"}
            {...form.getInputProps("isActive")}
          />
        </div>
        <div className="flex-small-gap-column">
          <div className="bold just-flex text-grey">
            <div>User Access Status</div>
          </div>
          <Switch
            label={
              <div className="bold">Click here to change the access status</div>
            }
            size="md"
            checked={form.values.isAccess}
            color={"teal"}
            {...form.getInputProps("isAccess")}
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

export default CreateUpdateStudent;
