import { useState } from "react";
import PurchaseTimeModal from "./PurchaseTimeModal";
import { fetchData, postData, postDataAuth } from "@/service/apiCalls/Fetcher";
import { useRouter } from "next/router";

const AuthChatting = ({ time, datas, t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const openModal = async () => {
    if (time === 0 && datas.role === "USER") {
      setIsOpen(true);
    } else {
      if (datas.role === "USER") {
        var matchUrl = `${process.env.NEXT_PUBLIC_BaseUrl}api/camgirl/match`;
        const url = `${process.env.NEXT_PUBLIC_BaseUrl}api/camgirl/available/1`;
        var token = `Bearer ${localStorage.getItem("token")}`;
        console.log(token);
        var response = await fetchData(url, token);
        if (response.statusCode === 200 && response.result.user[0] != null) {
          var camgirl = response.result.user[0];
          if (camgirl === null || !camgirl == undefined) {
            alert("Camgirls is not available");
            return;
          }
          if (datas.userName != null) {
            var roomLink = `https://vidchat-ten.vercel.app/room.html?room=${camgirl.userName}&&username=${datas.userName}`;
            let camGrilRoomLink = `https://vidchat-ten.vercel.app/camroom.html?room=${camgirl.userName}&&username=${camgirl.userName}`;
            console.log(roomLink);
            var data = {
              email: camgirl.email,
              roomLink: camGrilRoomLink,
            };
            let matchGirl = await postDataAuth(matchUrl, data, token);
            if (matchGirl.statusCode === 200) {
              router.push(roomLink);
            }
          }
        }
      } else if (datas.role === "CAMGIRL") {
        let camgirlStatusUrl = `${process.env.NEXT_PUBLIC_BaseUrl}api/camgirl/status`;
        let camstatus = {
          status: true,
          username: datas.userName,
        };
        let changestatus = await postData(camgirlStatusUrl, camstatus);
        if (changestatus.statusCode === 200) {
          let camGrilRoomLink = `https://vidchat-ten.vercel.app/camroom.html?room=${datas.userName}&&username=${datas.userName}`;
          router.push(camGrilRoomLink);
        }
      }
    }
  };
  const handleValueChange = (value) => {
    setIsOpen(false);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div className=" border-b-2 py-2 md:border-0">
      <button
        onClick={openModal}
        className="rounded-md bg-pink text-white font-extrabold py-4 px-10 mb-4"
      >
        Start chatting
      </button>

      {isOpen && <PurchaseTimeModal onValueChange={handleValueChange} t={t} />}
    </div>
  );
};

export default AuthChatting;
