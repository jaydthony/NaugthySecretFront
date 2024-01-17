import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import DashboardLayout from "@/components/DashboardLayout";
import { postDataAuth } from "@/service/apiCalls/Fetcher";

const UpdateDetails = () => {
  const router = useRouter();
  const [SignUpError, setSignUpError] = useState("");
  const [SignUpErrorState, setSignUpErrorState] = useState(false);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countryCode, setCountryCode] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const initialValues = {
    firstName: "",
    lastName: "",
    location: "",
    age: "",
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    gender: 1,
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("First Name is required")
      .matches(
        /^[A-Za-z]+$/,
        "First Name should only contain alphabetic characters"
      ),
    lastName: Yup.string()
      .required("Last Name is required")
      .matches(
        /^[A-Za-z]+$/,
        "Last Name should only contain alphabetic characters"
      ),
    location: Yup.string().required("Location is required"),

    age: Yup.date()
      .required("Age is required")
      .test("age", "Age must be at least 18", (value) => {
        if (!value) return false; // Handle null or undefined value
        const today = new Date();
        const age = today.getFullYear() - value.getFullYear();
        const monthDiff = today.getMonth() - value.getMonth();
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < value.getDate())
        ) {
          return age - 1 >= 18;
        }
        return age >= 18;
      }),
    phoneNumber: Yup.string().required("Phonenumber is required"),

    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    userName: Yup.string().required("Username is required"),

    password: Yup.string()
      .required("Password is required, should be greater than 6")
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Password must contain at least one capital letter, one number, and one special character"
      ),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const handleSubmit = async (values) => {
    try {
      const token = `Bearer ${localStorage.getItem("token")}`;
      console.log(token);
      const selectedDate = new Date(values.age);
      const age = selectedDate
        ? Math.floor(
            (new Date() - selectedDate) / (365.25 * 24 * 60 * 60 * 1000)
          )
        : null;
      const number = selectedCountryCode + values.phoneNumber;
      const payload = {
        ...values,
        age: age,
        phoneNumber: number,
      };
      const url = `${process.env.NEXT_PUBLIC_BaseUrl}api/user/register/camgirl`;
      const response = await postDataAuth(url, payload, token);
      if (response.statusCode === 200) {
        router.push("/dashboard");
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
  const handleDashboard = () => {
    router.push("/dashboard/");
  };
  const handleCountryCodeChange = (e) => {
    const newValue = e.target.value;
    setSelectedCountryCode(newValue);
  };
  useEffect(() => {
    fetch("https://restcountries.com/v2/all")
      .then((response) => response.json())
      .then((data) => {
        const country = data.map((country) => country);
        setCountryCode(country);
        console.log(country);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countryNames = data.map((country) => country.name.common);
        setCountries(countryNames);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <DashboardLayout>
        <div className="mt-10">
          <div className="md:w-3/4 m-auto shadow-lg p-5 bg-white rounded-md">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form className="female-register">
                <div className="sm:flex gap-4">
                  <div className="mb-4 w-full">
                    <label htmlFor="firstName" className="mb-3">
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
                  <div className="mb-4 w-full">
                    <label htmlFor="lastName" className="mb-3">
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
                </div>
                <div className="mb-4">
                  <label htmlFor="userName" className="mb-3">
                    Username
                  </label>
                  <Field
                    type="text"
                    name="userName"
                    placeholder="Username"
                    className="w-full"
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name="userName"
                    component="span"
                    style={{ color: "red" }}
                  />
                </div>
                <div className="sm:flex gap-4">
                  <div className="mb-4">
                    <label htmlFor="location" className="mb-3">
                      Location
                    </label>
                    <Field as="select" name="location" className="w-full">
                      <option value="" disabled>
                        Select a location
                      </option>
                      {loading ? (
                        <option>Loading countries...</option>
                      ) : (
                        countries.map((country, index) => (
                          <option key={index} value={country}>
                            {country}
                          </option>
                        ))
                      )}
                    </Field>
                    <ErrorMessage
                      name="location"
                      component="span"
                      style={{ color: "red" }}
                    />
                  </div>
                  <div className="mb-4 w-full">
                    <label htmlFor="email" className="mb-3">
                      Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="w-full"
                    />
                    <ErrorMessage
                      name="email"
                      component="span"
                      style={{ color: "red" }}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="phoneNumber" className="mb-3">
                    Phone Number
                  </label>
                  <div className="flex gap-2 items-center">
                    <Field
                      as="select"
                      name="countrycode"
                      className="w-1/4"
                      value={selectedCountryCode}
                      onChange={handleCountryCodeChange}
                    >
                      <option value="" disabled>
                        {/* {t("selLocat")} */}
                        Country Code
                      </option>
                      {loading ? (
                        <option>
                          {/* {t("lolocat")} */}
                          Loading CountryCode
                        </option>
                      ) : (
                        countryCode.map((country, index) => (
                          <option key={index} value={country.callingCodes}>
                            +{country.callingCodes} {country.name}
                          </option>
                        ))
                      )}
                    </Field>
                    <Field
                      type="text"
                      name="phoneNumber"
                      placeholder="Phone Number"
                      className="w-full"
                    />
                  </div>
                  <ErrorMessage
                    name="phoneNumber"
                    component="span"
                    style={{ color: "red" }}
                  />
                </div>
                <div className="sm:flex flex-col gap-4">
                  <label htmlFor="age" className="mb-3">
                    Age
                  </label>
                  <Field
                    type="date"
                    id="age"
                    name="age"
                    className="w-full"
                    max={new Date().toISOString().split("T")[0]}
                  />
                  <ErrorMessage
                    name="age"
                    component="span"
                    style={{ color: "red" }}
                  />
                </div>

                <div className="sm:flex gap-4">
                  <div className="mb-4 w-full">
                    <label htmlFor="password" className="mb-3">
                      Password
                    </label>
                    <Field
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="w-full"
                    />
                    <ErrorMessage
                      name="password"
                      component="span"
                      style={{ color: "red" }}
                    />
                  </div>
                  <div className="mb-4 w-full">
                    <label htmlFor="confirmPassword" className="mb-3">
                      Confirm password
                    </label>
                    <Field
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm password"
                      className="w-full"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="span"
                      style={{ color: "red" }}
                    />
                  </div>
                </div>
                {SignUpErrorState && (
                  <p className=" text-red-500 text-sm text-center mb-2">
                    {SignUpError}
                  </p>
                )}
                <button
                  className="text-pink underline mr-4"
                  onClick={handleDashboard}
                  type="button"
                >
                  Back
                </button>
                <button className="btn-custom" type="submit">
                  Sign Up
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
