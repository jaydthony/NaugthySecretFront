import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDataFetching } from "@/service/apiCalls/Fetcher";
const SignupSuccessModal = ({ onValueCloseSuccessSignup }) => {
  const closeSuccess = false;
  const closeModal = () => {
    onValueCloseSuccessSignup(closeSuccess);
  };

  const { data, error } = useDataFetching("/api/data");
  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }
  // if (!data) {
  //   return <div>loading...</div>;
  // }
  return (
    <div className="modal-overlay">
      <div className="relative contain-modal-content rounded-lg">
        <div
          className="modal-content bg-white rounded-lg"
          style={{ height: "75%" }}
        >
          <button onClick={closeModal}>
            <FontAwesomeIcon icon={faTimes} className="f-icon ab-position" />
          </button>

          <div className="pb-10 px-10 bg-white rounded-lg m-auto text-center">
            <h4 className="text-2xl text-semibold mb-2">Link sent to</h4>
            <p className="text-pink mb-2">hhabbey05@gmail.com</p>
            <p>Why confirm?</p>
            <div className="flex justify-center align-center">
              <Image
                src="/asset/green-mark.png"
                title="approved icons"
                height={24}
                width={24}
                className="mr-3"
                alt="A marker icon"
              />
              <p>Faster Matchmaking</p>
            </div>
            <p className="mb-2">Can&apos;t find our email?</p>

            <button className="btn-custom" type="submit">
              Resend activation link!
            </button>
            <button className="btn-custom" type="submit">
              I will do this later
            </button>
            <p className="mb-2">OR</p>
            <h4 className="text-xl font-bold text-pink mb-2">
              Update your email address
            </h4>
            <p className="mb-2">Your current email address:</p>
            <p className="text-xl text-pink mb-2">hhabbey05@gmail.com</p>
            <form className="register">
              <div className="mb-4">
                <label for="email" className="mb-3">
                  Email
                </label>
                <input
                  type="text"
                  placeholder="Your new email address"
                  className="w-full"
                />
              </div>
              <button className="btn-custom" type="submit">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupSuccessModal;
