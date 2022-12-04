import React, { useState, useEffect } from "react";
import { AnimatePresence, m } from "framer-motion";
import BreadCrumb from "../../../components/BreadCrumb";
import Header from "../../../components/Header";
import { useForm } from "@mantine/form";
import { Divider, Input, Loader, Modal, Timeline } from "@mantine/core";
import Cookies from "universal-cookie";
import CustomButton from "../../../components/Buttons";
import { greenNotify, redNotify } from "../../../notification";
import { showNotification } from "@mantine/notifications";
import { FaBook, FaShopify } from "react-icons/fa";
import { container, item } from "../Dashboard/constants";
import { BsPlusLg, BsFillCartCheckFill } from "react-icons/bs";
import { AiOutlineCheck } from "react-icons/ai";
import Spinner from "../../../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import "./shop.css";
import { removeUnderScore } from "../../../utilities";

function Shop() {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const navigateTo = useNavigate();
  const dataParams = useParams();
  const [shoppingListData, setShoppingListData] = useState([]);
  const [isDeleteData, setDeleteData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [subjectModal, setSubjectModal] = useState(false);
  const [subjectData, setSubjectData] = useState(null);
  const [subjectDataLoading, setSubjectDataLoading] = useState(false);
  const navigation = [
    { id: 0, name: "Dashboard", url: "/dashboard" },
    { id: 1, name: "Subject Shop", url: "/shop" },
    {
      id: 2,
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
    document.title = "Student - Shop";
    shoppingListFetch({
      search: "",
      title: "",
      standard: "",
    });
    // eslint-disable-next-line
  }, []);

  const subjectDataFetch = (subjectId) => {
    setSubjectDataLoading(true);
    var axios = require("axios");

    var config = {
      method: "get",
      url: `/api/student/subject/${subjectId}`,
      headers: {
        Authorization: token,
      },
    };

    axios(config)
      .then(function (response) {
        setSubjectData(response.data.data[0]);
        setSubjectDataLoading(false);
      })
      .catch(function (error) {
        showNotification({
          title: "List Error!",
          message: error.response.data.error || "Something went terribly wrong",
          styles: redNotify,
        });
        setSubjectData(null);
        setSubjectModal(false);
      });
  };

  const shoppingListFetch = (values) => {
    setTableLoading(true);
    var axios = require("axios");

    var config = {
      method: "get",
      url: `/api/student/chapter?search=${values.search}&title=${values.title}&standard=${values.standard}&subjectId=${dataParams.id}`,
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
        <div>You are going to add the chapter to cart</div>
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
      <Modal
        opened={subjectModal}
        onClose={() => {
          setSubjectModal(false);
        }}
        centered
      >
        {subjectDataLoading ? (
          <div className="flex-small-gap">
            <Loader />
            <div className="bold primary-colour">Loading Data...</div>
          </div>
        ) : (
          <div className="flex-gap-column-1">
            <div className="flex-gap">
              <FaBook className="shp-list-icn" />
              <div className="bold">{subjectData?.title}</div>
            </div>
            <Divider
              my="xs"
              label={<div className="primary-colour bold">Description</div>}
            />
            <div className="small-text">{subjectData?.description}</div>
            <Divider
              my="xs"
              label={<div className="primary-colour bold">Basic Details</div>}
            />
            <div className="sub-mod-basic__grid-3">
              <div className="flex-small-gap-column">
                <div className="small-text primary-colour bold">Standard</div>
                <div className="bolder">{subjectData?.standard}</div>
              </div>
              <div className="flex-small-gap-column">
                <div className="small-text primary-colour bold">Price</div>
                <div className="bolder">{subjectData?.price}</div>
              </div>
              <div className="flex-small-gap-column">
                <div className="bolder">
                  {!subjectData?.cartStatus &&
                    subjectData?.subscriptionStatus && (
                      <CustomButton
                        label={"Subscribed"}
                        leftIcon={<AiOutlineCheck />}
                        color="teal"
                        action={() =>
                          showNotification({
                            title: "Already Subscribed",
                            styles: greenNotify,
                          })
                        }
                      />
                    )}
                  {!subjectData?.cartStatus &&
                    !subjectData?.subscriptionStatus && (
                      <CustomButton
                        label={"Add to Cart"}
                        leftIcon={<BsPlusLg />}
                        action={() => {
                          setDeleteData(subjectData);
                          setDeleteModal(true);
                          setSubjectModal(false);
                        }}
                      />
                    )}
                  {subjectData?.cartStatus &&
                    !subjectData?.subscriptionStatus && (
                      <CustomButton
                        label={"Added to Cart"}
                        color="orange"
                        leftIcon={
                          <BsFillCartCheckFill style={{ fontSize: "18px" }} />
                        }
                        action={() => navigateTo("/shop/cart")}
                      />
                    )}
                </div>
              </div>
            </div>
            <Divider
              my="xs"
              label={<div className="primary-colour bold">Chapters</div>}
            />
            {(subjectData?.chapters?.length > 0 && (
              <Timeline active={1}>
                {subjectData.chapters?.map((data, index) => (
                  <Timeline.Item className="bold">{data?.title}</Timeline.Item>
                ))}
              </Timeline>
            )) ||
              "No Chapters Listed, Will be filled soon"}
          </div>
        )}
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
        <Divider
          my="xs"
          labelPosition="center"
          label={
            <div className="primary-colour bold large-text">
              {removeUnderScore(dataParams.name)}
            </div>
          }
        />
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
                  <CustomButton
                    style={{ cursor: "not-allowed" }}
                    label={"Know More"}
                    radius={"xl"}
                    color="cyan"
                    variant={"light"}
                    action={() => {
                      setSubjectModal(true);
                      subjectDataFetch(subject.id);
                    }}
                    disabled
                  />
                  {!subject.cartStatus && subject.subscriptionStatus && (
                    <CustomButton
                      label={"Subscribed"}
                      leftIcon={<AiOutlineCheck />}
                      color="teal"
                      action={() =>
                        showNotification({
                          title: "Already Subscribed",
                          styles: greenNotify,
                        })
                      }
                    />
                  )}
                  {!subject.cartStatus && !subject.subscriptionStatus && (
                    <CustomButton
                      label={"Add to Cart"}
                      leftIcon={<BsPlusLg />}
                      action={() => {
                        setDeleteData(subject);
                        setDeleteModal(true);
                      }}
                    />
                  )}
                  {subject.cartStatus && !subject.subscriptionStatus && (
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
