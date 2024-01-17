import React, { useState } from "react";
import CustomDropdown from "@/components/CustomDropdown";
import AccountDropdown from "@/components/AccountDropdown";
import BalanceDropDown from "@/components/BalanceDropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faTimes } from "@fortawesome/free-solid-svg-icons";
import SettingsModal from "@/components/SettingsModal";
import SupportModal from "@/components/SupportModal";
import ClockBalanceDropDown from "@/components/ClockModal";
import AuthChatting from "@/components/AuthChatting";
import SelectInputForm from "@/components/SelectInputForm";
import ForgotPasswordModal from "@/components/ForgotPasswordModal";
import SignupSuccessModal from "@/components/SignUpSuccessModal";
import AccountDetailsModal from "@/components/AccountDetailsModal";
import UserName from "@/components/UserName";
import EmailModal from "@/components/EmailModal";

export default function AuthComponent({ time, data, t }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showSignupSuccess, setShowSignupSuccess] = useState(false);
  const [showAccountDetails, setShowAccountDetails] = useState(false);
  const [username, setUsername] = useState(false);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);

  const handleClose = () => {
    setAnchorEl(null);
    onClose();
  };

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const openSettings = () => {
    setShowSettings(true);
    setIsOpen(false);
  };
  const openSupportModal = () => {
    setShowSupportModal(true);
    setIsOpen(false);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
    setDropdownOpen(false);
  };
  const handleValueChange = (value) => {
    setShowSignLogModal(value);
  };
  const handleClosedChange = (value) => {
    setShowSignupModal(value);
  };
  const handleFemaleValueChange = (value) => {
    setShowFemaleLogin(value);
  };
  const handleFemaleValueChangePopup = (val) => {
    setShowSignupFemale(val);
  };
  const handleCloseSignChange = (val) => {
    setShowSignupFemale(val);
  };
  const handleSettingsChange = (value) => {
    setShowSettings(value);
  };
  const handleSupportChange = (value) => {
    setShowSupportModal(value);
  };
  const handleForgotChange = (value) => {
    setShowForgotModal(value);
  };
  const handleValueForgotClose = (value) => {
    setShowForgotModal(value);
  };
  const openSignupModal = () => {
    setShowSignupModal(true);
  };
  const handleSignupSuccessChange = (value) => {
    setShowSignupSuccess(value);
  };
  const handleCloseSuccessSignup = (value) => {
    setShowSignupSuccess(value);
  };
  const handleValueProfileInfo = (value) => {
    setShowAccountDetails(value);
    setIsOpen(false);
  };
  const handleAccountDetailsChange = (value) => {
    setShowAccountDetails(value);
  };

  const handleUserChange = (value) => {
    setUsername(value);
  };
  const handleMailChange = (value) => {
    setEmail(value);
  };
  const handlePasswordChange = (value) => {
    setShowForgotModal(value);
  };
  const handleUsernameChange = (value) => {
    setUsername(value);
  };
  const handleEmailChange = (value) => {
    setEmail(value);
  };
  return (
    <section
      className="view-page md:mb-10 text-center md:pb-12 md:pt-12"
      id="element1"
    >
      <h4 className=" text-4xl text-black mb-10 hidden md:block">
        Naughty <span className="font-semibold">Secret</span>
      </h4>

      <div className="">
        <nav className="md:hidden upper">
          <ul className="flex justify-between">
            <button onClick={openModal} className="mr-auto">
              <FontAwesomeIcon icon={faBars} className="f-icon" />
            </button>
            {isOpen && (
              <div className="modalNav-overlay relative">
                <button onClick={closeModal}>
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="f-icon absolute right-[16px] top-[16px] bg-white rounded-full p-1"
                  />
                </button>
                <div
                  className=" bg-white rounded-lg text-center"
                  style={{ width: "15rem" }}
                >
                  <nav className="md:hidden bg-white text-black side-bar">
                    <SelectInputForm />

                    <button
                      onClick={openSupportModal}
                      className=" border-b-2 py-2 md:border-0"
                    >
                      {t("support")}
                    </button>

                    <div className="py-3 border-b-2">
                      <AccountDropdown
                        t={t}
                        data={data}
                        anchorEl={anchorEl}
                        onClose={handleDropdownClose}
                        onValueProfileInfo={handleValueProfileInfo}
                      />
                    </div>

                    <div className="py-3 border-b-2">
                      <BalanceDropDown className="py-3 border-b-2" t={t} />
                    </div>
                  </nav>
                </div>
              </div>
            )}
            <button className="hidden">
              <svg
                fill="#f9096c"
                width="40px"
                height="40px"
                viewBox="0 0 200 200"
                data-name="Layer 1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title />
                <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
              </svg>
            </button>

            <ClockBalanceDropDown min={time} t={t} />
          </ul>
        </nav>
      </div>
      {showSettings && (
        <SettingsModal onChangeSettingModal={handleSettingsChange} />
      )}
      {showSupportModal && (
        <SupportModal onValueSupportChange={handleSupportChange} t={t} />
      )}

      {showSignupModal && <SignUpModal onClosedChange={handleClosedChange} />}
      {showAccountDetails && (
        <AccountDetailsModal
          data={data}
          t={t}
          onValueAccDetailsChange={handleAccountDetailsChange}
          onvalueUserChange={handleUserChange}
          onValueMailChange={handleMailChange}
          onValuePasswordChange={handlePasswordChange}
        />
      )}
      {showForgotModal && (
        <ForgotPasswordModal onValueForgotClose={handleValueForgotClose} />
      )}
      {username && (
        <UserName onValueUsernameChange={handleUsernameChange} data={data} />
      )}
      {email && (
        <EmailModal onValueEmailChange={handleEmailChange} data={data} />
      )}
      <div className="card-view rounded-lg shadow-xl md:pb-36 overflow-hidden w-100 md:w-75">
        <nav className="hidden md:block bg-white text-black py-5 px-10 mb-20">
          <div className="flex">
            <div className="flex gap-3 mr-auto items-center">
              <button
                onClick={openSupportModal}
                className=" border-b-2 py-2 md:border-0"
              >
                {t("support")}
              </button>

              <CustomDropdown
                anchorEl={anchorEl}
                onClose={handleDropdownClose}
              />
            </div>
            <div className="flex gap-3 items-center">
              <AccountDropdown
                t={t}
                anchorEl={anchorEl}
                onClose={handleDropdownClose}
                onValueProfileInfo={handleValueProfileInfo}
                data={data}
              />

              <BalanceDropDown time={time} t={t} />
            </div>
          </div>
        </nav>

        {showSignupSuccess && (
          <SignupSuccessModal
            onValueCloseSuccessSignup={handleCloseSuccessSignup}
          />
        )}

        <h3 className="text-black hidden md:block text-4xl font-semibold mb-10 mt-12 md:mt-0">
          {t("head")}
        </h3>
        <h6 className="mt-3">
          <span className="font-bold text-blue">{t("men")}</span> {t("ran1")}{" "}
          <span className="text-pink font-bold">{t("women")}.</span>
        </h6>
        <h6 className="mb-3">
          <span className="text-pink font-bold">{t("women")}</span> {t("ran1")}{" "}
          <span className="men font-bold text-blue">{t("men")}.</span>
        </h6>
        <h3 className="text-black text-2xl font-semibold my-10">{t("chat")}</h3>
        <h6 className="text-semibold text-xl mb-4">{t("member")}</h6>
        <AuthChatting time={time} datas={data} t={t} />
        <p>{t("cam")}</p>
      </div>
    </section>
  );
}
