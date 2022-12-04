import React, { useState, useEffect } from "react";
import { AnimatePresence, m } from "framer-motion";
import BreadCrumb from "../../../components/BreadCrumb";
import Header from "../../../components/Header";
import { useForm } from "@mantine/form";
import { Divider, Input } from "@mantine/core";
import Cookies from "universal-cookie";
import CustomButton from "../../../components/Buttons";
import { redNotify } from "../../../notification";
import { showNotification } from "@mantine/notifications";
import { FaBook, FaShopify } from "react-icons/fa";
import { container, item } from "../Dashboard/constants";
import { BsFillCartCheckFill } from "react-icons/bs";
import Spinner from "../../../components/Spinner";
import { useNavigate } from "react-router-dom";
import "./sub_shop.css";

function SubjectShop() {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const navigateTo = useNavigate();
  const [shoppingListData, setShoppingListData] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const navigation = [
    { id: 0, name: "Dashboard", url: "/dashboard" },
    {
      id: 1,
      name: "Subject Shop",
      active: true,
    },
  ];
  const form = useForm({
    initialValues: {
      search: "",
    },
  });

  useEffect(() => {
    document.title = "Student - Subject Shop";
    shoppingListFetch({
      search: "",
    });
    // eslint-disable-next-line
  }, []);

  const shoppingListFetch = (values) => {
    setTableLoading(true);
    var axios = require("axios");

    var config = {
      method: "get",
      url: `/api/student/subject?page=0&search=${values.search}`,
      headers: {
        Authorization: token,
      },
    };

    axios(config)
      .then(function (response) {
        setShoppingListData(response.data.data);
        setTableLoading(false);
      })
      .catch(function (error) {
        showNotification({
          title: "List Error!",
          message: error.response.data.error || "Something went terribly wrong",
          styles: redNotify,
        });
        setTableLoading(false);
        setShoppingListData([]);
      });
  };

  const handleSubmit = (values) => {
    shoppingListFetch(values);
  };

  return (
    <m.div
      className="sub-shp"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
      <Header
        CustomComponent={
          <CustomButton
            label={"View Cart"}
            radius={"xl"}
            color="orange"
            leftIcon={<BsFillCartCheckFill style={{ fontSize: "18px" }} />}
            action={() => navigateTo("/shop/cart")}
          />
        }
      />
      <div className="sub-shp-wrapper">
        <BreadCrumb items={navigation} />
        <div className="flex-center align-center medium-gap">
          <FaShopify
            style={{ fontSize: "4em", color: "var(--red-shade-color)" }}
          />
          <div className="large-text primary-colour bolder">Shop</div>
        </div>
        <div className="sub-shp-filter-container">
          <form
            className="sub-shp-filter-form"
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
        </div>
        <Divider
          my="xs"
          labelPosition="center"
          label={
            <div className="medium-padding bold flex-center large-text red-shade-colour">
              Please select your subject!
            </div>
          }
        />

        {tableLoading ? (
          <div className="sub-shp-loader">
            <Spinner />
          </div>
        ) : (
          <AnimatePresence>
            <m.div
              className="sub-shp-list-main"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {shoppingListData.map((subject) => (
                <m.div
                  className="sub-shp-list-main__each pointer"
                  key={subject.id}
                  variants={item}
                  onClick={() =>
                    navigateTo(
                      `/shop/${subject?.subjectName.replaceAll(" ", "_")}/${
                        subject.id
                      }`
                    )
                  }
                >
                  <FaBook style={{ fontSize: "3em" }} />
                  <div>{subject?.subjectName || "Math"}</div>
                </m.div>
              ))}
            </m.div>
          </AnimatePresence>
        )}
      </div>
    </m.div>
  );
}

export default SubjectShop;
