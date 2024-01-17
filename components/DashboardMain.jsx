import { useEffect, useState } from "react";
import { dummyData } from "@/contants";
import Image from "next/image";
import BarChartComponent from "./BarChartComponents";
import { fetchData } from "@/service/apiCalls/Fetcher";
import { useRouter } from "next/router";

const DashboardMain = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [data, setData] = useState(null);
  const [mostRecord, setMostRecord] = useState(null);
  const [time, setTime] = useState(null);
  const [UserData, setUserData] = useState("");
  const [timeUsed, setTimeUsed] = useState(null);

  useEffect(() => {
    const fetcUserDetails = async () => {
      const token = `Bearer ${localStorage.getItem("token")}`;
      const Url = `${process.env.NEXT_PUBLIC_BaseUrl}api/user/me/info`;
      try {
        const getData = await fetchData(Url, token);
        setUserData(getData.result);
        console.log("getting data");
        localStorage.setItem("email", getData.result.email);
        console.log(UserData);
      } catch (e) {
        console.log(e);
      }
    };

    fetcUserDetails();

    const fetchDashboardData = async () => {
      try {
        const token = `Bearer ${localStorage.getItem("token")}`;
        console.log(token);
        const mostCallRecordUrl = `${process.env.NEXT_PUBLIC_BaseUrl}api/call/record/mostcall/4`;
        const mostRecordsUrl = `${process.env.NEXT_PUBLIC_BaseUrl}api/time/most/5`;
        const timeRecordsUrl = `${process.env.NEXT_PUBLIC_BaseUrl}api/time/all/2/1`;
        const callRecordsUrl = `${process.env.NEXT_PUBLIC_BaseUrl}api/call/record/all/5/1`;

        const headers = {
          Authorization: token,
        };

        const [
          mostRecordResponse,
          timeResponse,
          callResponse,
          mostCallRecordResponse,
        ] = await Promise.all([
          fetch(mostRecordsUrl, { headers }),
          fetch(timeRecordsUrl, { headers }),
          fetch(callRecordsUrl, { headers }),
          fetch(mostCallRecordUrl, { headers }),
        ]);

        const mostRecordData = await mostRecordResponse.json();
        const timeData = await timeResponse.json();
        const callData = await callResponse.json();
        const mostcallRecordInfoData = await mostCallRecordResponse.json();
        console.log(mostcallRecordInfoData);
        setMostRecord(mostRecordData);
        setTime(timeData);
        setTimeUsed(callData);
        setData(mostcallRecordInfoData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  if (!data || !mostRecord || !time || !timeUsed) {
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
    <div className="bg-grey p-5">
      <BarChartComponent
        totaltime={time.result.totalMinuteBuy}
        totalTimeUsed={timeUsed.result.totalMinuteUsed}
      />
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white shadow-md rounded-lg p-4 w-full mb-5">
          <h4 className="text-h4">Top five users with most minute bought</h4>
          {!mostRecord ? (
            <div className="w-screen h-screen flex items-center justify-center">
              <Image
                src="/asset/loading.gif"
                alt="Example GIF"
                width={100}
                height={80}
              />
            </div>
          ) : (
            <table className="w-full tabble">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Minutes Bought</th>
                </tr>
              </thead>
              <tbody>
                {mostRecord.result.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-h6">{user.userName}</p>
                        </div>
                      </div>
                    </td>
                    <td>{user.totalTimeBuy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 w-full mb-5">
          <h4 className="text-h4">Top five users with most call made.</h4>
          {!data ? (
            <div className="w-screen h-screen flex items-center justify-center">
              <Image
                src="/asset/loading.gif"
                alt="Example GIF"
                width={100}
                height={80}
              />
            </div>
          ) : (
            <table className="w-full tabble">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Minutes Used</th>
                </tr>
              </thead>
              <tbody>
                {data.result.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="flex items-center gap-4">
                        <p>{user.userName}</p>
                      </div>
                    </td>
                    <td>{user.totalTimeUsed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
