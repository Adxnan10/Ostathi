import { BsStar, BsStarFill, BsPersonBoundingBox } from "react-icons/bs";
export default function UserCard({ ...props }) {
  const stars = () => {
    const starsTags = [];
    const roundedRating = Math.round(props.user.rating)
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
    <div className="userCard">
      <div className="img-container">
        <img src={props.user.img} alt="" />
      </div>
      <h4 className="user-full-name">{props.user.fullName}</h4>
      <p className="user-major">{props.user.major}</p>
      <div className="rating d-flex justify-content-around">
        {stars()}
      </div>
    </div>
  )
}