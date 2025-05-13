import { Link } from "react-router-dom";
import "./review.css";
import StarRating from "./StarRating";
import useGet from "../../hooks/useGet";

// id = product id
const Reviews = ({ id }) => {
  const {
    apiData: reviewData,
    loading,
    error,
  } = useGet(`/reviews/${id}/all?limit=10`);

  if (loading) return <div>loading...</div>;
  return (
    <article className="product-latest-review">
      <div>
        <h2>Latest reviews</h2>
        <div className="reviewBox">
          {reviewData.reviews.map((review) => (
            <div className="reviewDetailBox" key={review._id}>
              <div>{review.customerName}</div>
              <StarRating rating={review.rating} />
              <h4>{review.title}</h4>
              <p>{review.post}</p>
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
