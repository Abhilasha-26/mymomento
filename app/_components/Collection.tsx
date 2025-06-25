
import { IEvent } from '@/lib/database/models/event.model';
import React from 'react';
import Card from './Card';
import Pagination from './Pagination';

//
import { auth } from '@clerk/nextjs/server';



type CollectionProps = {
  data: IEvent[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  collectionType?: 'Events_Organized' | 'My_Tickets' | 'All_Events';

};

const Collection =async({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
}: CollectionProps) => {
  const { userId } = await auth();
  //added auth,async,await,this userid,added in cards too//




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
                  className="flex justify-center transition duration-300 transform hover:scale-[1.03] hover:shadow-xl"
                >
                  {/*did a change here  */}
                  <Card event={event} userId={userId!} hasOrderLink={hasOrderLink} hidePrice={hidePrice}  /> 
                </li>
              );
            })}
          </ul>

          {totalPages > 1 && (
            <Pagination urlParamName={urlParamName} page={page} totalPages={totalPages} />
          )}
        </div>
      ) : (
        <div className="wrapper w-full min-h-[240px] flex flex-col items-center justify-center gap-4 rounded-xl bg-neutral-900 text-white py-24 shadow-lg text-center">
          <div className="text-6xl animate-pulse">😕</div>
          <h3 className="text-2xl font-semibold">{emptyTitle}</h3>
          <p className="text-base text-gray-400">{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

export default Collection;
