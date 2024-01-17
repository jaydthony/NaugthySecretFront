import React from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/router";

function CustomDropdown({ onClose }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { push, locale, locales } = useRouter();

  const getImagePath = (language) => {
    switch (language) {
      case "English":
        return "https://www.luckycrush.live/module/static/media/en.bf66285e.svg";
      case "Espanol":
        return "https://www.luckycrush.live/module/static/media/es.218f1963.svg";
      case "Francais":
        return "https://www.luckycrush.live/module/static/media/fr.7137f97b.svg";
      case "Portuguese":
        return "https://www.luckycrush.live/module/static/media/pt.a3c77312.svg";
      default:
        return "https://www.luckycrush.live/module/static/media/en.bf66285e.svg"; // Default to English if no match is found
    }
  };

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (selectedLanguage) => () => {
    const languageCode = selectedLanguage;
    push("/home", undefined, { locale: languageCode });
    setAnchorEl(null);
    onClose();
  };

  return (
    <div>
      <Button onClick={handleOpen}>{locale}</Button>{" "}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        keepMounted
      >
        <div className="flex p-5" style={{ width: "340px" }}>
          <div className="w-full">
            {locales.map((l) => (
              <MenuItem key={l} onClick={handleClose(l)}>
                <img
                  src={getImagePath(l)}
                  style={{
                    width: "24px",
                    height: "24px",
                  }}
                  className="mr-2"
                  alt="Country icon"
                />
                {l}
              </MenuItem>
            ))}
          </div>
        </div>
      </Menu>
    </div>
  );
}

export default CustomDropdown;
