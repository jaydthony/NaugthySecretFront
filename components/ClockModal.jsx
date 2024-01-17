import React from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import CustomModal from "./CustomModal";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";

import PurchaseTimeModal from "./PurchaseTimeModal";
import { fetcher } from "@/service/apiCalls/Fetcher";
function ClockBalanceDropDown({ min, t }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [balanceModal, setBalanceModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const showMinuteModal = () => {
    setBalanceModal(true);
    setAnchorEl(null);
  };
  const handleValueChange = (value) => {
    setBalanceModal(value);
  };

  return (
    <div>
      <button onClick={handleOpen} className="text-center md:hidden">
        <Image
          src="/favicon_io/time-3487.svg"
          height={30}
          width={30}
          alt="A clock icon"
        />
      </button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
      >
        <div>
          <MenuItem onClick={handleClose}>
            {min} {t("minute")}
          </MenuItem>
          {/* <MenuItem onClick={handleClose}>{data} minutes</MenuItem> */}
          <MenuItem className="text-pink" onClick={showMinuteModal}>
            {t("bmin")}
          </MenuItem>
        </div>
      </Menu>
      {balanceModal && (
        <PurchaseTimeModal onValueChange={handleValueChange} t={t} />
      )}
    </div>
  );
}
export default ClockBalanceDropDown;
