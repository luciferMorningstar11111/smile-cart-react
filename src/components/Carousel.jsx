import { useState, useEffect } from "react";

// import classNames from "classnames";
import { Left, Right } from "neetoicons";
import { Button } from "neetoui";

const Carousel = ({ imageUrls, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () =>
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);

  const handlePrevious = () =>
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length
    );

  useEffect(() => {
    const interval = setInterval(handleNext, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center">
      <Button
        className="shrink-0 focus-within:ring-0 hover:bg-transparent"
        icon={Left}
        style="text"
        onClick={handlePrevious}
      />
      <img
        alt={title}
        className="max-w-56 h-56 max-h-56 w-56"
        src={imageUrls[currentIndex]}
      />
      <Button
        className="shrink-0 focus-within:ring-0 hover:bg-transparent"
        icon={Right}
        style="text"
        onClick={handleNext}
      />
    </div>
  );
};

export default Carousel;
