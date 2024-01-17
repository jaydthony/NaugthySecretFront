import React from "react";
import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import DashboardLayout from "@/components/DashboardLayout";

const UpdateDetails = () => {
  const router = useRouter();

  const initialValues = {
    firstname: "",
    lastname: "",
    location: "",
  };

  const validationSchema = Yup.object({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    location: Yup.string().required("Last name is required"),

    age: Yup.string().required("Age is required"),
    gender: Yup.string().required("Gender is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const url = "https://example.com/api/users";
      console.log(values.firstName);
      console.log(values.lastName);
      console.log(values.location);
      // const response = await postData(url, values);
      // Handle the response if needed
      // console.log('POST request successful:', response);
    } catch (error) {
      // console.error('Error making POST request:', error);
    }
  };
  // function handleEdit(id) {
  //   console.log("Edit id:", id);
  // }
  // function handleDelete(id) {
  //   console.log("Delete id:", id);
  // }
  // function handleSuspend(id) {
  //   console.log("Suspend id:", id);
  // }
  // function handleView(id) {
  //   console.log("Suspend id:", id);
  // }
  const handleDashboard = () => {
    router.push("/dashboard/");
  };

  return (
    <>
      <DashboardLayout>
        <div className="mt-10">
          <div className="md:w-1/2 m-auto shadow-lg p-5 bg-white rounded-md">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form className="female-register">
                <div className="mb-2">
                  <label htmlFor="firstName" className="mb-2">
                    Firstname
                  </label>
                  <Field
                    type="text"
                    name="firstName"
                    placeholder="Firstname"
                    className="w-full"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="span"
                    style={{ color: "red" }}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="lastName" className="mb-2">
                    Lastname
                  </label>
                  <Field
                    type="text"
                    name="lastName"
                    placeholder="Lastname"
                    className="w-full"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="span"
                    style={{ color: "red" }}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="location" className="mb-2">
                    Location
                  </label>
                  <Field
                    type="text"
                    name="location"
                    placeholder="Location"
                    className="w-full"
                  />
                  <ErrorMessage
                    name="location"
                    component="span"
                    style={{ color: "red" }}
                  />
                </div>

                <button className="mx-2" onClick={handleDashboard}>
                  Back
                </button>
                <button className="btn-custom" type="submit">
                  Update
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default UpdateDetails;
