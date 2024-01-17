import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import BodyPage from "@/components/BodyPage";
import AuthComponent from "@/parts/withAuth/AuthComponent";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Footer2 from "@/parts/noAuth/Footer2";

function Home() {
  const { t } = useTranslation("home");
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const localGender = localStorage.getItem("gender");

    if (token === null || token === undefined) {
      router.push("/");
      return;
    }

    const fetchUser = async () => {
      const tokenHeader = `Bearer ${token}`;
      const url = `${process.env.NEXT_PUBLIC_BaseUrl}api/user/me/info`;

      try {
        const response = await fetch(url, {
          headers: {
            Authorization: tokenHeader,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const value = data.result;

          localStorage.setItem("id", value.id);

          if (value.role === "ADMIN") {
            router.push("/dashboard");
          }

          setUser(value);
        } else {
          console.error("Error fetching user data");
        }
      } catch (error) {
        console.error("Network error occurred:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Image
          src="/asset/loading.gif"
          alt="Loading GIF"
          width={100}
          height={80}
        />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-screen h-screen flex flex-col gap-4 items-center justify-center">
        <h1>Network error occurred, please check your internet connectivity</h1>
        <Link href={"/"}>
          <button className="bg-blue p-2 text-white rounded-lg">
            Back to HomePage
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className=" text-black">
        Kindly reach me via this email, Simon - jaydthony@gmail.com
      </h1>
      <AuthComponent time={user.timeAvailable} data={user} t={t} />

      <div className="hidden md:block">
        <BodyPage t={t} />
        <div className="mt-10">
          <Footer2 t={t} />
        </div>
      </div>
    </div>
  );
}
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["home"])),
    },
  };
}
export default Home;
