import { dummyData } from "@/contants";
import { fetchData } from "@/service/apiCalls/Fetcher";
import { useState } from "react";
import Image from "next/image";

export default function SearchUsers() {
  const [userRecords, setUserRecords] = useState(null);
  const [userMinutes, setUserMinutes] = useState(null);
  const [searchTopUserRecord, setSearchTopUserRecord] = useState("");
  const [searchTopUserValue, setSearchTopUserValue] = useState("");
  const [searchSpecificUserValue, setSearchSpecificUserValue] = useState("");
  const [specificPage, setSpecificPage] = useState(1);
  const [specificUserRecords, setSpecificUserRecords] = useState(null);
  const [searchTopUserRecordClick, setSearchTopUserRecordClick] =
    useState(false);
  const [searchTopUserTimeClick, setSearchTopUserTimeClick] = useState(false);
  const [searchSpecificUserClick, setSearchSpecificUserClick] = useState(false);

  const handleTopUsersRecord = async (event) => {
    event.preventDefault();
    try {
      setSearchTopUserRecordClick(true);
      const token = `Bearer ${localStorage.getItem("token")}`;
      const Url = `${process.env.NEXT_PUBLIC_BaseUrl}api/call/record/mostcall/${searchTopUserRecord}`;
      const response = await fetchData(Url, token);
      if (response.statusCode === 200) {
        setSearchTopUserRecordClick(false);
        console.log(response.result);
        setUserRecords(response.result);
        console.log("Search value for user record:", searchTopUserRecord);
        setSearchTopUserRecord("");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.title);
      setSearchTopUserRecordClick(false);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchTopUserRecord(event.target.value);
  };

  const handleTopUsers = async (event) => {
    event.preventDefault();
    try {
      setSearchTopUserTimeClick(true);
      const token = `Bearer ${localStorage.getItem("token")}`;
      const Url = `${process.env.NEXT_PUBLIC_BaseUrl}api/time/most/${searchTopUserValue}`;
      const response = await fetchData(Url, token);
      if (response.statusCode === 200) {
        setSearchTopUserTimeClick(false);
        console.log(response.result);
        setUserMinutes(response.result);
        console.log("Search value for top users:", searchTopUserValue);
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.title);
      setSearchTopUserTimeClick(false);
    }
  };

  const handleSearchUsersInputChange = (event) => {
    setSearchTopUserValue(event.target.value);
  };
  const handleSpecificUserRecord = async (event) => {
    event.preventDefault();
    try {
      setSearchSpecificUserClick(true);
      const token = `Bearer ${localStorage.getItem("token")}`;
      const Url = `${process.env.NEXT_PUBLIC_BaseUrl}api/call/record/user/${searchSpecificUserValue}/3/${specificPage}`;
      console.log(Url);
      const response = await fetchData(Url, token);
      if (response.statusCode === 200) {
        console.log(response.result);
        setSearchSpecificUserClick(false);
        setSpecificUserRecords(response.result);
        console.log("Search value for top users:", searchTopUserValue);
      }
    } catch (error) {
      alert(error.response.data.errorMessages[0]);
      setSearchSpecificUserClick(false);
      console.log(error);
    }
  };

  const handleSpecificInputChange = (event) => {
    setSearchSpecificUserValue(event.target.value);
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-4 my-5 mx-4">
        <form className="my-4 mx-4" onSubmit={handleTopUsersRecord}>
          <label className="mb-2 block">Select top users call record</label>
          <input
            type="search"
            name="search"
            placeholder="Select top users call record"
            className="border-2 rounded-md focus:outline-none p-4 w-1/2"
            value={searchTopUserRecord}
            onChange={handleSearchInputChange}
          />
        </form>
        {searchTopUserRecordClick && (
          <div className="flex items-center justify-center">
            <Image
              src="/asset/loading.gif"
              alt="Example GIF"
              width={100}
              height={80}
            />
          </div>
        )}
        {userRecords && (
          <div className="overflow-auto">
            <table className="w-full tabble">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Call Record</th>
                </tr>
              </thead>
              <tbody>
                {userRecords.map((user) => {
                  return (
                    <tr key={user.id}>
                      <td>
                        <p className="text-h6">{user.email}</p>
                      </td>
                      <td>{user.totalTimeUsed}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="bg-white shadow-md rounded-lg p-4 my-5 mx-4">
        <form className="my-4 mx-4" onSubmit={handleTopUsers}>
          <label className="mb-2 block">
            Select top users based on time purchased
          </label>
          <input
            type="search"
            name="search"
            placeholder="Select top users based on time purchased"
            className="border-2 rounded-md focus:outline-none p-4 w-1/2"
            value={searchTopUserValue}
            onChange={handleSearchUsersInputChange}
          />
        </form>
        {searchTopUserTimeClick && (
          <div className="flex items-center justify-center">
            <Image
              src="/asset/loading.gif"
              alt="Example GIF"
              width={100}
              height={80}
            />
          </div>
        )}
        {userMinutes && (
          <div className="overflow-auto">
            <table className="w-full tabble">
              <thead>
                <tr>
                  <th>User Email</th>
                  <th>Minutes Bought</th>
                </tr>
              </thead>
              <tbody>
                {userMinutes.map((user) => {
                  return (
                    <tr key={user.id}>
                      <td>
                        <p className="text-h6">{user.email}</p>
                      </td>
                      <td>{user.totalTimeBuy}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="bg-white shadow-md rounded-lg p-4 my-5 mx-4">
        <h5 className="text-h5">Specific user call with Associated Cam Girl</h5>
        <form className="my-4 mx-4" onSubmit={handleSpecificUserRecord}>
          <label className="mb-2 block">User Id:</label>
          <input
            type="search"
            name="search"
            placeholder="Enter user Id..."
            className="border-2 rounded-md focus:outline-none p-4 w-1/2"
            value={searchSpecificUserValue}
            onChange={handleSpecificInputChange}
          />
        </form>
        {searchSpecificUserClick && (
          <div className="flex items-center justify-center">
            <Image
              src="/asset/loading.gif"
              alt="Example GIF"
              width={100}
              height={80}
            />
          </div>
        )}
        {specificUserRecords && (
          <div className="overflow-auto">
            <table className="w-full tabble">
              <thead>
                <tr>
                  <th>User Email</th>
                  <th className="whitespace-nowrap">Cam Girl Email</th>
                  <th>Minutes used</th>
                </tr>
              </thead>
              <tbody className="text-black">
                {specificUserRecords.result.map((user) => {
                  return (
                    <tr key={user.id}>
                      <td>
                        <h5 className="whitespace-nowrap">{user.userId}</h5>
                      </td>
                      <td>
                        <h5 className="whitespace-nowrap">{user.camgirlId}</h5>
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
              {Array.from(
                { length: specificUserRecords.totalPages },
                (_, index) => (
                  <p
                    key={index}
                    onClick={() => setSpecificPage(index + 1)}
                    style={{ cursor: "pointer" }}
                    className=" text-white bg-black rounded-sm p-2"
                  >
                    {index + 1}
                  </p>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
