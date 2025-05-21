import usePost from "../../hooks/usePost";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCustomerAuth } from "../../../routes/CustomerAuthProvider";
import { useEffect } from "react";

const ReviewForm = () => {
  const { id } = useParams();
  const { isUser } = useCustomerAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isUser) {
      navigate("/login");
    }
  }, [isUser, navigate]);

  if (!isUser) {
    return null; // or loading spinner
  }

  const initialState = {
    productID: id,
    customerID: isUser._id || "",
    customerName: isUser.first_name + " " + isUser.last_name || "",
    rating: 0,
    title: "",
    post: "",
  };

  const { formData, handleChange, handleSubmit, error, setError } = usePost(
    initialState,
    "/reviews/create",
    `/products/${id}`
  );

  const handleRating = (star) => {
    handleChange({
      target: {
        name: "rating",
        value: star,
      },
    });
  };

  const handleSubmitCheck = (e) => {
    // everything can be blank but not the rating
    if (formData.rating === 0) {
      e.preventDefault();
      setError({ error: "Please give a rating" });
    } else {
      handleSubmit(e);
    }
  };

  return (
    <div className="container">
      <Link to={`/products/${id}`} className="flex-gap-0-25">
        <span className="material-symbols-outlined">arrow_back_ios_new</span>
        Back
      </Link>
      <h2>Leave a review!</h2>
      <form onSubmit={handleSubmitCheck} className="form container">
        <div>{error && error.error}</div>
        <div>
          <label htmlFor="rating ">Rating</label>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className="material-symbols-outlined star-icon star-cursor-pointer"
              onClick={() => handleRating(star)}
              style={{
                fontVariationSettings: `'FILL' ${
                  formData.rating >= star ? 1 : 0
                }`,
              }}
            >
              star
            </span>
          ))}
        </div>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="post">Comment</label>
          <textarea
            name="post"
            id="post"
            value={formData.post}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" className="confirm-button padding-point-5">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
