import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { fetchData, patchDataAuth } from "@/service/apiCalls/Fetcher";

export default function EditCamGirl({ onValueCloseEditChange, camId }) {
  const [user, setUser] = useState(true);
  const { firstName, lastName, userName, phoneNumber, gender, email } = camId;
  const [isEditing, setIsEditing] = useState(false);

  console.log(camId);
  const [SignUpError, setSignUpError] = useState("");
  const [SignUpErrorState, setSignUpErrorState] = useState(false);
  const [userObject, setUserObject] = useState("");

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const fetchUser = async () => {
  //     const tokenHeader = `Bearer ${token}`;
  //     const url = `${process.env.NEXT_PUBLIC_BaseUrl}api/camgirl/${userName}}`;

  //     console.log(url);
  //     try {
  //       const response = await fetchData(url, tokenHeader);
  //       if (response.statusCode === 200) {
  //         setUserObject(response);
  //         console.log(response);
  //         console.log(userObject);
  //       }
  //     } catch (error) {
  //       console.error("Network error occurred:", error);
  //     } finally {
  //     }
  //   };

  //   fetchUser();
  // }, [userName]);

  console.log(userObject);
  const initialValues = {
    firstName,
    lastName,
    userName,
    phoneNumber,
  };
  console.log("Initial values: " + initialValues.phoneNumber);
  const validationSchema = Yup.object({
    firstName: Yup.string().required("Firstname is required"),
    lastName: Yup.string().required("Lastname is required"),
    phoneNumber: Yup.string().required("Phonenumber is required"),
    userName: Yup.string().required("Username is required"),
  });

  const handleSubmit = async (values) => {
    try {
      console.log(values.firstName);
      console.log(values.lastName);
      console.log(values.userName);
      console.log(values.phoneNumber);
      const token = `Bearer ${localStorage.getItem("token")}`;
      const url = `${process.env.NEXT_PUBLIC_BaseUrl}api/user/update_details/${email}`;

      const response = await patchDataAuth(url, values, token);
      if (response.statusCode === 200) {
        window.location.reload();
      }
      console.log("POST request successful:", response);
    } catch (error) {
      console.error("Error making POST request:", error);
      var errorMessage = error.response.data.errorMessages;
      setSignUpError(errorMessage[0]);
      setSignUpErrorState(true);
      console.log(errorMessage);
    }
  };

  const closeModal = () => {
    const value = false;
    onValueCloseEditChange(value);
  };

  return (
    <>
      <div className="modal-overlay">
        <div
          className="border-b-2 py-2 px-2 md:border-0 m-auto bg-white overflow-scroll overflow-x-hidden rounded-md"
          style={{ height: "75%" }}
        >
          <button className="btn-custom mx-auto" onClick={closeModal}>
            Close
          </button>
          {!user ? (
            <div className="flex items-center justify-center">
              <Image
                src="/asset/loading.gif"
                alt="Example GIF"
                width={100}
                height={80}
              />
            </div>
          ) : (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, handleChange }) => (
                <Form className="female-register">
                  <div className="sm:flex gap-4">
                    <div className="mb-4 w-full">
                      <label htmlFor="firstName" className="mb-3">
                        Firstname
                      </label>
                      <Field
                        type="text"
                        name="firstName"
                        value={values.firstName}
                        placeholder="Firstname"
                        className="w-full"
                      />
                      <ErrorMessage
                        name="firstName"
                        component="span"
                        style={{ color: "red" }}
                      />
                    </div>
                    <div className="mb-4 w-full">
                      <label htmlFor="lastName" className="mb-3">
                        Lastname
                      </label>
                      <Field
                        type="text"
                        name="lastName"
                        value={values.lastName}
                        placeholder="Lastname"
                        className="w-full"
                      />
                      <ErrorMessage
                        name="lastName"
                        component="span"
                        style={{ color: "red" }}
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="userName" className="mb-3">
                      Username
                    </label>
                    <Field
                      type="text"
                      name="userName"
                      placeholder="Username"
                      value={values.userName}
                      className="w-full"
                      autoComplete="off"
                    />
                    <ErrorMessage
                      name="userName"
                      component="span"
                      style={{ color: "red" }}
                    />
                  </div>
                  <div className="mb-4 w-full">
                    <label htmlFor="phoneNumber" className="mb-3">
                      Phone number
                    </label>
                    <Field
                      type="text"
                      name="phoneNumber"
                      value={values.phoneNumber}
                      placeholder="Phone Number"
                      className="w-full"
                    />
                    <ErrorMessage
                      name="phoneNumber"
                      component="span"
                      style={{ color: "red" }}
                    />
                  </div>
                  {SignUpErrorState && (
                    <p className=" text-red-500 text-sm text-center mb-2">
                      {SignUpError}
                    </p>
                  )}
                  <button className="btn-custom" type="submit">
                    Next
                  </button>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </>
  );
}
