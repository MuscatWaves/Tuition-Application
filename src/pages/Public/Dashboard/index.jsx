import React from "react";
import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";
import { m } from "framer-motion";
// import { cards, container, item } from "./constants";
// FaBook,
import { FaUserCircle, FaShopify } from "react-icons/fa";
import { ImFilesEmpty } from "react-icons/im";
import { MdOutlineGrade } from "react-icons/md";
import { FiMail } from "react-icons/fi";
import { removeUnderScore } from "../../../utilities";
import { useQuery } from "react-query";
import Cookies from "universal-cookie";
import axios from "axios";
import moment from "moment";
import "./dashboard.css";

const Dashboard = () => {
  // const [isLoggedIn, setLoggedIn] = useState({});
  const cookies = new Cookies();
  const token = cookies.get("token");
  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(path);
  };

  const test_subjects = [];

  const {
    data: basicDetApi = {},
    // isFetching: basicDetFetching,
    // refetch: basicDetRefetch,
  } = useQuery(
    ["basicDetailsFetch"],
    () =>
      axios.get(`/api/studentprofile/basic`, {
        headers: {
          Authorization: token,
        },
      }),
    { refetchOnWindowFocus: false, select: (data) => data.data.data[0] }
  );

  const {
    data: eduDetApi = {},
    // isFetching,
    // refetch,
  } = useQuery(
    ["educationDetailsFetch"],
    () =>
      axios.get(`/api/studentprofile/education`, {
        headers: {
          Authorization: token,
        },
      }),
    { refetchOnWindowFocus: false, select: (data) => data.data.data[0] }
  );

  const basicDetails = {
    gender: basicDetApi?.Gender || "Not Provided",
    createdAt:
      moment(basicDetApi?.createdAt).format("DD MMM, YYYY") || "Not Provided",
    date_of_birth:
      moment(basicDetApi?.dob).format("DD MMM, YYYY") || "Not Provided",
    location: basicDetApi?.country || "Not Provided",
  };

  const educationDetail = {
    course: eduDetApi?.course || "Not Provided",
    specialization: eduDetApi?.specialization || "Not Provided",
    university: eduDetApi?.university || "Not Provided",
    location: eduDetApi?.location || "Not Provided",
    passingYear: eduDetApi?.passingYear || "Not Provided",
  };

  return (
    <m.div
      className="tuition-dashboard-page"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
      <Header />
      <div className="mtd-wrapper">
        <div className="mtd-info-box">
          <div className="tuition-wt">
            <div className="larger-text bold text-white-light">Welcome</div>
            <FaUserCircle
              style={{
                width: "150px",
                height: "150px",
                color: "var(--red-shade-color)",
                backgroundColor: "#fff",
                borderRadius: "50%",
              }}
            />
            <div className="large-text bolder text-white-light">Test User</div>
            <div className="tuition-wt-inner">
              <div>
                <div className="flex-small-gap">
                  <FiMail
                    style={{
                      width: "20px",
                      height: "20px",
                      color: "var(--red-shade-color)",
                    }}
                  />
                  <div className="small-text bold red-shade-colour">Email</div>
                </div>
                <div className="bold">test@outlook.com</div>
              </div>
              <div>
                <div className="flex-small-gap">
                  <MdOutlineGrade
                    style={{
                      width: "20px",
                      height: "20px",
                      color: "var(--red-shade-color)",
                    }}
                  />
                  <div className="small-text bold red-shade-colour">Grade</div>
                </div>
                <div className="bold">Grade 2</div>
              </div>
            </div>
          </div>
          <div className="bolder text-white-light">
            &copy; Powered by Accadia Tuitions
          </div>
        </div>
        <div className="mtd-main-box">
          <div className="mtd-main-box__inner">
            <div className="mtd-main-box__b-1">
              <div className="red-shade-colour large-text bold small-margin-bottom">
                Basic Details
              </div>
              <div className="mtd-main-box__b-1__grid-2">
                {Object.keys(basicDetails).map((detail) => (
                  <div key={detail}>
                    <div className="small-text bold red-shade-colour">
                      {removeUnderScore(detail)}
                    </div>
                    <div className="bold">{basicDetails[detail]}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mtd-main-box__b-2">
              <div className="red-shade-colour large-text bold small-margin-bottom">
                Education Details
              </div>
              <div className="mtd-main-box__b-1__grid-3">
                {Object.keys(educationDetail).map((detail) => (
                  <div key={detail}>
                    <div className="small-text bold red-shade-colour">
                      {removeUnderScore(detail)}
                    </div>
                    <div className="bold">{educationDetail[detail]}</div>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="mtd-main-box__b-3"
              onClick={() => navigateTo("/shop")}
            >
              <FaShopify className="mtd-main-box__shopping-icon" />
              <div className="bold large-text">Shop</div>
            </div>
          </div>
          <div className="mtd-subject-container">
            <div className="red-shade-colour large-text bold small-margin-bottom">
              My Subjects
            </div>
            {test_subjects.length === 0 ? (
              <div className="mtd__no-subjects-subscribed">
                <ImFilesEmpty className="mtd-main-box__shopping-icon primary-colour" />
                <div className="bold large-text">No Subjects Subscribed</div>
                <div className="red-shade-colour bold">
                  Please head over to Shop to purchase subjects!
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </m.div>
  );
};

export default Dashboard;
