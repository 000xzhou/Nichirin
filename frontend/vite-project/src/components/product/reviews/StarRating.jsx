import "./starRating.css";
const StarRating = ({ rating }) => {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className="material-symbols-outlined star-icon"
          style={{
            fontVariationSettings: `'FILL' ${rating >= star ? 1 : 0}`,
          }}
        >
          star
        </span>
      ))}
    </div>
  );
};

export default StarRating;
