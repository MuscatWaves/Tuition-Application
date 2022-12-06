import { AiFillQuestionCircle } from "react-icons/ai";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { IoPieChartSharp } from "react-icons/io5";
import { BiPaperPlane } from "react-icons/bi";
import { FaBook } from "react-icons/fa";
import { removeUnderScore } from "../../../utilities";

export const cards = (isLoggedIn, subject, user) => [
  {
    id: 1,
    name: "card1",
    icon: FaBook,
    title: "Topic Wise Notes",
    description: "Contains topic wise notes for corresponding subject.",
    permission: true,
    path: `/tuition/${subject}/topicWiseNotes`,
  },
  {
    id: 2,
    name: "card2",
    icon: AiFillQuestionCircle,
    title: "Topic Wise QP & AP",
    description: "Question papers & Answers for each topic.",
    permission: true,
    path: `/tuition/${subject}/topicWiseQPAP`,
  },
  {
    id: 3,
    name: "card3",
    icon: MdOutlineOndemandVideo,
    title: "Explanatory Videos",
    description: "Videos for each topic.",
    permission: true,
    path: `/tuition/${subject}/explanatoryVideo`,
  },
  {
    id: 4,
    name: "card4",
    icon: BiPaperPlane,
    title: "Student Enquiries",
    description: "Specify your query with an Simple Email.",
    permission: true,
    action: () => {
      const esubject = encodeURIComponent(
        `Enquiry Email - ${removeUnderScore(subject)} | ${user}`
      );
      const body = encodeURIComponent(
        `Greetings Alamnii,\n\nHope you are doing great, I have an enquiry in "${removeUnderScore(
          subject
        )} topic."\n\nPlease explain your question here!\n\nRegards,\n${user}`
      );
      window.open(
        `mailto:a3lamnii@gmail.com?subject=${esubject}&body=${body}`,
        "_blank"
      );
    },
  },
  {
    id: 5,
    name: "card5",
    icon: HiOutlineDocumentReport,
    title: "Test Results",
    description:
      "Exclusive feature to Tuition Students for tracking test results.",
    permission: true,
    path: "/userManage",
  },
  {
    id: 6,
    name: "card6",
    icon: IoPieChartSharp,
    title: "Progress Charts",
    description:
      "Exclusive feature to Tuition Students for tracking their progress visually.",
    permission: true,
    path: "/userReport",
  },
];
