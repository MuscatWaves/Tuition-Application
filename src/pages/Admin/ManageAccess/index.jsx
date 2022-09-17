import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Cookies from "universal-cookie";
import axios from "axios";
import Header from "../../../components/Header";
import CustomDataTable from "../../../components/CustomDataTable";
import { ActionIcon } from "@mantine/core";
import { Modal } from "@mantine/core";
import {
  AiOutlineDelete,
  AiFillCheckCircle,
  AiOutlineEdit,
} from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import CreateUpdateAccess from "./CreateUpdateAccess";
import BreadCrumb from "../../../components/BreadCrumb";
import CustomButton from "../../../components/Buttons";
import { showNotification } from "@mantine/notifications";
import { redNotify, greenNotify } from "../../../notification";
import "./manageacess.css";

const ManageAccess = () => {
  const [isModalOpen, toggleModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [updateData, setUpdateData] = useState(null);
  const [page, setPage] = useState(1);
  const cookies = new Cookies();
  const token = cookies.get("token");
  const {
    data = [],
    isFetching,
    refetch,
  } = useQuery(
    ["adminManageAccess", page],
    () =>
      axios.get(`/api/access?page=${page}`, {
        headers: {
          Authorization: token,
        },
      }),
    { refetchOnWindowFocus: false }
  );

  useEffect(() => {
    document.title = "Admin - Manage Access";
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
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Service",
      selector: (row) => row.service,
    },
    {
      name: "Read Access",
      selector: (row) =>
        row.readAccess ? (
          <AiFillCheckCircle className="mid-large-text text-green" />
        ) : (
          <MdCancel className="mid-large-text text-red" />
        ),
    },
    {
      name: "Write Access",
      selector: (row) =>
        row.writeAccess ? (
          <AiFillCheckCircle className="mid-large-text text-green" />
        ) : (
          <MdCancel className="mid-large-text text-red" />
        ),
    },
    {
      name: "Edit Access",
      selector: (row) =>
        row.editAccess ? (
          <AiFillCheckCircle className="mid-large-text text-green" />
        ) : (
          <MdCancel className="mid-large-text text-red" />
        ),
    },
    {
      name: "Delete Access",
      selector: (row) =>
        row.deleteAccess ? (
          <AiFillCheckCircle className="mid-large-text text-green" />
        ) : (
          <MdCancel className="mid-large-text text-red" />
        ),
    },
    {
      name: "Actions",
      selector: (row) => (
        <div className="flex-small-gap">
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
      id: 1,
      name: "Manage Access",
      url: "/admin/manageAccess",
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
      url: `/api/access/${deleteData.id}`,
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
      <CreateUpdateAccess
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        data={updateData}
        setData={setUpdateData}
        token={token}
        refetch={refetch}
      />
      <Modal
        title={<div className="bolder large-text">Delete Access</div>}
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
            Manage Access
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

export default ManageAccess;
