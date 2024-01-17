import { useState, useEffect } from "react";

import { dummyData } from "@/contants";
import DashboardLayout from "@/components/DashboardLayout";
import Image from "next/image";
import { fetchData } from "@/service/apiCalls/Fetcher";
import SearchUsers from "@/components/SearchUsers";

const CamManage = () => {
  const [AllUser, setAllUser] = useState(null);
  const [userCam, setUserCam] = useState(null);
  const [User, setUser] = useState(null);
  const [page, setPage] = useState(1);
  const [userCamPage, setUserCamPage] = useState(1);

  const fetchDashboardData = async (pageNumber) => {
    try {
      const token = `Bearer ${localStorage.getItem("token")}`;
      const allUserUrl = `${process.env.NEXT_PUBLIC_BaseUrl}api/camgirl/all/3/${pageNumber}`;
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
      console.log("All users data");
      console.log(allUserData.result);

      console.log(userData.result);
      setAllUser(allUserData.result);
      setUser(userData.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData(page);
  }, [page]);

  const fetchUserCamgirlDashboardData = async (pageNumber) => {
    try {
      const token = `Bearer ${localStorage.getItem("token")}`;
      const userCamUrl = `${process.env.NEXT_PUBLIC_BaseUrl}api/call/record/all/3/${pageNumber}`;
      const response = await fetchData(userCamUrl, token);

      console.log("All user-camgirl datas");
      console.log(response.result);
      setUserCam(response.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchUserCamgirlDashboardData(userCamPage);
  }, [userCamPage]);

  return (
    <>
      <DashboardLayout>
        <SearchUsers />
        <div className="bg-white shadow-md rounded-lg p-4 my-5 mx-4">
          <h5 className="text-h5">User/Cam-Girl</h5>
          {userCam ? (
            <div className="overflow-auto">
              <table className="w-full tabble">
                <thead>
                  <tr>
                    <th>User Email</th>
                    <th>Camgirl Email</th>
                    <th>Minutes used</th>
                  </tr>
                </thead>
                <tbody className="text-black">
                  {userCam.result.map((user) => {
                    return (
                      <tr key={user.id}>
                        <td>
                          <h5 className="whitespace-nowrap">{user.userId}</h5>
                        </td>
                        <td>
                          <h5 className="whitespace-nowrap">
                            {user.camgirlId}
                          </h5>
                        </td>
                        <td>
                          <h5>{user.timeUsed}</h5>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="flex items-center gap-4 justify-center">
                {Array.from({ length: userCam.totalPages }, (_, index) => (
                  <p
                    key={index}
                    onClick={() => setUserCamPage(index + 1)}
                    style={{ cursor: "pointer" }}
                    className=" text-white bg-black rounded-sm p-2"
                  >
                    {index + 1}
                  </p>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Image
                src="/asset/loading.gif"
                alt="Example GIF"
                width={100}
                height={80}
              />
            </div>
          )}
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 my-5 mx-4">
          <h5 className="text-h5">Get all camgirl call records</h5>
          {AllUser ? (
            <div className="overflow-auto">
              <table className="w-full tabble">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>

                    <th>Minutes</th>
                  </tr>
                </thead>
                <tbody>
                  {AllUser.user.map((user) => {
                    return (
                      <tr key={user.id}>
                        <td>
                          <p className="text-h6">{user.userName}</p>
                        </td>
                        <td>
                          <p className="text-h6">{user.email}</p>
                        </td>
                        <td>{user.timeAvailable}</td>
                      </tr>
                    );
                  })}
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
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Image
                src="/asset/loading.gif"
                alt="Example GIF"
                width={100}
                height={80}
              />
            </div>
          )}
        </div>
      </DashboardLayout>
    </>
  );
};

export default CamManage;
