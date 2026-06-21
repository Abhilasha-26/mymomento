"use client";

import { IEvent } from "@/lib/database/models/event.model";
import Link from "next/link";
import React from "react";
import { Button } from "../../components/ui/button";
import Checkout from "../_components/Checkout";

type CheckoutButtonProps = {
  event: IEvent;
  userId?: string;
};

const CheckoutButton = ({
  event,
  userId,
}: CheckoutButtonProps) => {
  const hasEventFinished =
    new Date(event.endDateTime) < new Date();

  return (
    <div className="flex items-center gap-3">
      {hasEventFinished ? (
        <p className="p-2 text-red-400">
          Sorry, tickets are no longer available.
        </p>
      ) : (
        <>
          {!userId ? (
            <Button
              asChild
              className="button rounded-full"
              size="lg"
            >
              <Link href="/sign-in">
                Get Tickets
              </Link>
            </Button>
          ) : (
            <Checkout
              event={event}
              userId={userId}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CheckoutButton;