import Collection from '../../_components/Collection';
import { Button } from '@/components/ui/button';
import { getEventsByUser } from '@/lib/actions/event.actions';
import { getOrdersByUser } from '@/lib/actions/order.actions';
import { IOrder } from '@/lib/database/models/order.model';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import Header from '@/app/_components/Header';
import Footer from '@/app/_components/Footer';

export type SearchParamProps = {
  searchParams?: Promise<{
    ordersPage?: string;
    eventsPage?: string;
  }>;
};

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect('/sign-in');
  }

  const userId = currentUser.userId;

  if (!userId) {
    redirect('/sign-in');
  }

  const params = await searchParams;

  const ordersPage = Number(params?.ordersPage) || 1;
  const eventsPage = Number(params?.eventsPage) || 1;

  const orders = await getOrdersByUser({
    userId,
    page: ordersPage,
  });

  const orderedEvents =
    orders?.data?.map((order: IOrder) => order.event) || [];

  const organizedEvents = await getEventsByUser({
    userId,
    page: eventsPage,
  });

  const ticketCount = orderedEvents.length;
  const organizedCount = organizedEvents?.data?.length || 0;

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      <Header />

      {/* PROFILE HEADER / STATS STRIP */}
      <section className="relative pt-32 pb-10 px-6 md:px-16 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 -left-24 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          <span className="font-mono text-orange-400 text-xs font-medium tracking-[0.2em] uppercase">
            Your Dashboard
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mt-3 mb-8">
            Hi, <span className="text-orange-500">{currentUser.username || 'there'}</span>
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 max-w-md">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="font-mono text-3xl font-semibold text-orange-500">
                {String(ticketCount).padStart(2, '0')}
              </p>
              <p className="text-sm text-zinc-400 mt-1">Tickets held</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="font-mono text-3xl font-semibold text-orange-500">
                {String(organizedCount).padStart(2, '0')}
              </p>
              <p className="text-sm text-zinc-400 mt-1">Events organized</p>
            </div>
          </div>
        </div>
      </section>

      {/* My Tickets */}
      <section className="px-6 md:px-16 pt-12 pb-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end items-start justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <span className="font-mono text-xs text-zinc-500 tracking-[0.15em] uppercase">
              Section 01
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-2">
              My Tickets
            </h2>
          </div>

          <Button
            asChild
            size="lg"
            className="bg-transparent border border-orange-500/60 text-orange-400 hover:bg-orange-500 hover:text-black hover:border-orange-500 transition-colors duration-200 rounded-full px-6"
          >
            <Link href="/events">Explore more events</Link>
          </Button>
        </div>
      </section>

      <section className="px-6 md:px-16 py-10">
        <div className="max-w-7xl mx-auto">
          <Collection
            data={orderedEvents}
            emptyTitle="No event tickets purchased yet"
            emptyStateSubtext="No worries – plenty of exciting events to explore!"
            collectionType="My_Tickets"
            limit={3}
            page={ordersPage}
            urlParamName="ordersPage"
            totalPages={orders?.totalPages || 0}
            userId={userId}
          />
        </div>
      </section>

      {/* Events Organized */}
      <section className="px-6 md:px-16 pt-4 pb-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end items-start justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <span className="font-mono text-xs text-zinc-500 tracking-[0.15em] uppercase">
              Section 02
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-2">
              Events Organized
            </h2>
          </div>

          <Button
            asChild
            size="lg"
            className="bg-orange-500 text-black hover:bg-orange-600 transition-colors duration-200 rounded-full px-6 font-semibold"
          >
            <Link href="/events/create">Create new event</Link>
          </Button>
        </div>
      </section>

      <section className="px-6 md:px-16 py-10 pb-20">
        <div className="max-w-7xl mx-auto">
          <Collection
            data={organizedEvents?.data || []}
            emptyTitle="No events have been created yet"
            emptyStateSubtext="Go create some now"
            collectionType="Events_Organized"
            limit={3}
            page={eventsPage}
            urlParamName="eventsPage"
            totalPages={organizedEvents?.totalPages || 0}
            userId={userId}
          />
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ProfilePage;