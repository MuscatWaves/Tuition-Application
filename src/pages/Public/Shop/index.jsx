import React, { useState, useEffect } from "react";
import { AnimatePresence, m } from "framer-motion";
import BreadCrumb from "../../../components/BreadCrumb";
import Header from "../../../components/Header";
import { useForm } from "@mantine/form";
import { Input, Modal } from "@mantine/core";
import Cookies from "universal-cookie";
import CustomButton from "../../../components/Buttons";
import { greenNotify, redNotify } from "../../../notification";
import { showNotification } from "@mantine/notifications";
import { FaBook, FaShopify } from "react-icons/fa";
import { container, item } from "../Dashboard/constants";
import { BsPlusLg, BsFillCartCheckFill } from "react-icons/bs";
import Spinner from "../../../components/Spinner";
import { useNavigate } from "react-router-dom";
import "./shop.css";

function Shop() {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const navigateTo = useNavigate();
  const [shoppingListData, setShoppingListData] = useState([]);
  const [isDeleteData, setDeleteData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const navigation = [
    { id: 0, name: "Dashboard", url: "/dashboard" },
    {
      id: 1,
      name: "Shop",
      active: true,
    },
  ];
  const form = useForm({
    initialValues: {
      search: "",
      title: "",
      standard: "",
    },
  });

  useEffect(() => {
    shoppingListFetch({
      search: "",
      title: "",
      standard: "",
    });
    // eslint-disable-next-line
  }, []);

  const shoppingListFetch = (values) => {
    setTableLoading(true);
    var axios = require("axios");

    var config = {
      method: "get",
      url: `/api/student/subject?search=${values.search}&title=${values.title}&standard=${values.standard}`,
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

  const addToCart = () => {
    setLoading(true);
    var axios = require("axios");
    var data = JSON.stringify({
      subjectId: Number(isDeleteData.id),
    });

    var config = {
      method: "post",
      url: "/api/cart",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        showNotification({
          title: "Success",
          styles: greenNotify,
        });
        shoppingListFetch({
          search: "",
          title: "",
          standard: "",
        });
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
    setDeleteData(null);
    setDeleteModal(false);
    setLoading(false);
  };

  return (
    <m.div
      className="shp"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
      <Modal
        title={<div className="bolder large-text">Add to cart</div>}
        opened={deleteModal}
        onClose={handleClose}
        centered
      >
        <div>You are going to add the subject to cart</div>
        <div style={{ padding: "1rem 0" }} className="flex-small-gap">
          <CustomButton action={handleClose} label={"Cancel"} color={"gray"} />
          <CustomButton
            action={() => {
              addToCart();
            }}
            loading={loading}
            color={"teal"}
            label={"Proceed"}
          />
        </div>
      </Modal>
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
      <div className="shp-wrapper">
        <BreadCrumb items={navigation} />
        <div className="flex-center align-center medium-gap">
          <FaShopify
            style={{ fontSize: "4em", color: "var(--red-shade-color)" }}
          />
          <div className="large-text primary-colour bolder">Shop</div>
        </div>
        <div className="shp-filter-container">
          <div className="large-text bold red-shade-colour">Filter</div>
          <form
            className="shp-filter-form"
            onSubmit={form.onSubmit(handleSubmit)}
          >
            <div className="flex-small-gap-column">
              <div className="bold just-flex text-grey">
                <div>Search</div>
              </div>
              <Input
                placeholder="Enter the name of the service"
                radius="lg"
                size="lg"
                {...form.getInputProps("search")}
              />
            </div>
            <div className="flex-small-gap-column">
              <div className="bold just-flex text-grey">
                <div>Title</div>
              </div>
              <Input
                placeholder="Enter the name of the service"
                radius="lg"
                size="lg"
                {...form.getInputProps("title")}
              />
            </div>
            <div className="flex-small-gap-column">
              <div className="bold just-flex text-grey">
                <div>Standard</div>
              </div>
              <Input
                placeholder="Enter the name of the service"
                radius="lg"
                size="lg"
                {...form.getInputProps("standard")}
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
        {tableLoading ? (
          <div className="shp-loader">
            <Spinner />
          </div>
        ) : (
          <AnimatePresence>
            <m.div
              className="shp-list-main"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {shoppingListData.map((subject) => (
                <m.div
                  className="shp-list-main__each"
                  key={subject.id}
                  variants={item}
                >
                  <FaBook className="shp-list-icn" />
                  <div className="flex-small-gap-column">
                    <div className="large-text bold red-shade-colour">
                      {subject.title}
                    </div>
                    <div className="small-text bold primary-colour">
                      {subject.description}
                    </div>
                  </div>
                  <div className="flex-small-gap-column">
                    <div className="small-text primary-colour bold">
                      Standard
                    </div>
                    <div className="bolder">{subject.standard}</div>
                  </div>
                  <div className="flex-small-gap-column">
                    <div className="small-text primary-colour bold">Price</div>
                    <div className="bolder">{subject.price}</div>
                  </div>
                  {!subject.cartStatus && subject.subscriptionStatus && (
                    <CustomButton
                      label={"Subscribed"}
                      leftIcon={<BsPlusLg />}
                      color="teal"
                    />
                  )}
                  {!subject.cartStatus && (
                    <CustomButton
                      label={"Add to Cart"}
                      leftIcon={<BsPlusLg />}
                      action={() => {
                        setDeleteData(subject);
                        setDeleteModal(true);
                      }}
                    />
                  )}
                  {subject.cartStatus && (
                    <CustomButton
                      label={"Added to Cart"}
                      color="orange"
                      leftIcon={
                        <BsFillCartCheckFill style={{ fontSize: "18px" }} />
                      }
                      action={() => navigateTo("/shop/cart")}
                    />
                  )}
                </m.div>
              ))}
            </m.div>
          </AnimatePresence>
        )}
      </div>
    </m.div>
  );
}

export default Shop;
