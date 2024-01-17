import React from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { postDataAuth } from "@/service/apiCalls/Fetcher";
import { useRouter } from "next/router";

function AccountDropdown({ onClose, onValueProfileInfo, data, t }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const value = true;
  const router = useRouter();
  const openModal = () => {
    setAnchorEl(null);
    onValueProfileInfo(value);
  };

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
    onClose();
  };
  const handleClose = async () => {
    var token = `Bearer ${localStorage.getItem("token")}`;

    const url = `${process.env.NEXT_PUBLIC_BaseUrl}api/user/logout?loginEmail=${data.email}`;
    console.log(url);
    var response = await postDataAuth(url, "", token);
    if (response.statusCode === 200) {
      localStorage.removeItem("token");
      router.push("/");
    }
  };

  return (
    <div>
      <button onClick={handleOpen} className="px-auto">
        {t("account")}
      </button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        keepMounted
      >
        <div>
          <MenuItem onClick={openModal}>{t("settings")}</MenuItem>
          <MenuItem onClick={handleClose}>{t("logout")}</MenuItem>
        </div>
      </Menu>
    </div>
  );
}
export default AccountDropdown;
