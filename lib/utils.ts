import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";

import { UrlQueryParams, RemoveUrlQueryParams } from "../types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// FORMAT DATE
export const formatDateTime = (date: Date | string) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    year: "numeric",
    day: "numeric",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  return {
    dateTime: new Date(date).toLocaleString("en-US", dateTimeOptions),
    dateOnly: new Date(date).toLocaleString("en-US", dateOptions),
    timeOnly: new Date(date).toLocaleString("en-US", timeOptions),
  };
};

// FILE TO URL
export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

// FORMAT PRICE
export const formatPrice = (price: string) => {
  const amount = parseFloat(price);

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

// ADD QUERY PARAM
export function formUrlQuery({
  params,
  key,
  value,
}: UrlQueryParams) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    {
      skipNull: true,
    }
  );
}

// REMOVE QUERY PARAM
export function removeKeysFromQuery({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    {
      skipNull: true,
    }
  );
}

// ERROR HANDLER
export const handleError = (error: unknown) => {
  console.error("❌ Error:", error);

  if (error instanceof Error) {
    throw new Error(error.message);
  }

  throw new Error("Something went wrong");
};