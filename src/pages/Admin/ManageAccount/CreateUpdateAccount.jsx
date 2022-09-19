import React, { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import { Drawer, Input, Switch, Checkbox } from "@mantine/core";
import CustomButton from "../../../components/Buttons";
import { showNotification } from "@mantine/notifications";
import { redNotify, greenNotify } from "../../../notification";
import "./createupdateaccount.css";

const CreateUpdateAccount = ({
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
      user: "",
      name: "",
      password: "",
    },
  });

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
    var updateData = data
      ? JSON.stringify({
          id: data.id,
          user: values.user,
          name: values.name,
          password: values.password,
          isActive: values.isActive,
        })
      : JSON.stringify({
          username: values.user,
          name: values.name,
          password: values.password,
        });

    var config = {
      method: data ? "put" : "post",
      url: data ? "/api/account" : "/api/account/create",
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
    setChecked(false);
    form.reset();
  };

  return (
    <Drawer
      opened={isModalOpen}
      onClose={handleClose}
      title={
        data ? (
          <div className="bolder large-text">Update Account</div>
        ) : (
          <div className="bolder large-text">Create Account</div>
        )
      }
      padding="xl"
      size="xl"
      position="right"
    >
      <form
        className="form-manage-access-account"
        onSubmit={form.onSubmit(handleSubmit)}
      >
        <div className="flex-small-gap-column" style={{ gridColumn: "1/3" }}>
          <div className="bold just-flex text-grey">
            <div>Name</div>
            <div className="text-red">*</div>
          </div>
          <Input
            placeholder="Please enter the name!"
            radius="lg"
            size="lg"
            {...form.getInputProps("name")}
            required
          />
        </div>
        <div className="flex-small-gap-column">
          <div className="bold just-flex text-grey">
            <div>User Name</div>
            <div className="text-red">*</div>
          </div>
          <Input
            placeholder="Please enter the user!"
            radius="lg"
            size="lg"
            {...form.getInputProps("user")}
            required
          />
        </div>

        {!data && (
          <div className="flex-small-gap-column" style={{ gridColumn: "1/3" }}>
            <div className="bold just-flex text-grey">
              <div>Password</div>
              <div className="text-red">*</div>
            </div>
            <Input
              placeholder={"Please enter the password!"}
              radius="lg"
              size="lg"
              {...form.getInputProps("password")}
              required={!data}
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
            <Input
              placeholder={"Please enter new password to update!"}
              radius="lg"
              size="lg"
              {...form.getInputProps("password")}
            />
          </div>
        )}
        {data && (
          <div className="flex-small-gap-column">
            <div className="bold just-flex text-grey">
              <div>User Status</div>
              <div className="text-red">*</div>
            </div>
            <Switch
              label={
                <div className="bold">
                  Click here to change the account status
                </div>
              }
              size="md"
              checked={form.values.isActive}
              {...form.getInputProps("isActive")}
            />
          </div>
        )}
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

export default CreateUpdateAccount;
