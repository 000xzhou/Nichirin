import { useState } from "react";

const ReviewForm = () => {
  const [rating, setRating] = useState(0);

  const handleRating = (value) => {
    setRating(value);
  };

  return (
    <div className="form container">
      <h2>Leave a review!</h2>
      <div>
        <label htmlFor="rating ">Rating</label>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className="material-symbols-outlined star-icon star-cursor-pointer"
            onClick={() => handleRating(star)}
            style={{
              // want to keep color gold at all times but the fill not working...
              fontVariationSettings: `'FILL' ${rating >= star ? 1 : 0}`,
            }}
          >
            star
          </span>
        ))}
      </div>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" />
      </div>
      <div>
        <label htmlFor="post">Comment</label>
        <textarea name="post" id="post" className="">
          Comment
        </textarea>
      </div>
      <button type="submit" className="confirm-button padding-point-5">
        Submit
      </button>
    </div>
  );
};

export default ReviewForm;
