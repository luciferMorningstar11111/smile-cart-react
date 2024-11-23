import { useState, useEffect } from "react";

// import classNames from "classnames";
import { useShowProduct } from "hooks/reactQuery/useProductsApi";
import { useParams } from "react-router-dom";
import { append } from "ramda";

import { Left, Right } from "neetoicons";
import { Button } from "neetoui";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { slug } = useParams();
  const {
    data: {
      image_url: imageUrl,
      imageUrls: partialImageUrls,
      slug: title,
    } = {},
  } = useShowProduct(slug);
  const imageUrls = append(imageUrl, partialImageUrls);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    console.log(imageUrls.length);
  }

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
