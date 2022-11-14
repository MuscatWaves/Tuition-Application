import React from "react";
import { ActionIcon, Modal } from "@mantine/core";
import { useQuery } from "react-query";
import axios from "axios";
import Loader from "../../../components/Loader";
import CustomDataTable from "../../../components/CustomDataTable";
import {
  AiFillCheckCircle,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import Cookies from "universal-cookie";
import "./createupdatestudent.css";
import CustomButton from "../../../components/Buttons";
import Header from "../../../components/Header";
import BreadCrumb from "../../../components/BreadCrumb";
import { useState } from "react";
import CreateUpdateSubject from "./createUpdateSubject";
import { greenNotify, redNotify } from "../../../notification";
import { showNotification } from "@mantine/notifications";
import { useParams } from "react-router-dom";

const ManageSubjects = () => {
  const cookies = new Cookies();
  const [isModalOpen, toggleModal] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteData, setDeleteData] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = cookies.get("token");
  const id = useParams().id;

  const {
    data = {},
    isFetching,
    refetch,
  } = useQuery(
    ["adminManageEachStudent"],
    () =>
      axios.get(`/api/adminstudent/${id}`, {
        headers: {
          Authorization: token,
        },
      }),
    { refetchOnWindowFocus: false, select: (data) => data.data }
  );

  const update = () => {
    toggleModal(true);
  };

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Access",
      selector: (row) =>
        row.access ? (
          <AiFillCheckCircle className="mid-large-text text-green" />
        ) : (
          <MdCancel className="mid-large-text text-red" />
        ),
    },
    {
      name: "",
      selector: (row) => (
        <div className="flex-small-gap">
          {/*  Make a button */}
          <ActionIcon
            color="blue"
            size="lg"
            radius="md"
            variant="light"
            onClick={() => {
              setUpdateData(row);
              update();
            }}
          >
            <AiOutlineEdit style={{ fontSize: "22px" }} />
          </ActionIcon>
          <ActionIcon
            color="red"
            size="lg"
            radius="md"
            variant="light"
            onClick={() => {
              setDeleteData(row);
              setDeleteModal(true);
            }}
          >
            <AiOutlineDelete style={{ fontSize: "22px" }} />
          </ActionIcon>
        </div>
      ),
    },
  ];

  const nav = [
    {
      id: 0,
      name: "Dashboard",
      url: "/adminDashboard",
    },
    {
      id: 2,
      name: "Manage Student",
      url: "/admin/manageStudent",
    },
    {
      id: 4,
      // name: `${data?.data[0]?.name} - Subjects`,
      name: `Subjects`,
      url: "",
      active: true,
    },
  ];

  const handleDelete = () => {
    var axios = require("axios");
    var config = {
      method: "delete",
      url: `/api/adminstudentaccess/${deleteData.id}`,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    };
    setLoading(true);
    axios(config)
      .then(function (response) {
        showNotification({
          title: response.data.message,
          styles: greenNotify,
        });
        setLoading(false);
        handleClose();
        refetch();
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
    setDeleteModal(false);
    setDeleteData(null);
  };

  return (
    <div className="subManageSubject">
      <Header customLink={"/adminDashboard"} />
      <div className="top-heading-admin-wrapper">
        <div className="top-heading-admin">
          <div className="bolder larger-text primary-font red-shade-colour">
            Manage Subject - Student
          </div>
          <div className="flex-between">
            <BreadCrumb items={nav} />
            <CustomButton
              category={"landing"}
              label={"+ Add Subject"}
              action={() => {
                setUpdateData(null);
                update();
              }}
            />
          </div>
        </div>
      </div>
      {isFetching ? (
        <Loader />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CreateUpdateSubject
            isModalOpen={isModalOpen}
            toggleModal={toggleModal}
            data={updateData}
            setData={setUpdateData}
            token={token}
            refetch={refetch}
            userSubjectList={data.access}
            studentId={data.data[0].id}
          />
          <Modal
            title={<div className="bolder large-text">Delete Subject</div>}
            opened={deleteModal}
            onClose={handleClose}
          >
            <div>Are you sure to delete the data?</div>
            <div style={{ padding: "1rem 0" }} className="flex-small-gap">
              <CustomButton
                action={handleClose}
                label={"Cancel"}
                color={"gray"}
              />
              <CustomButton
                action={() => {
                  handleDelete();
                }}
                loading={loading}
                color={"red"}
                label={"Delete"}
              />
            </div>
          </Modal>
          <div className="flex-between" style={{ width: "95vw" }}>
            <div>
              <div className="bolder">Name</div>
              <div className="text-grey bold">{data.data[0].name}</div>
            </div>
            <div>
              <div className="bolder">Email</div>
              <div className="text-grey bold">{data.data[0].email}</div>
            </div>
            <div>
              <div className="bolder">Is Active</div>
              <div className="text-grey bold">
                {data.data[0].isActive ? "Yes" : "No"}
              </div>
            </div>
            {/* <div>
              <div className="bolder">Number of Subjects Enrolled</div>
              <div>{data?.access.length}</div>
            </div> */}
          </div>
          <div className="flex-small-gap-column" style={{ padding: "0.5rem" }}>
            <div className="bolder">Subjects Enrolled</div>
            <div>
              <CustomDataTable
                data={data.access}
                columns={columns}
                progressPending={isFetching}
                noHeight
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSubjects;
