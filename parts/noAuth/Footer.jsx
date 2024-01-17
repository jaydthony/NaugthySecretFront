import Link from "next/link";
import { useRouter } from "next/router";

export default function Footer({ t }) {
  const { router, push, locales } = useRouter();
  const changeLanguage = (language) => {
    push("/", undefined, { locale: language });
  };
  return (
    <div className="footer">
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        <h6 className="border-r-2 border-gray-500 pr-2">Languages</h6>
        {locales.map((l) => (
          <div className="border-r-2 border-gray-500 pr-2" key={l}>
            <button onClick={() => changeLanguage(l)}>{l}</button>
          </div>
        ))}
      </div>
      <div className="flex gap-2 justify-center mb-6 ">
        <div className="border-r-2 border-gray-500 pr-2">
          <Link href="/term_&_condition">{t("term")}</Link>
        </div>
        <div className="border-r-2 border-gray-500 pr-2">
          <Link href="/Blog">{t("blog")}</Link>
        </div>
        <div className="border-r-2 border-gray-500 pr-2">
          <Link href="/privacy">{t("privacy")}</Link>
        </div>
      </div>
      <div className="text-center flex items-center flex-col ">
        <p className="w-1/2">
          <small>{t("termpar")}</small>
        </p>
        <p>
          <small>{t("location")}</small>
        </p>
        <p className="mt-3">
          <small>Copyright © Naughty Secret 2023</small>
        </p>
      </div>
    </div>
  );
}
