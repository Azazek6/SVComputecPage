import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import NProgress from "nprogress";
import DashBoard from "../components/DashBoard";

const Layout = ({ children }) => {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      NProgress.start();
    };
    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", () => NProgress.done());

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  return (
    <>
      <Head>
        <title>svcomputec</title>
      </Head>
      <DashBoard>{children}</DashBoard>
    </>
  );
};

export default Layout;
