import React from "react";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { postData } from "@/service/apiCalls/Fetcher";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SignupFemale = ({ onValueCloseSignChange, onValueLoginChange, t }) => {
  const value = false;

  const [SignUpError, setSignUpError] = useState("");
  const [countries, setCountries] = useState([]);
  const [countryCode, setCountryCode] = useState([]);
  const [loading, setLoading] = useState(true);
  const [SignUpErrorState, setSignUpErrorState] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCountryCode, setSelectedCountryCode] = useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(selectedDate);
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
        setLoading(false);
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
  const closeModal = () => {
    onValueCloseSignChange(value);
  };

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
      .required("Firstname is required")
      .matches(
        /^[A-Za-z]+$/,
        "Firstname should only contain alphabetic characters"
      ),
    lastName: Yup.string()
      .required("Lastname is required")
      .matches(
        /^[A-Za-z]+$/,
        "Lastname should only contain alphabetic characters"
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
    phoneNumber: Yup.number().required("Phone number is required"),
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
      const selectedDate = new Date(values.age); // Parse the date from Formik values
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

      const url = `${process.env.NEXT_PUBLIC_BaseUrl}api/user/register`;
      console.log(payload);
      const response = await postData(url, payload);
      onValueCloseSignChange(value);
      onValueLoginChange(true);
    } catch (error) {
      console.error("Error making POST request:", error);
      var errorMessage = error.response.data.errorMessages;
      setSignUpError(errorMessage[0]);
      setSignUpErrorState(true);
      console.log(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div
        className="border-b-2 py-2 md:border-0 m-auto bg-white overflow-scroll"
        style={{ height: "75%" }}
      >
        <button onClick={closeModal} className="btn-custom">
          {t("close")}
        </button>
        <div className="pd-sm">
          <h3 className="font-semibold text-3xl">{t("myacct")}</h3>
          <p>{t("creatnote")}.</p>
          <p>{t("tim")}</p>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="female-register">
              <div className="mb-4">
                <label htmlFor="firstName" className="mb-3">
                  {t("fname")}
                </label>
                <Field
                  type="text"
                  name="firstName"
                  placeholder={t("fname")}
                  className="w-full"
                />
                <ErrorMessage
                  name="firstName"
                  component="span"
                  style={{ color: "red" }}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="lastName" className="mb-3">
                  {t("lname")}
                </label>
                <Field
                  type="text"
                  name="lastName"
                  placeholder={t("lname")}
                  className="w-full"
                />
                <ErrorMessage
                  name="lastName"
                  component="span"
                  style={{ color: "red" }}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="location" className="mb-3">
                  {t("locat")}
                </label>
                <Field as="select" name="location" className="w-full">
                  <option value="" disabled>
                    {t("selLocat")}
                  </option>
                  {loading ? (
                    <option>{t("lolocat")}</option>
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
              <div className="mb-4 flex flex-col gap-2">
                <label htmlFor="age" className="mb-3">
                  {t("age")}
                </label>
                <Field
                  type="date"
                  id="age"
                  name="age"
                  className="w-full"
                  max={new Date().toISOString().split("T")[0]} // Set max date to today to ensure users are 18 or older
                />
                <ErrorMessage
                  name="age"
                  component="span"
                  style={{ color: "red" }}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="userName" className="mb-3">
                  {t("username")}
                </label>
                <Field
                  type="text"
                  name="userName"
                  placeholder={t("username")}
                  className="w-full"
                />
                <ErrorMessage
                  name="userName"
                  component="span"
                  style={{ color: "red" }}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="mb-3">
                  {t("email")}
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder={t("email")}
                  className="w-full"
                />
                <ErrorMessage
                  name="email"
                  component="span"
                  style={{ color: "red" }}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="phoneNumber" className="mb-3">
                  {t("phonenumber")}
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
                    placeholder={t("phonenumber")}
                    className="w-full"
                  />
                </div>
                <ErrorMessage
                  name="phoneNumber"
                  component="span"
                  style={{ color: "red" }}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="mb-3">
                  {t("password")}
                </label>
                <Field
                  type="password"
                  name="password"
                  placeholder={t("password")}
                  className="w-full"
                />
                <ErrorMessage
                  name="password"
                  component="span"
                  style={{ color: "red" }}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="confirmpassword" className="mb-3">
                  {t("compasw")}
                </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder={t("compasw")}
                  className="w-full"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="span"
                  style={{ color: "red" }}
                />
              </div>
              <div className="mb-5 flex gap-4">
                <p>
                  {t("over")}{" "}
                  <button className="text-pink ml-auto">{t("term")}.</button>
                </p>
              </div>
              {SignUpErrorState && (
                <p className=" text-red-500 text-sm text-center mb-2">
                  {SignUpError}
                </p>
              )}
              <button
                className="text-pink underline mr-4"
                onClick={closeModal}
                type="button"
              >
                {t("close")}
              </button>
              <button className="btn-custom" type="submit">
                {t("signup")}
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignupFemale;
