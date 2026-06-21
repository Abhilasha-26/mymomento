import { IEvent } from '@/lib/database/models/event.model';
import { formatDateTime } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { DeleteConfirmation } from './DeleteConfirmation';

type CardProps = {
  event: IEvent;
  userId?: string;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

const Card = ({
  event,
  userId,
  hasOrderLink,
  hidePrice,
}: CardProps) => {

  const isEventCreator =
    userId &&
    event.organizer &&
    userId === event.organizer._id.toString();

  return (
    <div className="group relative flex min-h-[400px] w-full max-w-[400px] flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-2xl">

      <Link
        href={`/events/${event._id}`}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        className="flex-grow bg-cover bg-center bg-gray-100 hover:scale-105 transition-transform duration-300"
      />

      {isEventCreator && !hidePrice && (
        <div className="absolute right-3 top-3 flex flex-col gap-3 rounded-xl bg-white p-2 shadow-md">
          <Link href={`/events/${event._id}/update`}>
            <Image
              src="/assets/icons/edit.svg"
              alt="edit"
              width={20}
              height={20}
            />
          </Link>

          <DeleteConfirmation eventId={event._id}  userId={userId!}/>
        </div>
      )}

      <div className="flex flex-col gap-3 p-5">

        {!hidePrice && (
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-600">
              {event.isFree ? 'FREE' : `₹${event.price}`}
            </span>

            <span className="line-clamp-1 rounded-full bg-gray-100 px-4 py-1 text-sm text-gray-600">
              {event.category?.name}
            </span>
          </div>
        )}

        <p className="text-sm text-gray-500">
          {formatDateTime(event.startDateTime).dateTime}
        </p>

        <Link href={`/events/${event._id}`}>
          <h3 className="line-clamp-2 text-lg font-semibold text-gray-900 hover:text-primary-500 transition-colors">
            {event.title}
          </h3>
        </Link>

        <div className="flex items-center justify-between pt-2">
          <p className="text-sm text-gray-700">
            {event.organizer?.firstName} {event.organizer?.lastName}
          </p>

          {hasOrderLink && (
            <Link
              href={`/orders?eventId=${event._id}`}
              className="flex items-center gap-1 text-sm font-medium text-primary-600 hover:underline"
            >
              Order Details

              <Image
                src="/assets/icons/arrow.svg"
                alt="arrow"
                width={10}
                height={10}
              />
            </Link>
          )}
        </div>

      </div>
    </div>
  );
};

export default Card;