import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import React from "react";

import DashboardLayout from "@/components/DashboardLayout";

const CamDetails = () => {
  return (
    <>
      <DashboardLayout>
        <div className="">
          <h4>Details page</h4>
          <div className="flex justify-center">
            <div className="pb-10 mb-10 rounded-lg bg-white overflow-hidden">
              <div>
                <Image
                  src="/asset/hot-babeC.jpg"
                  width={400}
                  height={400}
                  alt="userimgage"
                />
              </div>
              <div className=" p-5">
                <h4>userName</h4>
                <h4>firstName + lastName</h4>
                <h4>location</h4>
                <h4>email</h4>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default CamDetails;
