import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Footer from "@/parts/noAuth/Footer";
import BodyPage from "@/components/BodyPage";
import HeroSection from "@/components/HeroSection";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

function Home() {
  const [isGender, setIsGender] = useState(null);
  const { push, locale, locales } = useRouter();
  const { t } = useTranslation("home");

  useEffect(() => {
    const localGender = localStorage.getItem("gender");
    const token = localStorage.getItem("token");
    if (token) {
      push("/home");
    }
    setIsGender(localGender);
  }, []);

  function handleGender(gender) {
    localStorage.setItem("gender", gender);
    setIsGender(gender);
  }

  return (
    <div>
      <h1 className=" text-black">
        Kindly reach me via this email, Simon - jaydthony@gmail.com
      </h1>
      {!isGender && (
        <div className="lg:py-20 md:mb-10 p-5 sm:p-10 view-page text-center">
          <section
            style={{ maxWidth: "60rem", height: "35rem" }}
            className="w-full m-auto rounded-md card-view flex justify-center"
          >
            <div className="self-center">
              <p className="text-2xl font-semibold mb-5 text-black">
                You are...
              </p>
              <div className="flex gap-8">
                <button
                  className="home-image"
                  onClick={() => handleGender("male")}
                >
                  <Image
                    src="/asset/male.png"
                    alt="male"
                    height={80}
                    width={80}
                  />
                </button>
                <button
                  className="home-image"
                  onClick={() => handleGender("female")}
                >
                  <Image
                    src="/asset/female.png"
                    height={72}
                    width={72}
                    alt="female"
                  />
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
      {isGender && <HeroSection t={t} />}

      <div className="hidden md:block">
        <BodyPage t={t} />
        <div className="mt-10">
          <Footer t={t} />
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
