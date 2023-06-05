import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Tester() {
  const { data, error, isLoading } = useSWR('/api/testapi/mockapi', fetcher)

  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <h1>{data.Title}</h1>
      <p>this title: {data.title} is for session # {data.id}</p>
    </div>
  )
}