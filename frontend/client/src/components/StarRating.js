const StarRating = ({ rating, maxRating = 5 }) => {
    const filledStars = Math.round(rating);
    const emptyStars = maxRating - filledStars;
    return (
      <div className="star-rating">
        {Array(filledStars).fill(0).map((_, index) => (
          <span key={`filled_${index}`}>★</span>
        ))}
        {Array(emptyStars).fill(0).map((_, index) => (
          <span key={`empty_${index}`} style={{ color: "lightgray" }}>★</span>
        ))}
      </div>
    );
  };
export default StarRating  