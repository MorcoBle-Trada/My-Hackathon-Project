import React, { useState } from 'react';
import { Star } from 'lucide-react';

export default function StarRating({ rating = 0, onRatingChange, readonly = false, size = "w-6 h-6" }) {
  const [hoverRating, setHoverRating] = useState(0);
  const displayRating = hoverRating || rating;

  return (
    <div className="flex items-center gap-1" onMouseLeave={() => !readonly && setHoverRating(0)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => !readonly && onRatingChange(star)}
          onMouseEnter={() => !readonly && setHoverRating(star)}
          className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform focus:outline-none`}
        >
          <Star 
            className={`${size} ${
              (readonly ? rating : displayRating) >= star 
                ? 'text-amber-400 fill-amber-400' 
                : 'text-slate-600'
            } transition-colors duration-200`} 
          />
        </button>
      ))}
      {rating > 0 && readonly && (
        <span className="ml-2 text-lg font-bold text-slate-300">{rating.toFixed(1)}<span className="text-slate-500 text-sm">/5</span></span>
      )}
    </div>
  );
}