import Link from "next/link";
import { useRouter } from "next/router";

export default function SelectInputForm() {
  const { push, locale, locales } = useRouter();

  const changeLanguage = (e) => {
    const selectedLanguage = e.target.value;
    push("/home", undefined, { locale: selectedLanguage });
  };

  return (
    <div className="py-3 border-b-2">
      <select
        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        value={locale}
        onChange={changeLanguage}
      >
        {locales.map((l) => (
          <option
            key={l}
            value={l}
            className="py-1 px-2 text-base text-gray-700"
          >
            {l}
          </option>
        ))}
      </select>
    </div>
  );
}
