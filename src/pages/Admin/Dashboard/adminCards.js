const checkPermission = (service, data) => {
  return data.filter((each) => service === each.service)[0];
};

export const adminCards = (isLoggedIn) => [
  {
    id: 1,
    title: "Manage Accounts",
    description: "Create, Update & Delete any account",
    permission: true,
    path: "/admin/manageAccount",
  },
  {
    id: 2,
    title: "Manage Access",
    description: "Create, Update & Delete any access",
    permission: true,
    path: "/admin/manageAccess",
  },
  {
    id: 3,
    title: "Manage Subjects",
    description: "Create, Update & Delete any subjects",
    permission:
      checkPermission("subject", isLoggedIn.access).readAccess || false,
    path: "/admin/manageSubject",
  },
  {
    id: 4,
    title: "Manage Chapters",
    description: "Create, Update & Delete any chapter",
    permission: true,
    path: "/admin/manageChapter",
  },
];
