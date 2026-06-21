import Header from "./_components/Header";
import Footer from "./_components/Footer";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const Hero = dynamic(() => import("./_components/Hero"), {
  ssr: true,
});

export default function Home({ searchParams }: any) {
  return (
    <div>
      <Header />

      <Suspense fallback={<div className="text-white p-4">Loading hero...</div>}>
        <Hero searchParams={searchParams} />
      </Suspense>

      <Footer />
    </div>
  );
}