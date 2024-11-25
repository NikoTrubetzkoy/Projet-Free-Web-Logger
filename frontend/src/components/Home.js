import Head from "next/head";
import Writer from "./Writer";
import Articles from "./Articles";
import { Footer } from "antd/es/layout/layout";

export default function Home() {
  return (
    <>
      <Head>
        <title>Free Web Logger</title>
      </Head>
      <div class="flex flex-col w-screen items-center">
        <Articles />
      </div>
      <Writer></Writer>
      <Footer></Footer>
    </>
  );
}
