import CategoryFilter from '@/app/_components/CategoryFilter'
import Collection from '@/app/_components/Collection'
import Search from '@/app/_components/Search'
import React, { Suspense } from 'react'
import { getAllEvents } from '@/lib/actions/event.actions'
import Header from '@/app/_components/Header'
import Footer from '@/app/_components/Footer'

type Props = {
  searchParams?: Promise<{
    page?: string
    query?: string
    category?: string
  }>
}

async function Events({ searchParams }: Props) {
  const sp = await searchParams

  const page = Number(sp?.page ?? 1)
  const searchText = sp?.query ?? ''
  const category = sp?.category ?? ''

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6,
  })

  return (
    <div>
      <Header />

      <section className="bg-black py-20 px-6 md:px-16 text-white">
        <div className="max-w-7xl mx-auto">

          <div className="mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              <span className="text-orange-500">Live</span> Campus Events
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explore curated college events
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <Suspense fallback={<div>Loading filters...</div>}>
              <Search />
            </Suspense>

            <CategoryFilter />
          </div>

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

      <Footer />
    </div>
  )
}

export default Events