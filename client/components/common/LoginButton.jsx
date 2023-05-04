import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Router from 'next/router'
import { BiLogOut } from 'react-icons/bi'
import Button from 'react-bootstrap/Button'
export default function LoginButton() {
  const { data: session } = useSession()
  const router = useRouter()
  if (session) {
    return (
      <div className="login-btn-unique d-flex justify-content-around align-items-center">
        <img src={session.user?.profilePicture == undefined ? "Profile.png" : session.user.profilePicture} alt="Profile Pic" id="navProfilePic" onClick={() => router.push(`/dashboard?username=${session?.user?.username}&id=${session?.user?.id}`)} />
        <button id="profileSignedIn" className="nav-item btn" onClick={() => router.push(`/dashboard?username=${session?.user?.username}&id=${session?.user?.id}`)}>
          <p id="navProfileName">{session.user?.username}</p>
        </button>
        <Button onClick={() => signOut({ redirect: false })} variant="#F48C06"><BiLogOut /></Button>
      </div>

    )
  }
  return (
    <button onClick={() => Router.push(`/login`)} className="nav-item btn" id="login"> Login | signUp </button>
  )
}
