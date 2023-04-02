import SessionCardP from "./SessionCardP";
import SessionCardR from "./SessionCardR";

export default function SessionCardFactory({ ...props }) {
  const sessionPassed = props.session
  return (
    <>
      {sessionPassed.post ? <SessionCardP session={sessionPassed}></SessionCardP> : <SessionCardR session={sessionPassed}></SessionCardR>}
    </>
  )
}