import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { patchDataAuth } from "@/service/apiCalls/Fetcher";

const EmailModal = ({ onValueEmailChange, data }) => {
  const value = false;
  const closeModal = () => {
    onValueEmailChange(value);
  };

  const initialValues = {
    firstName: data.firstName,
    lastName: data.lastName,
    gender: data.gender,
    phoneNumber: "",
    userName: data.userName,
  };
  const numberValidationSchema = Yup.object({
    phoneNumber: Yup.string().required("Phone Number is required"),
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
        onValueEmailChange(value);
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
                Change phone number
              </h4>
              <Formik
                initialValues={initialValues}
                validationSchema={numberValidationSchema}
                onSubmit={handleSubmit}
              >
                {({ isValid }) => (
                  <Form className="register">
                    <div className="mb-4">
                      <label htmlFor="phoneNumber" className="mb-3">
                        Enter phone number
                      </label>
                      <Field
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        className="w-full"
                      />
                      <ErrorMessage
                        name="phoneNumber"
                        component="span"
                        style={{ color: "red" }}
                      />
                    </div>

                    <button
                      className={`btn-custom ${
                        !isValid ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      type="submit"
                      disabled={!isValid}
                    >
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

export default EmailModal;
