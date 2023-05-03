import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { BiLogOut } from 'react-icons/bi'
import Button from 'react-bootstrap/Button'
export default function LoginButton() {
  const { data: session } = useSession()
  const router = useRouter()
  if (session) {
    console.log(session.user)
    return (
      <div className="login-btn-unique d-flex justify-content-around align-items-center">
        <img src={session.user?.profilePicture} alt="Profile Pic" id="navProfilePic" onClick={() => router.push(`/dashboard?id=${session?.user?.username}`)} />
        <button id="profileSignedIn" className="nav-item btn" >
          <p id="navProfileName">{session.user?.username}</p>
        </button>
        <Button onClick={() => signOut({ redirect: false })} variant="#F48C06"><BiLogOut /></Button>
      </div>

    )
  }
  return (
    <button onClick={() => signIn('Credentials')} className="nav-item btn" id="login">Login / signUp</button>
  )
}
