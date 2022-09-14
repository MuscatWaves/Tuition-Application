import React, { useEffect } from "react";
import { useQuery } from "react-query";
import Cookies from "universal-cookie";
import axios from "axios";

const ManageAccess = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const { data = [], isFetching } = useQuery(
    ["adminManageAccess"],
    () =>
      axios.get("/api/access", {
        headers: {
          Authorization: token,
        },
      }),
    { refetchOnWindowFocus: false }
  );

  console.log(data);

  useEffect(() => {
    document.title = "Admin - Manage Access";
    // eslint-disable-next-line
  }, []);
  return <div>ManageAccess</div>;
};

export default ManageAccess;
