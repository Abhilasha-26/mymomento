
import Collection from '../../_components/Collection'
import { Button } from '@/components/ui/button'
import { getEventsByUser } from '@/lib/actions/event.actions'
import { getOrdersByUser } from '../../../lib/actions/order.actions'
import { IOrder } from '@/lib/database/models/order.model'
// import { SearchParamProps } from '@/types'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import React from 'react'
import Header from '@/app/_components/Header'
import Footer from '@/app/_components/Footer'
type SessionClaims = {
  userId?: { userId: string };
  sub?: string;
};
export type SearchParamProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};


const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = await auth();
const claims = sessionClaims as SessionClaims;

const userId = claims?.userId?.userId || claims?.sub || null;

if (!userId || typeof userId !== 'string') {
  throw new Error('Invalid userId');
}

  console.log("sessionClaims:",claims);
  if (!userId) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <Header />
        <div className="text-center py-20">
          <h2 className="text-3xl font-bold text-orange-500">You're not signed in.</h2>
          <p className="mt-4">Please <Link href="/sign-in" className="underline text-orange-400">sign in</Link> to view your profile.</p>
        </div>
        <Footer />
      </main>
    );
  }

  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const eventsPage = Number(searchParams?.eventsPage) || 1;

  const orders = await getOrdersByUser({ userId, page: ordersPage });
  const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];

  const organizedEvents = await getEventsByUser({ userId, page: eventsPage });

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      {/* My Tickets */}
      <section className="py-12 border-b border-white/10">
        <div className="wrapper flex flex-col sm:flex-row items-center justify-between gap-6">
          <h2 className="text-3xl mt-8 text-center font-extrabold text-orange-500">My Tickets</h2>
          <Button
            asChild
            size="lg"
            className="bg-black border mt-8 mr-3 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black transition"
          >
            <Link href="/events">Explore More Events</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper py-10">
        <Collection
          data={orderedEvents}
          emptyTitle="No event tickets purchased yet"
          emptyStateSubtext="No worries – plenty of exciting events to explore!"
          collectionType="My_Tickets"
          limit={3}
          page={ordersPage}
          urlParamName="ordersPage"
          totalPages={orders?.totalPages}
        />
      </section>

      {/* Events Organized */}
      <section className="py-12 border-t border-white/10">
        <div className="wrapper flex flex-col sm:flex-row items-center justify-between gap-6">
          <h2 className="text-3xl font-extrabold text-orange-500">Events Organized</h2>
          <Button
            asChild
            size="lg"
            className="bg-orange-500 text-black hover:bg-orange-400 transition"
          >
            <Link href="/events/create">Create New Event</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper py-10">
        <Collection
          data={organizedEvents?.data}
          emptyTitle="No events have been created yet"
          emptyStateSubtext="Go create some now"
          collectionType="Events_Organized"
          limit={3}
          page={eventsPage}
          urlParamName="eventsPage"
          totalPages={organizedEvents?.totalPages}
        />
      </section>

      <Footer />
    </main>
  );
};

export default ProfilePage;