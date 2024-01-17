import { useEffect, useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";

import Image from "next/image";
import Link from "next/link";
import { patchUserDataAuth, postDataAuth } from "@/service/apiCalls/Fetcher";
import { useRouter } from "next/router";

const DashboardNavbar = () => {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState(null);
  const [editRoleEmail, setEditRoleEmail] = useState("");
  const [showEditRole, setShowEditRole] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  const handleLogOut = async () => {
    const token = `Bearer ${localStorage.getItem("token")}`;
    const url = `${process.env.NEXT_PUBLIC_BaseUrl}api/user/logout?loginEmail=${userEmail}`;
    const response = await postDataAuth(url, "", token);
    if (response.statusCode === 200) {
      localStorage.removeItem("id");
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      router.push("/");
    }
  };
  useEffect(() => {
    var getEmail = `${localStorage.getItem("email")}`;
    if (getEmail !== null) {
      setUserEmail(getEmail);
    }
  }, []);

  const handleRoleInputChange = (event) => {
    setEditRoleEmail(event.target.value);
  };
  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleRole = () => {
    setShowEditRole(!showEditRole);
  };

  const handleUserRole = async (e) => {
    e.preventDefault();
    try {
      const token = `Bearer ${localStorage.getItem("token")}`;
      const url = `${process.env.NEXT_PUBLIC_BaseUrl}api/user/update_role/${editRoleEmail}?role=${selectedRole}`;
      const response = await patchUserDataAuth(url, token);
      if (response.statusCode === 200) {
        console.log(response);
        alert(response.result);
        setEditRoleEmail("");
        setSelectedRole("");
      }
    } catch (error) {
      alert(error.response.data.errorMessages[0]);
    }
  };

  return (
    <div>
      <div className="bg-grey p-5">
        <h5 className="text-h4">Dashboard</h5>
        <div className="sm:flex justify-end items-center">
          <div className="sm:flex gap-2">
            <button
              className="text-white rounded-md bg-red-600 px-4 py-2"
              onClick={handleLogOut}
            >
              Log Out
            </button>
            <button
              className="text-white rounded-md bg-green-600 px-4 py-2"
              onClick={handleRole}
            >
              Edit Role
            </button>

            <Link href="/dashboard/register">
              <button className="flex gap-2 items-center rounded-md bg-white px-4 py-2">
                <Image
                  src="/favicon_io/plus.svg"
                  height={16}
                  width={16}
                  alt="Add button icon"
                />
                <h6 className="text-black">New Member</h6>
              </button>
            </Link>
          </div>
        </div>
      </div>
      {showEditRole && (
        <form className="my-4 mx-4" onSubmit={handleUserRole}>
          <label className="mb-2 block">User Email</label>
          <input
            type="search"
            name="search"
            placeholder="example@gmail.com"
            className="border-2 rounded-md focus:outline-none p-4 w-1/2"
            value={editRoleEmail}
            onChange={handleRoleInputChange}
          />
          <select
            id="userRole"
            name="userRole"
            value={selectedRole}
            onChange={handleRoleChange}
            className="border-2 rounded-md focus:outline-none p-4 w-1/2"
          >
            <option value="" disabled>
              Select a role
            </option>
            <option value="ADMIN">ADMIN</option>
            <option value="USER">USER</option>
            <option value="CAMGIRL">CAMGIRL</option>
          </select>
          <button
            className="p-4 shadow-md font-semibold bg-red-400 mt-2 text-white rounded-md"
            type="submit"
          >
            Update Role
          </button>
        </form>
      )}
    </div>
  );
};

export default DashboardNavbar;
