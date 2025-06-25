import EventForm from '@/app/_components/EventForm';
import Footer from '@/app/_components/Footer';
import Header from '@/app/_components/Header';
import { auth } from '@clerk/nextjs/server';
import React from 'react';

const CreateEvent = async () => {
  const { sessionClaims } =await auth();

  const userId = sessionClaims?.userId as string;

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />

      <main className="flex-grow mt-20">
        <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
            <h3 className='wrapper ml-4 text-white font-bold text-4xl text-center sm:text-left hover:text-orange-500'>Create Event</h3>
        </section>
        <div className="wrapper my-8">
            <EventForm userId={userId} type="Create"/>
                
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default CreateEvent


