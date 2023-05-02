import { signIn, signOut, useSession } from "next-auth/react"
export default function LoginButton() {
  {/* <button id="profileSignedIn" className="nav-item btn">
                    <img src={"../../public/Model.jpeg"} alt="Profile Pic" id="navProfilePic"/>
                    <p id="navProfileName">Yazeed</p>
                 </button> */}
  return (
    <button onClick={() => signIn('Credentials')} className="nav-item btn" id="login">Login / signUp</button>
  )
}
