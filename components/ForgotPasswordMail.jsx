import { useRouter } from "next/router";

const ForgotPasswordMail = ({ forgotUserMail }) => {
  const router = useRouter();
  const handlePasswordPage = () => {
    router.push(`/resetpassword?email=${forgotUserMail}`);
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="relative contain-modal-content rounded-lg">
          <div
            className="modal-content bg-white rounded-lg"
            style={{ height: "75%" }}
          >
            <div className="pd-sm bg-white rounded-lg pt-10">
              <h4 className="modal-header text-black text-center m-5">
                Forgotten your password?
              </h4>
              <p>
                Forgot passsword token was successfully sent to {forgotUserMail}
              </p>

              <button className="btn-custom" onClick={handlePasswordPage}>
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordMail;
