import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { fetchData } from "@/service/apiCalls/Fetcher";
import Image from "next/image";

const ViewCamGirl = ({ onValueCloseViewChange, camId }) => {
  const [userInfo, setUserInfo] = useState("");

  console.log(camId + "view spec id!");
  const closeModal = () => {
    const value = false;
    onValueCloseViewChange(value);
  };

  const fetchCamgirlData = async () => {
    try {
      const token = `Bearer ${localStorage.getItem("token")}`;
      const Url = `${process.env.NEXT_PUBLIC_BaseUrl}api/camgirl/${camId}`;
      const responseInfo = await fetchData(Url, token);
      console.log(responseInfo.result);
      setUserInfo(responseInfo.result);
    } catch (error) {
      alert(error.response.data.errorMessages[0]);
      setUserInfo("");
    }
  };

  useEffect(() => {
    fetchCamgirlData();
  }, [camId]);

  return (
    <>
      {!userInfo ? (
        <div className="flex items-center justify-center items-center top-0">
          <Image
            src="/asset/loading.gif"
            alt="Example GIF"
            width={100}
            height={80}
          />
        </div>
      ) : (
        <div className="modal-overlay">
          <div
            className="border-b-2 md:border-0 bg-white rounded-md relative rounded-lg md:p-10 p-5"
          >
            <h1 className="modal-header">Camgirl details</h1>
            <p className="text-gray-700">First Name: {userInfo.firstName}</p>
            <p className="text-gray-700">Last Name: {userInfo.lastName}</p>
            <p className="text-gray-700">User Name: {userInfo.userName}</p>
            <p className="text-gray-700">Email: {userInfo.email}</p>
            <button onClick={closeModal}>
              <FontAwesomeIcon icon={faTimes} className="f-icon ab-position" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewCamGirl;
