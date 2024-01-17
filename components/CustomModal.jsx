import React from "react";
// import { Modal } from "@material-ui/core";
import Modal from "@mui/material/Modal";

const CustomModal = ({ open, onClose, children }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      // Add Tailwind CSS classes to the container
      className="flex items-center mt-10 justify-center"
    >
      <div className="md:w-3/4">
        <div className="md:w-1/2 m-auto w-3/4 relative">{children}</div>
      </div>
    </Modal>
  );
};

export default CustomModal;
