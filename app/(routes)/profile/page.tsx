
import Collection from '../../_components/Collection'
import { Button } from '@/components/ui/button'
import { getEventsByUser } from '@/lib/actions/event.actions'
import { getOrdersByUser } from '../../../lib/actions/order.actions'
import { IOrder } from '@/lib/database/models/order.model'
import { SearchParamProps } from '@/types'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import React from 'react'
import Header from '@/app/_components/Header'
import Footer from '@/app/_components/Footer'

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth()
  const userId = sessionClaims?.userId as string;
  console.log("Created event for userId:", userId);
  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const eventsPage = Number(searchParams?.eventsPage) || 1;

  const orders = await getOrdersByUser({ userId, page: ordersPage })
  const orderedEvents = orders?.data.map((order: IOrder) => order.event) || []
  const organizedEvents = await getEventsByUser({ userId, page: eventsPage })

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

}

export default ProfilePage
