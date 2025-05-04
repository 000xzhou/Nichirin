import { Link } from "react-router-dom";
import "./review.css";
import StarRating from "./StarRating";

// temp db - table: review rating
// Just need to pull up the first 4-5 reviews
// Need to get the overall rating too from product (add in later)
const db = [
  {
    "review-id": "1",
    "user-id": "user 1", // link to user table
    "user-f-name": "user 1", // so I don't have to look cross-ref it
    rating: 1,
    title: "review title",
    post: "reviw post",
    "created-at": "some date",
    "item-id": "item1",
  },
  {
    "review-id": "2",
    "user-id": "user 2",
    "user-f-name": "user 2",
    rating: 2,
    title: "review title 2",
    post: "reviw post 2",
    "created-at": "some date",
    "item-id": "item1",
  },
  {
    "review-id": "3",
    "user-id": "user 3",
    "user-f-name": "user 3",
    rating: 3,
    title: "review title 3",
    post: "reviw post 3",
    "created-at": "some date",
    "item-id": "item1",
  },
  {
    "review-id": "4",
    "user-id": "user 4",
    "user-f-name": "user 4",
    rating: 4,
    title: "review title 4",
    post: "reviw post 4",
    "created-at": "some date",
    "item-id": "item1",
  },
];

const Reviews = ({ id }) => {
  return (
    <article className="product-latest-review">
      <div>
        <h2>Latest reviews</h2>
        <div className="reviewBox">
          {db.map((review) => (
            <div className="reviewDetailBox" key={review["review-id"]}>
              <div>{review["user-f-name"]}</div>
              <StarRating rating={review["rating"]} />
              <h4>{review["title"]}</h4>
              <p>{review["post"]}</p>
            </div>
          ))}
        </div>
        <div className="review-button-container">
          <Link to={`reviews/all`}>More</Link>
          <Link to={`reviews/add`}>Write a review</Link>
        </div>
      </div>
    </article>
  );
};

export default Reviews;
