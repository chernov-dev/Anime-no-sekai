import { useState } from "react";

export const ReadMore = ({ children, className, charsToShow = 250 }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = (e) => {
    e.stopPropagation();
    setIsReadMore((prev) => !prev);
    e.currentTarget.blur();
  };
  return (
    <p className={`${className && className}`}>
      {isReadMore ? text.slice(0, charsToShow) : text}
      <button onClick={(e) => toggleReadMore(e)} className="opacity-50">
        {isReadMore ? ` ...read more` : ` show less`}
      </button>
    </p>
  );
};
