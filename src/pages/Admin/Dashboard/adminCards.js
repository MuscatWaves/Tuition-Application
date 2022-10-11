import { checkPermission } from "../../../utilities";

export const adminCards = (isLoggedIn) => [
  {
    id: 1,
    title: "Manage Accounts",
    description: "Create, Update & Delete any account",
    permission: isLoggedIn.data[0].id === 1,
    path: "/admin/manageAccount",
  },
  {
    id: 2,
    title: "Manage Access",
    description: "Create, Update & Delete any access",
    permission: isLoggedIn.data[0].id === 1,
    path: "/admin/manageAccess",
  },
  {
    id: 3,
    title: "Manage Subjects",
    description: "Create, Update & Delete any subjects",
    permission: checkPermission("subject", isLoggedIn.access).readAccess,
    path: "/admin/manageSubject",
  },
  {
    id: 4,
    title: "Manage Chapters",
    description: "Create, Update & Delete any chapter",
    permission: checkPermission("chapter", isLoggedIn.access).readAccess,
    path: "/admin/manageChapter",
  },
  {
    id: 5,
    title: "Manage Students",
    description: "Create, Update & Delete any Student",
    permission: checkPermission("student", isLoggedIn.access).readAccess,
    path: "/admin/manageStudent",
  },
];
