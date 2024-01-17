import DashboardLayout from "@/components/DashboardLayout";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { deleteData, postDataAuth } from "@/service/apiCalls/Fetcher";

const UserManagementComp = () => {
  const [AllUser, setAllUser] = useState(null);
  const [User, setUser] = useState(null);
  const [page, setPage] = useState(1);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [deleteUser, setDeleteUser] = useState(false);

  const router = useRouter();
  const DeleteUser = async (email) => {
    console.log("delete account");
    var token = `Bearer ${localStorage.getItem("token")}`;
    const url = `${process.env.NEXT_PUBLIC_BaseUrl}api/user/delete_user/${email}`;
    var response = await deleteData(url, token);
    console.log(response);
    if (response.statusCode === 200) {
      setDeleteUserId(null);
      window.location.reload();
    }
  };
  function handleDelete(id) {
    setDeleteUserId(id);
    setDeleteUser(true);
  }

  async function handleSuspend(email) {
    console.log("Suspend email:", email);
    var token = `Bearer ${localStorage.getItem("token")}`;
    const url = `${process.env.NEXT_PUBLIC_BaseUrl}api/user/suspend_user/${email}`;
    var response = await postDataAuth(url, email, token);
    if (response.statusCode === 200) {
      window.location.reload();
    }
  }
  async function handleUnSuspend(email) {
    console.log("Unuspend email:", email);
    var token = `Bearer ${localStorage.getItem("token")}`;
    const url = `${process.env.NEXT_PUBLIC_BaseUrl}api/user/unsuspend_user/${email}`;
    var response = await postDataAuth(url, email, token);
    if (response.statusCode === 200) {
      window.location.reload();
    }
  }

  function confirmDelete() {
    if (deleteUserId !== null) {
      DeleteUser(deleteUserId);
    }
  }

  function cancelDelete() {
    setDeleteUser(false);
  }

  const fetchDashboardData = async (pageNumber) => {
    try {
      const token = `Bearer ${localStorage.getItem("token")}`;
      const allUserUrl = `${process.env.NEXT_PUBLIC_BaseUrl}api/user/all/5/${pageNumber}`;
      const Url = `${process.env.NEXT_PUBLIC_BaseUrl}api/user/me/info`;

      const headers = {
        Authorization: token,
      };

      const [userDetailResponse, allUserDetailsResponse] = await Promise.all([
        fetch(Url, { headers }),
        fetch(allUserUrl, { headers }),
      ]);

      const userData = await userDetailResponse.json();
      const allUserData = await allUserDetailsResponse.json();
      console.log(allUserData.result);
      setAllUser(allUserData.result);
      setUser(userData.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData(page);
  }, [page]);

  if (User && User.role !== "ADMIN") {
    router.push("/home");
  }

  if (!User || !AllUser) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Image
          src="/asset/loading.gif"
          alt="Example GIF"
          width={100}
          height={80}
        />
      </div>
    );
  }

  return (
    <>
      <table className="w-full tabble">
        <thead>
          <tr>
            <th>Cam Girls</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {AllUser.user.map((user) => (
            <tr key={user.id}>
              <td>
                <div className="flex items-center gap-4">
                  <img
                    src={
                      user.profilePicture
                        ? `${user.profilePicture}`
                        : "/asset/testImage.jpg"
                    }
                    height={45}
                    width={45}
                    className="rounded-md"
                    alt="User image"
                  />
                  <div>
                    <p className="text-h6">
                      {user.firstName + " " + user.lastName}
                    </p>
                  </div>
                </div>
              </td>

              <td className="flex items-center gap-2">
                <button
                  className="icon"
                  onClick={() => handleDelete(user.email)}
                >
                  <Image
                    src="/asset/delete.png"
                    height={16}
                    width={16}
                    alt="Delete icon"
                  />
                </button>
                {!user.suspendUser ? (
                  <button
                    className="icon"
                    onClick={() => handleSuspend(user.email)}
                  >
                    <Image
                      src="/asset/suspend.png"
                      height={16}
                      width={16}
                      alt="Suspend icon"
                    />
                  </button>
                ) : (
                  <button
                    className="icon"
                    onClick={() => handleUnSuspend(user.email)}
                  >
                    <Image
                      src="/asset/unsuspend.png"
                      height={16}
                      width={16}
                      alt="Unsuspend icon"
                    />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center gap-4 justify-center">
        {Array.from({ length: AllUser.totalPages }, (_, index) => (
          <p
            key={index}
            onClick={() => setPage(index + 1)}
            style={{ cursor: "pointer" }}
            className=" text-white bg-black rounded-sm p-2"
          >
            {index + 1}
          </p>
        ))}
      </div>

      {deleteUser && (
        <div className="delete_user shadow-md lg:p-10 sm:p-5 p-2">
          <h5 className="text-h5">Are you sure you want to delete</h5>
          <div className="flex gap-2 m-2">
            <button
              className="py-2 px-3 rounded-md bg-pink"
              onClick={confirmDelete}
            >
              Yes
            </button>
            <button
              onClick={cancelDelete}
              className="py-2 px-3 text-black rounded-md bg-white"
            >
              No
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UserManagementComp;
