import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { deleteData, useDataFetching } from "@/service/apiCalls/Fetcher";

const AccountDetailsModal = ({
  t,
  onValueAccDetailsChange,
  onvalueUserChange,
  onValueMailChange,
  onValuePasswordChange,
  data,
}) => {
  const value = false;
  const username = true;
  const mail = true;
  const password = true;
  const router = useRouter();

  const closeModal = () => {
    onValueAccDetailsChange(value);
  };

  const editUsername = () => {
    onvalueUserChange(username);
  };

  const editMail = () => {
    onValueMailChange(mail);
  };

  const editPassword = () => {
    onValuePasswordChange(password);
  };
  const handleDelete = async () => {
    console.log("delete account");
    var token = `Bearer ${localStorage.getItem("token")}`;
    console.log(token);
    const url = `${process.env.NEXT_PUBLIC_BaseUrl}api/user/delete_user/${data.email}`;
    var response = await deleteData(url, token);
    if (response.statusCode === 200) {
      router.push("/");
    }
  };

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

          <div className="pb-10 px-10 bg-white rounded-lg m-auto py-4">
            <h4 className="text-3xl text-semibold mb-2 text-black text-center">
              {t("acctset")}
            </h4>
            <p className="mb-2 text-black">
              {t("accountdetails")} {data.gender == 1 ? "Female" : "Male"}{" "}
              account.
            </p>
            <div className="flex gap-2 justify-center">
              <p>
                {t("username")}: {data.userName}
              </p>
              <button className="text-pink" onClick={editUsername}>
                {t("edit")}
              </button>
            </div>
            <div className="flex gap-2 justify-center">
              <p>
                {t("phonenumber")}: {data.phoneNumber}{" "}
              </p>
              <button className="text-pink" onClick={editMail}>
                {t("edit")}
              </button>
            </div>
            <div className="flex gap-2 justify-center">
              <p>{t("password")}</p>
              <button className="text-pink" onClick={editPassword}>
                {t("edit")}
              </button>
            </div>
            <p className="mb-2">{t("note")}.</p>
            <button className="btn-custom" onClick={handleDelete}>
              {t("del")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetailsModal;
