import React from 'react'
import Image from "next/image";
import Link from "next/link";
import Collection from './Collection';
import { getAllEvents } from '@/lib/actions/event.actions';
import Search from './Search';
import { SearchParamProps } from '@/types';
import CategoryFilter from './CategoryFilter';

async function Hero({searchParams}:SearchParamProps) {
  
  const page=Number(searchParams?.page) || 1;
  const searchText=(searchParams?.query as string) || '';
  const category=(searchParams?.category as  string) || '';
  const events= await getAllEvents({
    query:searchText,
    category,
    page,
    limit:6
  })
  return (
    <div>
        <div>
    <section className="w-full min-h-screen flex flex-col md:flex-row bg-black text-white">
      {/* Left Text Section */}
      <div className="flex flex-col justify-center items-start p-10 md:p-16 bg-black rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none w-full md:w-1/2 text-black">
        <h2 className="text-2xl text-white sm:text-3xl md:text-4xl font-semibold mb-4">
          Host <p className='text-orange-500'>Unforgettable</p>
          <span className="text-white">Campus Moments !!</span>
        </h2>
        <p className="mb-6 max-w-md text-sm sm:text-base text-orange-300">
          Create, manage, and showcase your college events with ease — all in one place.
        </p>
        <div className="flex gap-4">
          <Link href="#events">
            <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-700 transition">
              Get Started!
            </button>
          </Link>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="relative w-full md:w-1/2 h-96 md:h-auto">
        <Image
          src="/assets/images/img3.jpg" 
          alt="Crowd at Event"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0  bg-opacity-40 flex items-center justify-center p-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
            <span className="text-blue-700">Crafted Moments</span><br />
            Unforgettable <span className="text-shadow-blue-800">Impact</span>
          </h2>
        </div>
      </div>
    </section>   
    <section className="bg-black text-white py-12 px-6 md:px-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        
        {/* Left Image Side */}
        <div className="relative w-135 h-90  shadow-lg">
          <Image 
            src="/assets/images/hero.png" // Replace with your own image
            alt="img"
            fill
            className="object-cover"
          />
        </div>

        {/* Right Content Side */}
        <div className="flex-1">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">
            Your  <span className="text-red-600">Gateway</span> to Unforgettable College Events.
          </h2>
          <p className="text-gray-300 mb-6">
            From TEDx talks to comedy shows — book your seat, own the vibe.
            Be part of epic fests, inspiring talks, and jaw-dropping shows...
          </p>
          <Link href="#">
            <button className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-blue-900 transition">
              Book Now!!
            </button>
          </Link>
        </div>
      </div>

    </section>
<section id="events" className="bg-black py-20 px-6 md:px-16 text-white">
  <div className="max-w-7xl mx-auto">
    {/* Section Heading */}
    <div className="mb-12 text-center">
      <h2 className="text-3xl sm:text-4xl font-bold mb-3">
        Discover <span className="text-orange-500">Live</span> Campus Events
      </h2>
      <p className="text-gray-400 max-w-2xl mx-auto">
        Explore a curated collection of college events — from electrifying fests to inspirational talks. Don't miss out!
      </p>
    </div>

    {/* Optional Filters (search/category) */}
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
      {/* Replace below with your actual search and category filter components */}
      <Search/>
      <CategoryFilter/>
    </div>

    {/* Event Cards Grid */}
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
    </div>
  )
}

export default Hero
