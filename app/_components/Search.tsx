"use client"

import Image from 'next/image';
import { useEffect, useState } from 'react'
import { Input } from '../../components/ui/input';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

const Search = ({ placeholder = 'Search title...' }: { placeholder?: string }) => {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = '';

      if(query) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'query',
          value: query
        })
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ['query']
        })
      }

      router.push(newUrl, { scroll: false });
    }, 300)

    return () => clearTimeout(delayDebounceFn);
  }, [query, searchParams, router])

  return (
  <div className="flex items-center gap-3 rounded-xl border  bg-black px-5 py-3 shadow-sm transition focus-within:ring-2 focus-within:ring-orange-500 sm:max-w-md w-full">
    <Image src="/assets/icons/search.svg" alt="Search" width={20} height={20} className="invert opacity-80" />
    <Input
      type="text"
      placeholder={placeholder}
      onChange={(e) => setQuery(e.target.value)}
      className="w-full bg-transparent p-regular-16 text-white placeholder:text-white/50 border-none focus:outline-none focus:ring-0"
    />
  </div>
)

}

export default Search