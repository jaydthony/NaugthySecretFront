import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faTimes } from "@fortawesome/free-solid-svg-icons";
import SettingsModal from "./SettingsModal";
import SupportModal from "./SupportModal";
import SignUpModal from "./SignUpModal";

import SelectInputForm from "./SelectInputForm";
import SignupLoginFemale from "./SignupLoginFemale";
import SignupFemale from "./SignupFemale";

import SignupSuccessModal from "./SignUpSuccessModal";

import SignupLogin from "./SignupLogin";
import ForgotPasswordModal from "./ForgotPasswordModal";
import ForgotPasswordMail from "./ForgotPasswordMail";

export default function HeroSection({ t }) {
  const [token, setToken] = useState(null);
  const [gender, setGender] = useState(null);

  const [male, setMale] = useState(null);
  const [female, setFemale] = useState(null);

  useEffect(() => {
    const localGender = localStorage.getItem("gender");
    setGender(localGender);
    if (gender === "male") {
      setMale(gender);
      console.log(gender);
    }
    if (gender === "female") {
      setFemale(gender);
      console.log(gender);
    }
  }, [gender]);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showSignLogModal, setShowSignLogModal] = useState(false);
  const [showFemaleLogin, setShowFemaleLogin] = useState(false);
  const [showSignupFemale, setShowSignupFemale] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showSignupSuccess, setShowSignupSuccess] = useState(false);
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);
  const [loginF, setLoginF] = useState(false);
  const [signupF, setSignupF] = useState(false);
  const [forgotPasswordmail, setForgotPasswordmail] = useState(false);
  const [forgotUserMail, setForgotUserMail] = useState("");
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

  const handleLogin = () => {
    setLogin(true);
    setSignup(false);

    setShowSignLogModal(true);
    setIsOpen(false);
  };
  const handleSignupSuccess = () => {
    setLogin(true);
    setSignup(false);

    setShowSignLogModal(true);
    setIsOpen(false);
  };
  const handleLoginF = () => {
    setLoginF(true);
    setSignupF(false);
    setShowFemaleLogin(true);
    setIsOpen(false);
  };
  const handleSignupF = () => {
    setShowSignupFemale(true);
    setIsOpen(false);
  };
  const handleSignUp = () => {
    setLogin(false);
    setSignup(true);

    setShowSignLogModal(true);
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
    setShowSignLogModal(false);
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
  const handleUserForgotEmail = (value) => {
    console.log(value);
    setForgotUserMail(value);
  };
  const handleForgotSuccessful = (value) => {
    setForgotPasswordmail(value);
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

                    {female && (
                      <button
                        onClick={handleSignupF}
                        className="block border-b-2 py-2 md:border-0 w-full"
                      >
                        {t("signup")}
                      </button>
                    )}

                    <button
                      onClick={handleLogin}
                      className="block border-b-2 py-2 md:border-0 w-full"
                    >
                      {t("login")}
                    </button>

                    {male && (
                      <button
                        onClick={handleSignUp}
                        className="block border-b-2 py-2 md:border-0 w-full"
                      >
                        {t("signup")}
                      </button>
                    )}
                    <button
                      onClick={openSettings}
                      className="border-b-2 py-2 md:border-0"
                    >
                      {t("setting")}
                    </button>
                    <button
                      onClick={openSupportModal}
                      className=" border-b-2 py-2 md:border-0"
                    >
                      {t("supports")}
                    </button>
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
            {male && (
              <button onClick={handleLogin}>
                <FontAwesomeIcon icon={faUser} className="f-icon" />
              </button>
            )}
            {female && (
              <button onClick={handleLogin}>
                <FontAwesomeIcon icon={faUser} className="f-icon" />
              </button>
            )}
          </ul>
        </nav>
      </div>
      {showSettings && (
        <SettingsModal onChangeSettingModal={handleSettingsChange} t={t} />
      )}
      {showSupportModal && (
        <SupportModal onValueSupportChange={handleSupportChange} t={t} />
      )}
      {showSignLogModal && (
        <SignupLogin
          log={login}
          t={t}
          sign={signup}
          onValueSignChange={handleValueChange}
          onValueForgotChange={handleForgotChange}
          onValueSignupSuccessChange={handleSignupSuccessChange}
          signF={signupF}
          onValueFemaleSignChange={handleFemaleValueChange}
          onValueFemaleSignupChanged={handleFemaleValueChangePopup}
        />
      )}

      {showSignupModal && <SignUpModal onClosedChange={handleClosedChange} />}
      {showFemaleLogin && (
        <SignupLoginFemale
          logF={loginF}
          signF={signupF}
          onValueFemaleSignChange={handleFemaleValueChange}
          onValueFemaleSignupChanged={handleFemaleValueChangePopup}
          onValueForgotChange={handleForgotChange}
        />
      )}
      {showForgotModal && (
        <ForgotPasswordModal
          onValueForgotClose={handleValueForgotClose}
          onHandleUserForgotEmail={handleUserForgotEmail}
          onValueForgotSuccessful={handleForgotSuccessful}
        />
      )}
      {forgotPasswordmail && (
        <ForgotPasswordMail forgotUserMail={forgotUserMail} />
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
            </div>
            <div className="flex gap-3 items-center">
              <button
                onClick={openSettings}
                className="border-b-2 py-2 md:border-0"
              >
                {t("settings")}
              </button>

              {female && (
                <button
                  onClick={handleSignupF}
                  className="block border-b-2 py-2 md:border-0 w-full"
                >
                  {t("signup")}
                </button>
              )}

              <button
                onClick={handleLogin}
                className="block border-b-2 py-2 md:border-0 w-full"
              >
                {t("login")}
              </button>

              {male && (
                <button
                  onClick={handleSignUp}
                  className="block border-b-2 py-2 md:border-0 w-full"
                >
                  {t("signup")}
                </button>
              )}
            </div>
          </div>
        </nav>
        {showSignupFemale && (
          <SignupFemale
            t={t}
            onValueCloseSignChange={handleCloseSignChange}
            onValueLoginChange={handleSignupSuccess}
          />
        )}

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
        {male && (
          <button
            onClick={handleLogin}
            className="rounded-md bg-pink text-white font-extrabold py-4 px-10 mb-4"
          >
            {t("start")}
          </button>
        )}
        {female && (
          <button
            onClick={handleLogin}
            className="rounded-md bg-pink text-white font-extrabold py-4 px-10 mb-4"
          >
            {t("start")}
          </button>
        )}
        <p>{t("cam")}</p>
      </div>
    </section>
  );
}
