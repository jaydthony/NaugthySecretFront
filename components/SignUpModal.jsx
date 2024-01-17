import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const SignupModal = ({ onClosedChange }) => {
  const close = false;
  const closeModal = () => {
    onClosedChange(close);
  };
  const [isLoading, setIsLoadin] = useState(false);
  function myTime(callback, delay) {
    setTimeout(callback, delay);
  }
  myTime(() => {
    if (navigator.onLine) {
      setIsLoadin(true);
    }
  }, 2000);

  return (
    <>
      {isLoading && (
        <div className="modal-overlay">
          <div className="relative contain-modal-content rounded-lg">
            <div
              className="modal-content bg-white pd-sm rounded-lg overflow-scroll"
              style={{ height: "75%" }}
            >
              <h4 className="modal-header">Signup to continue chatting</h4>
              <form className="register text-start">
                <div className="mb-4">
                  <label for="email" className="mb-3">
                    Email
                  </label>
                  <input type="text" placeholder="Email" className="w-full" />
                </div>
                <div className="mb-4">
                  <label for="username" className="mb-3">
                    Username
                  </label>
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full"
                  />
                </div>
                <div className="mb-4">
                  <label for="password" className="mb-3">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    className="w-full"
                  />
                </div>
                <div className="mb-5 flex align-center">
                  <input type="checkbox" className="accept mr-4 w-full" />
                  <p>
                    I am over 18 years old and I accept the{" "}
                    <button className="text-pink ml-auto">
                      Terms & Conditions.
                    </button>
                  </p>
                </div>
                <button
                  className="rounded-md bg-pink text-white font-extrabold py-4 px-10 mb-4 mx-auto"
                  type="submit"
                >
                  Continue chatting
                </button>
              </form>
              <button className="text-pink underline">
                I already have an account
              </button>
            </div>
            <button onClick={closeModal}>
              <FontAwesomeIcon icon={faTimes} className="f-icon ab-position" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SignupModal;
