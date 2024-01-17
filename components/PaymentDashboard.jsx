import { useState, useEffect } from "react";
import { dummyData } from "@/contants";
import Image from "next/image";
import { fetchData } from "@/service/apiCalls/Fetcher";
import { useRouter } from "next/router";

const PaymentDashboard = () => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [AllUser, setAllUser] = useState(null);
  const [userPage, setUserPage] = useState(1);
  const [page, setPage] = useState(1);
  const [searchTopUserPayment, setSearchTopUserPayment] = useState("");
  // const [searchUser, setSearchUser] = useState(false);
  const [userPaymentClick, setUserPaymentClick] = useState(false);

  const fetchDashboardData = async (pageNumber) => {
    try {
      const token = `Bearer ${localStorage.getItem("token")}`;
      const allUserUrl = `${process.env.NEXT_PUBLIC_BaseUrl}api/payment/user/all/3/${pageNumber}`;
      const Url = `${process.env.NEXT_PUBLIC_BaseUrl}api/user/me/info`;

      const response = await fetchData(allUserUrl, token);
      const responseInfo = await fetchData(Url, token);
      console.log(response.result);
      console.log(response.result.payments);
      console.log(responseInfo.result);
      setUserInfo(responseInfo.result);
      setAllUser(response.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData(page);
  }, [page]);

  const fetchUserPaymentData = async (searchPayment, pageNumber) => {
    try {
      const token = `Bearer ${localStorage.getItem("token")}`;
      const allUserUrl = `${process.env.NEXT_PUBLIC_BaseUrl}api/payment/user/all/${searchPayment}/3/${pageNumber}`;
      setUserPaymentClick(true);
      const response = await fetchData(allUserUrl, token);
      console.log(response.result.payments);
      if (response.statusCode === 200) {
        // setSearchUser(false);
        setUserPaymentClick(false);
        setUser(response.result);
      }
    } catch (error) {
      setUserPaymentClick(false);
      alert(error.response.data.errorMessages[0]);
      console.error("Error fetching data:", error);
    }
  };

  const handleUserPayment = async (event) => {
    event.preventDefault();
    fetchUserPaymentData(searchTopUserPayment, userPage);
    console.log("Search value for user record:", searchTopUserPayment);
  };
  const handleSearchInputChange = (event) => {
    setSearchTopUserPayment(event.target.value);
  };

  if (userInfo && userInfo.role !== "ADMIN") {
    router.push("/home");
  }

  if (!userInfo) {
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
      <div className="bg-white shadow-md rounded-lg p-4 mb-10">
        <form className="my-4 mx-4" onSubmit={handleUserPayment}>
          <label className="mb-2 block text-black font-bold">
            USER ID TO GENERATE SLIP
          </label>
          <input
            type="search"
            name="search"
            placeholder="Enter User Id"
            className="border-2 rounded-md focus:outline-none p-4 w-1/2"
            value={searchTopUserPayment}
            onChange={handleSearchInputChange}
          />
        </form>
        {userPaymentClick && (
          <div className="flex items-center justify-center">
            <Image
              src="/asset/loading.gif"
              alt="Example GIF"
              width={100}
              height={80}
            />
          </div>
        )}
        {user && (
          <div className="overflow-auto">
            <table className="w-full tabble">
              <thead>
                <tr>
                  <th>User</th>
                  <th className="whitespace-nowrap">Created Payment Time</th>
                  <th>Status</th>
                  <th>Description</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {user.payments.map((person) => {
                  return (
                    <tr key={person.id}>
                      <td>
                        <p className="text-h6 whitespace-nowrap">
                          {person.email}
                        </p>
                      </td>
                      <td className="whitespace-nowrap">
                        {new Date(person.createdPaymentTime).toLocaleString()}
                      </td>
                      <td>
                        {person.paymentStatus.charAt(0).toUpperCase() +
                          person.paymentStatus.slice(1).toLowerCase()}
                      </td>
                      <td className="whitespace-nowrap">
                        {person.description}
                      </td>
                      <td>${person.amount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex items-center gap-4 justify-center">
              {Array.from({ length: user.totalPages }, (_, index) => (
                <p
                  key={index}
                  onClick={() => setUserPage(index + 1)}
                  style={{ cursor: "pointer" }}
                  className=" text-white bg-black rounded-sm p-2"
                >
                  {index + 1}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-white shadow-md rounded-lg p-4 mb-5">
        <h5 className="text-h5">USERS PAYMENT HISTORY</h5>
        {!AllUser ? (
          <div className="flex items-center justify-center">
            <Image
              src="/asset/loading.gif"
              alt="Example GIF"
              width={100}
              height={80}
            />
          </div>
        ) : (
          <div className="overflow-auto">
            <table className="w-full tabble">
              <thead>
                <tr>
                  <th>User</th>
                  <th className="whitespace-nowrap">Created Payment Time</th>
                  <th>Status</th>
                  <th>Description</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {AllUser.payments.map((user) => {
                  return (
                    <tr key={user.id}>
                      <td>
                        <p className="text-h6 whitespace-nowrap">
                          {user.email}
                        </p>
                      </td>
                      <td className="whitespace-nowrap">
                        {new Date(user.createdPaymentTime).toLocaleString()}
                      </td>
                      <td>
                        {user.paymentStatus.charAt(0).toUpperCase() +
                          user.paymentStatus.slice(1).toLowerCase()}
                      </td>
                      <td className="whitespace-nowrap">{user.description}</td>
                      <td>${user.amount}</td>
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
        )}
      </div>
    </>
  );
};

export default PaymentDashboard;
