// import { RiUserSearchLine } from "react-icons/ri";
// import { AiOutlineUsergroupAdd } from "react-icons/ai";
// import { HiOutlineDocumentReport } from "react-icons/hi";
// import { RiFileUserLine } from "react-icons/ri";

export const cards = (isLoggedIn) => [
  {
    id: 1,
    name: "card1",
    title: "English",
    description: "Contains 14 Chapters with 120 sections.",
    permission: true,
    path: "/dashboard/english",
  },
  {
    id: 2,
    name: "card2",
    title: "Maths",
    description: "",
    permission: true,
    path: "/dashboard/maths",
  },
  // {
  //   id: 3,
  //   name: "card3",
  //   icon: RiUserSearchLine,
  //   title: "Add Company ",
  //   description: "To add a company to the database if not already registered.",
  //   permission: true,
  //   path: "/searchcv",
  // },
  // {
  //   id: 4,
  //   name: "card4",
  //   icon: RiFileUserLine,
  //   title: "Add Worker",
  //   description: "To add a worker to a specific company.",
  //   permission: true,
  //   path: "/create/workerPersonalDetail",
  // },
  // {
  //   id: 5,
  //   name: "card5",
  //   icon: AiOutlineUsergroupAdd,
  //   title: "Manage Embassy",
  //   description: "To add or manage the profiles of the embassy.",
  //   permission: true,
  //   path: "/userManage",
  // },
  // {
  //   id: 6,
  //   name: "card6",
  //   icon: HiOutlineDocumentReport,
  //   title: "Manage Sub Admin",
  //   description: "To add or manage the profiles of the Sub Admin.",
  //   permission: true,
  //   path: "/userReport",
  // },
];

export const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const item = {
  hidden: {
    opacity: 0,
    y: "100px",
  },
  show: {
    opacity: 1,
    y: "0px",
    delay: 1,
    transition: {
      type: "spring",
      stiffness: 40,
      damping: 9,
    },
  },
};
