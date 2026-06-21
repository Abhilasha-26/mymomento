import Footer from "@/app/_components/Footer";
import Header from "@/app/_components/Header";
import EventForm from "../../../../_components/EventForm";
import { getEventById } from "@/lib/actions/event.actions";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

type UpdateEventProps = {
  params: {
    id: string;
  };
};

const UpdateEvent = async ({ params }: UpdateEventProps) => {
  const { id } = await params;
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect('/sign-in');
  }

  const userId = currentUser.userId;
  const event = await getEventById(id);
  if (!event) return <div className="text-center text-red-500 mt-10">Event not found.</div>;

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0a] text-white">
      <Header />

      <main className="flex-grow">
        {/* Page Header */}
        <section className="relative px-6 md:px-16 pt-32 pb-12 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-7xl mx-auto">
            <span className="font-mono text-orange-400 text-xs font-medium tracking-[0.2em] uppercase">
              Editing
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mt-3">
              Update Event
            </h1>
            <p className="text-gray-400 mt-3 max-w-xl">
              Make changes to &quot;{event.title}&quot; below.
            </p>
          </div>
        </section>

        {/* Form */}
        <div className="px-6 md:px-16 py-8">
          <div className="max-w-7xl mx-auto">
            <EventForm
              type="Update"
              event={event}
              eventId={event._id}
              userId={userId}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UpdateEvent;