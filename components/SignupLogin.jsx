import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { postData } from "@/service/apiCalls/Fetcher";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function SignupLogin({
  t,
  log,
  sign,
  onValueSignChange,
  onValueForgotChange,
  onValueSignupSuccessChange,
  signF,
  onValueFemaleSignChange,
  onValueFemaleSignupChanged,
}) {
  const [gender, setGender] = useState(null);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [male, setMale] = useState(null);
  const [female, setFemale] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [login, setLogin] = useState(log);
  const [SignUpError, setSignUpError] = useState("");
  const [SignUpErrorState, setSignUpErrorState] = useState(false);
  const [Error, setError] = useState("");
  const [ErrorState, setErrorState] = useState(false);
  const [signup, setSignup] = useState(sign);
  const [signupF, setSignupF] = useState(signF);
  const [isOpen, setIsOpen] = useState(false);
  const [countryCode, setCountryCode] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const router = useRouter();

  useEffect(() => {
    const localGender = localStorage.getItem("gender");
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
    setGender(localGender);
    if (localGender === "male") {
      setMale(localGender);
      console.log(localGender);
    }
    if (localGender === "female") {
      setFemale(localGender);
      console.log(localGender);
    }
  }, []);

  const value = false;
  const showForgot = true;
  const successChange = true;

  const showLogin = () => {
    setSignup(false);
    setLogin(true);
  };

  const showSignup = () => {
    setSignup(true);
    setLogin(false);
  };
  const handleCountryCodeChange = (e) => {
    const newValue = e.target.value;
    setSelectedCountryCode(newValue);
  };

  const showSignupF = () => {
    setSignupF(true);
    onValueFemaleSignChange(value);
    const val = true;
    onValueFemaleSignupChanged(val);
  };

  const openModal = (e) => {
    e.preventDefault();
    onValueSignChange(value);
    onValueSignupSuccessChange(successChange);
  };

  const closeModal = () => {
    setIsOpen(false);
    onValueSignChange(value);
  };

  const handleIsForgotOpen = (e) => {
    onValueForgotChange(showForgot);
    onValueSignChange(value);
    e.preventDefault();
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(selectedDate);
  };

  const initialSignupValues = {
    firstName: "",
    lastName: "",
    location: "",
    age: null,
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    gender: 0,
  };

  const signupValidationSchema = Yup.object({
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
    phoneNumber: Yup.string().required("Phone number is required"),

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

  const initialLoginValues = {
    email: "",
    password: "",
  };

  const loginValidationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSignupSubmit = async (values) => {
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
      console.log(payload);
      const url = `${process.env.NEXT_PUBLIC_BaseUrl}api/user/register`;
      const response = await postData(url, payload);
      console.log("POST request successful:", response);
      onValueSignChange(value);
      onValueSignupSuccessChange(successChange);
      setLogin(true);
    } catch (error) {
      console.error("Error making POST request:", error);
      var errorMessage = error.response.data.errorMessages;
      setSignUpError(errorMessage[0]);
      setSignUpErrorState(true);
      console.log(errorMessage);
    }
  };

  const handleLoginSubmit = async (values) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_BaseUrl}api/user/login`;
      console.log(url);
      const response = await postData(url, values);
      console.log(response.statusCode === 200);
      if (response.statusCode === 200) {
        const data = response.result;
        console.log(data.jwt);
        localStorage.setItem("token", data.jwt);
        if (data.userRole[0] === "ADMIN") {
          router.push("/dashboard");
        } else {
          router.push("/home");
        }

        onValueSignChange(value);
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      var errorMessage = error.response.data.errorMessages;
      console.log(errorMessage);
      setError(errorMessage[0]);
      setErrorState(true);
      console.error("Error making POST request:", error);
    }
  };

  return (
    <div className=" border-b-2 py-2 md:border-0">
      <div className="modal-overlay">
        <div className="relative contain-modal-content rounded-lg">
          <div
            className="modal-content bg-white rounded-lg"
            style={{ height: "75%" }}
          >
            <div className="flex text-center" style={{ background: "#EAEAEA" }}>
              {female && (
                <button
                  className={`w-full p-3 ${signupF ? "class1" : "class2"}`}
                  onClick={showSignupF}
                >
                  {t("signup")}
                </button>
              )}
              {male && (
                <button
                  className={`w-full p-3 ${signup ? "class1" : "class2"}`}
                  onClick={showSignup}
                >
                  {t("signup")}
                </button>
              )}
              <button
                className={`w-full p-3 ${login ? "class1" : "class2"}`}
                onClick={showLogin}
              >
                {t("login")}
              </button>
            </div>
            <button onClick={closeModal}>
              <FontAwesomeIcon icon={faTimes} className="f-icon ab-position" />
            </button>
            {signup && (
              <div
                className="pd-sm m-auto overflow-x-hidden"
                style={{ height: "75%" }}
              >
                <Formik
                  initialValues={initialSignupValues}
                  validationSchema={signupValidationSchema}
                  onSubmit={handleSignupSubmit}
                >
                  {({ isValid }) => (
                    <Form className="register text-start">
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
                          autoComplete="off"
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
                          type="text"
                          name="email"
                          placeholder={t("email")}
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
                                <option
                                  key={index}
                                  value={country.callingCodes}
                                >
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
                        <label htmlFor="confirmPassword" className="mb-3">
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
                      {SignUpErrorState && (
                        <p className=" text-red-500 text-sm text-center mb-2">
                          {SignUpError}
                        </p>
                      )}
                      <div className="mb-5 flex items-center">
                        <p>
                          {t("over")}{" "}
                          <Link
                            className="text-pink ml-auto"
                            target="_blank"
                            href="/"
                          >
                            {t("term")}.
                          </Link>
                        </p>
                      </div>
                      <button
                        className={`rounded-md bg-pink text-white font-extrabold py-4 px-10 mb-4 ${
                          !isValid ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        type="submit"
                        // disabled={!isValid}
                      >
                        {t("signup")}
                      </button>
                    </Form>
                  )}
                </Formik>
                <button className="text-pink underline" onClick={showLogin}>
                  I already have an account
                </button>
              </div>
            )}
            {login && (
              <div
                className="pd-sm m-auto text-start overflow-x-hidden"
                style={{ height: "75%", width: "75%" }}
              >
                <Formik
                  initialValues={initialLoginValues}
                  validationSchema={loginValidationSchema}
                  onSubmit={handleLoginSubmit}
                >
                  <Form className="register">
                    <div className="mb-4">
                      <label htmlFor="email">Email</label>
                      <Field type="text" name="email" placeholder="Email" />
                      <ErrorMessage
                        name="email"
                        component="span"
                        style={{ color: "red" }}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="password">Password</label>
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
                    {ErrorState && (
                      <p className=" text-red-500 text-sm text-center mb-2">
                        {Error}
                      </p>
                    )}
                    <button
                      className="text-pink underline block mb-4"
                      onClick={handleIsForgotOpen}
                      type="button"
                    >
                      Forgot Password
                    </button>
                    <button
                      className="rounded-md bg-pink text-white font-extrabold py-4 px-10 mb-4 block"
                      type="submit"
                    >
                      Login
                    </button>
                  </Form>
                </Formik>
                {female && (
                  <button className="text-pink underline" onClick={showSignupF}>
                    Create an account
                  </button>
                )}
                {male && (
                  <button className="text-pink underline" onClick={showSignup}>
                    Create an account
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
