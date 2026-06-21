"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const Search = ({ placeholder = "Search title..." }) => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const delay = setTimeout(() => {
      const currentParams = searchParams.toString();

      const newUrl = query
        ? formUrlQuery({
            params: currentParams,
            key: "query",
            value: query,
          })
        : removeKeysFromQuery({
            params: currentParams,
            keysToRemove: ["query"],
          });

      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(delay);
  }, [query, searchParams, router]);

  return (
    <div className="flex items-center gap-3 rounded-xl border bg-black px-5 py-3">
      <Image
        src="/assets/icons/search.svg"
        alt="Search"
        width={20}
        height={20}
        className="invert opacity-80"
      />

      <Input
        type="text"
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-transparent text-white border-none"
      />
    </div>
  );
};

export default Search;