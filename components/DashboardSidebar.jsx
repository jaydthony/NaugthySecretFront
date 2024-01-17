import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const DashboardSidebar = () => {
  return (
    <>
      <div
        style={{ width: "300px" }}
        className="px-5 py-5 bg-white hidden lg:block border-l border-2"
      >
        <div className="rounded-md border-2 flex p-2">
          <Image
            src="/favicon_io/search.svg"
            height={16}
            width={16}
            alt="Search icon"
          />
          <input placeholder="Search..." type="text" className="w-full" />
        </div>
        <h4 className="my-5 text-h4">Projects</h4>
        <ul className="sidebar-lists">
          <li>
            <Link className="sidebar_icon" href="/dashboard/">
              <div className="sidebar__icon">
                <Image
                  src="/asset/dashboard.png"
                  height={20}
                  width={20}
                  alt="An icon"
                />
              </div>
              <div>
                <h5 className="text-h5">Dashboard</h5>
              </div>
            </Link>
          </li>
          <li>
            <Link className="sidebar_icon" href="/dashboard/usermanagement">
              <div className="sidebar__icon">
                <Image
                  src="/asset/user-dash.png"
                  height={20}
                  width={20}
                  alt="An icon"
                />
              </div>
              <div>
                <h5 className="text-h5">User Management</h5>
              </div>
            </Link>
          </li>
          <li>
            <Link className="sidebar_icon" href="/dashboard/cammanagement">
              <div className="sidebar__icon">
                <Image
                  src="/asset/cam-dash.png"
                  height={20}
                  width={20}
                  alt="An icon"
                />
              </div>
              <div>
                <h5 className="text-h5">Cam Managements</h5>
              </div>
            </Link>
          </li>
          <li>
            <Link className="sidebar_icon" href="/dashboard/callrecord">
              <div className="sidebar__icon">
                <Image
                  src="/asset/call-dash.png"
                  height={20}
                  width={20}
                  alt="An icon"
                />
              </div>
              <div>
                <h5 className="text-h5">Call Records</h5>
              </div>
            </Link>
          </li>
          <li>
            <Link className="sidebar_icon" href="/dashboard/payment">
              <div className="sidebar__icon">
                <Image
                  src="/asset/dollar-dash.png"
                  height={20}
                  width={20}
                  alt="An icon"
                />
              </div>
              <div>
                <h5 className="text-h5">Payments</h5>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default DashboardSidebar;
