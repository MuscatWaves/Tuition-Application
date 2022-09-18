import React, { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import { Switch, Select, Drawer, Input } from "@mantine/core";
import CustomButton from "../../../components/Buttons";
import { showNotification } from "@mantine/notifications";
import { redNotify, greenNotify } from "../../../notification";
import "./manageacess.css";

const CreateUpdateAccess = ({
  isModalOpen,
  toggleModal,
  data,
  setData,
  token,
  refetch,
  accounts,
}) => {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      user: "",
      service: "",
      readAccess: false,
      writeAccess: false,
      editAccess: false,
      deleteAccess: false,
    },
  });

  useEffect(() => {
    if (data) {
      form.setValues({
        user: data.userid,
        service: data.service,
        readAccess: data?.readAccess,
        writeAccess: data?.writeAccess,
        editAccess: data?.editAccess,
        deleteAccess: data?.deleteAccess,
      });
    }
    // eslint-disable-next-line
  }, [data]);

  const handleSubmit = (values) => {
    var axios = require("axios");
    var updateData = data
      ? JSON.stringify({
          id: data.id,
          readAccess: values.readAccess,
          writeAccess: values.writeAccess,
          editAccess: values.editAccess,
          deleteAccess: values.deleteAccess,
        })
      : JSON.stringify({
          user: values.user,
          service: values.service,
          readAccess: values.readAccess,
          writeAccess: values.writeAccess,
          editAccess: values.editAccess,
          deleteAccess: values.deleteAccess,
        });

    var config = {
      method: data ? "put" : "post",
      url: "/api/access",
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
          <div className="bolder large-text">Update Access</div>
        ) : (
          <div className="bolder large-text">Create Access</div>
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
            <div>User</div>
            <div className="text-red">*</div>
          </div>
          <Select
            placeholder="Select the user for providing access"
            data={accounts}
            radius="lg"
            size="lg"
            transitionDuration={150}
            transition="pop-top-left"
            transitionTimingFunction="ease"
            {...form.getInputProps("user")}
            required
          />
        </div>
        <div className="flex-small-gap-column" style={{ gridColumn: "1/3" }}>
          <div className="bold just-flex text-grey">
            <div>Service</div>
            <div className="text-red">*</div>
          </div>
          <Input
            placeholder="Enter the name of the service"
            radius="lg"
            size="lg"
            {...form.getInputProps("service")}
            required
          />
        </div>
        <Switch
          color="teal"
          size="md"
          label="Read Access"
          checked={form.values.readAccess}
          onLabel="ON"
          offLabel="OFF"
          {...form.getInputProps("readAccess")}
        />
        <Switch
          color="teal"
          size="md"
          label="Write Access"
          onLabel="ON"
          offLabel="OFF"
          checked={form.values.writeAccess}
          {...form.getInputProps("writeAccess")}
        />
        <Switch
          color="teal"
          size="md"
          label="Edit Access"
          onLabel="ON"
          offLabel="OFF"
          checked={form.values.editAccess}
          {...form.getInputProps("editAccess")}
        />
        <Switch
          color="teal"
          size="md"
          label="Delete Access"
          onLabel="ON"
          offLabel="OFF"
          checked={form.values.deleteAccess}
          {...form.getInputProps("deleteAccess")}
        />
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

export default CreateUpdateAccess;
