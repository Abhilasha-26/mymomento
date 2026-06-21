import EventForm from '@/app/_components/EventForm';
import Footer from '@/app/_components/Footer';
import Header from '@/app/_components/Header';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import React from 'react';

const CreateEvent = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect('/sign-in');
  }

  const userId = currentUser.userId;

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a]">
      <Header />

      <main className="flex-grow">
        {/* Page Header */}
        <section className="relative px-6 md:px-16 pt-32 pb-12 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-7xl mx-auto">
            <span className="font-mono text-orange-400 text-xs font-medium tracking-[0.2em] uppercase">
              New Event
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mt-3">
              Create Event
            </h1>
            <p className="text-gray-400 mt-3 max-w-xl">
              Fill in the details below to publish your event to campus.
            </p>
          </div>
        </section>

        {/* Form */}
        <div className="px-6 md:px-16 my-8">
          <div className="max-w-7xl mx-auto">
            <EventForm userId={userId} type="Create" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateEvent;