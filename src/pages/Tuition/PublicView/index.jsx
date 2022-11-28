import React, { useEffect, useState } from "react";
import Services from "../../../components/Services";
import TopNavigation from "../../../components/TopNavigation";
import Footer from "../../../components/Footer";
import gradesImage from "../../../images/grades.svg";
import servicesImage from "../../../images/services.svg";
import subjectsImage from "../../../images/subjects.svg";
import { m } from "framer-motion";

const Tuition = () => {
  const query = Number(localStorage.getItem("tabSelected"));
  const [activeMenu, setActiveMenu] = useState(query || 1);
  const service = {
    nav: [
      {
        id: 0,
        name: "Home",
        url: "/",
      },
      {
        id: 1,
        name: "Tuition",
        url: "/tuition",
        active: true,
      },
    ],
    menu: [
      {
        id: 1,
        name: "Grades",
        description:
          "If you are in elementary, middle or high school then you are in the right place. Here we offer studies for the following grades",
        data: {
          icon: gradesImage,
          innerData: [
            { id: 1, name: "Grade 1" },
            { id: 2, name: "Grade 2" },
            { id: 3, name: "Grade 3" },
            { id: 4, name: "Grade 4" },
            { id: 5, name: "Grade 5" },
            { id: 6, name: "Grade 6" },
            { id: 7, name: "Grade 7" },
            { id: 8, name: "Grade 8" },
            { id: 9, name: "Grade 9" },
            { id: 10, name: "Grade 10" },
            { id: 11, name: "Grade 11" },
            { id: 12, name: "Grade 12" },
          ],
        },
      },
      {
        id: 2,
        name: "Subjects",
        description: "Need help in the following subjects?",
        data: {
          icon: subjectsImage,
          innerData: [
            { id: 1, name: "English" },
            { id: 2, name: "Islamic" },
            { id: 3, name: "SST" },
            { id: 4, name: "Mathematics" },
            { id: 5, name: "Sciences" },
            { id: 6, name: "Buisness" },
          ],
        },
      },
      {
        id: 3,
        name: "Services",
        description: "Get the benefit of all that we offer you today",
        data: {
          icon: servicesImage,
          innerData: [
            {
              id: 1,
              name: "Face to Face tuition",
              description:
                "Looking for someone to help with your studies and prefer physical interaction? Contact us today to find your tutor.",
            },
            {
              id: 2,
              name: "Online tuition",
              description:
                "Need help with your studies and prefer having your classes online? Contact us today to find your tutor.",
            },
            {
              id: 3,
              name: "Topic-wise notes",
              description:
                "Why waste time taking notes when you can use that time to study them?",
            },
            {
              id: 4,
              name: "Topic-wise QP & AP",
              description:
                "Want to test yourself on your topics? Get various QP’s with their answers on here!",
            },
            {
              id: 5,
              name: "Explanatory Videos",
              description:
                "Are you a visual learner? Our in-depth explanatory videos will help you out!",
            },
            {
              id: 6,
              name: "Student Enquiries",
              description:
                "Stuck on a question? Ask us and we’ll help you out!",
            },
          ],
        },
      },
    ],
    path: "/signUp/Tuition",
  };

  useEffect(() => {
    document.title = "Alamnii";
  }, []);

  return (
    <m.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
      <TopNavigation setActiveItem={setActiveMenu} />
      <Services
        service={service}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />
      <Footer setActiveItem={setActiveMenu} />
    </m.div>
  );
};

export default Tuition;
