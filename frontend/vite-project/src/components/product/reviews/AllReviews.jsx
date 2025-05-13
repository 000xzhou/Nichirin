import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import StarRating from "./StarRating";
import useGet from "../../hooks/useGet";

const AllReviews = () => {
  const { id } = useParams();

  const { apiData, loading, error } = useGet(`/reviews/${id}/all`);

  if (loading) return <div>loading...</div>;

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-US", {
      dateStyle: "medium",
    });
  };

  return (
    <article className="product-latest-review container">
      <Link to={`/products/${id}`} className="flex-gap-0-25">
        <span className="material-symbols-outlined">arrow_back_ios_new</span>
        Back
      </Link>
      <h2>All reviews</h2>
      <div className="reviewBox">
        {apiData.reviews.map((review) => (
          <div className="reviewDetailBox" key={review._id}>
            <i>{formatDate(review.updated_at)}</i>
            <div>{review.customerName}</div>
            <StarRating rating={review.rating} />
            <h4>{review.title}</h4>
            <p>{review.post}</p>
          </div>
        ))}
      </div>
    </article>
  );
};

export default AllReviews;
