import AppWrapper from "@/components/AppWrapper";
import { Suspense } from "react";
import Loading from "../loading";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";

const Navbar = dynamic(() => import("@/components/navbar/Navbar"), {
  loading: () => <Loading />,
});
const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <Loading />,
});

async function HomeLayout({ children }) {
  const cookie = await cookies();
  let cookieValue = cookie?.get("token");
  return (
    <>
      <AppWrapper cookie={cookieValue} />
      <main className="relative">
        <Navbar />
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </main>
      <Footer />
    </>
  );
}

export default HomeLayout;
