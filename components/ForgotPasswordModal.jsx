import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { postForgotData } from "@/service/apiCalls/Fetcher";

const ForgotPasswordModal = ({
  onValueForgotClose,
  onHandleUserForgotEmail,
  onValueForgotSuccessful,
}) => {
  const value = false;
  const closeModal = () => {
    onValueForgotClose(value);
  };

  const forgotPasswordValidationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const handleForgotPasswordSubmit = async (values) => {
    console.log(values.email);

    try {
      const url = `${process.env.NEXT_PUBLIC_BaseUrl}api/user/forgot_password?email=${values.email}`;
      const response = await postForgotData(url);
      if (response.statusCode === 200) {
        console.log(response);
        localStorage.setItem("forgotEmail", values.email);
        onHandleUserForgotEmail(values.email);
        onValueForgotClose(value);
        onValueForgotSuccessful(true);
      }
    } catch (error) {
      alert(error.response.data.errorMessages[0]);
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
                Forgot password
              </h4>
              <p>What is the email address associated with your account</p>
              <Formik
                initialValues={{
                  email: "",
                }}
                validationSchema={forgotPasswordValidationSchema}
                onSubmit={handleForgotPasswordSubmit}
              >
                {({ isValid }) => (
                  <Form className="register">
                    <div className="mb-4">
                      <label htmlFor="email" className="mb-3">
                        Email
                      </label>
                      <Field
                        type="text"
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

export default ForgotPasswordModal;
