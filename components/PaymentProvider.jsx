import { postDataAuth } from "@/service/apiCalls/Fetcher";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const PaymentProvider = ({ stateOpen, innerState, type }) => {
  const router = useRouter();
  var token = `Bearer ${localStorage.getItem("token")}`;
  var userid = `${localStorage.getItem("id")}`;
  const paypalCheckout = async () => {
    console.log(type);
    const url = `${process.env.NEXT_PUBLIC_BaseUrl}api/payment/create/buy_minute?paymentType=${type}&user_id=${userid}`;
    console.log(url);
    var response = await postDataAuth(url, "", token);
    if (response.statusCode === 201) {
      var paypalPaymentLink = response.result.approve;
      router.push(paypalPaymentLink);
    }
  };
  const stripeCheckout = async () => {
    console.log(type);
    const url = `${process.env.NEXT_PUBLIC_BaseUrl}api/payment/create/stripe?userid=${userid}&paymentType=${type}`;
    console.log(url);
    var response = await postDataAuth(url, "", token);
    if (response.statusCode === 200) {
      router.push(response.result);
    }
  };
  const closeModel = () => {
    stateOpen(false);
    innerState(true);
  };
  return (
    <div className=" border-b-2 py-2 md:border-0">
      <div className="modal-overlay">
        <div className="relative contain-modal-content rounded-lg">
          <div
            className="modal-content pd-sm bg-white pt-4 rounded-lg overflow-scroll"
            style={{ height: "75%" }}
          >
            <div className=" bg-white rounded-lg text-center">
              <h4 className="modal-header">Select your payment provider</h4>
              <button
                className="sub-class mb-3 sub-class-special flex items-center justify-center"
                onClick={paypalCheckout}
              >
                <img
                  src="/asset/paypal.png"
                  title="approved icons"
                  className=" w-2/4  sub-icon"
                  alt="A marker icon"
                />
              </button>
              <button
                className="sub-class mb-3 sub-class-special flex items-center justify-center"
                onClick={stripeCheckout}
              >
                <img
                  src="/asset/stripe.png"
                  title="approved icons"
                  className=" w-1/3  sub-icon"
                  alt="A marker icon"
                />
              </button>
            </div>

            <button onClick={closeModel}>
              <FontAwesomeIcon icon={faTimes} className="f-icon ab-position" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentProvider;
