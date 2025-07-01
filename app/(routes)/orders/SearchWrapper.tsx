'use client'
import dynamic from 'next/dynamic'
const Search = dynamic(() => import('../../_components/Search'), {
  ssr: false,
  loading: () => <div>Loading search...</div>
})

const SearchWrapper = () => {
  return <Search placeholder="Search buyer name..." />
}
export default SearchWrapper