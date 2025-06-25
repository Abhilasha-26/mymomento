
import { IEvent } from '@/lib/database/models/event.model';
import { formatDateTime } from '@/lib/utils';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { DeleteConfirmation } from './DeleteConfirmation';

type CardProps = {
  event: IEvent;
  userId:string;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

const Card = ({ event,userId, hasOrderLink, hidePrice }: CardProps) => {
  // const { sessionClaims } = auth(); changed event userId make sure and not in evnet..
  // const userId = sessionClaims?.userId as string;

  

  const isEventCreator = userId === event.organizer._id.toString();
    console.log('userId:', userId);
    console.log("hasOrderLink:", hasOrderLink);

console.log('organizerId:', event.organizer._id.toString());
console.log('isEventCreator:', isEventCreator);
console.log('hidePrice:', hidePrice);

  return (
    <div className="group relative flex min-h-[400px] w-full max-w-[400px] flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-2xl">
      <Link
        href={`/events/${event._id}`}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        className="flex-grow bg-cover bg-center bg-gray-100 hover:scale-105 transition-transform duration-300"
      />
      //changed here too//
      {isEventCreator && !hidePrice && (
        <div className="absolute right-3 top-3 flex flex-col gap-3 rounded-xl bg-white p-2 shadow-md">
          <Link href={`/events/${event._id}/update`}>
            <Image src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
          </Link>
          <DeleteConfirmation eventId={event._id} />
        </div>
      )}

      <div className="flex flex-col gap-3 p-5">
        {!hidePrice && (
          <div className="flex flex-wrap gap-2">
            <span className="text-sm px-4 py-1 rounded-full bg-green-100 text-green-600 font-medium">
              {event.isFree ? 'FREE' : `$${event.price}`}
            </span>
            <span className="text-sm px-4 py-1 rounded-full bg-gray-100 text-gray-600 line-clamp-1">
              {event.category.name}
            </span>
          </div>
        )}

        <p className="text-sm text-gray-500">{formatDateTime(event.startDateTime).dateTime}</p>

        <Link href={`/events/${event._id}`}>
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 hover:text-primary-500 transition-colors">
            {event.title}
          </h3>
        </Link>

        <div className="flex justify-between items-center pt-2">
          <p className="text-sm text-gray-700">
            {event.organizer.firstName} {event.organizer.lastName}
          </p>

          {hasOrderLink && (
            <Link href={`/orders?eventId=${event._id}`} className="flex items-center gap-1 text-primary-600 text-sm font-medium hover:underline">
              Order Details
              <Image src="/assets/icons/arrow.svg" alt="arrow" width={10} height={10} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
