import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchData } from "@/service/apiCalls/Fetcher";
import Link from "next/link";
import Image from "next/image";

const CompletePayment = () => {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(true);
  const queryParam = router.query.token;

  useEffect(() => {
    const fetchConfirmation = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_BaseUrl}api/payment/webhook/confirm-payment?token=${queryParam}`;
        const token = `Bearer ${localStorage.getItem("token")}`;
        const response = await fetchData(url, token);

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

export default CompletePayment;
