import React, { useState, useEffect } from "react";
import { m } from "framer-motion";
import BreadCrumb from "../../../components/BreadCrumb";
import Header from "../../../components/Header";
import { Divider, Modal } from "@mantine/core";
import Cookies from "universal-cookie";
import CustomButton from "../../../components/Buttons";
import { greenNotify, redNotify } from "../../../notification";
import { showNotification } from "@mantine/notifications";
import { FaBook, FaOpencart, FaCheck } from "react-icons/fa";
import { container, item } from "../Dashboard/constants";
import { CgRemove } from "react-icons/cg";
import Spinner from "../../../components/Spinner";
import { BiErrorCircle } from "react-icons/bi";
import { useQuery } from "react-query";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router";
import "../Shop/shop.css";

function Cart() {
  const navigateTo = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [isDeleteData, setDeleteData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [amount, setAmount] = useState(0);
  const [success, setSuccess] = useState(false);
  const [statusError, setStatusError] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [payer, setPayer] = useState({});
  const [orderID, setOrderID] = useState(false);
  const [list, setList] = useState([]);
  const PayPalOptions = {
    "client-id":
      "AaK0yvg1GLTpbKiX6sBGzwXEgvKVEUfWFqVvaspDAXRj6vUqV80IIuU5PfP1uXxLqt15YlfohrJ9aVzL",
    currency: "USD",
    intent: "capture",
  };
  const navigation = [
    { id: 0, name: "Dashboard", url: "/dashboard" },
    {
      id: 12,
      name: "Subject Shop",
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
    data: cartData = [],
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

  // creates a paypal order
  const createOrder = (data, actions) => {
    setList(cartData.data);
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Sunflower",
            amount: {
              currency_code: "USD",
              value: amount,
            },
          },
        ],
        // not needed if a shipping address is actually needed
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  // check Approval
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      setPayer(payer);
      setSuccess(true);
    });
  };

  //capture likely error
  const onError = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      setPayer(payer);
      setStatusError(true);
      setErrorMessage(
        "An Error occured with your payment. Please try again after sometime!"
      );
    });
  };

  useEffect(() => {
    if (cartData && cartData?.ToatalAmount > 0) {
      setAmount(cartData?.ToatalAmount);
    }
  }, [cartData]);

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
      <Modal
        title={<div className="bolder large-text">Payment Error</div>}
        opened={statusError}
        onClose={setStatusError}
        centered
        size={"auto"}
      >
        <Divider
          my="lg"
          label={
            <div className="bold medium-text primary-colour">
              Payment Details
            </div>
          }
        />
        <div className="order-unsucessful">
          <BiErrorCircle className="unsuccess-icn" />
          <div>
            <div className="small-text primary-colour bold">Order Id</div>
            <div className="bold">{orderID}</div>
          </div>
          <div>
            <div className="small-text primary-colour bold">Name</div>
            <div className="bold">
              {payer?.name?.given_name + " " + payer?.name?.surname}
            </div>
          </div>
          <div>
            <div className="small-text primary-colour bold">Email</div>
            <div className="bold">{payer?.email_address}</div>
          </div>
        </div>
        <div className="flex-center small-padding text-red bold">
          {ErrorMessage}
        </div>
        <div style={{ padding: "1rem 0" }} className="flex-center">
          <CustomButton
            loading={loading}
            label={"Go back to cart"}
            action={() => setStatusError(false)}
          />
        </div>
      </Modal>
      <Modal
        title={<div className="bolder large-text">Order Successful</div>}
        opened={success}
        onClose={() => navigateTo("/dashboard")}
        centered
        size={"auto"}
      >
        <Divider
          my="lg"
          label={
            <div className="bold medium-text primary-colour">
              Payment Details
            </div>
          }
        />
        <div className="order-sucessful">
          <FaCheck className="success-icn" />
          <div>
            <div className="small-text primary-colour bold">Order Id</div>
            <div className="bold">{orderID}</div>
          </div>
          <div>
            <div className="small-text primary-colour bold">Name</div>
            <div className="bold">
              {payer?.name?.given_name + " " + payer?.name?.surname}
            </div>
          </div>
          <div>
            <div className="small-text primary-colour bold">Email</div>
            <div className="bold">{payer?.email_address}</div>
          </div>
        </div>
        <Divider
          my="lg"
          label={
            <div className="bold medium-text primary-colour">
              Ordered Topics
            </div>
          }
        />
        <m.div
          className="shp-list-main"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {list?.map((subject) => (
            <m.div
              className="shp-list-main__each"
              key={subject.id}
              variants={item}
            >
              <FaBook className="shp-list-icn" />
              <div className="flex-small-gap-column">
                <div className="large-text bold red-shade-colour">
                  {subject.chapterTitle}
                </div>
                <div className="small-text bold primary-colour">
                  {subject.chapterDescription}
                </div>
              </div>
              <div className="flex-small-gap-column">
                <div className="small-text primary-colour bold">Subject</div>
                <div className="bolder">{subject.subjectName}</div>
              </div>
              <div className="flex-small-gap-column">
                <div className="small-text primary-colour bold">Standard</div>
                <div className="bolder">{subject.chapterStandard}</div>
              </div>
              <div className="flex-small-gap-column">
                <div className="small-text primary-colour bold">Price</div>
                <div className="bolder">{subject.chapterPrice}</div>
              </div>
            </m.div>
          ))}
        </m.div>
        <Divider my="lg" label={""} />
        <div className="shp-list-main__total-amount">
          <div className="bold primary-colour">{`${list.length} item('s) purchased`}</div>
          <div className="bold">{`Total Amount paid is $${amount}`}</div>
        </div>
        <Divider my="lg" label={""} />
        <div
          style={{ padding: "1rem 0" }}
          className="flex-small-gap flex-center"
        >
          {/* <CustomButton action={handleClose} label={"Cancel"} color={"gray"} /> */}
          <CustomButton
            loading={loading}
            label={"Proceed to Dashboard"}
            action={() => navigateTo("/dashboard")}
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
              {cartData.data.map((subject) => (
                <m.div
                  className="shp-list-main__each"
                  key={subject.id}
                  variants={item}
                >
                  <FaBook className="shp-list-icn" />
                  <div className="flex-small-gap-column">
                    <div className="large-text bold red-shade-colour">
                      {subject.chapterTitle}
                    </div>
                    <div className="small-text bold primary-colour">
                      {subject.chapterDescription}
                    </div>
                  </div>
                  <div className="flex-small-gap-column">
                    <div className="small-text primary-colour bold">
                      Subject
                    </div>
                    <div className="bolder">{subject.subjectName}</div>
                  </div>
                  <div className="flex-small-gap-column">
                    <div className="small-text primary-colour bold">
                      Standard
                    </div>
                    <div className="bolder">{subject.chapterStandard}</div>
                  </div>
                  <div className="flex-small-gap-column">
                    <div className="small-text primary-colour bold">Price</div>
                    <div className="bolder">{subject.chapterPrice}</div>
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
            {cartData.ToatalAmount ? (
              <m.div
                className="shp-list-main__total-amount"
                animate={{ opacity: 1, y: "0" }}
                initial={{ opacity: 0, y: "20px" }}
                transition={{ duration: "0.8" }}
              >
                <div>
                  <div className="mid-large-text bold">
                    Choose your payment method
                  </div>
                  <div className="primary-colour">
                    {cartData.data.length + ` item('s) present within cart`}
                  </div>
                </div>
                <div className="shp-list-main__each small-padding">
                  <div>
                    <div className="small-text primary-colour">
                      Total Amount
                    </div>
                    <div className="large-text bold">
                      {cartData.ToatalAmount}
                    </div>
                  </div>
                  <PayPalScriptProvider options={PayPalOptions}>
                    <PayPalButtons
                      style={{ layout: "vertical" }}
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                    />
                  </PayPalScriptProvider>
                </div>
              </m.div>
            ) : (
              <m.div
                className="small-margin-bottom"
                animate={{ opacity: 1, y: "0" }}
                initial={{ opacity: 0, y: "20px" }}
                transition={{ duration: "0.8" }}
              >
                <div className="large-text flex-center">
                  <p className="bold">No Subjects in Cart</p>
                </div>
              </m.div>
            )}
          </>
        )}
      </div>
    </m.div>
  );
}

export default Cart;
