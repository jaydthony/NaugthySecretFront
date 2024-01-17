import Link from "next/link";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function SignupLoginFemale({
  logF,
  signF,
  onValueFemaleSignChange,
  onValueFemaleSignupChanged,
  onValueForgotChange,
}) {
  const showForgot = true;
  const value = false;
  const [loginF, setLoginF] = useState(logF);
  const [signupF, setSignupF] = useState(signF);

  const showLogin = () => {
    setSignupF(false);
    setLoginF(true);
  };

  const showSignup = () => {
    setSignupF(true);
    setLoginF(false);
    onValueFemaleSignChange(value);
    const val = true;
    onValueFemaleSignupChanged(val);
  };

  const closeModal = () => {
    const value = false;
    onValueFemaleSignChange(value);
  };

  const handleIsForgotOpen = (e) => {
    onValueForgotChange(showForgot);
    onValueFemaleSignChange(value);
    e.preventDefault();
  };

  // Validation schema for the login form
  const loginValidationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // Handle login form submit
  const handleLoginSubmit = async (values) => {
    try {
      const url = process.env.BaseUrl + "api/user/login";
      console.log(values.email);
      console.log(values.password);
      const response = await postData(url, values);
      console.log("POST request successful:", response);
      const value = false;
      onValueFemaleSignChange(value);
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };

  return (
    <>
      <div className="modal-overlay px-6">
        <div className="relative contain-modal-content rounded-lg">
          <div
            className="modal-content bg-white rounded-lg "
            style={{ width: "25rem", height: "75%" }}
          >
            <div
              className="flex text-center mb-10"
              style={{ background: "#EAEAEA" }}
            >
              <button
                className={`w-full p-3 ${signupF ? "class1" : "class2"}`}
                onClick={showSignup}
              >
                Signup
              </button>
              <button
                className={`w-full p-3 ${loginF ? "class1" : "class2"}`}
                onClick={showLogin}
              >
                Login
              </button>
            </div>

            {loginF && (
              <div className="px-10 pb-10">
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  validationSchema={loginValidationSchema}
                  onSubmit={handleLoginSubmit}
                >
                  {({ isValid }) => (
                    <Form className="register">
                      <div className="mb-4">
                        <label htmlFor="email" className="mb-3">
                          Email
                        </label>
                        <Field type="text" name="email" placeholder="Email" />
                        <ErrorMessage
                          name="email"
                          component="span"
                          style={{ color: "red" }}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="password" className="mb-3">
                          Password
                        </label>
                        <Field
                          type="password"
                          name="password"
                          placeholder="Password"
                        />
                        <ErrorMessage
                          name="password"
                          component="span"
                          style={{ color: "red" }}
                        />
                      </div>
                      <button
                        className="text-pink underline block mb-4"
                        onClick={handleIsForgotOpen}
                        type="button"
                      >
                        Forgot Password
                      </button>
                      <button
                        className={`rounded-md bg-pink text-white font-extrabold py-4 px-10 mb-4 ${
                          !isValid ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        type="submit"
                        disabled={!isValid}
                      >
                        Login
                      </button>
                    </Form>
                  )}
                </Formik>
                <button className="text-pink underline">
                  Create an account
                </button>
              </div>
            )}
            <button onClick={closeModal}>
              <FontAwesomeIcon icon={faTimes} className="f-icon ab-position" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
