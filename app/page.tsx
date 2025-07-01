import Image from "next/image";
import Header from "./_components/Header";
// import Hero from "./_components/Hero";
import Footer from "./_components/Footer";
import { Suspense } from "react";
import dynamic from "next/dynamic";
const Hero = dynamic(() => import("./_components/Hero"), {
  ssr: true,
});
export default function Home() {
  return (
    <div>
      <Header/>
        <Suspense fallback={<div className="text-white p-4">Loading hero...</div>}>
          <Hero />
        </Suspense>
      <Footer/>
    </div>
  );
}
