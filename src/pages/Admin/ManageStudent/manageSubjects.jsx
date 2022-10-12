import { Modal } from "@mantine/core";
import React from "react";

const ManageSubjects = ({
  isModalOpen,
  toggleModal,
  data,
  setData,
  token,
  refetch,
}) => {
  const handleClose = () => {
    toggleModal(false);
  };

  return (
    <Modal
      title={<div className="bolder large-text">Manage Subjects</div>}
      opened={isModalOpen}
      onClose={handleClose}
    >
      {" "}
    </Modal>
  );
};

export default ManageSubjects;
