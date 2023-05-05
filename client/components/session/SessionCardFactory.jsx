import useSWR from "swr";
import SessionCardP from "./SessionCardP"
import SessionCardR from "./SessionCardR"
import { useSession } from "next-auth/react"
const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function SessionCardFactory({ ...props }) {
  
  const sessionPassed = props.session
  const userId = props.post == 'post' ? sessionPassed.tutor_id : sessionPassed.requester_id
  //const userId = 69
  const fetchedURL = `/api/sessions/loadSessionInfo?session_id=${sessionPassed.id}&session_type=${props.post}&user_id=${userId}`
  let owner = false
  const { data: session } = useSession()
  if (session) {
    owner = session?.user?.id == userId
  }
  const { data, error, isLoading } = useSWR(fetchedURL, fetcher)

  if (isLoading) {
    return <>
    </>
  }
  if (error) {
    return <>failed to fetch session info {}
    </>
  }
  return (
    <>
      {props.post == 'post' ? <SessionCardP session={sessionPassed} data={data} owner={owner}></SessionCardP> : <SessionCardR session={sessionPassed} data={data}></SessionCardR>}
    </>
  )
}