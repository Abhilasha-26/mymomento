import Image from 'next/image';
import CheckoutButton from '../../../_components/CheckoutButton';
import Collection from '../../../_components/Collection';
import { getEventById, getRelatedEventsByCategory } from '@/lib/actions/event.actions';
import { formatDateTime } from '@/lib/utils';
import Header from '@/app/_components/Header';
import Footer from '@/app/_components/Footer';
import { Metadata } from 'next';
// import { SearchParamProps } from '@/types'

{/*?added */}
// interface SearchParamProps {
//   params: { id: string };
//   searchParams?: { [key: string]: string | string[] | undefined };
// }

// const EventDetails = async ({ params, searchParams }: {
//   params:{id:string};
//   searchParams?:Record<string,string|string[] | undefined>;})=>{
//   const id = params.id;
//   const page = (searchParams?.page as string) || '1';

//   const event = await getEventById(id);
//   const relatedEvents = await getRelatedEventsByCategory({
//     categoryId: event.category._id,
//     eventId: event._id,
//     page,
//   });
//   interface PageProps {
//   params: { id: string };
//   searchParams?: { [key: string]: string | string[] | undefined };
// }

// const EventDetails = async ({ params, searchParams }: PageProps) => {
//   const id = params.id;
//   const page = typeof searchParams?.page === 'string' ? searchParams.page : '1';

//   const event = await getEventById(id);
//   const relatedEvents = await getRelatedEventsByCategory({
//     categoryId: event.category._id,
//     eventId: event._id,
//     page,
//   });

// interface PageProps {
//   params: { id: string };
//   searchParams: { page?: string };
// }
type PageProps = {
  params: { id: string };
  searchParams?: { page?: string };
};
export default async function EventDetails({ params, searchParams }: PageProps) {
  const {id} = await params;
  const searchParamsObj =await searchParams;
  const page = typeof searchParamsObj?.page === 'string' ? searchParamsObj.page : '1';

  const event = await getEventById(id);
  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page,
  });


//iske issue resolve krne ke baad ...redeploy..cbbm me kyunki usi me webhook daala hai aur vhi legegi webhook seceret ok?
  return (
    <>
      <Header />
      <div className="bg-black text-white min-h-screen">
        {/* Hero Section */}
        <section className="flex justify-center mt-8 py-10 px-4 bg-dotted-pattern bg-contain">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 2xl:max-w-7xl w-full">
            {/* Event Image */}
            <div className="rounded-xl overflow-hidden border-2 border-orange-500 shadow-lg max-h-[500px]">
              <Image
                src={event.imageUrl}
                alt="event image"
                width={1000}
                height={1000}
                className="h-full w-full object-cover object-center"
              />
            </div>

            {/* Event Details */}
            <div className="flex flex-col gap-6 md:gap-8 justify-center">
              {/* Title and Tags */}
              <div className="flex flex-col gap-4">
                <h2 className="text-3xl md:text-4xl font-bold text-white">{event.title}</h2>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="bg-orange-500 text-black font-semibold text-sm px-4 py-1 rounded-full">
                    {event.isFree ? 'FREE' : `$ ${event.price}`}
                  </span>
                  <span className="bg-gray-800 text-white text-sm px-4 py-1 rounded-full">
                    {event.category.name}
                  </span>
                  <span className="text-white text-sm ml-auto">
                    by{' '}
                    <span className="text-orange-400 font-medium">
                      {event.organizer.firstName} {event.organizer.lastName}
                    </span>
                  </span>
                </div>
              </div>
              <CheckoutButton event={event} />

              {/* Date and Location */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Image src="/assets/icons/calendar.svg" alt="calendar" width={28} height={28} />
                  <div className="flex flex-col text-sm sm:text-base">
                    <p>
                      <strong>Starts:</strong>{' '}
                      {formatDateTime(event.startDateTime).dateOnly} - {formatDateTime(event.startDateTime).timeOnly}
                    </p>
                    <p>
                      <strong>Ends:</strong>{' '}
                      {formatDateTime(event.endDateTime).dateOnly} - {formatDateTime(event.endDateTime).timeOnly}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm sm:text-base">
                  <Image src="/assets/icons/location.svg" alt="location" width={28} height={28} />
                  <p>{event.location}</p>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="text-lg text-orange-400 font-semibold">What You'll Learn:</h3>
                <p className="text-white text-sm sm:text-base">{event.description}</p>
                {event.url && (
                  <a
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-500 underline text-sm break-words"
                  >
                    {event.url}
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Related Events */}
        <section className="wrapper px-4 py-12 flex flex-col gap-10 md:gap-14">
          <h2 className="text-2xl md:text-3xl font-bold text-white border-b border-orange-500 pb-2 w-fit">
            Related Events
          </h2>
          <Collection
            data={relatedEvents?.data}
            emptyTitle="No Events Found"
            emptyStateSubtext="Come back later"
            collectionType="All_Events"
            limit={3}
            page={searchParams?.page as string}
            totalPages={relatedEvents?.totalPages}
          />
        </section>
        <Footer />
      </div>
    </>
  );
};

// export default EventDetails;
