import React, { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import { Modal, Switch } from "@mantine/core";
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
}) => {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
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
          user: 1,
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
          styles: redNotify,
        });
        setLoading(false);
      });
  };

  const handleClose = () => {
    setData(false);
    toggleModal(false);
  };

  return (
    <Modal
      opened={isModalOpen}
      onClose={handleClose}
      title="Introduce yourself!"
    >
      <form
        className="form-manage-access-admin"
        onSubmit={form.onSubmit(handleSubmit)}
      >
        <div className="flex-small-gap-column" style={{ gridColumn: "1/3" }}>
          <div className="medium-text bolder text-light-grey">Service</div>
          <input
            type="text"
            name="service"
            className="login-input"
            placeholder="Enter the name of the service"
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
          label="Read Access"
          onLabel="ON"
          offLabel="OFF"
          checked={form.values.writeAccess}
          {...form.getInputProps("writeAccess")}
        />
        <Switch
          color="teal"
          size="md"
          label="Read Access"
          onLabel="ON"
          offLabel="OFF"
          checked={form.values.editAccess}
          {...form.getInputProps("editAccess")}
        />
        <Switch
          color="teal"
          size="md"
          label="Read Access"
          onLabel="ON"
          offLabel="OFF"
          checked={form.values.deleteAccess}
          {...form.getInputProps("deleteAccess")}
        />
        <div className="button-form-manage-access">
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
    </Modal>
  );
};

export default CreateUpdateAccess;
