import { postDataAuth } from "@/service/apiCalls/Fetcher";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Confirm_payment = () => {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(true);
  const queryParam = router.query.session_id;

  useEffect(() => {
    const fetchConfirmation = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_BaseUrl}api/payment/webhook/confirm-payment/stripe?session_id=${queryParam}`;
        const token = `Bearer ${localStorage.getItem("token")}`;
        const response = await postDataAuth(url, "", token);
        if (response.statusCode === 200) {
          setIsSuccess(true);
        } else {
          setIsSuccess(false);
        }
      } catch (error) {
        console.error("Error confirming payment:", error);
        setIsSuccess(false);
      }
    };

    if (queryParam) {
      fetchConfirmation();
    }
  }, [queryParam]);

  return (
    <div>
      <div className="flex justify-center w-full items-center h-full h-screen">
        {isSuccess ? (
          <div className=" border-2 p-10 text-center shadow-md rounded-md ">
            <div className="payment-page mx-auto w-full">
              <Image
                src="/asset/green-mark.png"
                height={200}
                width={200}
                alt="checker"
                className="m-auto"
              />
            </div>
            <h4 className="text-black text-h4">Success</h4>
            <p className="mb-2">Payment successfully made.</p>
            <Link href="/home" className="text-pink border-2 p-2 rounded-md">
              Back to home
            </Link>
          </div>
        ) : (
          <div className=" border-2 p-10 text-center shadow-md rounded-md ">
            <div className="payment-page mx-auto w-full">
              <Image
                src="/asset/fail-icon.png"
                height={200}
                width={200}
                alt="checker"
                className="m-auto"
              />
            </div>
            <h4 className="text-black text-h4">Failed</h4>
            <p className="mb-2">Payment not successful.</p>
            <Link href="/home" className="text-pink border-2 p-2 rounded-md">
              Back to home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Confirm_payment;
