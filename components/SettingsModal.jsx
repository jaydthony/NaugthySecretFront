import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const SettingsModal = ({ onChangeSettingModal, t }) => {
  const router = useRouter();
  const [isGender, setIsGender] = useState(null);

  const closeModal = () => {
    const value = false;
    onChangeSettingModal(value);
  };
  useEffect(() => {
    const localGender = localStorage.getItem("gender");
    setIsGender(localGender);
  }, []);

  function handleHome() {
    localStorage.removeItem("gender");
    window.location.reload();
  }

  return (
    <div className=" border-b-2 py-2 md:border-0">
      <div className="modal-overlay">
        <div className="relative contain-modal-content rounded-lg">
          <div className="modal-content  bg-white p-4  text-center ">
            <h1 className="modal-header">{t("visitor")}</h1>
            <p className="text-gray-700 mb-8">
              {t("accountdetails")}{" "}
              <span className="font-bold">{isGender} </span>
              {t("vis")}{" "}
              <button className="text-pink underline" onClick={handleHome}>
                {" "}
                {t("clickhere")}
              </button>
              {t("resetgender")}
            </p>
            <button
              className="rounded-md bg-pink text-white font-extrabold py-4 px-10 m-auto"
              onClick={closeModal}
            >
              {t("close")}
            </button>
            <button onClick={closeModal}>
              <FontAwesomeIcon icon={faTimes} className="f-icon ab-position" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
