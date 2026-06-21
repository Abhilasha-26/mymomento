import Image from "next/image";
import CheckoutButton from "../../../_components/CheckoutButton";
import Collection from "../../../_components/Collection";
import {
  getEventById,
  getRelatedEventsByCategory,
} from "@/lib/actions/event.actions";
import { getCurrentUser } from "@/lib/auth";
import { formatDateTime } from "@/lib/utils";
import Header from "@/app/_components/Header";
import Footer from "@/app/_components/Footer";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ page?: string }>;
};

export default async function EventDetails({
  params,
  searchParams,
}: PageProps) {
  const { id } = await params;
  const sp = await searchParams;

  const page = Number(sp?.page ?? 1);
  const currentUser = await getCurrentUser();
  
  const event = await getEventById(id);

  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: String(page),
  });

  return (
    <>
    <div className="bg-[#0a0a0a] text-white min-h-screen">
  <Header />

  {/* HERO */}
  <section className="relative overflow-hidden pt-32 pb-16 px-6 md:px-16">
    <div className="absolute -top-32 right-1/4 w-[28rem] h-[28rem] bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

    <div className="relative max-w-4xl">
      <h1 className="text-5xl md:text-6xl font-bold mt-4 tracking-tight">
        {event.title}
      </h1>

      <p className="mt-5 text-zinc-400 text-lg max-w-2xl">
        Explore event information, venue details, timings and reserve your
        spot instantly.
      </p>
    </div>
  </section>

  {/* EVENT SECTION */}
  <section className="px-6 md:px-16 pb-24">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">

      {/* IMAGE */}
      <div className="group relative overflow-hidden rounded-3xl border border-orange-500/20 bg-white/5">
        <Image
          src={event.imageUrl}
          alt={event.title}
          width={1000}
          height={1000}
          className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
        />
      </div>

      {/* DETAILS */}
      <div className="space-y-8">

        <div className="flex flex-wrap gap-3">
          <span className="bg-orange-500 text-black font-semibold px-5 py-2 rounded-full">
            {event.isFree ? "FREE" : `$${event.price}`}
          </span>

          <span className="bg-white/5 border border-white/10 px-5 py-2 rounded-full">
            {event.category.name}
          </span>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-3">
            {event.title}
          </h2>

          <p className="text-orange-400">
            Organized by{" "}
            {event.organizer
              ? `${event.organizer.firstName} ${event.organizer.lastName}`
              : "Unknown Organizer"}
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">

          <div className="flex items-center gap-3">
            <span className="text-orange-500">📅</span>
            <div>
              <p className="text-sm text-zinc-500">Starts</p>
              <p>{formatDateTime(event.startDateTime).dateOnly}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-orange-500">⏳</span>
            <div>
              <p className="text-sm text-zinc-500">Ends</p>
              <p>{formatDateTime(event.endDateTime).dateOnly}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-orange-500">📍</span>
            <div>
              <p className="text-sm text-zinc-500">Location</p>
              <p>{event.location}</p>
            </div>
          </div>
        </div>

        <CheckoutButton
          event={event}
          userId={currentUser?.userId}
        />

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-orange-400">
            About this event
          </h3>

          <p className="text-zinc-300 leading-relaxed whitespace-pre-line">
            {event.description}
          </p>
        </div>

        {event.url && (
          <a
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition"
          >
            Visit Event Website →
          </a>
        )}
      </div>
    </div>
  </section>

  {/* RELATED EVENTS */}
  <section className="border-t border-white/10 px-6 md:px-16 py-20">
    <div className="max-w-7xl mx-auto">

      <div className="mb-10">
        <span className="font-mono text-orange-400 text-xs tracking-[0.2em] uppercase">
          Discover More
        </span>

        <h2 className="text-4xl font-bold mt-3">
          Related Events
        </h2>

        <p className="text-zinc-500 mt-3">
          Explore similar events you may be interested in.
        </p>
      </div>

      <Collection
        data={relatedEvents?.data}
        emptyTitle="No Events Found"
        emptyStateSubtext="Come back later"
        collectionType="All_Events"
        limit={3}
        page={page}
        totalPages={relatedEvents?.totalPages}
      />
    </div>
  </section>

  <Footer />
</div>
    </>
  );
}