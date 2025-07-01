import Footer from "@/app/_components/Footer";
import Header from "@/app/_components/Header";
import EventForm from "../../../../_components/EventForm";
import { getEventById } from "@/lib/actions/event.actions";
import { auth } from "@clerk/nextjs/server";

type UpdateEventProps = {
  params: {
    id: string;
  };
};

const UpdateEvent = async ({ params }: UpdateEventProps) => {
  const {id}= await params;
  const { sessionClaims } = await auth();
  const userId = sessionClaims?.userId as string;

  const event = await getEventById(id);
  if (!event) return <div className="text-center text-red-500 mt-10">Event not found.</div>;

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* Header */}
      <div className="bg-black shadow-md">
        <Header />
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        <section className="bg-black py-5 md:py-10 border-b border-gray-700">
        </section>

        <div className="wrapper py-8">
          <div className="wrapper">
            <h3 className="h3-bold text-center  text-white">Update Event</h3>
          </div>
          <EventForm
            type="Update"
            event={event}
            eventId={event._id}
            userId={userId}
          />
        </div>
      </main>

      {/* Footer */}
      <div className="bg-black border-t border-gray-700">
        <Footer />
      </div>
    </div>
  );
};

export default UpdateEvent;
