import { blogData } from "@/contants";
import Footer from "@/parts/noAuth/Footer";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Blog = () => {
  const { t } = useTranslation("home");
  return (
    <>
      <div className="view-page pb-10 mb-10">
        <h4 className="text-4xl text-black mb-10 hidden md:block text-center">
          Uk<span className="font-semibold">Crush</span>
        </h4>
        <div className="blog-container md:rounded-lg ">
          <div className="md:flex justify-center mb-4">
            <button className="md:w-1/4 py-2 blog-btn">
              <Link href="/">Start a Random chat</Link>
            </button>
            <button className=" md:w-1/4 py-2 blog-btn">
              <Link href="/">All Articles</Link>
            </button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
            {blogData.map((blog, index) => {
              return (
                <Link href="#" className="pb-4" key={index}>
                  <div style={{ height: "15rem" }}>
                    <Image
                      src={blog.imageUrl}
                      width={300}
                      height={300}
                      className="blog-img"
                      alt="Blog Image"
                    />
                  </div>
                  <h4 className="text-black font-bold text-xl lg:text-2xl mt-2">
                    {blog.title}
                  </h4>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <Footer t={t} />
    </>
  );
};
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["home"])),
    },
  };
}

export default Blog;
