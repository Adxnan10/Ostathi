import { BsStar, BsStarFill, BsPersonBoundingBox } from "react-icons/bs";
import Router from 'next/router';
export default function UserCard({ ...props }) {
  const goToUserPage = () => (Router.push(`/user/${props.user.username}`))
  const stars = () => {
    const starsTags = [];
    const roundedRating = Math.round(props.user.rating)
    if (roundedRating > 5 || roundedRating < 0) { // this should not happen
      return <span>Err: stars # incorrect</span>
    }
    for (let i = 0; i < roundedRating; ++i) {
      starsTags.push((<BsStarFill color="#fdb022"></BsStarFill>));
    }
    for (let i = 0; i < 5 - roundedRating; ++i) {
      starsTags.push((<BsStar></BsStar>));
    }
    return (
      <>{starsTags}</>
    );
  }
  return (
    <div className="userCard" onClick={goToUserPage}>
      <div className="img-container">
        <img src={props.user.profilePicture == undefined ? "Profile.png": props.user.profilePicture} alt="" />
      </div>
      <h4 className="user-full-name">{props.user.name}</h4>
      <p className="user-major">{props.user.pref_subject}</p>
      <div className="rating d-flex justify-content-around">
        {stars()}
      </div>
    </div>
  )
}