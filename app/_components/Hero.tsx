import Image from "next/image";
import Link from "next/link";
import Collection from "./Collection";
import { getAllEvents } from "@/lib/actions/event.actions";
import Search from "./Search";
import CategoryFilter from "./CategoryFilter";
import { Suspense } from "react";
import { SearchParamProps } from "@/types";

async function Hero({ searchParams }: SearchParamProps) {
  // ✅ FIX: await searchParams first
  const params = await Promise.resolve(searchParams);

  const page = Number(params?.page) || 1;
  const searchText = (params?.query as string) || "";
  const category = (params?.category as string) || "";

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6,
  });

  return (
    <div>
      {/* HERO SECTION */}
      <section className="w-full min-h-screen flex flex-col md:flex-row bg-black text-white relative overflow-hidden">
        {/* subtle glow behind the text, purely decorative */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Left */}
        <div className="relative flex flex-col justify-center items-start p-10 md:p-16 lg:p-20 w-full md:w-1/2 z-10">
          <span className="text-orange-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Campus Events, Simplified
          </span>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
            Host <span className="text-orange-500">Unforgettable</span>
            <br />
            Campus Moments
          </h2>

          <p className="mb-8 max-w-md text-base sm:text-lg text-gray-400 leading-relaxed font-light">
            Create, manage, and showcase your college events with ease.
          </p>

          <Link href="/events/create">
            <button className="bg-orange-500 text-white font-semibold text-sm tracking-wide px-6 py-3 rounded-lg shadow-lg shadow-orange-500/30 hover:bg-orange-600 hover:shadow-orange-500/50 transition-all duration-200">
              GET STARTED
            </button>
          </Link>
        </div>

        {/* Right */}
        <div className="relative w-full md:w-1/2 h-96 md:h-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent md:bg-gradient-to-r md:from-black/40 z-10" />
          <Image
            src="/assets/images/img3.jpg"
            alt="Event"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* EVENTS SECTION */}
      <section id="events" className="bg-black py-20 px-6 md:px-16 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <span className="text-orange-400 text-xs font-semibold tracking-[0.2em] uppercase">
              What's Happening
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mt-3 mb-3">
              Discover <span className="text-orange-500">Live</span> Events
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto font-light">
              Browse what's coming up around campus and find something worth showing up for.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-10 bg-white/5 border border-white/10 rounded-xl p-4">
            <Suspense fallback={<div className="text-gray-400 px-2">Loading...</div>}>
              <Search />
            </Suspense>

            <CategoryFilter />
          </div>

          <Collection
            data={events?.data}
            emptyTitle="No Events Found"
            emptyStateSubtext="Come back later"
            collectionType="All_Events"
            limit={6}
            page={page}
            totalPages={events?.totalPages}
          />
        </div>
      </section>
    </div>
  );
}

export default Hero;