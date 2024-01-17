import React, { useRef } from "react";
import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { postData } from "@/service/apiCalls/Fetcher";

const PasswordReset = () => {
  const router = useRouter();
  const { email } = router.query;

  const initialResetValues = {
    password: "",
    confirmPassword: "",
    email: email,
    token: "",
  };
  const resetValidationSchema = Yup.object({
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

  const handleResetSubmit = async (values) => {
    const { password, confirmPassword, token } = values;
    try {
      const url = `${process.env.NEXT_PUBLIC_BaseUrl}api/user/reset_password`;
      const payLoad = {
        password,
        confirmPassword,
        token,
        email: email,
      };
      console.log(payLoad);
      const response = await postData(url, payLoad);
      if (response.statusCode === 200) {
        localStorage.removeItem("forgotEmail");
        router.push("/");
      }
    } catch (error) {
      alert(error.response.data.errorMessages[0]);
    }
  };

  return (
    <div className="pd-sm bg-white pt-10 flex justify-center w-full items-center h-full h-screen">
      <div className="border-2 rounded-lg p-10">
        <h4 className="text-black text-center mb-5">Reset password</h4>
        <Formik
          initialValues={initialResetValues}
          validationSchema={resetValidationSchema}
          onSubmit={handleResetSubmit}
        >
          <Form className="register">
            <div className="mb-4">
              <label htmlFor="password">New password</label>
              <Field
                type="password"
                name="password"
                placeholder="new password"
              />
              <ErrorMessage
                name="password"
                component="span"
                style={{ color: "red" }}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password">Confirm Password</label>
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full"
              />
              <ErrorMessage
                name="confirmPassword"
                component="span"
                style={{ color: "red" }}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password">Enter Token</label>
              <Field
                type="text"
                name="token"
                placeholder="Enter Token"
                className="w-full"
              />
              <ErrorMessage
                name="token"
                component="span"
                style={{ color: "red" }}
              />
            </div>
            <button
              className="rounded-md bg-pink text-white font-extrabold py-4 px-10 mb-4 block"
              type="submit"
            >
              Send
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default PasswordReset;
