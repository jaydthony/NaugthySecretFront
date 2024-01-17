import React from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import CustomModal from "./CustomModal";
import { useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "@/service/apiCalls/Fetcher";

import PurchaseTime from "./ForgotPasswordMail";
import PurchaseTimeModal from "./PurchaseTimeModal";

function BalanceDropDown({ time, t }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [balanceModal, setBalanceModal] = useState(false);

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
      <button onClick={handleOpen} className="text-center">
        {t("balance")}
      </button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
      >
        <div>
          <MenuItem onClick={handleClose}>
            {time} {t("minute")}
          </MenuItem>
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
export default BalanceDropDown;
