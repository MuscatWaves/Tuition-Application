import React, { useState } from "react";
import {
  Button,
  Form,
  Drawer,
  Input,
  Switch,
  Checkbox,
  message,
  Popconfirm,
} from "antd";
import axios from "axios";
import Cookies from "universal-cookie";
import Password from "antd/lib/input/Password";

const UserForm = ({
  isModalOpen,
  setModal,
  editData,
  setEditData,
  getData,
}) => {
  const [form] = Form.useForm();
  const [newPassword, setNewPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const cookies = new Cookies();
  const token = cookies.get("token");
  

  const onClose = () => {
    setModal(false);
    setEditData(null);
  };
  const onPasswordNeed = (e) => {
    setNewPassword(e.target.checked);
  };

  const handleUpdateUser = async (values, status = editData.status) => {
    var bodyFormDataUpdate = new FormData();
    editData
      ? bodyFormDataUpdate.append("update_account", true)
      : bodyFormDataUpdate.append("create_user_account", true);
    editData && bodyFormDataUpdate.append("id", editData.id);
    bodyFormDataUpdate.append("name", values.name);
    newPassword && bodyFormDataUpdate.append("password", values.password);
    !editData && bodyFormDataUpdate.append("password", values.password);
    !editData && bodyFormDataUpdate.append("email", values.email);
    bodyFormDataUpdate.append("uploadcv", values.uv_access === true ? 0 : 1);
    bodyFormDataUpdate.append("searchcv", values.sc_access === true ? 0 : 1);
    bodyFormDataUpdate.append("rejectcv", values.rc_access === true ? 0 : 1);
    bodyFormDataUpdate.append("buildcv", values.bc_access === true ? 0 : 1);
    editData && bodyFormDataUpdate.append("status", status);
    setLoading(true);
    await axios({
      method: "POST",
      url: `/api/react-post.php`,
      data: bodyFormDataUpdate,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(function (response) {
        if (response.status === 200) {
          message.success("User has been updated sucessfully");
          setLoading(false);
          onClose();
          getData();
        } else {
          if (response.status === 201) {
            message.error(response.data.error, "error");
            setLoading(false);
          } else {
            message.error("Something Went Wrong!", "error");
            setLoading(false);
          }
        }
      })
      .catch(function (response) {
        message.error("Something Went Wrong!", "error");
      });
  };

  const confirm = () => {
    const data = {
      name: editData?.name,
      email: editData?.email,
      uv_access: editData?.uploadcv_access === 0 ? true : false || false,
      sc_access: editData?.searchcv_access === 0 ? true : false || false,
      rc_access: editData?.rejectedcv_access === 0 ? true : false || false,
      bc_access: editData?.buildcv_access === 0 ? true : false || false,
    };
    const state = editData.status === 0 ? 1 : 0;
    handleUpdateUser(data, state);
  };

  return (
    <Drawer
      title={editData ? "Update the User Profile" : "Create a New User"}
      placement="right"
      onClose={onClose}
      visible={isModalOpen}
    >
      <Form
        layout="vertical"
        className={"zoom-in-animation"}
        onFinish={handleUpdateUser}
        form={form}
        scrollToFirstError={true}
        initialValues={{
          name: editData?.name,
          email: editData?.email,
          password: "",
          uv_access: editData?.uploadcv_access === 0 ? true : false || false,
          sc_access: editData?.searchcv_access === 0 ? true : false || false,
          rc_access: editData?.rejectedcv_access === 0 ? true : false || false,
          bc_access: editData?.buildcv_access === 0 ? true : false || false,
        }}
      >
        <Form.Item
          name="name"
          label={"Name"}
          rules={[
            {
              required: true,
              message: "No Username provided",
            },
          ]}
        >
          <Input placeholder={"Enter name of the user"} />
        </Form.Item>
        <Form.Item
          name="email"
          label={"Email"}
          rules={[
            {
              required: true,
              message: "No Email provided",
            },
          ]}
        >
          <Input placeholder={"Enter email of the user"} disabled={editData} />
        </Form.Item>
        {editData && (
          <div className="small-padding-bottom">
            <Checkbox onChange={onPasswordNeed}>
              Need to Update Password
            </Checkbox>
          </div>
        )}
        {newPassword && (
          <Form.Item
            name="password"
            className="zoom-in-animation"
            label={"New Password"}
            rules={[
              {
                required: true,
                message: "No Password provided",
              },
            ]}
          >
            <Password placeholder={"Enter name of the user"} />
          </Form.Item>
        )}
        {!editData && (
          <Form.Item
            name="password"
            className="zoom-in-animation"
            label={"New Password"}
            rules={[
              {
                required: true,
                message: "No Password provided",
              },
            ]}
          >
            <Password placeholder={"Enter name of the user"} />
          </Form.Item>
        )}
        <p className="bolder text-black">Permissions</p>
        <div className="grid-2">
          <Form.Item
            name={"uv_access"}
            label={"Upload CV access"}
            valuePropName={"checked"}
          >
            <Switch />
          </Form.Item>
          <Form.Item
            name={"sc_access"}
            label={"Search CV access"}
            valuePropName={"checked"}
          >
            <Switch />
          </Form.Item>
          <Form.Item
            name={"rc_access"}
            label={"Rejected CV access"}
            valuePropName={"checked"}
          >
            <Switch />
          </Form.Item>
          <Form.Item
            name={"bc_access"}
            label={"Build CV access"}
            valuePropName={"checked"}
          >
            <Switch />
          </Form.Item>
          {editData && (
            <Popconfirm
              title={
                <div>
                  <div>
                    {editData.status === 0
                      ? "Deactivating this account would no longer allow user to log-in"
                      : "Activating this account would allow user to log-in"}
                  </div>
                  <div>
                    {editData.status === 0
                      ? "Are you sure to deactivate this account?"
                      : "Are you sure to activate this account?"}
                  </div>
                </div>
              }
              onConfirm={confirm}
              okText={editData.status === 0 ? "Deactivate" : "Activate"}
              okType={editData.status === 0 ? "danger" : "primary"}
            >
              <div
                className={
                  editData.status === 0
                    ? "text-red bolder pointer button-zoom"
                    : "text-green bolder pointer button-zoom"
                }
              >
                {editData.status === 0
                  ? "Deactivate this account"
                  : "Activate this account"}
              </div>
            </Popconfirm>
          )}
        </div>
        <div className="flex-at-end medium-margin-top">
          <Button className="" type="text" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className=""
            type="primary"
            htmlType="submit"
            loading={isLoading}
          >
            {editData ? "Update Account" : "Create Account"}
          </Button>
        </div>
      </Form>
    </Drawer>
  );
};

export default UserForm;
