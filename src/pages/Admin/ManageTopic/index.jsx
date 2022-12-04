import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Cookies from "universal-cookie";
import axios from "axios";
import Header from "../../../components/Header";
import CustomDataTable from "../../../components/CustomDataTable";
import { ActionIcon } from "@mantine/core";
import { Modal } from "@mantine/core";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import CreateUpdateTopic from "./CreateUpdateTopic";
import BreadCrumb from "../../../components/BreadCrumb";
import CustomButton from "../../../components/Buttons";
import { showNotification } from "@mantine/notifications";
import { redNotify, greenNotify } from "../../../notification";
import { checkPermission } from "../../../utilities";
import "./createupdatetopic.css";

const ManageTopic = () => {
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
    ["adminManageTopic", page],
    () =>
      axios.get(`/api/topic?page=${page}`, {
        headers: {
          Authorization: token,
        },
      }),
    { refetchOnWindowFocus: false }
  );

  const { data: subjectData = [] } = useQuery(
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
          label: item.title,
          value: item.id,
        }));
        return newData;
      },
    }
  );

  useEffect(() => {
    document.title = "Admin - Manage Topic";
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
      name: "Chapter Title",
      selector: (row) => row.title,
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },
    {
      name: "Chapter",
      selector: (row) =>
        subjectData.filter((subject) => subject.value === row.subjectId)[0]
          ?.label,
    },
    {
      name: "",
      selector: (row) => (
        <div className="flex-small-gap">
          {checkPermission("topic", user.access).editAccess && (
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
          {checkPermission("topic", user.access).deleteAccess && (
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
      name: "Manage Topic",
      url: "/admin/manageTopic",
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
      url: `/api/topic/${deleteData.id}`,
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
      <CreateUpdateTopic
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        data={updateData}
        setData={setUpdateData}
        token={token}
        subjectData={subjectData}
        refetch={refetch}
      />
      <Modal
        title={<div className="bolder large-text">Delete Chapter</div>}
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
            Manage Topic
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
              show={checkPermission("topic", user.access).writeAccess}
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

export default ManageTopic;
