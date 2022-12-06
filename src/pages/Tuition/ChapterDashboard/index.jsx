import React, { useState, useEffect } from "react";
import { AnimatePresence, m } from "framer-motion";
import BreadCrumb from "../../../components/BreadCrumb";
import Header from "../../../components/Header";
// import { useForm } from "@mantine/form";
import { Divider } from "@mantine/core";
import Cookies from "universal-cookie";
import { redNotify } from "../../../notification";
import { showNotification } from "@mantine/notifications";
import { FaBook } from "react-icons/fa";
import { container, item } from "../../Public/Dashboard/constants";
import Spinner from "../../../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import { CgNotes } from "react-icons/cg";
import { removeUnderScore } from "../../../utilities";
import "./std_shop.css";

function ChapterDashboard() {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const dataParams = useParams();
  const navigateTo = useNavigate();
  const [listData, setListData] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const navigation = [
    { id: 0, name: "Dashboard", url: "/dashboard" },
    {
      id: 1,
      name: removeUnderScore(dataParams.subject),
      active: true,
    },
  ];
  // const form = useForm({
  //   initialValues: {
  //     search: "",
  //   },
  // });

  useEffect(() => {
    document.title = "Student - Chapter Selection Dashboard";
    listFetch({
      search: "",
    });
    // eslint-disable-next-line
  }, []);

  const listFetch = (values) => {
    setTableLoading(true);
    var axios = require("axios");

    var config = {
      method: "get",
      url: `/api/subs/chapter?id=${dataParams.subjectId}`,
      headers: {
        Authorization: token,
      },
    };

    axios(config)
      .then(function (response) {
        setListData(response.data.data);
        setTableLoading(false);
      })
      .catch(function (error) {
        showNotification({
          title: "List Error!",
          message: error.response.data.error || "Something went terribly wrong",
          styles: redNotify,
        });
        setTableLoading(false);
        setListData([]);
      });
  };

  // const handleSubmit = (values) => {
  //   shoppingListFetch(values);
  // };

  return (
    <m.div
      className="std-chp-dash"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
      <Header />
      <div className="std-chp-dash-wrapper">
        <BreadCrumb items={navigation} />
        <div className="flex-center align-center medium-gap small-margin-top">
          <FaBook
            style={{ fontSize: "4em", color: "var(--red-shade-color)" }}
          />
          <div className="large-text primary-colour bolder">
            {removeUnderScore(dataParams.subject)}
          </div>
        </div>
        {/* <div className="std-chp-dash-filter-container">
          <form
            className="std-chp-dash-filter-form"
            onSubmit={form.onSubmit(handleSubmit)}
          >
            <div className="flex-small-gap-column">
              <Input
                placeholder="Enter the name of the service"
                radius="lg"
                size="lg"
                {...form.getInputProps("search")}
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
        </div> */}
        <Divider
          my="xs"
          labelPosition="center"
          label={
            <div className="medium-padding bold flex-center large-text red-shade-colour">
              Please select your chapter!
            </div>
          }
        />

        {tableLoading ? (
          <div className="std-chp-dash-loader">
            <Spinner />
          </div>
        ) : (
          <AnimatePresence>
            <m.div
              className="std-chp-dash-list-main"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {listData.map((chapter) => (
                <m.div
                  className="std-chp-dash-list-main__each pointer"
                  key={chapter.id}
                  variants={item}
                  onClick={() =>
                    navigateTo(
                      `/dashboard/student/${dataParams.subject}/${
                        dataParams.subjectId
                      }/${chapter?.title.replaceAll(" ", "_").toLowerCase()}/${
                        chapter.id
                      }`
                    )
                  }
                >
                  <CgNotes style={{ fontSize: "3em" }} />
                  <div className="bold large-text">{chapter?.title}</div>
                  <div className="small-text">{chapter?.description}</div>
                </m.div>
              ))}
            </m.div>
          </AnimatePresence>
        )}
      </div>
    </m.div>
  );
}

export default ChapterDashboard;
