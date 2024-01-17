import { useState } from "react";
import React from "react";
import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { patchDataAuth } from "@/service/apiCalls/Fetcher";

const UserName = ({ onValueUsernameChange, data }) => {
  const value = false;
  const closeModal = () => {
    onValueUsernameChange(value);
  };

  const initialValues = {
    firstName: data.firstName,
    lastName: data.lastName,
    gender: data.gender,
    phoneNumber: data.phoneNumber,
    userName: "",
  };
  console.log(data.email);
  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("Username is required"),
  });

  const handleSubmit = async (values) => {
    console.log(values.userName);
    console.log(values.firstName);
    console.log(values.lastName);
    console.log(values.phoneNumber);

    try {
      const token = `Bearer ${localStorage.getItem("token")}`;
      console.log(token);
      const url = `${process.env.NEXT_PUBLIC_BaseUrl}api/user/update_details/${data.email}`;
      const response = await patchDataAuth(url, values, token);
      if (response.statusCode === 200) {
        onValueUsernameChange(value);
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="relative contain-modal-content rounded-lg">
          <div
            className="modal-content bg-white rounded-lg"
            style={{ height: "75%" }}
          >
            <button onClick={closeModal}>
              <FontAwesomeIcon icon={faTimes} className="f-icon ab-position" />
            </button>

            <div className="pd-sm bg-white rounded-lg pt-10">
              <h4 className="modal-header text-black text-center mb-5">
                Change username
              </h4>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched }) => (
                  <Form className="register">
                    <div className="mb-4">
                      <label htmlFor="userName" className="mb-3">
                        Enter new username
                      </label>
                      <Field
                        type="text"
                        name="userName"
                        placeholder="Username"
                        className="w-full"
                      />
                      {errors.username && touched.username && (
                        <div className="text-red-500">{errors.userName}</div>
                      )}
                    </div>

                    <button className="btn-custom" type="submit">
                      Send
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserName;
