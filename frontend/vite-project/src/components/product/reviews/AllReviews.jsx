import { useState } from "react";
import StarRating from "./StarRating";
import { Link } from "react-router-dom";

// get all reviews from latest to early
// need ref to product
const db = [
  {
    "review-id": "1",
    "user-id": "user 1",
    "user-f-name": "user 1",
    "product-id": "123",
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

const AllReviews = () => {
  return (
    <article className="product-latest-review container">
      <Link to={`/products/${db[0]["product-id"]}`} className="flex-gap-0-25">
        <span className="material-symbols-outlined">arrow_back_ios_new</span>
        Back
      </Link>
      <h2>All reviews</h2>
      <div className="reviewBox">
        {db.map((review) => (
          <div className="reviewDetailBox" key={review["review-id"]}>
            <StarRating rating={review["rating"]} />
            <div>{review["user-f-name"]}</div>
            <h4>{review["title"]}</h4>
            <p>{review["post"]}</p>
          </div>
        ))}
      </div>
    </article>
  );
};

export default AllReviews;
