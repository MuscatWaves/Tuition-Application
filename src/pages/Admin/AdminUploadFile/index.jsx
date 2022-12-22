import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Cookies from "universal-cookie";
import Header from "../../../components/Header";
import CustomDataTable from "../../../components/CustomDataTable";
import { ActionIcon, Input, Select } from "@mantine/core";
import { Modal } from "@mantine/core";
import { AiOutlineDelete } from "react-icons/ai";
import CreateUpdateUploadFile from "./CreateUpdateUploadFile";
import BreadCrumb from "../../../components/BreadCrumb";
import CustomButton from "../../../components/Buttons";
import { showNotification } from "@mantine/notifications";
import { redNotify, greenNotify } from "../../../notification";
import { checkPermission } from "../../../utilities";
import dayjs from "dayjs";
import { useForm } from "@mantine/form";
import "./createupdateuploadfile.css";

const AdminUploadFile = () => {
  const [isModalOpen, toggleModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [data, setData] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [updateData, setUpdateData] = useState(null);
  const [page, setPage] = useState(1);
  const user = JSON.parse(localStorage.getItem("user"));
  const cookies = new Cookies();
  const token = cookies.get("token");
  const form = useForm({
    initialValues: {
      chapter: "",
      type: "",
    },
  });

  const uploadedFilesFetch = (values) => {
    setTableLoading(true);
    var axios = require("axios");

    var config = {
      method: "get",
      url: `/api/uploads?chapterId=${values.chapter}&type=${values.type}&page=${page}`,
      headers: {
        Authorization: token,
      },
    };

    axios(config)
      .then(function (response) {
        setData(response);
        setTableLoading(false);
      })
      .catch(function (error) {
        showNotification({
          title: "List Error!",
          message: error.response.data.error || "Something went terribly wrong",
          styles: redNotify,
        });
        setTableLoading(false);
        setData([]);
      });
  };

  const { data: chapterData = [] } = useQuery(
    ["adminManageChapterTemp1"],
    () =>
      axios.get(`/api/open/chapter`, {
        headers: {
          Authorization: token,
        },
      }),
    {
      refetchOnWindowFocus: false,
      select: (data) => data.data.data,
    }
  );

  const { data: userData = [] } = useQuery(
    ["adminUsers", page],
    () =>
      axios.get(`/api/open/account`, {
        headers: {
          Authorization: token,
        },
      }),
    { refetchOnWindowFocus: false, select: (data) => data.data.data }
  );

  useEffect(() => {
    document.title = "Student - Shop";
    refetch();
    // eslint-disable-next-line
  }, [page]);

  const refetch = () => {
    uploadedFilesFetch({
      chapter: form.values.chapter,
      type: form.values.type,
    });
  };

  const handleSubmit = (values) => {
    uploadedFilesFetch({
      chapter: values.chapter,
      type: values.type || "",
    });
  };

  const update = () => {
    toggleModal(true);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const columns = [
    {
      name: "Chapter",
      selector: (row) =>
        chapterData.filter((chapter) => chapter.id === row.chapterId)[0]?.title,
    },
    {
      name: "Type",
      selector: (row) => row.type,
    },
    {
      name: "File",
      selector: (row) => row.file,
    },
    {
      name: "Created By",
      selector: (row) => (
        <div>
          <div>
            {userData?.filter((user) => user.id === row.uploadedBy)[0]?.name}
          </div>
          <div className="small-text primary-colour">
            {dayjs().format("MMMM D, YYYY h:mm A")}
          </div>
        </div>
      ),
    },
    {
      name: "",
      maxWidth: "150px",
      selector: (row) => (
        <div className="flex-small-gap">
          {/* {checkPermission("upload", user.access).editAccess && (
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
          )} */}
          {checkPermission("upload", user.access).deleteAccess && (
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
      name: "Upload File",
      url: "/admin/uploadFile",
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
      url: `/api/uploads/${deleteData.id}`,
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

  const uploadStructureData = [
    {
      label: "Questions",
      value: "questions",
    },
    {
      label: "Answers",
      value: "answers",
    },
    {
      label: "Notes",
      value: "notes",
    },
    {
      label: "Video",
      value: "video",
    },
  ];

  return (
    <div>
      <CreateUpdateUploadFile
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        data={updateData}
        setData={setUpdateData}
        token={token}
        refetch={refetch}
        formValues={form.values}
        typeData={uploadStructureData}
      />
      <Modal
        title={<div className="bolder large-text">Delete Uploaded File</div>}
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
            Manage Uploaded Files
          </div>
          <div className="flex-between">
            <BreadCrumb items={nav} />
            <CustomButton
              category={"landing"}
              label={"+ Upload"}
              action={() => {
                setUpdateData(null);
                update();
              }}
            />
          </div>
        </div>
      </div>
      <div className="shp-filter-container12">
        <div className="large-text bold red-shade-colour">Filter</div>
        <form
          className="shp-filter-form12"
          onSubmit={form.onSubmit(handleSubmit)}
        >
          <div className="flex-small-gap-column">
            <div className="bold just-flex text-grey">
              <div>Chapter</div>
            </div>
            <Input
              placeholder="Enter the name of the service"
              radius="lg"
              size="lg"
              {...form.getInputProps("chapter")}
            />
          </div>
          <div className="flex-small-gap-column">
            <div className="bold just-flex text-grey">
              <div>Type</div>
            </div>
            <Select
              placeholder="Select your subject"
              data={uploadStructureData}
              radius="lg"
              size="lg"
              transitionDuration={150}
              transition="pop-top-left"
              transitionTimingFunction="ease"
              clearable
              {...form.getInputProps("type")}
            />
          </div>
          <CustomButton
            label="Search"
            category="landing"
            type={"submit"}
            size={"lg"}
            radius={"lg"}
          />
        </form>
      </div>
      <div>
        <CustomDataTable
          data={data.data?.data}
          columns={columns}
          progressPending={tableLoading}
          pagination
          paginationServer
          paginationTotalRows={data.data?.Total}
          onChangePage={handlePageChange}
        />
      </div>
    </div>
  );
};

export default AdminUploadFile;
