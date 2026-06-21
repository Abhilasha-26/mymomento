import { IEvent } from '@/lib/database/models/event.model';
import React from 'react';
import Card from './Card';
import Pagination from './Pagination';

type CollectionProps = {
  data: IEvent[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  collectionType?: 'Events_Organized' | 'My_Tickets' | 'All_Events';

  // current logged in user's MongoDB _id
  userId?: string;
};

const Collection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
  userId,
}: CollectionProps) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-14 animate-fadeIn">
          <ul className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10 px-2">
            {data.map((event) => {
              const hasOrderLink = collectionType === 'Events_Organized';
              const hidePrice = collectionType === 'My_Tickets';

              return (
                <li
                  key={event._id}
                  className="flex justify-center transition-all duration-300 transform hover:scale-[1.03] hover:-translate-y-1"
                >
                  <Card
                    event={event}
                    userId={userId}
                    hasOrderLink={hasOrderLink}
                    hidePrice={hidePrice}
                  />
                </li>
              );
            })}
          </ul>

          {totalPages > 1 && (
            <Pagination
              urlParamName={urlParamName}
              page={page}
              totalPages={totalPages}
            />
          )}
        </div>
      ) : (
        <div className="wrapper w-full min-h-[280px] flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-gradient-to-b from-neutral-900 to-neutral-950 text-white py-24 text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-orange-500/10 mb-2">
            <span className="text-3xl">🔍</span>
          </div>

          <h3 className="text-2xl font-bold tracking-tight">
            {emptyTitle}
          </h3>

          <p className="text-base text-gray-500 max-w-sm font-light">
            {emptyStateSubtext}
          </p>
        </div>
      )}
    </>
  );
};

export default Collection;