import SmoothScrollLink from "./SmoothScrollLink";
import Image from "next/image";

export default function BodyPage({ t }) {
  return (
    <div>
      <section className="mb-10 text-center">
        <h3 className="font-semibold mb-10 text-black text-4xl">
          {t("live-chat")}
        </h3>
        <h5 className="text-xl">{t("nuaghty")}</h5>
      </section>
      <section className="lg:flex items-center mb-10 gap-6 mx-20">
        <div className="w-full">
          <Image
            src="/asset/image-1.png"
            height={400}
            width={600}
            className="w-full"
            alt="An image of users video-chatting"
          />
        </div>
        <div className="w-full">
          <h3 className="font-semibold mb-10 text-black text-4xl">
            {t("ran")}
          </h3>
          <h5>{t("par")}</h5>
        </div>
      </section>
      <section className="lg:flex items-center mb-10 gap-6 mx-20">
        <div className="w-full">
          <h3 className="font-semibold mb-10 text-black text-4xl">
            {t("instant")}
          </h3>
          <h5>{t("par2")}</h5>
        </div>
        <div className="w-full">
          <Image
            src="/asset/image-2.png"
            height={400}
            width={600}
            className="w-full"
            alt="A chat image"
          />
        </div>
      </section>
      <section className="lg:flex items-center mb-10 gap-6 mx-20">
        <div className="w-full">
          <Image
            src="/asset/image-3.png"
            height={400}
            width={600}
            className="w-full"
            alt="A match-making image"
          />
        </div>
        <div className="w-full">
          <h3 className="font-semibold mb-10 text-black text-4xl">
            {t("match")}
          </h3>
          <h5>{t("par3")}</h5>
        </div>
      </section>
      <section className="landing-bgimage py-[6.25rem] text-center mb-10">
        <h1 className="font-extrabold text-3xl text-white">
          <span className="text-5xl">{t("million")}</span> {t("mem")}{" "}
          <span className="text-5xl">{t("100")}</span> {t("country")}
        </h1>
      </section>
      <section className="text-center mb-10">
        <h1 className="mb-10 text-4xl text-pink font-semibold">{t("try")}</h1>
        <h6 className="mb-10">
          {t("selgender")}
          <br /> {t("ranvid")}
          <span className="font-bold">{t("no-sign")}</span>.
        </h6>
        <div className="rounded-md bg-pink text-white font-extrabold py-4 px-10 m-auto w-1/4">
          <SmoothScrollLink to="element1">{t("trynow")}</SmoothScrollLink>
        </div>
      </section>
    </div>
  );
}
