import React, { useState, useEffect } from "react";
import { m } from "framer-motion";
import BreadCrumb from "../../../components/BreadCrumb";
import Header from "../../../components/Header";
import { Modal } from "@mantine/core";
import Cookies from "universal-cookie";
import CustomButton from "../../../components/Buttons";
import { greenNotify, redNotify } from "../../../notification";
import { showNotification } from "@mantine/notifications";
import { FaBook, FaOpencart } from "react-icons/fa";
import { container, item } from "../Dashboard/constants";
import { CgRemove } from "react-icons/cg";
import Spinner from "../../../components/Spinner";
import { useQuery } from "react-query";
import axios from "axios";
import "../Shop/shop.css";

function Cart() {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [isDeleteData, setDeleteData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const navigation = [
    { id: 0, name: "Dashboard", url: "/dashboard" },
    {
      id: 12,
      name: "Shop",
      url: "/shop",
    },
    {
      id: 23,
      name: "Cart",
      active: true,
    },
  ];

  useEffect(() => {
    document.title = "Tuition - Shopping Cart";
    // eslint-disable-next-line
  }, []);

  const {
    data = [],
    isFetching,
    refetch,
  } = useQuery(
    ["cartDetails"],
    () =>
      axios.get(`/api/cart`, {
        headers: {
          Authorization: token,
        },
      }),
    { refetchOnWindowFocus: false, select: (data) => data.data }
  );

  const removeFromCart = () => {
    setLoading(true);
    var axios = require("axios");
    var data = JSON.stringify({
      cartId: Number(isDeleteData.id),
    });

    var config = {
      method: "delete",
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
        refetch();
        handleClose();
        setLoading(false);
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
        title={<div className="bolder large-text">Remove from Cart</div>}
        opened={deleteModal}
        onClose={handleClose}
        centered
      >
        <div>You are going to remove the subject from cart?</div>
        <div style={{ padding: "1rem 0" }} className="flex-small-gap">
          <CustomButton action={handleClose} label={"Cancel"} color={"gray"} />
          <CustomButton
            action={() => {
              removeFromCart();
            }}
            loading={loading}
            color={"red"}
            label={"Proceed"}
          />
        </div>
      </Modal>
      <Header />
      <div className="shp-wrapper">
        <BreadCrumb items={navigation} />
        <div className="flex-center align-center medium-gap">
          <FaOpencart
            style={{ fontSize: "4em", color: "var(--red-shade-color)" }}
          />
          <div className="large-text primary-colour bolder">
            Your Shopping Cart
          </div>
        </div>
        {isFetching ? (
          <div className="shp-loader">
            <Spinner />
          </div>
        ) : (
          <>
            <m.div
              className="shp-list-main"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {data.data.map((subject) => (
                <m.div
                  className="shp-list-main__each"
                  key={subject.subjectId}
                  variants={item}
                >
                  <FaBook className="shp-list-icn" />
                  <div className="flex-small-gap-column">
                    <div className="large-text bold red-shade-colour">
                      {subject.subjectTitle}
                    </div>
                    <div className="small-text bold primary-colour">
                      {subject.subjectDescription}
                    </div>
                  </div>
                  <div className="flex-small-gap-column">
                    <div className="small-text primary-colour bold">
                      Standard
                    </div>
                    <div className="bolder">{subject.subjectStandard}</div>
                  </div>
                  <div className="flex-small-gap-column">
                    <div className="small-text primary-colour bold">Price</div>
                    <div className="bolder">{subject.subjectPrice}</div>
                  </div>
                  <CustomButton
                    label={"Remove From Cart"}
                    leftIcon={<CgRemove style={{ fontSize: "22px" }} />}
                    color="red"
                    action={() => {
                      setDeleteData(subject);
                      setDeleteModal(true);
                    }}
                  />
                </m.div>
              ))}
            </m.div>
            <m.div
              className="shp-list-main__total-amount"
              animate={{ opacity: 1, y: "0" }}
              initial={{ opacity: 0, y: "20px" }}
              transition={{ duration: "0.8" }}
            >
              <div className="primary-colour">
                {data.data.length + ` item('s) present within cart`}
              </div>
              {data.ToatalAmount ? (
                <div className="flex-gap bold shp-list-main__amount">
                  <div className="large-text">
                    Amount to be paid : <span>{data.ToatalAmount}</span> OMR
                  </div>
                  <CustomButton
                    label={"Proceed to checkout"}
                    color="teal"
                    radius={"xl"}
                  />
                </div>
              ) : (
                <div className="large-text">No Subjects in Cart</div>
              )}
            </m.div>
          </>
        )}
      </div>
    </m.div>
  );
}

export default Cart;
