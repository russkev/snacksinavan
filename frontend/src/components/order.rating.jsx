import React from "react";
import useRating from "../hooks/useRating";
import StarFilledIcon from "../media/star.filled.icon";
import InputContainer from "./input.container";
import Stars from "./stars";

export default function OrderRating({ order }) {
  // const { rating, setRating, handleRatingSubmit, comment, onCommentChange } = useOrder(order);
  const {
    hoverOnRating,
    hoverOffRating,
    onFinalRatingClick,
    comment,
    finalRating,
    onCommentChange,
    handleRatingSubmit,
  } = useRating(order);
  if (order.isCompleted && !order.isCancelled && !order.rating) {
    return (
      <div className="rating">
        <h2>Give feedback</h2>
        <p>We work hard to make sure you're satisfied, how did we do?</p>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((rating) => {
            return (
              <span
                className="star"
                id={`rating-${rating}`}
                key={rating}
                onMouseEnter={() => hoverOnRating(rating)}
                onMouseLeave={() => hoverOffRating()}
                onClick={() => onFinalRatingClick(rating)}
              >
                <svg viewBox="0 0 24 24">
                  {" "}
                  <StarFilledIcon />{" "}
                </svg>
              </span>
            );
          })}
        </div>
        <p>How was your experience?</p>
        <form onSubmit={handleRatingSubmit}>
          <InputContainer label="Comment (optional)" value={comment}>
            <textarea
              type="text"
              id="comment"
              placeholder="Comment (optional)"
              value={comment}
              onChange={onCommentChange}
            />
          </InputContainer>
          <button 
            type="submit" 
            disabled={!finalRating} 
            className={`primary soft-shadow ${finalRating ? "" : "disabled"}`}>
            Submit Rating
          </button>
        </form>
      </div>
    );
  } else if (order.isCompleted && !order.isCancelled && order.rating) {
    return (
      <>
        <div className="rating">
          <h2>Your Feedback</h2>
          <div className="submitted">
            <Stars rating={order.rating} />
            <p>{order.feedback}</p>
          </div>
        </div>
      </>
    );
  } else {
    return <></>;
  }
}
