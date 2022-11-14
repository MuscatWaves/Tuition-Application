import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Cookies from "universal-cookie";
import axios from "axios";
import Header from "../../../components/Header";
import CustomDataTable from "../../../components/CustomDataTable";
import { ActionIcon } from "@mantine/core";
import { Modal } from "@mantine/core";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import CreateUpdateSubject from "./CreateUpdateSubject";
import BreadCrumb from "../../../components/BreadCrumb";
import CustomButton from "../../../components/Buttons";
import { showNotification } from "@mantine/notifications";
import { redNotify, greenNotify } from "../../../notification";
import "./createupdatesubject.css";
import { checkPermission } from "../../../utilities";

const ManageSubject = () => {
  const [isModalOpen, toggleModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [updateData, setUpdateData] = useState(null);
  const [page, setPage] = useState(1);
  const cookies = new Cookies();
  const token = cookies.get("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const {
    data = [],
    isFetching,
    refetch,
  } = useQuery(
    ["adminManageSubject", page],
    () =>
      axios.get(`/api/subject?page=${page}`, {
        headers: {
          Authorization: token,
        },
      }),
    { refetchOnWindowFocus: false }
  );

  useEffect(() => {
    document.title = "Admin - Manage Subject";
    // eslint-disable-next-line
  }, []);

  const update = () => {
    toggleModal(true);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Standard",
      selector: (row) => row.standard,
    },
    {
      name: "Price",
      selector: (row) => row.price,
    },
    {
      name: "Description",
      maxWidth: "500px",
      ellipsis: true,
      selector: "description",
    },
    {
      name: "",
      width: "450px",
      selector: (row) => (
        <div className="flex-small-gap">
          {checkPermission("subject", user.access).editAccess && (
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
          )}
          {checkPermission("subject", user.access).deleteAccess && (
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
          )}
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
      id: 1,
      name: "Manage Subject",
      url: "/admin/manageSubject",
      active: true,
    },
  ];

  const handleClose = () => {
    setDeleteModal(false);
    setDeleteData(null);
  };

  const handleDelete = () => {
    var axios = require("axios");
    var config = {
      method: "delete",
      url: `/api/subject/${deleteData.id}`,
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
        if ((page - 1) * 10 + 1 === data.data?.Total) {
          setPage(page - 1);
        } else {
          refetch();
        }
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

  return (
    <div>
      <CreateUpdateSubject
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        data={updateData}
        setData={setUpdateData}
        token={token}
        refetch={refetch}
      />
      <Modal
        title={<div className="bolder large-text">Delete Subject</div>}
        opened={deleteModal}
        onClose={handleClose}
      >
        <div>Are you sure to delete the data?</div>
        <div style={{ padding: "1rem 0" }} className="flex-small-gap">
          <CustomButton action={handleClose} label={"Cancel"} color={"gray"} />
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
      <Header customLink={"/adminDashboard"} />
      <div className="top-heading-admin-wrapper">
        <div className="top-heading-admin">
          <div className="bolder larger-text primary-font red-shade-colour">
            Manage Subject
          </div>
          <div className="flex-between">
            <BreadCrumb items={nav} />
            <CustomButton
              category={"landing"}
              label={"+ Create"}
              action={() => {
                setUpdateData(null);
                update();
              }}
              show={checkPermission("subject", user.access).writeAccess}
            />
          </div>
        </div>
      </div>
      <div>
        <CustomDataTable
          data={data.data?.data}
          columns={columns}
          progressPending={isFetching}
          pagination
          paginationServer
          paginationTotalRows={data.data?.Total}
          onChangePage={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ManageSubject;
